$(document).ready(() => {
    var url = '/api/clientes';

    $('#tablaClientes').DataTable ({

        "language": {
            "url": "/DataTables/es-MX.json"
        },

        "ajax":{
                "url": url,
                "dataSrc":""
        },
        "columns": [
        {"data" : "id"},
        {"data" : "nombre"},
        {"data" : "nit"},
        {"data" : "direccion"},
        {"data" : "telefono"},
        {"data" : "email"},
        {"data" : "tipoClienteId"},
        {"data" : function(data){
        return '<a href="/api/get-cliente/'+data.id+'"> <button type="button" class="btn btn-warning">Ediar</button></a><button type="button" class="btn btn-danger" onclick="eliminar('+data.id+')">Eliminar</button>'}
        }
        ],

    });

});

function eliminar(id){

    Swal.fire({
        title: 'Desea Eliminar el usuario '+ id +'?',
        text: "Esta accion no se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar usuario!'
    }).then((result) => {
    if (result.isConfirmed) {

        fetch('/api/delete-cliente/'+ id,{
        method: 'delete',
        })
        .then((res)=>{

        Swal.fire(
        'Borrado!',
        'Cliente eliminado Exitosamente !!!',
        'success'
        )
        res.json()
        
        })
        .catch(err => {
        Swal.fire({
            icon: 'Error',
            title: 'Oops...',
            text: 'Error al eliminar Cliente !',
            footer: '<a href="">Por qué aparece el error?</a>'
        })
        console.log(err)
        
        });
    }
    })

    
}