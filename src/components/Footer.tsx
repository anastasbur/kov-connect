import { Link } from "react-router-dom";
import { Anchor, Send, Youtube, Facebook, Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const socials = [
  { icon: Send, label: "Telegram", url: "https://t.me/ArkHelps" },
  { icon: Youtube, label: "YouTube", url: "https://www.youtube.com/@kovcheglive" },
  { icon: Instagram, label: "Instagram", url: "https://www.instagram.com/kovcheg.live" },
  { icon: Facebook, label: "Facebook", url: "https://www.facebook.com/kovcheg.live" },
];

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background mt-20">
      <div className="container-kovcheg py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-background/10">
                <Anchor className="h-5 w-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight">КОВЧЕГ</span>
            </div>
            <p className="text-sm text-background/70 leading-relaxed">
              Сообщество россиян с антивоенной позицией. Помогаем друг другу и держимся вместе — по обе стороны границы.
            </p>
            <div className="flex gap-3 mt-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 hover:bg-background/20 transition-colors"
                  aria-label={s.label}
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-background/60">Помощь</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/help#legal" className="hover:text-secondary">Правовая помощь</Link></li>
              <li><Link to="/help#housing" className="hover:text-secondary">Экстренное жильё</Link></li>
              <li><Link to="/help#psy" className="hover:text-secondary">Психологическая помощь</Link></li>
              <li>
                <a href="https://t.me/kovchegvpnbot" target="_blank" rel="noopener noreferrer" className="hover:text-secondary">Ковчег VPN</a>
              </li>
              <li><Link to="/knowledge" className="hover:text-secondary">База знаний</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-background/60">Проект</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-secondary">О нас</Link></li>
              <li><Link to="/stories" className="hover:text-secondary">Истории</Link></li>
              <li><Link to="/communities" className="hover:text-secondary">Сообщества</Link></li>
              <li><Link to="/advocacy" className="hover:text-secondary">Адвокация</Link></li>
              <li>
                <a href="https://joinpro.store/" target="_blank" rel="noopener noreferrer" className="hover:text-secondary">Специалисты и услуги</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-background/60">Рассылка</h4>
            <p className="text-sm text-background/70 mb-4">Получайте новости и анонсы событий.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <Input
                type="email"
                placeholder="Email"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50 rounded-full"
              />
              <Button type="submit" size="icon" variant="white" className="rounded-full shrink-0">
                <Mail className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between gap-4 text-sm text-background/60">
          <p>© {new Date().getFullYear()} Ковчег. Сообщество единомышленников.</p>
          <div className="flex gap-6">
            <Link to="/about#contacts" className="hover:text-background">Контакты</Link>
            <a href="mailto:team@kovcheg.live" className="hover:text-background">team@kovcheg.live</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
