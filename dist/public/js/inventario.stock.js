$(document).ready(() => {
    var url = '/api/get-stock';

    $('#tablaStock').DataTable ({

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
        {"data" : "cantidad"},
        {"data" : "vencimiento"},
        {"data" : function(data){
            return '<button type="button" class="btn btn-warning" onclick="editar('+data.id+')">Editar</button>'}
        }
        ],

    });

});

$('#input-date').datepicker({
    format: "dd/mm/yyyy",
    language: "es",
    startDate: "-today",
    todayBtn: "linked",
    todayHighlight: true,
    autoclose: true,
});

async function editar(id){

    var myModal = new bootstrap.Modal(document.getElementById('modalEditar'));
    myModal.show();

    const getId = ('/api/get-stock/' + id);

    await fetch(getId)
        .then((res) => res.json())
        .then((dat) => {
            document.getElementById('idStock').value = dat[0].id;
            document.getElementById('input-producto').value = dat[0].nombre;
            document.getElementById('input-cantidad').value = dat[0].cantidad;
            document.getElementById('input-date').value = dat[0].vencimiento;
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

    const id = document.getElementById('idStock').value;
    const cantidad = document.getElementById('input-cantidad').value;
    const vencimiento = document.getElementById('input-date').value;

    const url =('/api/put-stock/'+ id);

    if (cantidad < 0 || vencimiento == "") {

        document.getElementById('alert-input-1').textContent = 'Error: Dato o fecha invalida';
        return;
    }

    const data = {
        cantidad: cantidad,
        vencimiento: vencimiento
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