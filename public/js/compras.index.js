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
            try {
                totalint.textContent = t.column(5).data().sum()
            } catch (error) {
                console.log(' error to sum() table');
                totalint.textContent = 0;
                document.getElementById('vender').disabled = true;
            }
            
        }
    });

    var productos = [];
    var productosAux = [];
    var total = 0;    
    let totalint = document.getElementById('total');

 
    $('#addRow').on('click', function  () {

        document.getElementById('vender').disabled = false;

        let select = document.getElementById('select-product').value;
        const entrada = parseInt(document.getElementById('entrada').value , 10);
        const fecha = document.getElementById('input-date').value;

        if (entrada <= 0) {
            document.getElementById('alert-input-cantidad').textContent = 'Dato invalido'
            return
            
        }

        if (fecha == "") {

            document.getElementById('alert-input-fecha').textContent = 'Dato invalido'
            return
            
        }

        const getId = ('/api/get-prodprov/' + select);

        fetch(getId)
        .then((res) => res.json())
        .then((dat) => {
            const sub = entrada * dat[0].precioCompra;
            
            const result = productos.find(({ productoId }) => productoId === dat[0].productoId)

            if (!result) {
                document.getElementById('alert-input-fecha').textContent = ''
                document.getElementById('alert-input-cantidad').textContent = ''

                t.row.add([dat[0].productoId ,dat[0].nombre , dat[0].proveedor,+ dat[0].precioCompra ,entrada,sub,fecha]).draw(false);
                productos.push({
                    productoId:dat[0].productoId,
                    entrada: entrada,
                    vencimiento: fecha
                });
                
            }
            else{

                Swal.fire({
                    icon: 'Error',
                    title: 'Error',
                    text: 'No se permite ingresar el mismo producto !! ' + dat[0].nombre
                })

            }             

        })
        .catch((error) => {
            Swal.fire({
                icon: 'Error',
                title: 'Error',
                text: 'No encontrado '+error
            })
        });
        
    });
    

    $('#example tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            document.getElementById('quitar').disabled = true;
        } else {
            t.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            document.getElementById('quitar').disabled = false;
        }
    });
 
    $('#quitar').click(function () {

        
        try {

            var data = t.row('.selected').data();

            productos.forEach((item , index , arreglo) => {

                if(data[0] == item.productoId){

                    console.log('eliminado ' + item.productoId );
        
                }
                else
                {
                    productosAux.push({
                        productoId: item.productoId,
                        entrada: item.entrada,
                        vencimiento: item.vencimiento
                    })
                }
            })

            productos = [];
            productos = productosAux ;
            productosAux = [];
            

            t.row('.selected').remove().draw(false);
            
        } catch (error) {
            total = 0;
            totalint.textContent = total;
        }
        document.getElementById('quitar').disabled = true;
    });
 
    getproducto()

    async function getproducto(){
        const url = '/api/get-prodprov';
        await fetch(url)
        .then((res)=> res.json() )
        .then((datos)=>{

            console.log(datos);

            let select = document.getElementById("select-product");

            for(x of datos) {

                let option = document.createElement("option");
                option.setAttribute("value", x.id);
                let option1Text = document.createTextNode(x.nombre + ' -  Q.' + x.precioCompra);
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
                        
                        select.value = x.id;
                        input.value=""
                        input.focus();
                        document.getElementById('alert-input-1').textContent = ''; 
                        document.getElementById('alert-input-2').textContent = 'Correcto';
                    
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



    $('#vender').click(function () {
        console.log('los productos en lista son;');
        console.log(productos);

        const postUrl = '/api/post-compra1'; 

        const des = document.getElementById('descripcion').value;
        const usuario = document.getElementById('usuarioA').textContent;
        const importe = document.getElementById('total').textContent;

        const enviar1 = {
            userName: usuario,
            descripcion: des,
            importe: importe
        }

        console.log(enviar1);
        
        fetch(postUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(enviar1),
            })
            .then((res) => res.json()) 
            .then((dat) => {
                const id = dat[0].id;
                productos.forEach((objetos) => {
                    const posturl2 = '/api/post-compra2'; 
                    const d2 = {
                        compraId: id,
                        productoId: objetos.productoId,
                        fechaVencimiento: objetos.vencimiento,
                        entrada: objetos.entrada
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

$('#input-date').datepicker({
    format: "dd/mm/yyyy",
    language: "es",
    startDate: "-today",
    todayBtn: "linked",
    todayHighlight: true,
    autoclose: true,
});


