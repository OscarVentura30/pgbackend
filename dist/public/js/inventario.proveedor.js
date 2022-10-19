$(document).ready(() => {
    var url = '/api/get-proveedor';

    $('#tablaClientesTipo').DataTable ({

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
        {"data" : "telefono"},
        {"data" : "productoServicio"},
        {"data" : "descripcion"},
        {"data" : function(data){
            return '<button type="button" class="btn btn-info" onclick="detalles('+data.id+')">Detalles</button><button type="button" class="btn btn-warning" onclick="editar('+data.id+')">Editar</button><button type="button" class="btn btn-danger" onclick="eliminar('+data.id+')">Eliminar</button>'}
        }
        ],

    });

});

getProveedorTipo();

async function getProveedorTipo(){
    const url = '/api/get-proveedor-tipo';
    await fetch(url)
    .then((res)=> res.json() )
    .then((datos)=>{

        let select = document.getElementById("select-type-proveedor");

        for(x of datos) {

            let option = document.createElement("option");
            option.setAttribute("value", x.id );
            let option1Text = document.createTextNode(x.productoServicio);
            option.appendChild(option1Text);
            select.appendChild(option);

        }

        let select2 = document.getElementById("select-type-proveedor2");

        for(x of datos) {

            let option = document.createElement("option");
            option.setAttribute("value", x.id );
            let option1Text = document.createTextNode(x.productoServicio);
            option.appendChild(option1Text);
            select2.appendChild(option);

        }
    })
    .catch((error) => { 
        console.log('error al obtener datos, ', error)
    })
}

async function agregar() {

    const regex = /[A-Za-z\d$@$!%*?&]{1,50}$/

    const postUrl ='/api/post-proveedor'; 
    
    const nombre = document.getElementById('input-nombre').value;
    const razonsocial = document.getElementById('input-razonsocial').value;
    const direccion = document.getElementById('input-direccion').value;
    const telefono = document.getElementById('input-telefono').value;
    const telefono2 = document.getElementById('input-telefono2').value;
    const email = document.getElementById('input-email').value;
    const sitioWeb = document.getElementById('input-sitioWeb').value;
    const descripcion = document.getElementById('input-descripcion').value;
    const tipoProveedorId = document.getElementById('select-type-proveedor').value;

    if (regex.test(nombre) == false) {

        document.getElementById('alert-input-1').textContent = 'Error: Dato invalido';
        return;
    }

    const data = {
        nombre: nombre,
        razonSocial: razonsocial,
        direccion: direccion,
        telefono: telefono,
        telefono2: telefono2,
        email: email,
        sitioWeb: sitioWeb,
        productoServicioId: tipoProveedorId,
        descripcion: descripcion
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

async function editar(id){

    var myModal = new bootstrap.Modal(document.getElementById('modalEditarProveedor'));
    myModal.show();

    const getId = ('/api/get-proveedor/' + id);

    await fetch(getId)
        .then((res) => res.json())
        .then((dat) => {

            document.getElementById('id-editar').value = dat[0].id;
            document.getElementById('input-nombre-editar').value = dat[0].nombre;
            document.getElementById('input-razonsocial-editar').value = dat[0].razonsocial;
            document.getElementById('input-direccion-editar').value = dat[0].direccion;
            document.getElementById('input-telefono-editar').value = dat[0].telefono;
            document.getElementById('input-telefono2-editar').value = dat[0].telefono2;
            document.getElementById('input-email-editar').value = dat[0].email;
            document.getElementById('input-sitioWeb-editar').value = dat[0].sitioWeb;
            document.getElementById('input-descripcion-editar').value = dat[0].descripcion;
            document.getElementById('select-type-proveedor2').value = dat[0].productoServicioId;
        })
        .catch((error) => {
            Swal.fire({
                icon: 'Error',
                title: 'Error',
                text: 'No es posible Editar',
            })
        });
    

}

async function detalles(id){

    var myModal = new bootstrap.Modal(document.getElementById('modalVerProveedor'));
    myModal.show();

    const getId = ('/api/get-proveedor/' + id);

    await fetch(getId)
        .then((res) => res.json())
        .then((dat) => {

            document.getElementById('idVer').textContent = dat[0].id;
            document.getElementById('nombreVer').textContent = dat[0].nombre;
            document.getElementById('razonsocialVer').textContent = dat[0].razonSocial;
            document.getElementById('direccionVer').textContent = dat[0].direccion;
            document.getElementById('telefonoVer').textContent = dat[0].telefono;
            document.getElementById('telefono2Ver').textContent = dat[0].telefono2;
            document.getElementById('emailVer').textContent = dat[0].email;
            document.getElementById('sitioWebVer').textContent = dat[0].sitioWeb;
            document.getElementById('descripcionVer').textContent = dat[0].descripcion;
            document.getElementById('tipoProveedor').textContent = dat[0].productoServicioId;
        })
        .catch((error) => {
            Swal.fire({
                icon: 'Error',
                title: 'Error',
                text: 'No es posible Ver',
            })
        });
    
}

async function postEditar(){

    const id = document.getElementById('id-editar').value;
    const Newnombre =document.getElementById('input-nombre-editar').value;
    const Newrazonsocial =document.getElementById('input-razonsocial-editar').value;
    const Newdireccion =document.getElementById('input-direccion-editar').value;
    const Newtelefono =document.getElementById('input-telefono-editar').value;
    const Newtelefono2 =document.getElementById('input-telefono2-editar').value;
    const Newemail =document.getElementById('input-email-editar').value;
    const NewsitioWeb =document.getElementById('input-sitioWeb-editar').value;
    const Newdes =document.getElementById('input-descripcion-editar').value;
    const Newserv =document.getElementById('select-type-proveedor2').value;

    const url =('/api/put-proveedor/'+ id);

    const regex = /[A-Za-z\d$@$!%*?&]{1,50}$/;

    if (regex.test(Newnombre) == false) {

        document.getElementById('alert-input-2').textContent = 'Error: Dato invalido, se necesita al menos un nombre';
        return;
    }

    const data = {
        nombre: Newnombre,
        razonSocial: Newrazonsocial,
        direccion: Newdireccion,
        telefono: Newtelefono,
        telefono2: Newtelefono2,
        email: Newemail,
        sitioWeb: NewsitioWeb,
        productoServicioId: Newserv,
        descripcion: Newdes
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
        title: 'Desea Eliminar la Proveedor '+ id +'?',
        text: "Esta accion no se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sí, borrar !'
    }).then((result) => {
    if (result.isConfirmed) {

        fetch('/api/delete-proveedor/'+ id,{
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