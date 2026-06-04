import { DocumentBuilder, SwaggerCustomOptions } from "@nestjs/swagger";
import type { ConfigService } from "@nestjs/config";

export function GatewaySwaggerPathConfig(config: ConfigService): string {
  return config.getOrThrow<string>("GATEWAY_SWAGGER_PATH");
}

export function GatewaySwaggerDocumentConfig() {
  return new DocumentBuilder()
    .setTitle("Gateway Service")
    .setDescription("Gateway Service API")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
}

export function GatewaySwaggerSetupOptions(): SwaggerCustomOptions {
  return {
    yamlDocumentUrl: "/openapi.yaml",
    jsonDocumentUrl: "/openapi.json",
  };
}
