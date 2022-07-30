module.exports = {
  apps: [
    {
      name: 'vue3-ssr-example',
      exec_mode: 'cluster',
      instances: 1, // Or a number of instances
      script: 'yarn',
      args: 'run serve',
    },
  ],
}
