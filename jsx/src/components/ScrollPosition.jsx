import { useState, useEffect } from "react";

export const ScrollPosition = ({ render }) => {
  const [scrollPosition, setScrollPosition] = useState({
    x: 0,
    y: 0,
    progress: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;

      setScrollPosition({
        x: Math.round(window.scrollX),
        y: Math.round(window.scrollY),
        progress: Math.min(100, Math.max(0, Math.round(progress))),
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return render({ scrollPosition });
};

export const ScrollProgressBar = () => (
  <ScrollPosition
    render={({ scrollPosition }) => (
      <div className="fixed top-0 left-0 z-50 h-1.5 w-full bg-slate-200">
        <div
          className="h-full bg-indigo-600 transition-all duration-75"
          style={{ width: `${scrollPosition.progress}%` }}
        />
      </div>
    )}
  />
);

export const PanelScrollLogger = () => (
  <div className="fixed top-6 left-6 z-40 w-56 rounded-xl border border-slate-200 bg-white/85 p-4 shadow-lg backdrop-blur-md">
    <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
      Scroll Tracker
    </p>
    <ScrollPosition
      render={({ scrollPosition }) => (
        <div className="mt-3 space-y-2 font-mono text-sm text-slate-800 tabular-nums">
          <div className="flex justify-between">
            <span className="text-slate-500">X-Axis:</span>
            <span className="font-semibold">{scrollPosition.x}px</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Y-Axis:</span>
            <span className="font-semibold">{scrollPosition.y}px</span>
          </div>
          <div className="flex justify-between border-t border-slate-100 pt-2">
            <span className="text-slate-500">Progress:</span>
            <span className="font-semibold text-indigo-600">
              {scrollPosition.progress}%
            </span>
          </div>
        </div>
      )}
    />
  </div>
);

export const PointScrollLogger = () => (
  <ScrollPosition
    render={({ scrollPosition }) => (
      <div className="fixed right-6 bottom-6 z-40 rounded-full bg-slate-900 px-4 py-2 font-mono text-xs font-medium text-white shadow-md tabular-nums">
        ({scrollPosition.x}, {scrollPosition.y})
      </div>
    )}
  />
);
