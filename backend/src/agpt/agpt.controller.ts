import { Controller } from '@nestjs/common';
import { AgptService } from './agpt.service';

@Controller('agpt')
export class AgptController {
  constructor(private readonly agptService: AgptService) {}
}
