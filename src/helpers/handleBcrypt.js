const bcrypt =  require('bcryptjs');

export const encrypt = async (pass) => {

    const hash = await bcrypt.hash(pass, 10)
    return hash

};

export const compare = async (passPlain, hashPass) => {

    return await bcrypt.compare(passPlain, hashPass)

}
