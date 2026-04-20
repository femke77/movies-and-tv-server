module.exports = {
  apps: [
    {
      name: 'movies-project-api',
      cwd: '/var/www/movies-project/server',
      script: 'server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
