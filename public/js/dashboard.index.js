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
        ],

        "drawCallback": function () {
            try {
                document.getElementById('totalDisplay').textContent = ('Q.' + table.column(5,{page:'current'}).data().sum())
            } catch (error) {
                console.log(error);
            }
            
            
 
         },
         dom: 'Pfrtip',

    });

    

    /*
    $('#tablaVentas tbody').on('click', 'tr', function () {
        var data = table.row(this).data();
        console.log(data);
        alert('You clicked on ' + data.id + "'s row");
        var myModal = new bootstrap.Modal(document.getElementById('VentasDetalle'));
        myModal.show();
        
    });*/

    var container = $('<div/>').insertBefore(table.table().container());
    
    

    var chart = Highcharts.chart(container[0], {
        
        chart: {
            type: 'pie',
            
        },
        title: {
            text: 'Staff Count Per Position',
        },
        series: [
            {
                data: chartData(table),
            },
        ],
    });


    table.on('draw', function () {
        chart.series[0].setData(chartData(table));
    });

    function chartData(table) {
        var counts = {};
     
        // Count the number of entries for each position
        table
            .column(1, { search: 'applied' })
            .data()
            .each(function (val) {
                if (counts[val]) {
                    counts[val] += 1;
                } else {
                    counts[val] = 1;
                }
            });
     
        // And map it to the format highcharts uses
        return $.map(counts, function (val, key) {
            return {
                name: key,
                y: val,
            };
        });
    }

});

