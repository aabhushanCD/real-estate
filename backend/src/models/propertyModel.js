import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    location: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        default: "Nepal",
      },
    },

    propertyType: {
      type: String,
      enum: ["house", "apartment", "land", "villa"],
      required: true,
    },

    bedrooms: {
      type: Number,
      default: 0,
    },

    bathrooms: {
      type: Number,
      default: 0,
    },

    area: {
      type: Number, // square feet
    },

    images: [
      {
        imageUrl: String,
        publicId: String, // cloudinary id
      },
    ],

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export const Property = mongoose.model("Property", propertySchema);
