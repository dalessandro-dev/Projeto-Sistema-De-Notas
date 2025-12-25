import { AbstractNoteRepository } from '../../repositories/AbstractNoteRepository';
import { Injectable } from '@nestjs/common';
import { Note } from '../../entities/Note';
import { NoteNotFoundException } from '../../exceptions/NoteNotFoundException';
import { NoteWithoutPermissionException } from '../../exceptions/NoteWithoutPermissionException';

interface EditNoteRequest {
  userId: string;
  noteId: string;
  title: string;
  description: string | null;
}

@Injectable()
export class EditNoteUseCase {
  constructor(private noteRepository: AbstractNoteRepository) {}

  async execute({
    userId,
    noteId,
    title,
    description,
  }: EditNoteRequest): Promise<Note> {
    const note = await this.noteRepository.findById(noteId);

    if (!note) throw new NoteNotFoundException();

    if (userId !== note.userId)
      throw new NoteWithoutPermissionException({ actionName: 'editar' });

    note.title = title;
    note.description = description;

    await this.noteRepository.save(note);

    return note;
  }
}
