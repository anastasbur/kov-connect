import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X, Anchor } from "lucide-react";
import { cn } from "@/lib/utils";

const menus = [
  {
    label: "Помощь и поддержка",
    items: [
      { label: "Юридическая помощь", href: "/help#legal" },
      { label: "Экстренное жильё", href: "/help#housing" },
      { label: "Психологическая помощь", href: "/help#psy" },
      { label: "База знаний", href: "/help#kb" },
    ],
  },
  {
    label: "Языки и образование",
    items: [
      { label: "Языковые курсы (бесплатно)", href: "/education#free" },
      { label: "Интеграционные курсы (платно)", href: "/education#integration" },
      { label: "Подготовка к экзаменам (платно)", href: "/education#exams" },
    ],
  },
  {
    label: "Сообщества",
    items: [
      { label: "По странам (карта диаспор)", href: "/communities#map" },
      { label: "По профессиям", href: "/communities#prof" },
      { label: "Предприниматели в эмиграции", href: "/communities#biz" },
      { label: "Уязвимые группы", href: "/communities#vulnerable" },
    ],
  },
  { label: "Адвокация", items: null, href: "/advocacy" },
  {
    label: "Кто мы?",
    items: [
      { label: "О Ковчеге", href: "/about" },
      { label: "СМИ о нас", href: "/about#media" },
      { label: "Отчёты", href: "/about#reports" },
      { label: "Контакты", href: "/about#contacts" },
    ],
  },
];

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/85 backdrop-blur-xl">
      <div className="container-kovcheg flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-105">
            <Anchor className="h-5 w-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-primary md:text-2xl">
            КОВЧЕГ
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {menus.map((m) =>
            m.items ? (
              <div key={m.label} className="relative group">
                <button className="nav-link flex items-center gap-1 px-3 py-2">
                  {m.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 top-full pt-2 min-w-[260px] opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
                  <div className="rounded-2xl border border-border/60 bg-card p-2 shadow-elevated">
                    {m.items.map((it) => (
                      <Link
                        key={it.label}
                        to={it.href}
                        className="block rounded-xl px-4 py-2.5 text-sm text-foreground/85 hover:bg-muted hover:text-primary transition-colors"
                      >
                        {it.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link key={m.label} to={m.href!} className="nav-link px-3 py-2">
                {m.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="donate" size="lg" className="hidden md:inline-flex">
            <Link to="/donate">Поддержать</Link>
          </Button>
          <button
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Меню"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-[max-height] duration-300 border-t border-border/40 bg-background",
          mobileOpen ? "max-h-[80vh] overflow-y-auto" : "max-h-0"
        )}
      >
        <div className="container-kovcheg py-4 space-y-1">
          {menus.map((m) =>
            m.items ? (
              <div key={m.label}>
                <button
                  onClick={() => setOpenMobileMenu(openMobileMenu === m.label ? null : m.label)}
                  className="w-full flex items-center justify-between py-3 text-base font-medium"
                >
                  {m.label}
                  <ChevronDown className={cn("h-4 w-4 transition-transform", openMobileMenu === m.label && "rotate-180")} />
                </button>
                {openMobileMenu === m.label && (
                  <div className="pl-4 pb-2 space-y-1">
                    {m.items.map((it) => (
                      <Link
                        key={it.label}
                        to={it.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-2 text-sm text-foreground/75 hover:text-primary"
                      >
                        {it.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={m.label}
                to={m.href!}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-base font-medium"
              >
                {m.label}
              </Link>
            )
          )}
          <Button asChild variant="donate" size="lg" className="w-full mt-4">
            <Link to="/donate" onClick={() => setMobileOpen(false)}>Поддержать</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
