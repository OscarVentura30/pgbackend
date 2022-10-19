$(document).ready(() => {
    var url = '/api/get-precios';

    $('#tablaPrecios').DataTable ({

        "language": {
            "url": "/DataTables/es-MX.json"
        },

        "ajax":{
                "url": url,
                "dataSrc":""
        },
        "columns": [
        {"data" : "codigoBarras"},
        {"data" : "nombre"},
        {"data" : "descripcion"},
        {"data" : "precioVenta"},
        {"data" : function(data){
            return '<button type="button" class="btn btn-warning" onclick="editar('+data.idprecio+')">Editar</button><button type="button" class="btn btn-danger" onclick="eliminar('+data.idprecio+')">Eliminar</button>'}
        }
        ],

    });

});
 
function eliminar(id){

    Swal.fire({
        title: 'Desea Eliminar precio no.'+ id +'?',
        text: "Esta accion no se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sí, borrar !'
    }).then((result) => {
    if (result.isConfirmed) {

        fetch('/api/delete-precios/'+ id,{
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

    const postUrl ='/api/post-precio'; 

    const producto = document.getElementById("select-product").value;
    const medida = document.getElementById('select-content-product').value;
    const precio = document.getElementById('precio').value;
    

    if ( precio < 0) {

        document.getElementById('alert-input-1').textContent = 'Error: Dato invalido';
        return;
    }

    const data = {
        productoId: producto,
        contenidoId: medida,
        precioVenta: precio
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

async function editar(idprecio){

    var myModal = new bootstrap.Modal(document.getElementById('modalEditarPrecio'));
    myModal.show();

    const getId = ('/api/get-precios/' + idprecio);

    await fetch(getId)
        .then((res) => res.json())
        .then((dat) => {

            document.getElementById('input-id').value = dat[0].idprecio;
            document.getElementById('input-precio-edit').value = dat[0].precioVenta;
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

    const id = document.getElementById('input-id').value;
    const Newvalue =document.getElementById('input-precio-edit').value;
    const url =('/api/put-precios/'+ id);

    if ( Newvalue < 0) {

        document.getElementById('alert-input-1').textContent = 'Error: Dato invalido';
        return;
    }

    const data = {
        precioVenta: Newvalue
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



