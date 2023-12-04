// PRODUCTOS

var query2 = `
        query GetProductos {
            getProductos {
                id
                nombre
                precio
            }
            }
        `;


        fetch('http://localhost:8888/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query2,
          variables: {}
        }),
        })
        .then(response => response.json())
        .then(data => {
            productos=data.data.getProductos
        })
        .catch(error => console.error('Error:', error));



const numero_products = document.getElementById("numero-products");



let carrito = [];




function cargarNumeroCarrito(){
    let dato = JSON.parse(localStorage.getItem('productos'));
    if(JSON.stringify(dato)!='null'){

        const numeroP = dato.reduce((total,item) => {
            return total + item.numeroUnidades;
        },0);
        numero_products.innerHTML= numeroP;
    }
    // localStorage.clear();
}


function guardarProducto(id,i){

    if(carrito.length === 0){
        //recupero los datos guardados en el localStorage
        // let datoStorage = JSON.stringify(localStorage.getItem('productos'));
        let dato = JSON.parse(localStorage.getItem('productos'));
        console.log("dato recuperados del localstorage",dato);
        if(JSON.stringify(dato)==='null'){
            //si no hay datos guardados en el localStorage empieze a guardar el contenido del carrito en el local storage
            const productoAgregado = productos.find(producto => producto.id === id);

            //guardo el producto agregado en el array carrito
            if(carrito.some(producto => producto.id === id)){
                //el id tiene duplicado
                //aumentare el numeroUnidades
                const indexSimilar = carrito.findIndex(producto => producto.id === id);
                carrito[indexSimilar].numeroUnidades ++;
            }else{
                productoAgregado.numeroUnidades = 1;
                carrito.push({...productoAgregado, index: i})
            }


            console.log("carrito: ", carrito);

            //guardo en el local storage el producto almacenado
            localStorage.setItem('productos',JSON.stringify(carrito));
            cargarNumeroCarrito();

        }else{
            //los datos del localstorage los guardo en el array para que no se resete en 0 al cargar la pagina
            carrito = dato;
            const productoAgregado = productos.find(producto => producto.id === id);
            //guardo el producto agregado en el array carrito

            if(carrito.some(producto => producto.id === id)){
                //el id tiene duplicado
                //aumentare el numeroUnidades
                const indexSimilar = carrito.findIndex(producto => producto.id === id);
                carrito[indexSimilar].numeroUnidades ++;
            }else{
                productoAgregado.numeroUnidades = 1;
                carrito.push({...productoAgregado, index: i})
            }


            console.log("carrito: ", carrito);


            //esto es para no tener duplicados
            let set = new Set(carrito.map(JSON.stringify));
            let arrSinDuplicados = Array.from(set).map(JSON.parse);
            console.log("dato no repetidos: ", arrSinDuplicados);

            //guardo en el local storage los productos almacenado
            localStorage.setItem('productos',JSON.stringify(arrSinDuplicados));
            cargarNumeroCarrito();
        }

    }else{


        const productoAgregado = productos.find(producto => producto.id === id);
        //guardo el producto agregado en el array carrito

        if(carrito.some(producto => producto.id === id)){
            //el id tiene duplicado
            //aumentare el numeroUnidades
            const indexSimilar = carrito.findIndex(producto => producto.id === id);
            carrito[indexSimilar].numeroUnidades ++;
        }else{
            productoAgregado.numeroUnidades = 1;
            carrito.push(productoAgregado)
        }

        console.log("carrito: ", carrito);


        //esto es para no tener duplicados
        let set = new Set(carrito.map(JSON.stringify));
        let arrSinDuplicados = Array.from(set).map(JSON.parse);
        console.log("dato no repetidos: ", arrSinDuplicados);
        //guardo en el local storage los producto almacenado
        localStorage.setItem('productos',JSON.stringify(arrSinDuplicados));
        cargarNumeroCarrito();
    }

    // localStorage.clear();
}




document.addEventListener("DOMContentLoaded", cargarNumeroCarrito);
