import { Injectable } from '@nestjs/common';
import { AbstractNoteRepository } from '../../repositories/AbstractNoteRepository';
import { NoteNotFoundException } from '../../exceptions/NoteNotFoundException';
import { NoteWithoutPermissionException } from '../../exceptions/NoteWithoutPermissionException';

interface DeleteNoteRequest {
  noteId: string;
  userId: string;
}

@Injectable()
export class DeleteNoteUseCase {
  constructor(private noteRepository: AbstractNoteRepository) {}

  async execute({ noteId, userId }: DeleteNoteRequest): Promise<void> {
    const note = await this.noteRepository.findById(noteId);

    if (!note) throw new NoteNotFoundException();

    if (userId !== note.userId)
      throw new NoteWithoutPermissionException({ actionName: 'deletar' });

    await this.noteRepository.delete(noteId);
  }
}
