// components/core/Dashboard/Categories/CategoryModal.jsx
import { useState, useEffect } from "react";
import IconBtn from "../../common/IconBtn";
import { FiX } from "react-icons/fi";

export default function CategoryModal({ isOpen, onClose, onSubmit, category }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description || "");
    } else {
      setName("");
      setDescription("");
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const categoryData = { name, description };
    if (category) {
      categoryData.categoryId = category._id;
    }
    onSubmit(categoryData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-richblack-700 bg-opacity-50 backdrop-blur-sm">
      <div className="relative w-11/12 max-w-[500px] rounded-lg bg-richblack-800 p-6 border border-richblack-600">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-richblack-400 hover:text-richblack-5"
        >
          <FiX className="text-2xl" />
        </button>
        
        <h2 className="text-2xl font-semibold text-richblack-5 mb-6">
          {category ? "Edit Category" : "Add New Category"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-richblack-200 mb-2">
              Category Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-50"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-richblack-200 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-50 min-h-[100px]"
            />
          </div>
          
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-richblack-600 text-richblack-5 hover:bg-richblack-500 transition-all duration-200"
            >
              Cancel
            </button>
            <IconBtn
              type="submit"
              text={category ? "Update Category" : "Create Category"}
              customClasses="bg-yellow-50 text-richblack-900 hover:scale-95 transition-all duration-200"
            />
          </div>
        </form>
      </div>
    </div>
  );
}