import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from '@/components/NavBar'
import Home from '@/pages/Home'
import Catalog from '@/pages/Catalog'
import BookDetail from '@/pages/BookDetail'
import Cart from '@/pages/Cart'
import Author from '@/pages/Author'
import Contact from '@/pages/Contact'
import Auth from '@/pages/Auth' // ← único Auth

export default function AppRouter() {
  return (
    <BrowserRouter>
      <NavBar />
      <main className="py-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/author" element={<Author />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} /> {/* ← aquí */}
        </Routes>
      </main>
    </BrowserRouter>
  )
}
