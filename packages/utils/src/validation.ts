import { z } from "zod";

export const leadFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  companyName: z.string().optional(),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(5, "Please enter a valid phone number"),
  productName: z.string().optional(),
  sku: z.string().optional(),
  category: z.string().optional(),
  quantity: z.string().optional(),
  location: z.string().optional(),
  message: z.string().optional(),
});

export const jobApplicationSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(5, "Please enter a valid phone number"),
  position: z.string().min(1, "Please select a position"),
  experience: z.string().optional(),
  message: z.string().optional(),
});

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(5, "Please enter a valid phone number"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;
export type JobApplicationData = z.infer<typeof jobApplicationSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;
