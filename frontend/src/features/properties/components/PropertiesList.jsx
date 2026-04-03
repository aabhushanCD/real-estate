import React from "react";
import { useProperties, useToggleFavorite } from "../hooks/useProperties";

const PropertiesList = () => {
  const { data, isLoading, error } = useProperties();
  const toggleFavorite = useToggleFavorite();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.data?.map((property) => (
        <div key={property._id} className="bg-white shadow rounded p-4">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-48 object-cover rounded"
          />
          <h2 className="font-bold mt-2">{property.title}</h2>
          <p>{property.location}</p>
          <p className="text-green-600 font-semibold">{property.price}</p>
          <button
            className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
            onClick={() => toggleFavorite.mutate(property._id)}
          >
            {property.isFavorite
              ? "Remove from Favorite ❤️"
              : "Add to Favorite 🤍"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PropertiesList;
