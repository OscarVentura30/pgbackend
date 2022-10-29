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

$(document).ready(function () {
    var t = $('#example').DataTable({
        "language": {
            "url": "/DataTables/es-MX.json"
        },
        scrollY: '500px',
        paging: false,
        "drawCallback": function () {
           /*var api = this.api();
            $(api.column(4).footer()).html(
                api.column(4,{page: 'current'}).data().sum())
        
            var api = this.api();
                    $( api.table().footer() ).html(
                    api.column( 4, {page:'current'} ).data().sum()
                );*/

        }
    });

    const productos = [];

    var total = 0;    
    let totalint = document.getElementById('total');
 
    $('#addRow').on('click', function  () {

        document.getElementById('vender').disabled = false;

        let select = document.getElementById('select-product').value;

        const getId = ('/api/get-precios/' + select);

        fetch(getId)
        .then((res) => res.json())
        .then((dat) => {
            
            t.row.add([dat[0].productoId ,dat[0].nombre , dat[0].descripcion,+ dat[0].precioVenta , '1']).draw(false);
            total = total + dat[0].precioVenta;
            totalint.textContent = total;

                productos.push(dat[0].productoId);
            
            
            

        })
        .catch((error) => {
            Swal.fire({
                icon: 'Error',
                title: 'Error',
                text: 'No encontrado'+error
            })
        });
        
        
 
    });
/*
    $('#example tbody').on( 'click', 'td', function () {
        alert( t.cell(this).data() );
    } );*/
    
    

    $('#example tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            t.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
 
    $('#quitar').click(function () {

        
        try {

            t.row('.selected').remove().draw(false);
            total = t.column(3).data().sum();
            totalint.textContent = total;
            
        } catch (error) {
            total = 0;
            totalint.textContent = total;
        }
        
        
    });
 
    // Automatically add a first row of data
    /*$('#addRow').click();*/
    getCliente()
    getproducto()

    async function getproducto(){
        const url = '/api/get-precios';
        await fetch(url)
        .then((res)=> res.json() )
        .then((datos)=>{

            console.log(datos);

            let select = document.getElementById("select-product");

            for(x of datos) {

                let option = document.createElement("option");
                option.setAttribute("value", x.idprecio);
                let option1Text = document.createTextNode(x.nombre + ' -  Q.' + x.precioVenta);
                option.appendChild(option1Text);
                select.appendChild(option);

            }

            let input = document.getElementById('input-search-code');

            input.addEventListener('keyup', (e) => {
            if (e.keyCode === 13) {
                document.getElementById('alert-input-2').textContent = '';
                document.getElementById('alert-input-1').textContent = '';
                const codigo = e.target.value

                for(x of datos){
                    
                    if (x.codigoBarras == codigo) {
                        
                        select.value = x.idprecio;
                        input.value=""
                        input.focus();
                        document.getElementById('alert-input-1').textContent = ''; 
                        document.getElementById('alert-input-2').textContent = 'Correcto';

                        
                            t.row.add([x.productoId, x.nombre, x.descripcion, x.precioVenta,'1']).draw(false);
                            total = total + x.precioVenta;
                            totalint.textContent = total;
                    
                    
                        break;
                        
                    }
                    document.getElementById('alert-input-1').textContent = 'No encontrado'; 
                    document.getElementById('alert-input-2').textContent = '';
                    input.value=""
                    input.focus();

                }    
                        
            }
            })

        })
        .catch((error) => { 
            console.log('error al obtener datos, ', error)
        })
    }

    async function getCliente(){
        const url = '/api/clientes';
        await fetch(url)
        .then((res)=> res.json() )
        .then((datos)=>{
    
            let select = document.getElementById("select-client");
            for(x of datos) {
    
                let option = document.createElement("option");
                option.setAttribute("value", x.id );
                let option1Text = document.createTextNode(x.nit +' - ' + x.nombre);
                option.appendChild(option1Text);
                select.appendChild(option);
    
            }
            
    
        })
        .catch((error) => { 
            console.log('error al obtener datos Cliente, ', error)
        })
    }


    $('#vender').click(function () {
        console.log('los productos en lista son;');
        /*console.log(productos.sort());*/
        let cont = 1;
        const datos = [];
        
        productos.sort().map(function(dato, index, arreglo) {
            
            if (arreglo[index+1] == arreglo[index]) {

                cont++;

            } else {
                const d1 = {
                    productoId:dato,
                    salida: cont
                }
                datos.push(d1);
                    
                cont = 1;
            }

        })

        const postUrl = '/api/post-caja1'; 
        const cliente = document.getElementById('select-client').value;
        const usuario = document.getElementById('usuarioA').textContent;
        const importe = document.getElementById('total').textContent;

        const enviar1 = {
            clienteId: cliente,
            userName: usuario,
            importe: importe
        }
        
        fetch(postUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(enviar1),
            })
            .then((res) => res.json()) 
            .then((dat) => {
                const id = dat[0].id;
                datos.forEach((objetos) => {
                    const posturl2 = '/api/post-caja2'; 
                    const d2 = {
                        ventaId: id,
                        productoId: objetos.productoId,
                        salida: objetos.salida
                    }

                    fetch(posturl2, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(d2),
                        })
                        .then((res) => res.json()) 
                        .then((dat) => {
                            console.log('exito : ', dat);
                        })
                        .catch((error) => {
                            console.log(error);
                        });

                })

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
                    text: 'No es posible guardar' + error,
                })
            });

        
    });

});


