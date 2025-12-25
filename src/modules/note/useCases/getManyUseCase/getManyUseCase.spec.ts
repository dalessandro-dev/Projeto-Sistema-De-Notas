import { NoteRepositoryInMemory } from '../../repositories/NoteRepositoryInMemory';
import { NoteFactory } from '../../factories/Note.factory';
import { UserFactory } from 'src/modules/user/factories/user.factory';
import { GetManyUseCase } from './GetManyUseCase';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let getManyUseCase: GetManyUseCase;

describe('Get notes', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    getManyUseCase = new GetManyUseCase(noteRepositoryInMemory);
  });

  it('It should be able to get notes', async () => {
    const user = UserFactory.makeUser({});

    const notes = [...new Array(10)].map(() =>
      NoteFactory.makeNote({ userId: user.id }),
    );

    noteRepositoryInMemory.notes = notes;

    const foundNotes = await getManyUseCase.execute({ userId: user.id });

    expect(foundNotes).toEqual(notes);
  });

  it("It should be able to retrieve each user's notes", async () => {
    const userOne = UserFactory.makeUser({});

    const notesUserOne = [...new Array(10)].map(() =>
      NoteFactory.makeNote({ userId: userOne.id }),
    );

    const userTwo = UserFactory.makeUser({});

    const notesUserTwo = [...new Array(10)].map(() =>
      NoteFactory.makeNote({ userId: userTwo.id }),
    );

    noteRepositoryInMemory.notes = [...notesUserOne, ...notesUserTwo];

    const foundNotesUserOne = await getManyUseCase.execute({
      userId: userOne.id,
    });
    const foundNotesUserTwo = await getManyUseCase.execute({
      userId: userTwo.id,
    });

    expect(foundNotesUserOne).toEqual(notesUserOne);
    expect(foundNotesUserTwo).toEqual(notesUserTwo);
  });

  it('It should be able to get notes with pagination', async () => {
    const user = UserFactory.makeUser({});

    const notes = [...new Array(4)].map(() =>
      NoteFactory.makeNote({ userId: user.id }),
    );

    noteRepositoryInMemory.notes = notes;

    const foundNotesPageOne = await getManyUseCase.execute({
      userId: user.id,
      page: '1',
      perPage: '2',
    });

    const foundNotesPageTwo = await getManyUseCase.execute({
      userId: user.id,
      page: '2',
      perPage: '2',
    });

    expect(foundNotesPageOne).toEqual(notes.slice(0, 2));
    expect(foundNotesPageTwo).toEqual(notes.slice(2, 4));
  });

  it('It should be able to get notes with default pagination', async () => {
    const user = UserFactory.makeUser({});

    const notes = [...new Array(21)].map(() =>
      NoteFactory.makeNote({ userId: user.id }),
    );

    noteRepositoryInMemory.notes = notes;

    const foundNotesWithDefaultPageAndPerPage = await getManyUseCase.execute({
      userId: user.id,
    });

    const foundNotesWithDefaultPerPage = await getManyUseCase.execute({
      userId: user.id,
      page: '2',
    });

    const foundNotesWithDefaultPage = await getManyUseCase.execute({
      userId: user.id,
      perPage: '25',
    });

    expect(foundNotesWithDefaultPageAndPerPage).toEqual(notes.slice(0, 20));
    expect(foundNotesWithDefaultPerPage).toEqual([notes[20]]);
    expect(foundNotesWithDefaultPage).toEqual(notes);
  });
});
