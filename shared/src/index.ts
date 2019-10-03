export interface SignUpRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyName: string;
  cellPhone: string;
  workPhone: string;
}

export enum UserRoles {
  SuperAdmin = "SuperAdmin",
  AccountAdmin = "AccountAdmin",
  Employee = "Employee"
}
