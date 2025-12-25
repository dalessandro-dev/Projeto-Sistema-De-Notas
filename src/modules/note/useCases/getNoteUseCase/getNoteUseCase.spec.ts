import { NoteRepositoryInMemory } from '../../repositories/NoteRepositoryInMemory';
import { NoteFactory } from '../../factories/Note.factory';
import { UserFactory } from 'src/modules/user/factories/user.factory';
import { GetNoteUseCase } from './GetNoteUseCase';
import { NoteNotFoundException } from '../../exceptions/NoteNotFoundException';
import { NoteWithoutPermissionException } from '../../exceptions/NoteWithoutPermissionException';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let getNoteUseCase: GetNoteUseCase;

describe('Get note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    getNoteUseCase = new GetNoteUseCase(noteRepositoryInMemory);
  });

  it('It should be able to get a note', async () => {
    const user = UserFactory.makeUser({});
    const note = NoteFactory.makeNote({ userId: user.id });

    noteRepositoryInMemory.notes = [note];

    const foundNote = await getNoteUseCase.execute({
      noteId: note.id,
      userId: user.id,
    });

    expect(foundNote).toEqual(note);
  });

  it('It should be able to throw an unauthorized error when note has another user', async () => {
    const note = NoteFactory.makeNote({});

    noteRepositoryInMemory.notes = [note];

    await expect(async () => {
      await getNoteUseCase.execute({
        noteId: note.id,
        userId: 'Id usuário errado',
      });
    }).rejects.toThrow(NoteWithoutPermissionException);
  });

  it('It should be able to throw a not found error when note not found by Id', async () => {
    await expect(async () => {
      await getNoteUseCase.execute({
        noteId: 'Id nota errado',
        userId: 'Id usuário errado',
      });
    }).rejects.toThrow(NoteNotFoundException);
  });
});
