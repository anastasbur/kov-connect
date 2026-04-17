import { Quote } from "lucide-react";

const quotes = [
  {
    text: "Когда я приехала в Тбилиси одна с двумя чемоданами, Ковчег нашёл мне жильё за один день. Через месяц я уже вела разговорный клуб для других.",
    name: "Анна",
    city: "Тбилиси",
    year: "с 2022",
    initial: "А",
  },
  {
    text: "В чате IT-сообщества я нашёл первый контракт за границей. Сейчас сам помогаю новичкам — это и есть «плечом к плечу».",
    name: "Дмитрий",
    city: "Берлин",
    year: "с 2023",
    initial: "Д",
  },
  {
    text: "Психологическая группа Ковчега помогла пережить самые тяжёлые месяцы. Здесь я встретила своих.",
    name: "Мария",
    city: "Лиссабон",
    year: "с 2022",
    initial: "М",
  },
];

export const Quotes = () => {
  return (
    <section className="bg-primary text-primary-foreground py-20 md:py-28 relative overflow-hidden">
      <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />

      <div className="container-kovcheg relative">
        <div className="max-w-3xl mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary mb-3">Истории</p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-balance">
            Голоса нашей диаспоры
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {quotes.map((q) => (
            <figure key={q.name} className="rounded-3xl bg-primary-foreground/10 backdrop-blur-sm p-8 border border-primary-foreground/15">
              <Quote className="h-8 w-8 text-secondary mb-4" strokeWidth={1.5} />
              <blockquote className="text-base md:text-lg leading-relaxed">«{q.text}»</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary font-bold text-lg">
                  {q.initial}
                </div>
                <div>
                  <div className="font-semibold">{q.name}</div>
                  <div className="text-sm text-primary-foreground/70">{q.city} · {q.year}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
