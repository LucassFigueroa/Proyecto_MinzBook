// src/AppRouter.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import Catalog from "@/pages/Catalog";
import Author from "@/pages/Author";
import Contact from "@/pages/Contact";
import Support from "@/pages/Support";
import Auth from "@/pages/Auth";
import BookDetail from "@/pages/BookDetail";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import AdminPage from "@/pages/Admin";
import NavBar from "@/components/NavBar";
import ProtectedRoute from "@/routes/ProtectedRoute";
import { Role } from "@/types/role";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <Routes>
          {/* PÚBLICAS */}
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/author" element={<Author />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/auth" element={<Auth />} />

          {/* PRIVADAS */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          {/* SOLO SUPPORT */}
          <Route
            path="/support"
            element={
              <ProtectedRoute role={Role.SUPPORT}>
                <Support />
              </ProtectedRoute>
            }
          />

          {/* SOLO ADMIN */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role={Role.ADMIN}>
                <AdminPage />
              </ProtectedRoute>
            }
          />

          {/* RUTA POR DEFECTO */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
