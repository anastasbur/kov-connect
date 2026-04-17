import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  Users, Briefcase, Globe, MessageSquare,
  BookOpen, ArrowUpRight, Send, ExternalLink
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Нетворкинг с равными",
    desc: "Сообщество фаундеров, предпринимателей и экспертов, которые строят бизнес за пределами России. Находите партнёров, инвесторов и клиентов среди своих.",
  },
  {
    icon: MessageSquare,
    title: "Обмен опытом",
    desc: "Регулярные встречи, разборы кейсов и открытые дискуссии. Здесь делятся тем, что работает — без лишней теории и корпоративного глянца.",
  },
  {
    icon: Globe,
    title: "Интеграция в международную среду",
    desc: "Помогаем выйти на зарубежные рынки, понять местную деловую культуру и наладить связи с иностранными партнёрами и институтами.",
  },
  {
    icon: Briefcase,
    title: "Консультации и экспертиза",
    desc: "Доступ к проверенным специалистам по юридическим, финансовым, налоговым и операционным вопросам ведения бизнеса в эмиграции.",
  },
  {
    icon: BookOpen,
    title: "База знаний",
    desc: "Гайды, шаблоны документов, разборы законодательства — практическая база для тех, кто открывает или масштабирует бизнес за рубежом.",
  },
  {
    icon: Users,
    title: "Поддержка единомышленников",
    desc: "Закрытое сообщество людей с близкими ценностями. Здесь понимают, что значит начинать заново — и помогают не останавливаться.",
  },
];

const stats = [
  { num: "4 года", label: "предпринимателям в эмиграции" },
  { num: "20+", label: "стран — участников сообщества" },
  { num: "Нетворкинг", label: "встречи и мероприятия" },
  { num: "Закрытый", label: "отбор участников" },
];

export default function BusinessPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
        <div className="container-kovcheg relative py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-xs font-medium text-primary shadow-soft mb-6">
              <Briefcase className="h-3.5 w-3.5" />
              Предпринимателям в эмиграции
            </div>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance">
              Ковчег{" "}
              <span className="text-primary">Бизнес</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl leading-relaxed">
              Сообщество для предпринимателей, фаундеров и экспертов, которые
              покинули Россию и развивают своё дело за рубежом. Строим сильную
              деловую диаспору — плечом к плечу.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="https://kovcheg.business/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-full font-semibold text-base hover:bg-primary/90 transition-colors shadow-soft"
              >
                Подать заявку <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="https://t.me/ark_financial"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border bg-card text-foreground px-7 py-3.5 rounded-full font-semibold text-base hover:bg-muted transition-colors"
              >
                <Send className="h-4 w-4 text-primary" />
                Telegram-канал
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-muted/60 py-12 md:py-16 border-y border-border/40">
        <div className="container-kovcheg">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
                  {s.num}
                </div>
                <div className="mt-1.5 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is it */}
      <section className="py-20 md:py-28">
        <div className="container-kovcheg">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">
                О проекте
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-balance leading-[1.1]">
                Бизнес в эмиграции —
                <br />
                <span className="text-primary">это не начать заново</span>
              </h2>
              <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
                Предприниматели, которые уехали из России, сталкиваются с одинаковыми
                вызовами: незнакомая юрисдикция, языковой барьер, отсутствие деловых
                связей. «Ковчег Бизнес» — это среда, где эти барьеры снижаются,
                потому что рядом те, кто прошёл тот же путь.
              </p>
              <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                Мы объединяем фаундеров, экспертов и предпринимателей из десятков
                стран, помогаем находить партнёров, обмениваться опытом и
                интегрироваться в международную деловую среду.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://kovcheg.business/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors"
                >
                  Узнать подробности <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Visual block */}
            <div className="rounded-3xl bg-muted/60 border border-border/40 p-8 lg:p-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-5">
                Что входит в сообщество
              </p>
              <ul className="space-y-4">
                {[
                  "Закрытый Telegram-чат с проверенными участниками",
                  "Нетворкинг-встречи онлайн и офлайн",
                  "Разборы кейсов и бизнес-завтраки",
                  "База контактов: юристы, бухгалтеры, партнёры",
                  "Гайды по открытию бизнеса в разных странах",
                  "Канал с новостями и аналитикой для предпринимателей",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                      ✓
                    </span>
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-border/40">
                <p className="text-xs text-muted-foreground">
                  Вступление — по заявке. Мы проводим небольшой отбор, чтобы
                  сохранить качество сообщества и безопасную среду.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/60 py-20 md:py-28">
        <div className="container-kovcheg">
          <div className="max-w-2xl mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">
              Как мы помогаем
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-balance">
              Решаем проблемы <span className="text-primary">предпринимателей</span>
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-3xl bg-card p-7 shadow-soft hover:shadow-elevated transition-all hover:-translate-y-1 border border-border/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors mb-5">
                  <f.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold leading-tight mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Первым Рейсом cross-promo */}
      <section className="py-20 md:py-28">
        <div className="container-kovcheg">
          <div className="rounded-3xl bg-card border border-border/40 p-8 md:p-12 shadow-soft">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">
                  Также от Ковчега
                </p>
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
                  «Первым рейсом»
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Сообщество инициативных россиян, которые хотят участвовать в
                  создании демократического будущего — через образование, дебаты
                  и гражданские инициативы. Если хотите начать — это место для вас.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <a
                  href="https://t.me/thefirstflight"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-muted text-foreground px-6 py-3 rounded-full font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Send className="h-4 w-4" /> Подписаться на канал
                </a>
                <a
                  href="https://firstflight.today/join/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  Подать заявку на участие <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="container-kovcheg">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-dark p-10 md:p-16 text-center">
            <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-secondary/15 blur-3xl" />
            <div className="relative max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white text-balance leading-[1.1]">
                Сильная диаспора —
                <br />это сильный бизнес
              </h2>
              <p className="mt-5 text-lg text-white/75">
                Подайте заявку на вступление в закрытое бизнес-сообщество
                или подпишитесь на канал, чтобы следить за новостями.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <a
                  href="https://kovcheg.business/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3.5 rounded-full font-semibold hover:bg-[#F0F4FF] transition-colors"
                >
                  Перейти на сайт <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href="https://kovcheg.business/#subscribe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white/10 transition-colors"
                >
                  Подписаться на рассылку
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
