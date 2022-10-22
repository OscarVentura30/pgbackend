$.fn.dataTable.Api.register('column().data().sum()', function () {
    return this.reduce(function (a, b) {
        var x = parseFloat(a) || 0;
        var y = parseFloat(b) || 0;
        return x + y;
    });
});

jQuery.fn.dataTable.Api.register( 'sum()', function ( ) {
	return this.flatten().reduce( function ( a, b ) {
		if ( typeof a === 'string' ) {
			a = a.replace(/[^\d.-]/g, '') * 1;
		}
		if ( typeof b === 'string' ) {
			b = b.replace(/[^\d.-]/g, '') * 1;
		}

		return a + b;
	}, 0 );
} );

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
            return '<button type="button" class="btn btn-info" onclick="detalles('+data.id+')">Detalles</button>'}
        }
        ],

        "drawCallback": function () {
            try {
                document.getElementById('totalDisplay').textContent = ('Q.' + table.column(5,{page:'current'}).data().sum())
            } catch (error) {
                console.log(error);
            }
            
            
 
         }

    });

    /*
    $('#tablaVentas tbody').on('click', 'tr', function () {
        var data = table.row(this).data();
        console.log(data);
        alert('You clicked on ' + data.id + "'s row");
        var myModal = new bootstrap.Modal(document.getElementById('VentasDetalle'));
        myModal.show();
        
    });*/
    

    

});

async function detalles(id){

    var myModal = new bootstrap.Modal(document.getElementById('VentasDetalle'));
    myModal.show();
    
    const getId = ('/api/get-ventas/' + id);

    await fetch(getId)
        .then((res) => res.json())
        .then((dat) => {
            console.log(dat);

            let tdetalle = document.getElementById('tableDetalle');
            let tbody = document.createElement('tbody');

            dat.forEach(p => {
                let fila = document.createElement('tr');

                let td = document.createElement('td');
                td.innerText = p.cantidad
                fila.appendChild(td)

                let td2 = document.createElement('td');
                td2.innerText = p.descripcion
                fila.appendChild(td2)

                

                tbody.appendChild(fila)

            });
            tdetalle.appendChild(tbody);

        })
        .catch((error) => {
            Swal.fire({
                icon: 'Error',
                title: 'Error',
                text: 'No es posible Ver',
            })
        });
        

}

