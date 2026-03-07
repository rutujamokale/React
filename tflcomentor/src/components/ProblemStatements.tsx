import { useState } from "react";

interface Problem {
  id: number;
  title: string;
  description: string;
}

export default function ProblemStatements() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addProblem = () => {
    if (!title || !description) return;

    const newProblem: Problem = {
      id: Date.now(),
      title,
      description,
    };

    setProblems([...problems, newProblem]);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-8">
          Problem Statements
        </h1>

        {/* Add Problem Form */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">

          <h2 className="text-xl font-semibold mb-4">
            Add Problem Statement
          </h2>

          <div className="flex flex-col gap-4">

            <input
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <textarea
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded h-28 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={addProblem}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Add Problem
            </button>

          </div>
        </div>

        {/* Problem List */}
        <div className="grid gap-4">

          {problems.length === 0 ? (
            <p className="text-center text-gray-500">
              No problem statements added yet.
            </p>
          ) : (
            problems.map((problem) => (
              <div
                key={problem.id}
                className="bg-white p-4 rounded-lg shadow"
              >
                <h3 className="text-lg font-semibold">
                  {problem.title}
                </h3>
                <p className="text-gray-600 mt-2">
                  {problem.description}
                </p>
              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}