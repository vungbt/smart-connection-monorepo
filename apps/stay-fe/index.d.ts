/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}

// Add module declarations for JSON files
declare module '*.json' {
  const value: any;
  export default value;
}

// Add specific declaration for theme-token
declare module '@smart-connection-monorepo/ui-theme/theme-token/stay-fe.json' {
  const themeToken: {
    variants: {
      colors: {
        primary: Record<string, string>;
        secondary: Record<string, string>;
        neutral: Record<string, string>;
        pending: Record<string, string>;
        error: Record<string, string>;
        success: Record<string, string>;
      };
      lineHeight: Record<string, string>;
      fontSize: Record<string, string | [string, string]>;
      font: {
        primary: string;
      };
      stylesheets: string[];
    };
    twConfig: Record<string, any>;
  };
  export default themeToken;
}
