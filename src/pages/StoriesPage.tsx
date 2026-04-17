import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MapPin, ArrowUpRight } from "lucide-react";

// Placeholder stories — replace with real data from CMS or Google Sheet
const stories = [
  { id: 1, name: "Анна", city: "Тбилиси", country: "Грузия", year: "2022", type: "face", quote: "Ковчег нашёл мне жильё за один день. Через месяц я уже вела разговорный клуб для других.", initial: "А" },
  { id: 2, name: "Дмитрий", city: "Берлин", country: "Германия", year: "2022", type: "face", quote: "«Ковчег» дал мне крышу над головой, когда я уже жил на улице в Стамбуле.", initial: "Д" },
  { id: 3, name: "Мария", city: "Лиссабон", country: "Португалия", year: "2022", type: "face", quote: "Психологическая группа Ковчега помогла пережить самые тяжёлые месяцы. Здесь я встретила своих.", initial: "М" },
  { id: 4, name: "Алексей", city: "Варшава", country: "Польша", year: "2023", type: "face", quote: "В IT-чате нашёл первый контракт за границей. Сейчас сам помогаю новичкам.", initial: "А" },
  { id: 5, name: "Екатерина", city: "Белград", country: "Сербия", year: "2022", type: "face", quote: "Ковчег помог с документами и жильём. Теперь работаю координатором — хочу отдать обратно.", initial: "Е" },
  { id: 6, name: "Игорь", city: "Ереван", country: "Армения", year: "2022", type: "face", quote: "Я уехал с одним чемоданом. Чат Ковчега по Армении был первым местом, где мне объяснили как тут жить.", initial: "И" },
  { id: 7, name: "Наташа", city: "Амстердам", country: "Нидерланды", year: "2023", type: "face", quote: "После курса по Python из Ковчега нашла работу за три месяца. Не верила, что это возможно.", initial: "Н" },
  { id: 8, name: "Павел", city: "Прага", country: "Чехия", year: "2023", type: "face", quote: "Письмо от Ковчега помогло получить гуманитарную визу. Без них я бы не справился.", initial: "П" },
  { id: 9, name: "Ольга", city: "Барселона", country: "Испания", year: "2024", type: "face", quote: "Разговорный клуб испанского — первое место в эмиграции, где я почувствовала себя собой.", initial: "О" },
];

const filters = [
  { id: "all", label: "Все истории" },
  { id: "face", label: "Эмиграция в лицах" },
];

function getColor(initial: string): string {
  const colors = [
    "bg-primary text-white",
    "bg-[#74A8E7] text-white",
    "bg-[#6F8DFF] text-white",
    "bg-[#FF9500] text-white",
    "bg-green-500 text-white",
  ];
  return colors[initial.charCodeAt(0) % colors.length];
}

export default function StoriesPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = activeFilter === "all" ? stories : stories.filter((s) => s.type === activeFilter);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-[#F0F4FF] border-b border-border/40 py-14 md:py-20">
        <div className="container-kovcheg">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              Эмиграция в лицах
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
              Истории людей, которые уехали из России из-за войны, преследований
              или нежелания молчать. Каждая история — это чья-то жизнь.
            </p>
          </div>
        </div>
      </section>

      {/* Featured quote */}
      <section className="bg-primary py-12 md:py-16">
        <div className="container-kovcheg">
          <blockquote className="max-w-3xl mx-auto text-center">
            <p className="text-2xl md:text-3xl font-extrabold text-white leading-snug mb-4">
              «Более миллиона россиян покинули страну из-за несогласия с войной, репрессий и нежелания воевать.»
            </p>
            <p className="text-white/60 text-sm">Ковчег помогает им с 10 марта 2022 года</p>
          </blockquote>
        </div>
      </section>

      <main className="container-kovcheg py-16">

        {/* Filter tabs */}
        <div className="flex gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                activeFilter === f.id ? "bg-primary text-white" : "bg-muted text-foreground/70 hover:bg-[#D9E3FF]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Stories grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {filtered.map((story) => (
            <div
              key={story.id}
              className="group rounded-3xl border border-border/40 bg-card shadow-soft hover:shadow-elevated transition-all hover:-translate-y-1 p-7 flex flex-col"
            >
              {/* Avatar */}
              <div className="flex items-center gap-3 mb-5">
                <div className={`h-14 w-14 rounded-full flex items-center justify-center text-xl font-extrabold shrink-0 ${getColor(story.initial)}`}>
                  {story.initial}
                </div>
                <div>
                  <p className="font-bold">{story.name}</p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin size={11} /> {story.city}, {story.country}
                  </p>
                  <p className="text-xs text-accent font-medium">с {story.year}</p>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-sm text-muted-foreground leading-relaxed italic flex-1">
                «{story.quote}»
              </blockquote>
            </div>
          ))}
        </div>

        {/* Share your story CTA */}
        <div className="mt-16 rounded-3xl bg-gradient-to-br from-[#151A2D] to-[#1d3f9a] p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3">Хотите поделиться своей историей?</h2>
          <p className="text-white/70 mb-6 max-w-lg mx-auto text-sm leading-relaxed">
            Ваша история может помочь другим — тем, кто только принимает решение уехать, или тем, кто чувствует себя одиноким в новой стране.
          </p>
          <a
            href="https://t.me/ArkHelps"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3.5 rounded-full font-bold hover:bg-[#F0F4FF] transition-colors"
          >
            Написать нам <ArrowUpRight size={15} />
          </a>
        </div>

      </main>
      <Footer />
    </div>
  );
}
