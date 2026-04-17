import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import CountryPage from "./pages/CountryPage.tsx";
import BusinessPage from "./pages/BusinessPage.tsx";

const queryClient = new QueryClient();

function ComingSoon({ title }: { title: string }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="text-6xl mb-6">🚧</div>
          <h1 className="text-3xl font-extrabold text-primary mb-3">{title}</h1>
          <p className="text-muted-foreground">
            Этот раздел в разработке. Скоро здесь появится полноценная страница.
          </p>
          <a
            href="/"
            className="inline-block mt-6 bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            На главную
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/country/:slug" element={<CountryPage />} />
          <Route path="/business" element={<BusinessPage />} />
          <Route path="/communities" element={<ComingSoon title="Сообщества Ковчега" />} />
          <Route path="/help" element={<ComingSoon title="Помощь и поддержка" />} />
          <Route path="/education" element={<ComingSoon title="Языки и образование" />} />
          <Route path="/advocacy" element={<ComingSoon title="Адвокация" />} />
          <Route path="/about" element={<ComingSoon title="О Ковчеге" />} />
          <Route path="/donate" element={<ComingSoon title="Поддержать проект" />} />
          <Route path="/stories" element={<ComingSoon title="Эмиграция в лицах" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
