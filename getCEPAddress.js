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

function validateCEP(cep) {
  if (cep.length != 8) {
    alert("CEP não encontrado :(");
    return (false);
  }
  return (true);
}

function writeAddress(address) {
if(address.erro)
	return (validateCEP(0));
  document.querySelector("#rua").value = `${address.logradouro}`;
  document.querySelector("#bairro").value = `${address.bairro}`;
  document.querySelector("#cidade").value = `${address.localidade}`;
  document.querySelector("#uf").value = `${address.uf}`;
}

function getCEPAddress() {
  const form = document.querySelector("form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    let cep = getCep();
    let address = null;
    if (!validateCEP(cep)) return 0;
    try {
      address = await getAddress(cep);
    } catch (e) {
      return (false);
    }
    writeAddress(address);
  });
}

getCEPAddress();
