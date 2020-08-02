import { JSXChild } from '@gera2ld/jsx-dom';
import { getShadowElement, appendToBody } from '../util';
import baseCss from '../base.css';
import css from './style.css';

const React = VM;
const TOAST_FADE = 'toast-fade';

export function showToast(content: JSXChild | JSXChild[], delay = 2000): () => void {
  const { host, root } = getShadowElement();
  appendToBody('VM.showToast', host);
  const el = <div className={`toast ${TOAST_FADE}`}>{content}</div>;
  root.append(<style>{baseCss}{css}</style>, el);
  let closed = false;
  const close = () => {
    if (closed) return;
    closed = true;
    el.classList.add(TOAST_FADE);
    setTimeout(() => {
      host.remove();
    }, 200);
  };
  requestAnimationFrame(() => {
    el.classList.remove(TOAST_FADE);
    setTimeout(close, delay);
  });
  return close;
}
