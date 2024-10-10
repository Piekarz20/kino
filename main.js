const form = document.querySelector("form");
const aside = document.querySelector("aside");
const sumaDisplay = document.querySelector(".sumaDisplay");

form.addEventListener("change", (evt) => {
  evt.preventDefault();
  const zwykleMiejsca = document.querySelectorAll('input[name="miejsce"]');
  const miejscaVip = document.querySelectorAll('input[name="miejscevip"]');
  sumaDisplay.innerHTML = "";
  aside.innerHTML = "";
  let suma = 0;
  zwykleMiejsca.forEach((miejsce) => {
    if (miejsce.checked) {
      aside.innerHTML += `${miejsce.value} `;
      suma += 22.9;
    }
  });
  miejscaVip.forEach((miejsceVip) => {
    if (miejsceVip.checked) {
      aside.innerHTML += `${miejsceVip.value} `;
      suma += 33.9;
    }
  });
  sumaDisplay.innerHTML = `Suma: ${suma}`;
});
