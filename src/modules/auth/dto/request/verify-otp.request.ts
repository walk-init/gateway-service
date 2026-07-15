import { ApiProperty } from '@nestjs/swagger'
import { IdentifierValidator } from '@shared/validators'
import {
	IsEnum,
	IsNotEmpty,
	IsNumberString,
	IsString,
	Length,
	Validate
} from 'class-validator'

export class VerifyOtpRequest {
	@ApiProperty({
		description: 'The OTP code',
		example: '123456'
	})
	@IsNotEmpty()
	@IsNumberString()
	@Length(6, 6)
	public code: string

	@ApiProperty({
		description: 'The identifier to send the OTP to',
		example: 'test@example.com'
	})
	@IsString()
	@Validate(IdentifierValidator)
	@IsNotEmpty()
	public identifier: string

	@ApiProperty({
		description: 'The type of the identifier',
		example: 'email',
		enum: ['email', 'phone']
	})
	@IsEnum(['email', 'phone'])
	@IsNotEmpty()
	public type: 'email' | 'phone'
}
