// src/types.ts
export type Role = "user" | "admin" | "support";

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // 
  role: Role;
}

export interface Review {
  id: string;
  bookId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  deletedReason?: string; // 
}

export interface ContactMessage {
  id: string;
  userName: string;
  email: string;
  message: string;
  status: "pendiente" | "respondido";
  response?: string;
  createdAt: string;
  respondedAt?: string;
}
