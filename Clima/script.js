document.querySelector(".busca").addEventListener("submit", async (event) => {
  event.preventDefault();

  let input = document.querySelector("#searchInput").value;

  if (input != "") {
    clearInfo();
    mostraAviso("Carregando...");

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      input
    )}&appid=502ad8fb68520220b98d440a13b8cbfd&units=metric&lang=pt_br`;

    let resultado = await fetch(url);

    let json = await resultado.json();

    if (json.cod === 200) {
      mostrarInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg,
      });
    } else {
      clearInfo();
      mostraAviso("Não encontramos essa localização...");
    }
  } else {
    clearInfo();
  }
});

function mostrarInfo(json) {
  mostraAviso("");

  document.querySelector(".titulo").innerHTML = `${json.name},${json.country}`;

  document.querySelector(".tempInfo").innerHTML = `${json.temp} <sup>ºC</sup>`;

  document.querySelector(
    ".ventoInfo"
  ).innerHTML = `${json.windSpeed} <span>km/h</span>`;

  document
    .querySelector(".temp img")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
    );

  document.querySelector(".ventoPonto").style.transform = `rotate(${
    json.windAngle - 90
  }deg)`;

  document.querySelector(".resultado").style.display = "block";
}

function clearInfo() {
  mostraAviso();
  document.querySelector(".resultado").style.display = "none";
}

function mostraAviso(msg) {
  document.querySelector(".aviso").innerHTML = msg;
}
