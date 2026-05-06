import { useState } from "react";
import Icon from "@/components/ui/icon";

const CATEGORIES = ["Все", "Партнёрство", "Регулирование", "Новый продукт", "Рынок"];

type NewsItem = {
  id: number;
  title: string;
  importance: number;
  category: string;
  tag: "regulation" | "partnership" | "product" | "market";
  summary: string;
  source: string;
  sourceUrl: string;
  whyNow: string;
  date: string;
};

const NEWS: NewsItem[] = [
  {
    id: 1,
    title: "ЦБ РФ вводит обязательный open banking стандарт для банков топ-50",
    importance: 5,
    category: "Регулирование",
    tag: "regulation",
    summary:
      "Банк России опубликовал проект положения об открытых API, обязывающий крупнейшие банки предоставить доступ к счетам клиентов через единый протокол к Q1 2026. Штрафы за несоответствие — до 0.5% от капитала.",
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
      "Т-Банк и Яндекс объявили о создании совместного платёжного продукта, который объединит Яндекс Пэй и карты Т-Банка в единый кошелёк. Кешбэк до 10% в сервисах Яндекса. Запуск — июнь 2026.",
    source: "tbank.ru",
    sourceUrl: "#",
    whyNow:
      "Сбербанк и VK уже анонсировали аналогичный альянс. Рынок суперприложений консолидируется быстрее прогнозов — окно для партнёрств закрывается.",
    date: "05 мая 2026",
  },
  {
    id: 3,
    title: "BNPL-кредитование в России выросло на 340% за год",
    importance: 3,
    category: "Рынок",
    tag: "market",
    summary:
      "По данным Frank RG, объём рынка Buy Now Pay Later достиг 890 млрд рублей в 2025 году. Основной прирост — в e-commerce и fashion. Просрочка держится на уровне 3.2%.",
    source: "frankrg.com",
    sourceUrl: "#",
    whyNow:
      "ЦБ рассматривает ужесточение регулирования BNPL в H2 2026. Игроки без лицензии МФО могут выпасть с рынка.",
    date: "04 мая 2026",
  },
  {
    id: 4,
    title: "Сбер выпускает встроенный AI-андеррайтинг для МСБ-кредитов",
    importance: 2,
    category: "Новый продукт",
    tag: "product",
    summary:
      "СберБизнес запустил продукт автоматического кредитного анализа на базе собственной LLM. Решение по кредиту до 5 млн ₽ выдаётся за 4 минуты без участия аналитика.",
    source: "sberbank.ru",
    sourceUrl: "#",
    whyNow:
      "Конкуренты начнут копирование в течение 6–9 месяцев. Необходимо оценить собственную технологическую позицию уже сейчас.",
    date: "03 мая 2026",
  },
];

function importanceConfig(v: number) {
  if (v >= 5)
    return {
      glow: "shadow-[0_0_0_1px_rgba(34,197,94,0.22),0_4px_24px_rgba(34,197,94,0.07)]",
      hoverGlow:
        "hover:shadow-[0_0_0_1px_rgba(34,197,94,0.45),0_8px_32px_rgba(34,197,94,0.13)]",
      dot: "bg-[#22c55e] shadow-[0_0_5px_#22c55e]",
      label: "text-[#22c55e]",
      starFill: "#22c55e",
    };
  if (v >= 3)
    return {
      glow: "shadow-[0_0_0_1px_rgba(234,179,8,0.18),0_4px_20px_rgba(234,179,8,0.05)]",
      hoverGlow:
        "hover:shadow-[0_0_0_1px_rgba(234,179,8,0.38),0_8px_28px_rgba(234,179,8,0.10)]",
      dot: "bg-[#eab308]",
      label: "text-[#eab308]",
      starFill: "#eab308",
    };
  return {
    glow: "shadow-[0_0_0_1px_rgba(255,255,255,0.06)]",
    hoverGlow: "hover:shadow-[0_0_0_1px_rgba(255,255,255,0.11),0_6px_20px_rgba(0,0,0,0.28)]",
    dot: "bg-[#52525b]",
    label: "text-[#52525b]",
    starFill: "#52525b",
  };
}

const TAG_CONFIG: Record<
  string,
  { label: string; color: string; bg: string; border: string; barFrom: string; barTo: string }
> = {
  regulation: {
    label: "Регулирование",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.09)",
    border: "rgba(245,158,11,0.22)",
    barFrom: "#f59e0b",
    barTo: "#b45309",
  },
  partnership: {
    label: "Партнёрство",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.09)",
    border: "rgba(59,130,246,0.22)",
    barFrom: "#3b82f6",
    barTo: "#1d4ed8",
  },
  product: {
    label: "Новый продукт",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.09)",
    border: "rgba(167,139,250,0.22)",
    barFrom: "#a78bfa",
    barTo: "#7c3aed",
  },
  market: {
    label: "Рынок",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.09)",
    border: "rgba(34,197,94,0.22)",
    barFrom: "#22c55e",
    barTo: "#15803d",
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  Партнёрство: "#3b82f6",
  Регулирование: "#f59e0b",
  "Новый продукт": "#a78bfa",
  Рынок: "#22c55e",
  Все: "#6b7280",
};

function StarRating({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center gap-[3px] shrink-0">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          width="10"
          height="10"
          viewBox="0 0 12 12"
          fill={s <= value ? color : "none"}
          stroke={s <= value ? color : "#3f3f46"}
          strokeWidth="1.2"
        >
          <polygon points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9.5 3,11 3.5,7.5 1,5 4.5,4.5" />
        </svg>
      ))}
    </div>
  );
}

