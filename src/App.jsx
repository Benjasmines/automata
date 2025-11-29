import { useState } from "react";
import InputForm from "./components/InputForm";
import Result from "./components/Result";
import { validarEntrada } from "./automata/afd";
import { descifrarConMT, cifrarConMT } from "./automata/turing";

function App() {
  const [resultado, setResultado] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [modo, setModo] = useState(null);

  function manejarDescifrado(cadenaOriginal) {
    setModo("descifrar");
    setResultado("");
    setMensajeError("");

    if (!cadenaOriginal || cadenaOriginal.trim() === "") {
      setMensajeError("Ingresa una cadena para descifrar.");
      return;
    }

    const cadena = cadenaOriginal.trim().toLowerCase();

    // Acepta: 1–2 dígitos + letras (incluye ñ) + espacios
    const match = cadena.match(/^(\d{1,2})\s*([a-zñ\s]+)$/i);
    if (!match) {
      setMensajeError(
        "Formato inválido. Debe ser: 1–2 dígitos seguidos de texto con letras minúsculas, ñ y espacios."
      );
      return;
    }

    const numero = match[1];
    const texto = match[2];

    // El AFD NO acepta espacios → los eliminamos solo para validarlo
    const cadenaValidacion = numero + texto.replace(/\s+/g, "");

    if (!validarEntrada(cadenaValidacion)) {
      setMensajeError(
        "La cadena no pertenece al lenguaje ([0-9]{1,2}[letras])."
      );
      return;
    }

    const resultadoDescifrado = descifrarConMT(cadena);
    setResultado(resultadoDescifrado);
  }

  function manejarCifrado(textoOriginal, numeroOriginal) {
    setModo("cifrar");
    setResultado("");
    setMensajeError("");

    if (!textoOriginal || textoOriginal.trim() === "") {
      setMensajeError("Ingresa un texto para cifrar.");
      return;
    }

    const texto = textoOriginal.trim().toLowerCase();
    const numero = parseInt(numeroOriginal, 10);

    if (isNaN(numero) || numero < 1 || numero > 99) {
      setMensajeError("El número debe ser un entero entre 1 y 99.");
      return;
    }

    if (!/^[a-zñ\s]+$/.test(texto)) {
      setMensajeError(
        "El texto a cifrar solo puede contener letras minúsculas, ñ y espacios."
      );
      return;
    }

    const cadenaCifrada = cifrarConMT(texto, numero);
    setResultado(cadenaCifrada);
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Simulador de Cifrado César con AFD + Máquina de Turing</h1>
      <InputForm onDescifrar={manejarDescifrado} onCifrar={manejarCifrado} />
      <Result resultado={resultado} error={mensajeError} modo={modo} />
    </div>
  );
}

export default App;
