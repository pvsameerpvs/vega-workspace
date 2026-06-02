"use client";

import { useCrud } from "./use-crud";
import { api } from "@/lib/api";

export type TeamMember = {
  id: number;
  name: string;
  nameAr?: string;
  designation?: string;
  designationAr?: string;
  department?: string;
  departmentAr?: string;
  bio?: string;
  bioAr?: string;
  email?: string;
  photo?: string;
  displayOrder?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export function useTeam() {
  return useCrud<TeamMember>(
    () => api.getTeam(),
    (data) => api.createTeam(data),
    (id, data) => api.updateTeam(id, data),
    (id) => api.deleteTeam(id)
  );
}
