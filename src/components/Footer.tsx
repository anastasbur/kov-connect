import { Link } from "react-router-dom";
import { Anchor, Send, Youtube, Facebook, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
              Сообщество россиян с антивоенной позицией. Помогаем друг другу и держимся вместе.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="https://t.me/kovcheg_live" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 hover:bg-background/20 transition-colors" aria-label="Telegram">
                <Send className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 hover:bg-background/20 transition-colors" aria-label="YouTube">
                <Youtube className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 hover:bg-background/20 transition-colors" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-background/60">Помощь</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/help" className="hover:text-secondary">Юридическая помощь</Link></li>
              <li><Link to="/help" className="hover:text-secondary">Экстренное жильё</Link></li>
              <li><Link to="/help" className="hover:text-secondary">Психологическая помощь</Link></li>
              <li><Link to="/education" className="hover:text-secondary">Языковые курсы</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-background/60">Ковчег</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-secondary">О нас</Link></li>
              <li><Link to="/communities" className="hover:text-secondary">Сообщества</Link></li>
              <li><Link to="/advocacy" className="hover:text-secondary">Адвокация</Link></li>
              <li><Link to="/donate" className="hover:text-secondary">Поддержать</Link></li>
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
            <a href="#" className="hover:text-background">Политика</a>
            <a href="#" className="hover:text-background">Контакты</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
