type Roles = "user" | "admin";

export type Departments =
  | "Radiology"
  | "Biomedical"
  | "CRO"
  | "Call Center"
  | "Laboratory"
  | "Facility"
  | "Cardiology"
  | "Security"
  | "Sanitation"
  | "IT";

export type User = {
  department: Departments;
  email: string;
  first_name: string;
  last_name: string;
  role: Roles;
  is_hod: boolean;
  uid: string;
};

export interface NewUser extends User {
  password: string;
}
