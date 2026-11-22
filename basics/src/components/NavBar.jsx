import { useTheme } from "../context/ThemeContext";

export default function NavBar() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header
      className={`flex items-center justify-between px-6 py-4 border-b transition-colors duration-300 ${
        isDark
          ? "bg-slate-900 border-slate-800 text-white"
          : "bg-white border-slate-200 text-slate-900"
      }`}
    >
      <h1 className="text-xl font-bold tracking-tight">ThemeContext Demo</h1>

      <button
        onClick={toggleTheme}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
          isDark
            ? "bg-amber-400 text-slate-950 hover:bg-amber-300"
            : "bg-slate-900 text-white hover:bg-slate-800"
        }`}
      >
        {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </header>
  );
}
