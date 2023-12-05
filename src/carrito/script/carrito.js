const numero_products = document.getElementById("numero-products");
const global = document.getElementById("global");
const vaciarCarrito = document.getElementById("vaciarCarrito");
const precio_total = document.getElementById("precio-total");

const comprar = document.getElementById("comprar");

function recargarProductosCarrito(){
    let dato = JSON.parse(localStorage.getItem('productos'));
    console.log("dato: ",dato);



    if(JSON.stringify(dato)!='null'){

        //Sacamos datos duplicados
        // let set = new Set(dato.map(JSON.stringify));
        // let arrSinDuplicados = Array.from(set).map(JSON.parse);
        // console.log("dato no repetidos: ", arrSinDuplicados);

        //calculamos el total de todos los productos
        const numeroP = dato.reduce((total,item) => {

            return total + item.numeroUnidades;

        },0);

        const eliminarNumeroUnidadesCero = dato.filter(produc => produc.numeroUnidades != 0);

        localStorage.setItem('productos',JSON.stringify(eliminarNumeroUnidadesCero));

        numero_products.innerHTML= numeroP;

        if(numeroP ===0){
            localStorage.clear('productos')
        }


        // //Se indica el numero de unidades por producto
        // dato.forEach(product => {
        //     let item = product.id;
        //     const numeroUnidadesItem = dato.reduce((total, itemId) => {
        //         // ¿Coincide las id? Incremento el contador, en caso contrario lo mantengo
        //         return itemId.id === item ? total += 1 : total;
        //     }, 0);
        //     //console.log(product.titulo, "unidades : ",numeroUnidadesItem)
        //     product.numeroUnidades = numeroUnidadesItem;
        //     console.log("producto: ", product.titulo, "numeroUni: ",product.numeroUnidades)
        // });



        const html = eliminarNumeroUnidadesCero.map(product => {
            return (
                `
                <div class="row mt-2 text-center rounded-3 shadow d-flex align-items-center" style="min-height: 100px;">
                    <div class="col-lg-2 col-md-3 col-12">
                        <img src="../images/menu${product.index}.webp" class="card-img-top" alt="..." style="max-width: 100%;">
                    </div>
                    <div class="col-lg-2 col-md-3 col-12 d-flex flex-column align-items-center">
                        <strong>Titulo:</strong>
                        <p>${product.titulo}</p>
                    </div>
                    <div class="col-lg-2 col-md-3 col-12 d-flex flex-column align-items-center">
                        <strong>Cantidad: </strong>
                        <p>${product.numeroUnidades}</p>
                    </div>
                    <div class="col-lg-2 col-md-3 col-12 d-flex flex-column align-items-center">
                        <strong>Precio</strong>
                        <p>$ ${product.precio}</p>
                    </div>
                    <div class="col-lg-2 col-md-3 col-12 d-flex flex-column align-items-center">
                        <strong>Subtotal</strong>
                        <p>${(product.precio) * (product.numeroUnidades)}</p>
                    </div>
                    <div class="col-lg-2 col-md-3 col-12 d-flex flex-column align-items-center">
                        <button type="button" class="btn btn-danger" id="delete-producto" data-id="${product.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>

                `
            )
        });

        global.innerHTML = html.join('');
        //calculamos el total de todos los productos
        const total = dato.reduce((total,item) => {
            return total + item.precio* item.numeroUnidades;
        },0)


        console.log("precio total: ", total);
        precio_total.innerHTML = `$ ${total}`;

        //Cuando se presiona el boton eliminar de un producto
        const delete_producto = document.querySelectorAll("#delete-producto");
        delete_producto.forEach(button => {
            button.addEventListener("click", e => {
                e.preventDefault();
                const id = button.getAttribute("data-id");

                const productoIndex = dato.findIndex(dato => dato.id === id);
                dato[productoIndex].numeroUnidades -- ;
                console.log("numero de unidades",dato[productoIndex].numeroUnidades,"del producto: ",dato[productoIndex].titulo);
                console.log("productos: ",dato);
                localStorage.setItem('productos',JSON.stringify(dato));



                recargarProductosCarrito();
                // let dato = JSON.parse(localStorage.getItem('productos'));
                // console.log("dato recuperados del localstorage",dato);
            })
        });


    }else if(JSON.stringify(dato) === 'null'){
        global.classList.add("d-flex");
        global.classList.add("justify-content-center");
        global.classList.add("align-items-center");
        global.innerHTML="Su carrito esta vacio";
        numero_products.innerHTML= '0'
        precio_total.innerHTML = `$ 0`;
    }
}



function vaciarCar(){
    

    localStorage.clear('productos');
    recargarProductosCarrito();
}



function comprarProductos(){
    let dato = JSON.parse(localStorage.getItem('productos'));
    console.log("dato: ",dato);
    var datosusuario = JSON.parse(localStorage.getItem('misDatos'));
    console.log(datosusuario);
    if(JSON.stringify(dato)!='null'){

        var nuevaLista = dato.map(function(item) {
            return {
                cantidad: item.numeroUnidades,
                idproducto: item.id
            };
        });
        let montofinal=0
        dato.forEach(element => {
            montofinal= montofinal+ element.numeroUnidades*element.precio
        });
        var query2 = `
        mutation Mutation($addCompraId: ID!, $input: CompraInput) {
            addCompra(id: $addCompraId, input: $input) {
              estado
            }
          }
        `;

        var datosusuario = JSON.parse(localStorage.getItem('misDatos'));
        iduser=datosusuario.id

        var variab= {
            addCompraId: iduser,
            input: {
              Monto: montofinal,
              productos: nuevaLista
            }
          
          }

        fetch('http://localhost:8888/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query2,
          variables: variab
        }),
        })
        .then(response => response.json())
        .then(data => {
            localStorage.clear('productos');
			localStorage.setItem('misDatos', JSON.stringify(datosusuario));

            window.location.href = "./Pagado.html";
            
        })
        .catch(error => console.error('Error:', error));

        
    }else{
        alert("No se puede comprar nada porque no tiene nada seleccionado.")
    }

}


document.addEventListener("DOMContentLoaded", recargarProductosCarrito);
vaciarCarrito.addEventListener("click",vaciarCar);
comprar.addEventListener("click", comprarProductos);