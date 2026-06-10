// Buttons and elements used to display weather information
const tempBtn = document.getElementById("tempBtn");
const conditionBtn = document.getElementById("conditionBtn");
const weatherTitle = document.getElementById("weatherTitle");
const weatherResult = document.getElementById("weatherResult");

// Coordinates for Minneapolis, Minnesota
const latitude = 44.9778;
const longitude = -93.2650;

// Open-Meteo API endpoint
// Gets the current temperature and weather code
const apiUrl =
  `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&temperature_unit=fahrenheit`;

// Stores weather data after it is fetched from the API
let weatherData = null;

// Fetch weather data from Open-Meteo
async function getWeatherData() {
  try {

    // Send request to the API
    const response = await fetch(apiUrl);

    // Convert response to JavaScript object
    const data = await response.json();

    // Save current weather information
    weatherData = data.current;

  } catch (error) {

    // Show an error message if the request fails
    weatherResult.textContent =
      "Sorry, weather data could not be loaded.";

    console.error(error);
  }
}

// Convert weather codes into readable weather conditions
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

// Show the current temperature when the button is clicked
tempBtn.addEventListener("click", async () => {

  // Get data if it has not been loaded yet
  if (!weatherData) {
    await getWeatherData();
  }

  weatherTitle.textContent =
    "Current Temperature";

  weatherResult.textContent =
    `${weatherData.temperature_2m}°F`;
});

// Show the current weather condition when the button is clicked
conditionBtn.addEventListener("click", async () => {

  // Get data if it has not been loaded yet
  if (!weatherData) {
    await getWeatherData();
  }

  weatherTitle.textContent =
    "Current Weather Condition";

  weatherResult.textContent =
    getWeatherCondition(weatherData.weather_code);
});

// Load weather data when the page first opens
getWeatherData();