const pool = require("../db/connection");
const bcryptjs = require("bcryptjs");

const userModel = {
  login: async function (data) {
    try {
      let query = `SELECT * FROM users WHERE userName = ?`;
      let [row] = await pool.execute(query, [data.userName]);

      if (row.length == 0) {
        throw new Error("User not found");
      } else {
        let match = bcryptjs.compareSync(data.password, row[0].password);
        if (match) {
          return row;
        } else {
          throw new Error("Wrong User Name or Password");
        }
      }
    } catch (error) {
      throw error;
    }
  },

  register: async function (data) {
    try {
      //matching password and re-enter password for user miss inputs
      if (data.password != data.rePassword) {
        throw new Error(
          "password field and re-entered password field did not match"
        );
      }
      //checking whether email and phone number are unique
      const [row] = await pool.query(
        "SELECT * FROM users WHERE email = ? OR phone = ? OR userName = ?",
        [data.email, data.phone, data.userName]
      );

      if (row.length > 0) {
        throw new Error("Email or Phone number or userName already exists");
      }

      //if email and phone number is unique registering the user
      else {
        let query = `INSERT INTO users (firstName, lastName, gender, dob, email, phone, address, userName, password, role, active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        let active = 1;
        if (data.role == "seller") {
          active = 0;
        }

        //hashing the password
        let salt = bcryptjs.genSaltSync(10);
        let password = bcryptjs.hashSync(data.password, salt);

        // Data to be inserted
        let values = [
          data.firstName,
          data.lastName,
          data.gender,
          data.dob,
          data.email,
          data.phone,
          data.address,
          data.userName,
          password,
          data.role,
          active,
        ];
        // Executing the query with the provided values in registeration form
        await pool.execute(query, values);
        return active;
      }
    } catch (error) {
      //this will only run when email and phone number already exists in the database
      throw error;
    }
  },

  itemCount: async function (id) {
    try {
      const query1 = `select count(*) as inCart from cart where user_id = ?;`;
      const [row1] = await pool.execute(query1, [id]);

      const query2 = `select count(*) as inWishlist from wishlist where user_id = ?;`;
      const [row2] = await pool.execute(query2, [id]);

      const data = { ...row1[0], ...row2[0] };
      // console.log(row1[0], row2[0]);
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = userModel;
