const fs = require("fs");
const path = require("path");
const { STATUS_CODE } = require("../constants/statusCode");
const renderNewProductPage = require("../views/renderNewProductPage");
const { getProcessLog, getErrorLog } = require("../utils/logger"); 

const express = require("express");
const productRoutes = express.Router();

productRoutes.get("/add", (request, response) => {
  const filePath = path.join(__dirname, "../views", "add-product.html");
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      getErrorLog(request.url); // Logowanie błędu
      response.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send("<h1>Error loading the page</h1>");
      return;
    }
    getProcessLog("Rendering 'Add Product' page."); 
    response.send(data);
  });
});

// Obsługa ścieżki /add dla metody POST - zapisuje dane do pliku i przekierowuje na /product/new
productRoutes.post("/add", (request, response) => {
  const body = [];
  request.on("data", (chunk) => {
    body.push(chunk);
  });
  request.on("end", () => {
    const parsedBody = Buffer.concat(body).toString();
    const formData = parsedBody.split("&").map((entry) => {
      const [key, value] = entry.split("=");
      return `${key}: ${decodeURIComponent(value)}`;
    }).join(", ");

    fs.writeFile("product.txt", formData, (err) => {
      if (err) {
        getErrorLog(request.url); // Logowanie błędu
        response.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send("<h1>Error saving the product</h1>");
        return;
      }
      getProcessLog("New product added and saved."); // Logowanie procesu
      response.status(STATUS_CODE.FOUND);
      response.setHeader("Location", "/product/new");
      response.end();
    });
  });
});

// Obsługa ścieżki /new dla metody GET - odczytuje dane z pliku i renderuje stronę z produktami
productRoutes.get("/new", (request, response) => {
  fs.readFile("product.txt", "utf-8", (err, data) => {
    if (err) {
      getErrorLog(request.url); // Logowanie błędu
      response.status(STATUS_CODE.NOT_FOUND).send("<h1>No new products available</h1>");
      return;
    }
    getProcessLog("Rendering new product page."); // Logowanie procesu
    renderNewProductPage(response, data); // Przekazujemy dane do renderowania strony
  });
});

module.exports =  productRoutes ;

