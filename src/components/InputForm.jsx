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
        <div className="">
          <h3 className="text-base">Cadena a descifrar :</h3>
          <input
            value={cadenaDescifrar}
            onChange={(e) => setCadenaDescifrar(e.target.value)}
            placeholder="Ej: 15pjidbpiph ad btydg"
            className="mb-3 mt-1 bg-gray-50 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none ring-2 ring-blue-100/0 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <button
            onClick={() => onDescifrar(cadenaDescifrar)}
            className="mt-1 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 active:brightness-90 active:translate-y-[2px]"
          >
            Descifrar
          </button>
        </div>
      ) : (
        <div>
          <h3>Texto a cifrar</h3>
          <input
            value={textoCifrar}
            onChange={(e) => setTextoCifrar(e.target.value)}
            placeholder="Ej: automatas lo mejor"
            className="mb-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <h3>Cantidad de letras a retroceder</h3>
          <input
            type="number"
            value={numeroCifrar}
            onChange={(e) => setNumeroCifrar(e.target.value)}
            placeholder="Número 1–99"
            className=" flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <button
            onClick={() => onCifrar(textoCifrar, numeroCifrar)}
            className="mt-6 cursor-pointer bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 active:brightness-90 active:translate-y-[2px]"
          >
            Cifrar
          </button>
        </div>
      )}
    </div>
  );
}
