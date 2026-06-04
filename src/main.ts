import { NestFactory } from "@nestjs/core";
import { AppModule } from "@core/app.module";
import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import {
  GatewayCorsConfig,
  GatewayValidationsConfig,
  GatewaySwaggerDocumentConfig,
  GatewaySwaggerSetupOptions,
  GatewaySwaggerPathConfig,
} from "./core/config";
import { SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  const logger = new Logger();

  app.useGlobalPipes(new ValidationPipe(GatewayValidationsConfig()));

  app.enableCors(GatewayCorsConfig(config));

  const swaggerDocument = SwaggerModule.createDocument(
    app,
    GatewaySwaggerDocumentConfig(),
  );
  SwaggerModule.setup(
    GatewaySwaggerPathConfig(config),
    app,
    swaggerDocument,
    GatewaySwaggerSetupOptions(),
  );

  const port = config.getOrThrow<number>("HTTP_PORT");
  const host = config.getOrThrow<string>("HTTP_HOST");
  await app.listen(port);

  logger.log(`Gateway service is running on ${host}`);
  logger.log(`Swagger docs is available at ${host}/docs`);
}
bootstrap();
