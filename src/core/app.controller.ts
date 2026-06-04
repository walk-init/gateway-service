import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { HealthResponse } from "./dto/response";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: "Welcome to the Gateway Service",
    description: "This is the welcome message for the Gateway Service",
  })
  @Get()
  public getHello() {
    return this.appService.getHello();
  }

  @ApiOperation({
    summary: "Health check",
    description: "This is the health check for the Gateway Service",
  })
  @ApiOkResponse({
    description: "The health of the Gateway Service",
    type: HealthResponse,
  })
  @Get("health")
  public getHealth() {
    return this.appService.getHealth();
  }
}
