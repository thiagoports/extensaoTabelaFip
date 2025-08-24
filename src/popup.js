const tipoEl = document.getElementById("tipo");
const marcaEl = document.getElementById("marca");
const modeloEl = document.getElementById("modelo");
const anoEl = document.getElementById("ano");
const resultadoEl = document.getElementById("resultado");
const btnBuscar = document.getElementById("buscar");

// Carrega marcas ao trocar o tipo
tipoEl.addEventListener("change", carregarMarcas);

async function carregarMarcas() {
  marcaEl.innerHTML = "<option>Carregando...</option>";
  modeloEl.innerHTML = "";
  anoEl.innerHTML = "";
  resultadoEl.innerHTML = "";

  const url = `https://parallelum.com.br/fipe/api/v1/${tipoEl.value}/marcas`;
  const res = await fetch(url);
  const marcas = await res.json();

  marcaEl.innerHTML = "<option value=''>Selecione</option>";
  marcas.forEach((m) => {
    marcaEl.innerHTML += `<option value="${m.codigo}">${m.nome}</option>`;
  });
}

// Carrega modelos quando escolhe a marca
marcaEl.addEventListener("change", async () => {
  modeloEl.innerHTML = "<option>Carregando...</option>";
  anoEl.innerHTML = "";
  resultadoEl.innerHTML = "";

  const url = `https://parallelum.com.br/fipe/api/v1/${tipoEl.value}/marcas/${marcaEl.value}/modelos`;
  const res = await fetch(url);
  const data = await res.json();

  modeloEl.innerHTML = "<option value=''>Selecione</option>";
  data.modelos.forEach((m) => {
    modeloEl.innerHTML += `<option value="${m.codigo}">${m.nome}</option>`;
  });
});

// Carrega anos quando escolhe o modelo
modeloEl.addEventListener("change", async () => {
  anoEl.innerHTML = "<option>Carregando...</option>";
  resultadoEl.innerHTML = "";

  const url = `https://parallelum.com.br/fipe/api/v1/${tipoEl.value}/marcas/${marcaEl.value}/modelos/${modeloEl.value}/anos`;
  const res = await fetch(url);
  const anos = await res.json();

  anoEl.innerHTML = "<option value=''>Selecione</option>";
  anos.forEach((a) => {
    anoEl.innerHTML += `<option value="${a.codigo}">${a.nome}</option>`;
  });
});

// Consulta valor final
btnBuscar.addEventListener("click", async () => {
  if (!marcaEl.value || !modeloEl.value || !anoEl.value) {
    return alert("Selecione todos os campos!");
  }

  resultadoEl.innerHTML = "Consultando...";

  const url = `https://parallelum.com.br/fipe/api/v1/${tipoEl.value}/marcas/${marcaEl.value}/modelos/${modeloEl.value}/anos/${anoEl.value}`;
  const res = await fetch(url);
  const valor = await res.json();

  resultadoEl.innerHTML = `
    <p><strong>Marca:</strong> ${valor.Marca}</p>
    <p><strong>Modelo:</strong> ${valor.Modelo}</p>
    <p><strong>Ano:</strong> ${valor.AnoModelo}</p>
    <p><strong>Valor FIPE:</strong> ${valor.Valor}</p>
  `;
});

// Inicia com Carros já carregado
carregarMarcas();
