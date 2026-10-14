# ⛽ GasTracker PRO — Precios de combustible en España

Mapa de gasolineras con los **precios oficiales en tiempo real** del Ministerio para la Transición Ecológica y el Reto Demográfico (MITECO). Es una sola página HTML, sin backend y sin claves de API.

🌐 **Web:** https://jpm70.github.io/Petro-Finder/

---

## ✨ Funciones

- **Búsqueda por provincia o municipio**, con todas las gasolineras de la zona en el mapa.
- **📍 Cerca de mí**: usa la ubicación del navegador y muestra las gasolineras a 5, 10, 25 o 50 km, ordenadas por distancia o por precio.
- **Colores por precio**: verde = barata, rojo = cara, comparada con las gasolineras que se muestran.
- **Agrupación de marcadores**: cada grupo muestra el precio más bajo que contiene.
- **Filtro por combustible**: Gasolina 95, Diésel, Gasolina 98, GLP y GNC. Los totales, la lista y el mapa se ajustan al combustible elegido.
- **Ficha de cada gasolinera**: todos los precios publicados (incluidos premium, AdBlue, hidrógeno…), horario y enlace **Cómo llegar**.
- **Fecha real de los precios**, tal como la publica el Ministerio (se actualizan cada media hora).
- Recuerda la última búsqueda y el tema **claro u oscuro**.

## 🛠️ Cómo funciona

| Parte | Tecnología |
|---|---|
| Datos | [API REST de Precios de Carburantes](https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/help) (MITECO), pública y con CORS abierto |
| Mapa | [Leaflet](https://leafletjs.com/) + [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) |
| Mapa base | Tiles de [OpenStreetMap](https://www.openstreetmap.org/copyright). En el tema oscuro se oscurecen con un filtro CSS |

La API no tiene búsqueda por radio, así que **Cerca de mí** descarga el listado de toda España (~12 MB) y lo guarda en memoria 30 minutos. Las búsquedas por provincia o municipio se guardan 30 minutos en `sessionStorage`.

## 🚀 Ejecutar en local

No hace falta instalar nada. Basta con servir la carpeta:

```bash
python -m http.server 8000
```

y abrir http://localhost:8000. La geolocalización solo funciona en `localhost` o con HTTPS.

## 📁 Estructura

```
Petro-Finder/
├── index.html        # Toda la app (HTML + CSS + JS)
├── assets/logo.png   # Logo de Un Fantasma en el Sistema
├── .nojekyll         # GitHub Pages sirve los archivos tal cual
└── LICENSE
```

## 📄 Licencia

[MIT](LICENSE). Precios: © Ministerio para la Transición Ecológica y el Reto Demográfico. Mapa: © colaboradores de OpenStreetMap.

---

Hecho por [Un Fantasma en el Sistema](https://www.unfantasmaenelsistema.com).
