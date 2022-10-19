$(document).ready(() => {
    var url = '/api/get-prodprov';

    $('#tablaPrecios').DataTable ({

        "language": {
            "url": "/DataTables/es-MX.json"
        },

        "ajax":{
                "url": url,
                "dataSrc":""
        },
        "columns": [
        {"data" : "id"},
        {"data" : "codigoBarras"},
        {"data" : "nombre"},
        {"data" : "proveedor"},
        {"data" : "precioCompra"},
        {"data" : "plazoDias"},
        {"data" : function(data){
            return '<button type="button" class="btn btn-warning" onclick="editar('+data.id+')">Editar</button><button type="button" class="btn btn-danger" onclick="eliminar('+data.id+')">Eliminar</button>'}
        }
        ],

    });

});
getproducto();
getProveedor();

async function agregar() {

    const postUrl ='/api/post-prodprov'; 

    const producto = document.getElementById("select-product").value;
    const proveedor = document.getElementById('select-proveedor-product').value;
    const precio = document.getElementById('precio').value;
    const plazo = document.getElementById('dias').value;
    

    if ( precio < 0 || plazo < 0) {

        document.getElementById('alert-input-1').textContent = 'Error: Dato invalido';
        return;
    }

    const data = {
        productoId: producto,
        proveedorId: proveedor,
        precioCompra: precio,
        plazoDias: plazo
    }

    console.log(data);

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

    var myModal = new bootstrap.Modal(document.getElementById('modalEditarProdProv'));
    myModal.show();

    const getId = ('/api/get-prodprov/' + id);

    await fetch(getId)
        .then((res) => res.json())
        .then((dat) => {

            document.getElementById('input-id').value = dat[0].id;
            document.getElementById('precio-edit').value = dat[0].precioCompra;
            document.getElementById('dias-edit').value = dat[0].plazoDias;
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
    const Newvalue = document.getElementById('precio-edit').value;
    const NewDays = document.getElementById('dias-edit').value;

    const url =('/api/put-prodprov/'+ id);

    if ( Newvalue < 0 || NewDays < 0) {

        document.getElementById('alert-input-2').textContent = 'Error: Dato invalido';
        return;
    }

    const data = {
        precioCompra: Newvalue,
        plazoDias: NewDays
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

function eliminar(id){

    Swal.fire({
        title: 'Desea Eliminar Registro no.'+ id +'?',
        text: "Esta accion no se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sí, borrar !'
    }).then((result) => {
    if (result.isConfirmed) {

        fetch('/api/delete-prodprov/'+ id,{
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





async function getproducto(){
    const url = '/api/get-productos';
    await fetch(url)
    .then((res)=> res.json() )
    .then((datos)=>{

        let select = document.getElementById("select-product");

        for(x of datos) {

            let option = document.createElement("option");
            option.setAttribute("value", x.id );
            let option1Text = document.createTextNode(x.nombre);
            option.appendChild(option1Text);
            select.appendChild(option);

        }

        let input = document.getElementById('input-search-code');
        let inputp = document.getElementById('precio');
        input.addEventListener('keyup', (e) => {
           if (e.keyCode === 13) {

               const codigo = e.target.value
               document.getElementById('alert-input-1').textContent = 'Error: Codigo no encontrado';
               for(x of datos){
                
                if (x.codigoBarras == codigo) {
                    select.value = x.id;
                    inputp.focus();
                    document.getElementById('alert-input-1').textContent = '';
                    break;
                    
                }

               }              
           }
        })

    })
    .catch((error) => { 
        console.log('error al obtener datos, ', error)
    })
}

async function getProveedor(){
    const url = '/api/get-proveedor';
    await fetch(url)
    .then((res)=> res.json() )
    .then((datos)=>{

        let select = document.getElementById("select-proveedor-product");
        for(x of datos) {

            let option = document.createElement("option");
            option.setAttribute("value", x.id );
            let option1Text = document.createTextNode(x.nombre);
            option.appendChild(option1Text);
            select.appendChild(option);

        }
        

    })
    .catch((error) => { 
        console.log('error al obtener datos, ', error)
    })
}