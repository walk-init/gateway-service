import { ApiProperty } from "@nestjs/swagger";

export class SendOtpRequest {
  @ApiProperty({
    description: 'The identifier to send the OTP to'
  })
  public identifier: string;

  @ApiProperty({
    description: 'The type of the identifier',
  })
  public type: 'email' | 'phone';
}
