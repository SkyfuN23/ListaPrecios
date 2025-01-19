document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById('searchInput');
    const productTable = document.getElementById('productTable');
    const tbody = productTable.getElementsByTagName('tbody')[0];
    const toggleModeButton = document.getElementById('toggleModeButton');

    let productos = []; // Variable para almacenar los datos del archivo CSV

    // Función para renderizar la tabla
    function renderTable(data) {
        tbody.innerHTML = '';
        data.forEach((producto, index) => {
            const row = tbody.insertRow();
            row.innerHTML = `<td>${index + 2}</td><td>${producto.Proveedor}</td><td>${producto.Codigo}</td><td>${producto.Descripcion}</td><td>${producto.Precio}</td>`;
        });
    }

    // Función para cargar el archivo CSV
    function loadCSV() {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const csv = xhr.responseText;
                    const lines = csv.split('\n');
                    const headers = lines[0].split(';'); // Utilizar punto y coma como delimitador
                    productos = lines.slice(1, -1).map(line => {
                        const values = line.split(';'); // Utilizar punto y coma como delimitador
                        const producto = {};
                        headers.forEach((header, index) => {
                            producto[header.trim()] = values[index].trim();
                        });
                        return producto;
                    });
                    renderTable(productos);
                } else {
                    console.error('Error al cargar el archivo CSV');
                }
            }
        };
        xhr.open('GET', 'productos.csv'); // Nombre del archivo CSV
        xhr.send();
    }

    // Cargar el archivo CSV al cargar la página
    loadCSV();

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