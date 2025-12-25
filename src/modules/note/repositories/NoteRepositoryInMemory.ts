import { Note } from '../entities/Note';
import { AbstractNoteRepository } from './AbstractNoteRepository';

export class NoteRepositoryInMemory implements AbstractNoteRepository {
  notes: Note[] = [];

  async create(note: Note): Promise<void> {
    this.notes.push(note);
  }

  async delete(id: string) {
    this.notes = this.notes.filter((n) => n.id !== id);
  }

  async findById(id: string): Promise<Note | null> {
    const foundNote = this.notes.filter((n) => n.id === id);

    if (!foundNote) {
      return null;
    }

    return foundNote[0];
  }

  async save(note: Note): Promise<void> {
    this.notes = this.notes.filter((n) => n.id !== note.id);
    this.notes.push(note);
  }

  async findManyByUserId(
    userId: string,
    page: number,
    perPage: number,
  ): Promise<Note[]> {
    return this.notes
      .filter((n) => n.userId === userId)
      .slice((page - 1) * perPage, page * perPage);
  }
}
