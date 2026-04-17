import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Sailboat, ArrowUpRight, ExternalLink, Twitter, Instagram, Facebook, Linkedin, Send, Globe } from "lucide-react";
import evgenyPhoto from "@/assets/team/evgeny.webp";
import yanPhoto from "@/assets/team/yan.jpg";
import katyaPhoto from "@/assets/team/katya.jpg";
import vasilyPhoto from "@/assets/team/vasily.jpg";
import anastasiaPhoto from "@/assets/team/anastasia.jpg";

const timeline = [
  {
    year: "2022",
    title: "Основание",
    color: "bg-primary",
    items: [
      "Март 2022 — основан в ответ на преследование антивоенных россиян",
      "Первая волна: экстренное жильё и юридическая помощь",
      "Запуск чатов взаимопомощи по странам",
      "4 500 человек получили помощь с жильём в первый год",
    ],
  },
  {
    year: "2023",
    title: "Рост",
    color: "bg-[#74A8E7]",
    items: [
      "150 000 человек получили поддержку",
      "Запуск языковых курсов на 15 языках",
      "База знаний: первые гайды и вебинары",
      "Психологическая служба — 40 волонтёров-психологов",
    ],
  },
  {
    year: "2024",
    title: "Зрелость",
    color: "bg-[#6F8DFF]",
    items: [
      "210 000 человек в 70 странах",
      "Запуск Ковчег Бизнес и «Первым Рейсом»",
      "«Умная среда» в Белграде — офлайн встречи",
      "Международные доклады и адвокация",
    ],
  },
  {
    year: "2025",
    title: "Сегодня",
    color: "bg-accent",
    items: [
      "Новое позиционирование: диаспора как сила",
      "Платные форматы: языки, курсы, психогруппы",
      "ИИ-ассистент в юридическом боте",
      "Новый сайт и инфраструктура",
    ],
  },
];

const media = [
  { name: "Washington Post", url: "https://www.washingtonpost.com/world/2023/02/13/russia-diaspora-war-ukraine" },
  { name: "BBC", url: "https://www.bbc.co.uk/sounds/play/w3ct6cks" },
  { name: "Foreign Policy", url: "https://foreignpolicy.com/2022/11/28/russian-exiles-emigres-disaspora-anti-putin-ukraine-war-opposition/" },
  { name: "Forbes", url: "https://www.forbes.ru/forbeslife/470567-mesto-gde-mozno-otdysat-sa-kak-emigranty-sozdaut-soobsestva-i-pomogaut-drug-drugu" },
  { name: "Meduza", url: "https://meduza.io/feature/2022/04/05/mesto-gde-budet-vozmozhnost-otdyshatsya" },
  { name: "Новая газета Европа", url: "https://novayagazeta.eu/articles/2022/11/30/russkii-kovcheg" },
  { name: "Republic", url: "https://republic.ru/posts/104757" },
  { name: "Популярная политика", url: "https://www.youtube.com/watch?v=q-d9mYNDOoc" },
];

const stats = [
  { num: "210 000", label: "получили поддержку" },
  { num: "70", label: "стран присутствия" },
  { num: "3 500", label: "волонтёров" },
  { num: "4 года", label: "вместе" },
];

