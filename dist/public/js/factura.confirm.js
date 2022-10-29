const id = document.getElementById('idVenta').textContent;

$(document).ready(() => {
    var url = '/api/get-ventas/'+ id;

    var table = $('#tablaVentas').DataTable ({

        "language": {
            "url": "/DataTables/es-MX.json"
        },

        scrollY: '200px',
        paging: false,

        "ajax":{
                "url": url,
                "dataSrc":"" 
        },
        "columns": [
        {"data" : "cantidad"},
        {"data" : "descripcion"},
        ],

    })

})
detalles();
async function detalles(){
    
    const getId = ('/api/get-venta1/' + id);

    await fetch(getId)
        .then((res) => res.json())
        .then((dat) => {

            document.getElementById('lblcliente').textContent = dat[0].nombre;
            document.getElementById('lblnit').textContent = dat[0].nit;
            document.getElementById('lbldate').textContent = dat[0].fecha;
            document.getElementById('lbltotal').textContent = 'Q.' + dat[0].importe;
            document.getElementById('lblusuario').textContent = dat[0].userName;


        })
        .catch((error) => {
            Swal.fire({
                icon: 'Error',
                title: 'Error',
                text: 'No es posible Ver',
            })
        });
        

}

function generar() {

    const $elemento = document.getElementById('generar');


    html2pdf($elemento)
        .set({
            margin: 1,
            filename: 'factura No.' + id,
            image: {
                type: 'jpeg',
                quality: 0.98
            },
            
            html2canvas: {
                scale: 3,
                letterRendering: true,
            },
            jsPDF: {
                unit: "in",
                format: "a3",
                orientation: 'portrait'
            }
        })
        .from($elemento)
        .save()
        .catch(err => console.log(error))
        .finally()
        .then(() => {
            console.log("exito")
        });

}


