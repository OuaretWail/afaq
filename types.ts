import { Category, Course, Field, Profile, Teacher } from "@prisma/client";

export type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[]; // Chapter IDs
  progress: number | null; // Course progress (percentage)
  teacher: Teacher; // Include teacher name
  field: Field | null; // Include field name
};

export type SafeProfile = Omit<
  Profile,
  "createdAt" | "updatedAt" 
> & {
  createdAt: string;
  updatedAt: string;
};