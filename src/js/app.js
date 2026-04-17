// Lógica principal de la aplicación
import { sanitizeInput, NetworkError, AuthError, NotFoundError } from './utils.js';
import { weatherCache } from './cache.js';
import { fetchWeatherData } from './api.js';

// Función para mostrar datos en el DOM
function displayWeather(data) {
  const weatherDiv = document.getElementById('weather-display');
  weatherDiv.innerHTML = `
    <h2>${data.city}</h2>
    <img src="${data.icon}" alt="${data.description}">
    <p><strong>Temperatura:</strong> ${data.temperature}°C</p>
    <p><strong>Descripción:</strong> ${data.description}</p>
    <p><strong>Humedad:</strong> ${data.humidity}%</p>
    <p><strong>Velocidad del viento:</strong> ${data.windSpeed} m/s</p>
  `;
}

// Función para mostrar errores
function displayError(message) {
  const weatherDiv = document.getElementById('weather-display');
  weatherDiv.innerHTML = `<p class="error">${message}</p>`;
}

// Función principal para manejar la búsqueda
async function handleSearch() {
  const cityInput = document.getElementById('city-input');
  const city = sanitizeInput(cityInput.value);

  if (!city) {
    displayError('Por favor, ingresa el nombre de una ciudad.');
    return;
  }

  try {
    // Verificar caché primero
    let weatherData = weatherCache.get(city);
    if (weatherData) {
      displayWeather(weatherData);
      return;
    }

    // Si no está en caché, hacer petición
    weatherData = await fetchWeatherData(city);
    weatherCache.set(city, weatherData);
    displayWeather(weatherData);
  } catch (error) {
    if (error instanceof NetworkError) {
      displayError('Error de conexión. Intenta nuevamente.');
    } else if (error instanceof AuthError) {
      displayError('Error de autenticación. Verifica tu API key.');
    } else if (error instanceof NotFoundError) {
      displayError('Ciudad no encontrada. Verifica el nombre.');
    } else {
      displayError('Error desconocido. Intenta nuevamente.');
    }
  }
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('search-button');
  searchButton.addEventListener('click', handleSearch);

  // Permitir búsqueda con Enter
  const cityInput = document.getElementById('city-input');
  cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  });
});