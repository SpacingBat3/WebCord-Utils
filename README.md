# WebCord-Utils

Some Node.js and Electron.js modules adapted to work with the other projects.

In general, I put there modules that were previously a part of WebCord, but I've
decided to seperate them – either since I saw they could be a part of another
projects as well or their code is too generic to be just a part of WebCord.

Much more likely you will find these modules documented via JSDocs comments, so
if your editor is capable of parsing them (e.g. VSCode does that) you should
find it easy to understand what's going on within them and how to use them.

## Instalation
You can install most of them with your project with the following command scheme
if you're using `npm` as your node.js package manager:
```
npm i --save {project-name}
```
Where the `{project-name}` is a value of the `name` field in the `package.json`
of the project you want to use.

All of the packages should be distributed in the Node.js registry, so you can
also find them there just by searching via the browser.

## License
Each of the utilities has it's own license distributed within them.
Most of them has cleanly specified the general license name in
`package.json`, but all of them should have either a `LICENSE*` file
or `COPYING*` file (where the letter case might vary between different
modules).
