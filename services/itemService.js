import { sql } from "../database/database.js";

const getListItems = async (id) => {
  return await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id=${id} ORDER BY collected, name`;
};

const createItem = async (id, name) => {
  await sql`INSERT INTO shopping_list_items (shopping_list_id, name) VALUES (${id}, ${name})`;
};

const markCollectedById = async (id) => {
  await sql`UPDATE shopping_list_items SET collected=TRUE WHERE id=${id}`;
};

const getItemsAmount = async () => {
  const itemsCount = await sql`SELECT COUNT(id) from shopping_list_items`;
  return itemsCount[0].count;
};

export { createItem, getItemsAmount, getListItems, markCollectedById };
