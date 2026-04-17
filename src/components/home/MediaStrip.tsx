const media = [
  "Washington Post",
  "BBC",
  "Foreign Policy",
  "Forbes",
  "Meduza",
  "Новая газета Европа",
];

export const MediaStrip = () => {
  return (
    <section className="py-14 border-y border-border/50 bg-card">
      <div className="container-kovcheg">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
          О нас пишут
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 md:gap-x-14">
          {media.map((m) => (
            <span
              key={m}
              className="text-lg md:text-xl font-bold text-foreground/40 hover:text-primary transition-colors cursor-pointer tracking-tight"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
