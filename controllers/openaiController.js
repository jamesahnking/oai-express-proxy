// WE access and use the OpenAI Libranry
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const generateImage = async (req, res) => {
  // destructure req body for passage data through webform

  const { prompt, size } = req.body;

  const imageSize =
    size === "SM" ? "256x256" : size === "MD" ? "512x512" : "1024x1024";
  // place a response inside a variable
  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
    });

    // produce the image url
    const imageUrl = response.data.data[0].url;

    // produce a verification response
     return res.status(200).json({
      success: true,
      data: imageUrl,
    });

  } catch (error) {

    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
  return res.status(400).json({
    success: false,
    error: "Image was not obtained",
  });
};

module.exports = { generateImage };
