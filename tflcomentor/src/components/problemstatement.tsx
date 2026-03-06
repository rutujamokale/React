import { useState } from "react";

type Level = "Beginner" | "Intermediate" | "Advanced";
type View = "list" | "add" | "view" | "edit";

interface ProblemStatement {
  id: number;
  title: string;
  level: Level;
  technology: string;
  concept: string;
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  sampleInput: string;
  sampleOutput: string;
  starterCode: string;
}

const INITIAL_DATA: ProblemStatement[] = [
  {
    id: 1, title: "Rest API Design", level: "Beginner", technology: "Node JS", concept: "Rest API",
    description: "Design a RESTful API for a simple task manager application.",
    inputFormat: "JSON body with task title and description",
    outputFormat: "JSON response with task id, title, status",
    constraints: "Title max 100 chars, Description max 500 chars",
    sampleInput: '{"title": "Buy groceries", "description": "Milk, eggs, bread"}',
    sampleOutput: '{"id": 1, "title": "Buy groceries", "status": "pending"}',
    starterCode: "const express = require('express');\nconst app = express();\n// Your code here",
  },
  {
    id: 2, title: "Login Authentication", level: "Advanced", technology: "Spring Boot", concept: "Security",
    description: "Implement JWT-based login authentication system.",
    inputFormat: "JSON with username and password fields",
    outputFormat: "JWT token string on success, error message on failure",
    constraints: "Password must be hashed, token expires in 24h",
    sampleInput: '{"username": "admin", "password": "secret123"}',
    sampleOutput: '{"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}',
    starterCode: "@RestController\npublic class AuthController {\n  // Your code here\n}",
  },
  {
    id: 3, title: "AI Chatbot", level: "Advanced", technology: "Python", concept: "NLP",
    description: "Build a simple rule-based chatbot using NLP techniques.",
    inputFormat: "Plain text user message string",
    outputFormat: "Plain text bot response string",
    constraints: "Response time < 200ms, handle at least 50 intents",
    sampleInput: "Hello, what can you do?",
    sampleOutput: "Hi! I can answer FAQs, help with orders, and provide support.",
    starterCode: "import nltk\n\ndef chatbot_response(user_input):\n    # Your code here\n    pass",
  },
];

const LEVEL_STYLE: Record<Level, { background: string; color: string; border: string }> = {
  Beginner:     { background: "#dcfce7", color: "#15803d", border: "1px solid #86efac" },
  Intermediate: { background: "#fef9c3", color: "#a16207", border: "1px solid #fde047" },
  Advanced:     { background: "#fee2e2", color: "#b91c1c", border: "1px solid #fca5a5" },
};

const TECH_STYLE: Record<string, { background: string; color: string; border: string }> = {
  "Node JS":     { background: "#dbeafe", color: "#1d4ed8", border: "1px solid #93c5fd" },
  "Spring Boot": { background: "#d1fae5", color: "#065f46", border: "1px solid #6ee7b7" },
  "Python":      { background: "#ede9fe", color: "#6d28d9", border: "1px solid #c4b5fd" },
};

const EMPTY_FORM: Omit<ProblemStatement, "id"> = {
  title: "", level: "Beginner", technology: "Node JS", concept: "",
  description: "", inputFormat: "", outputFormat: "",
  constraints: "", sampleInput: "", sampleOutput: "", starterCode: "",
};

