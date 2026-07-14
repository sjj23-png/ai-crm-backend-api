import { z } from "zod";


import {
  CreateCompanySchema,
} from "../dto/create-company.dto";

export const createCompanySchema =
  CreateCompanySchema;

export const updateCompanySchema =
  CreateCompanySchema.partial();