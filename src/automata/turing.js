// ===========================================================
// Máquina de Turing traductora para el cifrado César
//
// Simulación a alto nivel de la MT del enunciado:
//
//  - Lenguaje de entrada  : [0-9]{1,2}[a-zñ]+ (con espacios en el texto)
//  - Lenguaje de salida   : #{1,2}[a-zñ]+
//        (los dígitos se reemplazan por '#', la palabra queda descifrada)
//
//  - Procedimiento (igual a la MT):
//      Mientras k > 0:
//        • "Resta 1" al número de cifrado.
//        • Recorre la palabra completa y resta 1 a cada letra del alfabeto.
// ===========================================================

const ALFABETO = "abcdefghijklmnopqrstuvwxyz";

/**
 * descifrarConMT
 * @param {string} cadena Cadena de entrada, por ejemplo: "3 zgnqh"
 * @returns {string} Cadena de salida, por ejemplo: "##hola"
 */
export function descifrarConMT(cadena) {
  if (!cadena) return "";

  // Limpiamos espacios al principio y al final
  const limpia = cadena.trim().toLowerCase();

  // Separar número (1–2 dígitos) y texto (letras + espacios)
  const coincidencia = limpia.match(/^(\d{1,2})\s*([a-zñ\s]+)$/i);
  if (!coincidencia) {
    // La MT se iría a un estado de rechazo; aquí devolvemos vacío
    return "";
  }

  const numeroComoTexto = coincidencia[1]; // ej: "13"
  let k = parseInt(numeroComoTexto, 10);   // cantidad de desplazamientos
  const textoCifrado = coincidencia[2];

  // Representamos la "cinta" como arreglo de símbolos
  const cinta = textoCifrado.split("");

  // ====== Bucle principal: comportamiento de la MT ======
  // Cada vuelta del while es como una iteración completa de la MT:
  //   - se "resta 1" al número
  //   - se recorre toda la palabra y se resta 1 a cada letra
  while (k > 0) {
    // q1 -> q2: reducir el número de cifrado en 1
    k--;

    // q3: recorrer toda la cinta de izquierda a derecha
    for (let i = 0; i < cinta.length; i++) {
      const simbolo = cinta[i];

      // Los espacios actúan como blancos, no se transforman
      if (simbolo === " ") continue;

      const indice = ALFABETO.indexOf(simbolo);
      if (indice === -1) {
        // Símbolo fuera del alfabeto (por ejemplo, otro carácter), se deja igual
        continue;
      }

      // Restar 1 posición en el alfabeto (con vuelta al inicio)
      const nuevoIndice =
        (indice - 1 + ALFABETO.length) % ALFABETO.length;
      cinta[i] = ALFABETO[nuevoIndice];
    }
    // Conceptualmente la MT vuelve al inicio de la cinta y verifica si k llegó a 0.
  }

  // ====== Estado final (q4) ======
  // Reemplazamos los dígitos de la izquierda por '#'
  const almohadillas = "#".repeat(numeroComoTexto.length);
  const palabraDescifrada = cinta.join("");

  return almohadillas + palabraDescifrada;
}
