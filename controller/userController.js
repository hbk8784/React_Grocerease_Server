const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");

//login controller
const login = async (req, res) => {
  try {
    const row = await userModel.login(req.body);
    const { id, firstName, lastName, role, active } = row[0];

    if (row[0].active == 0) {
      res.status(400).json({ message: "account is inactive" });
      return;
    }
    const cwCount = await userModel.itemCount(id);

    const token = jwt.sign({ id, role }, process.env.JWT_STRING, {
      expiresIn: "1d",
    });

    const { gender, dob, email, phone, address } = row[0];
    const { userName, created_on, updated_on } = row[0];
    const data = {
      id,
      firstName,
      lastName,
      role,
      active,
      gender,
      dob,
      email,
      phone,
      address,
      userName,
      created_on,
      updated_on,
      token,
      cwCount,
    };
    res.status(200).json({
      message: `Welcome ${firstName} ${lastName}`,
      user: data,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//register controller
const register = async (req, res) => {
  try {
    const active = await userModel.register(req.body);

    if (active == 0) {
      res.status(200).json({
        message: "registered successfully, wait for approval",
      });
    } else {
      res
        .status(200)
        .json({ message: "successfull, please login to continue" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  login,
  register,
};
