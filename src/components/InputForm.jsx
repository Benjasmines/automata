import { useState } from "react";

export default function InputForm({ onDescifrar }) {
  const [cadenaDescifrar, setCadenaDescifrar] = useState("");

  return (
    <div>
      <h3 className="text-base">Cadena a descifrar :</h3>

      <input
        value={cadenaDescifrar}
        onChange={(e) => setCadenaDescifrar(e.target.value)}
        placeholder=""
        className="mb-3 mt-1 bg-gray-50 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none ring-2 ring-blue-100/0 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
      />

      <button
        onClick={() => onDescifrar(cadenaDescifrar)}
        className="mt-1 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 active:brightness-90 active:translate-y-[2px]"
      >
        Descifrar
      </button>
    </div>
  );
}
