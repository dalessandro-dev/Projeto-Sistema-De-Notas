import { Injectable } from '@nestjs/common';
import { Note } from '../../entities/Note';
import { AbstractNoteRepository } from '../../repositories/AbstractNoteRepository';

interface CreateNoteRequest {
  title: string;
  description?: string;
  userId: string;
}

@Injectable()
export class CreateNoteUseCase {
  constructor(private noteRepository: AbstractNoteRepository) {}

  async execute({
    title,
    description,
    userId,
  }: CreateNoteRequest): Promise<Note> {
    const note = new Note({
      title,
      description,
      userId,
    });

    await this.noteRepository.create(note);

    return note;
  }
}
