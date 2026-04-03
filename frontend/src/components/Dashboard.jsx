const properties = [
  {
    id: 1,
    price: "$240,000",
    location: "Kathmandu",
    beds: 3,
    baths: 2,
    area: "1400 sqft",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
  },
  {
    id: 2,
    price: "$310,000",
    location: "Lalitpur",
    beds: 4,
    baths: 3,
    area: "1800 sqft",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    id: 3,
    price: "$200,000",
    location: "Bhaktapur",
    beds: 2,
    baths: 2,
    area: "1200 sqft",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
  },
];

const Dashboard = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HERO SEARCH SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Find Your Dream Property
          </h1>

          <p className="text-gray-500 mb-8">
            Browse homes, apartments, and land listings easily.
          </p>

          {/* Search Bar */}
          <div className="bg-white shadow-md rounded-xl p-3 flex gap-3">
            <input
              type="text"
              placeholder="Search by city or location..."
              className="flex-1 outline-none px-3 py-2"
            />

            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-semibold text-slate-800">
            Featured Properties
          </h2>

          <button className="text-blue-600 hover:underline">View All</button>
        </div>

        {/* Property Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <img
                src={property.image}
                alt="property"
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-lg font-semibold text-slate-800">
                  {property.price}
                </h3>

                <p className="text-gray-500 text-sm mb-4">
                  {property.location}
                </p>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>{property.beds} Beds</span>
                  <span>{property.baths} Baths</span>
                  <span>{property.area}</span>
                </div>

                <button className="mt-5 w-full border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition" >
                  Add to Favroite
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
