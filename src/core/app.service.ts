import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public getHello(): { message: string } {
    return { message: 'Gateway service is running' };
  }
  public getHealth(): { status: string, timestamp: string } {
    return { 
      status: 'OK',
      timestamp: new Date().toISOString(),
     };
  }
}
