
// GET DATOS PARA FORMULARIO

    getTipo();
    getMarca();
    getPresent();
    getMedida();
    getProveedor();
    getProveedorTipo();

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


        })
        .catch((error) => { 
            console.log('error al obtener datos, ', error)
        })
    }

    async function getMedida(){
        const url = '/api/get-unidades';
        await fetch(url)
        .then((res)=> res.json() )
        .then((datos)=>{
    
            let select = document.getElementById("select-content-product");
            for(x of datos) {
    
                let option = document.createElement("option");
                option.setAttribute("value", x.id );
                let option1Text = document.createTextNode(x.descripcion);
                option.appendChild(option1Text);
                select.appendChild(option);
    
            }
            
    
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


/// Agregar
async function agregar() {

    const regex = /[A-Za-z\d$@$!%*?&]{1,50}$/

    const postUrl ='/api/postfull-productos'; 
    
    var codigoBarras = document.getElementById('input-codigoBarras').value;
    const nombre = document.getElementById('input-nombre').value;
    const marcaId = document.getElementById('select-marcas-product').value;
    const clasificacionId = document.getElementById('select-type-product').value;
    const presentacionId = document.getElementById('select-present-product').value;
    const contenidoId = document.getElementById('select-content-product').value;
    const precioVenta = document.getElementById('input-precioVenta').value;
    const proveedorId = document.getElementById('select-proveedor-product').value;
    const precioCompra = document.getElementById('input-precioCompra').value;


    if (regex.test(nombre) == false) {

        Swal.fire({
            icon: 'Error',
            title: 'Error',
            text: 'Nombre de producto Invalido',
        })
        
        return;
    }
    
    if (codigoBarras == null || codigoBarras =="" || codigoBarras == " ") {

        codigoBarras = 'N_R'
    }

    const datos = {
        codigoBarras: codigoBarras,
        nombre: nombre,
        marcaId: marcaId,
        clasificacionId: clasificacionId,
        presentacionId: presentacionId,
        contenidoId: contenidoId,
        precioVenta: precioVenta,
        proveedorId: proveedorId,
        precioCompra: precioCompra

    }

    await fetch(postUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(datos),
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
            console.log(error);
        });

}


async function agregarMarca() {

    const regex = /[A-Za-z\d$@$!%*?&]{1,50}$/

    const postUrl ='/api/post-marcas'; 
    
    const des = document.getElementById('input-marca-descripcion').value;

    if (regex.test(des) == false) {

        document.getElementById('alert-input-1').textContent = 'Error: Dato invalido';
        return;
    }

    const data = {
        descripcion: des
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
            getMarca();
            document.getElementById('input-marca-descripcion').value="";
            document.getElementById('alert-input-1').textContent="";

        })
        .catch((error) => {
            Swal.fire({
                icon: 'Error',
                title: 'Error',
                text: 'No es posible guardar Marca',
            })
        });

}

async function agregarTipo() {

    const regex = /[A-Za-z\d$@$!%*?&]{1,50}$/

    const postUrl ='/api/post-tipo'; 
    
    const des = document.getElementById('input-tipo-descripcion').value;

    if (regex.test(des) == false) {

        document.getElementById('alert-input-2').textContent = 'Error: Dato invalido';
        return;
    }

    const data = {
        descripcion: des
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
            getTipo();
            document.getElementById('input-tipo-descripcion').value="";
            document.getElementById('alert-input-2').textContent="";

        })
        .catch((error) => {
            Swal.fire({
                icon: 'Error',
                title: 'Error',
                text: 'No es posible guardar',
            })
        });

}

async function agregarPresentacion() {

    const regex = /[A-Za-z\d$@$!%*?&]{1,50}$/

    const postUrl ='/api/post-present'; 
    
    const des = document.getElementById('input-presentacion-descripcion').value;

    if (regex.test(des) == false) {

        document.getElementById('alert-input-3').textContent = 'Error: Dato invalido';
        return;
    }

    const data = {
        descripcion: des
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
            getPresent();
            document.getElementById('input-presentacion-descripcion').value = "";
            document.getElementById('alert-input-3').textContent=""

        })
        .catch((error) => {
            Swal.fire({
                icon: 'Error',
                title: 'Error',
                text: 'No es posible guardar Presentacion',
            })
        });

}

async function agregarMedida() {

    const regex = /[A-Za-z\d$@$!%*?&]{1,50}$/

    const postUrl ='/api/post-unidades'; 
    
    const des = document.getElementById('input-medida-descripcion').value;
    const val = document.getElementById('input-medida-valor').value;


    if (regex.test(des) == false || val <= 0) {

        document.getElementById('alert-input-4').textContent = 'Error: Datos invalidos';
        return;
    }

    const data = {
        descripcion: des,
        valorUnitario: val
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
            getMedida();
            document.getElementById('input-medida-descripcion').value="";
            document.getElementById('input-medida-valor').value="";
            document.getElementById('alert-input-4').textContent=""

        })
        .catch((error) => {
            Swal.fire({
                icon: 'Error',
                title: 'Error',
                text: 'No es posible guardar',
            })
        });

}

async function agregarProveedor() {

    const regex = /[A-Za-z\d$@$!%*?&]{1,50}$/

    const postUrl ='/api/post-proveedor'; 
    
    const nombre = document.getElementById('input-proveedor-nombre').value;
    const descripcion = document.getElementById('input-proveedor-descripcion').value;
    const tipoProveedorId = document.getElementById('select-type-proveedor').value;

    if (regex.test(nombre) == false) {

        document.getElementById('alert-input-5').textContent = 'Error: Dato invalido';
        return;
    }

    const data = {
        nombre: nombre,
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
            document.getElementById('input-proveedor-nombre').value = "";
            document.getElementById('input-proveedor-descripcion').value="";
            document.getElementById('select-type-proveedor').value=1;
            document.getElementById('alert-input-5').textContent=""
            getProveedor();

        })
        .catch((error) => {
            Swal.fire({
                icon: 'Error',
                title: 'Error',
                text: 'No es posible guardar',
            })
        });

}



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
    })
    .catch((error) => { 
        console.log('error al obtener datos, ', error)
    })
}

let input = document.getElementById('input-codigoBarras');
        let inputp = document.getElementById('input-nombre');
        input.addEventListener('keyup', (e) => {
           if (e.keyCode === 13) {
               inputp.focus();              
           }
})