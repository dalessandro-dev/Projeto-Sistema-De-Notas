import { AbstractNoteRepository } from '../../repositories/AbstractNoteRepository';
import { Note } from '../../entities/Note';
import { Injectable } from '@nestjs/common';

interface GetManyNoteRequest {
  userId: string;
  page?: string;
  perPage?: string;
}

@Injectable()
export class GetManyUseCase {
  constructor(private noteRepository: AbstractNoteRepository) {}

  async execute({
    userId,
    page,
    perPage,
  }: GetManyNoteRequest): Promise<Note[]> {
    const DEFAULT_PAGE = 1;
    const DEFAULT_PER_PAGE = 20;

    const currentPage = Number(page) || DEFAULT_PAGE;
    const currentPerPage = Number(perPage) || DEFAULT_PER_PAGE;

    const notes = await this.noteRepository.findManyByUserId(
      userId,
      currentPage,
      currentPerPage,
    );

    return notes;
  }
}
