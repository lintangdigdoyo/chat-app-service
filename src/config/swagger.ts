import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import { Express } from "express"
import { env } from "./env"

const swaggerOptions: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.1.0",
    info: {
      title: "Chat App Service",
      version: "0.1.0",
      description: "REST API Chat App Service",
    },
    servers: [
      {
        url: env.APP_URL,
        description: "Development server",
      },
    ],
  },
  apis: ["./dist/routes/**/*.js"],
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

export const setupSwagger = (app: Express) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}
