import { ApiProperty } from "@nestjs/swagger";

export class HealthResponse {
  @ApiProperty({
    description: "The status of the Gateway Service",
    example: "OK",
  })
  status: string;

  @ApiProperty({
    description: "The timestamp of the Gateway Service",
    example: "2021-01-01T00:00:00.000Z",
  })
  timestamp: string;
}
