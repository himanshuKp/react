import { useReducer, useState } from "react";

const initialState = {
  items: [
    {
      id: 1,
      name: "Mechanical Keyboard",
      variant: "Tactile Brown Switches",
      price: 4999,
      qty: 1,
    },
    {
      id: 2,
      name: "USB-C Multiport Hub",
      variant: "7-in-1 Aluminum",
      price: 2499,
      qty: 2,
    },
    {
      id: 3,
      name: "Ergonomic Laptop Stand",
      variant: "Space Grey",
      price: 1799,
      qty: 1,
    },
  ],
  discountRate: 0,
  appliedPromo: "",
  promoError: "",
};

function cartReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.id ? { ...item, qty: item.qty + 1 } : item,
        ),
      };
    case "DECREMENT":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.id && item.qty > 1
            ? {
                ...item,
                qty: item.qty - 1,
              }
            : item,
        ),
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
      };
    case "APPLY_PROMO":
      const promoCode = action.promoCode.trim().toUpperCase();
      if (promoCode === "REACT20") {
        return {
          ...state,
          discountRate: 0.2,
          appliedPromo: promoCode,
          promoError: "",
        };
      } else {
        return {
          ...state,
          promoError: "Invalid promo code. Please try again.",
        };
      }
    case "REMOVE_PROMO":
      return {
        ...state,
        discountRate: 0,
        appliedPromo: "",
        promoError: "",
      };
    case "RESET_CART":
      return initialState;
    default:
      return state;
  }
}

export default function ShoppingCart() {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [promoInput, setPromoInput] = useState("");

  // derived value (no need to store in state)
  const subtotal = state.items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );
  const discount = Math.round(subtotal * state.discountRate);
  const total = subtotal - discount;
  const totalItems = state.items.reduce((sum, item) => sum + item.qty, 0);

  const handlePromoSubmit = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    dispatch({ type: "APPLY_PROMO", promoCode: promoInput });
    setPromoInput("");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 text-slate-900">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Your Cart</h1>
            <p className="text-sm text-slate-500 mt-1">
              {totalItems} {totalItems === 1 ? "item" : "items"} ready for
              checkout
            </p>
          </div>
          <button
            onClick={() => dispatch({ type: "RESET_CART" })}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition cursor-pointer"
          >
            Reset Demo Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {state.items.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-slate-500 mb-4">Your cart is empty.</p>
                <button
                  onClick={() => dispatch({ type: "RESET_CART" })}
                  className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition cursor-pointer"
                >
                  Restore Sample Items
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-slate-200">
                {state.items.map((item) => (
                  <li
                    key={item.id}
                    className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition"
                  >
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {item.name}
                      </h3>
                      <p className="text-sm text-slate-500">{item.variant}</p>
                      <p className="text-sm font-medium text-slate-700 mt-1">
                        ₹{item.price.toLocaleString("en-IN")} each
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-slate-200 rounded-lg bg-white">
                        <button
                          onClick={() =>
                            dispatch({ type: "DECREMENT", id: item.id })
                          }
                          disabled={item.qty === 1}
                          className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 disabled:opacity-35 disabled:hover:bg-transparent rounded-l-lg transition cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="px-3 py-1.5 text-sm font-semibold min-w-[2.25rem] text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() =>
                            dispatch({ type: "INCREMENT", id: item.id })
                          }
                          className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-r-lg transition cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Line Total & Remove */}
                      <div className="text-right min-w-[90px]">
                        <p className="font-semibold text-slate-900">
                          ₹{(item.price * item.qty).toLocaleString("en-IN")}
                        </p>
                        <button
                          onClick={() =>
                            dispatch({ type: "REMOVE_ITEM", id: item.id })
                          }
                          className="text-xs text-rose-600 hover:text-rose-700 font-medium mt-1 cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
            <h2 className="text-lg font-semibold">Order Summary</h2>

            {/* Promo Code Form */}
            <form onSubmit={handlePromoSubmit} className="space-y-2">
              <label className="block text-xs font-medium text-slate-600 uppercase tracking-wider">
                Promo Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Try REACT20"
                  className="flex-1 min-w-0 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition cursor-pointer"
                >
                  Apply
                </button>
              </div>

              {state.promoError && (
                <p className="text-xs text-rose-600">{state.promoError}</p>
              )}

              {state.appliedPromo && (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-2 rounded-lg text-xs">
                  <span>
                    Code <strong>{state.appliedPromo}</strong> applied (20% off)
                  </span>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "REMOVE_PROMO" })}
                    className="font-semibold hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}
            </form>

            {/* Price Breakdown */}
            <div className="border-t border-slate-200 pt-4 space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount (20%)</span>
                  <span>−₹{discount.toLocaleString("en-IN")}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="text-emerald-600 font-medium">Free</span>
              </div>

              <div className="border-t border-slate-200 pt-3 flex justify-between text-base font-bold text-slate-900">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <button
              disabled={state.items.length === 0}
              className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition cursor-pointer"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
