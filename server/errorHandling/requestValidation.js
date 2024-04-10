/**
 * Validates the request object for the text generation API.
 *
 * @param {Object} request - The request object.
 * @param {string} request.aiModelName - The name of the AI model.
 * @param {string} request.aiModelType - The type of the AI model.
 * @param {string} request.aiModelURL - The URL of the AI model.
 * @param {string} request.prompt - The prompt for the text generation.
 * @returns {boolean} Returns true if the request object is valid.
 * @throws {Error} Throws an error if the request object is invalid.
 */
const validateTextGenerationObject = async (request) => {
  if (!request) {
    throw new Error("Request object is undefined");
  }

  if (!request.type || typeof request.type !== "string") {
    throw new Error("Invalid or missing aiModelType");
  }

  // Check that each required field is present and of the correct type
  if (!request.aiModelName || typeof request.aiModelName !== "string") {
    throw new Error("Invalid or missing aiModelName");
  }

  if (!request.aiModelURL || typeof request.aiModelURL !== "string") {
    throw new Error("Invalid or missing aiModelURL");
  }

  if (!request.prompt || typeof request.prompt !== "string") {
    throw new Error("Invalid or missing prompt");
  }

  return true;
};

module.exports = {
  validateTextGenerationObject,
};
