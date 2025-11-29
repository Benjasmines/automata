export default function Result({ resultado, error, modo }) {
  if (!resultado && !error) return null;

  return (
    <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
      {error && <p style={{ color: "red" }}><b>Error:</b> {error}</p>}

      {resultado && (
        <p>
          <b>{modo === "cifrar" ? "Cadena cifrada:" : "Cadena descifrada:"}</b>{" "}
          {resultado}
        </p>
      )}
    </div>
  );
}
