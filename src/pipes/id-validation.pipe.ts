import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { ID_VALIDATION_ERROR } from './id-validation.constant';

@Injectable()
export class IdValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param') {
      return value;
    }
    if (!isValidObjectId(value)) {
      throw new BadRequestException(ID_VALIDATION_ERROR);
    }

    return value;
  }
}
