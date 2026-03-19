import { Application } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const specs = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sylhety News API',
      version: '1.0.0',
      description: 'API documentation for Sylhety News',
    },
    servers: [{ url: 'http://localhost:5000' }],
  },
  apis: ['./src/routes/*.ts', './dist/routes/*.js', './openapi.yaml'],
});

export default function setupSwagger(app: Application) {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
}
