import { useState } from "react";

export default function InputForm({ onDescifrar, onCifrar }) {
  const [modo, setModo] = useState("descifrar");
  const [cadenaDescifrar, setCadenaDescifrar] = useState("");
  const [textoCifrar, setTextoCifrar] = useState("");
  const [numeroCifrar, setNumeroCifrar] = useState("");

  return (
    <div>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            value="descifrar"
            checked={modo === "descifrar"}
            onChange={() => setModo("descifrar")}
          />
          Descifrar
        </label>

        <label>
          <input
            type="radio"
            value="cifrar"
            checked={modo === "cifrar"}
            onChange={() => setModo("cifrar")}
          />
          Cifrar
        </label>
      </div>

      {modo === "descifrar" ? (
        <div>
          <h3>Cadena a descifrar</h3>
          <input
            value={cadenaDescifrar}
            onChange={(e) => setCadenaDescifrar(e.target.value)}
            placeholder="Ej: 15pjidbpiph ad btydg"
          />
          <button onClick={() => onDescifrar(cadenaDescifrar)}>Descifrar</button>
        </div>
      ) : (
        <div>
          <h3>Texto a cifrar</h3>
          <input
            value={textoCifrar}
            onChange={(e) => setTextoCifrar(e.target.value)}
            placeholder="Ej: automatas lo mejor"
          />
          <input
            type="number"
            value={numeroCifrar}
            onChange={(e) => setNumeroCifrar(e.target.value)}
            placeholder="Número 1–99"
          />
          <button onClick={() => onCifrar(textoCifrar, numeroCifrar)}>Cifrar</button>
        </div>
      )}
    </div>
  );
}
