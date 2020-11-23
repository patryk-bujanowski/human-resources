import { EmployeeDetails } from "./employee-details.model";
import { JobPosition } from "./job-position.model";

export interface EmployeeCreate {
  id: number;
  firstName: string;
  lastName: string;
  sex: string;
  userId: string;
  position: JobPosition;
  details: EmployeeDetails;
}
