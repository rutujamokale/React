import { useState } from "react";

type Runtime = "JVM" | "Node.js" | "Python" | "";
type Language = "Java" | "JS" | "Python" | "";
type Layer = "Frontend" | "Backend" | "Database" | "";

interface Technology {
  id: number;
  runtime: Runtime;
  language: Language;
  layer: Layer;
  technology: string;
}

// Mock existing technologies — replace with your actual data source
const MOCK_TECHNOLOGIES: Technology[] = [
  { id: 1, runtime: "Node.js", language: "JS", layer: "Frontend", technology: "React" },
  { id: 2, runtime: "JVM", language: "Java", layer: "Backend", technology: "Spring Boot" },
  { id: 3, runtime: "Python", language: "Python", layer: "Database", technology: "SQLAlchemy" },
  { id: 4, runtime: "Node.js", language: "JS", layer: "Backend", technology: "Express" },
];

export default function DeleteTechnology() {
  const [technologies, setTechnologies] = useState<Technology[]>(MOCK_TECHNOLOGIES);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [shake, setShake] = useState(false);
  const [deleted, setDeleted] = useState<string | null>(null);

  const selectedTech = technologies.find((t) => t.id === selectedId);

  const handleSelect = (id: number) => {
    setSelectedId(id);
    setConfirmDelete(false);
    setDeleted(null);
  };

  const handleDeleteClick = () => {
    if (selectedId === null) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setConfirmDelete(true);
  };

  const handleConfirm = () => {
    if (!selectedTech) return;
    const name = selectedTech.technology;
    setTechnologies((prev) => prev.filter((t) => t.id !== selectedId));
    setSelectedId(null);
    setConfirmDelete(false);
    setDeleted(name);
    setTimeout(() => setDeleted(null), 2500);
  };

  const handleCancel = () => {
    setSelectedId(null);
    setConfirmDelete(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-mono">
      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative w-full max-w-xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-2 h-8 bg-rose-500 rounded-full" />
          <h1 className="text-2xl font-bold text-white tracking-widest uppercase">
            Delete Technology
          </h1>
        </div>

        {/* Deleted success message */}
        {deleted && (
          <div className="mb-5 px-4 py-3 bg-emerald-400/10 border border-emerald-400/30 rounded-xl text-emerald-400 text-xs tracking-widest uppercase text-center">
            ✓ "{deleted}" deleted successfully
          </div>
        )}

        {/* Technologies list */}
        {technologies.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">
            <p className="text-slate-600 text-xs uppercase tracking-widest">
              No technologies available
            </p>
          </div>
        ) : (
          <div className="mb-5">
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">
              Select Technology to Delete
            </p>
            <div className="flex flex-col gap-2">
              {technologies.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer transition-all border ${
                    selectedId === item.id
                      ? "bg-rose-500/10 border-rose-500 shadow-lg shadow-rose-500/10"
                      : "bg-slate-900 border-slate-800 hover:border-slate-600"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        selectedId === item.id ? "bg-rose-500" : "bg-slate-600"
                      }`}
                    />
                    <span
                      className={`font-bold text-sm ${
                        selectedId === item.id ? "text-rose-400" : "text-slate-300"
                      }`}
                    >
                      {item.technology}
                    </span>
                  </div>
                  <div className="flex gap-2 text-xs text-slate-500">
                    <span className="bg-slate-800 px-2 py-0.5 rounded">{item.runtime}</span>
                    <span className="bg-slate-800 px-2 py-0.5 rounded">{item.language}</span>
                    <span className="bg-slate-800 px-2 py-0.5 rounded">{item.layer}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Card */}
        <div
          className={`bg-slate-900 border rounded-2xl p-6 shadow-2xl transition-all duration-150 ${
            selectedId !== null ? "border-slate-700" : "border-slate-800 opacity-60"
          }`}
          style={shake ? { animation: "shake 0.4s ease" } : {}}
        >
          {/* No selection hint */}
          {selectedId === null && !confirmDelete && (
            <p className="text-center text-slate-600 text-xs tracking-widest uppercase mb-4">
              ↑ Select a technology above to delete
            </p>
          )}

          {/* Selected technology preview */}
          {selectedTech && !confirmDelete && (
            <div className="mb-6 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span className="text-rose-400 font-bold text-sm">
                  {selectedTech.technology}
                </span>
              </div>
              <div className="flex gap-2 text-xs text-slate-500">
                <span className="bg-slate-900 px-2 py-0.5 rounded">{selectedTech.runtime}</span>
                <span className="bg-slate-900 px-2 py-0.5 rounded">{selectedTech.language}</span>
                <span className="bg-slate-900 px-2 py-0.5 rounded">{selectedTech.layer}</span>
              </div>
            </div>
          )}

          {/* Confirm delete warning */}
          {confirmDelete && selectedTech && (
            <div className="mb-6 px-4 py-4 bg-rose-500/10 border border-rose-500/40 rounded-xl text-center">
              <p className="text-rose-400 text-xs uppercase tracking-widest mb-1">
                ⚠ Confirm Deletion
              </p>
              <p className="text-slate-300 text-sm mt-2">
                Are you sure you want to delete{" "}
                <span className="text-rose-400 font-bold">
                  {selectedTech.technology}
                </span>
                ? This action cannot be undone.
              </p>
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-slate-700 my-5" />

          {/* Buttons */}
          {!confirmDelete ? (
            <div className="flex gap-3">
              <button
                onClick={handleDeleteClick}
                disabled={selectedId === null}
                className="flex-1 bg-rose-500 hover:bg-rose-400 text-white font-bold text-sm py-2.5 rounded-lg tracking-widest uppercase transition-all active:scale-95 shadow-lg shadow-rose-500/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-rose-500 disabled:active:scale-100"
              >
                DELETE
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-transparent border border-slate-600 hover:border-slate-400 text-slate-400 hover:text-slate-200 font-bold text-sm py-2.5 rounded-lg tracking-widest uppercase transition-all active:scale-95"
              >
                CANCEL
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleConfirm}
                className="flex-1 bg-rose-500 hover:bg-rose-400 text-white font-bold text-sm py-2.5 rounded-lg tracking-widest uppercase transition-all active:scale-95 shadow-lg shadow-rose-500/20"
              >
                YES, DELETE
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="flex-1 bg-transparent border border-slate-600 hover:border-slate-400 text-slate-400 hover:text-slate-200 font-bold text-sm py-2.5 rounded-lg tracking-widest uppercase transition-all active:scale-95"
              >
                GO BACK
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}
