import { useCartDispatch } from "../../context/CartContext";

const PRODUCTS = [
  { id: 1, name: "Mechanical Keyboard", price: 4999 },
  { id: 2, name: "USB-C Multiport Hub", price: 2499 },
  { id: 3, name: "Ergonomic Laptop Stand", price: 1799 },
];

export default function ProductCatalog() {
  const dispatch = useCartDispatch();
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">Products</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {PRODUCTS.map((product) => (
          <div
            key={product.id}
            className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col justify-between gap-4 shadow-sm"
          >
            <div>
              <h3 className="font-semibold text-slate-900">{product.name}</h3>
              <p className="text-sm text-slate-500 mt-1">
                ₹{product.price.toLocaleString("en-IN")}
              </p>
            </div>
            <button
              onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}
              className="w-full py-2 px-4 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition cursor-pointer"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
