### Instalación
Descargar dependencias:

`npm install`
(Require node.js)

Luego de ejecutar este comando, se debiese crear una carpeta llamada 'node_modules' con todos los paquetes usados en el proyecto - incluido Bootstrap.

### Desarrollo
Para compilar los archivs sass (.scss), se recomienda la extensión de VSCode "[Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=glenn2223.live-sass)". Usando la función "Watch Sass", los archivos .scss serán compilados a archivos .css en vivo.

Nota: [Sass](https://sass-lang.com/) es una extensión de CSS que otorga funcionalidad adicional como el uso de variables. Antes de siquiera usar Sass/CSS, se recomienda usar clases y [componentes](https://getbootstrap.com/docs/5.3/components/accordion/) de Bootstrap.

### Editando HTML

Ya que este es un sitio estático, basta abrir un archivo .html en el navegador para previsualizar los cambios.

Al crear nuevos archivos .html, se recomienda copiar este template (y acordando reemplazar el camino en el tag <base>):

```
<!DOCTYPE html>
<html lang="en" data-bs-theme="dark">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- CAMINO A CARPETA "src" -->
    <base href="">

    <link rel="stylesheet" href="main.css">
    <link rel="stylesheet" href="nav.css">

    <script src="../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>

    <title>WWWW Sushi</title>
  </head>
<body>
  <div class="d-flex flex-column min-vh-100">
    <!-- NAVBAR -->
    <div class="container flex-fill">
      <!-- TU CONTENIDO AQUÍ -->
    </div>
    <!-- FOOTER -->
  </div>
</body>
</html>
```

Nota: El tag "base" se usa para especificar la raiz desde la cual se resuelven los enlaces relativos. Colocándonos en la carpeta src, se minimizan los errores cuando, por ejemplo, se importa el navbar al código.
