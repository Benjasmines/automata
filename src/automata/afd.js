// ===========================================================
// Autómata Finito Determinista (AFD)
// Lenguaje de entrada del problema:
//
//   L_in = [0-9]{1,2}[a-zñ]+
//
// Es decir: 1 o 2 dígitos seguidos de una o más letras minúsculas
// (sin espacios, porque en App.jsx se eliminan antes de validar).
// ===========================================================

function esDigito(caracter) {
  return caracter >= "0" && caracter <= "9";
}

function esLetra(caracter) {
  return /[a-zñ]/.test(caracter);
}

/**
 * Simula el AFD con los siguientes estados:
 *
 *  - q0 : estado inicial, aún no he leído nada.
 *  - q1 : ya leí 1 dígito.
 *  - q2 : ya leí 2 dígitos.
 *  - qf : estoy en la parte de letras (zona de aceptación).
 *
 * Estado de aceptación: qf
 */
export function validarEntrada(cadena) {
  let estado = "q0";

  for (const c of cadena) {
    switch (estado) {
      case "q0":
        if (esDigito(c)) {
          estado = "q1";
        } else {
          return false;
        }
        break;

      case "q1":
        if (esDigito(c)) {
          // Segundo dígito
          estado = "q2";
        } else if (esLetra(c)) {
          // Comenzó la zona de letras
          estado = "qf";
        } else {
          return false;
        }
        break;

      case "q2":
        if (esLetra(c)) {
          estado = "qf";
        } else {
          return false;
        }
        break;

      case "qf":
        if (esLetra(c)) {
          // Seguimos leyendo letras
          estado = "qf";
        } else {
          return false;
        }
        break;

      default:
        return false;
    }
  }

  // Cadena válida solo si terminamos en la zona de letras
  return estado === "qf";
}
