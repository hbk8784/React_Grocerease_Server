const pool = require("../db/connection");

const sellerModel = {
  getDashboard: function () {
    console.log(" this is the get dash query");
  },

  getOrders: function () {
    console.log("this is the get orders query");
  },

  getProducts: async function (...data) {
    try {
      if (data[0] === "all") {
        const query = `SELECT * FROM products WHERE seller_id=? LIMIT ? OFFSET ? ;`;
        const row = await pool.query(query, [data[1], data[2], data[3]]);
        return row[0];
      } else if (data[0] === "in stock") {
        const query = `SELECT * FROM products WHERE seller_id = ? AND status = ? LIMIT ? OFFSET ?;`;
        const row = await pool.query(query, [
          data[1],
          data[0],
          data[2],
          data[3],
        ]);
        return row[0];
      } else {
        const query = `SELECT * FROM products WHERE seller_id=? AND status = ? LIMIT ? OFFSET ?;`;
        const row = await pool.query(query, [
          data[1],
          data[0],
          data[2],
          data[3],
        ]);
        return row[0];
      }
    } catch (error) {
      throw error;
    }
  },
  productCount: async function (data) {
    const q1 = `select count(*) AS 'all' from products where seller_id = ?;`;
    const q2 = `select count(*) AS 'in_stock' from products where seller_id = ? AND status=?;`;
    const q3 = `select count(*) AS 'out_stock' from products where seller_id = ? AND status=?;`;

    const all = await pool.query(q1, [data.id]);
    const sin = await pool.query(q2, [data.id, "in stock"]);
    const out = await pool.query(q3, [data.id, "out stock"]);

    const allCount = all[0][0].all;
    const inStockCount = sin[0][0].in_stock;
    const outStockCount = out[0][0].out_stock;

    return { allCount, inStockCount, outStockCount };
  },

  addProducts: async function (data) {
    let query = `INSERT INTO products(name,
      description,
      mainCat,
      subCat,
      brand,
      weight,
      status,
      price,
      qty,
      seller_id,
      image) VALUES (?,?,?,?,?,?,?,?,?,?,?);`;

    try {
      await pool.query(query, [
        data.name,
        data.description,
        data.mainCat,
        data.subCat,
        data.brand,
        data.weight,
        data.status,
        data.price,
        data.qty,
        data.seller_id,
        data.image,
      ]);
    } catch (error) {
      throw error;
    }
  },
  updateProduct: function () {
    console.log("this is the query for updating products");
  },
  deleteProduct: function () {
    console.log("this is the query to delete the prouducts");
  },
};

module.exports = sellerModel;
