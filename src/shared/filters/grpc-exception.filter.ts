import {
	type ArgumentsHost,
	Catch,
	type ExceptionFilter,
	HttpException,
	HttpStatus
} from '@nestjs/common'
import { GRPC_TO_HTTP_STATUS } from '@shared/utils/grpc-to-http-status'
import type { Response } from 'express'

@Catch()
export class GrpcExceptionFilter implements ExceptionFilter {
	public catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()

		if (exception instanceof HttpException) {
			const status = exception.getStatus()
			response.status(status).json(exception.getResponse())
			return
		}

		if (this.isGrpcError(exception)) {
			const status =
				GRPC_TO_HTTP_STATUS[
					exception.code as keyof typeof GRPC_TO_HTTP_STATUS
				] ?? HttpStatus.INTERNAL_SERVER_ERROR

			response.status(status).json({
				statusCode: status,
				message: exception.details ?? exception.message ?? 'gRPC error'
			})
			return
		}

		response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
			message: 'Internal server error'
		})
	}

	private isGrpcError(
		exception: unknown
	): exception is { code: number; details?: string; message?: string } {
		return (
			typeof exception === 'object' &&
			exception !== null &&
			'code' in exception &&
			typeof (exception as { code: unknown }).code === 'number'
		)
	}
}
