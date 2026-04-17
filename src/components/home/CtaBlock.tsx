import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const CtaBlock = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container-kovcheg">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-dark p-10 md:p-16 lg:p-20">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-secondary/15 blur-3xl" />

          <div className="relative max-w-4xl">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white text-balance leading-[1.1]">
              У нас нет государства, которое представляет наши интересы.
            </h2>
            <p className="mt-6 text-xl md:text-2xl text-white/80 max-w-3xl">
              Но у нас есть мы — миллионы единомышленников.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild variant="white" size="xl">
                <Link to="/communities">Присоединиться</Link>
              </Button>
              <Button asChild variant="whiteOutline" size="xl">
                <Link to="/donate">Поддержать проект</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
