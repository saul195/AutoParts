CREATE TABLE IF NOT EXISTS categorias (
    id_categoria  INT          NOT NULL AUTO_INCREMENT,
    nombre        VARCHAR(50)  NOT NULL,
    CONSTRAINT pk_categorias PRIMARY KEY (id_categoria),
    CONSTRAINT uq_categoria_nombre UNIQUE (nombre)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS proveedores (
    id_proveedor   INT          NOT NULL AUTO_INCREMENT,
    nombre_empresa VARCHAR(100) NOT NULL,
    rfc            VARCHAR(15),
    telefono       VARCHAR(15),
    CONSTRAINT pk_proveedores PRIMARY KEY (id_proveedor),
    CONSTRAINT uq_proveedor_nombre UNIQUE (nombre_empresa)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario      INT          NOT NULL AUTO_INCREMENT,
    nombre_completo VARCHAR(100) NOT NULL,
    email           VARCHAR(150) NOT NULL,
    password        VARCHAR(255) NOT NULL,
    rol             VARCHAR(20)  NOT NULL DEFAULT 'cajero',
    fecha_registro  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado          VARCHAR(20)  NOT NULL DEFAULT 'activo',
    CONSTRAINT pk_usuarios    PRIMARY KEY (id_usuario),
    CONSTRAINT uq_email       UNIQUE      (email),
    CONSTRAINT chk_rol        CHECK (rol    IN ('admin','cajero','almacen','cliente','usuario')),
    CONSTRAINT chk_estado_usr CHECK (estado IN ('activo','inactivo'))
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS productos (
    id_producto       INT           NOT NULL AUTO_INCREMENT,
    id_categoria      INT           NOT NULL,
    nombre            VARCHAR(100)  NOT NULL,
    descripcion       TEXT,
    precio            DECIMAL(10,2) NOT NULL,
    stock             INT           NOT NULL DEFAULT 0,
    ubicacion_pasillo VARCHAR(50),
    imagen_url        TEXT,
    CONSTRAINT pk_productos        PRIMARY KEY (id_producto),
    CONSTRAINT fk_prod_categoria   FOREIGN KEY (id_categoria)
        REFERENCES categorias(id_categoria)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT chk_precio  CHECK (precio >= 0),
    CONSTRAINT chk_stock   CHECK (stock  >= 0)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS compatibilidades (
    id_compatibilidad INT         NOT NULL AUTO_INCREMENT,
    id_producto       INT         NOT NULL,
    marca             VARCHAR(50) NOT NULL,
    modelo            VARCHAR(50) NOT NULL,
    anio_inicio       YEAR        NOT NULL,
    anio_fin          YEAR        NOT NULL,
    CONSTRAINT pk_compatibilidades PRIMARY KEY (id_compatibilidad),
    CONSTRAINT fk_compat_producto  FOREIGN KEY (id_producto)
        REFERENCES productos(id_producto)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT chk_anios CHECK (anio_fin >= anio_inicio)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS historico_entradas (
    id_historico  INT           NOT NULL AUTO_INCREMENT,
    id_producto   INT           NOT NULL,
    id_proveedor  INT           NOT NULL,
    precio_compra DECIMAL(10,2) NOT NULL,
    cantidad      INT           NOT NULL,
    fecha_entrada DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_historico          PRIMARY KEY (id_historico),
    CONSTRAINT fk_hist_producto      FOREIGN KEY (id_producto)
        REFERENCES productos(id_producto)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT fk_hist_proveedor     FOREIGN KEY (id_proveedor)
        REFERENCES proveedores(id_proveedor)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT chk_precio_compra CHECK (precio_compra >= 0),
    CONSTRAINT chk_cantidad_ent  CHECK (cantidad > 0)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS ventas (
    id_venta     INT           NOT NULL AUTO_INCREMENT,
    id_usuario   INT           NOT NULL,
    fecha        DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    subtotal     DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    iva          DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    total        DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    estado_venta VARCHAR(20)   NOT NULL DEFAULT 'pendiente',
    CONSTRAINT pk_ventas        PRIMARY KEY (id_venta),
    CONSTRAINT fk_venta_usuario FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT chk_estado_venta CHECK (estado_venta IN ('pendiente','pagada','cancelada'))
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS detalle_ventas (
    id_detalle   INT           NOT NULL AUTO_INCREMENT,
    id_venta     INT           NOT NULL,
    id_producto  INT           NOT NULL,
    cantidad     INT           NOT NULL,
    precio_venta DECIMAL(10,2) NOT NULL,
    CONSTRAINT pk_detalle          PRIMARY KEY (id_detalle),
    CONSTRAINT fk_det_venta        FOREIGN KEY (id_venta)
        REFERENCES ventas(id_venta)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_det_producto     FOREIGN KEY (id_producto)
        REFERENCES productos(id_producto)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT chk_cantidad_det  CHECK (cantidad     >  0),
    CONSTRAINT chk_precio_det    CHECK (precio_venta >= 0)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS pagos (
    id_pago       INT           NOT NULL AUTO_INCREMENT,
    id_venta      INT           NOT NULL,
    metodo_pago   VARCHAR(30)   NOT NULL,
    monto         DECIMAL(10,2) NOT NULL,
    tarjeta       VARCHAR(50),
    transaccion   VARCHAR(50),
    estado_cuenta VARCHAR(20)   NOT NULL DEFAULT 'completado',
    fecha_pago    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_pagos        PRIMARY KEY (id_pago),
    CONSTRAINT fk_pago_venta   FOREIGN KEY (id_venta)
        REFERENCES ventas(id_venta)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT chk_metodo_pago  CHECK (metodo_pago   IN ('efectivo','tarjeta_debito',
                                                          'tarjeta_credito','transferencia')),
    CONSTRAINT chk_monto        CHECK (monto         >  0),
    CONSTRAINT chk_estado_pago  CHECK (estado_cuenta IN ('completado','pendiente','rechazado'))
) ENGINE=InnoDB;
