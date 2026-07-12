import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Heart, Users, Scale, Home, ArrowUpRight, CheckCircle } from "lucide-react";

const amounts = [15, 20, 25, 30, 50];

const impactItems = [
  { icon: Home, color: "text-orange-500 bg-orange-50", amount: "$20", label: "Одна ночь в экстренном жилье для преследуемого" },
  { icon: Scale, color: "text-primary bg-[#D9E3FF]", amount: "$25", label: "Юридическая консультация для двух человек" },
  { icon: Heart, color: "text-green-600 bg-green-50", amount: "$30", label: "Место в психологической группе поддержки" },
  { icon: Users, color: "text-[#6F8DFF] bg-[#F0F4FF]", amount: "$50", label: "Неделя работы волонтёрской инфраструктуры" },
];

const volunteerRoles = [
  {
    title: "Модерировать чат",
    desc: "Поддерживать безопасную и бережную атмосферу в чатах 70+ стран и профессиональных сообществах.",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSeZG4a4YDgjUsiTnxrnzpYZj8wAkwj67I-N6cVzVxxQ1yOBqQ/viewform",
  },
  {
    title: "Стать психологом-волонтёром",
    desc: "2–4 бесплатные консультации для людей в кризисном состоянии. Нужен диплом психолога или психотерапевта.",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSdY11pe3QqNbo-tUUonHxJdX9H11Osxq4iWDWY8pEedDiiTmw/viewform",
  },
  {
    title: "Преподавать язык",
    desc: "Вести разговорный клуб или языковой курс для эмигрантов. Опыт преподавания обязателен.",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSeKR0Jr-bvP7J5NwjeeUisx9THOQNk_5MiEVjxfDuQm8YZV5g/viewform",
  },
  {
    title: "Вести курс или вебинар",
    desc: "Поделиться профессиональными знаниями — курс, лекция или клуб по интересам.",
    url: "https://forms.gle/SfFhr91ZG2iKD41G7",
  },
];

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentTab, setPaymentTab] = useState<"card" | "paypal" | "crypto">("card");

  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-[#F0F4FF] border-b border-border/40 py-14 md:py-20">
        <div className="container-kovcheg">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-primary shadow-soft mb-5">
              <Heart size={13} className="text-[#FF9500]" />
              Ваша поддержка меняет жизни
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Поддержать<br />
              <span className="text-primary">«Ковчег»</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
              Каждый день антивоенные россияне сталкиваются с арестами, повестками,
              уголовными делами и угрозой преследования. Ваши пожертвования — это
              экстренное жильё, юридическая и психологическая помощь для тех, кто
              оказался в беде. «Ковчег» существует только благодаря солидарности.
            </p>
          </div>
        </div>
      </section>

      <main className="container-kovcheg py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">

          {/* ── Donation form ─────────────────────── */}
          <div>
            <h2 className="text-2xl font-extrabold mb-6">Сделать пожертвование</h2>

            {/* Amount selector */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-muted-foreground mb-3">Выберите сумму (USD)</p>
              <div className="grid grid-cols-5 gap-2 mb-3">
                {amounts.map((a) => (
                  <button
                    key={a}
                    onClick={() => { setSelectedAmount(a); setCustomAmount(""); }}
                    className={`py-2.5 rounded-2xl text-sm font-bold transition-colors ${
                      selectedAmount === a && !customAmount
                        ? "bg-primary text-white"
                        : "bg-muted text-foreground hover:bg-[#D9E3FF]"
                    }`}
                  >
                    ${a}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(0); }}
                placeholder="Своя сумма в USD"
                className="w-full px-4 py-3 rounded-2xl border border-[#D9E3FF] bg-white text-sm outline-none focus:border-primary"
              />
            </div>

            {/* Monthly toggle */}
            <div className="flex items-center gap-3 mb-6 p-4 bg-[#F0F4FF] rounded-2xl">
              <CheckCircle size={18} className="text-primary shrink-0" />
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Ежемесячные пожертвования</span> особенно помогают нам — позволяют планировать работу и брать долгосрочные обязательства.
              </p>
            </div>

            {/* Payment tabs */}
            <div className="mb-4">
              <div className="flex rounded-2xl overflow-hidden border border-border/40">
                {(["card", "paypal", "crypto"] as const).map((tab) => {
                  const labels = { card: "💳 Карта", paypal: "🌐 PayPal", crypto: "🪙 Крипто" };
                  return (
                    <button
                      key={tab}
                      onClick={() => setPaymentTab(tab)}
                      className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                        paymentTab === tab ? "bg-primary text-white" : "bg-card text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {labels[tab]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Payment content */}
            <div className="rounded-3xl border border-border/40 bg-card p-6 mb-4">
              {paymentTab === "card" && (
                <div>
                  <p className="text-sm text-muted-foreground mb-4">Оплата зарубежной банковской картой через защищённую форму.</p>
                  <a
                    href="https://donate.kovcheg.live/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#FF9500] text-white py-3.5 rounded-2xl font-bold text-base hover:bg-orange-600 transition-colors"
                  >
                    Поддержать ${finalAmount || "..."} <ArrowUpRight size={16} />
                  </a>
                </div>
              )}
              {paymentTab === "paypal" && (
                <div>
                  <p className="text-sm text-muted-foreground mb-4">Перевод через PayPal — безопасно и анонимно.</p>
                  <a
                    href="https://donate.kovcheg.live/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#FF9500] text-white py-3.5 rounded-2xl font-bold text-base hover:bg-orange-600 transition-colors"
                  >
                    Перейти к оплате <ArrowUpRight size={16} />
                  </a>
                </div>
              )}
              {paymentTab === "crypto" && (
                <div className="space-y-3 text-sm">
                  <p className="text-muted-foreground mb-4">Криптовалюта — максимально анонимный способ поддержки.</p>
                  {[
                    { label: "BTC", addr: "bc1qnxmjjj23e5u6y8slhl9wss74t3wep6tke2nc60" },
                    { label: "USDT TRC20", addr: "Уточните на сайте donate.kovcheg.live" },
                    { label: "ETH ERC20", addr: "Уточните на сайте donate.kovcheg.live" },
                  ].map((c) => (
                    <div key={c.label} className="bg-muted rounded-2xl p-3">
                      <p className="font-semibold text-xs text-primary mb-1">{c.label}</p>
                      <p className="text-xs font-mono text-muted-foreground break-all">{c.addr}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Security note */}
            <div className="text-xs text-muted-foreground bg-muted rounded-2xl p-4 leading-relaxed">
              <strong className="text-foreground">О безопасности:</strong> Минюст России признал «Ковчег» иностранным агентом. Мы принципиально не подключали российские платёжные сервисы. Поддерживать нас через зарубежные карты, PayPal и крипту — законно.
            </div>
          </div>

          {/* ── Impact + volunteer ───────────────── */}
          <div className="space-y-8">
            {/* Impact */}
            <div>
              <h2 className="text-2xl font-extrabold mb-5">На что идут деньги</h2>
              <div className="space-y-3">
                {impactItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-4 p-4 rounded-3xl border border-border/40 bg-card shadow-soft">
                      <div className={`p-3 rounded-2xl shrink-0 ${item.color}`}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <span className="text-lg font-extrabold text-primary">{item.amount}</span>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Volunteer */}
            <div>
              <h2 className="text-2xl font-extrabold mb-2">Стать волонтёром</h2>
              <p className="text-muted-foreground text-sm mb-5">Если не можете поддержать финансово — можно помочь временем и профессиональными знаниями.</p>
              <div className="space-y-3">
                {volunteerRoles.map((role) => (
                  <a key={role.title} href={role.url} target="_blank" rel="noopener noreferrer"
                    className="group flex items-start gap-4 p-5 rounded-3xl border border-border/40 bg-card shadow-soft hover:shadow-elevated hover:-translate-y-0.5 transition-all">
                    <div className="flex-1">
                      <p className="font-bold text-sm group-hover:text-primary transition-colors">{role.title}</p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{role.desc}</p>
                    </div>
                    <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-0.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