const team = [
  {
    name: "Анастасия Буракова",
    role: "Основатель «Ковчега»",
    bio: "Юрист, правозащитник, экс-координатор проекта «Правозащита Открытки» и проекта поддержки кандидатов на местных выборах «Объединённые демократы». Преподаватель Bazaleti Uni и Свободного университета, автор курсов по менеджменту, адвокации и юридическим аспектам работы организаций.",
    city: "—",
    photo: anastasiaPhoto,
    socials: [],
  },
  {
    name: "Евгений Фомичев",
    role: "Координатор чатов взаимопомощи",
    bio: "Социальный волонтёр, доброволец в ведомствах по делам беженцев",
    city: "Санкт-Петербург",
    photo: evgenyPhoto,
    socials: [
      { type: "x", url: "https://x.com/flyersuerte" },
      { type: "instagram", url: "https://www.instagram.com/flyersuerte" },
    ],
  },
  {
    name: "Ян",
    role: "Координатор экстренной помощи",
    bio: "",
    city: "Санкт-Петербург",
    photo: yanPhoto,
    socials: [
      { type: "telegram", url: "https://t.me/kovchegkoordinator" },
    ],
  },
  {
    name: "Катя Шарапова",
    role: "Менеджер проекта «Первым рейсом»",
    bio: "Специалист по фандрайзингу и коммуникациям в НКО",
    city: "Москва",
    photo: katyaPhoto,
    socials: [
      { type: "linkedin", url: "https://www.linkedin.com/in/ekaterina-sharapova-783217346/" },
    ],
  },
  {
    name: "Василий Горшков",
    role: "Координатор проекта «Ковчег Бизнес»",
    bio: "Экс-руководитель социального проекта «Доброшрифт», занимался спецпроектами с бизнес-структурами",
    city: "Тюмень",
    photo: vasilyPhoto,
    socials: [
      { type: "facebook", url: "https://www.facebook.com/vasgorshkov" },
      { type: "instagram", url: "https://www.instagram.com/vasilevskyrus/" },
    ],
  },
] as const;

