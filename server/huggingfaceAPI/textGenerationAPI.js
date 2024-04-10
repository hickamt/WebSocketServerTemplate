require("dotenv").config();

// const {
//   validateTextGenerationObject,
// } = require("../errorHandling/requestValidation");

/**
 * Text Generation API call to Huggingface which requires the request object contain
 * the following properties (key:values).
 * @param {Object: {aiModelName: string, aiModelType: string, aiModelURL: string, prompt: string}} request
 * @returns an object containing the original request data and the ai model response or
 * a new error is thrown.
 */
const textGenerationAPI = async (request) => {
  console.log("Server Side Received A Request: ", request);
  const responseData =
    "This is a successful test of the websocket api call and response.";
  // validateTextGenerationObject(request);
  return { ...request, response: responseData };
  // try {
  //   validateTextGenerationObject(request);
  //   const HUGGINGFACE_URL = `https://api-inference.huggingface.co/models/${request.aiModelURL}`;
  //   const HUGGINGFACE_API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;
  //   const response = await axios.post(
  //     HUGGINGFACE_URL,
  //     {
  //       inputs: request.prompt,
  //     },
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${HUGGINGFACE_API_TOKEN}`,
  //       },
  //     }
  //   );

  //   return { ...request, response: response.data };
  // } catch (error) {
  //   throw new Error(
  //     `An error occurred while making the API request: ${error.message}`
  //   );
  // }
};

module.exports = {
  textGenerationAPI,
};
