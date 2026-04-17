import { useState, useEffect, useCallback, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Search, X, ExternalLink, Loader2, BookOpen,
  Sparkles, Globe, Tag, ChevronDown
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

function strip(html: string) {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\[…\]/g, "…")
    .replace(/\u200b/g, "")
    .trim();
}

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

// ─── Claude semantic search ───────────────────────────────────────────────────

async function claudeSearch(query: string, cards: CardItem[]): Promise<number[]> {
  const index = cards
    .map((c) => `${c.id}|${c.title}|${c.excerpt.slice(0, 90)}`)
    .join("\n");

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 300,
        messages: [
          {
            role: "user",
            content:
              `Ты помощник в базе знаний для русскоязычных эмигрантов.\n\n` +
              `Запрос: "${query}"\n\n` +
              `Статьи (id|заголовок|описание):\n${index.slice(0, 9000)}\n\n` +
              `Верни JSON-массив из максимум 9 id самых релевантных статей. ` +
              `Только JSON, без пояснений: [id1,id2,...]`,
          },
        ],
      }),
    });
    if (!res.ok) return [];
    const data = await res.json();
    return JSON.parse(data.content?.[0]?.text?.trim() ?? "[]").map(Number);
  } catch {
    return [];
  }
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
  const themeNames = card.themes
    .map((id) => themes.find((t) => t.id === id)?.name)
    .filter(Boolean) as string[];
  const countryNames = card.countries
    .map((id) => countries.find((c) => c.id === id)?.name)
    .filter(Boolean) as string[];

  return (
    <a
      href={`https://kovcheg.live/cards/${card.slug}/`}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col rounded-3xl border bg-card p-6 shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all ${
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

      <h3 className="font-bold text-base leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
        {card.title}
      </h3>

      {card.excerpt && (
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {card.excerpt}
        </p>
      )}

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {new Date(card.date).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
        <ExternalLink
          size={14}
          className="text-muted-foreground group-hover:text-primary transition-colors shrink-0"
        />
      </div>
    </a>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function KnowledgeBasePage() {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [themes, setThemes] = useState<WPTerm[]>([]);
  const [countries, setCountries] = useState<WPTerm[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<number[] | null>(null);

  const [activeTheme, setActiveTheme] = useState<number | null>(null);
  const [activeCountry, setActiveCountry] = useState<number | null>(null);
  const [showAllThemes, setShowAllThemes] = useState(false);
  const [showAllCountries, setShowAllCountries] = useState(false);
  const [visible, setVisible] = useState(24);

  const timer = useRef<ReturnType<typeof setTimeout>>();

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

  const handleSearch = useCallback(
    (val: string) => {
      setQuery(val);
      setActiveTheme(null);
      setActiveCountry(null);
      clearTimeout(timer.current);
      if (!val.trim()) {
        setSearchResults(null);
        return;
      }
      if (val.trim().length < 3) return;
      timer.current = setTimeout(async () => {
        setSearching(true);
        setSearchResults(await claudeSearch(val, cards));
        setSearching(false);
        setVisible(24);
      }, 700);
    },
    [cards]
  );

  function clearAll() {
    setQuery("");
    setSearchResults(null);
    setActiveTheme(null);
    setActiveCountry(null);
    setVisible(24);
  }

  const displayed = (() => {
    if (searchResults !== null)
      return searchResults
        .map((id) => cards.find((c) => c.id === id))
        .filter(Boolean) as CardItem[];
    return cards.filter((c) => {
      if (activeTheme && !c.themes.includes(activeTheme)) return false;
      if (activeCountry && !c.countries.includes(activeCountry)) return false;
      return true;
    });
  })();

  const paged = displayed.slice(0, visible);
  const hasMore = displayed.length > visible;
  const hasFilter = !!(query || activeTheme !== null || activeCountry !== null);

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
              {loading ? "Загружаем…" : `${cards.length}+ материалов`}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              База знаний
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl">
              Инструкции, вебинары и гайды по юридическим вопросам, жизни в
              эмиграции и трудоустройству в разных странах. Введите вопрос —
              ИИ найдёт нужное.
            </p>

            {/* Search bar */}
            <div className="relative max-w-xl">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                {searching ? (
                  <Loader2 size={18} className="text-primary animate-spin" />
                ) : (
                  <Search size={18} className="text-muted-foreground" />
                )}
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder='Например: "ВНЖ в Германии", "открыть счёт", "убежище"'
                className="w-full pl-11 pr-10 py-3.5 rounded-2xl border border-[#D9E3FF] bg-white text-sm outline-none focus:border-primary shadow-soft placeholder:text-muted-foreground/60"
              />
              {query && (
                <button
                  onClick={clearAll}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            {!searching && searchResults !== null && query.length >= 3 && (
              <p className="mt-2.5 text-xs text-muted-foreground flex items-center gap-1.5">
                <Sparkles size={11} className="text-primary" />
                ИИ нашёл {searchResults.length} релевантных материалов
              </p>
            )}
            {query.length > 0 && query.length < 3 && (
              <p className="mt-2.5 text-xs text-muted-foreground">
                Ещё {3 - query.length} символа для поиска…
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Sidebar + grid */}
      <div className="container-kovcheg py-12">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Sidebar */}
          {!loading && !query && (
            <aside className="lg:w-56 xl:w-64 shrink-0">

              {/* Active filters */}
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
                  Попробуйте другой запрос или другую категорию
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
                  {searchResults !== null
                    ? `ИИ-поиск по «${query}»: ${displayed.length} материалов`
                    : activeTheme !== null
                    ? `${displayed.length} материалов — тема «${themes.find((t) => t.id === activeTheme)?.name}»`
                    : activeCountry !== null
                    ? `${displayed.length} материалов — страна «${countries.find((c) => c.id === activeCountry)?.name}»`
                    : `Все материалы: ${displayed.length}`}
                </p>

                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {paged.map((card, i) => (
                    <KnowledgeCard
                      key={card.id}
                      card={card}
                      themes={themes}
                      countries={countries}
                      highlight={searchResults !== null && i === 0}
                    />
                  ))}
                </div>

                {hasMore && (
                  <div className="text-center mt-10">
                    <button
                      onClick={() => setVisible((v) => v + 24)}
                      className="bg-muted text-foreground px-8 py-3 rounded-full font-medium hover:bg-[#D9E3FF] transition-colors"
                    >
                      Показать ещё ({displayed.length - visible} материалов)
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
