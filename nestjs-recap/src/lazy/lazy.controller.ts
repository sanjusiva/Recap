import { Controller } from '@nestjs/common';
import { LazyService } from './lazy.service';

@Controller('lazy')
export class LazyController {
  constructor(private readonly lazyService: LazyService) {}
}
