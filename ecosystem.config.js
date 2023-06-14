module.exports = {
  apps: [
    {
      name: "Weekly-Frontend",
      script: "serve",
      watch: true,
      env: {
        NODE_ENV: "development",
        PM2_SERVE_PATH: "build",
        PM2_SERVE_PORT: 3000,
        PM2_SERVE_SPA: "true",
        PM2_SERVE_HOMEPAGE: "/index.html",
        REACT_APP_BACKEND_URL: "http://weekly.cs.colman.ac.il:3001",
      },
    },
  ],
};
