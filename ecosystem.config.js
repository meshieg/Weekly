module.exports = {
  apps: [
    {
      name: "Weekly-Frontend",
      script: "npx",
      args: "serve -s build",
      instances: 1,
      watch: true,
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
