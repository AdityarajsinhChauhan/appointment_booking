import { Trash2 } from "lucide-react";

const Table = ({ data }) => {

  return (
    <div className="p-5">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm text-left">
          
          {/* Header */}
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-600">Name</th>
              <th className="px-6 py-3 font-medium text-gray-600">Email</th>
              <th className="px-6 py-3 font-medium text-gray-600">Specialization</th> 
              <th className="px-6 py-3 font-medium text-gray-600">Experience</th>  
              <th className="px-6 py-3 font-medium text-gray-600">Role</th>
              <th className="px-6 py-3 font-medium text-gray-600 text-center">Action</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {data.map((item) => (
              
              <tr
                key={item.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {item.name}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {item.email}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {/* {item.providers.specialization} */}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {/* {item.providers.experience_years} */}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {item.role}
                </td>

                {/* Delete Action */}
                <td className="px-6 py-4 flex justify-center">
                  <button className="p-2 rounded-lg hover:bg-red-50 transition">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Table;