import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * users = array de objetos con los datos
 * columns = array de objetos: { header: "Nombre en PDF", key: "propiedadDelObjeto" }
 */
export default function DownloadPDFButton({ data = [], columns = [], fileName = "archivo.pdf" }) {
  const handleDownload = () => {
    if (!data.length || !columns.length) return alert("No hay datos o columnas definidas");

    const doc = new jsPDF();

    const headers = [columns.map(c => c.header)]; // cabeceras
    const rows = data.map(row => columns.map(c => row[c.key] ?? "—")); // filas

    autoTable(doc, {
      head: headers,
      body: rows,
      theme: "striped",
      headStyles: { fillColor: [81, 209, 246] },
      styles: { fontSize: 10 },
    });

    doc.save(fileName);
  };

  return (
    <button
      onClick={handleDownload}
      className="mt-2 rounded-md px-4 py-2 bg-[#51d1f6] text-white font-semibold hover:bg-[#3dbee0] transition"
    >
      Descargar PDF
    </button>
  );
}