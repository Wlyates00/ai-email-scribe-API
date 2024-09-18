// CONTEXT-MENU SIDE
const generateBodyParagragh = async (req, res) => {
  const { promptText } = req.body;

  // Construct the messages for OpenAI API
  const messages = [
    {
      role: "system",
      content: `Write a body paragragh of an email from the user's perspective using a reasonable tone. The paragragh should address the following prompt: ${promptText}. Ensure that the tone and content is relevant to the user's intent. Make sure its only the body paragragh and stay within token limits.`,
    },
    { role: "user", content: promptText },
  ];

  // Contact Open AI API
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages,
        max_tokens: 100,
        temperature: 0.7,
      }),
    });

    // Check if there is an error in the response
    if (!response.ok) {
      const errorData = await response.json();
      return res
        .status(response.status)
        .json({ error: errorData.error?.message });
    }

    // Wait for response from Open AI
    const data = await response.json();
    // Grab the email they generate
    const generatedEmail = data.choices[0].message.content.trim();
    // Adding a json file with my newly generated email inside to my API response
    res.json({ generatedEmail });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// EXTENTION SIDE
const generateEmail = async (req, res) => {
  // Input values for the api to create a response
  const { tone, promptText } = req.body;

  // Previously constructed prompt (Like a Prepared statement in SQL)
  const messages = [
    {
      role: "system",
      content: `You are going to act as the user. Write an email from the user's perspective using a ${tone} tone. The email should address the following prompt: ${promptText}. Ensure that the tone and content is relevant to the user's intent. Keep the email concise and ensure it is within a short length to stay within token limits of 120.`,
    },
    { role: "user", content: promptText },
  ];

  // Trying an API call to OpenAI
  try {
    // Awaiting a response from the specified endpoint
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      // Setting header content type and passing in OpenAI key
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      // Setting the body for the request
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Chosen model
        messages: messages, // Prepared statement
        max_tokens: 125, // Amount of chars allowed for generation
        temperature: 0.7, // Randomness or Uniqueness
      }),
    });

    // Checking if our response to OpenAI is successful
    if (!response.ok) {
      // Grab the error response from json
      const errorData = await response.json();
      return res
        .status(response.status)
        .json({ error: errorData.error?.message });
    }

    // Wait for response from Open AI
    const data = await response.json();
    // Grab the email they generate
    const generatedEmail = data.choices[0].message.content.trim();
    // Adding a json file with my newly generated email inside to my API response
    res.json({ generatedEmail });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { generateBodyParagragh, generateEmail };
