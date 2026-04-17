import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Fuse from "fuse.js";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { COUNTRIES } from "@/data/countries";
import { Search, Users, Briefcase, AlertCircle, MapPin, ExternalLink } from "lucide-react";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type TabId = "map" | "prof" | "biz" | "vulnerable";

const TABS: { id: TabId; label: string }[] = [
  { id: "map", label: "По странам" },
  { id: "prof", label: "По профессиям" },
  { id: "biz", label: "Предприниматели" },
  { id: "vulnerable", label: "Уязвимые группы" },
];

type SearchHit =
  | { kind: "country"; countrySlug: string; countryName: string; flag: string; title: string; subtitle: string }
  | { kind: "business"; countrySlug: string; countryName: string; flag: string; title: string; subtitle: string }
  | { kind: "resource"; countrySlug: string; countryName: string; flag: string; title: string; subtitle: string };

const buildSearchIndex = (): SearchHit[] => {
  const hits: SearchHit[] = [];
  for (const c of COUNTRIES) {
    hits.push({
      kind: "country",
      countrySlug: c.slug,
      countryName: c.nameRu,
      flag: c.flag,
      title: c.nameRu,
      subtitle: c.mapDescription,
    });
    for (const b of c.businesses) {
      hits.push({
        kind: "business",
        countrySlug: c.slug,
        countryName: c.nameRu,
        flag: c.flag,
        title: b.name,
        subtitle: `${b.category} · ${b.address || c.nameRu}`,
      });
    }
    for (const r of c.resources) {
      hits.push({
        kind: "resource",
        countrySlug: c.slug,
        countryName: c.nameRu,
        flag: c.flag,
        title: r.title,
        subtitle: r.description,
      });
    }
  }
  return hits;
};

