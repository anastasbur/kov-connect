import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { plural, MATERIALS, SYMBOLS } from "@/lib/ru";
import {
  Search, X, ArrowRight, Loader2, BookOpen,
  Sparkles, Globe, Tag, ChevronDown, Copy, Check,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface WPCard {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  card_themes: number[];
  card_countries: number[];
  date: string;
}

interface WPTerm {
  id: number;
  name: string;
  slug: string;
  count: number;
}

interface CardItem {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  themes: number[];
  countries: number[];
  date: string;
}

// ─── API helpers ──────────────────────────────────────────────────────────────

const WP = "https://kovcheg.live/wp-json/wp/v2";
const MIN_QUERY = 2;

function strip(html: string) {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8230;/g, "…")
    .replace(/\[…\]/g, "…")
    .replace(/\u200b/g, "")
    .trim();
}

// нормализация для поиска: нижний регистр + ё→е
const norm = (s: string) => s.toLowerCase().replace(/ё/g, "е");

async function loadCards(): Promise<CardItem[]> {
  const all: CardItem[] = [];
  let page = 1;
  while (true) {
    const res = await fetch(
      `${WP}/card?per_page=100&page=${page}&status=publish` +
        `&_fields=id,slug,title,excerpt,card_themes,card_countries,date`
    );
    if (!res.ok) break;
    const data: WPCard[] = await res.json();
    if (!data.length) break;
    for (const c of data) {
      const title = strip(c.title.rendered);
      if (!title || title.toLowerCase().includes("черновик")) continue;
      all.push({
        id: c.id,
        slug: c.slug,
        title,
        excerpt: strip(c.excerpt.rendered),
        themes: c.card_themes ?? [],
        countries: c.card_countries ?? [],
        date: c.date,
      });
    }
    const total = parseInt(res.headers.get("X-WP-TotalPages") ?? "1");
    if (page >= total) break;
    page++;
  }
  return all;
}

async function loadTerms(taxonomy: string): Promise<WPTerm[]> {
  const res = await fetch(
    `${WP}/${taxonomy}?per_page=100&_fields=id,name,slug,count`
  );
  if (!res.ok) return [];
  const terms: WPTerm[] = await res.json();
  return terms.filter((t) => t.count > 0).sort((a, b) => b.count - a.count);
}

// ─── Локальный поиск ──────────────────────────────────────────────────────────
// Мгновенный, работает без бэкенда. Требует, чтобы все слова запроса
// встречались в материале (заголовок / описание / тема / страна),
// ранжирует совпадения в заголовке выше.

