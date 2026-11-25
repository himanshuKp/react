import "./App.css";
import {
  PanelScrollLogger,
  PointScrollLogger,
  ScrollProgressBar,
} from "./components/ScrollPosition";

function App() {
  return (
    <>
      <div className="min-h-[250vh] bg-gradient-to-b from-slate-50 via-indigo-50/40 to-slate-100 p-8">
        <ScrollProgressBar />
        <PanelScrollLogger />
        <PointScrollLogger />

        <div className="mx-auto mt-32 max-w-xl space-y-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Scroll down to test Render Props
          </h1>
          <p className="text-slate-600">
            All three UI widgets share the exact same{" "}
            <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm text-slate-800">
              ScrollPosition
            </code>{" "}
            component while rendering completely different layouts.
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
