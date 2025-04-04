// components/core/Dashboard/ManageCategories.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllCategories, deleteCategory } from "../../../services/operations/categoryAPI";
import { useSelector } from "react-redux";
import IconBtn from "../../common/IconBtn";
import { RiEditBoxLine, RiDeleteBin6Line } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import ConfirmationModal from "../../common/ConfirmationModal";

export default function ManageCategories() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      try {
        const result = await fetchAllCategories(token);
        setCategories(result.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
      setLoading(false);
    };
    getCategories();
  }, []);

  const handleDelete = async (categoryId) => {
    try {
      await deleteCategory(categoryId, token);
      setCategories(categories.filter((cat) => cat._id !== categoryId));
      setConfirmationModal(null);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="w-11/12">
      <div className="flex items-center justify-between mb-14">
        <h1 className="text-3xl font-medium text-richblack-5">Manage Categories</h1>
        <IconBtn
          text="Add Category"
          onclick={() => navigate("/dashboard/add-category")}
          customClasses="bg-yellow-50 text-richblack-900 hover:scale-95 transition-all duration-200"
        >
          <FiPlus className="text-lg" />
        </IconBtn>
      </div>

      {loading ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : categories.length === 0 ? (
        <div className="grid min-h-[500px] place-items-center rounded-lg border border-richblack-700 bg-richblack-800">
          <p className="text-richblack-300 text-lg">No categories found</p>
        </div>
      ) : (
        <div className="rounded-lg border border-richblack-700 bg-richblack-800 p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-richblack-600">
                  <th className="px-4 py-3 text-left text-sm font-medium text-richblack-200">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-richblack-200">Description</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-richblack-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category._id} className="border-b border-richblack-700 hover:bg-richblack-700/50">
                    <td className="px-4 py-4 text-sm font-medium text-richblack-5">{category.name}</td>
                    <td className="px-4 py-4 text-sm text-richblack-200">
                      {category.description || "-"}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <IconBtn
                          onclick={() => navigate(`/dashboard/edit-category/${category._id}`)}
                          text="Edit"
                          customClasses=""
                        >
                          <RiEditBoxLine />
                        </IconBtn>
                        <IconBtn
                          onclick={() =>
                            setConfirmationModal({
                              text1: "Delete Category",
                              text2: "Are you sure you want to delete this category?",
                              btn1Text: "Delete",
                              btn2Text: "Cancel",
                              btn1Handler: () => handleDelete(category._id),
                              btn2Handler: () => setConfirmationModal(null),
                            })
                          }
                          text="Delete"
                          customClasses="bg-pink-500 text-pink-200 hover:bg-pink-500"
                        >
                          <RiDeleteBin6Line />
                        </IconBtn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}