import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, tap } from '@reactivex/rxjs/operators';

@Injectable()
export class ReplayAttackInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 获取请求对象
    const request = context.switchToHttp().getRequest();

    // 获取 nonce 和 timestamp
    const nonce = request.headers['nonce'];
    const timestamp = request.headers['timestamp'];

    // TODO: 在这里实现验证 nonce 和 timestamp 的逻辑，防止重放攻击

    // 如果验证失败，可以抛出异常，例如：
    // if (!isValidNonceAndTimestamp(nonce, timestamp)) {
    //   throw new ForbiddenException('Replay attack detected');
    // }

    return next.handle().pipe(
      tap(() => {
        // 在请求处理完成后，可以执行一些清理操作
      }),
    );
  }
}