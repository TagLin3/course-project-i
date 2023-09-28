import * as itemService from "../services/itemService.js";
import * as requestUtils from "../utils/requestUtils.js";

const addItem = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  const formData = await request.formData();

  await itemService.createItem(urlParts[2], formData.get("name"));

  return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
};

const markCollected = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");

  await itemService.markCollectedById(urlParts[4]);

  return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
};

export { addItem, markCollected };
