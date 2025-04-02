import toast from "react-hot-toast";
import { endpoints } from "../api";
import { apiConnector } from "../apiconnector";

const { AI_CHAT_API } = endpoints;

export async function getAIResponse(
    question,
    setLoading,
    setAIResponse,
    setErrorMessage,
    setIsError,
    history = []
) {
    const toastId = toast.loading("Loading...");
    setLoading(true);
    try {
        // Log the request for debugging
        console.log("Sending request to AI API with question:", question);
        
        const response = await apiConnector("POST", AI_CHAT_API, {
            prompt: question,
            history: history // Pass along the chat history if provided
        });

        console.log("AI API RESPONSE.....", response);

        if (!response.data.success) {
            throw new Error(response.data.message || "Failed to get response from AI service");
        }

        toast.success("AI Response Received Successfully");
        setAIResponse(response.data.data.answer);
    } catch (error) {
        console.log("AI API ERROR.....", error);
        toast.error("Could not get AI Response");
        setIsError(true);
        setErrorMessage(error.response?.data?.message || error.message || "Unknown error occurred");
    } finally {
        setLoading(false);
        toast.dismiss(toastId);
    }
}

// Additional function with chat history support
export async function getAIResponseWithHistory(prompt, history = []) {
    try {
        const response = await apiConnector("POST", AI_CHAT_API, {
            prompt,
            history
        });
        
        if (!response.data.success) {
            throw new Error(response.data.message || "Failed to get AI response");
        }
        
        return response.data.data.answer;
    } catch (error) {
        console.error("AI API error:", error);
        throw error;
    }
}