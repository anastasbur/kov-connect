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
import CommunitiesPage from "@/pages/CommunitiesPage";
import HelpPage from "@/pages/HelpPage";
import EducationPage from "@/pages/EducationPage";
import AboutPage from "@/pages/AboutPage";
import DonatePage from "@/pages/DonatePage";
import StoriesPage from "@/pages/StoriesPage";
import AdvocacyPage from "@/pages/AdvocacyPage";
import KnowledgeBasePage from "@/pages/KnowledgeBasePage";
import KnowledgeArticlePage from "@/pages/KnowledgeArticlePage";

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
          <Route path="/communities" element={<CommunitiesPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/advocacy" element={<AdvocacyPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/knowledge" element={<KnowledgeBasePage />} />
          <Route path="/knowledge/:slug" element={<KnowledgeArticlePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
