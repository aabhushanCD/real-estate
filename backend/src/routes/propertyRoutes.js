import express from "express";

import {
  createProperty,
  deleteProperty,
  getAllProperties,
  getPropertyById,
  toggleFavorite,
  updateProperty,
} from "../controllers/propertyController.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

// Public routes
router.get("/", getAllProperties);
router.get("/:id", getPropertyById);

// Protected routes
router.use(verifyToken); // all routes below need authentication

router.post("/", createProperty); // create property (admin/owner)
router.put("/:id", updateProperty); // update property
router.delete("/:id", deleteProperty); // delete property
router.post("/:id/favorite", toggleFavorite); // add/remove favorite

export default router;
