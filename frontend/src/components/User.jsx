import React, { useEffect, useState } from "react";
import axios from "axios";

const User = () => {
  const [data, setData] = useState([]);

  async function getUser() {
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      console.log(response);
      setData(response.data.user);
    } catch (error) {
      console.error(error);
    }
  }

  const handleClickToDelete = async (itemEmail) => {
    try {
      if (window.confirm("Silmek istediğinize emin misiniz?")) {
        const response = await axios.delete(
          `http://localhost:3000/api/users/${itemEmail}`
        );
        console.log(response);
        alert("Kullanıcı Silindi!");
      } else {
        alert("Silme İşlemi Başarısız!");
      }
    } catch (error) {
      console.log(error);
    }

    getUser();
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <React.Fragment>
      <section className="container mx-auto p-6 font-mono">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3">Username</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {data.map((item) => {
                  return (
                    <tr key={item._id} className="text-gray-700">
                      <td className="px-4 py-3 border">
                        <div className="flex items-center text-sm">
                          <div className="relative w-14 h-14 mr-3 rounded-full md:block">
                            <img
                              className="object-cover w-full h-full rounded-full"
                              src={item.avatar}
                              alt=""
                              loading="lazy"
                            />
                            <div
                              className="absolute inset-0 rounded-full shadow-inner"
                              aria-hidden="true"></div>
                          </div>
                          <div>
                            <p className="font-semibold text-black">{item.username}</p>
                            <p className="text-xs text-gray-600">user</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-xs border">
                        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                          {" "}
                          {item.email}{" "}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm border">{item.createdAt}</td>
                      <td className="px-4 py-3 text-sm border text-center">
                        <button
                          onClick={() => handleClickToDelete(item.email)}
                          className=" bg-red-500 text-white rounded hover:bg-red-600 transition-all p-2">
                          {" "}
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default User;
