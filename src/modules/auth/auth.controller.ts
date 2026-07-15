import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'

import { AuthClientGrpc } from './auth.grpc'
import { SendOtpRequest } from './dto'
import { VerifyOtpRequest } from './dto/request/verify-otp.request'

@Controller('auth')
export class AuthController {
	constructor(private readonly authClientGrpc: AuthClientGrpc) {}
	@ApiOperation({
		summary: 'Send OTP',
		description: 'Send OTP to the user'
	})
	@ApiOkResponse({
		description: 'OTP sent successfully',
		type: String
	})
	@HttpCode(HttpStatus.OK)
	@Post('otp/send')
	public async sendOtp(@Body() sendOtpRequest: SendOtpRequest) {
		return this.authClientGrpc.sendOtp(sendOtpRequest)
	}
	@ApiOperation({
		summary: 'Verify OTP',
		description: 'Verify OTP'
	})
	@ApiOkResponse({
		description: 'OTP verified successfully',
		type: String
	})
	@HttpCode(HttpStatus.OK)
	@Post('otp/verify')
	public async verifyOtp(@Body() verifyOtpRequest: VerifyOtpRequest) {
		return this.authClientGrpc.verifyOtp(verifyOtpRequest)
	}
}
