import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  ArrowLeft, Loader2, Copy, Check, Tag, Globe, Calendar, ArrowRight,
} from "lucide-react";

const WP = "https://kovcheg.live/wp-json/wp/v2";

interface Article {
  id: number;
  slug: string;
  title: string;
  content: string;
  date: string;
  themes: number[];
  countries: number[];
}

function stripTitle(html: string) {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8230;/g, "…")
    .replace(/&amp;/g, "&")
    .replace(/&laquo;/g, "«")
    .replace(/&raquo;/g, "»")
    .replace(/\u200b/g, "")
    .trim();
}

async function loadArticle(slug: string): Promise<Article | null> {
  const res = await fetch(
    `${WP}/card?slug=${encodeURIComponent(slug)}&status=publish` +
      `&_fields=id,slug,title,content,card_themes,card_countries,date`
  );
  if (!res.ok) return null;
  const data = await res.json();
  if (!Array.isArray(data) || !data.length) return null;
  const c = data[0];
  return {
    id: c.id,
    slug: c.slug,
    title: stripTitle(c.title?.rendered ?? ""),
    content: c.content?.rendered ?? "",
    date: c.date,
    themes: c.card_themes ?? [],
    countries: c.card_countries ?? [],
  };
}

async function loadTermNames(taxonomy: string, ids: number[]): Promise<string[]> {
  if (!ids.length) return [];
  const res = await fetch(
    `${WP}/${taxonomy}?include=${ids.join(",")}&per_page=100&_fields=id,name`
  );
  if (!res.ok) return [];
  const terms: { id: number; name: string }[] = await res.json();
  return terms.map((t) => t.name);
}

export default function KnowledgeArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [themeNames, setThemeNames] = useState<string[]>([]);
  const [countryNames, setCountryNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setArticle(null);
    window.scrollTo(0, 0);

    (async () => {
      const a = slug ? await loadArticle(slug) : null;
      if (cancelled) return;
      setArticle(a);
      setLoading(false);
      if (a) {
        document.title = `${a.title} — База знаний Ковчега`;
        const [th, co] = await Promise.all([
          loadTermNames("card_themes", a.themes),
          loadTermNames("card_countries", a.countries),
        ]);
        if (!cancelled) {
          setThemeNames(th);
          setCountryNames(co);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const copyLink = async () => {
    const url = `${window.location.origin}/knowledge/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 size={36} className="text-primary animate-spin" />
            <p className="text-muted-foreground text-sm">Загружаем материал…</p>
          </div>
        ) : !article ? (
          <div className="container-kovcheg py-24 text-center">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-xl font-bold mb-2">Материал не найден</p>
            <p className="text-sm text-muted-foreground mb-6">
              Возможно, ссылка устарела или материал был перемещён.
            </p>
            <Link
              to="/knowledge"
              className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline"
            >
              <ArrowLeft size={14} /> Вернуться в базу знаний
            </Link>
          </div>
        ) : (
          <>
            {/* Hero */}
            <section className="bg-[#F0F4FF] border-b border-border/40 py-10 md:py-14">
              <div className="container-kovcheg max-w-3xl">
                <Link
                  to="/knowledge"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
                >
                  <ArrowLeft size={14} /> База знаний
                </Link>

                {(themeNames.length > 0 || countryNames.length > 0) && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {themeNames.map((n) => (
                      <span
                        key={`t-${n}`}
                        className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-[#D9E3FF] text-primary font-medium"
                      >
                        <Tag size={9} />
                        {n}
                      </span>
                    ))}
                    {countryNames.map((n) => (
                      <span
                        key={`c-${n}`}
                        className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-white text-[#6F8DFF] font-medium"
                      >
                        <Globe size={9} />
                        {n}
                      </span>
                    ))}
                  </div>
                )}

                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4">
                  {article.title}
                </h1>

                <div className="flex items-center gap-4 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar size={12} />
                    {new Date(article.date).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <button
                    type="button"
                    onClick={copyLink}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-soft hover:text-primary transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check size={13} className="text-green-600" />
                        <span className="text-green-600">Ссылка скопирована</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} /> Скопировать ссылку
                      </>
                    )}
                  </button>
                </div>
              </div>
            </section>

            {/* Content */}
            <article className="container-kovcheg max-w-3xl py-10 md:py-14">
              <div
                className="prose prose-slate max-w-none
                  prose-headings:font-bold prose-headings:tracking-tight
                  prose-a:text-primary prose-a:font-medium hover:prose-a:underline
                  prose-img:rounded-2xl prose-img:shadow-soft
                  prose-strong:text-foreground
                  prose-li:my-1"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </article>

            {/* Footer CTA */}
            <section className="container-kovcheg max-w-3xl pb-16">
              <div className="rounded-3xl bg-muted/60 border border-border/40 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-semibold mb-0.5">Нужен другой материал?</p>
                  <p className="text-sm text-muted-foreground">
                    В базе знаний «Ковчега» — сотни инструкций и гайдов по темам и странам.
                  </p>
                </div>
                <Link
                  to="/knowledge"
                  className="inline-flex shrink-0 items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  Вся база знаний <ArrowRight size={14} />
                </Link>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
