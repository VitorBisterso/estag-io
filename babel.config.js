module.exports = function (api) {
   api.cache(true);
   return {
      presets: ['module:metro-react-native-babel-preset'],
      plugins: [
         [
            'babel-plugin-module-resolver',
            {
               root: ['./src'],
               extensions: [
                  '.ios.js',
                  '.android.js',
                  '.js',
                  '.ts',
                  '.tsx',
                  '.json',
               ],
               alias: {
                  tests: ['./tests/'],
                  '@': './src',
               },
            },
         ],
      ],
      env: {
         production: {
            plugins: ['react-native-paper/babel'],
         },
      },
   };
};
