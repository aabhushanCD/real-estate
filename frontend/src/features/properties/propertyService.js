import { axiosInstance } from "../../api/axiosInstance";


// Fetch all properties
export const getAllProperties = async () => {
  try {
    const res = await axiosInstance.get("/property");
    return res.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || "Failed to fetch properties",
    );
  }
};

// Fetch single property by ID
export const getPropertyById = async (id) => {
  try {
    const res = await axiosInstance.get(`/property/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || "Failed to fetch property",
    );
  }
};

// Create property (admin/owner)
export const createProperty = async (data) => {
  try {
    const res = await axiosInstance.post("/property", data);
    return res.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || "Failed to create property",
    );
  }
};

// Update property
export const updateProperty = async (id, data) => {
  try {
    const res = await axiosInstance.put(`/property/${id}`, data);
    return res.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || "Failed to update property",
    );
  }
};

// Delete property
export const deleteProperty = async (id) => {
  try {
    const res = await axiosInstance.delete(`/property/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || "Failed to delete property",
    );
  }
};

// Toggle favorite
export const toggleFavorite = async (id) => {
  try {
    const res = await axiosInstance.post(`/property/${id}/favorite`);
    return res.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || "Failed to toggle favorite",
    );
  }
};
