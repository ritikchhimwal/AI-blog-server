import axios from "axios";

export async function getSentiment(postDescription) {
  const prompt = `
Analyze the sentiment of the following blog post. Respond with just one word: Positive, Negative, or Neutral.

Blog post:
${postDescription}
`;

  try {
    const response = await axios({
      method: "POST",
      url: "https://open-ai21.p.rapidapi.com/conversationllama",
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-host": "open-ai21.p.rapidapi.com",
        "x-rapidapi-key": "7204430a99msh429d38d58e7c526p15c2bcjsn930ca895f5ff",
      },
      data: {
        messages: [{ role: "user", content: prompt }],
        web_access: false,
      },
    });
    return { success: true, sentiment: response.data.result };
  } catch (error) {
    console.log("Error in evaluating setiment: ", error.message);
    return { success: false, message: error.message };
  }
}
