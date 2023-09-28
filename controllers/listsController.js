import { renderFile } from "../deps.js";
import * as listsService from "../services/listsService.js";
import * as requestUtils from "../utils/requestUtils.js";
import * as itemService from "../services/itemService.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const returnMainPage = async () => {
  const data = {
    itemsAmount: await itemService.getItemsAmount(),
    listsAmount: await listsService.getListsAmount(),
  };
  return new Response(await renderFile("index.eta", data), responseDetails);
};

const returnListsPage = async () => {
  const data = {
    lists: await listsService.getActiveLists(),
  };

  return new Response(await renderFile("lists.eta", data), responseDetails);
};

const returnListPage = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  const data = {
    list: await listsService.getListById(urlParts[2]),
    items: await itemService.getListItems(urlParts[2]),
  };
  return new Response(await renderFile("list.eta", data), responseDetails);
};

const deactivateList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  await listsService.deactivateListById(urlParts[2]);
  return requestUtils.redirectTo("/lists");
};

const addList = async (request) => {
  const formData = await request.formData();
  await listsService.createList(formData.get("name"));
  return requestUtils.redirectTo("/lists");
};

export {
  addList,
  deactivateList,
  returnListPage,
  returnListsPage,
  returnMainPage,
};