const socialIcon = {
  x: Twitter,
  twitter: Twitter,
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  telegram: Send,
  web: Globe,
} as const;

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-[#F0F4FF] border-b border-border/40 py-14 md:py-24">
        <div className="container-kovcheg">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-[1.05]">
              История <span className="text-primary">Ковчега</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Мы вместе прошли три года полномасштабной войны: помогали тем, кто
              бежал из страны из-за преследования или угрозы мобилизации,
              предоставляли временное жильё, психологическую поддержку. Давление
              на россиян продолжается — мы помогаем друг другу держаться вместе.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-12 md:py-16">
        <div className="container-kovcheg">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">{s.num}</div>
                <div className="mt-1.5 text-sm text-white/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="container-kovcheg py-16 space-y-24">

        {/* Timeline */}
        <section>
          <div className="mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">Хроника</p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Четыре года <span className="text-primary">плечом к плечу</span>
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border/60 hidden md:block" />

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <div key={item.year} className="relative md:pl-20">
                  {/* Year dot */}
                  <div className={`hidden md:flex absolute left-0 h-12 w-12 rounded-full ${item.color} items-center justify-center text-white font-bold text-sm shadow-soft`}>
                    {item.year}
                    {i === timeline.length - 1 && (
                      <Sailboat size={14} className="absolute -top-4 -right-3 text-primary" />
                    )}
                  </div>

                  <div className="rounded-3xl border border-border/40 bg-card p-7 shadow-soft">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`md:hidden inline-block w-3 h-3 rounded-full ${item.color}`} />
                      <span className="text-primary font-bold md:hidden">{item.year}</span>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {item.items.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="rounded-3xl bg-gradient-to-br from-[#151A2D] to-[#1d3f9a] p-8 md:p-14 text-white">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary mb-4">Миссия</p>
            <blockquote className="text-2xl md:text-3xl font-extrabold leading-snug mb-6">
              «У нас нет государства, которое представляет наши интересы. Но у нас есть мы — сильное сообщество, которое действует.»
            </blockquote>
            <p className="text-white/70 text-lg leading-relaxed">
              Ковчег — это каждый из нас. Мы помогаем друг другу и держимся
              вместе до момента, когда сможем жить в демократической стране,
              уважающей права своих граждан.
            </p>
          </div>
        </section>

        {/* Team */}
        <section id="team">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">Команда</p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5">
              Кто стоит за <span className="text-primary">Ковчегом</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Команда Ковчега — это 20 человек: координаторы направлений, юристы, методисты, редактор,
              специалист по безопасности и многие другие. Нам ежедневно помогают более 300 волонтёров —
              модераторов, психологов, преподавателей — и ещё несколько тысяч человек, которые готовы
              помочь по отдельным вопросам. Из-за ярлыка «иноагента» мы бережно относимся к тем членам
              команды, кто пожелал сохранить анонимность.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <article
                key={member.name}
                className="group rounded-3xl border border-border/40 bg-card p-6 shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all flex flex-col items-center text-center"
              >
                {/* Round avatar with brand vignette */}
                <div className="relative mb-5 h-32 w-32">
                  {/* Hover glow */}
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/40 to-accent/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  {/* Brand gradient ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-accent to-secondary p-[3px] shadow-soft">
                    <div className="relative h-full w-full rounded-full overflow-hidden bg-background ring-2 ring-background">
                      <img
                        src={member.photo}
                        alt={member.name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover scale-[1.3]"
                        style={{ objectPosition: "50% 30%" }}
                      />
                      {/* Brand vignette overlay */}
                      <div
                        className="pointer-events-none absolute inset-0 rounded-full"
                        style={{
                          background:
                            "radial-gradient(circle at 50% 35%, transparent 45%, hsl(var(--primary) / 0.18) 78%, hsl(var(--primary) / 0.45) 100%)",
                          mixBlendMode: "multiply",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-extrabold tracking-tight">{member.name}</h3>
                <p className="text-sm font-semibold text-primary mt-1">{member.role}</p>
                {member.bio && (
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{member.bio}</p>
                )}
                {member.city && member.city !== "—" && (
                  <p className="text-xs text-muted-foreground mt-3">
                    Откуда: <span className="text-foreground/80">{member.city}</span>
                  </p>
                )}

                {member.socials.length > 0 && (
                  <div className="mt-5 flex items-center justify-center gap-2 pt-4 border-t border-border/40 w-full">
                    {member.socials.map((s) => {
                      const Icon = socialIcon[s.type as keyof typeof socialIcon] ?? Globe;
                      return (
                        <a
                          key={s.url}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} — ${s.type}`}
                          className="h-8 w-8 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-colors"
                        >
                          <Icon size={14} />
                        </a>
                      );
                    })}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Media */}
        <section id="media">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">Пресса</p>
            <h2 className="text-3xl font-extrabold tracking-tight">О нас пишут</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {media.map((item) => (
              <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer"
                className="group flex items-center justify-between p-5 rounded-3xl border border-border/40 bg-card shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all">
                <span className="font-bold text-foreground/70 group-hover:text-primary transition-colors">{item.name}</span>
                <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </a>
            ))}
          </div>
        </section>

        {/* Reports */}
        <section id="reports">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">Прозрачность</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Отчёты</h2>
            <p className="text-muted-foreground mt-2">Мы публично отчитываемся о расходовании средств и результатах работы.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {["Отчёт 2022", "Отчёт 2023", "Отчёт 2024"].map((report) => (
              <a key={report} href="https://kovcheg.live/about"
                target="_blank" rel="noopener noreferrer"
                className="group flex items-center justify-between p-6 rounded-3xl border border-border/40 bg-card shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all">
                <div>
                  <p className="font-bold group-hover:text-primary transition-colors">{report}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">PDF-документ</p>
                </div>
                <ArrowUpRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </section>

        {/* Contacts */}
        <section id="contacts" className="rounded-3xl border border-border/40 bg-card p-8 md:p-10 shadow-soft">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">Контакты</p>
              <h2 className="text-2xl font-extrabold mb-4">Написать нам</h2>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>По вопросам сотрудничества, партнёрства и совместных публикаций:</p>
                <a href="http://t.me/KovchegAdsBot" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
                  @KovchegAdsBot <ArrowUpRight size={13} />
                </a>
                <p className="pt-2">Телеграм-канал:</p>
                <a href="https://t.me/ArkHelps" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
                  @ArkHelps <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">Социальные сети</p>
              <div className="space-y-3">
                {[
                  { name: "Telegram", url: "https://t.me/ArkHelps" },
                  { name: "YouTube", url: "https://www.youtube.com/@kovcheglive" },
                  { name: "Facebook", url: "https://www.facebook.com/kovcheg.live" },
                  { name: "Instagram", url: "https://www.instagram.com/kovcheg.live" },
                ].map((s) => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    <ArrowUpRight size={13} /> {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
