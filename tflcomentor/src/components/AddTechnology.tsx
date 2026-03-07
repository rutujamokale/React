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

export default function AddTechnology() {
  const [form, setForm] = useState<TechnologyForm>({
    runtime: "",
    language: "",
    layer: "",
    technology: "",
  });
  const [added, setAdded] = useState<TechnologyForm[]>([]);
  const [shake, setShake] = useState(false);

  const handleAdd = () => {
    if (!form.runtime || !form.language || !form.layer || !form.technology.trim()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setAdded((prev) => [...prev, form]);
    setForm({ runtime: "", language: "", layer: "", technology: "" });
  };

  const handleCancel = () => {
    setForm({ runtime: "", language: "", layer: "", technology: "" });
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
          <div className="w-2 h-8 bg-cyan-400 rounded-full" />
          <h1 className="text-2xl font-bold text-white tracking-widest uppercase">
            Add Technology
          </h1>
        </div>

        {/* Card */}
        <div
          className={`bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl transition-all duration-150 ${
            shake ? "animate-[shake_0.4s_ease]" : ""
          }`}
          style={
            shake
              ? { animation: "shake 0.4s ease" }
              : {}
          }
        >
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
                  onChange={(e) =>
                    setForm((f) => ({ ...f, runtime: e.target.value as Runtime }))
                  }
                  className="w-full appearance-none bg-slate-800 border border-slate-600 text-white text-sm rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-cyan-400 transition-colors cursor-pointer"
                >
                  <option value="">Select</option>
                  {RUNTIMES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                  ▼
                </span>
              </div>
              {/* Options preview */}
              <div className="flex flex-col gap-1 mt-1">
                {RUNTIMES.map((r) => (
                  <span
                    key={r}
                    onClick={() => setForm((f) => ({ ...f, runtime: r }))}
                    className={`text-xs px-2 py-1 rounded cursor-pointer transition-all ${
                      form.runtime === r
                        ? "bg-cyan-400 text-slate-900 font-bold"
                        : "text-slate-500 hover:text-slate-300"
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
                  onChange={(e) =>
                    setForm((f) => ({ ...f, language: e.target.value as Language }))
                  }
                  className="w-full appearance-none bg-slate-800 border border-slate-600 text-white text-sm rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-cyan-400 transition-colors cursor-pointer"
                >
                  <option value="">Select</option>
                  {LANGUAGES.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
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
                    onClick={() => setForm((f) => ({ ...f, language: l }))}
                    className={`text-xs px-2 py-1 rounded cursor-pointer transition-all ${
                      form.language === l
                        ? "bg-cyan-400 text-slate-900 font-bold"
                        : "text-slate-500 hover:text-slate-300"
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
                  onChange={(e) =>
                    setForm((f) => ({ ...f, layer: e.target.value as Layer }))
                  }
                  className="w-full appearance-none bg-slate-800 border border-slate-600 text-white text-sm rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-cyan-400 transition-colors cursor-pointer"
                >
                  <option value="">Select</option>
                  {LAYERS.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
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
                    onClick={() => setForm((f) => ({ ...f, layer: l }))}
                    className={`text-xs px-2 py-1 rounded cursor-pointer transition-all ${
                      form.layer === l
                        ? "bg-cyan-400 text-slate-900 font-bold"
                        : "text-slate-500 hover:text-slate-300"
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
              onChange={(e) =>
                setForm((f) => ({ ...f, technology: e.target.value }))
              }
              placeholder="e.g. React"
              className="flex-1 bg-slate-800 border border-slate-600 text-white text-sm rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400 placeholder-slate-600 transition-colors"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAdd}
              className="flex-1 bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold text-sm py-2.5 rounded-lg tracking-widest uppercase transition-all active:scale-95 shadow-lg shadow-cyan-400/20"
            >
              ADD
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-transparent border border-slate-600 hover:border-slate-400 text-slate-400 hover:text-slate-200 font-bold text-sm py-2.5 rounded-lg tracking-widest uppercase transition-all active:scale-95"
            >
              CANCEL
            </button>
          </div>
        </div>

        {/* Added technologies list */}
        {added.length > 0 && (
          <div className="mt-6">
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">
              Added ({added.length})
            </p>
            <div className="flex flex-col gap-2">
              {added.map((item, i) => (
                <div
                  key={i}
                  className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 flex items-center justify-between"
                >
                  <span className="text-cyan-400 font-bold text-sm">
                    {item.technology}
                  </span>
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
