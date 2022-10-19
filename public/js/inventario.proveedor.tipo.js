$(document).ready(() => {
    var url = '/api/get-proveedor-tipo';

    $('#tablaProveedorTipo').DataTable ({

        "language": {
            "url": "/DataTables/es-MX.json"
        },

        "ajax":{
                "url": url,
                "dataSrc":""
        },
        "columns": [
        {"data" : "id"},
        {"data" : "productoServicio"},
        {"data" : "descripcion"},
        {"data" : function(data){
            return '<button type="button" class="btn btn-warning" onclick="editar('+data.id+')">Editar</button><button type="button" class="btn btn-danger" onclick="eliminar('+data.id+')">Eliminar</button>'}
        }
        ],

    });

});

function eliminar(id){

    Swal.fire({
        title: 'Desea Eliminar la Tipo de proveedor '+ id +'?',
        text: "Esta recurso puede depender de productos que existen!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sí, borrar !'
    }).then((result) => {
    if (result.isConfirmed) {

        fetch('/api/delete-proveedor-tipo/'+ id,{
        method: 'delete',
        })
        .then((res)=>{

        res.json();
        location.reload();
        
        })
        .catch(err => {
        Swal.fire({
            icon: 'Error',
            title: 'Oops...',
            text: 'Error al eliminar  !',
        })
        console.log(err)
        
        });
    }
    })

    
};

async function editar(id){

    var myModal = new bootstrap.Modal(document.getElementById('modalEditarProveedorT'));
    myModal.show();

    const getId = ('/api/get-proveedor-tipo/' + id);

    await fetch(getId)
        .then((res) => res.json())
        .then((dat) => {

            document.getElementById('input-id-edit').value = dat[0].id;
            document.getElementById('input-servicio-edit').value = dat[0].productoServicio;
            document.getElementById('input-descripcion-edit').value = dat[0].descripcion;

        })
        .catch((error) => {
            Swal.fire({
                icon: 'Error',
                title: 'Error',
                text: 'No es posible Editar',
            })
        });
    

}

async function postEditar(){

    const id = document.getElementById('input-id-edit').value;
    const NewServ = document.getElementById('input-servicio-edit').value;
    const NewDes = document.getElementById('input-descripcion-edit').value;

    const url =('/api/put-proveedor-tipo/'+ id);
    const regex = /[A-Za-z\d$@$!%*?&]{1,50}$/;

    if (regex.test(NewServ) == false || regex.test(NewDes) == false ) {

        document.getElementById('alert-input-2').textContent = 'Error: Dato invalido';
        return;
    }

    const data = {
        productoServicio: NewServ,
        descripcion: NewDes
    }

    await fetch(url, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
        })
        .then((res) => res.json())
        .then((dat) => {
            console.log('exito : ', dat);

            Swal.fire(
                'Correcto !',
                'Datos Guardados',
                'success'
            )
            location.reload();

        })
        .catch((error) => {
            Swal.fire({
                icon: 'Error',
                title: 'Error',
                text: 'No es posible guardar'  + error,
            })
        });    

}


async function agregar() {

    const regex = /[A-Za-z\d$@$!%*?&]{1,50}$/

    const postUrl ='/api/post-proveedor-tipo'; 
    
    const NewServ = document.getElementById('input-servicio').value;
    const NewDes = document.getElementById('input-descripcion').value;


    if (regex.test(NewServ) == false || regex.test(NewDes) == false ) {

        document.getElementById('alert-input-1').textContent = 'Error: Dato invalido';
        return;
    }

    const data = {
        productoServicio: NewServ,
        descripcion: NewDes
    }

    await fetch(postUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
        })
        .then((res) => res.json())
        .then((dat) => {
            console.log('exito : ', dat);

            Swal.fire(
                'Correcto !',
                'Datos Guardados',
                'success'
            )
            location.reload();

        })
        .catch((error) => {
            Swal.fire({
                icon: 'Error',
                title: 'Error',
                text: 'No es posible guardar',
            })
        });

}