import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { AuthServiceClient, SendOTPRequest, SendOTPResponse } from "@walkcat/contracts/gen/auth";
import type { ClientGrpc } from "@nestjs/microservices";
import { Observable } from "rxjs";

@Injectable()
export class AuthClientGrpc implements OnModuleInit {
  private authService: AuthServiceClient;

  public constructor(
    @Inject('AUTH_PACKAGE') private readonly client: ClientGrpc
  ) {}
  public onModuleInit() { 
    this.authService = this.client.getService<AuthServiceClient>("AuthService");
  }

  public sendOtp(request: SendOTPRequest): Observable<SendOTPResponse> {
    return this.authService.sendOtp(request);
  }
}
