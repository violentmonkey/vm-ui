if (typeof VM === 'undefined' || !VM || !VM.createElement) {
  console.error(`\
[VM-UI] VM.createElement is not defined!
Please include following code in your metadata:

// @require https://cdn.jsdelivr.net/combine/npm/@violentmonkey/dom@1,npm/@violentmonkey/ui
`);
}

export function getShadowElement() {
  const host = <div />;
  const root = host.attachShadow({ mode: 'open' });
  return { host, root };
}

export function appendToBody(tag, ...children) {
  if (!document.body) {
    console.warn(`[${tag}] document.body is not ready yet, operation skipped.`);
    return;
  }
  document.body.append(...children);
}
