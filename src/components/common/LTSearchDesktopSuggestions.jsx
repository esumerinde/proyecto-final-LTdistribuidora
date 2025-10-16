import React from "react";

// Función para obtener sugerencias relevantes
function getSuggestions(searchTerm, products, max = 7) {
  if (!searchTerm) return [];
  const term = searchTerm.trim().toLowerCase();
  const matches = [];
  products.forEach((p) => {
    const fields = [p.name, p.category, p.brand];
    fields.forEach((field) => {
      if (field) {
        // Coincidencia parcial por palabra
        const words = field.toLowerCase().split(/\s|,|\./);
        if (words.some((w) => w.includes(term))) {
          const suggestion = field;
          if (!matches.includes(suggestion)) {
            matches.push(suggestion);
          }
        }
      }
    });
  });
  return matches.slice(0, max);
}

const LTSearchDesktopSuggestions = ({ searchTerm, products }) => {
  const suggestions = getSuggestions(searchTerm, products);
  return (
    <div className="LTSearchDesktopSuggestionsCol">
      <div className="LTSearchDesktopSuggestionsTitle">SUGERENCIAS</div>
      <ul className="LTSearchDesktopSuggestionsList">
        {suggestions.length === 0 ? (
          <li style={{ fontWeight: "var(--lt-font-weight-light)" }}>
            No hay sugerencias
          </li>
        ) : (
          suggestions.map((s) => {
            // Separar el término buscado y el resto
            const lower = s.toLowerCase();
            const term = searchTerm.trim().toLowerCase();
            const start = lower.indexOf(term);
            if (start === -1) {
              return (
                <li
                  key={s}
                  style={{ fontWeight: "var(--lt-font-weight-light)" }}
                >
                  {s}
                </li>
              );
            }
            const before = s.slice(0, start);
            const match = s.slice(start, start + term.length);
            const after = s.slice(start + term.length);
            return (
              <li key={s}>
                {before}
                <span style={{ fontWeight: "var(--lt-font-weight-medium)" }}>
                  {match}
                </span>
                <span style={{ fontWeight: "var(--lt-font-weight-light)" }}>
                  {after}
                </span>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default LTSearchDesktopSuggestions;
