import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { Search } from "lucide-react";
import { COUNTRIES } from "@/data/countries";

const norm = (s: string) => s.toLowerCase().replace(/ё/g, "е").trim();

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export const WorldMapSection = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  const matches = query.trim()
    ? COUNTRIES.filter((c) => norm(c.nameRu).includes(norm(query))).slice(0, 8)
    : [];

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const select = (slug: string) => {
    setOpen(false);
    setQuery("");
    navigate(`/country/${slug}`);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!matches.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx((i) => (i + 1) % matches.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActiveIdx((i) => (i - 1 + matches.length) % matches.length); }
    else if (e.key === "Enter") { e.preventDefault(); select(matches[activeIdx].slug); }
    else if (e.key === "Escape") setOpen(false);
  };


  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">
            География
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Мы рядом в десятках стран мира
          </h2>
          <p className="text-lg text-muted-foreground">
            Выберите страну, чтобы найти местные сообщества, помощь и контакты.
          </p>
        </div>

        <div className="max-w-6xl mx-auto bg-card rounded-2xl border border-border p-4 md:p-8 shadow-sm">
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
                      hover: {
                        fill: "hsl(var(--muted))",
                        outline: "none",
                      },
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
        </div>

        <div className="mt-10 flex justify-center">
          <div ref={wrapRef} className="relative w-full max-w-md">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setOpen(true); setActiveIdx(0); }}
                onFocus={() => setOpen(true)}
                onKeyDown={onKey}
                placeholder="Найти свою страну"
                className="w-full pl-11 pr-4 py-3 rounded-full border border-border bg-card text-sm outline-none focus:border-primary shadow-sm placeholder:text-muted-foreground"
              />
            </div>
            {open && matches.length > 0 && (
              <ul className="absolute z-20 mt-2 w-full max-h-72 overflow-auto rounded-2xl border border-border bg-card shadow-lg py-1">
                {matches.map((c, i) => (
                  <li key={c.slug}>
                    <button
                      onMouseEnter={() => setActiveIdx(i)}
                      onClick={() => select(c.slug)}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        i === activeIdx ? "bg-muted text-foreground" : "text-foreground/80 hover:bg-muted"
                      }`}
                    >
                      {c.nameRu}
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {open && query.trim() && matches.length === 0 && (
              <div className="absolute z-20 mt-2 w-full rounded-2xl border border-border bg-card shadow-lg px-4 py-3 text-sm text-muted-foreground">
                Ничего не найдено
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
