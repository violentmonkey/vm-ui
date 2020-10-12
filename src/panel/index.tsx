import { JSXChild } from '@gera2ld/jsx-dom';
import { getHostElement, appendToBody } from '../util';

interface IPanelOptions {
  css?: string;
  content?: string;
  shadow?: boolean;
}
export function getPanel(options?: IPanelOptions) {
  options = {
    shadow: true,
    ...options,
  };
  const { host, root, addStyle } = getHostElement(options.shadow);
  const body = <div
    style={{
      position: 'relative',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #eaeaea',
      backgroundColor: '#fff',
      wordBreak: 'break-all',
    }}
  />;
  const wrapper = <div
    style={{
      position: 'fixed',
      maxWidth: '300px',
      zIndex: '10000',
      color: '#333',
    }}
  >
    {body}
  </div>;
  if (options.css) addStyle(options.css);
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
