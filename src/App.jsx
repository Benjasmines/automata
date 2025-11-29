import { useState } from "react";
import InputForm from "./components/InputForm";
import Result from "./components/Result";
import { validarEntrada } from "./automata/afd";
import { descifrarConMT, cifrarConMT } from "./automata/turing";
import "./index.css";

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
    <>
      <div className="bg-white min-h-screen place-content-center justify-self-center">
        <div className="border-2 border-black rounded shadow-lg py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-1">
              Simulador de Cifrado César con AFD
            </h1>
            <h1 className="text-2xl font-bold mb-5">+ Máquina de Turing</h1>
          </div>
          <InputForm
            onDescifrar={manejarDescifrado}
            onCifrar={manejarCifrado}
          />
          <Result resultado={resultado} error={mensajeError} modo={modo} />
        </div>
      </div>
    </>
  );
}

export default App;
