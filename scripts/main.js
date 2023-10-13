let cuentaPersonal = {
    montoInicial: 0,
    gastos: [],
    agregarGasto: function (nombre, cantidad) {
      const gastoExistente = this.gastos.find(gasto => gasto.nombre === nombre);
  
      if (gastoExistente) {
        gastoExistente.cantidad += cantidad;
        gastoExistente.fecha = obtenerFechaActual();
      } else {
        this.gastos.push({ nombre, cantidad, fecha: obtenerFechaActual() });
      }
    },
    eliminarGasto: function (nombre) {
      this.gastos = this.gastos.filter(gasto => gasto.nombre !== nombre);
    },
    calcularSaldo: function () {
      const totalGastos = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
      return this.montoInicial - totalGastos;
    },
    reiniciar: function () {
      this.montoInicial = 0;
      this.gastos = [];
    },
  };
  
  function obtenerFechaActual() {
    const fecha = new Date();
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return fecha.toLocaleDateString('es-ES', options);
  }
  
  function iniciarSimulador() {
    cuentaPersonal.montoInicial = parseFloat(document.getElementById("montoInicial").value);
  
    if (isNaN(cuentaPersonal.montoInicial)) {
      alert("Por favor, ingrese un monto inicial válido.");
    } else {
      localStorage.setItem("cuentaPersonal", JSON.stringify(cuentaPersonal));
      mostrarResumen();
    }
  }
  
  function agregarGasto() {
    const nombreGasto = document.getElementById("nombreGasto").value;
    const cantidadGasto = parseFloat(document.getElementById("cantidadGasto").value);
  
    if (isNaN(cantidadGasto)) {
      alert("Por favor, ingrese una cantidad válida.");
    } else {
      cuentaPersonal.agregarGasto(nombreGasto, cantidadGasto);
      localStorage.setItem("cuentaPersonal", JSON.stringify(cuentaPersonal));
      mostrarResumen();
    }
  }
  
  function eliminarGasto(nombreGasto) {
    cuentaPersonal.eliminarGasto(nombreGasto);
    localStorage.setItem("cuentaPersonal", JSON.stringify(cuentaPersonal));
    mostrarResumen();
  }
  
  function reiniciarSimulador() {
    cuentaPersonal.reiniciar();
    localStorage.removeItem("cuentaPersonal");
    limpiarFormulario();
    mostrarResumen();
  }
  
  function limpiarFormulario() {
    document.getElementById("montoInicial").value = "";
    document.getElementById("nombreGasto").value = "";
    document.getElementById("cantidadGasto").value = "";
  }
  
  function mostrarResumen() {
    const montoInicialResumen = document.getElementById("montoInicialResumen");
    const gastosResumen = document.getElementById("gastosResumen");
    const saldoResumen = document.getElementById("saldoResumen");
    const mensajeFinal = document.getElementById("mensajeFinal");
  
    montoInicialResumen.textContent = `Monto inicial: ${cuentaPersonal.montoInicial}`;
    gastosResumen.innerHTML = "Gastos:<br>" +
      (cuentaPersonal.gastos.length === 0 ? "No se registraron gastos." :
        cuentaPersonal.gastos.map(gasto =>
          `${gasto.nombre}: ${gasto.cantidad} (${gasto.fecha})
          <button onclick="eliminarGasto('${gasto.nombre}')">Eliminar</button>`
        ).join('<br>'));
  
    saldoResumen.textContent = `Saldo restante: ${cuentaPersonal.calcularSaldo()}`;
  
    if (cuentaPersonal.calcularSaldo() <= 0) {
      mensajeFinal.textContent = "¡Se ha agotado el dinero! No puedes agregar más gastos.";
    } else {
      mensajeFinal.textContent = "";
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const storedCuenta = localStorage.getItem("cuentaPersonal");
  
    if (storedCuenta) {
      cuentaPersonal = JSON.parse(storedCuenta);
      mostrarResumen();
    }
  });
  