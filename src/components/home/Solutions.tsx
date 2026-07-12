import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const blocks = [
  {
    tag: "01 / Срочное",
    title: "Экстренная помощь",
    desc: "Временное жильё для преследуемых. Юридические консультации, помощь с гуманитарными визами и убежищем.",
    href: "/help",
    items: ["Экстренное жильё", "Юридический бот", "ИИ-ассистент"],
  },
  {
    tag: "02 / Адаптация",
    title: "Жизнь на новом месте",
    desc: "Языковые курсы на 15 языках. Психологическая поддержка. Подготовка к экзаменам на ПМЖ и гражданство.",
    href: "/education",
    items: ["15 языков", "Группы психологии", "Интеграция"],
  },
  {
    tag: "03 / Сообщество",
    title: "В кругу своих",
    desc: "Чаты по странам и профессиям. Бизнес-нетворк. Локальные события и встречи единомышленников.",
    href: "/communities",
    items: ["50+ стран", "8 профессий", "Ковчег Бизнес"],
  },
];

export const Solutions = () => {
  return (
    <section className="bg-muted/60 py-20 md:py-28">
      <div className="container-kovcheg">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">Что мы делаем</p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight max-w-2xl text-balance">
              Решаем проблемы вместе
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            Плечом к плечу — от первой ночи в новой стране до запуска собственного дела.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {blocks.map((b) => (
            <Link
              key={b.title}
              to={b.href}
              className="group relative flex flex-col rounded-3xl bg-card p-8 shadow-soft hover:shadow-elevated transition-all hover:-translate-y-1 overflow-hidden border border-border/40"
            >
              <div className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-muted group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <ArrowUpRight className="h-4 w-4" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">{b.tag}</p>
              <h3 className="mt-4 text-2xl md:text-3xl font-extrabold tracking-tight pr-12">{b.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed flex-1">{b.desc}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {b.items.map((i) => (
                  <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-muted text-foreground/80">{i}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* AI-платформа подбора специалистов */}
        <a
          href="https://joinpro.store/"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 flex flex-col gap-6 rounded-3xl border border-primary/20 bg-card p-8 shadow-soft transition-all hover:shadow-elevated md:flex-row md:items-center md:justify-between"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              Новое · развитие потенциала
            </span>
            <h3 className="mt-4 text-2xl md:text-3xl font-extrabold tracking-tight">
              Специалисты и услуги
            </h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              ИИ подбирает проверенного специалиста под ваш запрос — юриста,
              психолога, карьерного консультанта, репетитора. А специалистам
              помогает находить клиентов среди своих. Поддерживаем экономическую
              активность диаспоры.
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors group-hover:bg-primary/90">
            Открыть платформу
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </a>
      </div>
    </section>
  );
};
