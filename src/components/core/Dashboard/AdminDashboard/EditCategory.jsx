// components/core/Dashboard/EditCategory.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllCategories, updateCategory } from "../../../../services/operations/categoryAPI";
import { useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";

export default function EditCategory() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const result = await fetchAllCategories(token);
        const category = result.data.find((cat) => cat._id === categoryId);
        if (category) {
          setFormData({
            name: category.name,
            description: category.description || "",
          });
        } else {
          navigate("/dashboard/manage-categories");
        }
      } catch (error) {
        console.error("Error fetching category:", error);
        navigate("/dashboard/manage-categories");
      }
      setFetching(false);
    };
    getCategoryDetails();
  }, [categoryId, token, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateCategory({ categoryId, ...formData }, token);
      navigate("/dashboard/manage-categories");
    } catch (error) {
      console.error("Error updating category:", error);
    }
    setLoading(false);
  };

  if (fetching) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-11/12">
      <div className="mb-14">
        <h1 className="text-3xl font-medium text-richblack-5">Edit Category</h1>
        <p className="text-richblack-300 mt-2">
          Update the details of this category
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-richblack-200 mb-2">
            Category Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter category name"
            className="w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-richblack-200 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter category description"
            className="w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-50 min-h-[150px]"
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/manage-categories")}
            className="px-4 py-2 rounded-lg bg-richblack-600 text-richblack-5 hover:bg-richblack-500 transition-all duration-200"
          >
            Cancel
          </button>
          <IconBtn
            type="submit"
            text={loading ? "Updating..." : "Update Category"}
            disabled={loading}
            customClasses="bg-yellow-50 text-richblack-900 hover:scale-95 transition-all duration-200"
          />
        </div>
      </form>
    </div>
  );
}