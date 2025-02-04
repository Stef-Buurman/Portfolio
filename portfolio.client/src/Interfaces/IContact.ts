import { EmployeeCount } from "../Enums/EmployeeCount";

export interface IContact {
  firstName: string;
  lastName: string;
  company: string;
  employeeCount: EmployeeCount;
  companyInformation: string;
  email: string;
  phone?: string;
  message: string;
}
