
/* Esperamos que cargue el documento y eliminamos la opción de cargar del formulario */
$(document).ready(function(){
    $("form").submit(function(event){
      event.preventDefault();
  
      /* Nos traemos la número que el usuario nos indica  */
  let valueInput = $('#heroInput').val();
  
  
  /* Una vez recogida el número lo unimos a la Api para generar el resultado */
  $.ajax({
    url: "https://superheroapi.com/api.php/10159196424884909/" + valueInput,
    success: function(data){
    /* Inicio de los Datos de Heroes */
        let nombre = data.name;
        let imagen = data.image.url;
        let publicado = data.biography.publisher;
        let conex = data.connections['group-affiliation'];
        let ocupacion = data.work.occupation;
        let aparicion = data.biography['first-appearance'];
        let altura = data.appearance.height;
        let peso = data.appearance.weight;
        let alianzas = data.biography.aliases;
        /* Cargamos la información de los heroes a traves de una card de bootstrap */
        $("#heroInfo").html(`
        <h4 class="text-center">SuperHero Encontrado</h4>
        <div class="card mb-3" style="max-width: 540px;">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="${imagen}" class="card-img" alt="Imagen del " + ${nombre}>
          </div>
          <div class="col-md-8">
            <div class="card-body">
            <h6 class="card-title"><b>Nombre:</b> ${nombre}</h6>
            <p class="card-text"><b>Conexiones: </b>${conex}</p>
            <p class="card-text"><b>Publicado por:</b>  ${publicado}</p>
            <hr>
            <p class="card-text"><b>Ocupación: </b>${ocupacion}</p>
            <hr>
            <p class="card-text"><b>Primera Modificación:</b> ${aparicion}</p>
            <hr>
            <p class="card-text"><b>Altura:</b> ${altura}</p>
            <hr>
            <p class="card-text"><b>Pesos:</b> ${peso}</p>
            <hr>
            <p class="card-text"><b>Alianzas:</b> ${alianzas}</p>
            </div>
          </div>
        </div>
      </div>
        `);
        /* Inicio del gráfico */
        let estadisticas = [];
        let datosApi = data.powerstats;
        Object.entries(datosApi).forEach( s => {
          estadisticas.push({
            y: parseInt(s[1]),
            label: s[0]
          });
        });
         
    
        let config = {
  
          animationEnable : true,
          title: {
              text: "Estadísticas de poder para " + nombre,
            
          },
          data: [{
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}",
            showInLegend: "true",
            legendText: "{label} - {y}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}",
            dataPoints: estadisticas,
          }],
        }
        /* Usamos Canvas para generar el gráfico con las variables previamente definidas */
        let chart = new CanvasJS.Chart("heroStats", config);
  
        chart.render();
        },
    error: function(data) {
          //esta función se activa si ocurre algún error durante el proceso
          alert('Ha ocurrido un error para cargar los datos');
          },
          
    })
  
  });
  });