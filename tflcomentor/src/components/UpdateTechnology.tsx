import { useState } from "react";

type Runtime = "JVM" | "Node.js" | "Python" | "";
type Language = "Java" | "JS" | "Python" | "";
type Layer = "Frontend" | "Backend" | "Database" | "";

interface TechnologyForm {
  runtime: Runtime;
  language: Language;
  layer: Layer;
  technology: string;
}

const RUNTIMES: Runtime[] = ["JVM", "Node.js", "Python"];
const LANGUAGES: Language[] = ["Java", "JS", "Python"];
const LAYERS: Layer[] = ["Frontend", "Backend", "Database"];

// Mock existing technologies to update
const MOCK_TECHNOLOGIES: (TechnologyForm & { id: number })[] = [
  { id: 1, runtime: "Node.js", language: "JS", layer: "Frontend", technology: "React" },
  { id: 2, runtime: "JVM", language: "Java", layer: "Backend", technology: "Spring Boot" },
  { id: 3, runtime: "Python", language: "Python", layer: "Database", technology: "SQLAlchemy" },
];

export default function UpdateTechnology() {
  const [technologies, setTechnologies] = useState(MOCK_TECHNOLOGIES);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [form, setForm] = useState<TechnologyForm>({
    runtime: "",
    language: "",
    layer: "",
    technology: "",
  });
  const [shake, setShake] = useState(false);
  const [updated, setUpdated] = useState(false);

  const handleSelect = (id: number) => {
    const tech = technologies.find((t) => t.id === id);
    if (tech) {
      setSelectedId(id);
      setForm({
        runtime: tech.runtime,
        language: tech.language,
        layer: tech.layer,
        technology: tech.technology,
      });
      setUpdated(false);
    }
  };

  const handleUpdate = () => {
    if (!form.runtime || !form.language || !form.layer || !form.technology.trim()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    if (selectedId === null) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setTechnologies((prev) =>
      prev.map((t) => (t.id === selectedId ? { ...t, ...form } : t))
    );
    setUpdated(true);
    setTimeout(() => setUpdated(false), 2000);
  };

  const handleCancel = () => {
    setForm({ runtime: "", language: "", layer: "", technology: "" });
    setSelectedId(null);
    setUpdated(false);
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
          <div className="w-2 h-8 bg-amber-400 rounded-full" />
          <h1 className="text-2xl font-bold text-white tracking-widest uppercase">
            Update Technology
          </h1>
        </div>

        {/* Select existing technology */}
        <div className="mb-5">
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">
            Select Technology to Update
          </p>
          <div className="flex flex-col gap-2">
            {technologies.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer transition-all border ${
                  selectedId === item.id
                    ? "bg-amber-400/10 border-amber-400 shadow-lg shadow-amber-400/10"
                    : "bg-slate-900 border-slate-800 hover:border-slate-600"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      selectedId === item.id ? "bg-amber-400" : "bg-slate-600"
                    }`}
                  />
                  <span
                    className={`font-bold text-sm ${
                      selectedId === item.id ? "text-amber-400" : "text-slate-300"
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

        {/* Card */}
        <div
          className={`bg-slate-900 border rounded-2xl p-6 shadow-2xl transition-all duration-150 ${
            selectedId !== null ? "border-slate-700" : "border-slate-800 opacity-60"
          }`}
          style={shake ? { animation: "shake 0.4s ease" } : {}}
        >
          {/* No selection hint */}
          {selectedId === null && (
            <p className="text-center text-slate-600 text-xs tracking-widest uppercase mb-4">
              ↑ Select a technology above to edit
            </p>
          )}

          {/* Dropdowns row */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {/* Runtime */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-slate-400 uppercase tracking-widest">
                Runtime
              </label>
              <div className="relative">
                <select
                  value={form.runtime}
                  disabled={selectedId === null}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, runtime: e.target.value as Runtime }))
                  }
                  className="w-full appearance-none bg-slate-800 border border-slate-600 text-white text-sm rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-amber-400 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <option value="">Select</option>
                  {RUNTIMES.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                  ▼
                </span>
              </div>
              <div className="flex flex-col gap-1 mt-1">
                {RUNTIMES.map((r) => (
                  <span
                    key={r}
                    onClick={() => selectedId !== null && setForm((f) => ({ ...f, runtime: r }))}
                    className={`text-xs px-2 py-1 rounded transition-all ${
                      selectedId === null
                        ? "text-slate-700 cursor-not-allowed"
                        : form.runtime === r
                        ? "bg-amber-400 text-slate-900 font-bold cursor-pointer"
                        : "text-slate-500 hover:text-slate-300 cursor-pointer"
                    }`}
                  >
                    {form.runtime === r ? "• " : "  "}
                    {r}
                  </span>
                ))}
              </div>
            </div>

            {/* Language */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-slate-400 uppercase tracking-widest">
                Language
              </label>
              <div className="relative">
                <select
                  value={form.language}
                  disabled={selectedId === null}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, language: e.target.value as Language }))
                  }
                  className="w-full appearance-none bg-slate-800 border border-slate-600 text-white text-sm rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-amber-400 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <option value="">Select</option>
                  {LANGUAGES.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                  ▼
                </span>
              </div>
              <div className="flex flex-col gap-1 mt-1">
                {LANGUAGES.map((l) => (
                  <span
                    key={l}
                    onClick={() => selectedId !== null && setForm((f) => ({ ...f, language: l }))}
                    className={`text-xs px-2 py-1 rounded transition-all ${
                      selectedId === null
                        ? "text-slate-700 cursor-not-allowed"
                        : form.language === l
                        ? "bg-amber-400 text-slate-900 font-bold cursor-pointer"
                        : "text-slate-500 hover:text-slate-300 cursor-pointer"
                    }`}
                  >
                    {form.language === l ? "• " : "  "}
                    {l}
                  </span>
                ))}
              </div>
            </div>

            {/* Layer */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-slate-400 uppercase tracking-widest">
                Layer
              </label>
              <div className="relative">
                <select
                  value={form.layer}
                  disabled={selectedId === null}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, layer: e.target.value as Layer }))
                  }
                  className="w-full appearance-none bg-slate-800 border border-slate-600 text-white text-sm rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-amber-400 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <option value="">Select</option>
                  {LAYERS.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                  ▼
                </span>
              </div>
              <div className="flex flex-col gap-1 mt-1">
                {LAYERS.map((l) => (
                  <span
                    key={l}
                    onClick={() => selectedId !== null && setForm((f) => ({ ...f, layer: l }))}
                    className={`text-xs px-2 py-1 rounded transition-all ${
                      selectedId === null
                        ? "text-slate-700 cursor-not-allowed"
                        : form.layer === l
                        ? "bg-amber-400 text-slate-900 font-bold cursor-pointer"
                        : "text-slate-500 hover:text-slate-300 cursor-pointer"
                    }`}
                  >
                    {form.layer === l ? "• " : "  "}
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-700 my-5" />

          {/* Technology input */}
          <div className="flex items-center gap-4 mb-6">
            <label className="text-sm text-slate-300 whitespace-nowrap font-semibold tracking-wide">
              Technology :
            </label>
            <input
              type="text"
              value={form.technology}
              disabled={selectedId === null}
              onChange={(e) =>
                setForm((f) => ({ ...f, technology: e.target.value }))
              }
              placeholder="e.g. React"
              className="flex-1 bg-slate-800 border border-slate-600 text-white text-sm rounded-lg px-4 py-2 focus:outline-none focus:border-amber-400 placeholder-slate-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            />
          </div>

          {/* Success message */}
          {updated && (
            <div className="mb-4 px-4 py-2 bg-emerald-400/10 border border-emerald-400/30 rounded-lg text-emerald-400 text-xs tracking-widest uppercase text-center">
              ✓ Technology updated successfully
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleUpdate}
              disabled={selectedId === null}
              className="flex-1 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm py-2.5 rounded-lg tracking-widest uppercase transition-all active:scale-95 shadow-lg shadow-amber-400/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-amber-400 disabled:active:scale-100"
            >
              UPDATE
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-transparent border border-slate-600 hover:border-slate-400 text-slate-400 hover:text-slate-200 font-bold text-sm py-2.5 rounded-lg tracking-widest uppercase transition-all active:scale-95"
            >
              CANCEL
            </button>
          </div>
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
