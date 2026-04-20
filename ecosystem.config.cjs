module.exports = {
  apps: [
    {
      name: 'movies-project-api',
      cwd: '/var/www/movies-and-tv-server',
      script: 'server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
