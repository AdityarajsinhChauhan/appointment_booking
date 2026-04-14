import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router";

const Table = ({ data }) => {
  const navigate = useNavigate();


  return (
    <div className="p-6 w-full">

  {/* Scroll Wrapper */}
  <div className="overflow-x-auto">
    
    <div className="min-w-[700px] bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
      
      {/* Table Header */}
      <div className="grid grid-cols-6 bg-gray-50 px-6 py-3 text-sm font-semibold border-b border-gray-300 text-gray-600">
        <span>Name</span>
        <span>Email</span>
        <span>Contact</span>
        <span>Role</span>
        <span className="text-center">View</span>
        <span className="text-center">Action</span>
      </div>

      {/* Rows */}
      {data.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-6 items-center px-6 py-4 hover:bg-gray-50 transition"
        >
          <div className="font-medium text-gray-800">{item.name}</div>
          <div className="text-gray-500 text-sm">{item.email}</div>
          <div className="text-gray-500 text-sm">{item.contact}</div>

          <div>
            <span
              className={`px-3 py-1 text-xs rounded-full font-medium ${
                item.role === "ADMIN"
                  ? "bg-purple-100 text-purple-600"
                  : item.role === "PROVIDER"
                  ? "bg-teal-100 text-teal-600"
                  : "bg-sky-100 text-sky-600"
              }`}
            >
              {item.role}
            </span>
          </div>

          <div className="text-center">
            {item.role === "PROVIDER" ? (
              <button
                onClick={() =>
                  navigate(`/provider/${item?.providers?.id}`)
                }
                className="text-sky-600 hover:underline text-sm"
              >
                View More
              </button>
            ) : (
              <span className="text-gray-400 text-sm">—</span>
            )}
          </div>

          <div className="text-center">
            <button className="text-red-500 hover:text-red-700">
              <Trash2 />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
  );
};

export default Table;