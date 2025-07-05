import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(500)
        .send({ success: false, message: "User Unauthorize" });

    try {
      // Verifying the JWT using the secret key stored in environment variables
      const decode = await jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      // Storing the decoded JWT payload in the request object for further use
      req.user = decode;
    } catch (error) {
      // If JWT verification fails, return 401 Unauthorized response
      return res
        .status(401)
        .json({ success: false, message: "token is invalid" });
    }

    next();
  } catch (error) {
    console.log(`error in isAuthenticated middleware ${error.message}`);
    res.status(500).send({
      success: false,
      message: `Something Went Wrong While Validating the Token`,
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({ email: req.user.email });

    if (userDetails.accountType !== "admin") {
      return res.status(401).json({
        success: false,
        message: "This is a Protected Route for Admin",
      });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `User Role Can't be Verified` });
  }
};
export const isAgent = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({ email: req.user.email });
    console.log(userDetails);

    console.log(userDetails.accountType);

    if (userDetails.accountType !== "agent") {
      return res.status(401).json({
        success: false,
        message: "This is a Protected Route for Agent",
      });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `User Role Can't be Verified` });
  }
};
