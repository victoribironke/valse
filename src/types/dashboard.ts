import React from "react";
import { Departments } from "./auth";

export type SidebarProps = {
  show: boolean;
  setShow: () => void;
};

export type DashboardTemplateProps = {
  children: React.ReactNode;
};

export type Status = "reported" | "in_progress" | "resolved";

export type Incident = {
  status: Status;
  department: Departments;
};

export interface NewIncident {
  department: Departments;
  description: string;
}
