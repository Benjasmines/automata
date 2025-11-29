// Alfabeto usado en español tradicional
const alfabeto = "abcdefghijklmnñopqrstuvwxyz";

// DESCIFRAR: entrada tipo "15pjidbpiph ad btydg"
export function descifrarConMT(cadena) {
  cadena = cadena.trim();

  const match = cadena.match(/^(\d{1,2})\s*([a-zñ\s]+)$/i);
  if (!match) return "";

  const numero = parseInt(match[1], 10);
  const texto = match[2].toLowerCase();

  const chars = texto.split("");

  const pasos = numero % alfabeto.length;

  for (let p = 0; p < pasos; p++) {
    for (let i = 0; i < chars.length; i++) {
      const c = chars[i];

      if (c === " ") continue;

      const idx = alfabeto.indexOf(c);
      if (idx === -1) continue;

      const nuevo = (idx - 1 + alfabeto.length) % alfabeto.length;
      chars[i] = alfabeto[nuevo];
    }
  }

  return chars.join("");
}

// CIFRAR: entrada texto normal + número → "ntextoCifrado"
export function cifrarConMT(texto, numero) {
  const chars = texto.toLowerCase().split("");
  const pasos = numero % alfabeto.length;

  for (let p = 0; p < pasos; p++) {
    for (let i = 0; i < chars.length; i++) {
      const c = chars[i];

      if (c === " ") continue;
      const idx = alfabeto.indexOf(c);
      if (idx === -1) continue;

      const nuevo = (idx + 1) % alfabeto.length;
      chars[i] = alfabeto[nuevo];
    }
  }

  return `${numero}${chars.join("")}`;
}
