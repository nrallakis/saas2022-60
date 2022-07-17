import { Controller } from '@nestjs/common';
import { FfService } from './ff.service';

@Controller('ff')
export class FfController {
  constructor(private readonly ffService: FfService) {}
}
