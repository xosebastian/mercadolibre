const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
const qs = require("query-string");

const getDecimals = (data) => {
  let decimals = "";
  if (data) {
    if (Number(data) === data && data % 1 !== 0) {
      let number = String(data).split(".");
      decimals = number[1];
    } else {
      decimals = "00";
    }
  }

  return decimals;
};

const getIntegers = (data) => {
  let integers = "";
  if (data) {
    if (Number(data) === data && data % 1 !== 0) {
      let number = String(data).split(".");
      integers = number[0];
    } else {
      integers = data;
    }
  }
  return integers;
};

const filterSearchItems = (data) => {
  let items = [];
  const { results } = data;

  if (!results.length) {
    return items;
  }

  results.map((item) => {
    items.push({
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: getIntegers(item.price),
        decimals: getDecimals(item.price),
      },
      picture: item.thumbnail,
      condition: item.condition,
      address: item.address.state_name,
      free_shipping: item.shipping.free_shipping,
    });
  });

  return items.length >= 5 ? items.slice(0, 4) : items;
};

const filterSearchCategory = (data) => {
  let category = [];
  const { filters } = data;

  if (!filters.length) {
    return category;
  }

  const { values } = filters[0];

  values[0].path_from_root.map((results) => {
    category.push(results.name);
  });
  return category;
};

function routes(app) {
  router.get("/items/:id", async (req, res) => {
    const { id } = req.params;

    let detail = await fetch(`https://api.mercadolibre.com/items/${id}`);
    let description = await fetch(
      `https://api.mercadolibre.com/items/${id}/description`
    );

    detail = await detail.json();
    description = await description.json();

    res.json({
      author: {
        name: "Name",
        lastname: "Lastname",
      },
      item: {
        id: detail.id,
        title: detail.title,
        price: {
          currency: detail.currency_id,
          amount: getIntegers(detail.price),
          decimals: getDecimals(detail.price),
        },
        picture: detail.pictures[0].url,
        condition: detail.condition == "new" ? "Nuevo" : "Usado",
        free_shipping: detail.shipping,
        sold_quantity: detail.sold_quantity,
        description: description.plain_text,
      },
    });
  });

  router.get("/items", async (req, res) => {
    const search = qs.stringify(req.query);

    let response = await fetch(
      `https://api.mercadolibre.com/sites/MLA/search?${search}`
    );

    let data = await response.json();

    res.json({
      author: {
        name: "Name",
        lastname: "Lastname",
      },
      products: filterSearchItems(data),
      categories: filterSearchCategory(data),
    });
  });

  return router;
}

module.exports = routes;
