import { LifeBuoy, Briefcase, Users, Megaphone } from "lucide-react";

const items = [
  { icon: LifeBuoy, title: "Помощь в экстренных ситуациях", desc: "Жильё, юридическая и психологическая поддержка тем, кому тяжело." },
  { icon: Briefcase, title: "Развитие предпринимателей", desc: "Ковчег Бизнес — нетворк, менторство, новые проекты в эмиграции." },
  { icon: Users, title: "Создание сообществ", desc: "Чаты в 49 странах, события, профессиональные группы." },
  { icon: Megaphone, title: "Гражданское участие", desc: "Адвокация прав россиян за рубежом, международные доклады." },
];

export const DiasporaStrong = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container-kovcheg">
        <div className="max-w-3xl mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">Диаспора</p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-balance">
            Россияне — везде. <br />
            <span className="text-primary">Диаспора — это сила.</span>
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div
              key={it.title}
              className="group rounded-3xl bg-card p-7 shadow-soft hover:shadow-card transition-all hover:-translate-y-1 border border-border/40"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <it.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="mt-5 text-lg font-bold leading-tight">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
