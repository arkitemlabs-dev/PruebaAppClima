// Constantes y utilidades compartidas
// Principio DRY: Evitar literales repetidos
const API_BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutos en milisegundos
const UNITS = 'metric'; // Celsius

// Clases de error personalizadas para manejo profesional
class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NetworkError';
  }
}

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthError';
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

// Función para sanitizar entradas de texto (seguridad contra inyecciones)
function sanitizeInput(input) {
  if (typeof input !== 'string') {
    throw new Error('Entrada debe ser una cadena de texto');
  }
  // Remover caracteres potencialmente peligrosos
  return input.trim().replace(/[<>]/g, '');
}

// Función para obtener la API key de forma segura (sugerencia de variables de entorno)
function getApiKey() {
  // En producción, usar process.env.API_KEY
  // Para desarrollo, simular con una variable (reemplazar con .env real)
  const apiKey = process.env.API_KEY || 'demo_key'; // Reemplazar con tu key real
  if (!apiKey || apiKey === 'demo_key') {
    throw new AuthError('API key no configurada. Configura API_KEY en variables de entorno.');
  }
  return apiKey;
}

export { API_BASE_URL, CACHE_DURATION_MS, UNITS, NetworkError, AuthError, NotFoundError, sanitizeInput, getApiKey };