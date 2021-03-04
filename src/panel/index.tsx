import { JSXChild } from '@gera2ld/jsx-dom';
import { getHostElement, IHostElementResult } from '../util';
import styles, { stylesheet } from './style.module.css';

export interface IPanelOptions {
  shadow?: boolean;
  css?: string;
  content?: JSXChild;
}

export interface IPanelResult extends IHostElementResult {
  /**
   * The wrapper element that should be positioned. It should be as simple as possible and let the body to style itself.
   */
  wrapper: HTMLElement;
  /**
   * The container of contents. It is recommended to style your panel box here.
   */
  body: HTMLElement;
  /**
   * Empty the panel body, shorthand for `panel.body.innerHTML = ''`.
   */
  clear: () => void;
  /**
   * Append elements to the panel body, shorthand for `panel.body.append(...)`.
   */
  append: (...args: JSXChild[]) => void;
  /**
   * Replace the content of panel body by clearing it first and then {@link append}.
   */
  setContent: (...args: JSXChild[]) => void;
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
  const setContent = (...args: JSXChild[]) => {
    clear();
    append(...args);
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
