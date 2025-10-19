"use client";

import { Check, Loader, Loader2, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPlatforms } from "../../../lib/actions/(platforms)/create-platforms";
import { fetchPlatforms } from "../../../lib/actions/(platforms)/fetch-platforms";

export default function PlatformsPage() {
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPlatforms().then((data) => {
      setPlatforms(data);
    });
  }, []);

  //ignore
  const [formData, setFormData] = useState({
    name: "",
    short_name: "",
    is_active: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const newPlatform = {
      ...formData,
    };
    try {
      const response = await createPlatforms(newPlatform);
      setPlatforms((prev) => [...prev, newPlatform]);
      setFormData({ name: "", short_name: "", is_active: false });
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Platform Manager
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Section: Platforms Table */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded"></div>
              Your Platforms
            </h2>

            {platforms?.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">No platforms added yet.</p>
                <p className="text-sm text-gray-400 mt-2">
                  Add your first platform using the form →
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        Name
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        Short
                      </th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        Created
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {platforms?.map((platform, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 hover:bg-blue-50 transition-colors"
                      >
                        <td className="py-4 px-4 font-medium text-gray-800">
                          {/* {platform.id} */}
                          {platform.name}
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                            {platform.short_name}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          {platform.is_active ? (
                            <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                              <Check className="w-4 h-4" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                              <X className="w-4 h-4" />
                              Inactive
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-gray-600 text-sm">
                          {platform.created_at}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Right Section: Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded"></div>
              Add New Platform
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platform Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., LinkedIn"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Name
                </label>
                <input
                  type="text"
                  name="short_name"
                  value={formData.short_name}
                  onChange={handleChange}
                  placeholder="e.g., LI"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                />
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    Set as Active
                  </span>
                </label>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="animate-spin stroke-2" />
                ) : (
                  <>
                    {" "}
                    <Plus className="w-5 h-5" />
                    Add Platform
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
         
    </div>
  );
}
