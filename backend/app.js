// app.js

// Import necessary modules
const path = require('path');
require('dotenv').config({
  path: path.resolve(
    process.cwd(),
    process.env.ENVIRONMENT === 'test' ? '.env.test' : '.env',
  ),
});
const express = require('express');
const bodyParser = require('body-parser');
const componentRoutes = require('./routes/componentRoute');
const sequelize = require('./config/database');
const cors = require('cors');
const logger = require('morgan');

// Initialize Express app
const app = express();

// Middleware setup
app.use(bodyParser.json()); // Parse incoming request bodies in JSON format
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
// Logging middleware using Morgan
app.use(logger(':date[iso] -> :method :url :status :res[content-length] - :response-time ms - :req[x-platform] - :req[x-app-version]', {
  skip: function (req, res) { return req.method === 'OPTIONS' }
}));

// Swagger documentation setup
const expressJSDocSwagger = require('express-jsdoc-swagger');
const swaggerConfig = require('./config/swagger');
expressJSDocSwagger(app)(swaggerConfig);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define routes
app.use('/api/component', componentRoutes);

// Start server
const PORT = process.env.PORT || 3000;

// Test database connection and start server
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
