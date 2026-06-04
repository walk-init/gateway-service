import { ValidationPipeOptions } from "@nestjs/common";

export function GatewayValidationsConfig(): ValidationPipeOptions {
  return { transform: true, whitelist: true };
}
