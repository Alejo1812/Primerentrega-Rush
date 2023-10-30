let cuentaPersonal = {
  montoInicial: 0,
  gastos: [],
  agregarGasto: function (nombre, cantidad) {
    this.gastos.push({ nombre, cantidad });
  },
  calcularSaldo: function () {
    const totalGastos = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
    return this.montoInicial - totalGastos;
  },
};

function iniciarSimulador() {
  cuentaPersonal.montoInicial = parseFloat(document.getElementById("montoInicial").value);

  if (isNaN(cuentaPersonal.montoInicial)) {
    alert("Por favor, ingrese un monto inicial válido.");
  }
}

function agregarGasto() {
  const nombreGasto = document.getElementById("nombreGasto").value;
  const cantidadGasto = parseFloat(document.getElementById("cantidadGasto").value);

  if (!validarNombre(nombreGasto)) {
    alert("Nombre de gasto inválido. Por favor, evita caracteres especiales.");
    return;
  }

  if (!validarCantidad(cantidadGasto)) {
    alert("Cantidad de gasto inválida. Por favor, ingresa un número válido.");
    return;
  }

  cuentaPersonal.agregarGasto(nombreGasto, cantidadGasto);
  mostrarResumen();
}

function mostrarResumen() {
  document.getElementById("montoInicialResumen").textContent = `Monto Inicial: $${cuentaPersonal.montoInicial}`;
  document.getElementById("saldoResumen").textContent = `Saldo Restante: $${cuentaPersonal.calcularSaldo()}`;

  if (cuentaPersonal.calcularSaldo() <= 0) {
    document.getElementById("mensajeFinal").textContent = "¡Saldo Agotado!";
  } else {
    document.getElementById("mensajeFinal").textContent = "";
  }

  mostrarGastosOrdenados();
}

function mostrarGastosOrdenados() {
  const gastosOrdenados = cuentaPersonal.gastos.slice().sort((a, b) => b.cantidad - a.cantidad);
  const gastosDiv = document.getElementById("gastosResumen");
  gastosDiv.innerHTML = "";

  gastosOrdenados.forEach(gasto => {
    const gastoElement = document.createElement("p");
    gastoElement.textContent = `${gasto.nombre}: $${gasto.cantidad}`;
    gastosDiv.appendChild(gastoElement);
  });
}

function guardarEnLocalStorage() {
  localStorage.setItem("cuentaPersonal", JSON.stringify(cuentaPersonal));
}

function cargarDesdeLocalStorage() {
  const cuentaGuardada = localStorage.getItem("cuentaPersonal");
  if (cuentaGuardada) {
    const cuentaGuardadaJSON = JSON.parse(cuentaGuardada);
    cuentaPersonal.montoInicial = cuentaGuardadaJSON.montoInicial;
    cuentaPersonal.gastos = cuentaGuardadaJSON.gastos;
    mostrarResumen();
  }
}

function validarNombre(nombre) {
  const regex = /^[a-zA-Z0-9\s.,-]+$/;
  return regex.test(nombre);
}

function validarCantidad(cantidad) {
  const regex = /^\d*\.?\d*$/;
  return regex.test(cantidad);
}

document.getElementById("iniciarSimulador").addEventListener("click", iniciarSimulador);
document.getElementById("agregarGasto").addEventListener("click", agregarGasto);

// Cargar los datos al iniciar la aplicación
cargarDesdeLocalStorage();
