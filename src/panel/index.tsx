import { VChild } from '@gera2ld/jsx-dom';
import {
  classNames,
  getHostElement,
  IHostElementResult,
  themes,
  themeCss,
  Movable,
  MovableOptions,
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
  content?: VChild;

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
   * Empty the panel body.
   */
  clear: () => void;
  /**
   * Append elements to the panel body, shorthand for `panel.body.append(...)`.
   */
  append: (...args: VChild[]) => void;
  /**
   * Replace the content of panel body by clearing it first and then {@link append}.
   */
  setContent: (...args: VChild[]) => void;
  /**
   * Whether this panel can be moved by mouse dragging.
   */
  setMovable: (toggle: boolean, options?: MovableOptions) => void;
}

export function getPanel(options?: IPanelOptions): IPanelResult {
  options = {
    shadow: true,
    theme: 'light',
    ...options,
  };
  const hostElem = getHostElement(options.shadow);
  const body = VM.m(
    <hostElem.id
      className={classNames([styles['panel-body'], themes[options.theme]])}
    />
  ) as HTMLElement;
  const wrapper = VM.m(
    <hostElem.id className={classNames([styles.panel, options.className])}>
      {body}
    </hostElem.id>
  ) as HTMLElement;
  let { style } = options;
  if (typeof style === 'function') style = style(hostElem.id);
  hostElem.addStyle([stylesheet, themeCss, style].filter(Boolean).join('\n'));
  hostElem.root.append(wrapper);
  const clear = () => {
    while (body.firstChild) body.firstChild.remove();
  };
  const append = (...args: VChild[]) => {
    body.append(...args.map(VM.m).filter(Boolean));
  };
  const setContent = (...args: VChild[]) => {
    clear();
    append(...args);
  };
  if (options.content) setContent(options.content);

  let movable: Movable;
  const setMovable: IPanelResult['setMovable'] = (toggle, options) => {
    movable ||= new Movable(wrapper);
    if (options) movable.setOptions(options);
    if (toggle) {
      movable.enable();
    } else {
      movable.disable();
    }
  };

  return {
    ...hostElem,
    tag: 'VM.getPanel',
    wrapper,
    body,
    clear,
    append,
    setContent,
    setMovable,
  };
}
