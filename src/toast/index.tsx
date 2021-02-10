import { JSXChild } from '@gera2ld/jsx-dom';
import { getHostElement, appendToBody } from '../util';
import styles, { stylesheet } from './style.module.css';

const TOAST_FADE = `${styles.toast}-fade`;

interface IToastOptions {
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
   * Additional className for the toast root element
   */
  className?: string;

  /**
   * Additional CSS for the toast.
   * `:host` can be used to match the host element.
   */
  style?: string | ((id: string) => string);
}

export function showToast(content: JSXChild | JSXChild[], options?: IToastOptions) {
  options = {
    duration: 2000,
    shadow: true,
    ...options,
  };
  const {
    id, host, root, dispose, addStyle,
  } = getHostElement(options.shadow);
  appendToBody('VM.showToast', host);
  const body = VM.createElement(id, {
    className: [
      styles.toast,
      options.className,
    ].filter(Boolean).join(' '),
  }, content);
  root.append(body);
  let { style } = options;
  if (typeof style === 'function') style = style(id);
  addStyle([
    stylesheet,
    style,
  ].filter(Boolean).join('\n'));
  let closed = false;
  const close = () => {
    if (closed) return;
    closed = true;
    body.classList.add(TOAST_FADE);
    setTimeout(() => {
      dispose();
    }, 200);
  };
  requestAnimationFrame(() => {
    body.classList.remove(TOAST_FADE);
    if (options.duration) {
      setTimeout(close, options.duration);
    }
  });
  return {
    id,
    host,
    root,
    body,
    close,
  };
}
