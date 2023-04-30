// This should work in most cases
declare var process: {
  env: {
    NG_APP_ENV: string;
    NG_APP_CSRF_TOKEN: string;
    NG_APP_API_URL: string;
    NG_APP_STORAGE_URL: string;
    [key: string]: any;
  };
};

// If your project references @types/node directly (in you) or indirectly (as in RxJS < 7.6.0),
// you might need to use the following declaration merging.
declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NG_APP_ENV: string;
    // Add your environment variables below
  }
}

// If you're using Angular Universal, you'll need to add the following to your tsconfig.server.json:
/* In your tsconfig.server.json */
// {
//   "extends": "./tsconfig.app.json",
//   ...
//   "exclude": [
//     "src/env.d.ts"
//   ]
// }
