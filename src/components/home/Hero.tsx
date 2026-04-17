import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-illustration.png";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      {/* decorative blobs */}
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />

      <div className="container-kovcheg relative grid gap-12 py-16 md:py-24 lg:grid-cols-2 lg:items-center lg:py-32">
        <div className="animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-xs font-medium text-primary shadow-soft mb-6">
            <span className="h-2 w-2 rounded-full bg-donate animate-pulse" />
            Сообщество в 70 странах
          </div>
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl text-balance">
            Ковчег — это <span className="text-primary">каждый</span> из нас
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg md:text-xl leading-relaxed">
            Помогаем тем, кому тяжело. Создаём сообщество. Развиваем предпринимательство. Поддерживаем гражданское участие.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild variant="hero" size="xl">
              <Link to="/communities">
                Присоединиться <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="heroOutline" size="xl">
              <Link to="/about">Исследования</Link>
            </Button>
          </div>
        </div>

        <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-secondary/30 to-accent/20 blur-2xl" />
          <img
            src={heroImg}
            alt="Двое людей пожимают руки на фоне глобуса — символ диаспоры"
            width={1024}
            height={1024}
            className="relative w-full h-auto max-w-lg mx-auto animate-float"
          />
        </div>
      </div>
    </section>
  );
};
