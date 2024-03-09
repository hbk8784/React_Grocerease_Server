const pool = require("../db/connection");

const product = {
  get: async function (data) {
    try {
      // console.log("this is mode\n", data);

      if (
        data.mainCat == "all" &&
        data.subCat == "all" &&
        data.brand == "all" &&
        data.status == "all"
      ) {
        const query = `SELECT * FROM products LIMIT ? OFFSET ?;`;
        const row = await pool.query(query, [+data.limit, data.offset]);
        return row[0];
      } else {
        const query = `select * from products where ${
          data.mainCat && data.mainCat != "all" ? "mainCat = ?" : ""
        } ${data.subCat && data.subCat != "all" ? "And subCat = ?" : ""} ${
          data.brand && data.brand != "all" ? "And brand = ?" : ""
        } ${data.status && data.status != "all" ? "And status = ?" : ""} ${
          data.priceRange ? "And price < ?" : ""
        } LIMIT ? OFFSET ? ;`;

        console.log("this is from get", query);

        let valueArray = []; //taking vlaues for query execution
        if (data.mainCat && data.mainCat != "all") {
          valueArray.push(data.mainCat);
        }
        if (data.subCat && data.subCat != "all") {
          valueArray.push(data.subCat);
        }
        if (data.brand && data.brand != "all") {
          valueArray.push(data.brand);
        }
        if (data.status && data.status != "all") {
          valueArray.push(data.status);
        }
        valueArray.push(+data.priceRange);
        valueArray.push(+data.limit);
        valueArray.push(data.offset);

        console.log("this is from get", valueArray);

        const row = await pool.query(query, valueArray);
        return row[0];
      }
    } catch (error) {
      console.log(error);
    }
  },

  //-----------------Product Counting-------------------------
  productCount: async function (data) {
    try {
      if (
        data.mainCat == "all" &&
        data.subCat == "all" &&
        data.brand == "all" &&
        data.status == "all"
      ) {
        const query = `SELECT COUNT(*) AS count from products;`;
        const row = await pool.execute(query);
        return row[0][0].count;
      }
      //-------------------------------------------------------------------------
      else {
        const query = `select COUNT(*) AS count from products where ${
          data.mainCat && data.mainCat != "all" ? "mainCat = ?" : ""
        } ${data.subCat && data.subCat != "all" ? "And subCat = ?" : ""} ${
          data.brand && data.brand != "all" ? "And brand = ?" : ""
        } ${data.status && data.status != "all" ? "And status = ?" : ""} ${
          data.priceRange ? "And price < ?" : ""
        } ;`;

        // console.log("this is from counting:", query);
        //------------------------------------------------------------------------

        let valueArray = []; //taking vlaues for query execution
        if (data.mainCat && data.mainCat != "all") {
          valueArray.push(data.mainCat);
        }
        if (data.subCat && data.subCat != "all") {
          valueArray.push(data.subCat);
        }
        if (data.brand && data.brand != "all") {
          valueArray.push(data.brand);
        }
        if (data.status && data.status != "all") {
          valueArray.push(data.status);
        }
        valueArray.push(+data.priceRange);

        console.log(valueArray);

        const row = await pool.query(query, valueArray);
        // console.log("this is from counting ", row);
        return row[0][0].count;
      }
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = product;
