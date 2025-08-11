// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
// app.js

const amigos = [];

const aEl = (sel) => document.querySelector(sel);

function limpiarEspacios(str) {
  return str.trim().replace(/\s+/g, " ");
}

function aTitulo(str) {
  return limpiarEspacios(str)
    .toLowerCase()
    .replace(/\b\p{L}/gu, (c) => c.toUpperCase());
}

function canon(str) {
  return limpiarEspacios(str)
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

function renderLista() {
  const ul = aEl("#listaAmigos");
  ul.innerHTML = "";

  amigos.forEach((nombre, idx) => {
    const li = document.createElement("li");
    li.className = "name-item";

    const span = document.createElement("span");
    span.textContent = nombre;

    const btn = document.createElement("button");
    btn.textContent = "✕";
    btn.className = "button-remove";
    btn.addEventListener("click", () => eliminarAmigo(idx));

    li.appendChild(span);
    li.appendChild(btn);
    ul.appendChild(li);
  });
}

function anunciar(msg, tipo = "info") {
  const ul = aEl("#resultado");
  ul.innerHTML = "";
  const li = document.createElement("li");
  li.textContent = msg;
  li.className = tipo;
  ul.appendChild(li);
}

function agregarAmigo() {
  const input = aEl("#amigo");
  const valor = input.value;

  if (!valor || !limpiarEspacios(valor)) {
    anunciar("Escribe un nombre válido.", "error");
    return;
  }

  const normal = aTitulo(valor);
  const clave = canon(valor);

  if (amigos.some((n) => canon(n) === clave)) {
    anunciar(`"${normal}" ya está en la lista.`, "error");
    return;
  }

  amigos.push(normal);
  renderLista();
  anunciar(`Agregado: ${normal}`, "ok");
  input.value = "";
}

function eliminarAmigo(idx) {
  amigos.splice(idx, 1);
  renderLista();
}

function sortearAmigo() {
  if (amigos.length < 1) {
    anunciar("Agrega al menos un amigo para sortear.", "error");
    return;
  }
  
  const aleatorio = amigos[Math.floor(Math.random() * amigos.length)];
  anunciar(`Tu amigo secreto es: ${aleatorio}`, "ok");
}

document.addEventListener("DOMContentLoaded", () => {
  const input = aEl("#amigo");
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      agregarAmigo();
    }
  });

  renderLista();
});

window.agregarAmigo = agregarAmigo;
window.sortearAmigo = sortearAmigo;
