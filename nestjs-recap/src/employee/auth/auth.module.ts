import { Module } from '@nestjs/common';
import { LocationGuard } from './location.guard';

@Module({
    providers:[LocationGuard],
    exports:[LocationGuard]
})
export class AuthModule {}
