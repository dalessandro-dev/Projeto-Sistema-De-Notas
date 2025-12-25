import { NoteRepositoryInMemory } from '../../repositories/NoteRepositoryInMemory';
import { NoteFactory } from '../../factories/Note.factory';
import { UserFactory } from 'src/modules/user/factories/user.factory';
import { EditNoteUseCase } from './EditNoteUseCase';
import { NoteWithoutPermissionException } from '../../exceptions/NoteWithoutPermissionException';
import { NoteNotFoundException } from '../../exceptions/NoteNotFoundException';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let editNoteUseCase: EditNoteUseCase;

describe('Edit note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    editNoteUseCase = new EditNoteUseCase(noteRepositoryInMemory);
  });

  it('It should be able to edit a note', async () => {
    const user = UserFactory.makeUser({});
    const note = NoteFactory.makeNote({ userId: user.id });

    noteRepositoryInMemory.notes = [note];

    const changedTitle = 'Novo título';
    const changedDescription = 'Nova descrição';

    await editNoteUseCase.execute({
      description: changedDescription,
      title: changedTitle,
      noteId: note.id,
      userId: user.id,
    });

    expect(noteRepositoryInMemory.notes[0].title).toEqual(changedTitle);
    expect(noteRepositoryInMemory.notes[0].description).toEqual(
      changedDescription,
    );
  });

  it('It should be able to throw an unauthorized error when note has another user', async () => {
    const note = NoteFactory.makeNote({});

    noteRepositoryInMemory.notes = [note];

    await expect(async () => {
      await editNoteUseCase.execute({
        title: 'Novo título',
        description: 'Nova descrição',
        noteId: note.id,
        userId: 'Id usuário errado',
      });
    }).rejects.toThrow(NoteWithoutPermissionException);
  });

  it('It should be able to throw a not found error when note not found by Id', async () => {
    await expect(async () => {
      await editNoteUseCase.execute({
        title: 'Novo título',
        description: 'Nova descrição',
        noteId: 'Id nota errado',
        userId: 'Id usuário errado',
      });
    }).rejects.toThrow(NoteNotFoundException);
  });
});
