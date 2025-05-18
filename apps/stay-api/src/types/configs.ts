export interface IConfigAttributes {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  config: number;
  waterFee: number;
  electricFee: number;
  commonServiceFee: number;
  internetFee: number;
  type: string;
  isSpecialRoom: boolean;
}

export type ConfigCreateBody = Omit<
  IConfigAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export type ConfigUpdateBody = Partial<Omit<IConfigAttributes, 'id' | 'createdAt' | 'deletedAt'>>;
