import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, Validate } from "class-validator";
import { IdentifierValidator } from '@shared/validators';

export class SendOtpRequest {
  @ApiProperty({
    description: 'The identifier to send the OTP to'
  })
  @IsString()
  @Validate(IdentifierValidator)
  public identifier: string;

  @ApiProperty({
    description: 'The type of the identifier',
  })
  @IsEnum(['email', 'phone'])
  public type: 'email' | 'phone';
}
