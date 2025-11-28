import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import Catalog from "@/pages/Catalog";
import Author from "@/pages/Author";
import Contact from "@/pages/Contact";
import Support from "@/pages/Support";
import Auth from "@/pages/Auth";
import BookDetail from "@/pages/BookDetail";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout"; // 👈 NUEVO
import NavBar from "@/components/NavBar";
import { useAuth } from "@/context/AuthContext";

function SupportGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const email =
    user?.email?.toLowerCase() ||
    (user as any)?.user?.email?.toLowerCase() ||
    "";

  if (email !== "soporte@minzbook.cl") {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/author" element={<Author />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book/:isbn" element={<BookDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} /> {/* 👈 NUEVA RUTA */}
          <Route path="/auth" element={<Auth />} />

          <Route
            path="/support"
            element={
              <SupportGuard>
                <Support />
              </SupportGuard>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
