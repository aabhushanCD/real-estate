import { Outlet } from "react-router";
const Card = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Outlet />
    </div>
  );
};

export default Card;
