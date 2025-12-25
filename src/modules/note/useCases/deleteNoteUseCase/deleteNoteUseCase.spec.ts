import { NoteRepositoryInMemory } from '../../repositories/NoteRepositoryInMemory';
import { DeleteNoteUseCase } from './DeleteNoteUseCase';
import { NoteFactory } from '../../factories/Note.factory';
import { UserFactory } from 'src/modules/user/factories/user.factory';
import { NoteWithoutPermissionException } from '../../exceptions/NoteWithoutPermissionException';
import { NoteNotFoundException } from '../../exceptions/NoteNotFoundException';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let deleteNoteUseCase: DeleteNoteUseCase;

describe('Delete note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    deleteNoteUseCase = new DeleteNoteUseCase(noteRepositoryInMemory);
  });

  it('It should be able to delete a note', async () => {
    const user = UserFactory.makeUser({});
    const note = NoteFactory.makeNote({ userId: user.id });

    noteRepositoryInMemory.notes = [note];

    await deleteNoteUseCase.execute({ noteId: note.id, userId: user.id });

    expect(noteRepositoryInMemory.notes).toHaveLength(0);
  });

  it('It should be able to throw an unauthorized error when note has another user', async () => {
    const note = NoteFactory.makeNote({});

    noteRepositoryInMemory.notes = [note];

    await expect(async () => {
      await deleteNoteUseCase.execute({
        noteId: note.id,
        userId: 'Id usuário errado',
      });
    }).rejects.toThrow(NoteWithoutPermissionException);
  });

  it('It should be able to throw a not found error when note not found by Id', async () => {
    await expect(async () => {
      await deleteNoteUseCase.execute({
        noteId: 'Id nota errado',
        userId: 'Id usuário errado',
      });
    }).rejects.toThrow(NoteNotFoundException);
  });
});
