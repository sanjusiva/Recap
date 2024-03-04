import { Injectable } from '@nestjs/common';

@Injectable()
export class LazyService {
    lazyServiceFunc(){
        return 'Hi I am so lazy'
    }
}
