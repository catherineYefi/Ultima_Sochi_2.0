import React, { useEffect, useRef } from "react";
import {
  MessageCircle,
  Satellite,
  Target,
  Flame,
  Rocket,
  CheckCircle,
  Zap,
  Award,
  ArrowRight,
  User,
} from "lucide-react";

function App() {
  const sectionsRef = useRef([]);
  const activeIndex = useRef(0);

  // Добавляем секции в список рефов (для анимаций и навигации)
  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  // Скролл к конкретному слайду
  const scrollToSlide = (index) => {
    const slides = sectionsRef.current;
    if (!slides || !slides[index]) return;

    activeIndex.current = index;
    slides[index].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Следующий слайд
  const goNext = () => {
    const slides = sectionsRef.current;
    if (!slides || slides.length === 0) return;

    const lastIndex = slides.length - 1;
    const nextIndex = Math.min(activeIndex.current + 1, lastIndex);

    if (nextIndex !== activeIndex.current) {
      scrollToSlide(nextIndex);
    }
  };

  // Предыдущий слайд
  const goPrev = () => {
    if (activeIndex.current <= 0) {
      scrollToSlide(0);
      return;
    }
    const prevIndex = activeIndex.current - 1;
    scrollToSlide(prevIndex);
  };

  useEffect(() => {
    const sections = sectionsRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            // Обновляем текущий индекс активного слайда
            const idx = sections.indexOf(entry.target);
            if (idx !== -1) {
              activeIndex.current = idx;
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px",
      }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        goNext();
      }
      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        goPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="ultima-deck">
      {/* Slide 1 - Титульный */}
      <section className="ultima-slide bg-space align-center" ref={addToRefs}>
        <div className="ultima-content">
          <h1 className="ultima-title gradient-text">ULTIMA 9.0</h1>
          <p className="context-label">ULTIMA / Нечто / 2026</p>
          <p className="ultima-subtitle">Где цели превращаются в результат.</p>

          <div className="title-flow-icons">
            <div className="flow-item">
              <Target size={24} strokeWidth={2} />
              <span>Стратсессия</span>
            </div>
            <div className="flow-item">
              <Zap size={24} strokeWidth={2} />
              <span>Трекер</span>
            </div>
            <div className="flow-item">
              <Award size={24} strokeWidth={2} />
              <span>Фокус</span>
            </div>
          </div>
        </div>

        <div className="nav-buttons">
          <button className="nav-btn prev" onClick={goPrev}>
            ←
          </button>
          <button className="nav-btn next" onClick={goNext}>
            →
          </button>
        </div>
      </section>

      {/* Slide 2 - Hook */}
      <section className="ultima-slide bg-space align-left" ref={addToRefs}>
        <div className="ultima-content">
          <p className="label-small">Мы увидели одну вещь.</p>
          <h2 className="heading-hero gradient-text">
            Большинство
            <br />
            предпринимателей растут
            <br />
            неравномерно
          </h2>
          <div className="text-block">
            <p className="text-large">Не потому что им не хватает мотивации.</p>
            <p className="text-large accent-text">Им не хватает системы.</p>
          </div>
        </div>

        <div className="nav-buttons">
          <button className="nav-btn prev" onClick={goPrev}>
            ←
          </button>
          <button className="nav-btn next" onClick={goNext}>
            →
          </button>
        </div>
      </section>

      {/* Slide 3 - Big Insight */}
      <section
        className="ultima-slide bg-half-planet align-center"
        ref={addToRefs}
      >
        <div className="ultima-content" style={{ maxWidth: "1000px" }}>
          <p className="label-pill">Смена парадигмы</p>
          <h2 className="heading-massive gradient-text">
            Предпринимателям
            <br />
            больше не нужны
            <br />
            «сезоны»
          </h2>
          <p className="text-large accent-line">
            Им нужен годовой контур, который ведёт бизнес от стратегии → к
            внедрению.
          </p>
        </div>

        <div className="nav-buttons">
          <button className="nav-btn prev" onClick={goPrev}>
            ←
          </button>
          <button className="nav-btn next" onClick={goNext}>
            →
          </button>
        </div>
      </section>

      {/* Slide 4 - Новый контур */}
      <section className="ultima-slide bg-gray align-left" ref={addToRefs}>
        <div className="ultima-content">
          <h2 className="heading-large gradient-text">Новый твёрдый контур</h2>
          <p className="text-medium">ULTIMA 9.0 объединяет:</p>
          <div className="pill-grid">
            <div className="pill-item large">TrueHard</div>
            <div className="pill-item large">Спринты</div>
            <div className="pill-item large">ScaleUp</div>
            <div className="pill-item">Фокус</div>
            <div className="pill-item">методологию «Нечто»</div>
          </div>
          <p className="text-large accent-text" style={{ marginTop: "40px" }}>
            Теперь это — единая архитектура роста.
          </p>
        </div>

        <div className="nav-buttons">
          <button className="nav-btn prev" onClick={goPrev}>
            ←
          </button>
          <button className="nav-btn next" onClick={goNext}>
            →
          </button>
        </div>
      </section>

      {/* Slide 5 - Десятки 2.0 */}
      <section
        className="ultima-slide ultima-slide--compact bg-gray align-center"
        ref={addToRefs}
      >
        <div className="ultima-content">
          <h2 className="heading-large gradient-text">Десятки 2.0</h2>
          <div className="stats-grid">
            <div className="stat-card glass-card">
              <div className="stat-number glowing-number">6</div>
              <div className="stat-label">месяцев цикла</div>
              <div className="stat-sublabel">полный трансформационный ритм</div>
            </div>
            <div className="stat-card glass-card">
              <div className="stat-number glowing-number">14</div>
              <div className="stat-label">дней между встречами</div>
              <div className="stat-sublabel">время на внедрение</div>
              <div className="stat-note">
                *первые 4 встречи — еженедельно для структуры и буста
              </div>
            </div>
            <div className="stat-card glass-card">
              <div className="stat-number glowing-number">8</div>
              <div className="stat-label">элементов системы</div>
              <div className="stat-sublabel">
                СС · трекер · лидер · группа · бадди · совет директоров ·
                приглашенные эксперты · воркшопы
              </div>
            </div>
          </div>
          <p className="text-large accent-text" style={{ marginTop: "48px" }}>
            Ритм, который даёт глубину и пространство для внедрения.
          </p>
        </div>

        <div className="nav-buttons">
          <button className="nav-btn prev" onClick={goPrev}>
            ←
          </button>
          <button className="nav-btn next" onClick={goNext}>
            →
          </button>
        </div>
      </section>

      {/* Slide 6 - Две точки */}
      <section
        className="ultima-slide ultima-slide--compact bg-space align-center"
        ref={addToRefs}
      >
        <div className="ultima-content">
          <h2 className="heading-large gradient-text">
            Две стратегические точки
          </h2>
          <div className="dual-cards">
            <div className="feature-card glass-card">
              <div className="icon-circle">
                <Rocket size={32} strokeWidth={2} />
              </div>
              <h3 className="card-title">Стартовая стратсессия</h3>
              <p className="card-duration">2 дня офлайн</p>
              <ul className="feature-list">
                <li>диагностика</li>
                <li>стратегия</li>
                <li>рычаги/</li>
                <li>дорожная карта</li>
              </ul>
            </div>
            <div className="feature-card glass-card">
              <div className="icon-circle">
                <CheckCircle size={32} strokeWidth={2} />
              </div>
              <h3 className="card-title">Финальная стратсессия</h3>
              <p className="card-duration">1 день офлайн</p>
              <ul className="feature-list">
                <li>ревизия</li>
                <li>корректировка</li>
                <li>план на следующие 6 месяцев</li>
              </ul>
            </div>
          </div>
          <p className="text-large accent-text" style={{ marginTop: "40px" }}>
            Две точки трансформации: первая запускает, вторая усиливает.
          </p>
        </div>

        <div className="nav-buttons">
          <button className="nav-btn prev" onClick={goPrev}>
            ←
          </button>
          <button className="nav-btn next" onClick={goNext}>
            →
          </button>
        </div>
      </section>

      {/* Slide 7 - Главный продукт */}
      <section
        className="ultima-slide ultima-slide--compact bg-space align-center"
        ref={addToRefs}
      >
        <div className="ultima-content">
          <p className="context-label">Стратегический продукт</p>
          <h2 className="heading-large gradient-text">
            Главный продукт Ultima
          </h2>
          <p className="text-hero accent-text">Стратсессии — ядро системы</p>

          <div className="split-content">
            <div className="content-block glass-card">
              <h3 className="block-title">Стратсессии десяток</h3>
              <ul className="elegant-list">
                <li>глубокая диагностика</li>
                <li>стратегия и рычаги</li>
                <li>6-месячная дорожная карта</li>
              </ul>
            </div>
            <div className="content-block glass-card">
              <h3 className="block-title">Стратсессии компаний</h3>
              <ul className="elegant-list">
                <li>управленческая команда</li>
                <li>фокус → стратегия → проекты</li>
                <li>трансформация бизнеса на год вперёд</li>
              </ul>
            </div>
          </div>

          <p className="text-medium muted-text" style={{ marginTop: "24px" }}>
            Tracking — продолжение только для тех, кому нужна дополнительная
            глубина и контроль.
          </p>
        </div>

        <div className="nav-buttons">
          <button className="nav-btn prev" onClick={goPrev}>
            ←
          </button>
          <button className="nav-btn next" onClick={goNext}>
            →
          </button>
        </div>
      </section>

      {/* Slide 8 - Tracking */}
      <section
        className="ultima-slide ultima-slide--compact bg-gray align-center"
        ref={addToRefs}
      >
        <div className="ultima-content">
          <p className="context-label">Закрытый трекинг для предпринимателей</p>
          <h2 className="heading-large gradient-text">
            Ultima — закрытая программа
          </h2>
          <div className="stats-grid-four">
            <div className="stat-card-big glass-card">
              <div className="stat-number-big glowing-number">7</div>
              <div className="stat-label">трекеров</div>
            </div>
            <div className="stat-card-big glass-card">
              <div className="stat-number-big glowing-number">6</div>
              <div className="stat-label">месяцев трек</div>
            </div>
            <div className="stat-card-big glass-card">
              <div className="stat-number-big glowing-number">2</div>
              <div className="stat-label">недели между встречами</div>
            </div>
            <div className="stat-card-big glass-card">
              <div className="stat-number-big glowing-number">2</div>
              <div className="stat-label">стратегические сессии</div>
              <div className="stat-sublabel-small">стартовая и финальная</div>
            </div>
          </div>
          <p
            className="text-hero accent-text"
            style={{ marginTop: "48px", letterSpacing: "0.05em" }}
          >
            МЫ НЕ МАСШТАБИРУЕМСЯ. МЫ УГЛУБЛЯЕМСЯ.
          </p>
        </div>

        <div className="nav-buttons">
          <button className="nav-btn prev" onClick={goPrev}>
            ←
          </button>
          <button className="nav-btn next" onClick={goNext}>
            →
          </button>
        </div>
      </section>

      {/* Slide 9 - Кто такие трекеры */}
      <section className="ultima-slide bg-space align-center" ref={addToRefs}>
        <div className="ultima-content trackers-slide">
          <h2 className="heading-large gradient-text">
            Все трекеры обучены Михаилом Дашкиевым
            <br />и Андреем Калашниковым
          </h2>

          <div className="trackers-grid">
            {/* ЛЕВАЯ ЧАСТЬ — 2 ИНФО-БЛОКА */}
            <div className="trackers-text-block">
              <div className="info-box glass-card">
                <div className="info-number">1</div>
                <p>
                  Трекер — действующий предприниматель-практик
                  <br />с большим опытом и твёрдыми результатами.
                </p>
              </div>

              <div className="info-box glass-card">
                <div className="info-number">2</div>
                <p>
                  Мастер по отделению главного от второстепенного,
                  <br />
                  проводит разборы в десятках ниш и бизнес-уровней.
                </p>
              </div>
            </div>

            {/* ПРАВАЯ ЧАСТЬ — КАРТИНКА TRACKERS */}
            <div className="trackers-image-block">
              <img
                src="/Trackers1.png"
                alt="Трекеры Ultima"
                className="trackers-image"
              />
            </div>
          </div>
        </div>

        <div className="nav-buttons">
          <button className="nav-btn prev" onClick={goPrev}>
            ←
          </button>
          <button className="nav-btn next" onClick={goNext}>
            →
          </button>
        </div>
      </section>

      {/* Slide 10 - Архитектура системы */}
      <section
        className="ultima-slide ultima-slide--compact bg-space align-center"
        ref={addToRefs}
      >
        <div className="ultima-content">
          <h2 className="heading-large gradient-text">Архитектура системы</h2>
          <p className="text-medium" style={{ marginBottom: "48px" }}>
            Всё вращается вокруг участника
          </p>

          <div className="system-architecture-radial">
            {/* ЦЕНТР - УЧАСТНИК */}
            <div className="participant-center">
              <div className="center-card glass-card featured">
                <div className="center-icon">
                  <User size={48} strokeWidth={2} />
                </div>
                <div className="center-title">УЧАСТНИК</div>
                <div className="center-subtitle">в центре системы</div>
              </div>
            </div>

            {/* САТЕЛЛИТЫ - 4 ОСНОВНЫХ ЭЛЕМЕНТА */}
            <div className="satellites">
              {/* ЛИДЕР И ГРУППА - СВЕРХУ НАД ЦЕНТРОМ */}
              <div className="satellite satellite-top-left glass-card">
                <div className="satellite-icon">
                  <Rocket size={42} strokeWidth={2} />
                </div>
                <div className="satellite-label">Лидер</div>
              </div>

              <div className="satellite satellite-top-right glass-card">
                <div className="satellite-icon">
                  <MessageCircle size={42} strokeWidth={2} />
                </div>
                <div className="satellite-label">Группа</div>
              </div>

              {/* СТРАТСЕССИИ И ТРЕКЕР - ПО БОКАМ ОТ ЦЕНТРА */}
              <div className="satellite satellite-middle-left glass-card">
                <div className="satellite-icon">
                  <Target size={42} strokeWidth={2} />
                </div>
                <div className="satellite-label">Стратсессии</div>
              </div>

              <div className="satellite satellite-middle-right glass-card">
                <div className="satellite-icon">
                  <Flame size={42} strokeWidth={2} />
                </div>
                <div className="satellite-label">Трекер</div>
              </div>
            </div>

            {/* ПОДДЕРЖКА И ЭКСПЕРТЫ - СНИЗУ */}
            <div className="support-expert-row">
              <div className="support-block">
                <h3 className="support-title">ПОДДЕРЖКА</h3>
                <div className="support-cards">
                  <div className="support-card glass-card">
                    <CheckCircle size={28} strokeWidth={2} />
                    <span>Ассистент</span>
                  </div>
                  <div className="support-card glass-card">
                    <Satellite size={28} strokeWidth={2} />
                    <span>Бадди</span>
                  </div>
                </div>
              </div>

              <div className="expert-block">
                <h3 className="expert-title">ЭКСПЕРТНОЕ СОПРОВОЖДЕНИЕ</h3>
                <div className="expert-cards">
                  <div className="expert-card glass-card featured">
                    <div className="expert-card-title">3 мастермайнда</div>
                    <div className="expert-card-text">
                      От топ-экспертов для всех
                    </div>
                  </div>
                  <div className="expert-card glass-card featured">
                    <div className="expert-card-title">
                      Приглашённые эксперты
                    </div>
                    <div className="expert-card-text">Лидеры рынка</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="nav-buttons">
          <button className="nav-btn prev" onClick={goPrev}>
            ←
          </button>
          <button className="nav-btn next" onClick={goNext}>
            →
          </button>
        </div>
      </section>

      {/* Slide 11A - Совет директоров */}
      <section
        className="ultima-slide ultima-slide--compact bg-space align-center"
        ref={addToRefs}
      >
        <div className="ultima-content">
          <h2 className="heading-large gradient-text">Совет директоров</h2>
          <p
            className="text-large accent-text"
            style={{ marginBottom: "32px" }}
          >
            Закрытая экспертная среда Ultima
          </p>

          <div className="split-content">
            <div className="content-block glass-card">
              <h3 className="block-title">Состав</h3>
              <ul className="elegant-list">
                <li>Трекеры ядра Ultima</li>
                <li>Приглашённые эксперты — лидеры рынка</li>
              </ul>
            </div>
            <div className="content-block glass-card">
              <h3 className="block-title">Что даёт Совет директоров</h3>
              <ul className="elegant-list">
                <li>3 стратегических мастермайнда за год</li>
                <li>
                  Усиление 5 слоёв годовой программы «Нечто» только для
                  участников Ultima
                </li>
              </ul>
            </div>
          </div>

          <p className="text-medium muted-text" style={{ marginTop: "24px" }}>
            Каждый мастермайнд — про управленческие решения, проверку стратегий
            и фокус на рычагах роста.
          </p>
        </div>

        <div className="nav-buttons">
          <button className="nav-btn prev" onClick={goPrev}>
            ←
          </button>
          <button className="nav-btn next" onClick={goNext}>
            →
          </button>
        </div>
      </section>

      {/* Slide 11B - Усиление 5 слоёв программы */}
      <section
        className="ultima-slide ultima-slide--compact bg-gray align-center"
        ref={addToRefs}
      >
        <div className="ultima-content">
          <h2 className="heading-large gradient-text">
            Усиление программы «Нечто»
          </h2>
          <p className="text-medium" style={{ marginBottom: "32px" }}>
            5 слоёв, которые усиливает Совет директоров:
          </p>

          <div className="layers-cards">
            <div className="layer-card glass-card">
              <div className="layer-card-title">Стратегия</div>
            </div>

            <div className="layer-card glass-card">
              <div className="layer-card-title">Финансы и операционка</div>
            </div>

            <div className="layer-card glass-card">
              <div className="layer-card-title">Команда</div>
            </div>

            <div className="layer-card glass-card">
              <div className="layer-card-title">Рынок и коммерция</div>
            </div>

            <div className="layer-card glass-card">
              <div className="layer-card-title">Продукт</div>
            </div>
          </div>

          <p className="text-large accent-text" style={{ marginTop: "32px" }}>
            Каждый слой — отдельный воркшоп от ТОП-эксперта.
            <br />
            Формат доступен только участникам Ultima.
          </p>
        </div>

        <div className="nav-buttons">
          <button className="nav-btn prev" onClick={goPrev}>
            ←
          </button>
          <button className="nav-btn next" onClick={goNext}>
            →
          </button>
        </div>
      </section>

      {/* Slide 13 - Эксклюзивные встречи */}
      <section
        className="ultima-slide ultima-slide--compact bg-space align-left"
        ref={addToRefs}
      >
        <div className="ultima-content">
          <h2 className="heading-large gradient-text">Эксклюзивные встречи</h2>
          <p className="text-large accent-text">Только для Ultima.</p>
          <div className="highlight-box glass-card gradient-border">
            <p className="text-medium">Закрытые стратегические встречи:</p>
            <div className="vip-list">
              <div className="vip-item">
                <div>– Михаил Дашкиев</div>
                <div className="vip-role">основатель «Нечто»</div>
              </div>
              <div className="vip-item">
                <div>– Андрей Калашников</div>
                <div className="vip-role">архитектор Ultima</div>
              </div>
              <div className="vip-item">
                <div>– эксперты ядра «Нечто»</div>
                <div className="vip-role">топовые практики</div>
              </div>
            </div>
          </div>
          <p
            className="text-large muted-text"
            style={{ marginTop: "28px", fontSize: "clamp(22px, 3.5vw, 32px)" }}
          >
            Формат, который невозможен в открытом контуре.
            <br />
            Глубокие разговоры — только для участников Ultima.
          </p>
        </div>

        <div className="nav-buttons">
          <button className="nav-btn prev" onClick={goPrev}>
            ←
          </button>
          <button className="nav-btn next" onClick={goNext}>
            →
          </button>
        </div>
      </section>

      {/* Slide 14 - Экосистема */}
      <section
        className="ultima-slide ultima-slide--compact bg-gray align-center"
        ref={addToRefs}
      >
        <div className="ultima-content">
          <h2 className="heading-large gradient-text">Экосистема</h2>
          <p className="text-medium" style={{ marginBottom: "40px" }}>
            Закрытая среда предпринимателей:
          </p>
          <div className="bento-grid">
            <div className="bento-item glass-card large">
              <div className="bento-icon">
                <MessageCircle size={48} strokeWidth={1.5} />
              </div>
              <div className="bento-text">камерные разборы</div>
            </div>
            <div className="bento-item glass-card">
              <div className="bento-icon">
                <Satellite size={48} strokeWidth={1.5} />
              </div>
              <div className="bento-text">стратегические эфиры</div>
            </div>
            <div className="bento-item glass-card">
              <div className="bento-icon">
                <Target size={48} strokeWidth={1.5} />
              </div>
              <div className="bento-text">экспертные встречи</div>
            </div>
            <div className="bento-item glass-card large featured">
              <div className="bento-icon">
                <Flame size={48} strokeWidth={1.5} />
              </div>
              <div className="bento-text">доступ к ядру «Нечто»</div>
            </div>
          </div>
          <p className="text-hero accent-text" style={{ marginTop: "48px" }}>
            Среда, в которой растут быстрее.
          </p>
        </div>

        <div className="nav-buttons">
          <button className="nav-btn prev" onClick={goPrev}>
            ←
          </button>
          <button className="nav-btn next" onClick={goNext}>
            →
          </button>
        </div>
      </section>

      {/* Slide 15 - Путь участника */}
      <section
        className="ultima-slide ultima-slide--compact bg-astronaut align-center"
        ref={addToRefs}
      >
        <div className="ultima-content">
          <h2 className="heading-large gradient-text">Путь участника</h2>

          <div className="journey-flow">
            <div className="journey-step">
              <div className="journey-number">1</div>
              <div className="journey-card glass-card">
                <div className="journey-title">Диагностика</div>
                <div className="journey-subtitle">вход в систему</div>
              </div>
            </div>

            <div className="journey-arrow">→</div>

            <div className="journey-step">
              <div className="journey-number">2</div>
              <div className="journey-card glass-card">
                <div className="journey-title">Стартовая стратсессия</div>
                <div className="journey-subtitle">разворот стратегии</div>
              </div>
            </div>

            <div className="journey-arrow">→</div>

            <div className="journey-step">
              <div className="journey-number">3</div>
              <div className="journey-card glass-card">
                <div className="journey-title">6-месячный трек</div>
                <div className="journey-subtitle">внедрение и контроль</div>
                <div className="journey-details">
                  <div className="journey-detail-item">
                    • 4 еженедельных трека — фокус и буст на старте
                  </div>
                  <div className="journey-detail-item">
                    • Раз в 2 недели — комфортный режим
                  </div>
                </div>
              </div>
            </div>

            <div className="journey-arrow">→</div>

            <div className="journey-step">
              <div className="journey-number">4</div>
              <div className="journey-card glass-card">
                <div className="journey-title">Финальная стратсессия</div>
                <div className="journey-subtitle">закрепление результатов</div>
              </div>
            </div>

            <div className="journey-arrow">→</div>

            <div className="journey-step">
              <div className="journey-number glow">5</div>
              <div className="journey-card glass-card featured">
                <div className="journey-title accent-text">Новый цикл</div>
                <div className="journey-subtitle">непрерывный рост</div>
              </div>
            </div>
          </div>

          <p className="text-large muted-text" style={{ marginTop: "32px" }}>
            Понятный путь. Прозрачная логика. Контролируемый рост.
          </p>
        </div>

        <div className="nav-buttons">
          <button className="nav-btn prev" onClick={goPrev}>
            ←
          </button>
          <button className="nav-btn next" onClick={goNext}>
            →
          </button>
        </div>
      </section>

      {/* Slide 16 - Доступ (общая логика) */}
      <section
        className="ultima-slide ultima-slide--compact bg-space align-center"
        ref={addToRefs}
      >
        <div className="ultima-content">
          <h2 className="heading-large gradient-text">
            Вход — только по диагностике
          </h2>

          <div className="access-cards">
            <div className="access-card glass-card">Стратсессии десяток</div>
            <div className="access-card glass-card large-card accent-border">
              Ultima 9.0 (трекинг)
            </div>
            <div className="access-card glass-card">Стратсессии компаний</div>
          </div>

          <p className="text-hero accent-text" style={{ marginTop: "28px" }}>
            Только для тех, кто готов
            <br />к дисциплине, фокусу и росту.
          </p>
        </div>
      </section>
      {/* Slide 17 - QR / Call to action */}
      <section
        className="ultima-slide ultima-slide--compact bg-space align-center"
        ref={addToRefs}
      >
        <div className="ultima-content" style={{ textAlign: "center" }}>
          <h2 className="heading-large gradient-text">ХОЧУ В ULTIMA</h2>

          <p className="text-large muted-text" style={{ marginTop: "16px" }}>
            Включайся в среду, где фокус, связи и стратегия
            <br />
            превращают цели в результат
          </p>

          <img src="/qr-anketa.png" alt="QR анкеты" className="qr-code" />

          <p className="footnote" style={{ marginTop: "16px" }}>
            *Вход только после диагностики и согласования с трекером.
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
