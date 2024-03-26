document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById('searchInput');
    const productTable = document.getElementById('productTable');
    const tbody = productTable.getElementsByTagName('tbody')[0];
    const toggleModeButton = document.getElementById('toggleModeButton');
    
    // Datos de ejemplo (puedes reemplazarlos con los datos de tu archivo JSON o CSV)
    const productos = [
        { proveedor: 'ALL COVERING', codigo: 'AL-2020', descripcion: 'Piso All Covering SPC SP-2050 Valvi Floor', precio: '$100' },
        { proveedor: 'MCG GROUP', codigo: 'MG-5120', descripcion: 'Alfombra YUMA 1,30 x 2,00 Blanca', precio: '$50' },
        { proveedor: 'ALL COVERING', codigo: 'AL-2021', descripcion: 'Pared All Covering SPW SP-2060 Valvi Wall', precio: '$120' },
        { proveedor: 'MCG GROUP', codigo: 'MG-5121', descripcion: 'Alfombra YUMA 1,30 x 2,00 Negra', precio: '$55' },
        { proveedor: 'TECHNO GROUP', codigo: 'TG-3001', descripcion: 'Monitor LED 24" Full HD', precio: '$150' },
        { proveedor: 'TECHNO GROUP', codigo: 'TG-3002', descripcion: 'Teclado inalámbrico con mouse', precio: '$30' },
        { proveedor: 'FURNITURE WORLD', codigo: 'FW-1001', descripcion: 'Sillón de cuero negro', precio: '$200' },
        { proveedor: 'FURNITURE WORLD', codigo: 'FW-1002', descripcion: 'Mesa de centro de madera', precio: '$120' },
        { proveedor: 'ALL COVERING', codigo: 'AL-2022', descripcion: 'Piso All Covering SPC SP-2070 Terra Floor', precio: '$110' },
        { proveedor: 'MCG GROUP', codigo: 'MG-5122', descripcion: 'Alfombra YUMA 1,30 x 2,00 Gris', precio: '$60' }
    ];      
    
    // Función para renderizar la tabla
    function renderTable(data) {
        tbody.innerHTML = '';
        data.forEach(producto => {
            const row = tbody.insertRow();
            row.innerHTML = `<td>${producto.proveedor}</td><td>${producto.codigo}</td><td>${producto.descripcion}</td><td>${producto.precio}</td>`;
        });
    }
    
    // Renderizar la tabla al cargar la página
    renderTable(productos);
    
    // Función para filtrar productos
    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = productos.filter(producto => {
            return producto.proveedor.toLowerCase().includes(searchTerm) ||
                producto.codigo.toLowerCase().includes(searchTerm) ||
                producto.descripcion.toLowerCase().includes(searchTerm);
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