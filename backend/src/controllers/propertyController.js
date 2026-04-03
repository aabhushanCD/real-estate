import { Property } from "../models/propertyModel.js";
import { User } from "../models/userModel.js";

// CREATE / ADD PROPERTY (Admin or Owner)
export const createProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      location,
      propertyType,
      bedrooms,
      bathrooms,
      area,
      images,
    } = req.body;

    const property = await Property.create({
      title,
      description,
      price,
      location,
      propertyType,
      bedrooms,
      bathrooms,
      area,
      images,
      owner: req.user.id, // assuming auth middleware sets req.user
    });

    return res.status(201).json({ message: "Property created", property });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating property", error: error.message });
  }
};

// GET ALL PROPERTIES
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate(
      "owner",
      "fullName email",
    );
    return res.status(200).json({ properties });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching properties", error: error.message });
  }
};

// GET PROPERTY BY ID
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "owner",
      "fullName email",
    );

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    return res.status(200).json({ property });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching property", error: error.message });
  }
};

// UPDATE PROPERTY (Owner/Admin)
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property)
      return res.status(404).json({ message: "Property not found" });

    // Optional: check owner
    if (property.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this property" });
    }

    Object.assign(property, req.body);
    await property.save();

    return res.status(200).json({ message: "Property updated", property });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating property", error: error.message });
  }
};

// DELETE PROPERTY
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    // Optional: check owner
    if (property.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this property" });
    }

    await property.remove();
    return res.status(200).json({ message: "Property deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting property", error: error.message });
  }
};

// ADD / REMOVE PROPERTY TO BUYER FAVORITES
export const toggleFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const propertyId = req.params.id;

    if (!user) return res.status(404).json({ message: "User not found" });

    const index = user.savedProperties.indexOf(propertyId);
    let message = "";

    if (index === -1) {
      // Add to favorites
      user.savedProperties.push(propertyId);
      message = "Property added to favorites";
    } else {
      // Remove from favorites
      user.savedProperties.splice(index, 1);
      message = "Property removed from favorites";
    }

    await user.save();
    return res
      .status(200)
      .json({ message, savedProperties: user.savedProperties });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error toggling favorite", error: error.message });
  }
};
