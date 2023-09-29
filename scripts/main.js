// Objeto que representa la cuenta personal
const cuentaPersonal = {
    montoInicial: 0,
    gastos: [],
    agregarGasto: function (nombre, cantidad) {
      // Buscar si ya existe un gasto con el mismo nombre
      const gastoExistente = this.gastos.find(gasto => gasto.nombre === nombre);
  
      if (gastoExistente) {
        // Si existe, actualizar la cantidad
        gastoExistente.cantidad += cantidad;
      } else {
        // Si no existe, agregar un nuevo gasto
        this.gastos.push({ nombre, cantidad });
      }
    },
    calcularSaldo: function () {
      const totalGastos = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
      return this.montoInicial - totalGastos;
    },
  };
  
  // Función para establecer el monto inicial
  function establecerMontoInicial() {
    cuentaPersonal.montoInicial = parseFloat(prompt("Ingrese el monto inicial de la cuenta:"));
  
    if (isNaN(cuentaPersonal.montoInicial)) {
      console.log("Por favor, ingrese un monto inicial válido.");
      establecerMontoInicial();
    }
  }
  
  // Función para agregar gastos hasta que no haya más dinero
  function simularCuenta() {
    while (true) {
      let nombreGasto = prompt("Ingrese el nombre del gasto:");
      let cantidadGasto = parseFloat(prompt("Ingrese la cantidad del gasto:"));
  
      if (isNaN(cantidadGasto)) {
        console.log("Por favor, ingrese una cantidad válida.");
        continue;
      }
  
      cuentaPersonal.agregarGasto(nombreGasto, cantidadGasto);
      console.log(`Gasto de ${cantidadGasto} registrado para ${nombreGasto}.`);
  
      const respuesta = prompt("¿Quiere agregar otro gasto? (Ingrese 'si' para sí, cualquier otra tecla para no)");
  
      if (respuesta.toLowerCase() !== 'si') {
        break;
      }
    }
  
    mostrarResumen();
  }
  
  // Función para mostrar un resumen de la cuenta
  function mostrarResumen() {
    console.log("Resumen de la cuenta:");
    console.log(`Monto inicial: ${cuentaPersonal.montoInicial}`);
    console.log("Gastos:");
  
    if (cuentaPersonal.gastos.length === 0) {
      console.log("No se registraron gastos.");
    } else {
      cuentaPersonal.gastos.forEach((gasto) => {
        console.log(`${gasto.nombre}: ${gasto.cantidad}`);
      });
    }
  
    console.log(`Saldo restante: ${cuentaPersonal.calcularSaldo()}`);
  
    if (cuentaPersonal.calcularSaldo() <= 0) {
      console.log("¡Se ha agotado el dinero! No puedes agregar más gastos.");
    }
  }
  
  // Iniciar la simulación
  establecerMontoInicial();
  simularCuenta();
  