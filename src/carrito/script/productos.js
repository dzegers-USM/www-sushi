// PRODUCTOS
const productos = [
    // Abrigos
    {
        id: "abrigo-01",
        titulo: "Abrigo 01",
        imagen: "./img/abrigos/01.jpg",
        precio: 1010
    },
    {
        id: "abrigo-02",
        titulo: "Abrigo 02",
        imagen: "./img/abrigos/02.jpg",
        precio: 900
    },
    {
        id: "abrigo-03",
        titulo: "Abrigo 03",
        imagen: "./img/abrigos/03.jpg",
        precio: 2000
    },
    {
        id: "abrigo-04",
        titulo: "Abrigo 04",
        imagen: "./img/abrigos/04.jpg",
        precio: 1500
    },
    {
        id: "abrigo-05",
        titulo: "Abrigo 05",
        imagen: "./img/abrigos/05.jpg",
        precio: 600
    },
    // Camisetas
    {
        id: "camiseta-01",
        titulo: "Camiseta 01",
        imagen: "./img/camisetas/01.jpg",
        precio: 1500
    },
    {
        id: "camiseta-02",
        titulo: "Camiseta 02",
        imagen: "./img/camisetas/02.jpg",
        precio: 2100
    },
    {
        id: "camiseta-03",
        titulo: "Camiseta 03",
        imagen: "./img/camisetas/03.jpg",
        precio: 2300
    },
    {
        id: "camiseta-04",
        titulo: "Camiseta 04",
        imagen: "./img/camisetas/04.jpg",

        precio: 500
    },
    {
        id: "camiseta-05",
        titulo: "Camiseta 05",
        imagen: "./img/camisetas/05.jpg",
        
        precio: 100
    },
    {
        id: "camiseta-06",
        titulo: "Camiseta 06",
        imagen: "./img/camisetas/06.jpg",
        
        precio: 100
    },
    {
        id: "camiseta-07",
        titulo: "Camiseta 07",
        imagen: "./img/camisetas/07.jpg",
        
        precio: 500
    },
    {
        id: "camiseta-08",
        titulo: "Camiseta 08",
        imagen: "./img/camisetas/08.jpg",
        
        precio: 500
    },
    // Pantalones
    {
        id: "pantalon-01",
        titulo: "Pantalón 01",
        imagen: "./img/pantalones/01.jpg",
        
        precio: 600
    },
    {
        id: "pantalon-02",
        titulo: "Pantalón 02",
        imagen: "./img/pantalones/02.jpg",
        
        precio: 600
    },
    {
        id: "pantalon-03",
        titulo: "Pantalón 03",
        imagen: "./img/pantalones/03.jpg",
        precio: 700
    },
    {
        id: "pantalon-04",
        titulo: "Pantalón 04",
        imagen: "./img/pantalones/04.jpg",
        precio: 800
    },
    {
        id: "pantalon-05",
        titulo: "Pantalón 05",
        imagen: "./img/pantalones/05.jpg",
        precio: 1300
    }
];



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


function guardarProducto(id){


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
                carrito.push(productoAgregado)
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
                carrito.push(productoAgregado)
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
