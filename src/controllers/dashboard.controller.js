import {idUserToken} from '../helpers/tokenUser';
import {getConnection, sql, queries} from '../database';

export const dashboardView = (req, res) => {

    const {cookies} = req ;

    const tokenUser = cookies.xtoken;

    const user = idUserToken(tokenUser);

    res.render('dashboard.index.hbs', {
        titulo: 'Dashboard',
        sesionUser: user
    })
};