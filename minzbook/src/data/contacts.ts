// src/data/contacts.ts
import { loadFromLS, saveToLS } from "./storage";
import type { ContactMessage } from "@/types";

const LS_CONTACTS = "mb_contacts";

export function listContacts(): ContactMessage[] {
  const all = loadFromLS<ContactMessage[]>(LS_CONTACTS, []);
  return all.sort((a,b) => b.createdAt.localeCompare(a.createdAt));
}

export function addContact(msg: ContactMessage) {
  const all = listContacts();
  all.push(msg);
  saveToLS(LS_CONTACTS, all);
}

export function respondContact(id: string, response: string) {
  const all = listContacts();
  const msg = all.find(m => m.id === id);
  if (msg) {
    msg.status = "respondido";
    msg.response = response;
    msg.respondedAt = new Date().toISOString();
    saveToLS(LS_CONTACTS, all);
  }
}
