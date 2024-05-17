import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
        constructor(success: boolean, message: string, error: string) {
                super({ success, message, error }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
}
