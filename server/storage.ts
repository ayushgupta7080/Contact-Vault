import { db } from "./db";
import {
  contacts,
  type Contact,
  type InsertContact
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
  deleteContact(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(contacts.id);
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db.insert(contacts).values(insertContact).returning();
    return contact;
  }

  async deleteContact(id: number): Promise<void> {
    await db.delete(contacts).where(eq(contacts.id, id));
  }
}

export const storage = new DatabaseStorage();
