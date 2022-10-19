$(document).ready(() => {
    var url = '/api/get-present';

    $('#tablaMarcas').DataTable ({

        "language": {
            "url": "/DataTables/es-MX.json"
        },

        "ajax":{
                "url": url,
                "dataSrc":""
        },
        "columns": [
        {"data" : "id"},
        {"data" : "descripcion"},
        {"data" : function(data){
            return '<button type="button" class="btn btn-warning" onclick="editar('+data.id+')">Editar</button><button type="button" class="btn btn-danger" onclick="eliminar('+data.id+')">Eliminar</button>'}
        }
        ],

    });

});

function eliminar(id){

    Swal.fire({
        title: 'Desea Eliminar la presentacion '+ id +'?',
        text: "Esta accion no se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sí, borrar !'
    }).then((result) => {
    if (result.isConfirmed) {

        fetch('/api/delete-present/'+ id,{
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

    
}

async function agregar() {

    const regex = /[A-Za-z\d$@$!%*?&]{1,50}$/

    const postUrl ='/api/post-present'; 
    
    const des = document.getElementById('input-descripcion').value;

    if (regex.test(des) == false) {

        document.getElementById('alert-input-1').textContent = 'Error: Dato invalido';
        return;
    }

    const data = {
        descripcion: des
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

async function editar(id){

    var myModal = new bootstrap.Modal(document.getElementById('modalEditarMarca'));
    myModal.show();

    const getId = ('/api/get-present/' + id);

    await fetch(getId)
        .then((res) => res.json())
        .then((dat) => {

            document.getElementById('input-id-edit').value = dat[0].id;
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
    const Newdes =document.getElementById('input-descripcion-edit').value;
    const url =('/api/put-present/'+ id);
    const regex = /[A-Za-z\d$@$!%*?&]{1,50}$/;

    if (regex.test(Newdes) == false) {

        document.getElementById('alert-input-2').textContent = 'Error: Dato invalido';
        return;
    }

    const data = {
        descripcion: Newdes
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