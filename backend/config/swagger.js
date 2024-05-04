const path = require('path');

// Swagger Configuration  
module.exports = {
    info: {
        swagger: "2.0",
        version: '1.1.11',
        title: 'Resizable layout APIs',
    },
    security: {
        BearerAuth: {
            "type": "http",
            "scheme": "bearer"
        }
    },
    baseDir: path.join(__dirname, '../'),
    // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
    filesPattern: ['./typedefs/**.js', './routes/**/**.js'],
    // URL where SwaggerUI will be rendered
    swaggerUIPath: '/api-docs',
    // Expose OpenAPI UI
    exposeSwaggerUI: true,
    // Expose Open API JSON Docs documentation in `apiDocsPath` path.
    exposeApiDocs: false,
    // Open API JSON Docs endpoint.
    // apiDocsPath: '/v3/api-docs',
    // Set non-required fields as nullable by default
    notRequiredAsNullable: false,
    // You can customize your UI options.
    // you can extend swagger-ui-express config. You can checkout an example of this
    // in the `example/configuration/swaggerOptions.js`
    swaggerUiOptions: {},
    // multiple option in case you want more that one instance
    multiple: true,
};