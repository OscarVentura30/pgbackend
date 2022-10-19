$(document).ready(() => {
    var url = '/api/get-unidades';

    $('#tablaUnidades').DataTable ({

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
        {"data" : "valorUnitario"},
        {"data" : function(data){
            return '<button type="button" class="btn btn-warning" onclick="editar('+data.id+')">Editar</button><button type="button" class="btn btn-danger" onclick="eliminar('+data.id+')">Eliminar</button>'}
        }
        ],

    });

});

function eliminar(id){

    Swal.fire({
        title: 'Desea Eliminar la Medida '+ id +'?',
        text: "Esta recurso puede depender de productos que existen!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sí, borrar !'
    }).then((result) => {
    if (result.isConfirmed) {

        fetch('/api/delete-unidades/'+ id,{
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

    var myModal = new bootstrap.Modal(document.getElementById('modalEditarMedida'));
    myModal.show();

    const getId = ('/api/get-unidades/' + id);

    await fetch(getId)
        .then((res) => res.json())
        .then((dat) => {

            document.getElementById('input-id-edit').value = dat[0].id;
            document.getElementById('input-descripcion-edit').value = dat[0].descripcion;
            document.getElementById('input-valor-edit').value = dat[0].valorUnitario;

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
    const NewMed =document.getElementById('input-valor-edit').value;

    const url =('/api/put-unidades/'+ id);
    const regex = /[A-Za-z\d$@$!%*?&]{1,50}$/;

    if (regex.test(Newdes) == false) {

        document.getElementById('alert-input-2').textContent = 'Error: Dato invalido';
        return;
    }

    const data = {
        descripcion: Newdes,
        valorUnitario: NewMed
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

    const postUrl ='/api/post-unidades'; 
    
    const des = document.getElementById('descripcion-new').value;
    const val = document.getElementById('valor-new').value;


    if (regex.test(des) == false || val <= 0) {

        document.getElementById('alert-input-1').textContent = 'Error: Dato invalido';
        return;
    }

    const data = {
        descripcion: des,
        valorUnitario: val
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