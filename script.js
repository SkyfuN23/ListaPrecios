document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById('searchInput');
    const productTable = document.getElementById('productTable');
    const tbody = productTable.getElementsByTagName('tbody')[0];
    const toggleModeButton = document.getElementById('toggleModeButton');

    let productos = []; // Variable para almacenar los datos del archivo XLSX

// Función para renderizar la tabla con formato de precio
function renderTable(data) {
    tbody.innerHTML = '';
    data.forEach((producto, index) => {
        const precioFormateado = formatPrice(producto.Precio);
        const row = tbody.insertRow();
        row.innerHTML = `<td>${index + 1}</td><td>${producto.Proveedor}</td><td>${producto.Codigo}</td><td>${producto.Descripcion}</td><td>${precioFormateado}</td>`;
    });
}

// Función para formatear el precio en formato argentino ($5.000, $30.000)
function formatPrice(price) {
    if (!price) return "$0"; // Si el precio está vacío o indefinido, devuelve "$0"
    
    const number = parseFloat(price); // Convierte el precio a número
    if (isNaN(number)) return price; // Si no es un número, devuelve el valor original

    return `$${number.toLocaleString('es-AR')}`; // Aplica el formato de Argentina
}

    // Función para cargar el archivo XLSX
    function loadExcel() {
        fetch('productos.xlsx') // Nombre del archivo XLSX
            .then(response => response.arrayBuffer())
            .then(data => {
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0]; // Tomamos la primera hoja del Excel
                const sheet = workbook.Sheets[sheetName];
                productos = XLSX.utils.sheet_to_json(sheet); // Convertimos la hoja a JSON
                renderTable(productos);
            })
            .catch(error => console.error("Error al cargar el archivo XLSX:", error));
    }

    // Cargar el archivo XLSX al cargar la página
    loadExcel();

    // Función para filtrar productos
    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = productos.filter(producto => {
            return producto.Proveedor.toLowerCase().includes(searchTerm) ||
                producto.Codigo.toLowerCase().includes(searchTerm) ||
                producto.Descripcion.toLowerCase().includes(searchTerm);
        });
        renderTable(filteredProducts);
    }

    // Función para cambiar entre modo oscuro y claro
    function toggleMode() {
        document.body.classList.toggle('dark-mode');
        const currentMode = document.body.classList.contains('dark-mode') ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro';
        toggleModeButton.textContent = currentMode;
    }

    // Escuchar eventos de entrada en el input de búsqueda
    searchInput.addEventListener('input', filterProducts);

    // Escuchar clics en el botón para alternar entre modos
    toggleModeButton.addEventListener('click', toggleMode);
});
