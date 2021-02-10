import { JSXChild } from '@gera2ld/jsx-dom';
import { getHostElement, appendToBody } from '../util';
import styles, { stylesheet } from './style.module.css';

export interface IPanelOptions {
  css?: string;
  content?: string;
  shadow?: boolean;
}

export function getPanel(options?: IPanelOptions) {
  options = {
    shadow: true,
    ...options,
  };
  const {
    id, host, root, addStyle,
  } = getHostElement(options.shadow);
  const body = VM.createElement(id);
  const wrapper = VM.createElement(id, {
    className: styles.panel,
  }, body);
  addStyle([
    stylesheet,
    options.css,
  ].filter(Boolean).join('\n'));
  root.append(wrapper);
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
  if (options.content) setContent(options.content);
  return {
    id,
    host,
    root,
    wrapper,
    body,
    clear,
    append,
    setContent,
    show: () => {
      appendToBody('VM.getPanel.show', host);
    },
    hide: () => {
      host.remove();
    },
  };
}
