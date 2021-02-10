import { JSXChild } from '@gera2ld/jsx-dom';
import { getHostElement, appendToBody } from '../util';
import styles, { stylesheet } from './style.module.css';

const TOAST_FADE = `${styles.toast}-fade`;

interface IToastOptions {
  duration?: number;
  shadow?: boolean;
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
    className: styles.toast,
  }, content);
  root.append(body);
  addStyle(stylesheet);
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
    setTimeout(close, options.duration);
  });
  return {
    id,
    host,
    root,
    body,
    close,
  };
}