function searchCards(
  query: string,
  cards: CardItem[],
  themes: WPTerm[],
  countries: WPTerm[]
): CardItem[] {
  const tokens = norm(query).split(/\s+/).filter((t) => t.length >= 2);
  if (!tokens.length) return [];
  const themeName = (id: number) => themes.find((t) => t.id === id)?.name ?? "";
  const countryName = (id: number) => countries.find((c) => c.id === id)?.name ?? "";

  const scored: { card: CardItem; score: number }[] = [];
  for (const c of cards) {
    const title = norm(c.title);
    const meta = norm(
      `${c.excerpt} ${c.themes.map(themeName).join(" ")} ${c.countries.map(countryName).join(" ")}`
    );
    let score = 0;
    let matchesAll = true;
    for (const tok of tokens) {
      const inTitle = title.includes(tok);
      const inMeta = meta.includes(tok);
      if (!inTitle && !inMeta) {
        matchesAll = false;
        break;
      }
      score += inTitle ? 3 : 1;
    }
    if (matchesAll) scored.push({ card: c, score });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.map((s) => s.card);
}

// ─── Single card ──────────────────────────────────────────────────────────────

function KnowledgeCard({
  card,
  themes,
  countries,
  highlight,
}: {
  card: CardItem;
  themes: WPTerm[];
  countries: WPTerm[];
  highlight?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const url = `/knowledge/${card.slug}`;
  const shareUrl = `${window.location.origin}/knowledge/${card.slug}`;

  const themeNames = card.themes
    .map((id) => themes.find((t) => t.id === id)?.name)
    .filter(Boolean) as string[];
  const countryNames = card.countries
    .map((id) => countries.find((c) => c.id === id)?.name)
    .filter(Boolean) as string[];

  const copyLink = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = shareUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div
      className={`group relative flex flex-col rounded-3xl border bg-card p-6 shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all ${
        highlight ? "border-primary/40 ring-1 ring-primary/20" : "border-border/40"
      }`}
    >
      {highlight && (
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary mb-3">
          <Sparkles size={11} /> Лучшее совпадение
        </span>
      )}

      <div className="flex flex-wrap gap-1.5 mb-3 min-h-[24px]">
        {themeNames.slice(0, 2).map((n) => (
          <span
            key={n}
            className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-[#D9E3FF] text-primary font-medium"
          >
            <Tag size={9} />
            {n}
          </span>
        ))}
        {countryNames.slice(0, 1).map((n) => (
          <span
            key={n}
            className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-[#F0F4FF] text-[#6F8DFF] font-medium"
          >
            <Globe size={9} />
            {n}
          </span>
        ))}
      </div>

      <Link to={url} className="flex flex-col flex-1">
        <h3 className="font-bold text-base leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {card.title}
        </h3>
        {card.excerpt && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
            {card.excerpt}
          </p>
        )}
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {new Date(card.date).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={copyLink}
            aria-label="Скопировать ссылку на материал"
            title={copied ? "Ссылка скопирована" : "Скопировать ссылку"}
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs text-muted-foreground hover:text-primary hover:bg-[#F0F4FF] transition-colors"
          >
            {copied ? (
              <>
                <Check size={13} className="text-green-600" />
                <span className="text-green-600">Скопировано</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Ссылка</span>
              </>
            )}
          </button>
          <Link
            to={url}
            aria-label="Открыть материал"
            className="p-1.5 rounded-full text-muted-foreground hover:text-primary hover:bg-[#F0F4FF] transition-colors"
          >
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function KnowledgeBasePage() {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [themes, setThemes] = useState<WPTerm[]>([]);
  const [countries, setCountries] = useState<WPTerm[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [activeTheme, setActiveTheme] = useState<number | null>(null);
  const [activeCountry, setActiveCountry] = useState<number | null>(null);
  const [showAllThemes, setShowAllThemes] = useState(false);
  const [showAllCountries, setShowAllCountries] = useState(false);
  const [visible, setVisible] = useState(24);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    Promise.all([
      loadCards(),
      loadTerms("card_themes"),
      loadTerms("card_countries"),
    ]).then(([c, t, co]) => {
      setCards(c);
      setThemes(t);
      setCountries(co);
      setLoading(false);
    });
  }, []);

  // Предвыбор страны при переходе со страницы страны: /knowledge?country=Германия
  useEffect(() => {
    const wanted = searchParams.get("country");
    if (!wanted || !countries.length) return;
    const term = countries.find((c) => norm(c.name) === norm(wanted));
    if (term) {
      setActiveCountry(term.id);
      setActiveTheme(null);
      setQuery("");
    }
  }, [searchParams, countries]);

  const isSearching = query.trim().length >= MIN_QUERY;

  const displayed = useMemo(() => {
    if (isSearching) return searchCards(query, cards, themes, countries);
    return cards.filter((c) => {
      if (activeTheme && !c.themes.includes(activeTheme)) return false;
      if (activeCountry && !c.countries.includes(activeCountry)) return false;
      return true;
    });
  }, [isSearching, query, activeTheme, activeCountry, cards, themes, countries]);

  function handleSearch(val: string) {
    setQuery(val);
    setActiveTheme(null);
    setActiveCountry(null);
    setVisible(24);
  }

  function clearAll() {
    setQuery("");
    setActiveTheme(null);
    setActiveCountry(null);
    setVisible(24);
  }

  const paged = displayed.slice(0, visible);
  const hasMore = displayed.length > visible;
  const hasFilter = !!(query || activeTheme !== null || activeCountry !== null);
  const rest = displayed.length - visible;
  const missing = MIN_QUERY - query.length;

  const THEME_LIMIT = showAllThemes ? themes.length : 10;
  const COUNTRY_LIMIT = showAllCountries ? countries.length : 8;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-[#F0F4FF] border-b border-border/40 py-14 md:py-20">
        <div className="container-kovcheg">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-primary shadow-soft mb-5">
              <BookOpen size={13} />
              {loading
                ? "Загружаем…"
                : `${cards.length} ${plural(cards.length, MATERIALS)}`}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              База знаний
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl">
              Инструкции, вебинары и гайды по юридическим вопросам, жизни в
              эмиграции и трудоустройству в разных странах. Введите ключевое
              слово или выберите тему и страну.
            </p>

            {/* Search bar */}
            <div className="relative max-w-xl">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Search size={18} className="text-muted-foreground" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder='Например: «ВНЖ Германия», «открыть счёт», «убежище»'
                className="w-full pl-11 pr-10 py-3.5 rounded-2xl border border-[#D9E3FF] bg-white text-sm outline-none focus:border-primary shadow-soft placeholder:text-muted-foreground/60"
              />
              {query && (
                <button
                  onClick={clearAll}
                  aria-label="Очистить поиск"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            {isSearching && !loading && (
              <p className="mt-2.5 text-xs text-muted-foreground flex items-center gap-1.5">
                <Search size={11} className="text-primary" />
                Найдено: {displayed.length} {plural(displayed.length, MATERIALS)}
              </p>
            )}
            {query.length > 0 && query.length < MIN_QUERY && (
              <p className="mt-2.5 text-xs text-muted-foreground">
                Ещё {missing} {plural(missing, SYMBOLS)} для поиска…
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Sidebar + grid */}
      <div className="container-kovcheg py-12">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Sidebar */}
          {!loading && !isSearching && (
            <aside className="lg:w-56 xl:w-64 shrink-0">

              {hasFilter && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Фильтры
                    </span>
                    <button
                      onClick={clearAll}
                      className="text-xs text-primary hover:underline"
                    >
                      Сбросить
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeTheme !== null && (
                      <button
                        onClick={() => setActiveTheme(null)}
                        className="inline-flex items-center gap-1 text-xs bg-primary text-white px-3 py-1 rounded-full"
                      >
                        {themes.find((t) => t.id === activeTheme)?.name}
                        <X size={10} />
                      </button>
                    )}
                    {activeCountry !== null && (
                      <button
                        onClick={() => setActiveCountry(null)}
                        className="inline-flex items-center gap-1 text-xs bg-[#6F8DFF] text-white px-3 py-1 rounded-full"
                      >
                        {countries.find((c) => c.id === activeCountry)?.name}
                        <X size={10} />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Themes */}
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  Тема
                </p>
                <div className="space-y-1">
                  <button
                    onClick={() => { setActiveTheme(null); setVisible(24); }}
                    className={`w-full text-left text-sm px-3 py-2 rounded-xl transition-colors ${
                      activeTheme === null
                        ? "bg-primary text-white font-semibold"
                        : "hover:bg-muted text-foreground/70"
                    }`}
                  >
                    Все темы
                  </button>
                  {themes.slice(0, THEME_LIMIT).map((t) => (
                    <button
                      key={t.id}
                      onClick={() => { setActiveTheme(t.id); setActiveCountry(null); setVisible(24); }}
                      className={`w-full text-left text-sm px-3 py-2 rounded-xl transition-colors flex items-center justify-between ${
                        activeTheme === t.id
                          ? "bg-primary text-white font-semibold"
                          : "hover:bg-muted text-foreground/70"
                      }`}
                    >
                      <span className="truncate">{t.name}</span>
                      <span className={`text-xs shrink-0 ml-1 ${activeTheme === t.id ? "text-white/70" : "text-muted-foreground"}`}>
                        {t.count}
                      </span>
                    </button>
                  ))}
                  {themes.length > 10 && (
                    <button
                      onClick={() => setShowAllThemes(!showAllThemes)}
                      className="w-full text-left text-xs text-primary px-3 py-1.5 flex items-center gap-1 hover:underline"
                    >
                      {showAllThemes ? "Скрыть" : `Ещё ${themes.length - 10}`}
                      <ChevronDown size={11} className={showAllThemes ? "rotate-180 transition-transform" : "transition-transform"} />
                    </button>
                  )}
                </div>
              </div>

              {/* Countries */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  Страна
                </p>
                <div className="space-y-1">
                  <button
                    onClick={() => { setActiveCountry(null); setVisible(24); }}
                    className={`w-full text-left text-sm px-3 py-2 rounded-xl transition-colors ${
                      activeCountry === null
                        ? "bg-[#6F8DFF] text-white font-semibold"
                        : "hover:bg-muted text-foreground/70"
                    }`}
                  >
                    Все страны
                  </button>
                  {countries.slice(0, COUNTRY_LIMIT).map((c) => (
                    <button
                      key={c.id}
                      onClick={() => { setActiveCountry(c.id); setActiveTheme(null); setVisible(24); }}
                      className={`w-full text-left text-sm px-3 py-2 rounded-xl transition-colors flex items-center justify-between ${
                        activeCountry === c.id
                          ? "bg-[#6F8DFF] text-white font-semibold"
                          : "hover:bg-muted text-foreground/70"
                      }`}
                    >
                      <span className="truncate">{c.name}</span>
                      <span className={`text-xs shrink-0 ml-1 ${activeCountry === c.id ? "text-white/70" : "text-muted-foreground"}`}>
                        {c.count}
                      </span>
                    </button>
                  ))}
                  {countries.length > 8 && (
                    <button
                      onClick={() => setShowAllCountries(!showAllCountries)}
                      className="w-full text-left text-xs text-[#6F8DFF] px-3 py-1.5 flex items-center gap-1 hover:underline"
                    >
                      {showAllCountries ? "Скрыть" : `Ещё ${countries.length - 8}`}
                      <ChevronDown size={11} className={showAllCountries ? "rotate-180 transition-transform" : "transition-transform"} />
                    </button>
                  )}
                </div>
              </div>
            </aside>
          )}

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <Loader2 size={36} className="text-primary animate-spin" />
                <p className="text-muted-foreground text-sm">Загружаем базу знаний…</p>
              </div>
            ) : displayed.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-4xl mb-3">🔍</p>
                <p className="font-semibold mb-1">Ничего не найдено</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Попробуйте другое ключевое слово или выберите тему в списке слева
                </p>
                <button
                  onClick={clearAll}
                  className="text-sm text-primary hover:underline"
                >
                  Сбросить фильтры
                </button>
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-6">
                  {isSearching
                    ? `Поиск по «${query}»: ${displayed.length} ${plural(displayed.length, MATERIALS)}`
                    : activeTheme !== null
                    ? `${displayed.length} ${plural(displayed.length, MATERIALS)} — тема «${themes.find((t) => t.id === activeTheme)?.name}»`
                    : activeCountry !== null
                    ? `${displayed.length} ${plural(displayed.length, MATERIALS)} — страна «${countries.find((c) => c.id === activeCountry)?.name}»`
                    : `Все материалы: ${displayed.length}`}
                </p>

                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {paged.map((card, i) => (
                    <KnowledgeCard
                      key={card.id}
                      card={card}
                      themes={themes}
                      countries={countries}
                      highlight={isSearching && i === 0}
                    />
                  ))}
                </div>

                {hasMore && (
                  <div className="text-center mt-10">
                    <button
                      onClick={() => setVisible((v) => v + 24)}
                      className="bg-muted text-foreground px-8 py-3 rounded-full font-medium hover:bg-[#D9E3FF] transition-colors"
                    >
                      Показать ещё ({rest} {plural(rest, MATERIALS)})
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
