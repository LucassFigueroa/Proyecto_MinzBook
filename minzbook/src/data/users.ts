// src/data/users.ts
import { loadFromLS, saveToLS } from "./storage";
import type { User, Role } from "@/types";

const LS_USERS = "mb_users";

function hash(pwd: string) {
  return btoa(encodeURIComponent(pwd));
}

const seedUsers: User[] = [
  {
    id: "u-admin",
    name: "Admin",
    email: "admin@minzbook.cl",
    passwordHash: hash("admin123"),
    role: "admin",
  },
  {
    id: "u-support",
    name: "Soporte",
    email: "soporte@minzbook.cl",
    passwordHash: hash("soporte123"),
    role: "support",
  },
];

export function ensureUsersSeeded() {
  const users = loadFromLS<User[]>(LS_USERS, []);
  if (users.length === 0) {
    saveToLS(LS_USERS, seedUsers);
  }
}

export function getUsers(): User[] {
  ensureUsersSeeded();
  return loadFromLS<User[]>(LS_USERS, []);
}

export function findUserByEmail(email: string): User | undefined {
  return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
}

export function createUser(name: string, email: string, password: string, role: Role = "user"): User {
  const users = getUsers();
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("Ya existe un usuario con ese correo.");
  }
  const u: User = {
    id: crypto.randomUUID(),
    name,
    email,
    passwordHash: hash(password),
    role,
  };
  users.push(u);
  saveToLS(LS_USERS, users);
  return u;
}

export function verifyPassword(user: User, password: string) {
  return user.passwordHash === hash(password);
}
