const pool = require("../db/connection");
const bcrypt = require("bcryptjs");

const customerModel = {
  profile: function () {
    console.log("user profile ");
    return;
  },
  // {updating existing user}
  updateProfile: async function (data) {
    const id = data.id;

    try {
      if (data.email || data.userName || data.phone) {
        const [row] = await pool.query(
          "SELECT * FROM users WHERE email = ? OR phone = ? OR userName = ?",
          [data.email, data.phone, data.userName]
        );
        if (row.length > 0) {
          throw new Error("Email or Phone number or userName already exists");
        }
      }

      for (key in data) {
        if (key == "password") {
          const salt = bcrypt.genSaltSync(10);
          let password = bcrypt.hashSync(data.password, salt);

          const query = `UPDATE users SET password = ? WHERE id = ?`;
          await pool.execute(query, [password, id]);
        } else {
          const query = `UPDATE users SET ${key} = ? WHERE id = ?`;
          await pool.execute(query, [data[key], id]);
        }
      }
      const userData = await pool.query(`SELECT * FROM users WHERE id = ?`, [
        id,
      ]);

      return userData;
    } catch (error) {
      throw error;
    }
  },

  orders: function () {
    console.log("orders");
  },
  makeOrders: function () {
    console.log("orders Made");
  },
  trackOrders: function () {
    console.log("track orders");
  },

  getWishList: function () {
    console.log("wishlist");
  },
  addToWishList: function () {
    console.log("add to wishList");
  },
  removeFromWishList: function () {
    console.log("removing from wishlist");
  },
  getCart: function () {
    console.log("getting cart items");
  },
  addToCart: function () {
    console.log("adding item to the cart");
  },
  removeFromCart: function () {
    console.log("remove from cart");
  },
  getInvoice: function () {
    console.log("getting from invoice");
  },
  getMessage: function () {
    console.log("getting all messages");
  },
  sendMessages: function () {
    console.log("sending message");
  },
};

module.exports = customerModel;
