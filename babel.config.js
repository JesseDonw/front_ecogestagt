module.exports = {
    presets: ['babel-preset-expo'],
    plugins: [
      ['inline-svg', {
        svgo: {
          plugins: [{ removeDimensions: true }]
        }
      }],
      "react-native-reanimated/plugin"
    ]
  };

  