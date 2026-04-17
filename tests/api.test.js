// Pruebas unitarias con Jest
import { fetchWeatherData } from '../src/js/api.js';

// Mock de fetch para las pruebas
global.fetch = jest.fn();

// Prueba 1: Verificar transformación de datos de la API
describe('fetchWeatherData', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('debe transformar correctamente los datos crudos de la API', async () => {
    const mockApiResponse = {
      address: 'Madrid',
      currentConditions: {
        temp: 20.5,
        humidity: 65,
        conditions: 'cielo despejado',
        icon: 'clear-day',
        windspeed: 3.5
      }
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockApiResponse)
    });

    // Mock process.env para la API key
    process.env.API_KEY = 'test_key';

    const result = await fetchWeatherData('Madrid');

    expect(result).toEqual({
      city: 'Madrid',
      temperature: 21, // Math.round(20.5)
      description: 'cielo despejado',
      humidity: 65,
      windSpeed: 3.5,
      icon: 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/clear-day.png'
    });
  });
});