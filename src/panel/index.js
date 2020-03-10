import { getShadowElement, appendToBody } from '../util';
import { css as baseCss } from '../base.css';
import { css } from './style.css';

export function getPanel(options) {
  const { host, root } = getShadowElement();
  const extraStyle = <style />;
  const body = <div className="panel-body" />;
  const wrapper = <div className="panel">{body}</div>;
  root.append(<style>{baseCss}{css}</style>, extraStyle, wrapper);
  const setCss = (cssText) => {
    extraStyle.textContent = cssText || '';
  };
  const clear = () => {
    body.innerHTML = '';
  };
  const append = (...args) => {
    body.append(...args);
  };
  const setContent = (content) => {
    clear();
    append(content);
  };
  if (options) {
    if (options.css) setCss(options.css);
    if (options.content) setContent(options.content);
  }
  return {
    host,
    root,
    wrapper,
    body,
    clear,
    append,
    setCss,
    setContent,
    show: () => {
      appendToBody('VM.getPanel.show', host);
    },
    hide: () => {
      host.remove();
    },
  };
}
