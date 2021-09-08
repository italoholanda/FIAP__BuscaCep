function getCep() {
  let cep = 0;
  cep = document.querySelector("input").value.trim();
  return cep;
}

async function getAddress(cep) {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const json = await response.json();
  return json;
}

function writeAddress(address) {
  if (address.uf) {
    document.querySelector("#address").innerHTML =
      `<li>${address.logradouro}</li>` +
      `<li>${address.localidade}</li>` +
      `<li>${address.uf}</li>`;
  } else {
    alert("CEP não encontrado.");
  }
}

function getCEPAddress() {
  const form = document.querySelector("form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    let cep = getCep();
    let address;

    try {
      address = await getAddress(cep);
    } catch (e) {
      address = null;
    }
    writeAddress(address);
  });
}

getCEPAddress();
