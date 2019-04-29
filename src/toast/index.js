import { h } from '../util';
import { css } from './style.css';

const TOAST_FADE = 'toast-fade';

export function showToast(content, delay = 2000) {
  const wrapper = <div />;
  document.body.append(wrapper);
  const root = wrapper.attachShadow({ mode: 'open' });
  root.append(<style>{css}</style>);
  const el = <div className={`toast ${TOAST_FADE}`}>{content}</div>;
  root.append(el);
  let closed = false;
  const close = () => {
    if (closed) return;
    closed = true;
    el.classList.add(TOAST_FADE);
    setTimeout(() => {
      wrapper.remove();
    }, 200);
  };
  requestAnimationFrame(() => {
    el.classList.remove(TOAST_FADE);
    setTimeout(close, delay);
  });
  return close;
}
