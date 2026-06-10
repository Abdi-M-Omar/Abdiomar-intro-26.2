/*
  Select buttons and elements from the page
  so JavaScript can update them dynamically.
*/
const tempBtn = document.getElementById("tempBtn");
const conditionBtn = document.getElementById("conditionBtn");
const weatherTitle = document.getElementById("weatherTitle");
const weatherResult = document.getElementById("weatherResult");

/*
  Minneapolis latitude and longitude.
  Open-Meteo requires coordinates instead
  of city names.
*/
const latitude = 44.9778;
const longitude = -93.2650;

/*
  Open-Meteo API URL.

  Request #1:
  Current temperature

  Request #2:
  Current weather code

  These satisfy the assignment requirement
  to retrieve two different pieces of data.
*/
const apiUrl =
  `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&temperature_unit=fahrenheit`;

/*
  Variable used to store API data after
  it is retrieved.
*/
let weatherData = null;

/*
  Fetch weather information from the API.

  async/await allows us to wait for the
  API response before using the data.
*/
async function getWeatherData() {
  try {

    // Send request to Open-Meteo
    const response = await fetch(apiUrl);

    // Convert JSON response into JavaScript object
    const data = await response.json();

    // Save current weather data
    weatherData = data.current;

  } catch (error) {

    // Display message if API request fails
    weatherResult.textContent =
      "Sorry, weather data could not be loaded.";

    console.error(error);
  }
}

/*
  Convert Open-Meteo weather codes into
  human-readable weather descriptions.
*/
function getWeatherCondition(code) {

  if (code === 0) return "Clear Sky";

  if (code <= 3) return "Partly Cloudy";

  if (code <= 48) return "Foggy";

  if (code <= 67) return "Rainy";

  if (code <= 77) return "Snowy";

  if (code <= 82) return "Rain Showers";

  if (code <= 99) return "Thunderstorm";

  return "Unknown Condition";
}

/*
  Temperature button event listener.

  Displays current temperature when clicked.
*/
tempBtn.addEventListener("click", async () => {

  // Load data if not already loaded
  if (!weatherData) {
    await getWeatherData();
  }

  // Update page title
  weatherTitle.textContent =
    "Current Temperature";

  // Display temperature
  weatherResult.textContent =
    `${weatherData.temperature_2m}°F`;
});

/*
  Weather Condition button event listener.

  Displays current weather condition
  when clicked.
*/
conditionBtn.addEventListener("click", async () => {

  // Load data if not already loaded
  if (!weatherData) {
    await getWeatherData();
  }

  // Update page title
  weatherTitle.textContent =
    "Current Weather Condition";

  // Convert weather code into readable text
  weatherResult.textContent =
    getWeatherCondition(weatherData.weather_code);
});

/*
  Automatically fetch weather data when
  page loads so information is ready when
  user clicks a button.
*/
getWeatherData();