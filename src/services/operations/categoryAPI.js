// services/operations/categoryAPI.js
import { apiConnector } from "../apiconnector";
import { categories } from "../api";
import toast from "react-hot-toast";

export const fetchAllCategories = async () => {
  try {
    const response = await apiConnector("GET", categories.CATEGORIES_API);

    if(!response.data.success){
      throw new Error("Failed to fetch categories");
    }

    console.log("Fetched categories:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const createCategory = async (data, token) => {
  try {
    const response = await apiConnector("POST", categories.CREATE_CATEGORY_API, data,      {
      Authorization: `Bearer ${token}`,
    });

    if(!response.data.success) {
      throw new Error("Failed to create category");
    }
    toast.success("Category created successfully");
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    toast.error("Failed to create category");
    throw error;
  }
};

export const updateCategory = async (data, token) => {
  try {
    const response = await apiConnector("PUT", categories.UPDATE_CATEGORY_API, data,
      {
        Authorization: `Bearer ${token}`,
      }


    );

    if(!response.data.success) {
      throw new Error("Failed to update category");
    }
    toast.success("Category updated successfully");
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    toast.error("Failed to update category");
    throw error;
  }
};

export const deleteCategory = async (categoryId, token) => {
  try {
    const response = await apiConnector("DELETE", categories.DELETE_CATEGORY_API, {
      categoryId,
    },      
    {
      Authorization: `Bearer ${token}`,
    });

    if(!response.data.success) {
      throw new Error("Failed to delete category");
    }
    toast.success("Category deleted successfully");
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    toast.error("Failed to delete category");
    throw error;
  }
};