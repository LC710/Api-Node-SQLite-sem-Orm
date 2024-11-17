import sqlite3 from "sqlite3";
import { open } from "sqlite";

// you would have to import / invoke this in another file
export async function openDb() {
  return open({
    filename: "./database.db", // Contado da Raiz do projeto;
    driver: sqlite3.Database,
  });
}