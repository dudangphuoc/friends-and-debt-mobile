module.exports = function (api) {
  api.cache(true);
  return {
    // plugins: [
    //   [
    //     // "@babel/plugin-proposal-export-namespace-from",
    //     // "react-native-reanimated/plugin",
    //     'module:react-native-dotenv',
    //     {
    //       envName: 'APP_ENV',
    //       moduleName: '@env',
    //       path: '.env',
    //       blocklist: null,
    //       allowlist: null,
    //       blacklist: null, // DEPRECATED
    //       whitelist: null, // DEPRECATED
    //       safe: false,
    //       allowUndefined: true,
    //       verbose: false,
    //     },
    //   ],
    // ],
    presets: [
      "babel-preset-expo"
    ],
  };
};
