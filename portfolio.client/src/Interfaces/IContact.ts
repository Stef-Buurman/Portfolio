import { EmployeeCount } from "../Enums/EmployeeCount";

export interface IContact {
  FirstName: string;
  LastName: string;
  Company: string;
  EmployeeCount: number;
  CompanyInformation: string;
  Email: string;
  Phone?: string;
  Message: string;
}
