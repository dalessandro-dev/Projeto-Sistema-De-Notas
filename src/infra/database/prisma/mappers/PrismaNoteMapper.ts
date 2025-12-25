import { Note as NoteRaw } from '@prisma/client';
import { Note } from 'src/modules/note/entities/Note';

export class PrismaNoteMapper {
  static toPrisma({
    createdAt,
    title,
    userId,
    description,
    id,
  }: Note): NoteRaw {
    return {
      createdAt,
      userId,
      title,
      description,
      id,
    };
  }

  static toDomain({
    createdAt,
    title,
    userId,
    description,
    id,
  }: NoteRaw): Note {
    return new Note(
      {
        createdAt,
        title,
        userId,
        description,
      },
      id,
    );
  }
}
