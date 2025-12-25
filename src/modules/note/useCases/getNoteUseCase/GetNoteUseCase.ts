import { Injectable } from '@nestjs/common';
import { AbstractNoteRepository } from '../../repositories/AbstractNoteRepository';
import { Note } from '../../entities/Note';
import { NoteNotFoundException } from '../../exceptions/NoteNotFoundException';
import { NoteWithoutPermissionException } from '../../exceptions/NoteWithoutPermissionException';

interface GetNoteRequest {
  noteId: string;
  userId: string;
}

@Injectable()
export class GetNoteUseCase {
  constructor(private noteRepository: AbstractNoteRepository) {}

  async execute({ noteId, userId }: GetNoteRequest): Promise<Note> {
    const note = await this.noteRepository.findById(noteId);

    if (!note) throw new NoteNotFoundException();

    if (userId !== note.userId)
      throw new NoteWithoutPermissionException({ actionName: 'buscar' });

    return note;
  }
}
