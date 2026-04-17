// Módulo de caché en memoria
import { CACHE_DURATION_MS } from './utils.js';

// Patrón de diseño para almacenar resultados con marca de tiempo
class WeatherCache {
  constructor() {
    this.cache = new Map();
  }

  // Almacenar dato con timestamp
  set(city, data) {
    this.cache.set(city.toLowerCase(), {
      data,
      timestamp: Date.now()
    });
  }

  // Obtener dato si está dentro del tiempo límite
  get(city) {
    const entry = this.cache.get(city.toLowerCase());
    if (!entry) return null;

    const now = Date.now();
    if (now - entry.timestamp > CACHE_DURATION_MS) {
      this.cache.delete(city.toLowerCase());
      return null;
    }

    return entry.data;
  }

  // Limpiar caché (útil para testing o reinicio)
  clear() {
    this.cache.clear();
  }
}

// Instancia singleton del caché
const weatherCache = new WeatherCache();

export { weatherCache };