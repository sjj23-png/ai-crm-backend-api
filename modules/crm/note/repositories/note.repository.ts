import prisma from "../../../../database/prisma.service";


import {
  CreateNoteDto
} from "../dto/create-note.dto";

import {
  UpdateNoteDto
} from "../dto/update-note.dto";

export class NoteRepository {

  async create(

    data:
    CreateNoteDto & {

      publicId: string;

      createdBy?: string;

    }

  ) {

    return prisma.note.create({

      data,

      include: {

        company: true,

        lead: true,

        deal: true

      }

    });

  }

  async findById(
    id: string
  ) {

    return prisma.note.findUnique({

      where: {

        id

      },

      include: {

        company: true,

        lead: true,

        deal: true

      }

    });

  }

  async findAll(
    tenantId: string
  ) {

    return prisma.note.findMany({

      where: {

        tenantId,

        deletedAt: null

      },

      include: {

        company: true,

        lead: true,

        deal: true

      },

      orderBy: {

        createdAt: "desc"

      }

    });

  }

  async update(

    id: string,

    data:
    UpdateNoteDto

  ) {

    return prisma.note.update({

      where: {

        id

      },

      data

    });

  }

  async delete(
    id: string
  ) {

    return prisma.note.update({

      where: {

        id

      },

      data: {

        deletedAt:
          new Date()

      }

    });

  }

}