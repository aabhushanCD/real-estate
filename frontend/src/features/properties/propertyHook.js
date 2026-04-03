import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as propertyService from "../services/propertyService";
import { toast } from "sonner";

// Fetch all properties
export const useProperties = () => {
  return useQuery(["properties"], propertyService.getAllProperties, {
    onError: (error) => toast.error(error.message),
    staleTime: 1000 * 60, // 1 minute
    cacheTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Fetch single property
export const useProperty = (id) => {
  return useQuery(["property", id], () => propertyService.getPropertyById(id), {
    enabled: !!id,
    onError: (error) => toast.error(error.message),
  });
};

// Create property
export const useCreateProperty = () => {
  const queryClient = useQueryClient();
  return useMutation(propertyService.createProperty, {
    onSuccess: () => {
      toast.success("Property created successfully");
      queryClient.invalidateQueries(["properties"]);
    },
    onError: (error) => toast.error(error.message),
  });
};

// Update property
export const useUpdateProperty = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, data }) => propertyService.updateProperty(id, data),
    {
      onSuccess: () => {
        toast.success("Property updated successfully");
        queryClient.invalidateQueries(["properties"]);
      },
      onError: (error) => toast.error(error.message),
    },
  );
};

// Delete property
export const useDeleteProperty = () => {
  const queryClient = useQueryClient();
  return useMutation(propertyService.deleteProperty, {
    onSuccess: () => {
      toast.success("Property deleted successfully");
      queryClient.invalidateQueries(["properties"]);
    },
    onError: (error) => toast.error(error.message),
  });
};

// Toggle favorite
export const useToggleFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation(propertyService.toggleFavorite, {
    onSuccess: () => {
      toast.success("Favorites updated");
      queryClient.invalidateQueries(["properties"]);
      queryClient.invalidateQueries(["user"]); 
    },
    onError: (error) => toast.error(error.message),
  });
};
