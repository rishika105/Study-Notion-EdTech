const axios = require("axios");

exports.chatbotPrompt = async (req, res) => {
  try {
    // Log the incoming request for debugging
    // console.log("Received chatbot request:", req.body);

    const { prompt, history } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) {
      // console.error("GEMINI_API_KEY environment variable is not set!");
      return res.status(500).json({
        success: false,
        message: "API key configuration error",
      });
    }

    // Use the correct API version and model name
    const API_URL =
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

    // Remove this system instruction
    // const systemInstruction = {
    //   role: "system",
    //   parts: [{
    //     text: "Please provide helpful but concise responses, limited to around 50-100 words when possible. Focus on being direct and informative."
    //   }]
    // };

    // Instead, make sure your request doesn't include any system role
    let requestData = {
      contents: [],
    };

    // Add chat history if provided
    if (history && history.length > 0) {
      // Filter out any system messages
      requestData.contents = history.filter((msg) => msg.role !== "system");
    }

    // Add the current prompt as the final user message
    requestData.contents.push({
      role: "user",
      parts: [{ text: `${prompt} + Please provide helpful but concise responses, limited to around 40-50 words when possible. Focus on being direct and informative.` }],
    });

    // Add request parameters for concise responses
    const generationConfig = {
      maxOutputTokens: 100, // Limit output length
      temperature: 0.7, // Slightly reduced creativity for more direct responses
    };

    console.log("Sending request to Gemini API:", {
      url: API_URL,
      data: requestData,
    });

    // Make the API request using axios
    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      {
        ...requestData,
        generationConfig,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Extract the generated text
    const generatedText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated.";

    console.log("Received response from Gemini API");

    // Send successful response
    res.status(200).json({
      success: true,
      data: { answer: generatedText },
      response: generatedText,
    });
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: error.message || "Error processing your request",
      error: error.response?.data?.error?.message || error.toString(),
    });
  }
};
