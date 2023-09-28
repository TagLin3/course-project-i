import { sql } from "../database/database.js";

const getActiveLists = async () => {
  return await sql`SELECT * FROM shopping_lists WHERE active=TRUE`;
};

const createList = async (name) => {
  await sql`INSERT INTO shopping_lists (name) VALUES (${name})`;
};

const deactivateListById = async (id) => {
  await sql`UPDATE shopping_lists SET active=FALSE WHERE id=${id}`;
};

const getListById = async (id) => {
  const lists = await sql`SELECT * from shopping_lists WHERE id=${id}`;
  return (lists[0]);
};

const getListsAmount = async () => {
  const listsCount = await sql`SELECT COUNT(id) from shopping_lists`;
  return listsCount[0].count;
};

export {
  createList,
  deactivateListById,
  getActiveLists,
  getListById,
  getListsAmount,
};
