import { useCartState } from "../../context/CartContext";

export default function Navbar() {
  const { items } = useCartState();
  const totalCount = items.reduce((total, item) => total + item.qty, 0);

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-slate-900">DevGear Store</h1>
      <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3.5 py-1.5 rounded-full text-sm font-semibold">
        <span>Cart</span>
        <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full">
          {totalCount}
        </span>
      </div>
    </header>
  );
}
