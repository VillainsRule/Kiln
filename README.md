<div align='center'>
    <h1>Kiln</h1>
    <h3>automatically verify shell shockers emails created on your domain</h3>
</div>

<br><br>

## Setup
this assumes you have a basic understanding of the internet & code

1. hook up your domain to Cloudflare (peak; shut up seq)
2. open the domain page
3. locate email on the sidebar, and open up 'email routing'

*if you have never used email routing on this domain, click get started & then scroll to the bottom + click "skip getting started". you will need to then click on "enable email routing" in the orange box and add the records.*

1. go to email workers & create a new worker
2. name it "email" - this is important, if you name it anything else, you msut change wrangler.toml
3. select "create your own"
4. once it opens the code editor, close this page - you don't need it anymore
5. go back to email routing & go to routing rules
6. change the catch all to active and click edit
7.  set the action to "send to worker" and the worker as "email"
8.  click save

now, you need to set stuff up on the CLI side

1. `git clone https://github.com/VillainsRule/Kiln && cd Kiln`
2. `npm i` / `bun i`
3. `npx wrangler deploy` / `bunx wrangler deploy`

follow through the deploy prompts. when it prompts you to override the web whatever, type "y" and confirm it. this does not matter for our purposes.

<br><br>
<h5 align='center'>made with :heart: + :trollface: by 1ust</h5>