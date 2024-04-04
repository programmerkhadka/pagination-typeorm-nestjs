import { HttpException } from '@nestjs/common';

class SlugAlreadyUsedException extends HttpException {
  constructor(value: string) {
    const response = {
      message: [
        `the ${value} is already used by another record. Please use a different value.`,
      ],
      errors: 'Bad Reques',
      statusCode: 400,
    };
    super(response, 400);
  }
}

export default SlugAlreadyUsedException;
