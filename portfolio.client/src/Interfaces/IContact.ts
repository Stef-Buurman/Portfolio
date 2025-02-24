import { EmployeeCount } from "../Enums/EmployeeCount";

export interface IContact {
  id?: number;
  firstName: string;
  lastName: string;
  company: string;
  employeeCount: EmployeeCount;
  companyInformation: string;
  email: string;
  phone?: string;
  message: string;
}
