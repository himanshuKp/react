import { useCartDispatch, useCartState } from "../../context/CartContext";

export default function CartPanel() {
  const { items } = useCartState();
  const dispatch = useCartDispatch();

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <aside className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Your Cart</h2>
        {items.length > 0 && (
          <button
            onClick={() => dispatch({ type: "CLEAR_CART" })}
            className="text-xs text-rose-600 hover:underline font-medium cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-slate-500 py-6 text-center">
          Add products from the catalog to get started.
        </p>
      ) : (
        <>
          <ul className="divide-y divide-slate-200">
            {items.map((item) => (
              <li
                key={item.id}
                className="py-3 flex items-center justify-between gap-3"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    ₹{item.price.toLocaleString("en-IN")} × {item.qty}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      dispatch({
                        type: "DECREMENT_ITEM",
                        payload: { id: item.id },
                      })
                    }
                    className="w-7 h-7 rounded border border-slate-200 hover:bg-slate-100 text-sm cursor-pointer"
                  >
                    −
                  </button>
                  <button
                    onClick={() =>
                      dispatch({
                        type: "ADD_ITEM",
                        payload: { ...item, qty: 1 },
                      })
                    }
                    className="w-7 h-7 rounded border border-slate-200 hover:bg-slate-100 text-sm cursor-pointer"
                  >
                    +
                  </button>
                  <button
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_ITEM",
                        payload: { id: item.id },
                      })
                    }
                    className="text-xs text-rose-600 hover:text-rose-700 ml-1 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t border-slate-200 pt-4 flex justify-between font-bold text-slate-900">
            <span>Total</span>
            <span>₹{total.toLocaleString("en-IN")}</span>
          </div>
        </>
      )}
    </aside>
  );
}
