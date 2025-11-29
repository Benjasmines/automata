export default function Result({ resultado, error, modo }) {
  if (!resultado && !error) return null;

  return (
    <div className="rounded-sm border-gray-400 border p-3 mt-4">
      {error && (
        <p className="text-red-500">
          <b>Error:</b> {error}
        </p>
      )}

      {resultado && (
        <p>
          <b>{modo === "cifrar" ? "Cadena cifrada:" : "Cadena descifrada:"}</b>{" "}
          {resultado}
        </p>
      )}
    </div>
  );
}
