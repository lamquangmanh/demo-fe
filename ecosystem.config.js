module.exports = {
  apps: [
    {
      name: 'core_fe',
      script: 'npm start',
    },
  ],

  deploy: {
    core_fe: {
      key: '~/.ssh/core-fe/id_rsa',
      user: 'root',
      host: '128.199.225.176',
      ref: 'origin/main',
      repo: 'git@github.com:lamquangmanh/core-fe.git',
      path: '/data/sources/cyberlogitec/core-fe',
      'post-deploy': `source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js`,
    },
  },
};
