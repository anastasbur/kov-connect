const stats = [
  { num: "220 000", label: "человек получили помощь" },
  { num: "49", label: "стран с сообществами" },
  { num: "350 000+", label: "аудитория сообществ" },
  { num: "4 года", label: "вместе" },
];

export const Stats = () => {
  return (
    <section className="bg-muted/60 py-14 md:py-20">
      <div className="container-kovcheg">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight">
                {s.num}
              </div>
              <div className="mt-2 text-sm md:text-base text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
