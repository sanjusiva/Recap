import { Controller, Get } from '@nestjs/common';
import { DynamicService } from './dynamic.service';

@Controller('dynamic')
export class DynamicController {
  constructor(private readonly dynamicService: DynamicService) {}

  @Get('test')
  getData(): string {
    console.log("dynamic controller")
    if (this.dynamicService) {
      return this.dynamicService.getData();
    } else {
      return 'Dynamic Service is not enabled';
    }
  }


  // @Post()
  // create(@Body() createDynamicDto: CreateDynamicDto) {
  //   return this.dynamicService.create(createDynamicDto);
  // }

  // @Get()
  // findAll() {
  //   return this.dynamicService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.dynamicService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDynamicDto: UpdateDynamicDto) {
  //   return this.dynamicService.update(+id, updateDynamicDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.dynamicService.remove(+id);
  // }
}
