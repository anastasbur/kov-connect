import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Home, Scale, Brain, BookOpen, Globe, MessageSquare,
  ArrowUpRight, ChevronDown, ChevronUp, AlertCircle, Send
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const services = [
  {
    id: "housing",
    icon: Home,
    color: "text-orange-500 bg-orange-50",
    badge: "Бесплатно",
    title: "Экстренное жильё",
    subtitle: "Армения · Грузия · Сербия · Турция",
    description:
      "Помогаем с временным жильём, если вы уезжаете из России из-за риска преследования, получили бан в Грузии или столкнулись с экстренной ситуацией. Координатор свяжется в течение суток.",
    stat: "4 500 человек получили помощь с жильём",
    cta: { label: "Заполнить анкету", href: "https://docs.google.com/forms/d/e/1FAIpQLSc42yfj_tSjzdAVb02p6bmlbwfyawLtFyYu5fVmrLBCcxLUog/viewform" },
  },
  {
    id: "legal",
    icon: Scale,
    color: "text-primary bg-[#D9E3FF]",
    badge: "Бесплатно",
    title: "Юридическая помощь",
    subtitle: "Задержания · Убежище · Гуманитарные визы",
    description:
      "Помощь при задержании в другой стране по политическим мотивам — из-за антивоенной позиции, гражданского активизма или риска депортации. Также помогаем с письмами поддержки для гуманитарных виз и убежища.",
    stat: "160 000 получили юридическую помощь",
    details: [
      {
        label: "Задержание в другой стране",
        text: "Сотрудничаем с адвокатами в разных странах. Опишите ситуацию — координатор экстренной помощи свяжется в ближайшее время.",
        href: "https://t.me/EmigrantHelpBot",
        cta: "Написать в бот",
      },
      {
        label: "Письмо поддержки для визы или убежища",
        text: "Подготовим письмо на основе ваших обстоятельств. Срок — 7–10 дней после верификации. Прочтите памятку перед заполнением.",
        href: "https://telegra.ph/Kak-opisat-obstoyatelstva-riskov-dlya-rekomendatelnogo-pisma-03-18",
        cta: "Читать памятку",
      },
      {
        label: "ИИ-консультант",
        text: "Отвечает на вопросы по базе знаний Ковчега, сайтам государственных органов и международных НКО.",
        href: "https://t.me/EmigrantHelpBot",
        cta: "Задать вопрос",
      },
    ],
  },
  {
    id: "psy",
    icon: Brain,
    color: "text-green-600 bg-green-50",
    badge: "Бесплатно / Платно",
    title: "Психологическая помощь",
    subtitle: "Индивидуально · Группы · Без осуждения",
    description:
      "Индивидуальные сессии с волонтёрами-психологами — бесплатно. Платные терапевтические группы и группы поддержки. Вы можете быть уверены: здесь не встретите непонимания ваших взглядов, позиции или ориентации.",
    stat: "11 000 получили помощь психологов",
    details: [
      {
        label: "Бесплатная индивидуальная консультация",
        text: "Выберите удобную дату и время в расписании. Запись возможна за 24 часа. Ответим в течение суток в будние дни.",
        href: "https://docs.google.com/spreadsheets/d/1P8pYf4xhWwPIDQisQNaMiyYFryKBrrxI67N2G4MNtXI",
        cta: "Открыть расписание",
      },
      {
        label: "Платные психологические группы",
        text: "Терапевтические группы и группы поддержки с профессиональными психологами. Запись и условия — в разделе «Языки и образование».",
        href: "/education#groups",
        cta: "Смотреть группы",
      },
    ],
    note: "Психологи не работают со случаями, требующими психиатрической помощи. При суицидальных мыслях незамедлительно обратитесь в медицинское учреждение.",
  },
  {
    id: "knowledge",
    icon: BookOpen,
    color: "text-[#6F8DFF] bg-[#F0F4FF]",
    badge: "Бесплатно",
    title: "База знаний",
    subtitle: "400+ материалов · Регулярно обновляется",
    description:
      "Инструкции, вебинары и гайды по юридическим вопросам, документам, медицине, трудоустройству и жизни в разных странах. Поиск с ИИ-помощником.",
    stat: "400+ гайдов и инструкций",
    cta: { label: "Открыть базу знаний", href: "/knowledge" },
  },
  {
    id: "languages",
    icon: Globe,
    color: "text-[#2D57C8] bg-[#D9E3FF]",
    badge: "Бесплатно",
    title: "Разговорные языковые клубы",
    subtitle: "Онлайн · Каждую неделю",
    description:
      "Регулярные групповые встречи с живой практикой общения на иностранном языке в спокойной, непринуждённой обстановке. Преподаватель даёт рекомендации по грамматике и полезным материалам.",
    stat: "1 900 изучали иностранные языки",
    details: [
      {
        label: "Английский клуб (A2–B1)",
        text: "Онлайн, каждый четверг 18:00–20:00 МСК. Можно присоединиться в качестве слушателя с уровнем ниже A2.",
        href: "https://t.me/kovcheg_lang/47",
        cta: "Вступить в группу",
      },
    ],
    cta: { label: "Все курсы и форматы", href: "/education" },
  },
  {
    id: "consultation",
    icon: MessageSquare,
    color: "text-amber-600 bg-amber-50",
    badge: "Ереван",
    title: "Офлайн-консультация",
    subtitle: "Только Ереван · Политические дела",
    description:
      "Очные консультации в Ереване для людей с политически мотивированными уголовными делами. Координатор оценит ситуацию, даст рекомендации по безопасности и контакты адвокатов.",
    stat: "",
    cta: { label: "Написать координатору", href: "https://t.me/EmigrantHelpBot" },
  },
];

