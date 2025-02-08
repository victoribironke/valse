export const IMAGES = {
  logo: { src: "/logo.png", w: 192, h: 192 },
};

export const PAGES = {
  base_url: "https://babcock.tools/",

  login: "/auth/login",
  forgot_password: "/auth/forgot-password",

  dashboard: "/dashboard",
  users: "/dashboard/users",
  incidents: "/dashboard/incidents",
};

export const DEPARTMENTS = [
  "Radiology",
  "Biomedical",
  "CRO",
  "Call Center",
  "Laboratory",
  "Facility",
  "Cardiology",
  "Security",
  "Sanitation",
  "IT",
].sort(); // IF THIS CHANGES IN THE FUTURE, MAKE SURE TO UPDATE THE TYPE IN src/types/auth.ts
