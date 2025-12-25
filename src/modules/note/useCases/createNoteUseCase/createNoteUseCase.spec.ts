import { NoteRepositoryInMemory } from '../../repositories/NoteRepositoryInMemory';
import { CreateNoteUseCase } from './CreateNoteUseCase';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let createNoteUseCase: CreateNoteUseCase;

describe('Create note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    createNoteUseCase = new CreateNoteUseCase(noteRepositoryInMemory);
  });

  it('It should be able to create a note without description', async () => {
    await createNoteUseCase.execute({
      title: 'Messi é melhor que o CR7',
      userId: 'userId',
    });

    expect(noteRepositoryInMemory.notes[0].description).toEqual(null);
  });

  it('It should be able to create a note with description', async () => {
    const note = await createNoteUseCase.execute({
      title: 'Messi é melhor que o CR7',
      userId: 'userId',
      description: 'Messi melhor do mundo',
    });

    expect(noteRepositoryInMemory.notes).toEqual([note]);
  });
});
