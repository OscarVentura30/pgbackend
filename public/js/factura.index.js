$(document).ready(() => {
    var url = '/api/get-ventas';

    var table = $('#tablaVentas').DataTable ({

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
        {"data" : "userName"},
        {"data" : "fecha"},
        {"data" : "importe"},
        {"data" : function(data){
            return '<a href="/factura-generar/'+data.id+'"><button type="button" class="btn btn-info">Generar</button></a>'}
        }
        ],

    })

})