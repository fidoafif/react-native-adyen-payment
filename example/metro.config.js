/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path')

module.exports = {
  resolver: {
    extraNodeModules: new Proxy(
      {},
      { get: (_, name) => path.resolve('.', 'node_modules', name) }
    )
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  watchFolders: ['/Users/fido/Documents/Office/projects/react-native-adyen-payment', '/Users/fido/Documents/Office/projects/react-native-adyen-payment/example'],
};
