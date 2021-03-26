import { JSXChild } from '@gera2ld/jsx-dom';
import {
  getHostElement, IHostElementResult, themes, themeCss,
} from '../util';
import styles, { stylesheet } from './style.module.css';

export interface IPanelOptions {
  /**
   * Whether to create the toast with ShadowDOM.
   * Note that CSS may not work with ShadowDOM in pages with strict CSP limits.
   */
  shadow?: boolean;

  /**
   * Initial DOM content of panel body.
   */
  content?: JSXChild;

  /**
   * Additional CSS for the toast.
   * `:host` can be used to match the host element.
   */
  style?: string | ((id: string) => string);

  /**
   * Additional className for the toast root element
   */
  className?: string;

  /**
   * Apply built-in themes, default as `light`.
   * Available values are `light` and `dark`, any other value will disable the theme CSS.
   */
  theme?: string;
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
    theme: 'light',
    ...options,
  };
  const hostElem = getHostElement(options.shadow);
  const { id, root, addStyle } = hostElem;
  const body = VM.createElement(id, {
    className: [
      styles['panel-body'],
      themes[options.theme],
    ].filter(Boolean).join(' '),
  });
  const wrapper = VM.createElement(id, {
    className: styles.panel,
  }, body);
  let { style } = options;
  if (typeof style === 'function') style = style(id);
  addStyle([
    stylesheet,
    themeCss,
    style,
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
