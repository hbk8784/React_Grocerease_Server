const pool = require("../db/connection");

const homeModel = {
  getHome: async function () {
    const q1 = `SELECT * FROM products ORDER BY RAND() LIMIT ?;`;
    const r1 = await pool.query(q1, [2]);
    const r2 = await pool.query(q1, [10]);

    const hero = r1[0];
    const best = r2[0];

    return { hero, best };
  },
};

module.exports = homeModel;
