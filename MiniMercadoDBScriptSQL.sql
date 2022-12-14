USE [master]
GO
/****** Object:  Database [miniMercadoV2]    Script Date: 3/11/2022 17:28:50 ******/
CREATE DATABASE [miniMercadoV2]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'miniMercadoV2', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\miniMercadoV2.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'miniMercadoV2_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\miniMercadoV2_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [miniMercadoV2] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [miniMercadoV2].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [miniMercadoV2] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [miniMercadoV2] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [miniMercadoV2] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [miniMercadoV2] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [miniMercadoV2] SET ARITHABORT OFF 
GO
ALTER DATABASE [miniMercadoV2] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [miniMercadoV2] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [miniMercadoV2] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [miniMercadoV2] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [miniMercadoV2] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [miniMercadoV2] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [miniMercadoV2] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [miniMercadoV2] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [miniMercadoV2] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [miniMercadoV2] SET  DISABLE_BROKER 
GO
ALTER DATABASE [miniMercadoV2] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [miniMercadoV2] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [miniMercadoV2] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [miniMercadoV2] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [miniMercadoV2] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [miniMercadoV2] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [miniMercadoV2] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [miniMercadoV2] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [miniMercadoV2] SET  MULTI_USER 
GO
ALTER DATABASE [miniMercadoV2] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [miniMercadoV2] SET DB_CHAINING OFF 
GO
ALTER DATABASE [miniMercadoV2] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [miniMercadoV2] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [miniMercadoV2] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [miniMercadoV2] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [miniMercadoV2] SET QUERY_STORE = OFF
GO
USE [miniMercadoV2]
GO
/****** Object:  User [minimercado]    Script Date: 3/11/2022 17:28:50 ******/
CREATE USER [minimercado] FOR LOGIN [minimercado] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[clasificacion_t]    Script Date: 3/11/2022 17:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[clasificacion_t](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](50) NULL,
 CONSTRAINT [PK_clasificacion_t] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cliente_t]    Script Date: 3/11/2022 17:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cliente_t](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NULL,
	[nit] [varchar](50) NULL,
	[direccion] [varchar](50) NULL,
	[telefono] [varchar](50) NULL,
	[email] [varchar](50) NULL,
	[tipoClienteId] [int] NOT NULL,
 CONSTRAINT [PK_cliente_t] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[compra_t]    Script Date: 3/11/2022 17:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[compra_t](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[fechaIngreso] [date] NOT NULL,
	[usuarioId] [int] NOT NULL,
	[descripcion] [varchar](max) NULL,
	[importe] [numeric](18, 2) NULL,
 CONSTRAINT [PK_compra_t] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[contenido_t]    Script Date: 3/11/2022 17:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[contenido_t](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](50) NOT NULL,
	[valorUnitario] [int] NOT NULL,
 CONSTRAINT [PK_contenido_t] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[detalleCompra_t]    Script Date: 3/11/2022 17:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[detalleCompra_t](
	[compraId] [int] NOT NULL,
	[productoId] [int] NOT NULL,
	[fechaVencimiento] [date] NULL,
	[entrada] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[detalleProducto_t]    Script Date: 3/11/2022 17:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[detalleProducto_t](
	[productoId] [int] NOT NULL,
	[marcaId] [int] NOT NULL,
	[clasificacionId] [int] NOT NULL,
	[presentacionId] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[detalleVenta_t]    Script Date: 3/11/2022 17:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[detalleVenta_t](
	[ventaId] [int] NOT NULL,
	[productoId] [int] NOT NULL,
	[salida] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[factura_t]    Script Date: 3/11/2022 17:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[factura_t](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[fecha] [date] NULL,
	[idVenta] [int] NULL,
	[importeTotal] [numeric](18, 2) NULL,
 CONSTRAINT [PK_factura_t] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[marca_t]    Script Date: 3/11/2022 17:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[marca_t](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](50) NULL,
 CONSTRAINT [PK_marca_t] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[precio_t]    Script Date: 3/11/2022 17:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[precio_t](
	[idprecio] [int] IDENTITY(1,1) NOT NULL,
	[productoId] [int] NOT NULL,
	[contenidoId] [int] NOT NULL,
	[precioVenta] [numeric](18, 2) NULL,
 CONSTRAINT [PK_precio_t] PRIMARY KEY CLUSTERED 
(
	[idprecio] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[presentacion_t]    Script Date: 3/11/2022 17:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[presentacion_t](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](50) NULL,
 CONSTRAINT [PK_presentacion_t] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[producto_t]    Script Date: 3/11/2022 17:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[producto_t](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[codigoBarras] [varchar](50) NULL,
	[nombre] [varchar](50) NOT NULL,
 CONSTRAINT [PK_producto_t] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[productoProveedor_t]    Script Date: 3/11/2022 17:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[productoProveedor_t](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[productoId] [int] NOT NULL,
	[proveedorId] [int] NOT NULL,
	[precioCompra] [numeric](18, 2) NULL,
	[plazoDias] [int] NULL,
 CONSTRAINT [PK_productoProveedor_t] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[productoServicio_t]    Script Date: 3/11/2022 17:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[productoServicio_t](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[productoServicio] [varchar](50) NULL,
	[descripcion] [varchar](max) NULL,
 CONSTRAINT [PK_productoServicio_t] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[proveedor_t]    Script Date: 3/11/2022 17:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[proveedor_t](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NULL,
	[razonSocial] [varchar](50) NULL,
	[direccion] [varchar](50) NULL,
	[telefono] [varchar](50) NULL,
	[telefono2] [varchar](50) NULL,
	[email] [varchar](50) NULL,
	[sitioWeb] [varchar](50) NULL,
	[productoServicioId] [int] NULL,
	[descripcion] [varchar](max) NULL,
 CONSTRAINT [PK_proveedor_t] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[rol_t]    Script Date: 3/11/2022 17:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[rol_t](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[rol] [varchar](50) NULL,
 CONSTRAINT [PK_rol_t] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[stock_t]    Script Date: 3/11/2022 17:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[stock_t](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[productoId] [int] NOT NULL,
	[cantidad] [int] NULL,
	[vencimiento] [date] NULL,
 CONSTRAINT [PK_stock_t] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tipoCliente_t]    Script Date: 3/11/2022 17:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tipoCliente_t](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[alias] [varchar](50) NULL,
	[descripcion] [varchar](50) NULL,
 CONSTRAINT [PK_tipoCliente_t] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[usuario_t]    Script Date: 3/11/2022 17:28:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[usuario_t](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NULL,
	[apellido] [varchar](50) NULL,
	[email] [varchar](50) NULL,
	[password] [varchar](max) NULL,
	[salario] [numeric](18, 2) NULL,
	[rol] [int] NULL,
	[userName] [varchar](50) NULL,
 CONSTRAINT [PK_usuario_t] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[venta_t]    Script Date: 3/11/2022 17:28:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[venta_t](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[clienteId] [int] NOT NULL,
	[usuarioId] [int] NOT NULL,
	[fecha] [date] NOT NULL,
	[estado] [bit] NOT NULL,
	[importe] [numeric](18, 2) NULL,
 CONSTRAINT [PK_venta_t] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[detalleProducto_t] ADD  CONSTRAINT [DF_detalleProducto_t_marcaId]  DEFAULT ((1)) FOR [marcaId]
GO
ALTER TABLE [dbo].[detalleProducto_t] ADD  CONSTRAINT [DF_detalleProducto_t_clasificacionId]  DEFAULT ((1)) FOR [clasificacionId]
GO
ALTER TABLE [dbo].[detalleProducto_t] ADD  CONSTRAINT [DF_detalleProducto_t_presentacionId]  DEFAULT ((1)) FOR [presentacionId]
GO
ALTER TABLE [dbo].[precio_t] ADD  CONSTRAINT [DF_precio_t_precioVenta]  DEFAULT ((0)) FOR [precioVenta]
GO
ALTER TABLE [dbo].[productoProveedor_t] ADD  CONSTRAINT [DF_productoProveedor_t_precioCompra]  DEFAULT ((0)) FOR [precioCompra]
GO
ALTER TABLE [dbo].[stock_t] ADD  CONSTRAINT [DF_Table_1_Cantidad]  DEFAULT ((0)) FOR [cantidad]
GO
ALTER TABLE [dbo].[cliente_t]  WITH CHECK ADD  CONSTRAINT [FK_cliente_t_tipoCliente_t] FOREIGN KEY([tipoClienteId])
REFERENCES [dbo].[tipoCliente_t] ([id])
GO
ALTER TABLE [dbo].[cliente_t] CHECK CONSTRAINT [FK_cliente_t_tipoCliente_t]
GO
ALTER TABLE [dbo].[compra_t]  WITH CHECK ADD  CONSTRAINT [FK_compra_t_usuario_t] FOREIGN KEY([usuarioId])
REFERENCES [dbo].[usuario_t] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[compra_t] CHECK CONSTRAINT [FK_compra_t_usuario_t]
GO
ALTER TABLE [dbo].[detalleCompra_t]  WITH CHECK ADD  CONSTRAINT [FK_detalleCompra_t_compra_t] FOREIGN KEY([compraId])
REFERENCES [dbo].[compra_t] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[detalleCompra_t] CHECK CONSTRAINT [FK_detalleCompra_t_compra_t]
GO
ALTER TABLE [dbo].[detalleCompra_t]  WITH CHECK ADD  CONSTRAINT [FK_detalleCompra_t_producto_t] FOREIGN KEY([productoId])
REFERENCES [dbo].[producto_t] ([id])
GO
ALTER TABLE [dbo].[detalleCompra_t] CHECK CONSTRAINT [FK_detalleCompra_t_producto_t]
GO
ALTER TABLE [dbo].[detalleProducto_t]  WITH CHECK ADD  CONSTRAINT [FK_detalleProducto_t_clasificacion_t] FOREIGN KEY([clasificacionId])
REFERENCES [dbo].[clasificacion_t] ([id])
GO
ALTER TABLE [dbo].[detalleProducto_t] CHECK CONSTRAINT [FK_detalleProducto_t_clasificacion_t]
GO
ALTER TABLE [dbo].[detalleProducto_t]  WITH CHECK ADD  CONSTRAINT [FK_detalleProducto_t_marca_t] FOREIGN KEY([marcaId])
REFERENCES [dbo].[marca_t] ([id])
GO
ALTER TABLE [dbo].[detalleProducto_t] CHECK CONSTRAINT [FK_detalleProducto_t_marca_t]
GO
ALTER TABLE [dbo].[detalleProducto_t]  WITH CHECK ADD  CONSTRAINT [FK_detalleProducto_t_presentacion_t] FOREIGN KEY([presentacionId])
REFERENCES [dbo].[presentacion_t] ([id])
GO
ALTER TABLE [dbo].[detalleProducto_t] CHECK CONSTRAINT [FK_detalleProducto_t_presentacion_t]
GO
ALTER TABLE [dbo].[detalleProducto_t]  WITH CHECK ADD  CONSTRAINT [FK_detalleProducto_t_producto_t] FOREIGN KEY([productoId])
REFERENCES [dbo].[producto_t] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[detalleProducto_t] CHECK CONSTRAINT [FK_detalleProducto_t_producto_t]
GO
ALTER TABLE [dbo].[detalleVenta_t]  WITH CHECK ADD  CONSTRAINT [FK_detalleVenta_t_producto_t] FOREIGN KEY([productoId])
REFERENCES [dbo].[producto_t] ([id])
GO
ALTER TABLE [dbo].[detalleVenta_t] CHECK CONSTRAINT [FK_detalleVenta_t_producto_t]
GO
ALTER TABLE [dbo].[detalleVenta_t]  WITH CHECK ADD  CONSTRAINT [FK_detalleVenta_t_venta_t] FOREIGN KEY([ventaId])
REFERENCES [dbo].[venta_t] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[detalleVenta_t] CHECK CONSTRAINT [FK_detalleVenta_t_venta_t]
GO
ALTER TABLE [dbo].[factura_t]  WITH CHECK ADD  CONSTRAINT [FK_factura_t_venta_t] FOREIGN KEY([idVenta])
REFERENCES [dbo].[venta_t] ([id])
GO
ALTER TABLE [dbo].[factura_t] CHECK CONSTRAINT [FK_factura_t_venta_t]
GO
ALTER TABLE [dbo].[precio_t]  WITH CHECK ADD  CONSTRAINT [FK_precio_t_contenido_t] FOREIGN KEY([contenidoId])
REFERENCES [dbo].[contenido_t] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[precio_t] CHECK CONSTRAINT [FK_precio_t_contenido_t]
GO
ALTER TABLE [dbo].[precio_t]  WITH CHECK ADD  CONSTRAINT [FK_precio_t_producto_t] FOREIGN KEY([productoId])
REFERENCES [dbo].[producto_t] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[precio_t] CHECK CONSTRAINT [FK_precio_t_producto_t]
GO
ALTER TABLE [dbo].[productoProveedor_t]  WITH CHECK ADD  CONSTRAINT [FK_productoProveedor_t_producto_t] FOREIGN KEY([productoId])
REFERENCES [dbo].[producto_t] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[productoProveedor_t] CHECK CONSTRAINT [FK_productoProveedor_t_producto_t]
GO
ALTER TABLE [dbo].[productoProveedor_t]  WITH CHECK ADD  CONSTRAINT [FK_productoProveedor_t_proveedor_t] FOREIGN KEY([proveedorId])
REFERENCES [dbo].[proveedor_t] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[productoProveedor_t] CHECK CONSTRAINT [FK_productoProveedor_t_proveedor_t]
GO
ALTER TABLE [dbo].[proveedor_t]  WITH CHECK ADD  CONSTRAINT [FK_proveedor_t_productoServicio_t] FOREIGN KEY([productoServicioId])
REFERENCES [dbo].[productoServicio_t] ([id])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[proveedor_t] CHECK CONSTRAINT [FK_proveedor_t_productoServicio_t]
GO
ALTER TABLE [dbo].[stock_t]  WITH CHECK ADD  CONSTRAINT [FK_stock_t_producto_t] FOREIGN KEY([productoId])
REFERENCES [dbo].[producto_t] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[stock_t] CHECK CONSTRAINT [FK_stock_t_producto_t]
GO
ALTER TABLE [dbo].[usuario_t]  WITH CHECK ADD  CONSTRAINT [FK_usuario_t_rol_t] FOREIGN KEY([rol])
REFERENCES [dbo].[rol_t] ([id])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[usuario_t] CHECK CONSTRAINT [FK_usuario_t_rol_t]
GO
ALTER TABLE [dbo].[venta_t]  WITH CHECK ADD  CONSTRAINT [FK_venta_t_cliente_t] FOREIGN KEY([clienteId])
REFERENCES [dbo].[cliente_t] ([id])
GO
ALTER TABLE [dbo].[venta_t] CHECK CONSTRAINT [FK_venta_t_cliente_t]
GO
ALTER TABLE [dbo].[venta_t]  WITH CHECK ADD  CONSTRAINT [FK_venta_t_usuario_t] FOREIGN KEY([usuarioId])
REFERENCES [dbo].[usuario_t] ([id])
GO
ALTER TABLE [dbo].[venta_t] CHECK CONSTRAINT [FK_venta_t_usuario_t]
GO
USE [master]
GO
ALTER DATABASE [miniMercadoV2] SET  READ_WRITE 
GO
