import { Module, Provider,DynamicModule } from '@nestjs/common';
import { DynamicService } from './dynamic.service';

@Module({
  // controllers: [DynamicController],
  // providers: [DynamicService],
})
export class DynamicModuleClass {
  static register(config: { isEnabled: boolean }): DynamicModule {
    console.log("dynamic")
    const dynamicServiceProvider: Provider = {
      provide: DynamicService,
      useFactory: () => {
        return config.isEnabled ? new DynamicService('Enabled') : null;
      },
    };

    return {
      module: DynamicModuleClass,
      providers: [dynamicServiceProvider],
      exports: [DynamicService],
    };
  }
}
