export type Family = {
  id: string;
  parent_id: string;
  children: Child[];
};

export type Child = {
  id: string;
  family_id: string;
  name: string;
  initials: string;
  year: string;
  school: string;
  enrolled?: boolean;
  // Enrolment profile — filled in during enrolment
  subjects?: string[];
  preferredDays?: string[];
  goals?: string;
  notes?: string;
  preferredTutor?: string;
  sessions?: string;
};
