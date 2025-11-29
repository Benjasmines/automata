// AFD para el lenguaje: 1–2 dígitos + al menos 1 letra (incluye ñ)

export function validarEntrada(cadena) {
  if (!cadena || cadena.length < 2) return false;

  const esDigito = (c) => c >= "0" && c <= "9";
  const esLetra = (c) =>
    (c >= "a" && c <= "z") || c === "ñ";

  let estado = "q0";

  for (let c of cadena) {
    switch (estado) {
      case "q0":
        if (esDigito(c)) estado = "q1";
        else return false;
        break;

      case "q1":
        if (esDigito(c)) estado = "q2";
        else if (esLetra(c)) estado = "q3";
        else return false;
        break;

      case "q2":
        if (esLetra(c)) estado = "q3";
        else return false; // no más de 2 dígitos
        break;

      case "q3":
        if (esLetra(c)) estado = "q3";
        else return false;
        break;

      default:
        return false;
    }
  }

  return estado === "q3";
}
