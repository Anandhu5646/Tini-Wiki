import jwt from 'jsonwebtoken'

const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.adminToken;
    if (!token) {
      return res.json({ loggedIn: false, message: "no token" });
    }
    const verifiedJWT = jwt.verify(token, "thisismysecretkey");
    req.admin = verifiedJWT;
    next();
  } catch (error) {
    console.log(error);
    res.json({ loggedIn: false, error });
  }
};

export default verifyAdmin; 