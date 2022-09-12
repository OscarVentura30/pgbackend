export const queries = {

    getAllusers: 'select * from usuario_t',
    InsertNewUser: 'INSERT INTO usuario_t (nombre, apellido, email, password, salario, rol, userName) VALUES (@nombre,@apellido,@email,@password,@salario,@rol,@userName)',
    getUserById: 'select * from usuario_t where id = @id',
    deleteUserById: 'delete from usuario_t where id = @id ',
    getCountUsers: 'select count(*) from usuario_t',
    updateUserById : 'update usuario_t set nombre = @nombre , apellido = @apellido , email = @email , password = @password ,salario = @salario, rol = @rol , userName = @userName where id = @id',
    loginUser: 'select * from usuario_t where userName = @userName',
    validateUser: 'select * from usuario_t where userName = @userName',
    validateIdUser: 'select id from usuario_t where id = @id'

}