import { useState } from "react";
import { Level, ProblemStatement } from "./problemStatementData";

interface Props {
  onBack: () => void;
  onSave: (ps: Omit<ProblemStatement, "id">) => void;
}

const EMPTY: Omit<ProblemStatement, "id"> = {
  title: "", level: "Beginner", technology: "Node JS", concept: "",
  description: "", inputFormat: "", outputFormat: "",
  constraints: "", sampleInput: "", sampleOutput: "", starterCode: "",
};

export default function AddProblemStatement({ onBack, onSave }: Props) {
  const [form, setForm]     = useState<Omit<ProblemStatement, "id">>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof typeof EMPTY, string>>>({});

  const set = (key: keyof typeof EMPTY) => (val: string) =>
    setForm(p => ({ ...p, [key]: val }));

  const validate = () => {
    const e: typeof errors = {};
    if (!form.title.trim())       e.title       = "Title is required";
    if (!form.concept.trim())     e.concept     = "Concept is required";
    if (!form.description.trim()) e.description = "Description is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => { if (validate()) onSave(form); };

  /* ── reusable field components ── */
  const Label = ({ text, required }: { text: string; required?: boolean }) => (
    <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">
      {text}{required && <span className="text-rose-500 ml-0.5">*</span>}
    </label>
  );

  const inputCls = (err?: string) =>
    `w-full px-3 py-2.5 text-sm rounded-xl border bg-slate-50 text-slate-800 outline-none transition-all
     ${err ? "border-rose-400 focus:ring-2 focus:ring-rose-200" : "border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"}`;

  const TextInput = ({ label, field, required }: { label: string; field: keyof typeof EMPTY; required?: boolean }) => (
    <div className="mb-4">
      <Label text={label} required={required} />
      <input
        type="text"
        value={form[field] as string}
        onChange={e => set(field)(e.target.value)}
        className={inputCls(errors[field])}
        placeholder={`Enter ${label.toLowerCase()}...`}
      />
      {errors[field] && <p className="text-xs text-rose-500 mt-1">{errors[field]}</p>}
    </div>
  );

  const TextArea = ({
    label, field, rows = 3, dark = false, required,
  }: { label: string; field: keyof typeof EMPTY; rows?: number; dark?: boolean; required?: boolean }) => (
    <div className="mb-4">
      <Label text={label} required={required} />
      <textarea
        rows={rows}
        value={form[field] as string}
        onChange={e => set(field)(e.target.value)}
        placeholder={dark ? "// write here..." : `Enter ${label.toLowerCase()}...`}
        className={
          dark
            ? `w-full px-3 py-2.5 text-xs font-mono rounded-xl border border-slate-700 bg-slate-900 text-green-300 outline-none resize-y focus:ring-2 focus:ring-indigo-400 transition-all`
            : inputCls(errors[field])
        }
      />
      {errors[field] && <p className="text-xs text-rose-500 mt-1">{errors[field]}</p>}
    </div>
  );

  const SelectField = ({
    label, field, options,
  }: { label: string; field: keyof typeof EMPTY; options: string[] }) => (
    <div className="mb-4">
      <Label text={label} />
      <select
        value={form[field] as string}
        onChange={e => set(field)(e.target.value)}
        className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 cursor-pointer transition-all"
      >
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 px-4 py-10 font-sans">
      <div className="max-w-2xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-5">
          <button onClick={onBack} className="hover:text-indigo-600 transition-colors font-semibold">Problem Statements</button>
          <span>/</span>
          <span className="text-emerald-600 font-bold">Add New</span>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-emerald-100 border border-emerald-100 overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 px-6 py-5">
            <p className="text-emerald-100 text-xs font-semibold tracking-widest uppercase mb-1">New Entry</p>
            <h2 className="text-white text-xl font-extrabold tracking-tight" style={{ fontFamily:"'Syne',sans-serif" }}>
              Add Problem Statement
            </h2>
            <p className="text-emerald-200 text-xs mt-1">Fill in all the fields to create a new problem</p>
          </div>

          {/* Form body */}
          <div className="px-6 py-5 max-h-[600px] overflow-y-auto">

            {/* Row 1: Title + Concept */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextInput label="Title"   field="title"   required />
              <TextInput label="Concept" field="concept" required />
            </div>

            {/* Row 2: Level + Technology */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectField label="Level"      field="level"      options={["Beginner","Intermediate","Advanced"]} />
              <SelectField label="Technology" field="technology" options={["Node JS","Spring Boot","Python"]} />
            </div>

            <TextArea label="Description" field="description" rows={3} required />

            {/* Row 3: Input + Output format */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextArea label="Input Format"  field="inputFormat"  rows={2} />
              <TextArea label="Output Format" field="outputFormat" rows={2} />
            </div>

            <TextInput label="Constraints" field="constraints" />

            {/* Row 4: Sample I/O — dark code style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-4">
                <Label text="Sample Input" />
                <textarea
                  rows={3}
                  value={form.sampleInput}
                  onChange={e => set("sampleInput")(e.target.value)}
                  placeholder="// sample input..."
                  className="w-full px-3 py-2.5 text-xs font-mono rounded-xl border border-slate-700 bg-slate-900 text-cyan-300 outline-none resize-y focus:ring-2 focus:ring-cyan-400 transition-all"
                />
              </div>
              <div className="mb-4">
                <Label text="Sample Output" />
                <textarea
                  rows={3}
                  value={form.sampleOutput}
                  onChange={e => set("sampleOutput")(e.target.value)}
                  placeholder="// expected output..."
                  className="w-full px-3 py-2.5 text-xs font-mono rounded-xl border border-slate-700 bg-slate-900 text-emerald-300 outline-none resize-y focus:ring-2 focus:ring-emerald-400 transition-all"
                />
              </div>
            </div>

            <TextArea label="Starter Code" field="starterCode" rows={5} dark />
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 hover:border-slate-300 transition-all shadow-sm hover:-translate-y-0.5 active:translate-y-0"
            >
              ← Back
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              ✓ Save Problem Statement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
