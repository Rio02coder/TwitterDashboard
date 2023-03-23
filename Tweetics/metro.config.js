// /**
//  * Metro configuration for React Native
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// const { getDefaultConfig } = require("metro-config");

// const { resolver: defaultResolver } = getDefaultConfig.getDefaultValues();

// exports.transformer = {
// 	babelTransformerPath: require.resolve("./customTransformer.js"),
// };

// exports.resolver = {
// 	...defaultResolver,
// 	assetExts: defaultResolver.assetExts.filter((ext) => ext !== "svg"),
// 	sourceExts: [...defaultResolver.sourceExts,"svg"],
// };

const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false
        }
      })
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg']
    }
  };
})();