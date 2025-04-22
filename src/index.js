import PostalMime from 'postal-mime';

// https://github.com/edevil/email_worker_parser/blob/main/src/index.js
async function streamToArrayBuffer(stream, streamSize) {
    let result = new Uint8Array(streamSize);
    let bytesRead = 0;

    const reader = stream.getReader();

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        result.set(value, bytesRead);
        bytesRead += value.length;
    }

    return result;
}

export default {
    async email(message) {
        if (message.from === 'noreply@shellshock.io') {
            const rawEmail = await streamToArrayBuffer(message.raw, message.rawSize);

            const parser = new PostalMime();
            const parsedEmail = await parser.parse(rawEmail);

            const oobCode = parsedEmail.text.match(/oobCode=([A-Za-z0-9_-]+)/)[1];

            const response = await fetch('https://www.googleapis.com/identitytoolkit/v3/relyingparty/setAccountInfo?key=AIzaSyDP4SIjKaw6A4c-zvfYxICpbEjn1rRnN50', {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Content-Type': 'application/json',
                    'Referer': 'https://shellshockio-181719.firebaseapp.com/',
                    'Referrer-Policy': 'strict-origin-when-cross-origin',
                    'X-Client-Version': 'Chrome/JsCore/3.7.5/FirebaseCore-web'
                },
                body: JSON.stringify({ oobCode })
            });

            const identity = await response.json();
            if (identity.emailVerified) console.log(`Verified email "${message.to}"!`);
            else console.log(`Unknown error`, identity, oobCode, parsedEmail.text);
        }
    }
}