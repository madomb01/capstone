const app = require('../src/server/index.js') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)


// The describe() function takes two arguments - a string description, and a test suite as a callback function.
// A test suite may contain one or more related tests
describe("Testing the endpoints of the server", async () => {
  // The test() function has two arguments - a string description, and an actual test as a callback function.
  test("Testing POST request", async () => {
    // Define the input for the function, if any, in the form of variables/array
    // Define the expected output, if any, in the form of variables/array
    // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
    // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
    const response = await request.
      post('/postTripData').send({destination: "London"});
      expect(response.statusCode).toBe(200);
  })
});


// The describe() function takes two arguments - a string description, and a test suite as a callback function.
// A test suite may contain one or more related tests
describe("Testing the endpoints of the server", async () => {
  // The test() function has two arguments - a string description, and an actual test as a callback function.
  test("Testing GET request", async () => {
    // Define the input for the function, if any, in the form of variables/array
    // Define the expected output, if any, in the form of variables/array
    // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
    // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
    const response = await request.get('/getData');
      expect(response.statusCode).toBe(200);
  })
});