// ─── Accordion item ───────────────────────────────────────────────────────────

function DetailItem({ item }: { item: { label: string; text: string; href: string; cta: string } }) {
  return (
    <div className="border-t border-border/40 pt-4">
      <p className="font-semibold text-sm mb-1">{item.label}</p>
      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{item.text}</p>
      <a
        href={item.href}
        target={item.href.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline"
      >
        {item.cta} <ArrowUpRight size={13} />
      </a>
    </div>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────

function ServiceCard({ service }: { service: typeof services[number] }) {
  const [open, setOpen] = useState(false);
  const Icon = service.icon;
  const hasDetails = service.details && service.details.length > 0;

  return (
    <div className="rounded-3xl border border-border/40 bg-card shadow-soft overflow-hidden">
      <div className="p-7">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl ${service.color}`}>
              <Icon size={22} strokeWidth={1.5} />
            </div>
            <div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                {service.badge}
              </span>
              <h3 className="text-xl font-bold leading-tight">{service.title}</h3>
            </div>
          </div>
        </div>

        <p className="text-xs text-accent font-medium mb-3">{service.subtitle}</p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {service.description}
        </p>

        {service.stat && (
          <div className="inline-block bg-muted rounded-xl px-3 py-1.5 text-sm font-semibold text-primary mb-4">
            {service.stat}
          </div>
        )}

        {service.note && (
          <div className="flex gap-2 bg-orange-50 border border-orange-100 rounded-2xl p-3 mb-4">
            <AlertCircle size={15} className="text-orange-500 shrink-0 mt-0.5" />
            <p className="text-xs text-orange-700 leading-relaxed">{service.note}</p>
          </div>
        )}

        {/* Primary CTA */}
        {service.cta && (
          <a
            href={service.cta.href}
            target={service.cta.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            {service.cta.label} <ArrowUpRight size={13} />
          </a>
        )}

        {/* Expandable details */}
        {hasDetails && (
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 text-sm text-primary font-medium mt-3 hover:underline"
          >
            {open ? "Скрыть детали" : "Подробнее о форматах"}
            {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        )}
      </div>

      {/* Details section */}
      {hasDetails && open && (
        <div className="px-7 pb-7 space-y-4 border-t border-border/40 pt-5 bg-muted/30">
          {service.details!.map((d) => (
            <DetailItem key={d.label} item={d} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-[#F0F4FF] border-b border-border/40 py-14 md:py-20">
        <div className="container-kovcheg">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-primary shadow-soft mb-5">
              <AlertCircle size={13} />
              Мы рядом, когда тяжело
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Помощь и поддержка
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
              Экстренная помощь, юридические консультации, психологическая
              поддержка и база знаний — для тех, кто оказался в сложной ситуации.
            </p>
          </div>
        </div>
      </section>

      {/* Emergency banner */}
      <div className="bg-red-50 border-b border-red-100">
        <div className="container-kovcheg py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm text-red-700">
            <AlertCircle size={15} className="shrink-0" />
            <span className="font-medium">Задержаны прямо сейчас?</span>
            <span className="text-red-600">Напишите в бот — координатор ответит в ближайшее время.</span>
          </div>
          <a
            href="https://t.me/EmigrantHelpBot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-700 hover:underline shrink-0"
          >
            <Send size={13} /> Написать в бот
          </a>
        </div>
      </div>

      {/* Services grid */}
      <main className="container-kovcheg py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>

        {/* Donate nudge */}
        <div className="mt-16 rounded-3xl bg-gradient-to-br from-primary to-[#1d3f9a] p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
            Мы существуем благодаря пожертвованиям
          </h2>
          <p className="text-white/75 mb-6 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Экстренное жильё, адвокаты для задержанных, бесплатные консультации —
            всё это возможно только при поддержке неравнодушных людей.
          </p>
          <a
            href="https://donate.kovcheg.live/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#FF9500] text-white px-8 py-3.5 rounded-full font-bold hover:bg-orange-600 transition-colors"
          >
            Поддержать Ковчег
          </a>
          <p className="text-white/50 text-xs mt-4">
            Ковчег признан иностранным агентом. Пожертвования принимаются с зарубежных карт, PayPal и криптовалютой.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
