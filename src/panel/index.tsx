import { JSXChild } from '@gera2ld/jsx-dom';
import { getHostElement, IHostElementResult } from '../util';
import styles, { stylesheet } from './style.module.css';

export interface IPanelOptions {
  css?: string;
  content?: string;
  shadow?: boolean;
}

export interface IPanelResult extends IHostElementResult {
  wrapper: HTMLElement;
  body: HTMLElement;
  clear: () => void;
  append: (...args: JSXChild[]) => void;
  setContent: (content: string) => void;
}

export function getPanel(options?: IPanelOptions): IPanelResult {
  options = {
    shadow: true,
    ...options,
  };
  const hostElem = getHostElement(options.shadow);
  const { id, root, addStyle } = hostElem;
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
    ...hostElem,
    tag: 'VM.getPanel',
    wrapper,
    body,
    clear,
    append,
    setContent,
  };
}
