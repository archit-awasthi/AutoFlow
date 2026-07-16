import { Routes, Route } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-cyan-400">AutoFlow</h1>
        <p className="mt-4 text-lg text-slate-300">
          Browser Automation Platform
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Module 1 Setup Successful 🚀
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;