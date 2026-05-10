import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

type NewsItem = {
  id: number;
  title: string;
  importance: number;
  category: string;
  tag: "regulation" | "partnership" | "product" | "market";
  summary: string;
  source: string;
  whyNow: string;
  date: string;
  readTime: string;
};

const NEWS: NewsItem[] = [
  {
    id: 1,
    title: "ЦБ РФ вводит обязательный open banking стандарт для банков топ-50",
    importance: 5,
    category: "Регулирование",
    tag: "regulation",
    summary:
      "Банк России опубликовал проект положения об открытых API, обязывающий крупнейшие банки предоставить доступ к счетам клиентов через единый протокол к Q1 2026. Штрафы за несоответствие составят до 0.5% от капитала банка. Это крупнейшее регуляторное изменение в банковском секторе за последние пять лет.",
    source: "cbr.ru",
    whyNow:
      "Дедлайн технической готовности через 6 месяцев. Банки, не начавшие интеграцию, рискуют санкциями регулятора уже в следующем квартале.",
    date: "6 мая 2026",
    readTime: "3 мин",
  },
  {
    id: 2,
    title: "Т-Банк и Яндекс запускают совместную платёжную экосистему",
    importance: 4,
    category: "Партнёрство",
    tag: "partnership",
    summary:
      "Т-Банк и Яндекс объявили о создании совместного платёжного продукта, который объединит Яндекс Пэй и карты Т-Банка в единый кошелёк с кешбэком до 10% в сервисах Яндекса. Запуск запланирован на июнь 2026 года. Ожидаемая аудитория — более 40 млн пользователей.",
    source: "tbank.ru",
    whyNow:
      "Сбербанк и VK уже анонсировали аналогичный альянс. Рынок суперприложений консолидируется быстрее прогнозов — окно для партнёрств закрывается.",
    date: "5 мая 2026",
    readTime: "2 мин",
  },
  {
    id: 3,
    title: "BNPL-кредитование в России выросло на 340% за год",
    importance: 3,
    category: "Рынок",
    tag: "market",
    summary:
      "По данным Frank RG, объём рынка Buy Now Pay Later достиг 890 млрд рублей в 2025 году. Основной прирост — в e-commerce и fashion-сегменте. Просрочка держится на уровне 3.2%, что ниже прогнозов аналитиков.",
    source: "frankrg.com",
    whyNow:
      "ЦБ рассматривает ужесточение регулирования BNPL в H2 2026. Игроки без лицензии МФО могут выпасть с рынка.",
    date: "4 мая 2026",
    readTime: "4 мин",
  },
  {
    id: 4,
    title: "Сбер запускает AI-андеррайтинг для МСБ-кредитов за 4 минуты",
    importance: 2,
    category: "Продукт",
    tag: "product",
    summary:
      "СберБизнес запустил продукт автоматического кредитного анализа на базе собственной LLM. Решение по кредиту до 5 млн ₽ выдаётся за 4 минуты без участия аналитика. Сбер планирует масштабировать технологию на кредиты до 50 млн ₽.",
    source: "sberbank.ru",
    whyNow:
      "Конкуренты начнут копирование через 6–9 месяцев. Необходимо оценить собственную технологическую позицию уже сейчас.",
    date: "3 мая 2026",
    readTime: "3 мин",
  },
];

const TAG_CONFIG = {
  regulation: {
    label: "Регулирование",
    accent: "#92400e",
    light: "#fffbeb",
    borderColor: "#fde68a",
    dot: "#f59e0b",
    bar: "#f59e0b",
  },
  partnership: {
    label: "Партнёрство",
    accent: "#1e40af",
    light: "#eff6ff",
    borderColor: "#bfdbfe",
    dot: "#3b82f6",
    bar: "#3b82f6",
  },
  product: {
    label: "Продукт",
    accent: "#5b21b6",
    light: "#f5f3ff",
    borderColor: "#ddd6fe",
    dot: "#7c3aed",
    bar: "#7c3aed",
  },
  market: {
    label: "Рынок",
    accent: "#14532d",
    light: "#f0fdf4",
    borderColor: "#bbf7d0",
    dot: "#22c55e",
    bar: "#22c55e",
  },
};

