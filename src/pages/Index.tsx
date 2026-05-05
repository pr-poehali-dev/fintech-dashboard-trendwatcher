import { useState } from "react";
import Icon from "@/components/ui/icon";

const CATEGORIES = ["Все", "Партнёрство", "Регулирование", "Новый продукт", "Рынок"];

const NEWS = [
  {
    id: 1,
    title: "ЦБ РФ вводит обязательный open banking стандарт для банков топ-50",
    importance: 5,
    category: "Регулирование",
    tag: "regulation",
    summary:
      "Банк России опубликовал проект положения об открытых API, обязывающий крупнейшие банки предоставить доступ к счетам клиентов через единый протокол к Q1 2026. Штрафы за несоответствие — до 0.5% от капитала. Переходный период составит 18 месяцев.",
    source: "cbr.ru",
    sourceUrl: "#",
    whyNow:
      "Дедлайн технической готовности наступает через 6 месяцев. Банкам, не начавшим интеграцию, грозят санкции регулятора уже в следующем квартале.",
    date: "06 мая 2026",
  },
  {
    id: 2,
    title: "Т-Банк и Яндекс запускают совместную платёжную экосистему",
    importance: 4,
    category: "Партнёрство",
    tag: "partnership",
    summary:
      "Т-Банк и Яндекс объявили о создании совместного платёжного продукта, который объединит Яндекс Пэй и карты Т-Банка в единый кошелёк. Пользователи получат кешбэк до 10% в сервисах Яндекса при оплате картой партнёра. Запуск ожидается в июне 2026.",
    source: "tbank.ru",
    sourceUrl: "#",
    whyNow:
      "Сбербанк и VK уже анонсировали аналогичный альянс. Рынок суперприложений консолидируется быстрее прогнозов — окно для партнёрств закрывается.",
    date: "05 мая 2026",
  },
  {
    id: 3,
    title: "BNPL-кредитование в России выросло на 340% за год",
    importance: 4,
    category: "Рынок",
    tag: "market",
    summary:
      "По данным Frank RG, объём рынка Buy Now Pay Later в России достиг 890 млрд рублей в 2025 году. Основной прирост — в сегменте e-commerce и fashion. Крупнейшие игроки: Долями, Яндекс Сплит, СберПэй Частями. Просрочка пока держится на уровне 3.2%.",
    source: "frankrg.com",
    sourceUrl: "#",
    whyNow:
      "ЦБ рассматривает ужесточение регулирования BNPL в H2 2026. Игроки без лицензии МФО могут выпасть с рынка — окно для входа сужается.",
    date: "04 мая 2026",
  },
  {
    id: 4,
    title: "Сбер выпускает встроенный AI-андеррайтинг для МСБ-кредитов",
    importance: 3,
    category: "Новый продукт",
    tag: "product",
    summary:
      "СберБизнес запустил продукт автоматического кредитного анализа для малого бизнеса на базе собственной LLM. Система анализирует выписки, налоговую отчётность и данные Росстата в режиме реального времени. Решение по кредиту до 5 млн ₽ выдаётся за 4 минуты без участия аналитика.",
    source: "sberbank.ru",
    sourceUrl: "#",
    whyNow:
      "Конкуренты начнут копирование в течение 6–9 месяцев. Банкам, работающим с МСБ, необходимо оценить собственную технологическую позицию уже сейчас.",
    date: "03 мая 2026",
  },
];

function StarRating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5 shrink-0">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="11"
          height="11"
          viewBox="0 0 12 12"
          fill={star <= value ? "#22c55e" : "none"}
          stroke={star <= value ? "#22c55e" : "#333"}
          strokeWidth="1.2"
        >
          <polygon points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9.5 3,11 3.5,7.5 1,5 4.5,4.5" />
        </svg>
      ))}
      <span className="font-mono-custom text-[10px] text-muted-foreground ml-1 tabular-nums">
        {value}/5
      </span>
    </div>
  );
}

const TAG_LABELS: Record<string, string> = {
  partnership: "Партнёрство",
  regulation: "Регулирование",
  product: "Новый продукт",
  market: "Рынок",
};

function NewsCard({ item, delay }: { item: (typeof NEWS)[0]; delay: string }) {
  return (
    <article
      className={`terminal-border card-hover bg-card rounded-[var(--radius)] p-5 flex flex-col gap-4 animate-fade-in ${delay}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`font-mono-custom text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-sm border tag-${item.tag}`}
            >
              {TAG_LABELS[item.tag]}
            </span>
            <span className="font-mono-custom text-[10px] text-muted-foreground">{item.date}</span>
          </div>
          <h2 className="text-sm font-semibold text-foreground leading-snug">{item.title}</h2>
        </div>
        <StarRating value={item.importance} />
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">{item.summary}</p>

      <div className="border-l-2 border-[#22c55e33] pl-3">
        <div className="font-mono-custom text-[10px] text-[#22c55e] tracking-widest uppercase mb-1">
          WHY NOW
        </div>
        <p className="text-xs text-foreground/75 leading-relaxed">{item.whyNow}</p>
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-border">
        <span className="font-mono-custom text-[10px] text-muted-foreground">{item.source}</span>
        <a
          href={item.sourceUrl}
          className="flex items-center gap-1 font-mono-custom text-[10px] text-[#22c55e] hover:text-[#4ade80] transition-colors"
        >
          Источник
          <Icon name="ExternalLink" size={10} />
        </a>
      </div>
    </article>
  );
}

const STAGGER = ["stagger-1", "stagger-2", "stagger-3", "stagger-4"];

export default function Index() {
  const [activeFilter, setActiveFilter] = useState("Все");

  const filtered =
    activeFilter === "Все" ? NEWS : NEWS.filter((n) => n.category === activeFilter);

  const now = new Date().toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_8px_#22c55e80]" />
            <span className="font-mono-custom text-sm font-semibold tracking-widest uppercase text-foreground">
              ТрендВотчер
            </span>
            <span className="font-mono-custom text-[10px] text-muted-foreground hidden sm:inline">
              / FINTECH DIGEST
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Clock" size={11} />
            <span className="font-mono-custom text-[10px]">Обновлено: {now}</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Hero */}
        <div className="mb-8 animate-fade-in">
          <div className="font-mono-custom text-[10px] text-muted-foreground tracking-widest uppercase mb-2">
            Внутренний инструмент · Команда банка
          </div>
          <h1 className="text-xl font-semibold text-foreground tracking-tight">
            Финтех дайджест
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            {NEWS.length} материала · ключевые события рынка
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-6 flex-wrap animate-fade-in stagger-1">
          <Icon name="SlidersHorizontal" size={12} className="text-muted-foreground mr-1" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`font-mono-custom text-[11px] tracking-wide px-3 py-1 rounded-sm border transition-all duration-150 ${
                activeFilter === cat
                  ? "border-[#22c55e] text-[#22c55e] bg-[#22c55e12]"
                  : "border-border text-muted-foreground hover:border-[#22c55e50] hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="font-mono-custom text-[10px] text-muted-foreground ml-auto tabular-nums">
            {filtered.length} / {NEWS.length}
          </span>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((item, i) => (
              <NewsCard key={item.id} item={item} delay={STAGGER[i % 4]} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 font-mono-custom text-xs text-muted-foreground">
            — нет материалов по выбранной категории —
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-4">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <span className="font-mono-custom text-[10px] text-muted-foreground">
            ТрендВотчер · только для внутреннего использования
          </span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shadow-[0_0_4px_#22c55e]" />
            <span className="font-mono-custom text-[10px] text-[#22c55e]">LIVE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
