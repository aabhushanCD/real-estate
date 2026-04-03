import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
    },

    avatar: {  // publicId for cloudinary or other store to remove or get it specifically from the store
      imageUrl: {
        type: String,
        default: "",
      },
      publicId: {
        type: String,
        default: "",
      },
    },

    role: {
      type: String,
      enum: ["buyer", "admin"],
      default: "buyer",
    },

    savedProperties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
