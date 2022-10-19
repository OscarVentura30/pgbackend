$(document).ready(() => {
    var url = '/api/getfull-productos';

    $('#tablaProductos').DataTable ({

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
        {"data" : "marca"},
        {"data" : "tìpo"},
        {"data" : "presentacion"},
        {"data" : function(data){
            return '<button type="button" class="btn btn-warning" onclick="editar('+data.id+')">Editar</button><button type="button" class="btn btn-danger" onclick="eliminar('+data.id+')">Eliminar</button>'}
        }
        ],

    });

});

getMarca();
getPresent();
getTipo();

function eliminar(id){

    Swal.fire({
        title: 'Desea Eliminar este producto '+ id +'?',
        text: "Se quitaran los registros de este producto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sí, borrar !'
    }).then((result) => {
    if (result.isConfirmed) {

        fetch('/api/delete-producto/'+ id,{
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
            text: 'Error al eliminar, es posible que el producto tenga registro en las ventas o compras  !',
        })
        console.log(err)
        
        });
    }
    })
}

async function editar(id){

    var myModal = new bootstrap.Modal(document.getElementById('modalEditarProducto'));
    myModal.show();

    const getId = ('/api/getdetails-products/' + id);

    await fetch(getId)
        .then((res) => res.json())
        .then((dat) => {

            document.getElementById('input-id-edit').value = dat[0].id;
            document.getElementById('input-codigoBarras-edit').value = dat[0].codigoBarras;
            document.getElementById('input-nombre-edit').value = dat[0].nombre;
            document.getElementById('select-type-product').value = dat[0].clasificacionId;
            document.getElementById('select-marcas-product').value = dat[0].marcaId;
            document.getElementById('select-present-product').value = dat[0].presentacionId;

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
    const Newcod =document.getElementById('input-codigoBarras-edit').value;
    const Newname =document.getElementById('input-nombre-edit').value;
    const Newtype =document.getElementById('select-type-product').value;
    const Newmark =document.getElementById('select-marcas-product').value;
    const Newpresent =document.getElementById('select-present-product').value;

    const url =('/api/putdetails-producto/'+ id);
    const regex = /[A-Za-z\d$@$!%*?&]{1,50}$/;

    if (regex.test(Newname) == false) {

        document.getElementById('alert-input-2').textContent = 'Error: Dato invalido';
        return;
    }

    const data = {
        codigoBarras: Newcod,
        nombre: Newname,
        marcaId: Newmark,
        clasificacionId: Newtype,
        presentacionId: Newpresent
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

    const postUrl ='/api/postfull-productos'; 
    
    const codigo =document.getElementById('input-codigoBarras-crear').value;
    const producto =document.getElementById('input-nombre-crear').value;
    const tipo =document.getElementById('select-type-product2').value;
    const marca =document.getElementById('select-marcas-product2').value;
    const present =document.getElementById('select-present-product2').value;


    if (regex.test(producto) == false) {

        document.getElementById('alert-input-2').textContent = 'Error: Dato invalido';
        return;
    }

    const data = {
        codigoBarras: codigo,
        nombre: producto,
        marcaId: marca,
        clasificacionId: tipo,
        presentacionId: present
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



async function getTipo(){
    const url = '/api/get-tipo';
    await fetch(url)
    .then((res)=> res.json() )
    .then((datos)=>{

        let select = document.getElementById("select-type-product");
        for(x of datos) {

            let option = document.createElement("option");
            option.setAttribute("value", x.id );
            let option1Text = document.createTextNode(x.descripcion);
            option.appendChild(option1Text);
            select.appendChild(option);

        }

        let select2 = document.getElementById("select-type-product2");
        for(x of datos) {

            let option = document.createElement("option");
            option.setAttribute("value", x.id );
            let option1Text = document.createTextNode(x.descripcion);
            option.appendChild(option1Text);
            select2.appendChild(option);

        }
        


    })
    .catch((error) => { 
        console.log('error al obtener datos, ', error)
    })
}

async function getMarca(){
    const url = '/api/get-marcas';
    await fetch(url)
    .then((res)=> res.json() )
    .then((datos)=>{

        let select = document.getElementById("select-marcas-product");
        for(x of datos) {

            let option = document.createElement("option");
            option.setAttribute("value", x.id );
            let option1Text = document.createTextNode(x.descripcion);
            option.appendChild(option1Text);
            select.appendChild(option);

        }
        let select2 = document.getElementById("select-marcas-product2");
        for(x of datos) {

            let option = document.createElement("option");
            option.setAttribute("value", x.id );
            let option1Text = document.createTextNode(x.descripcion);
            option.appendChild(option1Text);
            select2.appendChild(option);

        }



    })
    .catch((error) => { 
        console.log('error al obtener datos, ', error)
    })
}

async function getPresent(){
    const url = '/api/get-present';
    await fetch(url)
    .then((res)=> res.json() )
    .then((datos)=>{

        let select = document.getElementById("select-present-product");
        for(x of datos) {

            let option = document.createElement("option");
            option.setAttribute("value", x.id );
            let option1Text = document.createTextNode(x.descripcion);
            option.appendChild(option1Text);
            select.appendChild(option);

        }

        let select2 = document.getElementById("select-present-product2");
        for(x of datos) {

            let option = document.createElement("option");
            option.setAttribute("value", x.id );
            let option1Text = document.createTextNode(x.descripcion);
            option.appendChild(option1Text);
            select2.appendChild(option);

        }
        


    })
    .catch((error) => { 
        console.log('error al obtener datos, ', error)
    })
}


let input = document.getElementById('input-codigoBarras-crear');
        let inputp = document.getElementById('input-nombre-crear');
        input.addEventListener('keyup', (e) => {
           if (e.keyCode === 13) {
               inputp.focus();              
           }
})