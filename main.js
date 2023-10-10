const weatherForecast = document.querySelector("#forecast");
const weatherIconContainer = document.getElementById("weather-icon");

function showFetchedData(data) {
  const location = data.name;
  const temperature = Math.round(data.main.temp - 273.15);
  const humidity = data.main.humidity;
  const description = data.weather[0].description;
  const wind = data.wind.speed;

  weatherForecast.innerHTML = `
  <h3 >Location: ${location}</h3>
    <h4 class="text-danger">Temperature: ${temperature}°C</h4>
    <h4 >Humidity: ${humidity}%</h4>
    <h4> Cloud Condition: ${description}</h4>
    <h4 >Wind: ${wind}km/h</h4>
  `;
}

function showErrorMessage(errorMessage) {
  weatherForecast.innerHTML = errorMessage;
}

function getCloudCondition(data) {
  const thunderstormIcon = weatherIconContainer.querySelector(
    ".bi-cloud-lightning-fill"
  );
  const drizzleIcon = weatherIconContainer.querySelector(
    ".bi-cloud-drizzle-fill"
  );
  const rainIcon = weatherIconContainer.querySelector(
    ".bi-cloud-rain-heavy-fill"
  );
  const snowIcon = weatherIconContainer.querySelector(".bi-snow2");
  const hazeIcon = weatherIconContainer.querySelector(".bi-cloud-haze-fill");
  const clearSkyIcon = weatherIconContainer.querySelector(
    ".bi-brightness-high-fill"
  );
  const cloudIcon = weatherIconContainer.querySelector(".bi-cloud-fill");
  const cloudMoonIcon = weatherIconContainer.querySelector(
    ".bi-cloud-moon-fill"
  );

  if (data.weather[0].id >= 200 && data.weather[0].id <= 232) {
    thunderstormIcon.style.display = "inline";
    drizzleIcon.style.display = "none";
    rainIcon.style.display = "none";
    snowIcon.style.display = "none";
    hazeIcon.style.display = "none";
    clearSkyIcon.style.display = "none";
    cloudIcon.style.display = "none";
    cloudMoonIcon.style.display = "none";
  } else if (data.weather[0].id >= 300 && data.weather[0].id <= 321) {
    thunderstormIcon.style.display = "none";
    drizzleIcon.style.display = "inline";
    rainIcon.style.display = "none";
    snowIcon.style.display = "none";
    hazeIcon.style.display = "none";
    clearSkyIcon.style.display = "none";
    cloudIcon.style.display = "none";
    cloudMoonIcon.style.display = "none";
  } else if (data.weather[0].id >= 500 && data.weather[0].id <= 531) {
    thunderstormIcon.style.display = "none";
    drizzleIcon.style.display = "none";
    rainIcon.style.display = "inline";
    snowIcon.style.display = "none";
    hazeIcon.style.display = "none";
    clearSkyIcon.style.display = "none";
    cloudIcon.style.display = "none";
    cloudMoonIcon.style.display = "none";
  } else if (data.weather[0].id >= 600 && data.weather[0].id <= 622) {
    thunderstormIcon.style.display = "none";
    drizzleIcon.style.display = "none";
    rainIcon.style.display = "none";
    snowIcon.style.display = "inline";
    hazeIcon.style.display = "none";
    clearSkyIcon.style.display = "none";
    cloudIcon.style.display = "none";
    cloudMoonIcon.style.display = "none";
  } else if (data.weather[0].id >= 701 && data.weather[0].id <= 781) {
    thunderstormIcon.style.display = "none";
    drizzleIcon.style.display = "none";
    rainIcon.style.display = "none";
    snowIcon.style.display = "none";
    hazeIcon.style.display = "inline";
    clearSkyIcon.style.display = "none";
    cloudIcon.style.display = "none";
    cloudMoonIcon.style.display = "none";
  } else if (data.weather[0].id === 800) {
    thunderstormIcon.style.display = "none";
    drizzleIcon.style.display = "none";
    rainIcon.style.display = "none";
    snowIcon.style.display = "none";
    hazeIcon.style.display = "none";
    clearSkyIcon.style.display = "inline";
    cloudIcon.style.display = "none";
    cloudMoonIcon.style.display = "none";
  } else if (data.weather[0].id >= 801 && data.weather[0].id <= 804) {
    thunderstormIcon.style.display = "none";
    drizzleIcon.style.display = "none";
    rainIcon.style.display = "none";
    snowIcon.style.display = "none";
    hazeIcon.style.display = "none";
    clearSkyIcon.style.display = "none";
    cloudIcon.style.display = "inline";
    cloudMoonIcon.style.display = "none";
  } else {
    thunderstormIcon.style.display = "none";
    drizzleIcon.style.display = "none";
    rainIcon.style.display = "none";
    snowIcon.style.display = "none";
    hazeIcon.style.display = "none";
    clearSkyIcon.style.display = "none";
    cloudIcon.style.display = "none";
    cloudMoonIcon.style.display = "inline";
  }
}

const getWeatherData = async (location) => {
  try {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

    const ourResponse = await fetch(apiUrl);
    const result = await ourResponse.json();

    showFetchedData(result);
    getCloudCondition(result);
  } catch (myMistake) {
    showErrorMessage("Failed to fetch weather data.");
  }
};

getWeatherData("Ogun");

const submitBtn = document.querySelector("form > button");

submitBtn.addEventListener("click", () => {
  const userValue = document.querySelector("#formInput").value;

  getWeatherData(userValue);
});
