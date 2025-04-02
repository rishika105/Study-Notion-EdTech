const axios = require("axios");

exports.chatbotPrompt = async (req, res) => {
  try {
    // Log the incoming request for debugging
    console.log("Received chatbot request:", req.body);
    
    const { prompt, history } = req.body;
    
    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required"
      });
    }

    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) {
      console.error("GEMINI_API_KEY environment variable is not set!");
      return res.status(500).json({
        success: false,
        message: "API key configuration error"
      });
    }

    // Use the correct API version and model name
    const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";
    
    // Build the request data with proper formatting
    let requestData = {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ]
    };

    // Include chat history if provided - with proper role formatting
    if (history && history.length > 0) {
      // Reset the contents array and build it properly with history
      requestData.contents = history.map(msg => {
        // Make sure each message has a role
        if (!msg.role) {
          // Assume alternating roles if not specified
          const isEven = history.indexOf(msg) % 2 === 0;
          msg.role = isEven ? "user" : "model";
        }
        return msg;
      });
      
      // Add the current prompt as the final user message
      requestData.contents.push({
        role: "user",
        parts: [{ text: prompt }]
      });
    }

    console.log("Sending request to Gemini API:", {
      url: API_URL,
      data: requestData
    });

    // Make the API request using axios
    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      requestData,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    // Extract the generated text
    const generatedText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";

    console.log("Received response from Gemini API");

    // Send successful response
    res.status(200).json({
      success: true,
      data: { answer: generatedText },
      response: generatedText
    });
    
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    
    return res.status(500).json({
      success: false,
      message: error.message || "Error processing your request",
      error: error.response?.data?.error?.message || error.toString()
    });
  }
};