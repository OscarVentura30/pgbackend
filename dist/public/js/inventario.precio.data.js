// DATOS PARA EL FORMULARIO
getproducto();
getMedida();

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


