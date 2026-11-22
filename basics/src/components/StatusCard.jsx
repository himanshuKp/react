import { useTheme } from "../context/ThemeContext";

export default function StatusCard({ title, description }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`p-6 rounded-xl border transition-colors duration-300 ${
        isDark
          ? "bg-slate-800/70 border-slate-700 text-slate-100"
          : "bg-white border-slate-200 text-slate-800 shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span
          className={`text-xs font-mono px-2.5 py-1 rounded-full ${
            isDark
              ? "bg-indigo-500/20 text-indigo-300"
              : "bg-indigo-50 text-indigo-700"
          }`}
        >
          {theme.toUpperCase()}
        </span>
      </div>
      <p
        className={isDark ? "text-slate-400 text-sm" : "text-slate-600 text-sm"}
      >
        {description}
      </p>
    </div>
  );
}
