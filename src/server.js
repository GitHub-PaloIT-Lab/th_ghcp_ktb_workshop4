// filepath: src/server.js
/**
 * Server entry point
 * Workshop participants should NOT modify this file - focus on testing
 */
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`BookStore API server running on port ${PORT}`);
});