declare module '*.css' {
  export const css: string;
  export const classMap: {
    [key: string]: string;
  };
}

declare const VM: any;
