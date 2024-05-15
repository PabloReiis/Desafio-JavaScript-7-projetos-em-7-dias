let digitalElement = document.querySelector(".digital");

let segundoElement = document.querySelector(".p_s");

let minutoElement = document.querySelector(".p_m");

let horaElement = document.querySelector(".p_h");

function atualizarRelegio() {
  let agora = new Date();
  let hora = agora.getHours();
  let minuto = agora.getMinutes();
  let segundo = agora.getSeconds();

  digitalElement.innerHTML = `${fixZero(hora)}:${fixZero(minuto)}:${fixZero(
    segundo
  )}`;

  let anguloSegundo = (360 / 60) * segundo - 90;

  let anguloMinuto = (360 / 60) * minuto - 90;

  let anguloHora = (360 / 12) * hora - 90;

  segundoElement.style.transform = `rotate(${anguloSegundo}deg)`;
  minutoElement.style.transform = `rotate(${anguloMinuto}deg)`;
  horaElement.style.transform = `rotate(${anguloHora}deg)`;
}

function fixZero(time) {
  // if (time < 10) {
  //   return "0" + time;
  // } else {
  //   return time;
  // }

  return time < 10 ? `0${time}` : time;
}

setInterval(atualizarRelegio, 1000);

atualizarRelegio();
