import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getCountryBySlug, COUNTRIES } from "@/data/countries";
import {
  ExternalLink,
  MapPin,
  Phone,
  Users,
  AlertCircle,
  Heart,
  Home,
  Scale,
} from "lucide-react";

type Tab = "communities" | "businesses" | "help";

const ICON_MAP = {
  emergency: AlertCircle,
  legal: Scale,
  medical: Heart,
  housing: Home,
  community: Users,
};

const ICON_COLORS = {
  emergency: "text-red-500 bg-red-50",
  legal: "text-primary bg-[#D9E3FF]",
  medical: "text-green-600 bg-green-50",
  housing: "text-orange-500 bg-orange-50",
  community: "text-[#6F8DFF] bg-[#F0F4FF]",
};

export default function CountryPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const country = getCountryBySlug(slug || "");
  const [activeTab, setActiveTab] = useState<Tab>("communities");

  if (!country) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-bold mb-4">Страна не найдена</p>
            <button
              onClick={() => navigate("/")}
              className="text-primary underline"
            >
              На главную
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "communities", label: "Сообщества" },
    { id: "businesses", label: "Бизнесы" },
    { id: "help", label: "Помощь" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Country selector header */}
      <div className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-xl">
        <div className="container-kovcheg flex h-16 items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <span className="text-xl font-extrabold tracking-tight text-primary">
              ⚓ КОВЧЕГ
            </span>
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/communities")}
              className="hidden md:block text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ← Все страны
            </button>
            <select
              value={slug}
              onChange={(e) => navigate(`/country/${e.target.value}`)}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold cursor-pointer border-0 outline-none"
            >
              {COUNTRIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.flag} {c.nameRu}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-[#F0F4FF] border-b border-border/40">
        <div className="container-kovcheg py-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
            {country.flag} {country.nameRu}
          </h1>
          <p className="text-muted-foreground mb-6 max-w-xl">
            {country.mapDescription}
          </p>
          <div className="flex gap-2 max-w-md">
            <input
              type="text"
              placeholder="Поиск по стране..."
              className="flex-1 px-4 py-2.5 rounded-2xl border border-[#D9E3FF] bg-white text-sm outline-none focus:border-primary"
            />
            <button className="bg-primary text-primary-foreground px-4 py-2.5 rounded-2xl text-sm font-medium">
              🔍
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 z-40 bg-background border-b border-border/40">
        <div className="container-kovcheg flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 container-kovcheg py-12 space-y-12">

        {/* COMMUNITIES TAB */}
        {activeTab === "communities" && (
          <>
            <section>
              <h2 className="text-2xl font-bold mb-5">
                Главное сообщество в {country.nameRu}
              </h2>
              <div className="bg-[#F0F4FF] rounded-3xl p-7 flex flex-col md:flex-row md:items-center gap-6 border border-[#D9E3FF]">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">💬</span>
                    <h3 className="font-bold text-lg">
                      Чат взаимопомощи для россиян в {country.nameRu}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-5">
                    Новости, советы, знакомства, вопросы.
                  </p>
                  <a
                    href={country.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#FF9500] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-orange-600 transition-colors"
                  >
                    Вступить в чат
                  </a>
                </div>
              </div>
            </section>

            {country.professionalChats.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-2">
                  Профессиональные сообщества
                </h2>
                <p className="text-muted-foreground text-sm mb-5">
                  Чаты Ковчега по профессиям — открыты для всех стран
                </p>
                <div className="flex flex-wrap gap-3">
                  {country.professionalChats.map((chat) => (
                    <a
                      key={chat.label}
                      href={chat.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-[#D9E3FF] text-primary px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-colors"
                    >
                      {chat.label}
                    </a>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* BUSINESSES TAB */}
        {activeTab === "businesses" && (
          <section>
            <h2 className="text-2xl font-bold mb-1">Бизнесы наших</h2>
            <p className="text-muted-foreground text-sm mb-7">
              Место, где говорят по-русски
            </p>
            {country.businesses.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-3">
                {country.businesses.map((biz, i) => (
                  <div
                    key={i}
                    className="rounded-3xl overflow-hidden border border-border/40 bg-card shadow-soft hover:shadow-elevated transition-all hover:-translate-y-1"
                  >
                    <div className="h-40 bg-[#D9E3FF] flex items-center justify-center text-5xl">
                      {biz.category.toLowerCase().includes("кафе") ||
                      biz.category.toLowerCase().includes("ресторан") ||
                      biz.category.toLowerCase().includes("бар")
                        ? "☕"
                        : biz.category.toLowerCase().includes("книг")
                        ? "📚"
                        : biz.category.toLowerCase().includes("клиник") ||
                          biz.category.toLowerCase().includes("медиц")
                        ? "🏥"
                        : biz.category.toLowerCase().includes("коворк")
                        ? "💻"
                        : biz.category.toLowerCase().includes("доставк")
                        ? "🍱"
                        : "🏪"}
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold mb-1">{biz.name}</h3>
                      <p className="text-xs text-muted-foreground mb-3">
                        {biz.category}
                      </p>
                      {biz.address && biz.address !== country.nameRu && (
                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin size={12} /> {biz.address}
                        </p>
                      )}
                      {biz.phone && (
                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                          <Phone size={12} /> {biz.phone}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-border p-10 text-center">
                <p className="text-lg font-medium mb-2 text-muted-foreground">
                  Бизнесы пока не добавлены
                </p>
                <p className="text-sm text-muted-foreground">
                  Знаете место? Расскажите нам!
                </p>
              </div>
            )}
          </section>
        )}

        {/* HELP TAB */}
        {activeTab === "help" && (
          <section>
            <h2 className="text-2xl font-bold mb-1">
              Полезные ресурсы и контакты
            </h2>
            <p className="text-muted-foreground text-sm mb-7">
              Куда обращаться за помощью, документами, медициной и жильём
            </p>
            {country.resources.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {country.resources.map((res, i) => {
                  const Icon = ICON_MAP[res.icon] || Users;
                  const color = ICON_COLORS[res.icon] || ICON_COLORS.community;
                  return (
                    <div
                      key={i}
                      className="flex gap-4 p-5 rounded-3xl border border-border/40 bg-card shadow-soft hover:shadow-elevated transition-all"
                    >
                      <div className={`p-3 rounded-2xl shrink-0 ${color}`}>
                        <Icon size={20} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-sm mb-1">
                          {res.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                          {res.description}
                        </p>
                        {res.url && (
                          <a
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                          >
                            Открыть <ExternalLink size={11} />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                Ресурсы для этой страны пока добавляются.
              </p>
            )}
          </section>
        )}

        {/* CTA */}
        <section className="rounded-3xl bg-primary p-8 md:p-10 text-center text-primary-foreground">
          <h3 className="text-xl font-bold mb-2">Не нашли что искали?</h3>
          <p className="text-primary-foreground/70 text-sm mb-6">
            Знаете полезную организацию или место в {country.nameRu}? Добавьте
            — поможете другим.
          </p>
          <a
            href="https://forms.gle/MuuyxgMsiA5NUEQD9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-[#F0F4FF] transition-colors"
          >
            Предложить место
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
