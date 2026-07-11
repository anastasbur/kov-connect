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

        <div className="text-center mt-10">
          <button
            onClick={() => navigate(`/country/${COUNTRIES[0].slug}`)}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors"
          >
            Найти свою страну
          </button>
        </div>
      </div>
    </section>
  );
};
