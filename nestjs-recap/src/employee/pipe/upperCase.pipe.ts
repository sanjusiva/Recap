/*
To create custom pipes,3 things are important
1. @Injectable()
2. implements PipeTransform
3. transform(value: any, metadata: ArgumentMetadata) {}
*/

import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class UpperCaseClass implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        if (typeof value !== 'string') {
            throw new BadRequestException('Validation failed: Value must be a string');
          }
          return value.toUpperCase();
    }
}