import { VChild } from '@gera2ld/jsx-dom';
import {
  classNames,
  getHostElement,
  IHostElementResult,
  themes,
  themeCss,
} from '../util';
import styles, { stylesheet } from './style.module.css';

export interface IToastOptions {
  /**
   * The duration for the toast to show.
   */
  duration?: number;

  /**
   * Whether to create the toast with ShadowDOM.
   * Note that CSS may not work with ShadowDOM in pages with strict CSP limits.
   */
  shadow?: boolean;

  /**
   * Apply built-in themes, default as `light`.
   * Available values are `light` and `dark`, any other value will disable the theme CSS.
   */
  theme?: string;

  /**
   * Additional className for the toast root element
   */
  className?: string;

  /**
   * Additional CSS for the toast.
   * `:host` can be used to match the host element.
   */
  style?: string | ((id: string) => string);

  /**
   * Hook before showing the toast, e.g. adding a fade-in transition.
   */
  beforeEnter: (result: IToastResult) => Promise<void>;

  /**
   * Hook before closing the toast, e.g. adding a fade-out transition.
   */
  beforeClose: (result: IToastResult) => Promise<void>;
}

export interface IToastResult extends IHostElementResult {
  body: HTMLElement;
  close: () => void;
}

export function showToast(
  content: VChild,
  options?: IToastOptions
): IToastResult {
  options = {
    duration: 2000,
    shadow: true,
    theme: 'light',
    beforeEnter: defaultBeforeEnter,
    beforeClose: defaultBeforeClose,
    ...options,
  };
  const hostElem = getHostElement(options.shadow);
  const { dispose, addStyle } = hostElem;
  const body = VM.m(
    <hostElem.id
      className={classNames([
        styles.toast,
        themes[options.theme],
        options.className,
      ])}
    >
      {content}
    </hostElem.id>
  ) as HTMLElement;
  hostElem.root.append(body);
  let { style } = options;
  if (typeof style === 'function') style = style(hostElem.id);
  addStyle([stylesheet, themeCss, style].filter(Boolean).join('\n'));
  let closed = false;
  const result: IToastResult = {
    ...hostElem,
    tag: 'VM.showToast',
    body,
    close,
  };
  result.show();
  (async () => {
    await options.beforeEnter?.(result);
    if (options.duration) {
      setTimeout(close, options.duration);
    }
  })();
  return result;

  async function close() {
    if (closed) return;
    closed = true;
    await options.beforeClose?.(result);
    dispose();
  }
}

async function defaultBeforeEnter(result: IToastResult) {
  const { body } = result;
  body.style.transition = 'opacity .2s';
  body.style.opacity = '0';
  await sleep(0);
  body.style.opacity = '1';
  await sleep(200);
}

async function defaultBeforeClose(result: IToastResult) {
  const { body } = result;
  body.style.transition = 'opacity .2s';
  body.style.opacity = '0';
  await sleep(200);
}

async function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
