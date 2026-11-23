import "./App.css";
import CartPanel from "./components/reducer/CartPanel";
import Navbar from "./components/reducer/Navbar";
import ProductCatalog from "./components/reducer/ProductCatalog";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="max-w-5xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <ProductCatalog />
          </div>
          <CartPanel />
        </main>
      </div>
    </CartProvider>
  );
}

export default App;
