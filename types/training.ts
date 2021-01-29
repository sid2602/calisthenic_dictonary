import { Exercise, VariantType } from "./exercises";
export type Training = {
  id?: number;
  date: string;
  singleSet: SingleSet[];
};

export type SingleSet = {
  exercise: Exercise;
  id?: number;
  quantity: Quantity[];
};

export type Quantity = {
  id?: number;
  quantity: number;
  variant: VariantType;
  kg: number;
};
