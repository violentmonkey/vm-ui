import * as dom from '@violentmonkey/dom';

declare global {
  const VM: typeof dom & {
    versions: Record<string, string>;
  };

  namespace JSX {
    /**
     * JSX.Element can be different based on pragma in babel config:
     * - VChild  - when jsxFactory is VM.h
     * - DomNode - when jsxFactory is VM.hm
     */
    type Element = import('@gera2ld/jsx-dom').VChild;
  }

  const GM_addStyle: (css: string) => HTMLStyleElement;
}
