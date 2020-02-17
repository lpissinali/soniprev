module.exports = function() {
  return {
    devServer: {
      host: '0.0.0.0',
      port: 3001,
      stats: 'errors-only',
      overlay: true,
    },
  };
};
