import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Globe, Briefcase, Brain, Users, ArrowUpRight,
  Clock, Calendar, MapPin, CheckCircle, ChevronDown, ChevronUp
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CourseCard {
  id: string;
  tag: string;
  tagColor: string;
  icon: React.ElementType;
  free: boolean;
  title: string;
  teacher: string;
  level: string;
  format: string;
  schedule: string;
  duration: string;
  spots?: string;
  description: string;
  href: string;
  ctaLabel: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const courses: CourseCard[] = [
  {
    id: "english-club",
    tag: "Языковые клубы",
    tagColor: "bg-[#D9E3FF] text-primary",
    icon: Globe,
    free: true,
    title: "Разговорный английский клуб",
    teacher: "Постоянно действующий клуб",
    level: "A2–B1 (слушатели с любым уровнем)",
    format: "Онлайн",
    schedule: "Каждый четверг, 18:00–20:00 МСК",
    duration: "Постоянно",
    description:
      "Живая практика общения в спокойной, непринуждённой обстановке. Преподаватель даёт рекомендации по грамматике, фильмам и полезным сайтам в чате. Можно присоединиться в качестве слушателя с более низким уровнем.",
    href: "https://t.me/kovcheg_lang/47",
    ctaLabel: "Вступить в группу",
  },
  {
    id: "business-english",
    tag: "Языковые курсы",
    tagColor: "bg-[#D9E3FF] text-primary",
    icon: Globe,
    free: false,
    title: "Бизнес-английский B2",
    teacher: "Ирина, Германия · 16 лет опыта, лингвистическое образование",
    level: "B2",
    format: "Онлайн",
    schedule: "Четверг 18:00–20:00 МСК",
    duration: "2 месяца",
    spots: "Ограниченное количество мест",
    description:
      "Переговоры на английском в сфере бизнеса, деловая переписка, навыки презентации. Разбираем подкасты, устойчивые выражения, примеры писем. Нужно быть готовым к домашним заданиям.",
    href: "https://t.me/EmigrantHelpBot",
    ctaLabel: "Записаться",
  },
  {
    id: "python",
    tag: "Курсы профессий",
    tagColor: "bg-[#F0F4FF] text-[#6F8DFF]",
    icon: Briefcase,
    free: false,
    title: "Анализ данных на Python",
    teacher: "Алексей, Нидерланды · Senior Data Analyst, 8 лет в европейском финтехе",
    level: "С нуля (базовая компьютерная грамотность)",
    format: "Онлайн",
    schedule: "Вт и Пт, 19:00–20:30 МСК",
    duration: "2 месяца",
    spots: "Осталось 4 из 15 мест",
    description:
      "Основы Python, библиотеки Pandas и NumPy, визуализация с Matplotlib. Финальный проект — собственный анализ реального датасета для портфолио. Live-coding, разбор типичных ошибок новичков. ~4–5 часов самостоятельной работы в неделю.",
    href: "https://t.me/EmigrantHelpBot",
    ctaLabel: "Записаться",
  },
  {
    id: "business-analysis",
    tag: "Курсы профессий",
    tagColor: "bg-[#F0F4FF] text-[#6F8DFF]",
    icon: Briefcase,
    free: false,
    title: "Практический бизнес-анализ",
    teacher: "Преподаватели Ковчега с опытом в международных компаниях",
    level: "Начинающий–средний",
    format: "Онлайн",
    schedule: "Уточняется при записи",
    duration: "6–8 недель",
    description:
      "Инструменты и методы бизнес-аналитика, необходимые для дистанционной работы или зарубежного рынка труда. Теория, практика и собственный проект для портфолио.",
    href: "https://t.me/EmigrantHelpBot",
    ctaLabel: "Узнать о наборе",
  },
  {
    id: "psy-anxiety",
    tag: "Психологические группы",
    tagColor: "bg-green-50 text-green-700",
    icon: Brain,
    free: false,
    title: "Справляемся с тревогой",
    teacher: "Александр и Наталья · психологи с 20-летним стажем",
    level: "Уехавшие и оставшиеся",
    format: "Онлайн",
    schedule: "Четверг, 18:00–20:00 МСК",
    duration: "2 месяца",
    spots: "Ограниченное количество мест",
    description:
      "Помощь в снижении тревоги и стресса, восстановлении сна, преодолении тревоги на фоне новостей. Для уехавших и оставшихся в России. Безопасное пространство — без осуждения взглядов, позиции и ориентации.",
    href: "https://t.me/EmigrantHelpBot",
    ctaLabel: "Записаться",
  },
  {
    id: "psy-adaptation",
    tag: "Психологические группы",
    tagColor: "bg-green-50 text-green-700",
    icon: Brain,
    free: false,
    title: "Выгорание и адаптация",
    teacher: "Александр и Наталья · психологи с 20-летним стажем",
    level: "Эмигранты",
    format: "Онлайн",
    schedule: "Уточняется при записи",
    duration: "2 месяца",
    description:
      "Адаптация при вынужденном переезде, помощь увидеть перспективы в новой главе жизни. Терапевтическая группа для тех, кто чувствует выгорание или застрял между «здесь» и «там».",
    href: "https://t.me/EmigrantHelpBot",
    ctaLabel: "Записаться",
  },
];

const categories = [
  { id: "all", label: "Все форматы" },
  { id: "languages", label: "🌍 Языки" },
  { id: "skills", label: "💼 Профессии" },
  { id: "psychology", label: "🧠 Психология" },
];

function tagToCategory(tag: string): string {
  if (tag.includes("Язык")) return "languages";
  if (tag.includes("профессий")) return "skills";
  if (tag.includes("Психолог")) return "psychology";
  return "all";
}

// ─── Course Card ──────────────────────────────────────────────────────────────

function CourseCardItem({ course }: { course: CourseCard }) {
  const [open, setOpen] = useState(false);
  const Icon = course.icon;

  return (
    <div className="rounded-3xl border border-border/40 bg-card shadow-soft overflow-hidden">
      <div className="p-7">
        {/* Tag + free badge */}
        <div className="flex items-center justify-between mb-4">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${course.tagColor}`}>
            {course.tag}
          </span>
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
            course.free ? "bg-green-100 text-green-700" : "bg-[#FF9500]/10 text-[#FF9500]"
          }`}>
            {course.free ? "Бесплатно" : "Платно"}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-1">{course.title}</h3>
        <p className="text-xs text-muted-foreground mb-4">{course.teacher}</p>

        {/* Meta */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin size={12} className="text-primary" />
            {course.format}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users size={12} className="text-primary" />
            {course.level}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock size={12} className="text-primary" />
            {course.schedule}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar size={12} className="text-primary" />
            {course.duration}
          </div>
        </div>

        {/* Spots warning */}
        {course.spots && (
          <div className="flex items-center gap-1.5 text-xs font-medium text-orange-600 bg-orange-50 px-3 py-1.5 rounded-xl mb-4">
            <CheckCircle size={12} />
            {course.spots}
          </div>
        )}

        {/* Description toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 text-sm text-primary font-medium hover:underline mb-4"
        >
          {open ? "Скрыть описание" : "Подробнее о программе"}
          {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {open && (
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 border-t border-border/40 pt-4">
            {course.description}
          </p>
        )}

        {/* CTA */}
        <a
          href={course.href}
          target={course.href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          {course.ctaLabel} <ArrowUpRight size={13} />
        </a>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EducationPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? courses
      : courses.filter((c) => tagToCategory(c.tag) === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-[#F0F4FF] border-b border-border/40 py-14 md:py-20">
        <div className="container-kovcheg">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-primary shadow-soft mb-5">
              <Globe size={13} />
              Языки · Профессии · Психология
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Языки и образование
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
              Разговорные клубы, языковые курсы, обучение профессиям и
              психологические группы. Все форматы — для людей с антивоенной
              позицией, без осуждения.
            </p>
          </div>
        </div>
      </section>

      {/* Why Kovcheg section */}
      <section className="py-14 border-b border-border/40">
        <div className="container-kovcheg">
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              {
                icon: "🎓",
                title: "Проверенные преподаватели",
                text: "Наши педагоги прошли проверку как волонтёры Ковчега за 4 года. Лингвистическое образование и реальный опыт.",
              },
              {
                icon: "🤝",
                title: "Без осуждения",
                text: "Не встретите непонимания взглядов, политической позиции или ориентации. Среда единомышленников.",
              },
              {
                icon: "🌍",
                title: "Для реальной жизни",
                text: "Курсы заточены под потребности эмигрантов: язык для интеграции, профессии для удалённой работы.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl bg-card border border-border/40 p-6 shadow-soft"
              >
                <span className="text-3xl mb-4 block">{item.icon}</span>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter + courses */}
      <main className="container-kovcheg py-16">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                activeCategory === cat.id
                  ? "bg-primary text-white"
                  : "bg-muted text-foreground/70 hover:bg-[#D9E3FF]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Courses grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseCardItem key={course.id} course={course} />
          ))}
        </div>

        {/* Suggest a topic */}
        <div className="mt-16 rounded-3xl border border-dashed border-border p-8 md:p-10 text-center">
          <p className="text-2xl mb-3">💡</p>
          <h3 className="text-xl font-bold mb-2">Не нашли нужный курс?</h3>
          <p className="text-muted-foreground text-sm mb-5 max-w-md mx-auto">
            Мы регулярно открываем новые группы. Оставьте пожелание по языку,
            теме или профессии — откроем набор при достаточном интересе.
          </p>
          <a
            href="https://t.me/EmigrantHelpBot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Оставить пожелание <ArrowUpRight size={13} />
          </a>
        </div>

        {/* Личный специалист (платформа) */}
        <div className="mt-6 rounded-3xl border border-primary/20 bg-[#F0F4FF] p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary shadow-soft">
              Новое
            </span>
            <h3 className="mt-3 text-xl font-bold mb-2">
              Нужна не группа, а личный специалист?
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Ментор, карьерный консультант, репетитор один-на-один или помощь с
              нострификацией диплома? На платформе специалистов Ковчега ИИ
              подберёт проверенного профи под ваш запрос и поможет связаться.
            </p>
          </div>
          <a
            href="https://joinpro.store/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Найти специалиста <ArrowUpRight size={13} />
          </a>
        </div>

        {/* Teachers CTA */}
        <div className="mt-6 rounded-3xl bg-muted/60 border border-border/40 p-7 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="font-bold mb-1">Вы преподаватель или психолог?</p>
            <p className="text-sm text-muted-foreground">
              Ищем преподавателей языков, ведущих курсов по профессиям и
              психологов для групп.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeKR0Jr-bvP7J5NwjeeUisx9THOQNk_5MiEVjxfDuQm8YZV5g/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-primary font-medium border border-primary/30 px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-colors"
            >
              Преподавать язык
            </a>
            <a
              href="https://forms.gle/SfFhr91ZG2iKD41G7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-primary font-medium border border-primary/30 px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-colors"
            >
              Вести курс
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
