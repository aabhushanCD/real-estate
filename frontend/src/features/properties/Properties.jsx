import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "../../context/authContext";
import * as propertyService from "./propertyService";
import { useState } from "react";

const Properties = () => {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();
  const [animatingId, setAnimatingId] = useState(null);

  const {
    data: propertiesData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: propertyService.getAllProperties,
    staleTime: 60 * 1000,
  });

  const favoriteMutation = useMutation({
    mutationFn: propertyService.toggleFavorite,
    onSuccess: () => {
      toast.success("Favorites updated", { position: "bottom-center" });
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
    onError: (err) => toast.error(err?.message || "Failed to update favorites", { position: "bottom-center" }),
  });

  const handleFavorite = (propertyId) => {
    if (!currentUser) {
      toast.error("Login to manage favorites", { position: "bottom-center" });
      return;
    }
    setAnimatingId(propertyId);
    setTimeout(() => setAnimatingId(null), 400);
    favoriteMutation.mutate(propertyId);
  };

  const isFavorite = (propertyId) =>
    currentUser?.savedProperties?.includes(propertyId);

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="h-9 w-48 bg-gray-200 rounded-lg animate-pulse mb-6" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="h-48 bg-gray-200 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
                <div className="h-10 bg-gray-200 rounded-lg animate-pulse mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) return <div className="p-6 text-red-500">{error.message}</div>;

  const properties = propertiesData?.properties || [];
  const favoriteProperties = properties.filter((p) => isFavorite(p._id));

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Properties Listing
      </h1>

      {/* Properties Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property, index) => (
          <div
            key={property._id}
            className="bg-white shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="relative overflow-hidden">
              <img
                src={
                  property.images[0].imageUrl ||
                  "https://via.placeholder.com/400x300"
                }
                alt={property.title}
                className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
              />
              {isFavorite(property._id) && (
                <span className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow text-sm leading-none">
                  ❤️
                </span>
              )}
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                  {property.title}
                </h2>
                <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">
                  {property.location?.address}, {property.location?.city},{" "}
                  {property.location?.country}
                </p>
                <p className="text-green-600 font-bold mt-2">
                  {property.price}
                </p>
              </div>

              <button
                onClick={() => handleFavorite(property._id)}
                disabled={
                  favoriteMutation.isPending && animatingId === property._id
                }
                className={`mt-4 w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 active:scale-95 flex items-center justify-center gap-2
                  ${
                    isFavorite(property._id)
                      ? "bg-red-50 text-red-600 hover:bg-red-100"
                      : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                  }`}
              >
                <span
                  className={`inline-block transition-transform duration-300 ${
                    animatingId === property._id ? "scale-125" : "scale-100"
                  }`}
                >
                  {isFavorite(property._id) ? "❤️" : "🤍"}
                </span>
                {isFavorite(property._id)
                  ? "Remove from Favorites"
                  : "Add to Favorites"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Favorites Section */}
      {favoriteProperties.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Your Favorites</h2>
            <span className="bg-red-100 text-red-600 text-sm font-semibold px-2.5 py-0.5 rounded-full">
              {favoriteProperties.length}
            </span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favoriteProperties.map((fav) => (
              <div
                key={fav._id}
                className="bg-white shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={
                      fav.images[0].imageUrl ||
                      "https://via.placeholder.com/400x300"
                    }
                    alt={fav.title}
                    className="w-full h-40 object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800 line-clamp-1">
                      {fav.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">
                      {fav.location?.address}, {fav.location?.city},{" "}
                      {fav.location?.country}
                    </p>
                    <p className="text-green-600 font-bold mt-1">{fav.price}</p>
                  </div>

                  <button
                    onClick={() => handleFavorite(fav._id)}
                    disabled={
                      favoriteMutation.isPending && animatingId === fav._id
                    }
                    className="mt-3 w-full bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium py-2.5 rounded-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span
                      className={`inline-block transition-transform duration-300 ${
                        animatingId === fav._id ? "scale-125" : "scale-100"
                      }`}
                    >
                      ❤️
                    </span>
                    Remove from Favorites
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Properties;