export default function ProblemStatements() {
  const [data, setData] = useState<ProblemStatement[]>(INITIAL_DATA);
  const [currentView, setCurrentView] = useState<View>("list");
  const [selected, setSelected] = useState<ProblemStatement | null>(null);
  const [form, setForm] = useState<Omit<ProblemStatement, "id">>(EMPTY_FORM);
  const [filterLevel, setFilterLevel] = useState("");
  const [filterTech, setFilterTech] = useState("");
  const [appliedLevel, setAppliedLevel] = useState("");
  const [appliedTech, setAppliedTech] = useState("");
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" | "info" } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [showTable, setShowTable] = useState(true);

  const showToast = (msg: string, type: "success" | "error" | "info" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  const filteredData = data.filter(ps =>
    (appliedLevel === "" || ps.level === appliedLevel) &&
    (appliedTech === "" || ps.technology === appliedTech)
  );

  const handleShowToggle = () => {
    setShowTable(p => !p);
    showToast(showTable ? "Table hidden" : "Showing all problem statements", "info");
  };

  const handleAddOpen = () => { setForm(EMPTY_FORM); setCurrentView("add"); };

  const handleAddSave = () => {
    if (!form.title.trim()) { showToast("Title is required", "error"); return; }
    setData(p => [...p, { ...form, id: Date.now() }]);
    setCurrentView("list");
    showToast(`"${form.title}" added successfully!`);
  };

  const handleView = (ps: ProblemStatement) => { setSelected(ps); setCurrentView("view"); };

  const handleEditOpen = (ps: ProblemStatement) => { setSelected(ps); setForm({ ...ps }); setCurrentView("edit"); };

  const handleEditSave = () => {
    if (!form.title.trim()) { showToast("Title is required", "error"); return; }
    setData(p => p.map(x => x.id === selected!.id ? { ...form, id: selected!.id } : x));
    setCurrentView("list");
    showToast(`"${form.title}" updated successfully!`);
  };

  const handleDeleteRequest = (id: number) => setDeleteConfirm(id);

  const handleDeleteConfirm = () => {
    const ps = data.find(x => x.id === deleteConfirm);
    setData(p => p.filter(x => x.id !== deleteConfirm));
    setDeleteConfirm(null);
    showToast(`"${ps?.title}" deleted`, "info");
  };

  const handleApplyFilter = () => {
    setAppliedLevel(filterLevel);
    setAppliedTech(filterTech);
    showToast("Filters applied", "info");
  };

  const handleReset = () => {
    setFilterLevel(""); setFilterTech("");
    setAppliedLevel(""); setAppliedTech("");
    showToast("Filters reset", "info");
  };

  // ── Style tokens ─────────────────────────────────────────
  const btnBase: React.CSSProperties = {
    border: "none", padding: "9px 18px", borderRadius: 8,
    fontSize: 12, fontWeight: 700, cursor: "pointer",
    letterSpacing: "0.04em", fontFamily: "inherit",
    transition: "opacity .15s, transform .15s",
  };
  const btnPrimary: React.CSSProperties = { ...btnBase, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", boxShadow: "0 3px 10px rgba(99,102,241,.3)" };
  const btnAdd:     React.CSSProperties = { ...btnBase, background: "linear-gradient(135deg,#059669,#0d9488)", color: "#fff", boxShadow: "0 3px 10px rgba(5,150,105,.25)" };
  const btnEdit:    React.CSSProperties = { ...btnBase, background: "linear-gradient(135deg,#f59e0b,#d97706)", color: "#fff", boxShadow: "0 3px 10px rgba(245,158,11,.25)" };
  const btnDel:     React.CSSProperties = { ...btnBase, background: "linear-gradient(135deg,#ef4444,#dc2626)", color: "#fff", boxShadow: "0 3px 10px rgba(239,68,68,.25)" };
  const btnBack:    React.CSSProperties = { ...btnBase, background: "#f1f5f9", color: "#475569", border: "1.5px solid #e2e8f0", boxShadow: "none" };
  const btnGhost:   React.CSSProperties = { ...btnBase, background: "transparent", color: "#6366f1", border: "1.5px solid #c7d2fe" };

  const aBtn = (variant: "view"|"edit"|"del"): React.CSSProperties => {
    const v = { view: { bg:"#eff6ff", color:"#2563eb", bd:"#bfdbfe" }, edit: { bg:"#fffbeb", color:"#d97706", bd:"#fde68a" }, del: { bg:"#fef2f2", color:"#dc2626", bd:"#fecaca" } }[variant];
    return { ...btnBase, padding: "5px 11px", fontSize: 10, background: v.bg, color: v.color, border: `1px solid ${v.bd}`, boxShadow: "none" };
  };

  const badge: React.CSSProperties = { display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: "0.05em" };

  const selectSt: React.CSSProperties = {
    padding: "8px 34px 8px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8,
    fontSize: 12, background: "#f8fafc", outline: "none", fontFamily: "inherit", cursor: "pointer",
    appearance: "none", WebkitAppearance: "none",
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236366f1' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center",
  };

  const inputSt: React.CSSProperties = { width: "100%", padding: "8px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, fontFamily: "inherit", outline: "none", background: "#f8fafc", boxSizing: "border-box" };

  const cardHeaderSt: React.CSSProperties = {
    background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
    color: "#fff", padding: "13px 24px",
    fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 12,
    letterSpacing: "0.14em", textTransform: "uppercase",
  };

  const LabeledInput = ({ label, value, onChange, multi=false }: { label:string; value:string; onChange:(v:string)=>void; multi?:boolean }) => (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display:"block", fontSize:11, fontWeight:700, color:"#64748b", marginBottom:4, letterSpacing:"0.06em", textTransform:"uppercase" }}>{label}</label>
      {multi
        ? <textarea value={value} onChange={e=>onChange(e.target.value)} rows={3} style={{...inputSt, resize:"vertical"}} />
        : <input value={value} onChange={e=>onChange(e.target.value)} style={inputSt} />}
    </div>
  );

  const ViewField = ({ label, value }: { label:string; value:string }) => (
    <div style={{ marginBottom: 14 }}>
      <span style={{ fontSize:11, fontWeight:700, color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.06em" }}>{label}</span>
      <div style={{ marginTop:4, padding:"8px 12px", background:"#f8fafc", borderRadius:8, border:"1.5px solid #e2e8f0", fontSize:13, color:"#1e293b", whiteSpace:"pre-wrap", wordBreak:"break-word" }}>
        {value || <span style={{ color:"#cbd5e1" }}>—</span>}
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily:"'DM Sans','Segoe UI',sans-serif", minHeight:"100vh", background:"#f0f2f8", padding:"36px 20px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes fadeIn  { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes toastIn { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
        button:hover{opacity:.85;transform:translateY(-1px)} button:active{transform:translateY(0)!important;opacity:1!important}
        input:focus,select:focus,textarea:focus{border-color:#818cf8!important;box-shadow:0 0 0 3px rgba(99,102,241,.15)!important}
        ::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-thumb{background:#c7d2fe;border-radius:3px}
      `}</style>

      {/* Toast */}
      {toast && (
        <div style={{ position:"fixed", top:20, right:20, zIndex:999, padding:"12px 20px", borderRadius:10, fontSize:13, fontWeight:600, color:"#fff", animation:"toastIn .3s ease", background: toast.type==="success"?"#10b981":toast.type==="error"?"#ef4444":"#6366f1", boxShadow:"0 8px 24px rgba(0,0,0,.15)" }}>
          {toast.type==="success"?"✓ ":toast.type==="error"?"✕ ":"ℹ "}{toast.msg}
        </div>
      )}

      {/* Delete Modal */}
      {deleteConfirm !== null && (
        <div style={{ position:"fixed", inset:0, background:"rgba(15,23,42,.5)", zIndex:998, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ background:"#fff", borderRadius:16, padding:"32px 36px", maxWidth:360, width:"90%", boxShadow:"0 24px 64px rgba(0,0,0,.25)", animation:"fadeIn .2s ease", textAlign:"center" }}>
            <div style={{ fontSize:36, marginBottom:12 }}>🗑️</div>
            <h3 style={{ margin:"0 0 8px", fontSize:18, fontWeight:700, color:"#1e293b" }}>Delete Problem Statement?</h3>
            <p style={{ color:"#64748b", fontSize:13, margin:"0 0 24px" }}>
              "<strong>{data.find(x=>x.id===deleteConfirm)?.title}</strong>" will be permanently removed.
            </p>
            <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
              <button style={btnBack} onClick={()=>setDeleteConfirm(null)}>Cancel</button>
              <button style={btnDel} onClick={handleDeleteConfirm}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div style={{ marginBottom:28 }}>
        <h1 style={{ margin:0, fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:28, color:"#1e293b", letterSpacing:"-0.02em" }}>Problem Statements</h1>
        <p style={{ margin:"4px 0 0", fontSize:12, color:"#94a3b8", letterSpacing:"0.08em", textTransform:"uppercase" }}>▸ Components</p>
      </div>

      {/* Card */}
      <div style={{ background:"#fff", borderRadius:16, boxShadow:"0 4px 24px rgba(99,102,241,.09)", border:"1px solid #e8eaf6", overflow:"hidden", animation:"fadeIn .3s ease" }}>

        <div style={cardHeaderSt}>Problem Statements</div>

        {/* ── LIST VIEW ── */}
        {currentView === "list" && (
          <div style={{ padding:"22px 24px", animation:"fadeIn .25s ease" }}>

            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20, flexWrap:"wrap", gap:10 }}>
              <button style={btnPrimary} onClick={handleShowToggle}>
                {showTable ? "▼ Hide Statements" : "▶ Show Problem Statements"}
              </button>
              <button style={btnAdd} onClick={handleAddOpen}>+ Add Problem Statement</button>
            </div>

            {showTable && (
              <>
                {/* Filters */}
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10, flexWrap:"wrap" }}>
                  <span style={{ fontSize:12, color:"#64748b", fontWeight:600 }}>Filter By :</span>
                  <select style={selectSt} value={filterLevel} onChange={e=>setFilterLevel(e.target.value)}>
                    <option value="">Level ▼</option>
                    <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                  </select>
                  <select style={selectSt} value={filterTech} onChange={e=>setFilterTech(e.target.value)}>
                    <option value="">Technology ▼</option>
                    <option>Node JS</option><option>Spring Boot</option><option>Python</option>
                  </select>
                </div>

                <div style={{ display:"flex", justifyContent:"flex-end", gap:10, marginBottom:18 }}>
                  <button style={btnPrimary} onClick={handleApplyFilter}>⚡ Apply Filter</button>
                  <button style={btnGhost} onClick={handleReset}>↺ Reset</button>
                </div>

                {(appliedLevel || appliedTech) && (
                  <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap" }}>
                    {appliedLevel && <span style={{...badge, background:"#ede9fe", color:"#6d28d9", border:"1px solid #ddd6fe"}}>Level: {appliedLevel}</span>}
                    {appliedTech  && <span style={{...badge, background:"#dbeafe", color:"#1d4ed8", border:"1px solid #bfdbfe"}}>Tech: {appliedTech}</span>}
                  </div>
                )}

                {/* Table */}
                <div style={{ overflowX:"auto", borderRadius:10, border:"1px solid #f1f5f9" }}>
                  <table style={{ width:"100%", borderCollapse:"collapse" }}>
                    <thead>
                      <tr style={{ background:"#f8fafc" }}>
                        {["ID","Title","Level","Technology","Concept","Action"].map(h=>(
                          <th key={h} style={{ padding:"11px 14px", textAlign:"left", fontSize:11, fontWeight:700, color:"#6366f1", textTransform:"uppercase", letterSpacing:"0.1em", borderBottom:"2px solid #e8eaf6" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.length === 0 ? (
                        <tr><td colSpan={6} style={{ textAlign:"center", padding:"40px", color:"#94a3b8", fontSize:13 }}>No records match the selected filters.</td></tr>
                      ) : filteredData.map((ps, i) => (
                        <tr key={ps.id} style={{ background: i%2===0?"#fff":"#fafafe" }}>
                          <td style={{ padding:"11px 14px", fontSize:12, color:"#94a3b8", fontWeight:700, borderBottom:"1px solid #f1f5f9" }}>{i+1}.</td>
                          <td style={{ padding:"11px 14px", fontSize:13, fontWeight:600, color:"#1e293b", borderBottom:"1px solid #f1f5f9" }}>{ps.title}</td>
                          <td style={{ padding:"11px 14px", borderBottom:"1px solid #f1f5f9" }}>
                            <span style={{...badge, ...LEVEL_STYLE[ps.level]}}>{ps.level}</span>
                          </td>
                          <td style={{ padding:"11px 14px", borderBottom:"1px solid #f1f5f9" }}>
                            <span style={{...badge, ...(TECH_STYLE[ps.technology]??{background:"#f1f5f9",color:"#334155",border:"1px solid #cbd5e1"})}}>{ps.technology}</span>
                          </td>
                          <td style={{ padding:"11px 14px", fontSize:12, color:"#64748b", borderBottom:"1px solid #f1f5f9" }}>{ps.concept}</td>
                          <td style={{ padding:"11px 14px", borderBottom:"1px solid #f1f5f9", whiteSpace:"nowrap" }}>
                            <button style={aBtn("view")} onClick={()=>handleView(ps)}>view</button>
                            <button style={{...aBtn("edit"), marginLeft:5}} onClick={()=>handleEditOpen(ps)}>edit</button>
                            <button style={{...aBtn("del"), marginLeft:5}} onClick={()=>handleDeleteRequest(ps.id)}>delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ marginTop:12, textAlign:"right", fontSize:11, color:"#cbd5e1", letterSpacing:"0.06em" }}>
                  {filteredData.length} of {data.length} records
                </div>
              </>
            )}
          </div>
        )}

        {/* ── ADD VIEW ── */}
        {currentView === "add" && (
          <div style={{ animation:"fadeIn .25s ease" }}>
            <div style={{ padding:"22px 28px 0", borderBottom:"1px solid #f1f5f9", paddingBottom:16 }}>
              <h2 style={{ margin:0, fontSize:16, fontWeight:700, color:"#1e293b" }}>➕ Add Problem Statement</h2>
            </div>
            <div style={{ padding:"20px 28px", maxHeight:520, overflowY:"auto" }}>
              <LabeledInput label="Title" value={form.title} onChange={v=>setForm(p=>({...p,title:v}))} />
              <div style={{ marginBottom:14 }}>
                <label style={{ display:"block", fontSize:11, fontWeight:700, color:"#64748b", marginBottom:4, letterSpacing:"0.06em", textTransform:"uppercase" }}>Level</label>
                <select value={form.level} onChange={e=>setForm(p=>({...p,level:e.target.value as Level}))} style={{...inputSt, cursor:"pointer"}}>
                  <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                </select>
              </div>
              <div style={{ marginBottom:14 }}>
                <label style={{ display:"block", fontSize:11, fontWeight:700, color:"#64748b", marginBottom:4, letterSpacing:"0.06em", textTransform:"uppercase" }}>Technology</label>
                <select value={form.technology} onChange={e=>setForm(p=>({...p,technology:e.target.value}))} style={{...inputSt, cursor:"pointer"}}>
                  <option>Node JS</option><option>Spring Boot</option><option>Python</option>
                </select>
              </div>
              <LabeledInput label="Concept" value={form.concept} onChange={v=>setForm(p=>({...p,concept:v}))} />
              <LabeledInput label="Description" value={form.description} onChange={v=>setForm(p=>({...p,description:v}))} multi />
              <LabeledInput label="Input Format" value={form.inputFormat} onChange={v=>setForm(p=>({...p,inputFormat:v}))} multi />
              <LabeledInput label="Output Format" value={form.outputFormat} onChange={v=>setForm(p=>({...p,outputFormat:v}))} multi />
              <LabeledInput label="Constraints" value={form.constraints} onChange={v=>setForm(p=>({...p,constraints:v}))} multi />
              <LabeledInput label="Sample Input" value={form.sampleInput} onChange={v=>setForm(p=>({...p,sampleInput:v}))} multi />
              <LabeledInput label="Sample Output" value={form.sampleOutput} onChange={v=>setForm(p=>({...p,sampleOutput:v}))} multi />
              <LabeledInput label="Starter Code" value={form.starterCode} onChange={v=>setForm(p=>({...p,starterCode:v}))} multi />
            </div>
            <div style={{ padding:"14px 28px", borderTop:"1px solid #f1f5f9", display:"flex", gap:10, justifyContent:"flex-end" }}>
              <button style={btnBack} onClick={()=>setCurrentView("list")}>← Back</button>
              <button style={btnAdd} onClick={handleAddSave}>✓ Save</button>
            </div>
          </div>
        )}

        {/* ── VIEW DETAIL ── */}
        {currentView === "view" && selected && (
          <div style={{ animation:"fadeIn .25s ease" }}>
            <div style={{ padding:"22px 28px 0", paddingBottom:16, borderBottom:"1px solid #f1f5f9", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <h2 style={{ margin:0, fontSize:16, fontWeight:700, color:"#1e293b" }}>👁 Problem Statement #{selected.id}</h2>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                <span style={{...badge, ...LEVEL_STYLE[selected.level]}}>{selected.level}</span>
                <span style={{...badge, ...(TECH_STYLE[selected.technology]??{background:"#f1f5f9",color:"#334155",border:"1px solid #cbd5e1"})}}>{selected.technology}</span>
                <span style={{...badge, background:"#fdf2f8", color:"#9d174d", border:"1px solid #fbcfe8"}}>{selected.concept}</span>
              </div>
            </div>
            <div style={{ padding:"20px 28px", maxHeight:520, overflowY:"auto" }}>
              <ViewField label="Title" value={selected.title} />
              <ViewField label="Description" value={selected.description} />
              <ViewField label="Input Format" value={selected.inputFormat} />
              <ViewField label="Output Format" value={selected.outputFormat} />
              <ViewField label="Constraints" value={selected.constraints} />
              <ViewField label="Sample Input" value={selected.sampleInput} />
              <ViewField label="Sample Output" value={selected.sampleOutput} />
              <ViewField label="Starter Code" value={selected.starterCode} />
            </div>
            <div style={{ padding:"14px 28px", borderTop:"1px solid #f1f5f9", display:"flex", gap:10, justifyContent:"flex-end" }}>
              <button style={btnBack} onClick={()=>setCurrentView("list")}>← Back</button>
              <button style={btnEdit} onClick={()=>handleEditOpen(selected)}>✎ Edit</button>
              <button style={btnDel} onClick={()=>{ setCurrentView("list"); handleDeleteRequest(selected.id); }}>✕ Delete</button>
            </div>
          </div>
        )}

        {/* ── EDIT VIEW ── */}
        {currentView === "edit" && selected && (
          <div style={{ animation:"fadeIn .25s ease" }}>
            <div style={{ padding:"22px 28px 0", borderBottom:"1px solid #f1f5f9", paddingBottom:16 }}>
              <h2 style={{ margin:0, fontSize:16, fontWeight:700, color:"#1e293b" }}>✎ Edit — {selected.title}</h2>
            </div>
            <div style={{ padding:"20px 28px", maxHeight:520, overflowY:"auto" }}>
              <LabeledInput label="Title" value={form.title} onChange={v=>setForm(p=>({...p,title:v}))} />
              <div style={{ marginBottom:14 }}>
                <label style={{ display:"block", fontSize:11, fontWeight:700, color:"#64748b", marginBottom:4, letterSpacing:"0.06em", textTransform:"uppercase" }}>Level</label>
                <select value={form.level} onChange={e=>setForm(p=>({...p,level:e.target.value as Level}))} style={{...inputSt, cursor:"pointer"}}>
                  <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                </select>
              </div>
              <div style={{ marginBottom:14 }}>
                <label style={{ display:"block", fontSize:11, fontWeight:700, color:"#64748b", marginBottom:4, letterSpacing:"0.06em", textTransform:"uppercase" }}>Technology</label>
                <select value={form.technology} onChange={e=>setForm(p=>({...p,technology:e.target.value}))} style={{...inputSt, cursor:"pointer"}}>
                  <option>Node JS</option><option>Spring Boot</option><option>Python</option>
                </select>
              </div>
              <LabeledInput label="Concept" value={form.concept} onChange={v=>setForm(p=>({...p,concept:v}))} />
              <LabeledInput label="Description" value={form.description} onChange={v=>setForm(p=>({...p,description:v}))} multi />
              <LabeledInput label="Input Format" value={form.inputFormat} onChange={v=>setForm(p=>({...p,inputFormat:v}))} multi />
              <LabeledInput label="Output Format" value={form.outputFormat} onChange={v=>setForm(p=>({...p,outputFormat:v}))} multi />
              <LabeledInput label="Constraints" value={form.constraints} onChange={v=>setForm(p=>({...p,constraints:v}))} multi />
              <LabeledInput label="Sample Input" value={form.sampleInput} onChange={v=>setForm(p=>({...p,sampleInput:v}))} multi />
              <LabeledInput label="Sample Output" value={form.sampleOutput} onChange={v=>setForm(p=>({...p,sampleOutput:v}))} multi />
              <LabeledInput label="Starter Code" value={form.starterCode} onChange={v=>setForm(p=>({...p,starterCode:v}))} multi />
            </div>
            <div style={{ padding:"14px 28px", borderTop:"1px solid #f1f5f9", display:"flex", gap:10, justifyContent:"flex-end" }}>
              <button style={btnBack} onClick={()=>setCurrentView("list")}>← Back</button>
              <button style={btnEdit} onClick={handleEditSave}>✓ Update</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
