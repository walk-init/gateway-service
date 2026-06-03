import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SendOtpRequest } from './dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  @Post('send-otp')
  @ApiOperation({
    summary: 'Send OTP',
    description: 'Send OTP to the user',
  })
  @ApiOkResponse({
    description: 'OTP sent successfully',
    type: String,
  })
  @HttpCode(HttpStatus.OK)
  public async sendOtp(
    @Body() sendOtpRequest: SendOtpRequest,
  ) {
    console.log(sendOtpRequest);
    return {
      message: 'OTP sent successfully',
    };
  }
}
