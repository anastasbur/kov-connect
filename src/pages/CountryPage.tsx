import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getCountryBySlug } from "@/data/countries";

export default function CountryPage() {
  const { slug } = useParams<{ slug: string }>();
  const country = getCountryBySlug(slug || "");

  if (!country) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-bold mb-4">Страна не найдена</p>
            <Button asChild>
              <Link to="/">На главную</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">{country.flag}</span>
          <h1 className="text-4xl font-bold">{country.nameRu}</h1>
        </div>
        <p className="text-muted-foreground mb-8">{country.mapDescription}</p>
        <Button asChild variant="hero">
          <a href={country.telegramUrl} target="_blank" rel="noopener noreferrer">
            Присоединиться к чату
          </a>
        </Button>
      </main>
      <Footer />
    </div>
  );
}
