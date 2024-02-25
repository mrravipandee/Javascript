// DOM selectors
const citySearchInput = document.querySelector(".search input");
const citySearchButton = document.querySelector(".search button");

const cityElement = document.querySelector(".city");
const tempElement = document.querySelector("#temp");
const humidityElement = document.querySelector("#humidity");
const windElement = document.querySelector("#wind");
const weatherIcon = document.querySelector(".weather-icon"); // Declare weatherIcon

// API key
const apiKey = "61c5e0053aa29d94330cdbfbeb52892e";

// Function to fetch weather data
async function fetchWeatherData(cityName) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error during fetch: ${error.message}`);
  }
}

// Function to update UI with weather data
function updateUI(weatherData) {
  console.log(weatherData);
  cityElement.innerHTML = weatherData.name;
  tempElement.innerHTML = weatherData.main.temp;
  humidityElement.innerHTML = weatherData.main.humidity;
  windElement.innerHTML = weatherData.wind.speed;

  if (weatherData.weather[0].main == "Clouds") {
    weatherIcon.src = "images/clouds.png";
  } else if (weatherData.weather[0].main == "Clear") {
    weatherIcon.src = "images/clear.png";
  } else if (weatherData.weather[0].main == "Rain") {
    weatherIcon.src = "images/rain.png";
  } else if (weatherData.weather[0].main == "Drizzle") {
    weatherIcon.src = "images/drizzle.png";
  } else if (weatherData.weather[0].main == "Mist") {
    weatherIcon.src = "images/mist.png";
  }
}

// Event listener for the search button
citySearchButton.addEventListener("click", async () => {
  const cityName = citySearchInput.value;

  try {
    const weatherData = await fetchWeatherData(cityName);
    updateUI(weatherData);
  } catch (error) {
    console.error(error.message);
    // Handle error in UI if needed
  }
});

// Initial fetch when the page loads (use the default city)
document.addEventListener("DOMContentLoaded", function () {
  fetchDefaultWeatherData();
});

async function fetchDefaultWeatherData() {
  const defaultCityName = "Nashik"; // Set your default city here
  try {
    const defaultWeatherData = await fetchWeatherData(defaultCityName);
    updateUI(defaultWeatherData);
  } catch (error) {
    console.error(error.message);
    // Handle error in UI if needed
  }
}
