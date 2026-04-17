import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Megaphone, ExternalLink, ArrowUpRight, FileText, Globe, Users } from "lucide-react";

const initiatives = [
  {
    title: "Россияне против войны",
    desc: "База антивоенных инициатив, петиций и обращений. Более 400 инициатив из разных стран.",
    url: "https://kovcheg.live/initiatives/",
    tag: "База данных",
  },
  {
    title: "«Первым рейсом»",
    desc: "Сообщество для участия в демократической жизни своих новых стран — курсы, дебаты, клубы.",
    url: "https://firstflight.today/",
    tag: "Сообщество",
  },
  {
    title: "Адвокация прав эмигрантов",
    desc: "Доклады о ситуации с правами россиян за рубежом, выступления на международных площадках.",
    url: "https://kovcheg.live/about/",
    tag: "Доклады",
  },
];

const media = [
  { name: "Washington Post", url: "https://www.washingtonpost.com/world/2023/02/13/russia-diaspora-war-ukraine", desc: "О диаспоре антивоенных россиян" },
  { name: "Foreign Policy", url: "https://foreignpolicy.com/2022/11/28/russian-exiles-emigres-disaspora-anti-putin-ukraine-war-opposition/", desc: "Русские эмигранты против войны" },
  { name: "BBC", url: "https://www.bbc.co.uk/sounds/play/w3ct6cks", desc: "Подкаст о русской эмиграции" },
  { name: "Forbes Russia", url: "https://www.forbes.ru/forbeslife/470567-mesto-gde-mozno-otdysat-sa-kak-emigranty-sozdaut-soobsestva-i-pomogaut-drug-drugu", desc: "Как эмигранты создают сообщества" },
  { name: "Meduza", url: "https://meduza.io/feature/2022/04/05/mesto-gde-budet-vozmozhnost-otdyshatsya", desc: "Место, где можно отдышаться" },
  { name: "Новая газета Европа", url: "https://novayagazeta.eu/articles/2022/11/30/russkii-kovcheg", desc: "Русский Ковчег" },
  { name: "Republic", url: "https://republic.ru/posts/104757", desc: "О помощи эмигрантам" },
  { name: "Популярная политика", url: "https://www.youtube.com/watch?v=q-d9mYNDOoc", desc: "YouTube-интервью" },
];

const positions = [
  {
    icon: FileText,
    title: "Доклады и исследования",
    desc: "Публикуем аналитику о положении антивоенных россиян за рубежом, о давлении на диаспору и нарушениях прав.",
  },
  {
    icon: Globe,
    title: "Международные площадки",
    desc: "Выступаем на конференциях, в НКО и государственных органах — рассказываем о ситуации с правами россиян.",
  },
  {
    icon: Users,
    title: "Коалиции и партнёрства",
    desc: "Сотрудничаем с международными правозащитными организациями и диаспорными объединениями по всему миру.",
  },
  {
    icon: Megaphone,
    title: "Публичные кампании",
    desc: "Поднимаем вопросы прав антивоенных россиян в СМИ и на международном уровне.",
  },
];

export default function AdvocacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-[#F0F4FF] border-b border-border/40 py-14 md:py-24">
        <div className="container-kovcheg">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-primary shadow-soft mb-5">
              <Megaphone size={13} />
              Международная адвокация
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Мы отстаиваем права россиян в мире
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
              Доклады, инициативы, выступления и публикации в иностранных СМИ о
              ситуации с антивоенными россиянами и их правами за рубежом.
            </p>
          </div>
        </div>
      </section>

      <main className="container-kovcheg py-16 space-y-20">

        {/* Positioning */}
        <section>
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">Наша позиция</p>
            <h2 className="text-3xl font-extrabold tracking-tight max-w-2xl">
              Диаспора — это политическая сила
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
              Более миллиона россиян покинули страну из-за войны и репрессий. Мы считаем, что
              эти люди имеют право на защиту, представительство и участие в
              международном диалоге о будущем России.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {positions.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="rounded-3xl border border-border/40 bg-card p-6 shadow-soft">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D9E3FF] text-primary mb-4">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Initiatives */}
        <section>
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">Инициативы</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Что мы делаем</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {initiatives.map((item) => (
              <a key={item.title} href={item.url} target="_blank" rel="noopener noreferrer"
                className="group flex flex-col rounded-3xl border border-border/40 bg-card p-7 shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all">
                <span className="text-xs font-semibold text-primary bg-[#D9E3FF] px-3 py-1 rounded-full self-start mb-4">
                  {item.tag}
                </span>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{item.desc}</p>
                <div className="flex items-center gap-1 mt-4 text-sm text-primary font-medium">
                  Подробнее <ArrowUpRight size={14} />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Media */}
        <section>
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">Пресса</p>
            <h2 className="text-3xl font-extrabold tracking-tight">О нас пишут</h2>
            <p className="text-muted-foreground mt-2">Публикации в российских и международных СМИ.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {media.map((item) => (
              <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer"
                className="group flex flex-col p-5 rounded-3xl border border-border/40 bg-card shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-foreground/80 group-hover:text-primary transition-colors">{item.name}</span>
                  <ExternalLink size={13} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </div>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Contact for advocacy */}
        <section className="rounded-3xl bg-gradient-to-br from-primary to-[#1d3f9a] p-8 md:p-12 text-white">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">Хотите сотрудничать?</h2>
              <p className="text-white/75 leading-relaxed">
                Если вы представляете медиа, НКО, исследовательский центр или
                международную организацию — мы открыты к партнёрству и совместным
                проектам.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <a href="http://t.me/KovchegAdsBot" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#F0F4FF] transition-colors">
                Написать нам <ArrowUpRight size={13} />
              </a>
              <a href="https://t.me/ArkHelps" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-white/10 transition-colors">
                Telegram-канал
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
