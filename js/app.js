/* Preparation
-------------------- */
//Problem: No user interaction causes no change to application
//Solution: When user interacts cause changes appropriately

/* Plan
-------------------- */
// When clicking on control list items
  // Deselect sibling elements
  // Select clicked element

// When new color is pressed
  // Show or hide the color select menu

// When color sliders change
  // Update the new color span (cuadrado que muestra un preview del color)

// When add color is pressed
  // Append the color to the controls ul
  // Select the new color

// On mouse events on the canvas
  // Draw lines

/* Perform
-------------------- */
// se crea la variable color con el color que está seleccionado en la carga de la página por default.
var color = $(".selected").css("background-color");

// Crea una variable que representa al elemento canvas
var $canvas = $("canvas");
// $("canvas")[0] es la forma de seleccionar con js.  Se selecciona el primer canvas del array (posición 0)
// .getContext("2d") es un método especial del elemento canvas que le dice al computador en qué contexto dibujar.
var context = $canvas[0].getContext("2d");

// Se utiliza para guardar la información de los eventos relacionados con el dibujo.
var lastEvent;
// registra si el mouse está oprimido o no
var mouseDown = false;

//When clicking on control list items
  // Reemplaza el tradicional listener de click pues el listener tradicional asigna los listeners a los 
  // elementos cuando la página carga.  Por lo tanto, si el número de elementos varía dinámicamente, los nuevos
  // elementos no tendrán asignado un listener.
  // El método "on" permite actualizar dinámicamente el binding de la acción de click a los elementos dinámicos.
    // En el selector primario se selecciona el padre del elemento a afectar (e.g ".controls")
    // El elemento al cual se le va a asociar el listener se pasa como argumento de on (e.g "li")
$(".controls").on("click", "li", function(){
  
  // this tiene contexto de ser el objeto .controls li en el que se hizo click

  //Deselect sibling elements
    // removeClass quita la clase "selected" a todos los hermanos seleccionados con "siblings()".
  $(this).siblings().removeClass("selected");
  
  //Select clicked element
    // Adiciona la clase "selected".
  $(this).addClass("selected");
  
  //cache current color
    // Guarda el color seleccionado en la variable "color" para su futuro uso
  color = $(this).css("background-color");
});
  
//When "New Color" is pressed
$("#revealColorSelect").click(function(){
  // Actualiza el color del cuadrito de preview antes de de mostrar la visualización.
  changeColor();
  //Show color select or hide the color select
  $("#colorSelect").toggle();
});

//update the new color span
function changeColor() {
  // Almacentan los valores de los sliders r,g,b en variables utilizando val().
    // Los sliders son de tipo input y por eso podemos usar val().
  var r = $("#red").val();
  var g = $("#green").val();
  var b = $("#blue").val();
  $("#newColor").css("background-color", "rgb(" + r + "," + g +", " + b + ")");
}

//When color sliders change
  // Cuando cualquiera de los sliders cambia (change event listener), se utiliza change color como handler
$("input[type=range]").change(changeColor);

//When "Add Color" is pressed
$("#addNewColor").click(function(){
  //Append the color to the controls ul
    // Se crea el nuevo elemento de lista como deattached object
  var $newColor = $("<li></li>");
    // Al objeto "$newColor" le asigna el el bg-color del span de preview de color "#newColor"
  $newColor.css("background-color", $("#newColor").css("background-color"));
    // Adiciona el nuevo elemento a la lista de colores
  $(".controls ul").append($newColor);
  //Select the new color
    // Se utiliza click para "trigger" (emular) el evento de click en el elemento que se acaba de adicionar.
    // Esto deja el color recién creado, seleccionado.
  $newColor.click();
});

//On mouse events on the canvas
  // Esto no es jQuery puro, la mayoría es javascript
  // e es un event object que contiene información del evento.
$canvas.mousedown(function(e){
  lastEvent = e;
  mouseDown = true;
})
// mousemove utilizando method chaining hacia canvas
 
.mousemove(function(e){
  // e contiene el evento de mousemove que es distinto
  // a lastEvent en este punto

  //Draw lines
    // solo ejecuta esto si el mouse sigue abajo (oprimido)
  if(mouseDown) {
    // Inicia un path
    context.beginPath();

    // Indica la posición de inicio del path (en mouseDown)
      // lastEvent.offsetX contiene la posición X del mouseDown relativo al objeto de contexto (siendo la esquina superior izquierda 0,0)
    context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
    // Indica la posición final del path (en mousePath)
    context.lineTo(e.offsetX, e.offsetY);
    // Da el estilo de dibujo
    context.strokeStyle = color;
    // Da la órden de dibujo
    context.stroke();
    lastEvent = e;
  }
})
// chained mouse up event, detecta si alguien suelta el botón del mouse
.mouseup(function(){
  // Cuando levanto el mouse, actualizo la variable mouseDown
  mouseDown = false;
})
/* Perfect
-------------------- */
// chained mouse leave
  // evita un error que había cuando uno sale del canvas con el mouse oprimido
  // y vuelve a entrar en otro punto.
  // mouseleave ejecuta un evento cuando el mouse deja el área del objeto seleccionado.
.mouseleave(function(){
  // Cuando el mouse deja el área, ejecuta la función de mouseup().
  $canvas.mouseup();
});



  







