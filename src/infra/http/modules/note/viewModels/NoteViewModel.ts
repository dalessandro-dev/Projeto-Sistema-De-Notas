import { Note } from 'src/modules/note/entities/Note';

export class NoteViewModel {
  static toHttp({ id, title, description, createdAt }: Note) {
    return {
      id,
      title,
      description,
      createdAt,
    };
  }
}
