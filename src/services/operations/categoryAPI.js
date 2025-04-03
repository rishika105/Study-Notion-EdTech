// services/operations/categoryAPI.js
import { apiConnector } from "../apiconnector";
import { categories } from "../apis";

export const fetchAllCategories = async () => {
  try {
    const response = await apiConnector("GET", categories.CATEGORIES_API);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const createCategory = async (data) => {
  try {
    const response = await apiConnector("POST", categories.CREATE_CATEGORY_API, data);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const updateCategory = async (data) => {
  try {
    const response = await apiConnector("PUT", categories.UPDATE_CATEGORY_API, data);
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const response = await apiConnector("DELETE", categories.DELETE_CATEGORY_API, {
      categoryId,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};