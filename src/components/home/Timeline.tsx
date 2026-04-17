import { Sailboat } from "lucide-react";

const years = [
  {
    year: "2022",
    title: "Основание",
    points: ["Март 2022 — основан в ответ на войну", "Первая волна: жильё, юр. помощь", "Чаты взаимопомощи"],
  },
  {
    year: "2023",
    title: "Рост",
    points: ["150 000 получили поддержку", "Языковые курсы — 15 языков", "Запуск базы знаний"],
  },
  {
    year: "2024",
    title: "Зрелость",
    points: ["210 000 человек в 70 странах", "Ковчег Бизнес и «Первым Рейсом»", "Умная среда в Белграде"],
  },
  {
    year: "2025",
    title: "Сегодня",
    points: ["Новое позиционирование", "Платные форматы", "Международная адвокация"],
  },
];

export const Timeline = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container-kovcheg">
        <div className="max-w-3xl mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">История</p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-balance">
            Четыре года <span className="text-primary">плечом к плечу</span>
          </h2>
        </div>

        <div className="relative">
          {/* horizontal line */}
          <div className="hidden md:block absolute left-0 right-0 top-[60px] h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="grid gap-8 md:grid-cols-4 md:gap-4">
            {years.map((y, i) => (
              <div key={y.year} className="relative">
                {/* marker */}
                <div className="flex md:block items-center gap-4 mb-4">
                  <div className="relative z-10 flex h-[120px] w-[120px] items-center justify-center mx-auto">
                    <div className="absolute inset-0 rounded-full bg-muted" />
                    <div className="absolute inset-2 rounded-full bg-card border-2 border-primary/20 flex flex-col items-center justify-center">
                      <span className="text-xl font-extrabold text-primary">{y.year}</span>
                    </div>
                    {i === years.length - 1 && (
                      <div className="absolute -top-3 -right-2 text-primary animate-sail">
                        <Sailboat className="h-7 w-7" strokeWidth={1.5} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-center md:px-3">
                  <h3 className="text-lg font-bold mb-3">{y.title}</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {y.points.map((p) => (
                      <li key={p} className="leading-relaxed">{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
