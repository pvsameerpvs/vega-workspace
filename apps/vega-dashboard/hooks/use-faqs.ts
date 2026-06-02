"use client";

import { useCrud } from "./use-crud";
import { api } from "@/lib/api";

export type Faq = {
  id: number;
  question: string;
  questionAr?: string;
  answer?: string;
  answerAr?: string;
  category?: string;
  categoryAr?: string;
  displayOrder?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export function useFaqs() {
  return useCrud<Faq>(
    () => api.getFaqs(),
    (data) => api.createFaq(data),
    (id, data) => api.updateFaq(id, data),
    (id) => api.deleteFaq(id)
  );
}
