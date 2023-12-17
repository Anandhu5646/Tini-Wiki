import adminModel from "../models/adminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


var salt = bcrypt.genSaltSync(10);
const adminAuthController = {
  postAdminLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const admin = await adminModel.findOne({ email }).exec();
      
      if (!admin) {
        return res.json({ error: true, message1: "You have no admin access" });
      }
      
    const validPassword = await bcrypt.compare(password , admin.password)
    if(!validPassword){
      return res.json({message: "Incorrect email or password"})
    }
      const token = jwt.sign(
        {
          id: admin._id,
        },
        process.env.JWT_KEY
      );
      
      return res
        .cookie("adminToken", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
          secure: true,
          sameSite: "none",
        })
        .json({ error: false, success: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error, success: false, message: "Server error" });
    }
  },

  postAdminLogout: async (req, res) => {
    const token = req.cookies.adminToken;
    res
      .cookie("adminToken", token, {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
      })
      .json({ success: true, message: "logged out", error: false });
  },

  checkAdminLoggedIn: async (req, res) => {
    try {
      const token = req.cookies.adminToken;
      
      if (!token) {
        return res.json({ loggedIn: false, message: "no token" });
      }
      
      const verifiedJWT = jwt.verify(token, process.env.JWT_KEY);
      
      return res.json({ name: verifiedJWT.name, loggedIn: true });
    } catch (error) {
      res.json({ loggedIn: false, error });
    }
  },
};

export default adminAuthController;
