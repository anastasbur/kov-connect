import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { COUNTRIES } from "@/data/countries";
import { Send, Users, Briefcase, Heart, Search, ArrowUpRight } from "lucide-react";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const professionalChats = [
  { label: "IT", icon: "💻", url: "https://t.me/+aRU_kJiTI9o2MWMy", desc: "Разработчики, тестировщики, продакты" },
  { label: "Инженеры", icon: "⚙️", url: "https://t.me/+t4LBbOMxUVNiYjdk", desc: "Технические специалисты" },
  { label: "Специалисты", icon: "🎯", url: "https://t.me/+JyVAVMhWSwVkMGFk", desc: "Широкий круг профессий" },
  { label: "Деятели культуры", icon: "🎨", url: "https://t.me/+3LH7WzPB4Z8zMTc8", desc: "Художники, музыканты, журналисты" },
  { label: "Учёные", icon: "🔬", url: "https://t.me/+XqPZMa2M80VmZmQ6", desc: "Естественные и точные науки" },
  { label: "Учёные-гуманитарии", icon: "📚", url: "https://t.me/+tIX3h0qZrRE4ZjI0", desc: "Гуманитарные и социальные науки" },
  { label: "Врачи", icon: "🏥", url: "https://t.me/+CvL1yEfw7_cxMGI6", desc: "Медицинские работники" },
  { label: "Психологи", icon: "🧠", url: "https://t.me/Psy_Ark/", desc: "Психологи и психотерапевты" },
];

const otherChats = [
  { label: "Абитуриенты", url: "https://t.me/+Q_p3gcBo39Q3NDNi" },
  { label: "Медицина", url: "https://t.me/kovcheg_med" },
  { label: "Переезд с животными", url: "https://t.me/ark_pets" },
  { label: "Пристройство животных", url: "https://t.me/+EMB0vpOafDBjZmRi" },
  { label: "Родители", url: "https://t.me/most_online_obrazovanie" },
  { label: "Языки", url: "https://t.me/kovcheg_lang" },
  { label: "Флудилка", url: "https://t.me/+6TCdU9XjI9I4YTVk" },
  { label: "Эмиграция с инвалидностью", url: "https://t.me/+S94g_Y8H0Pc5Mjcy" },
  { label: "ЛГБТК+ взаимопомощь", url: "https://t.me/+d4pT5gmQfbtlNmEy" },
];

const offlineChats = [
  { label: "Германия | Hallo!", url: "https://t.me/+Kfdt61bvKAxjYTc0" },
  { label: "Грузия | გამარჯობა", url: "https://t.me/+DyOsdHjy6EAwMWQ8" },
  { label: "Испания | ¡Hola!", url: "https://t.me/+H1q0hS75jW45N2Y8" },
  { label: "Сербия | Zdravo!", url: "https://t.me/+pj2_2UXUFPU5YzM0" },
];

const interestClubs = [
  { label: "📖 Книжный клуб", url: "https://t.me/ArkHelps" },
  { label: "♟ Шахматный клуб", url: "https://t.me/ArkHelps" },
  { label: "🎭 История искусств", url: "https://t.me/ArkHelps" },
  { label: "🤔 Философия", url: "https://t.me/ArkHelps" },
];