export default function CommunitiesPage() {
  const navigate = useNavigate();
  const initialTab = (typeof window !== "undefined"
    ? (window.location.hash.replace("#", "") as TabId)
    : "map") || "map";
  const [activeTab, setActiveTab] = useState<TabId>(
    TABS.some((t) => t.id === initialTab) ? initialTab : "map"
  );
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace("#", "") as TabId;
      if (TABS.some((t) => t.id === h)) setActiveTab(h);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const setTab = (id: TabId) => {
    setActiveTab(id);
    window.history.replaceState(null, "", `#${id}`);
  };

  const index = useMemo(buildSearchIndex, []);
  const fuse = useMemo(
    () =>
      new Fuse(index, {
        keys: [
          { name: "title", weight: 0.5 },
          { name: "countryName", weight: 0.35 },
          { name: "subtitle", weight: 0.15 },
        ],
        threshold: 0.38,
        ignoreLocation: true,
        minMatchCharLength: 2,
      }),
    [index]
  );

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query.trim()).slice(0, 24).map((r) => r.item);
  }, [fuse, query]);

  const grouped = useMemo(() => {
    const g = { country: [] as SearchHit[], business: [] as SearchHit[], resource: [] as SearchHit[] };
    for (const r of results) g[r.kind].push(r);
    return g;
  }, [results]);

  // unique profession chats across countries
  const professionChats = useMemo(() => {
    const map = new Map<string, { label: string; url: string; countries: string[] }>();
    for (const c of COUNTRIES) {
      for (const chat of c.professionalChats) {
        const key = chat.label.trim();
        if (!map.has(key)) map.set(key, { label: chat.label, url: chat.url, countries: [c.nameRu] });
        else map.get(key)!.countries.push(c.nameRu);
      }
    }
    return Array.from(map.values()).sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="container-kovcheg pt-12 pb-6 md:pt-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">
            Сообщества
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            Найди своих
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Карта диаспор, профессиональные чаты, бизнесы и ресурсы — всё в одном месте.
          </p>
        </section>

        {/* Search */}
        <section className="container-kovcheg pb-4">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск: страна, город, бизнес, ресурс…"
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-card text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40 transition"
            />
          </div>

          {query.trim() && (
            <div className="mt-6 max-w-3xl space-y-6">
              {results.length === 0 && (
                <p className="text-muted-foreground">Ничего не найдено по запросу «{query}».</p>
              )}
              {grouped.country.length > 0 && (
                <ResultGroup title="Страны" items={grouped.country} navigate={navigate} />
              )}
              {grouped.business.length > 0 && (
                <ResultGroup title="Бизнесы" items={grouped.business} navigate={navigate} />
              )}
              {grouped.resource.length > 0 && (
                <ResultGroup title="Ресурсы и помощь" items={grouped.resource} navigate={navigate} />
              )}
            </div>
          )}
        </section>

        {/* Tabs */}
        <section className="container-kovcheg pt-6 border-b border-border">
          <div className="flex flex-wrap gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTab(tab.id)}
                className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* Tab content */}
        <section className="container-kovcheg py-10">
          {activeTab === "map" && (
            <div className="bg-card rounded-2xl border border-border p-4 md:p-8 shadow-sm">
              <ComposableMap
                projectionConfig={{ scale: 155 }}
                style={{ width: "100%", height: "auto" }}
              >
                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        style={{
                          default: {
                            fill: "hsl(var(--muted))",
                            stroke: "hsl(var(--border))",
                            strokeWidth: 0.5,
                            outline: "none",
                          },
                          hover: { fill: "hsl(var(--muted))", outline: "none" },
                          pressed: { outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>

                {COUNTRIES.map((country) => (
                  <Marker
                    key={country.slug}
                    coordinates={country.coordinates}
                    onClick={() => navigate(`/country/${country.slug}`)}
                    style={{
                      default: { cursor: "pointer" },
                      hover: { cursor: "pointer" },
                      pressed: { cursor: "pointer" },
                    }}
                  >
                    <g className="group">
                      <circle
                        r={6}
                        fill="hsl(var(--primary))"
                        stroke="hsl(var(--background))"
                        strokeWidth={2}
                        className="transition-all group-hover:r-[9px]"
                      />
                      <title>{country.nameRu}</title>
                    </g>
                  </Marker>
                ))}
              </ComposableMap>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {COUNTRIES.map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => navigate(`/country/${c.slug}`)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-foreground/85 hover:bg-muted hover:text-primary transition-colors text-left"
                  >
                    <span>{c.flag}</span>
                    <span className="truncate">{c.nameRu}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === "prof" && (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Профессиональные сообщества</h2>
              <p className="text-muted-foreground mb-6">
                Чаты Ковчега по профессиям — открыты для участников из всех стран.
              </p>
              <div className="flex flex-wrap gap-3">
                {professionChats.map((chat) => (
                  <a
                    key={chat.label + chat.url}
                    href={chat.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-card border border-border text-foreground px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                  >
                    <Users className="h-4 w-4" />
                    {chat.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          {activeTab === "biz" && (
            <div className="text-center py-12">
              <Briefcase className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Ковчег Бизнес</h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Закрытое сообщество предпринимателей в эмиграции — нетворкинг, экспертиза, обмен опытом.
              </p>
              <button
                onClick={() => navigate("/business")}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors"
              >
                Перейти в раздел
              </button>
            </div>
          )}

          {activeTab === "vulnerable" && (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Уязвимые группы</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Раздел в разработке. Скоро здесь появятся ресурсы и контакты для ЛГБТК+, женщин в опасности,
                политически преследуемых и других уязвимых групп.
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

function ResultGroup({
  title,
  items,
  navigate,
}: {
  title: string;
  items: SearchHit[];
  navigate: ReturnType<typeof useNavigate>;
}) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">
        {title}
      </p>
      <div className="space-y-1">
        {items.map((it, i) => (
          <button
            key={i}
            onClick={() => navigate(`/country/${it.countrySlug}`)}
            className="w-full text-left flex items-start gap-3 p-3 rounded-xl border border-border bg-card hover:border-primary hover:bg-muted transition-colors"
          >
            <span className="text-xl leading-none mt-0.5">{it.flag}</span>
            <span className="flex-1 min-w-0">
              <span className="block text-sm font-semibold text-foreground truncate">{it.title}</span>
              <span className="block text-xs text-muted-foreground truncate">
                {it.subtitle}
              </span>
              <span className="mt-1 inline-flex items-center gap-1 text-xs text-primary">
                <MapPin className="h-3 w-3" />
                {it.countryName}
              </span>
            </span>
            <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
          </button>
        ))}
      </div>
    </div>
  );
}
