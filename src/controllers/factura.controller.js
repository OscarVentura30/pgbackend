import {idUserToken} from '../helpers/tokenUser';
import {getConnection, sql, queries} from '../database';

export const facturaView = (req, res) => {

    const {cookies} = req ;

    const tokenUser = cookies.xtoken;

    const user = idUserToken(tokenUser);

    res.render('factura.index.hbs', {
        titulo: 'factura',
        sesionUser: user
    })
};


export const facturaGView = (req, res) => {

    const {cookies} = req ;

    const{id} = req.params;

    const tokenUser = cookies.xtoken;

    const user = idUserToken(tokenUser);

    res.render('factura.confirm.hbs', {
        titulo: 'factura',
        sesionUser: user,
        idventa: id,
    })
};