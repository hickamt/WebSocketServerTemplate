const earthFacts = require("../staticResources/earthFacts.json");
const gptJokes = require("../staticResources/gptJokes.json");

/**
 * Basic random generator to find and return a joke
 * or fact
 * @returns a randomly generated joke or fact object
 */
const randomDataGenerator = () => {
  // Choose a random array
  const chosenArray = Math.random() < 0.5 ? earthFacts : gptJokes;

  // Choose a random index
  const randomIndex = Math.floor(Math.random() * chosenArray.length);

  // Return the chosen element
  return chosenArray[randomIndex];
};

/**
 * Randomly pulls down a joke or fact from static .json files
 * and returns those as an additional object to the original
 * response
 *
 * NOTE: (async/await) is not necessary but added to the mockAPI
 * in anticipation of a real API call that would require async
 * await blocking for the response object.
 * @param {object} request
 * @returns response object
 */
const mockAPI = async (request) => {
  const responseData = randomDataGenerator();
  console.log("Sending Response: ", responseData);
  return { ...request, response: responseData };
};

module.exports = {
  mockAPI,
};
