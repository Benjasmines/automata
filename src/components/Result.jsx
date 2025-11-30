export default function Result({ resultado, error }) {
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
          <b>{"Cadena descifrada:"}</b> {resultado}
        </p>
      )}
    </div>
  );
}
