import { Module } from '@nestjs/common';
import { ColumnsController } from '../columns/columns.controller';
import { ColumnsService } from '../columns/columns.service';

@Module({
  controllers: [ColumnsController],
  providers: [ColumnsService],
  exports: [ColumnsService],
})
export class ColumnsModule {}
