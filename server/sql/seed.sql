-- Categorías
INSERT IGNORE INTO categorias (nombre) VALUES
    ('Frenos'),
    ('Motor'),
    ('Suspensión'),
    ('Eléctrico'),
    ('Filtros');

-- Proveedores
INSERT IGNORE INTO proveedores (nombre_empresa, rfc, telefono) VALUES
    ('AutoPartes del Norte SA', 'APN920301ABC', '8001234567'),
    ('Distribuidora Mex Parts',  'DMP010101XYZ', '5559876543'),
    ('Importadora de Refacciones', 'IRF880101XYZ', '5551234567');

-- Usuarios
INSERT IGNORE INTO usuarios (nombre_completo, email, password, rol) VALUES
    ('Admin Sistema', 'admin@refaccionaria.com',  '$2b$10$0GMBsov1uOKk3gYFwTIknuP5dMl4wOzbg4w7miSjwJ6p/jP44LSsG', 'admin'),
    ('Juan Cajero',   'cajero1@refaccionaria.com', '$2b$10$MMHb/VDmKOU8nEQwZLhOV.5v5yo0UcDU57GluYRT8I4reNc9O2n4m', 'cajero'),
    ('Saúl López',    'saulo0507@hotmail.com',     '$2b$10$0GMBsov1uOKk3gYFwTIknuP5dMl4wOzbg4w7miSjwJ6p/jP44LSsG', 'admin'),
    ('Cliente Demo',  'cliente@demo.com',          '$2b$10$MMHb/VDmKOU8nEQwZLhOV.5v5yo0UcDU57GluYRT8I4reNc9O2n4m', 'cliente');

-- Productos (id_categoria: 1=Frenos, 2=Motor, 3=Suspensión, 4=Eléctrico, 5=Filtros)
INSERT IGNORE INTO productos (id_categoria, nombre, descripcion, precio, stock, ubicacion_pasillo) VALUES
    (1, 'Pastillas de Freno Cerámicas', 'Pastillas de freno cerámicas para alto rendimiento', 850.00, 50, 'A-01'),
    (1, 'Discos de Freno Ventilados', 'Disco de freno ventilado de 280mm', 1200.00, 30, 'A-02'),
    (2, 'Bujías de Iridio', 'Juego de 4 bujías de iridio NGK', 450.00, 100, 'B-01'),
    (2, 'Filtro de Aceite', 'Filtro de aceite para motor 4 cilindros', 180.00, 200, 'B-02'),
    (3, 'Amortiguadores Delanteros', 'Par de amortiguadores delanteros gas', 2500.00, 20, 'C-01'),
    (3, 'Resortes Helicoidales', 'Juego de 4 resortes para suspensión', 3200.00, 15, 'C-02'),
    (4, 'Batería 12V 72Ah', 'Batería libre de mantenimiento 12V 72Ah', 1800.00, 25, 'D-01'),
    (4, 'Alternador 120A', 'Alternador 120 amperes para motor 2.0L', 3500.00, 10, 'D-02'),
    (5, 'Filtro de Aire', 'Filtro de aire para motor 1.6L - 2.0L', 250.00, 150, 'E-01'),
    (5, 'Filtro de Combustible', 'Filtro de combustible en línea', 120.00, 120, 'E-02');

-- Compatibilidades
INSERT IGNORE INTO compatibilidades (id_producto, marca, modelo, anio_inicio, anio_fin) VALUES
    (1, 'Toyota', 'Corolla', 2010, 2024),
    (1, 'Honda', 'Civic', 2012, 2024),
    (2, 'Nissan', 'Versa', 2015, 2024),
    (3, 'Toyota', 'Camry', 2018, 2024),
    (3, 'Honda', 'Accord', 2019, 2024),
    (5, 'Toyota', 'Hilux', 2010, 2024),
    (5, 'Nissan', 'NP300', 2015, 2024);

-- Histórico de entradas
INSERT IGNORE INTO historico_entradas (id_producto, id_proveedor, precio_compra, cantidad) VALUES
    (1, 1, 550.00, 100),
    (2, 1, 800.00, 60),
    (3, 2, 300.00, 200),
    (4, 2, 120.00, 500),
    (5, 3, 1800.00, 40);
