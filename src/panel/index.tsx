import { JSXChild } from '@gera2ld/jsx-dom';
import { getShadowElement, appendToBody } from '../util';
import baseCss from '../base.css';
import css from './style.css';

const React = VM;

export function getPanel(options?: {
  css?: string;
  content?: string;
}) {
  const { host, root } = getShadowElement();
  const extraStyle = <style />;
  const body = <div className="panel-body" />;
  const wrapper = <div className="panel">{body}</div>;
  root.append(<style>{baseCss}{css}</style>, extraStyle, wrapper);
  const setCss = (cssText: string) => {
    extraStyle.textContent = cssText || '';
  };
  const clear = () => {
    body.innerHTML = '';
  };
  const append = (...args: JSXChild[]) => {
    body.append(...args);
  };
  const setContent = (content: string) => {
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