export default function CommunitiesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredCountries = COUNTRIES.filter((c) =>
    c.nameRu.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-[#F0F4FF] border-b border-border/40 py-14 md:py-20">
        <div className="container-kovcheg">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-primary shadow-soft mb-5">
              <Users size={13} />
              49 стран · 8 профессий · офлайн встречи
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Сообщества Ковчега
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
              Чаты взаимопомощи по странам, профессиональные сообщества, клубы
              по интересам и офлайн-встречи. Найдите своих — где бы вы ни были.
            </p>
          </div>
        </div>
      </section>

      <main className="container-kovcheg py-16 space-y-20">

        {/* ── World Map ────────────────────────────────────── */}
        <section id="map">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-2">По странам</p>
            <h2 className="text-3xl font-extrabold tracking-tight mb-2">Найдите чат своей страны</h2>
            <p className="text-muted-foreground">Нажмите на пин, чтобы перейти на страницу страны с чатами, ресурсами и местами.</p>
          </div>

          <div className="rounded-3xl overflow-hidden border border-border/40 bg-card shadow-soft mb-6">
            <ComposableMap projection="geoNaturalEarth1" style={{ width: "100%", height: "auto" }}>
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography key={geo.rsmKey} geography={geo}
                      fill="#D9E3FF" stroke="#fff" strokeWidth={0.5}
                      style={{ default: { outline: "none" }, hover: { outline: "none", fill: "#74A8E7" }, pressed: { outline: "none" } }}
                    />
                  ))
                }
              </Geographies>
              {COUNTRIES.map((c) => (
                <Marker key={c.slug} coordinates={c.coordinates} onClick={() => navigate(`/country/${c.slug}`)}>
                  <g style={{ cursor: "pointer" }} transform="translate(-8,-20)">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 5.25 8 16 8 16s8-10.75 8-16c0-4.42-3.58-8-8-8z" fill="#FF9500" stroke="#fff" strokeWidth="1.5" />
                    <circle cx="8" cy="8" r="3" fill="#fff" />
                  </g>
                  <title>{c.nameRu}</title>
                </Marker>
              ))}
            </ComposableMap>
          </div>

          {/* Country search + grid */}
          <div className="relative max-w-sm mb-6">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Найти страну..."
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-[#D9E3FF] bg-white text-sm outline-none focus:border-primary"
            />
          </div>

          <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filteredCountries.map((c) => (
              <button
                key={c.slug}
                onClick={() => navigate(`/country/${c.slug}`)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-2xl border border-border/40 bg-card hover:border-primary hover:bg-[#F0F4FF] transition-colors text-left group"
              >
                <span className="text-lg">{c.flag}</span>
                <span className="text-sm font-medium group-hover:text-primary transition-colors truncate">{c.nameRu}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ── Professional chats ───────────────────────────── */}
        <section id="prof">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-2">По профессиям</p>
            <h2 className="text-3xl font-extrabold tracking-tight mb-2">Профессиональные сообщества</h2>
            <p className="text-muted-foreground">Закрытые чаты для специалистов — без географических границ.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {professionalChats.map((chat) => (
              <a key={chat.label} href={chat.url} target="_blank" rel="noopener noreferrer"
                className="group flex items-start gap-3 p-5 rounded-3xl border border-border/40 bg-card shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all">
                <span className="text-2xl">{chat.icon}</span>
                <div>
                  <p className="font-bold text-sm group-hover:text-primary transition-colors">{chat.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{chat.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── Kovcheg Business ─────────────────────────────── */}
        <section id="biz">
          <div className="rounded-3xl bg-gradient-to-br from-primary to-[#1d3f9a] p-8 md:p-12 text-white">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-secondary mb-3">Предпринимателям</p>
                <h2 className="text-3xl font-extrabold mb-4">Ковчег Бизнес</h2>
                <p className="text-white/80 leading-relaxed mb-6">
                  Сообщество фаундеров, предпринимателей и экспертов, которые
                  развивают своё дело за рубежом. Нетворкинг, база знаний,
                  консультации, интеграция в международную среду.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="/business"
                    className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#F0F4FF] transition-colors">
                    Узнать подробности <ArrowUpRight size={13} />
                  </a>
                  <a href="https://t.me/ark_financial" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-white/10 transition-colors">
                    <Send size={13} /> Telegram-канал
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {["Нетворкинг-встречи", "База знаний", "Консультации экспертов", "Закрытый чат"].map((item) => (
                  <div key={item} className="bg-white/10 rounded-2xl p-4 text-sm font-medium">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Interest clubs ───────────────────────────────── */}
        <section>
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-2">По интересам</p>
            <h2 className="text-3xl font-extrabold tracking-tight mb-2">Клубы по интересам</h2>
            <p className="text-muted-foreground">Книжные и шахматные клубы, лекции по истории искусств и философии. Мы будем рады вашим пожеланиям по темам!</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {interestClubs.map((club) => (
              <a key={club.label} href={club.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-muted px-5 py-3 rounded-full text-sm font-medium hover:bg-[#D9E3FF] hover:text-primary transition-colors">
                {club.label}
              </a>
            ))}
            <a href="https://t.me/EmigrantHelpBot" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 border border-dashed border-border px-5 py-3 rounded-full text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors">
              + Предложить клуб
            </a>
          </div>
        </section>

        {/* ── Offline meetings ─────────────────────────────── */}
        <section>
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-2">Офлайн</p>
            <h2 className="text-3xl font-extrabold tracking-tight mb-2">Встречи вживую</h2>
            <p className="text-muted-foreground">Регулярные офлайн-встречи в нескольких городах.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {offlineChats.map((chat) => (
              <a key={chat.label} href={chat.url} target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-3 p-5 rounded-3xl border border-border/40 bg-card shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all">
                <Send size={18} className="text-primary shrink-0" />
                <span className="text-sm font-medium group-hover:text-primary transition-colors">{chat.label}</span>
              </a>
            ))}
          </div>
        </section>

        {/* ── Other chats ──────────────────────────────────── */}
        <section>
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-2">Другие чаты</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Тематические чаты</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {otherChats.map((chat) => (
              <a key={chat.label} href={chat.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-muted px-4 py-2 rounded-full text-sm font-medium hover:bg-[#D9E3FF] hover:text-primary transition-colors">
                <Send size={11} className="text-primary" /> {chat.label}
              </a>
            ))}
          </div>
        </section>

        {/* ── First Flight ─────────────────────────────────── */}
        <section className="rounded-3xl border border-border/40 bg-card p-8 md:p-10 shadow-soft">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Гражданское участие</p>
              <h3 className="text-2xl font-extrabold mb-3">«Первым рейсом»</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Сообщество инициативных россиян, стремящихся участвовать в
                создании демократического будущего. Курсы, дебаты, клубы,
                объединение вокруг инициатив. Небольшой отбор участников для
                безопасной среды.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <a href="https://t.me/thefirstflight" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-primary/90 transition-colors">
                <Send size={13} /> Подписаться на канал
              </a>
              <a href="https://firstflight.today/join/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                Подать заявку <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
