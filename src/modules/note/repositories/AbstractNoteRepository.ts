import { Note } from '../entities/Note';

export abstract class AbstractNoteRepository {
  abstract create(note: Note): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<Note | null>;
  abstract save(note: Note): Promise<void>;
  abstract findManyByUserId(
    userId: string,
    page: number,
    perPage: number,
  ): Promise<Note[]>;
}
