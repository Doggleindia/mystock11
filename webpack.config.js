const createExpoWebpackConfig = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfig(env, argv);
  
  // Customize the config for CSS handling
  config.module.rules.push({
    test: /\.css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1
        }
      },
      'postcss-loader'
    ]
  });

  return config;
};