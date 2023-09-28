import { serve } from "./deps.js";
import { configure, renderFile } from "./deps.js";
import * as listsController from "./controllers/listsController.js";
import * as itemController from "./controllers/itemController.js";

configure({
  views: `${Deno.cwd()}/views`,
});

const data = {};

const handleRequest = async (request) => {
  const url = new URL(request.url);
  if (url.pathname === "/" && request.method === "GET") {
    return listsController.returnMainPage();
  } else if (
    url.pathname === "/lists" &&
    request.method === "GET"
  ) {
    return listsController.returnListsPage();
  } else if (
    url.pathname === "/lists" &&
    request.method === "POST"
  ) {
    return listsController.addList(request);
  } else if (
    url.pathname.match("/lists/[0-9]+/deactivate") &&
    request.method === "POST"
  ) {
    return listsController.deactivateList(request);
  } else if (
    url.pathname.match("/lists/[0-9]+") &&
    request.method === "GET"
  ) {
    return listsController.returnListPage(request);
  } else if (
    url.pathname.match("/lists/[0-9]+/items/[0-9]+/collect") &&
    request.method === "POST"
  ) {
    return itemController.markCollected(request);
  } else if (
    url.pathname.match("/lists/[0-9]+/items") &&
    request.method === "POST"
  ) {
    return itemController.addItem(request);
  } else {
    console.log(url.pathname);
    console.log(request.method);
    return new Response("Not found", { status: 404 });
  }
};

serve(handleRequest, { port: 7777 });
