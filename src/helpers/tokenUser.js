const jwt = require('jsonwebtoken');

export const idUserToken = (ttoken) => {

    const dataToken = jwt.decode(ttoken);

    return dataToken.id ;

}