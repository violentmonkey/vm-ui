import { JSXChild } from '@gera2ld/jsx-dom';
import { getHostElement, appendToBody } from '../util';

interface IToastOptions {
  delay?: number;
  shadow?: boolean;
}
export function showToast(content: JSXChild | JSXChild[], options?: IToastOptions): () => void {
  options = {
    delay: 2000,
    shadow: true,
    ...options,
  };
  const {
    host, root, dispose,
  } = getHostElement(options.shadow);
  appendToBody('VM.showToast', host);
  const el = <div
    style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      padding: '8px 16px',
      background: 'rgba(0,0,0,.8)',
      color: 'white',
      transition: 'opacity .2s',
      zIndex: '100',
      opacity: '0',
    }}
  >
    {content}
  </div>;
  root.append(el);
  let closed = false;
  const close = () => {
    if (closed) return;
    closed = true;
    el.style.opacity = '0';
    setTimeout(() => {
      dispose();
    }, 200);
  };
  requestAnimationFrame(() => {
    el.style.opacity = '';
    setTimeout(close, options.delay);
  });
  return close;
}
