import { IsOptional } from 'class-validator';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';

export class EditNoteBody {
  @IsNotEmptyCustom()
  @IsStringCustom()
  title: string;

  @IsStringCustom()
  @IsOptional()
  description?: string | null;
}
