import type { BaseEntity } from "./common";


export interface Company extends BaseEntity {
  name: string;

  code: string;

  email?: string;
}