function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  const imp = importanceConfig(item.importance);
  const tag = TAG_CONFIG[item.tag];

  return (
    <article
      className={`relative flex bg-[#111111] rounded-xl overflow-hidden transition-all duration-300 cursor-pointer animate-fade-in group ${imp.glow} ${imp.hoverGlow}`}
      style={{ animationDelay: `${index * 0.07}s`, opacity: 0 }}
    >
      {/* Left accent bar */}
      <div
        className="w-[3px] shrink-0 transition-opacity duration-300 opacity-60 group-hover:opacity-100"
        style={{ background: `linear-gradient(180deg, ${tag.barFrom}, ${tag.barTo})` }}
      />

      <div className="flex flex-col gap-3.5 p-5 flex-1 min-w-0">
        {/* Top */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="font-mono-custom text-[10px] tracking-widest uppercase px-2.5 py-[3px] rounded-full border"
                style={{ color: tag.color, background: tag.bg, borderColor: tag.border }}
              >
                {tag.label}
              </span>
              <span className="font-mono-custom text-[10px] text-zinc-600">{item.date}</span>
            </div>
            <h2 className="text-[13px] font-semibold text-zinc-100 leading-snug">{item.title}</h2>
          </div>

          <div className="flex flex-col items-end gap-1.5 shrink-0 pt-0.5">
            <StarRating value={item.importance} color={imp.starFill} />
            <span className={`font-mono-custom text-[10px] font-medium tabular-nums ${imp.label}`}>
              {item.importance}/5
            </span>
          </div>
        </div>

        {/* Summary */}
        <p className="text-[12px] text-zinc-500 leading-relaxed">{item.summary}</p>

        {/* Why Now box */}
        <div
          className="rounded-lg px-3.5 py-3"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            className="font-mono-custom text-[9px] tracking-[0.18em] uppercase mb-1.5"
            style={{ color: imp.starFill }}
          >
            Why Now
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed">{item.whyNow}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-0.5">
          <div className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${imp.dot}`} />
            <span className="font-mono-custom text-[10px] text-zinc-600">{item.source}</span>
          </div>
          <a
            href={item.sourceUrl}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 font-mono-custom text-[10px] text-zinc-600 hover:text-zinc-200 transition-colors"
          >
            Источник <Icon name="ExternalLink" size={9} />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Index() {
  const [active, setActive] = useState("Все");

  const filtered = active === "Все" ? NEWS : NEWS.filter((n) => n.category === active);
  const topColor = CATEGORY_COLORS[active] ?? "#22c55e";

  const now = new Date().toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Top color stripe */}
      <div
        className="h-[2px] w-full transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${topColor}bb 25%, ${topColor} 50%, ${topColor}bb 75%, transparent 100%)`,
        }}
      />

      {/* Header */}
      <header className="border-b border-white/[0.05] bg-[#0a0a0a]/90 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-[7px] h-[7px] rounded-full transition-all duration-500"
              style={{ background: topColor, boxShadow: `0 0 8px ${topColor}88` }}
            />
            <span className="font-mono-custom text-[13px] font-semibold tracking-[0.12em] uppercase text-zinc-100">
              ТрендВотчер
            </span>
            <span className="font-mono-custom text-[10px] text-zinc-600 hidden sm:block">
              / FINTECH DIGEST
            </span>
          </div>
          <div className="flex items-center gap-2 text-zinc-600">
            <Icon name="RefreshCw" size={11} />
            <span className="font-mono-custom text-[10px]">{now}</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-9">
        {/* Hero text */}
        <div className="mb-8 animate-fade-in">
          <p className="font-mono-custom text-[10px] text-zinc-600 tracking-[0.2em] uppercase mb-2">
            Внутренний инструмент · Команда банка
          </p>
          <h1 className="text-[22px] font-semibold text-zinc-100 tracking-tight">
            Финтех дайджест
          </h1>
          <p className="text-xs text-zinc-600 mt-1">{NEWS.length} материала · ключевые события рынка</p>
        </div>

        {/* Pill filters */}
        <div
          className="flex items-center gap-2 mb-7 flex-wrap animate-fade-in"
          style={{ animationDelay: "0.05s" }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = active === cat;
            const c = CATEGORY_COLORS[cat];
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="font-mono-custom text-[11px] px-3.5 py-[7px] rounded-full border transition-all duration-200"
                style={
                  isActive
                    ? {
                        color: c,
                        background: `${c}14`,
                        borderColor: `${c}44`,
                        boxShadow: `0 0 14px ${c}1a`,
                      }
                    : {
                        color: "#52525b",
                        background: "transparent",
                        borderColor: "rgba(255,255,255,0.07)",
                      }
                }
              >
                {cat}
              </button>
            );
          })}
          <span className="font-mono-custom text-[10px] text-zinc-700 ml-auto tabular-nums">
            {filtered.length} / {NEWS.length}
          </span>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filtered.map((item, i) => (
              <NewsCard key={item.id} item={item} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 font-mono-custom text-xs text-zinc-700">
            — нет материалов —
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] mt-16 py-4">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <span className="font-mono-custom text-[10px] text-zinc-700">
            ТрендВотчер · только для внутреннего использования
          </span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shadow-[0_0_4px_#22c55e80]" />
            <span className="font-mono-custom text-[10px] text-[#22c55e]">LIVE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
