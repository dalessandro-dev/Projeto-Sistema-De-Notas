import { Note } from '../entities/Note';

type Override = Partial<Note>;

export class NoteFactory {
  static makeNote({ id, ...override }: Override) {
    return new Note(
      {
        title: 'Titulo',
        description: 'Descrição',
        userId: 'userId',

        ...override,
      },
      id,
    );
  }
}
