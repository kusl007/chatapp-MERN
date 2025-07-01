// Import the required modules
import express from "express"
const router = express.Router()

// Import the required controllers and middleware functions
import  {
  login,
  signup,
  logout
} from "../controllers/Auth.js"




// Routes for Login and  Signup

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signup)

// Route for user logout
router.post("/logout", logout)




// Export the router for use in the main application

export default router