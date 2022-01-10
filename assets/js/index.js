// evita que se envie el formulario
$(document).ready(() => {
  $("form").submit((e) => {
    e.preventDefault();
    // captura el valor del input
    let valueInput = $("#heroeInput").val();
    // hace un request a la API, y obtenemos un response que lo adecuamos a nuestras necesidades
    $.ajax({
      url: `https://www.superheroapi.com/api.php/110157631550736/${valueInput}`,
      success: function (data) {
        //  capturamos la informacion de los endpoints
        let nombre = data.name;
        let conexiones = data.biography.aliases;
        let publicado = data.biography.publisher;
        let ocupacion = data.work.occupation;
        let primeraAparicion = data.biography["first-appearance"];
        let altura = data.appearance.height[1];
        let peso = data.appearance.weight[1];
        let alianzas = data.connections.groupAffiliation;
        let img = data.image.url;

        // entrega la informacion en la pagina, con los datos consultados
        $("#heroInfo").html(`<img class="render__img" src="${img}"></img>
            <div class="card">
              <div class="render__body">
                <h5 class="render__title"><span class="render__tag">Nombre:</span> ${nombre}</h5>
                <p class="render__text"><span class="render__tag">Conexiones:</span> ${conexiones}</p>
                <div></div>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item render__text"><span class="render__tag">Publicado:</span> ${publicado}</li>
                <li class="list-group-item render__text"><span class="render__tag">Ocupacion:</span> ${ocupacion}</li>
                <li class="list-group-item render__text"><span class="render__tag">Primera Aparicion:</span> ${primeraAparicion}</li>
                <li class="list-group-item render__text"><span class="render__tag">Altura:</span> ${altura}</li>
                <li class="list-group-item render__text"><span class="render__tag">Peso:</span> ${peso} </li>
                <li class="list-group-item render__text"><span class="render__tag">Alianzas:</span> ${alianzas}</li>
              </ul>
            </div>`);

        // preparacion para canvas
        let dataPoints = [];

        // obtiene la informacion del objecto a consulta
        let powerStats = data.powerstats;

        // distribuye el valor y llave del objecto en variables, mas didactico
        let key = Object.keys(powerStats);
        let valor = Object.values(powerStats);

        // interpola mediante un for, pusheando un nuevo objecto en el array datapoints
        // el cual contendra la informacion para nuestro grafico
        for (let i = 0; i < 6; i++) {
          dataPoints.push({
            y: valor[i],
            label: key[i],
          });
        }
        // configuracion del grafico de canvasJS
        let config = {
          theme: "light2", // "light1", "light2", "dark1", "dark2"
          exportEnabled: false,
          animationEnabled: true,
          title: {
            text: "Super Heroes Informacion",
          },
          data: [
            {
              type: "pie",
              startAngle: 25,
              toolTipContent: "<b>{label}</b>: {y}",
              showInLegend: "true",
              legendText: "{label}",
              indexLabelFontSize: 16,
              indexLabel: "{label} - ({y})",
              dataPoints: dataPoints,
            },
          ],
        };
        let chart = new CanvasJS.Chart("heroStats", config);
        chart.render();
      },
    });
  });
});

// elimina clase
let renderInfo = document.querySelector(".render__info");

if (window.matchMedia(`(max-width: 576px)`).matches) {
  renderInfo.classList.remove("d-flex", "flex-row");
}
