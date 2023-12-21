# DeliveryAngular
RESUMEN

Para empezar, creé un archivo JSON donde se incluyen todos los datos de los productos por sus categorias, así como los datos del pedido que se guardan en el 'localStorage'. Realice el llamado de los datos mediante funciones asincronas. Para el componente principal, mostré el contenido y hice referencia a las secciones, las cuales fueron declaradas mediante interfaces.
Para mejorar la organización del código, decidí separar cada sección en componentes individuales. Además, utilicé routers para vincular las diferentes secciones, directivas para manipular el DOM y agregar clases, y signals para detectar cambios en el usuario, la cantidad de productos y modificaciones en el carrito.
Hice uso de interpolaciones para hacer referencia a elementos que se muestran, y para evitar el uso del constructor, utilicé 'inject' para sus dependencias, permitiendo así su uso en varios componentes.
En general, la estructura de la aplicación está diseñada para facilitar el mantenimiento y la comprensión del código para el diseño fui tomando referencias de otras paginas relacionadas con la compra de productos en linea.


HEADER

Para hacer referencia a las diferentes secciones y cambiar el titulo, agregue un signal en el service para  los titulos como el routeo de los mismos para su navegacion.


MAIN 

El fetch que hicimos nos va a traer todas las categorias del archivo.json donde estan todos los datos, todo esto lo definimos en el onit que creamos en el home.ts que fue donde colocamos el titulo y la extension con la transicion, use un standalone sin la necesidad de modelos e asi usarlos en otras secciones y para agregar el selector a la seccion home porque es ahi donde queria las tarjetas de las comidas, para poder hacer esa asociacion tambien tuvimos que hacer standalone a la seccion de home.
Utilizamos la directiva ngFor para hacer referencia a las categorias importando el commonModule, que luego hacemos algo parecido pero para que nos devuelva los productos.
Y es aca donde hacemos uso del ngFor, haciendo un llamado del padre a hijo para que me traiga los datos del json con las diversas categorias que luego tambien hacemos uso de las mismas pero para itererar sobre todos los productos, traemos los datos del json, las cuales vamos a mostrarlos con una interpolacion y tambien traer las fotos de presentacion para asi darle estilo con un grid. Eso tambien nos lleva a generar el RouterModule para navegar por las diferentes categorias.


CATEGORIAS

Para las categorias, se creo una interface categoria para definir las propiedades para hacer uso de las instancias para  tener un mejor orden y donde hice uso de las signals para detectar cambios e implementalos haciendo su llamado, para traer las categorias por medio de un fetch generamos la funcion getByCategoria que con la constante productos nos va a traer todos los productos de la categoria, el cual lo hicimos por el service.
Bajo el activateRoute lo use para obtener datos, en este caso de los productos del id y me devuelve los productos en forma de un array como para darle estilo tambien, segun la opcion elegida en el home.
Para cambiar los nombre de las categorias mediante la opcion elegida en el hombre en el service categorias cree el byId para obtener los datos de las categorias mediante su id, lo declaramos en rubro para mantener lo que serian las secciones elegidas junto con su respectivo contenido (todas las pizzas, hamburguesas, combos...) tambien use el ActivatedRoute para recibir los parametros de la url y asi obtener un tipo de comida segun su id.
Mediante el route que nos va a dar margen para navegar sobre la seccion de articulos y la comunicacion entre componentes obtuve el id que devuelve todos los productos como tambien al seleccionarlo nos va a permitir agregarlos al carrito, gracias a la funcion en el component para agregarlos.


BUSQUEDA

