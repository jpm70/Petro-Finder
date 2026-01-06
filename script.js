const map = L.map('map').setView([40.4167, -3.7037], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let markers = [];
const API_BASE = "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes";

// 1. Cargar todas las provincias al iniciar
window.onload = async () => {
    try {
        const response = await fetch(`${API_BASE}/Listados/Provincias/`);
        const provincias = await response.json();
        const selectProv = document.getElementById('provincia');
        selectProv.innerHTML = '<option value="">Selecciona Provincia</option>';
        
        provincias.forEach(p => {
            let opt = document.createElement('option');
            opt.value = p.IDPovincia;
            opt.textContent = p.Provincia;
            selectProv.appendChild(opt);
        });
    } catch (e) { console.error("Error provincias", e); }
};

// 2. Cargar municipios cuando cambia la provincia
async function cargarMunicipios() {
    const provId = document.getElementById('provincia').value;
    const selectMun = document.getElementById('municipio');
    selectMun.innerHTML = '<option value="">Cargando...</option>';

    if (!provId) return;

    try {
        const response = await fetch(`${API_BASE}/Listados/MunicipiosPorProvincia/${provId}`);
        const municipios = await response.json();
        selectMun.innerHTML = '<option value="">Cualquier Localidad</option>';
        
        municipios.forEach(m => {
            let opt = document.createElement('option');
            opt.value = m.IDMunicipio;
            opt.textContent = m.Municipio;
            selectMun.appendChild(opt);
        });
    } catch (e) { console.error("Error municipios", e); }
}

// 3. Buscar y dibujar en el mapa
async function buscarGasolineras() {
    const provId = document.getElementById('provincia').value;
    const munId = document.getElementById('municipio').value;
    
    if (!provId) return alert("Elige al menos una provincia");

    markers.forEach(m => map.removeLayer(m));
    markers = [];

    // Si hay municipio usamos filtro de municipio, si no, de provincia
    const endpoint = munId 
        ? `/EstacionesTerrestres/FiltroMunicipio/${munId}` 
        : `/EstacionesTerrestres/FiltroProvincia/${provId}`;

    try {
        const response = await fetch(API_BASE + endpoint);
        const data = await response.json();
        const estaciones = data.ListaEESSPrecio;

        if (estaciones.length > 0) {
            const lats = estaciones.map(e => parseFloat(e['Latitud'].replace(',', '.')));
            const lngs = estaciones.map(e => parseFloat(e['Longitud (WGS84)'].replace(',', '.')));
            map.fitBounds([[Math.min(...lats), Math.min(...lngs)], [Math.max(...lats), Math.max(...lngs)]]);
        }

        estaciones.forEach(est => {
            const lat = parseFloat(est['Latitud'].replace(',', '.'));
            const lon = parseFloat(est['Longitud (WGS84)'].replace(',', '.'));
            
            const marker = L.marker([lat, lon]).addTo(map);
            marker.bindPopup(`
                <b>${est['Rótulo']}</b><br>
                ${est['Dirección']}<br>
                <hr>
                G95: <b>${est['Precio Gasolina 95 E5'] || '--'} €</b><br>
                Gasoil: <b>${est['Precio Gasoleo A'] || '--'} €</b>
            `);
            markers.push(marker);
        });
    } catch (e) { alert("Error al obtener precios"); }
}