module.exports = {
  apps: [
    {
      name: "MVP-Backend",
      script: "./server.js"
    }
  ],
  deploy: {
    production: {
      user: "ubuntu",
      host: "ec2-3-14-132-111.us-east-2.compute.amazonaws.com",
      key: "~/.ssh/MVP-Backend.pem",
      ref: "origin/master",
      repo: "git@github.com:MasonHN/MVP-Backend.git",
      path: "/home/ubuntu/MVP-Backend",
      "post-deploy": "npm install && pm2 startOrRestart ecosystem.config.js"
    }
  }
};
