export const VM = window.VM || {};

export const h = VM.createElement;

if (!h) {
  console.error(`\
[VM-UI] VM.createElement is not defined!
Please include following code in your metadata:

// @require https://cdn.jsdelivr.net/npm/@violentmonkey/dom@1
// @require https://cdn.jsdelivr.net/npm/@violentmonkey/ui
`);
}
