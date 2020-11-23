import { EmployeeDetails } from "./employee-details.model";
import { JobPosition } from "./job-position.model";

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  sex: string;
  position: JobPosition;
  details: EmployeeDetails;
}
