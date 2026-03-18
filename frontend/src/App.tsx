import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import NewsDetail from "./pages/NewsDetail";
import PhotoCard from "./pages/PhotoCard";
import Districts from "./pages/Districts";
import DistrictPage from "./pages/DistrictPage";
import Team from "./pages/Team";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AdminAuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sylhet" element={<CategoryPage />} />
            <Route path="/national" element={<CategoryPage />} />
            <Route path="/politics" element={<CategoryPage />} />
            <Route path="/mofoshol" element={<CategoryPage />} />
            <Route path="/international" element={<CategoryPage />} />
            <Route path="/economy" element={<CategoryPage />} />
            <Route path="/entertainment" element={<CategoryPage />} />
            <Route path="/expat" element={<CategoryPage />} />
            <Route path="/sports" element={<CategoryPage />} />
            <Route path="/lifestyle" element={<CategoryPage />} />
            <Route path="/technology" element={<CategoryPage />} />
            <Route path="/law" element={<CategoryPage />} />
            <Route path="/opinion" element={<CategoryPage />} />
            <Route path="/others" element={<CategoryPage />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/photocard" element={<PhotoCard />} />
            <Route path="/districts" element={<Districts />} />
            <Route path="/district/:district" element={<DistrictPage />} />
            <Route path="/team" element={<Team />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AdminAuthProvider>
  </QueryClientProvider>
);

export default App;
