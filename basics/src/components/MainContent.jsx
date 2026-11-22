import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import StatusCard from "./StatusCard";

export default function MainContent() {
  const [greeting, setGreeting] = useState({
    greet: "Hello, World!",
    place: "Earth",
  });
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  function updateGreeting() {
    setGreeting((prevGreeting) => ({
      ...prevGreeting,
      greet:
        prevGreeting.greet === "Hello, World!" ? "Hi there!" : "Hello, World!",
    }));
  }

  return (
    <main
      className={`min-h-[calc(100vh-69px)] px-6 py-12 transition-colors duration-300 ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="max-w-3xl mx-auto space-y-8">
        <section className="space-y-3">
          <h2 className="text-3xl font-bold">
            Global State with React Context
          </h2>
          <p className={isDark ? "text-slate-400" : "text-slate-600"}>
            Every component on this page reads the current theme directly from{" "}
            <code className="font-mono text-indigo-500">ThemeContext</code>. No
            props are drilled from <code className="font-mono">App</code> to{" "}
            <code className="font-mono">MainContent</code> or{" "}
            <code className="font-mono">StatusCard</code>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-3xl font-bold">Greeting</h2>
          <p className={isDark ? "text-slate-400" : "text-slate-600"}>
            {greeting.greet}
          </p>
          <button
            onClick={updateGreeting}
            className={`px-5 py-2.5 rounded-lg font-medium border transition-colors cursor-pointer ${
              isDark
                ? "border-slate-700 hover:bg-slate-800 text-slate-200"
                : "border-slate-300 hover:bg-slate-200/70 text-slate-800"
            }`}
          >
            Update Greeting
          </button>
        </section>

        <div className="grid gap-4 sm:grid-cols-2">
          <StatusCard
            title="Zero Prop Drilling"
            description="StatusCard accesses useTheme() directly even though it's nested inside MainContent."
          />
          <StatusCard
            title="Persistent State"
            description="Refresh the page—your selected theme stays saved via localStorage."
          />
        </div>

        <button
          onClick={toggleTheme}
          className={`px-5 py-2.5 rounded-lg font-medium border transition-colors cursor-pointer ${
            isDark
              ? "border-slate-700 hover:bg-slate-800 text-slate-200"
              : "border-slate-300 hover:bg-slate-200/70 text-slate-800"
          }`}
        >
          Toggle theme from MainContent too
        </button>
      </div>
    </main>
  );
}
