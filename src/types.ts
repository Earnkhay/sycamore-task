export interface ICustomer {
  id?: number | null;
  firstName: string;
  lastName: string;
  email: string;
  number: string;
  state: string;
  active: boolean;
  details: string;
  createdAt?: number;
  updatedAt?: number | undefined;
}
