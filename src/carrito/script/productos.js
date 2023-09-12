// PRODUCTOS
const productos = [
    // Abrigos
    {
        id: "sushi-01",
        titulo: "Veggie Keto Oriental",
        imagen: "../images/menu1.webp",
        precio: 10000
    },
    {
        id: "sushi-02",
        titulo: "Cheese Roll",
        imagen: "../images/menu6.webp",
        precio: 10000
    },
    {
        id: "sushi-03",
        titulo: "Samurai Roll",
        imagen: "../images/menu8.webp",
        precio: 10000
    },
    {
        id: "sushi-04",
        titulo: "Cheese Tempura",
        imagen: "../images/menu9.webp",
        precio: 10000
    },
    {
        id: "sushi-05",
        titulo: "Sashimi Tempura Atún",
        imagen: "../images/menu10.webp",
        precio: 10000
    },
    {
        id: "sushi-06",
        titulo: "Sashimi Atún",
        imagen: "../images/menu11.webp",
        precio: 10000
    },
    {
        id: "sushi-07",
        titulo: "Tropical Roll",
        imagen: "../images/menu12.webp",
        precio: 10000
    },
    {
        id: "sushi-08",
        titulo: "Strawberry Roll",
        imagen: "../images/menu13.webp",
        precio: 10000
    },
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
