# Weather App

Aplicación meteorológica robusta y mantenible desarrollada en JavaScript puro (ES6+), siguiendo estrictamente los principios de Clean Code (SOLID, DRY, KISS).

## Arquitectura del Código

La aplicación está organizada en módulos para maximizar la cohesión y el desacoplamiento:

- **`api.js`**: Maneja todas las llamadas a la API de OpenWeatherMap, incluyendo transformación de datos y manejo de errores.
- **`cache.js`**: Implementa un sistema de caché en memoria con marcas de tiempo para optimizar peticiones.
- **`utils.js`**: Contiene utilidades como sanitización de entradas, constantes y clases de error personalizadas.
- **`app.js`**: Lógica principal de la aplicación, maneja la interacción con el DOM y coordina los módulos.

## Cómo Ejecutar la Aplicación

1. Clona o descarga el repositorio.
2. Instala las dependencias: `npm install`
3. Obtén una API key gratuita de [OpenWeatherMap](https://openweathermap.org/api).
4. Crea un archivo `.env` en la raíz del proyecto con: `API_KEY=tu_api_key_aqui`
5. Abre `src/index.html` en tu navegador web.

## Cómo Ejecutar las Pruebas

Ejecuta `npm test` para correr las pruebas unitarias con Jest.

## Decisiones de Diseño

- **Single Responsibility Principle (SRP)**: Cada módulo tiene una responsabilidad única (API, caché, utilidades, app).
- **DRY (Don't Repeat Yourself)**: Constantes definidas en `utils.js` para evitar literales repetidos.
- **KISS (Keep It Simple, Stupid)**: Código simple y directo, sin complejidades innecesarias.
- **Manejo de Errores**: Errores clasificados en tipos específicos (NetworkError, AuthError, NotFoundError) para mensajes precisos.
- **Seguridad**: API key manejada vía variables de entorno; entradas sanitizadas para prevenir inyecciones.
- **Caché**: Patrón de diseño que reduce llamadas a la API, mejorando rendimiento y respetando límites de rate.
- **Ética en IA**: Este código fue desarrollado con asistencia de herramientas de IA, pero ha sido revisado y aprobado por desarrolladores humanos para asegurar calidad y responsabilidad.

## Licencia

MIT License - ver archivo LICENSE para detalles.