Generamos la funcion que nos va a traer los productos, busqueda por ingredientes y si es apto vegano o celiaco eso tambien nos ayuda a las propiedades que generamos por la interface y del json que tambien lo declaramos como booleano.
Manipulamos el filtro de busqueda mediante un form el cual le dimos funcion con directivas e hicimos la injection para saber que cosa tenia que buscar, en este caso los productos, por defecto me devuelve todos los productos pero al hacer el Apto Celiaco o Vegano obtuve los datos mediante un async para filtrar los parametros y si cumplia con eso iba a devolver los elementos seleccionados.
Para hacer busqueda por texto se busco el producto y donde tambien se incluyo a los vegano como celiaco, tambien se hizo un lowercase donde aparecio el problema donde no reconocia las mayusculas y para buscar por ingredientes se hizo mediante un bucle for.


CARRITO  

Una vez creadas las funciones vinculamos el router en los articulos que una vez que agregamos al carrito nos manda a la seccion del carrito para pagar e utilizamos el router navigate, al agregar el producto nos manda al carrito donde tambien tenemos la opcion para seguir agregando a gusto. 
Se creo una funcion para guardar los datos en un localStorage asi cuando se inicia la aplicacion tiene valores que seleccione y no alteran su comportamiento, esto lo definimos en el service del carrito como tambien definimos el form y su comportamientos haciendo  llamado de los modulos como sus directivas, como hice uso de los services para el carrito? importe components que le van a dar funcion al carrito con el uso de injects para traer los service y usarlos para llamar a los metodos durante directivas, asi darle funcionamiento al carrito. Para controlar los cambios de los productos hice llamados mediante el uso de WritableSignals.
Agregamos un boton mediante el uso del router nos va a mandar al home como para seguir agregando cosas al carrito.
Creamos la funcion para quitar un producto y cuando termina de realizar la funcion se actualiza la lista, ya sea agregando o quitando. 
Tambien hicimos la condicion con directivas, si no cumple con los datos de envio, entonces no se puede realizar el pedido, ya esto venia con la condicion explicita del required en el componente.
hicimos la fecha de vencimiento del carrito por medio del date, despues de cuatro dias el carrito se resetea por si solo al igual que en el localStorage.
Para terminar una vez realizado el pedido nos redirreaciona a wpp para enviar el mensaje del pedido y con el dialog generamos el modal, donde si ya terminamos de hacer la compra se resetean los datos del carrito y si no, poder seguir navegando, para finalizar resetee valores con uso de directivas, una vez finalizada la compra vuelve al home.
Tuve problemas para detectar cambios con el calculo total, pude resolverla haciendo llamada a la funcion donde realizo los calculos totales, que tambien hago uso del mismo en otras funciones. donde tuve que hacer cambios con las funciones, donde tuve que iterar por el array para traer los productos por su id y en base a eso, genere el uso del slice para eliminar un producto con esto mismo tambien pude solucionar el problema para eliminar productos del carrito, donde eliminaba el seleccionado pero sin ninguna razon se borraba el ultimo. 


PERFIL

Vinculamos la clase de perfil que creamos para el formulario asignandolas con un ngModel, utilizamos un atributo del formulario para darle la validacion utilizando el invalid, siempre cuando haya una condicion que no se cumpla, en este caso 5 caracteres minimo y el touched con el required, creamos un servicio donde se van a guardar los datos, un localStorage y ese servicio lo injectamos para darle uso en el perfil, asi guardar los datos 
Cree el perfil con el writableSignal para setear los datos y que se muestren reflejados los datos en el carrito
para el formulario hicimos uso de directivas para controlar de que los datos esten completos. 


FOOTER/TABS

Para empezar estructuramos la pagina y preparamos sus routers ya para navegar por las distintas secciones, para el estilo de los icons los modique desde sus propiedades e hice ajustes con scss aprovechando sus funciones y le di el efecto como si el boton estuviera presionado por medio de un box shadow.
Cree la variable de navegacion para interactuar con las diversas secciones las cuales fueron logradas con un evento de tipo click y sus events determinando la instancia NavigationEnd nos va a dar margen para saber por donde vamos a navegar en la pagina y para darle color a la seccion seleccionada la determinamos creando la variable de navegacion para interactuar con las diversas secciones , para asi luego inyectar el servicio del router que es donde vamos a estar posicionados.


