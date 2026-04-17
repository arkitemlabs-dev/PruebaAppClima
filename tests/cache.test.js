// Pruebas unitarias para el sistema de caché
import { weatherCache } from '../src/js/cache.js';

// Prueba 2: Verificar sistema de caché
describe('WeatherCache', () => {
  beforeEach(() => {
    weatherCache.clear();
  });

  test('debe devolver dato cacheado sin llamar a fetch', () => {
    const testData = { city: 'Barcelona', temperature: 25 };
    weatherCache.set('Barcelona', testData);

    const cachedData = weatherCache.get('Barcelona');

    expect(cachedData).toEqual(testData);
  });

  test('debe devolver null si el dato ha expirado', () => {
    const testData = { city: 'Barcelona', temperature: 25 };
    // Simular timestamp antiguo (más de 5 minutos)
    const oldTimestamp = Date.now() - (6 * 60 * 1000); // 6 minutos atrás
    weatherCache.cache.set('barcelona', { data: testData, timestamp: oldTimestamp });

    const cachedData = weatherCache.get('Barcelona');

    expect(cachedData).toBeNull();
  });
});