function importanceMeta(v: number) {
  if (v >= 5) return { label: "Критично", color: "#dc2626", bg: "#fef2f2", border: "#fecaca" };
  if (v === 4) return { label: "Важно", color: "#b45309", bg: "#fffbeb", border: "#fde68a" };
  if (v === 3) return { label: "Следить", color: "#0369a1", bg: "#f0f9ff", border: "#bae6fd" };
  return { label: "К сведению", color: "#6b7280", bg: "#f9fafb", border: "#e5e7eb" };
}

const CATEGORIES = ["Все", "Регулирование", "Партнёрство", "Рынок", "Продукт"];

function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-300"
          style={{
            width: i === current ? "20px" : "6px",
            height: "6px",
            background: i === current ? "#1a1a1a" : "#d1d5db",
          }}
        />
      ))}
    </div>
  );
}

export default function Index() {
  const [activeFilter, setActiveFilter] = useState("Все");
  const [currentIdx, setCurrentIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = activeFilter === "Все" ? NEWS : NEWS.filter((n) => n.category === activeFilter);

  useEffect(() => {
    setCurrentIdx(0);
    if (containerRef.current) containerRef.current.scrollTop = 0;
  }, [activeFilter]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => {
      const idx = Math.round(container.scrollTop / container.clientHeight);
      setCurrentIdx(Math.min(idx, filtered.length - 1));
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [filtered.length]);

  const scrollTo = (idx: number) => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({ top: idx * container.clientHeight, behavior: "smooth" });
  };

  return (
    <div className="h-screen flex flex-col bg-[#f5f4f0] overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <header className="shrink-0 bg-white border-b border-[#ece9e4]">
        <div className="flex items-center justify-between px-5 h-[54px]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-[6px] bg-[#111827] flex items-center justify-center shadow-sm">
              <span className="text-white text-[10px] font-bold tracking-tight">ТВ</span>
            </div>
            <div>
              <div className="text-[13px] font-semibold text-[#111827] leading-none">ТрендВотчер</div>
              <div className="text-[10px] text-[#9ca3af] mt-[2px]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                {new Date().toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-[#f0fdf4] border border-[#bbf7d0] rounded-full px-2.5 py-[5px]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" style={{ boxShadow: "0 0 4px #22c55e" }} />
            <span className="text-[9px] font-semibold text-[#15803d] tracking-widest uppercase" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              LIVE
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-1.5 px-4 pb-3 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="shrink-0 text-[11px] font-medium px-3 py-[6px] rounded-full transition-all duration-200 border"
              style={
                activeFilter === cat
                  ? { background: "#111827", color: "#fff", borderColor: "#111827" }
                  : { background: "transparent", color: "#6b7280", borderColor: "#e5e7eb" }
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Full-height snap scroll */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-scroll no-scrollbar"
        style={{ scrollSnapType: "y mandatory", overscrollBehavior: "contain" }}
      >
        {filtered.map((item, idx) => {
          const tag = TAG_CONFIG[item.tag];
          const imp = importanceMeta(item.importance);

          return (
            <div
              key={item.id}
              className="flex flex-col"
              style={{
                height: "100%",
                scrollSnapAlign: "start",
                scrollSnapStop: "always",
                padding: "12px 16px",
              }}
            >
              <div
                className="flex-1 flex flex-col bg-white rounded-2xl overflow-hidden"
                style={{
                  boxShadow: "0 1px 2px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.07)",
                  border: "1px solid rgba(0,0,0,0.05)",
                }}
              >
                {/* Top accent bar */}
                <div className="h-[3px] w-full shrink-0" style={{ background: tag.bar }} />

                {/* Category row */}
                <div
                  className="px-5 py-3.5 flex items-center justify-between shrink-0"
                  style={{ background: tag.light, borderBottom: `1px solid ${tag.borderColor}` }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-[7px] h-[7px] rounded-full" style={{ background: tag.dot }} />
                    <span
                      className="text-[10px] font-bold tracking-[0.15em] uppercase"
                      style={{ color: tag.accent, fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      {tag.label}
                    </span>
                  </div>
                  <span
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-full border"
                    style={{ color: imp.color, background: imp.bg, borderColor: imp.border }}
                  >
                    {imp.label}
                  </span>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-5 pt-5 pb-3">
                  {/* Meta */}
                  <div className="flex items-center gap-2 mb-3.5">
                    <span className="text-[11px] text-[#9ca3af]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                      {item.date}
                    </span>
                    <span className="text-[#d1d5db] text-xs">·</span>
                    <span className="text-[11px] text-[#9ca3af]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                      {item.readTime} чтения
                    </span>
                  </div>

                  {/* Title */}
                  <h2
                    className="text-[19px] font-semibold text-[#111827] leading-[1.3] tracking-[-0.02em] mb-4"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.title}
                  </h2>

                  {/* Divider */}
                  <div className="h-px bg-[#f3f4f6] mb-4" />

                  {/* Summary */}
                  <p className="text-[13.5px] text-[#374151] leading-[1.7] mb-5">
                    {item.summary}
                  </p>

                  {/* Why Now */}
                  <div
                    className="rounded-xl p-4"
                    style={{ background: tag.light, border: `1px solid ${tag.borderColor}` }}
                  >
                    <div
                      className="text-[9px] font-bold tracking-[0.2em] uppercase mb-2"
                      style={{ color: tag.accent, fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      Почему сейчас
                    </div>
                    <p className="text-[12.5px] leading-[1.6]" style={{ color: tag.accent }}>
                      {item.whyNow}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div
                  className="px-5 py-3.5 flex items-center justify-between shrink-0"
                  style={{ borderTop: "1px solid #f3f4f6" }}
                >
                  <div className="flex items-center gap-1.5">
                    <Icon name="Globe" size={11} />
                    <span className="text-[11px] text-[#9ca3af]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                      {item.source}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-1.5 text-[11px] text-[#9ca3af] active:text-[#111827] transition-colors">
                      <Icon name="Bookmark" size={13} />
                      <span>Сохранить</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-[11px] text-[#9ca3af] active:text-[#111827] transition-colors">
                      <Icon name="Share2" size={13} />
                      <span>Поделиться</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom nav */}
      <div className="shrink-0 bg-white border-t border-[#ece9e4] px-5 py-3 flex items-center justify-between">
        <ProgressDots total={filtered.length} current={currentIdx} />

        <div className="flex items-center gap-1 bg-[#f3f4f6] rounded-full p-[3px]">
          <button
            onClick={() => scrollTo(Math.max(0, currentIdx - 1))}
            disabled={currentIdx === 0}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 disabled:opacity-30"
            style={currentIdx > 0 ? { background: "#111827" } : {}}
          >
            <Icon name="ChevronUp" size={15} style={{ color: currentIdx > 0 ? "#fff" : "#9ca3af" }} />
          </button>
          <button
            onClick={() => scrollTo(Math.min(filtered.length - 1, currentIdx + 1))}
            disabled={currentIdx === filtered.length - 1}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 disabled:opacity-30"
            style={currentIdx < filtered.length - 1 ? { background: "#111827" } : {}}
          >
            <Icon name="ChevronDown" size={15} style={{ color: currentIdx < filtered.length - 1 ? "#fff" : "#9ca3af" }} />
          </button>
        </div>

        <span
          className="text-[11px] text-[#9ca3af] tabular-nums"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          {currentIdx + 1}&thinsp;/&thinsp;{filtered.length}
        </span>
      </div>
    </div>
  );
}
