import baseCss from './base.css';
import themes, { stylesheet as themeCss } from './theme.module.css';

export { themes, themeCss };

export interface IHostElementResult {
  id: string;
  tag: string;
  shadow: boolean;
  host: HTMLElement;
  root: ShadowRoot | HTMLElement;
  addStyle: (css: string) => void;
  show: () => void;
  hide: () => void;
  dispose: () => void;
}

export function getHostElement(shadow = true): IHostElementResult {
  const id = getUniqueId('vmui-');
  const host = VM.m(VM.h(id, { id })) as HTMLElement;
  let root: ShadowRoot | HTMLElement;
  if (shadow) {
    root = host.attachShadow({ mode: 'open' });
  } else {
    root = VM.m(VM.h(id, {})) as HTMLElement;
    host.append(root);
  }
  const styles: HTMLStyleElement[] = [];
  const addStyle = (css: string) => {
    if (!shadow && typeof GM_addStyle === 'function') {
      styles.push(GM_addStyle(css.replace(/:host\b/g, `#${id} `)));
    } else {
      root.append(VM.m(<style>{css}</style>));
    }
  };
  const dispose = () => {
    host.remove();
    styles.forEach((style) => style.remove());
  };
  addStyle(baseCss);
  const result: IHostElementResult = {
    id,
    tag: 'VM.getHostElement',
    shadow,
    host,
    root,
    addStyle,
    dispose,
    show() {
      appendToBody(this.tag, this.host);
    },
    hide() {
      this.host.remove();
    },
  };
  return result;
}

export function appendToBody(
  tag: string,
  ...children: (string | Node)[]
): void {
  if (!document.body) {
    console.warn(`[${tag}] document.body is not ready yet, operation skipped.`);
    return;
  }
  document.body.append(...children);
}

export function getUniqueId(prefix = '') {
  return prefix + Math.random().toString(36).slice(2, 8);
}

export function classNames(names: string[]) {
  return names.filter(Boolean).join(' ');
}
