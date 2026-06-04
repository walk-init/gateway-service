import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { SendOtpRequest } from "./dto";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { AuthClientGrpc } from "./auth.grpc";

@Controller("auth")
export class AuthController {
  constructor(private readonly authClientGrpc: AuthClientGrpc) {}
  @ApiOperation({
    summary: "Send OTP",
    description: "Send OTP to the user",
  })
  @ApiOkResponse({
    description: "OTP sent successfully",
    type: String,
  })
  @HttpCode(HttpStatus.OK)
  @Post("otp/send")
  public async sendOtp(@Body() sendOtpRequest: SendOtpRequest) {
    return this.authClientGrpc.sendOtp(sendOtpRequest);
  }
}
