export const versions = Object.assign(
  (typeof VM !== 'undefined' && VM?.versions) || {},
  {
    ui: 'process.env.VERSION',
  },
);

if (typeof VM === 'undefined' || VM?.versions?.dom?.split('.')[0] !== '2') {
  throw new Error(`\
[VM-UI] @violentmonkey/dom@2 is required
Please include following code in your metadata:

// @require https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// @require https://cdn.jsdelivr.net/npm/@violentmonkey/ui@process.env.VERSION
`);
}

export * from './util';
export * from './toast';
export * from './panel';
