// Módulo de API para llamadas a Visual Crossing Weather
import { API_BASE_URL, UNITS, NetworkError, AuthError, NotFoundError, getApiKey } from './utils.js';

// Función para transformar datos crudos de la API a formato amigable
function transformWeatherData(rawData) {
  const current = rawData.currentConditions;
  return {
    city: rawData.address,
    temperature: Math.round(current.temp),
    description: current.conditions,
    humidity: current.humidity,
    windSpeed: current.windspeed,
    icon: `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${current.icon}.png` // Iconos de Visual Crossing
  };
}

// Función principal para obtener datos meteorológicos
async function fetchWeatherData(city) {
  const apiKey = getApiKey();
  const url = `${API_BASE_URL}${encodeURIComponent(city)}?key=${apiKey}&unitGroup=${UNITS}&include=current`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new AuthError('API key inválida o expirada.');
      } else if (response.status === 400 || response.status === 404) {
        throw new NotFoundError('Ciudad no encontrada. Verifica el nombre.');
      } else {
        throw new NetworkError(`Error de red: ${response.status} ${response.statusText}`);
      }
    }

    const data = await response.json();
    return transformWeatherData(data);
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new NetworkError('Error de conexión. Verifica tu conexión a internet.');
    }
    throw error; // Re-lanzar errores personalizados
  }
}

export { fetchWeatherData };