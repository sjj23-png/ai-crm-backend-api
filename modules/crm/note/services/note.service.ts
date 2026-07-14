import { CreateNoteDto } from "../dto/create-note.dto";
import { UpdateNoteDto } from "../dto/update-note.dto";


import { NoteRepository } from "../repositories/note.repository";

export class NoteService {

  private repository =
    new NoteRepository();

  async create(
    dto: CreateNoteDto
  ) {

    return this.repository.create({

      ...dto,

      publicId:
        `NOT-${Date.now()}`

    });

  }

  async getAll(
    tenantId: string
  ) {

    return this.repository.findAll(
      tenantId
    );

  }

  async getById(
    id: string
  ) {

    const note =
      await this.repository.findById(id);

    if (!note) {

      throw new Error(
        "Note not found."
      );

    }

    return note;

  }

  async update(

    id: string,

    dto: UpdateNoteDto

  ) {

    await this.getById(id);

    return this.repository.update(

      id,

      dto

    );

  }

  async delete(
    id: string
  ) {

    await this.getById(id);

    await this.repository.delete(id);

    return {

      message:
        "Note deleted successfully."

    };

  }

}