const apiKey = 'f488310099bf7bc61f43a24165649d0d';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Fetch weather data
async function fetchWeather() {
  const city = document.getElementById('cityInput').value;
  const errorMessage = document.getElementById('errorMessage');
  const modal = document.getElementById('weatherModal');
  const weatherDetails = document.getElementById('weatherDetails');

  // Clear previous error message and modal content
  errorMessage.textContent = '';
  weatherDetails.innerHTML = '';

  if (!city) {
    errorMessage.textContent = '⚠️ Please enter a city name.';
    return;
  }

  try {
    // Display loading animation
    weatherDetails.innerHTML = '<div class="loader"></div>';
    modal.style.display = 'block';

    const response = await fetch(`${baseUrl}?q=${city}&appid=${apiKey}&units=metric`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('City not found. Please enter a valid city name.');
      } else if (response.status === 401) {
        throw new Error('Invalid API Key. Please check your configuration.');
      } else {
        throw new Error('Unable to fetch weather data. Try again later.');
      }
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    weatherDetails.innerHTML = `<p class="error">⚠️ ${error.message}</p>`;
  }
}

// Display weather in the modal
function displayWeather(data) {
  const weatherDetails = document.getElementById('weatherDetails');
  const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

  const content = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <img src="${iconUrl}" alt="${data.weather[0].description}">
    <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
    <p><strong>Condition:</strong> ${data.weather[0].description}</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
  `;
  weatherDetails.innerHTML = content;
}

// Close modal
function closeModal() {
  const modal = document.getElementById('weatherModal');
  modal.style.display = 'none';
}
