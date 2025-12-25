import { Module } from '@nestjs/common';
import { NoteController } from './Note.controller';
import { CreateNoteUseCase } from 'src/modules/note/useCases/createNoteUseCase/CreateNoteUseCase';
import { DeleteNoteUseCase } from 'src/modules/note/useCases/deleteNoteUseCase/DeleteNoteUseCase';
import { GetNoteUseCase } from 'src/modules/note/useCases/getNoteUseCase/GetNoteUseCase';
import { GetManyUseCase } from 'src/modules/note/useCases/getManyUseCase/GetManyUseCase';
import { EditNoteUseCase } from 'src/modules/note/useCases/editNoteUseCase/EditNoteUseCase';
import { DatabaseModule } from 'src/infra/database/Database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NoteController],
  providers: [
    CreateNoteUseCase,
    DeleteNoteUseCase,
    GetNoteUseCase,
    GetManyUseCase,
    EditNoteUseCase,
  ],
})
export class NoteModule {}
