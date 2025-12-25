import {
  Body,
  Controller,
  Post,
  Put,
  Get,
  Delete,
  Request,
  Param,
  Query,
} from '@nestjs/common';
import { CreateNoteUseCase } from 'src/modules/note/useCases/createNoteUseCase/CreateNoteUseCase';
import { AuthenticatedRequestModel } from '../auth/models/AuthenticatedRequest.model';
import { CreateNoteBody } from './dtos/CreateNoteBody';
import { NoteViewModel } from './viewModels/NoteViewModel';
import { EditNoteUseCase } from 'src/modules/note/useCases/editNoteUseCase/EditNoteUseCase';
import { DeleteNoteUseCase } from 'src/modules/note/useCases/deleteNoteUseCase/DeleteNoteUseCase';
import { GetNoteUseCase } from 'src/modules/note/useCases/getNoteUseCase/GetNoteUseCase';
import { GetManyUseCase } from 'src/modules/note/useCases/getManyUseCase/GetManyUseCase';
import { EditNoteBody } from './dtos/EditNoteBody';

@Controller('notes')
export class NoteController {
  constructor(
    private createNoteUseCase: CreateNoteUseCase,
    private editNoteUseCase: EditNoteUseCase,
    private deleteNoteUseCase: DeleteNoteUseCase,
    private getNoteUseCase: GetNoteUseCase,
    private getManyUseCase: GetManyUseCase,
  ) {}

  @Post()
  async createNote(
    @Request() request: AuthenticatedRequestModel,
    @Body() body: CreateNoteBody,
  ) {
    const note = await this.createNoteUseCase.execute({
      title: body.title,
      userId: request.user.id,
      description: body.description,
    });

    return NoteViewModel.toHttp(note);
  }

  @Put(':id')
  async editNote(
    @Request() request: AuthenticatedRequestModel,
    @Body() { title, description }: EditNoteBody,
    @Param('id') noteId: string,
  ) {
    description = description ?? null;

    const note = await this.editNoteUseCase.execute({
      userId: request.user.id,
      noteId,
      title,
      description,
    });

    return NoteViewModel.toHttp(note);
  }

  @Delete(':id')
  async deleteNote(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') noteId: string,
  ) {
    await this.deleteNoteUseCase.execute({
      noteId,
      userId: request.user.id,
    });
  }

  @Get(':id')
  async getNote(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') noteId: string,
  ) {
    const note = await this.getNoteUseCase.execute({
      noteId,
      userId: request.user.id,
    });

    return NoteViewModel.toHttp(note);
  }

  @Get()
  async getManyNote(
    @Request() request: AuthenticatedRequestModel,
    @Query('page') page: string,
    @Query('perPage') perPage: string,
  ) {
    const notes = await this.getManyUseCase.execute({
      userId: request.user.id,
      page,
      perPage,
    });

    return notes.map((note) => NoteViewModel.toHttp(note));
  }
}
