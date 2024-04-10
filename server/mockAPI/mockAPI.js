const earthFacts = require("../staticResources/earthFacts.json");
const gptJokes = require("../staticResources/gptJokes.json");

const randomDataGenerator = () => {
  // Choose a random array
  const chosenArray = Math.random() < 0.5 ? earthFacts : gptJokes;

  // Choose a random index
  const randomIndex = Math.floor(Math.random() * chosenArray.length);

  // Return the chosen element
  return chosenArray[randomIndex];
};

const mockAPI = async (request) => {
  const responseData = randomDataGenerator();
  console.log("Sending Response: ", responseData)
  return { ...request, response: responseData };
};

module.exports = {
  mockAPI,
};
