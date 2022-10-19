import {idUserToken} from '../helpers/tokenUser';

export const inventarioView = (req, res) => {

    const {cookies} = req ;

    const tokenUser = cookies.xtoken;

    const user = idUserToken(tokenUser);

    res.render('inventario.index.hbs', {
        titulo: 'Inventario',
        sesionUser: user
    })
};

export  const productoView = (req, res) => {

    const {cookies} = req ;

    const tokenUser = cookies.xtoken;

    const user = idUserToken(tokenUser);

    res.render('inventario.producto.hbs', {
        titulo: 'Productos',
        sesionUser: user
    })

};

export  const productoNewView = (req, res) => {

    const {cookies} = req ;

    const tokenUser = cookies.xtoken;

    const user = idUserToken(tokenUser);

    res.render('inventario.producto.nuevo.hbs', {
        titulo: 'Nuevo-Producto',
        sesionUser: user
    })

};

export  const typoProductView = (req, res) => {

    const {cookies} = req ;

    const tokenUser = cookies.xtoken;

    const user = idUserToken(tokenUser);

    res.render('inventario.tipo.hbs', {
        titulo: 'Clasificar productos',
        sesionUser: user
    })

};

export  const packProductView = (req, res) => {

    const {cookies} = req ;

    const tokenUser = cookies.xtoken;

    const user = idUserToken(tokenUser);

    res.render('inventario.tamano.hbs', {
        titulo: 'protucto tamaño',
        sesionUser: user
    })

};

export  const marcaProductView = (req, res) => {

    const {cookies} = req ;

    const tokenUser = cookies.xtoken;

    const user = idUserToken(tokenUser);

    res.render('inventario.marca.hbs', {
        titulo: 'protucto marca',
        sesionUser: user
    })

};

export  const ProveedorView = (req, res) => {

    const {cookies} = req ;

    const tokenUser = cookies.xtoken;

    const user = idUserToken(tokenUser);

    res.render('inventario.proveedor.hbs', {
        titulo: 'proveedores',
        sesionUser: user
    })

};

export  const ProveedorTypeView = (req, res) => {

    const {cookies} = req ;

    const tokenUser = cookies.xtoken;

    const user = idUserToken(tokenUser);

    res.render('inventario.proveedor.tipo.hbs', {
        titulo: 'proveedores tipo',
        sesionUser: user
    })

};

export  const PresentProductView = (req, res) => {

    const {cookies} = req ;

    const tokenUser = cookies.xtoken;

    const user = idUserToken(tokenUser);

    res.render('inventario.presentacion.hbs', {
        titulo: 'Presentacion productos',
        sesionUser: user
    })

};

export  const PreciosView = (req, res) => {

    const {cookies} = req ;

    const tokenUser = cookies.xtoken;

    const user = idUserToken(tokenUser);

    res.render('inventario.precio.hbs', {
        titulo: 'Precio productos',
        sesionUser: user
    })

};

export  const ProductoProveedorView = (req, res) => {

    const {cookies} = req ;

    const tokenUser = cookies.xtoken;

    const user = idUserToken(tokenUser);

    res.render('inventario.proveedor.pro.hbs', {
        titulo: 'proveedor productos',
        sesionUser: user
    })

};

