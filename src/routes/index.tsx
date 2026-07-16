import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const WHATSAPP_URL =
  "https://wa.me/5511999999999?text=Oi!%20Quero%20iniciar%20minha%20jornada%20terap%C3%AAutica.";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  useScrollReveal();
  useMouseParticles();

  return (
    <main className="relative overflow-x-hidden bg-background text-foreground">
      <ParticlesCanvas />
      <Nav />
      <Hero />
      <FeelSection />
      <VideoPresentation />
      <MethodTimeline />
      <ConceptCards />
      <HowItWorks />
      <Quiz />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}

/* ---------------- Hooks ---------------- */

function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll(".reveal-on-scroll").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useMouseParticles() {
  // Handled inside ParticlesCanvas
}

/* ---------------- Particles ---------------- */

function ParticlesCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const mouse = { x: w / 2, y: h / 2 };
    const N = 55;
    const dots = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 0.4,
    }));
    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      dots.forEach((d) => {
        const dx = mouse.x - d.x;
        const dy = mouse.y - d.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 180) {
          d.vx += (dx / dist) * 0.008;
          d.vy += (dy / dist) * 0.008;
        }
        d.vx *= 0.98;
        d.vy *= 0.98;
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = w;
        if (d.x > w) d.x = 0;
        if (d.y < 0) d.y = h;
        if (d.y > h) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(180, 160, 100, 0.45)";
        ctx.fill();
      });
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-60 mix-blend-multiply"
    />
  );
}

/* ---------------- Nav ---------------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={`flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${
            scrolled ? "glass shadow-soft" : ""
          }`}
        >
          <a href="#top" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gold text-[oklch(0.22_0.02_230)] shadow-soft">
              <LotusIcon className="h-4 w-4" />
            </span>
            <span className="font-serif text-lg tracking-tight text-primary">Aurora Terapia</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#metodo" className="transition-colors hover:text-primary">Método</a>
            <a href="#atendimento" className="transition-colors hover:text-primary">Atendimento</a>
            <a href="#quiz" className="transition-colors hover:text-primary">Quiz</a>
            <a href="#faq" className="transition-colors hover:text-primary">FAQ</a>
          </nav>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-petrol px-4 py-2 text-sm text-primary-foreground shadow-soft transition-transform hover:scale-[1.03]"
          >
            <span>Conversar</span>
            <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section id="top" className="relative isolate min-h-[100svh] overflow-hidden bg-hero">
      {/* Video placeholder */}
      <div className="absolute inset-0 -z-10">
        <div
          data-video-placeholder="hero-background"
          className="absolute inset-0 grid place-items-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,color-mix(in_oklab,var(--warm)_85%,transparent))]" />
          <span className="pointer-events-none absolute bottom-6 right-6 rounded-full glass px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            [ vídeo de fundo — placeholder ]
          </span>
        </div>
        {/* Soft ambient orbs */}
        <div className="absolute -left-32 top-24 h-96 w-96 rounded-full bg-sage opacity-40 blur-3xl animate-float-slow" />
        <div className="absolute -right-24 top-40 h-[28rem] w-[28rem] rounded-full bg-lavender opacity-40 blur-3xl animate-float-slow [animation-delay:2s]" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-gold-soft opacity-40 blur-3xl animate-float-slow [animation-delay:4s]" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center px-6 pt-32 pb-20 text-center">
        <span className="animate-blur-in inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.28em] text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          Psicoterapia online · Alta percepção
        </span>

        <h1 className="animate-blur-in [animation-delay:120ms] mt-8 max-w-4xl text-balance font-serif text-5xl leading-[1.05] text-primary sm:text-6xl md:text-7xl">
          Um espaço silencioso para{" "}
          <em className="not-italic text-gradient-gold">reencontrar</em> quem você sempre foi.
        </h1>

        <p className="animate-blur-in [animation-delay:260ms] mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground">
          Terapia online para mulheres sensíveis, intensas e perceptivas.
          Uma jornada delicada de volta para a sua própria calma.
        </p>

        <div className="animate-blur-in [animation-delay:400ms] mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-petrol px-8 py-4 text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
          >
            <span className="relative z-10">Quero iniciar minha jornada</span>
            <ArrowIcon className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
            <span className="absolute inset-0 -translate-x-full bg-gold opacity-30 transition-transform duration-700 group-hover:translate-x-0" />
          </a>
          <a href="#metodo" className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline">
            Conhecer o método →
          </a>
        </div>

        <div className="animate-blur-in [animation-delay:600ms] mt-24 flex items-center gap-6 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <span className="h-px w-10 bg-border" />
          <span>Role para sentir</span>
          <span className="h-px w-10 bg-border" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- "Você já sentiu que..." ---------------- */

const feelings = [
  "sente demais e nem sempre encontra palavras para explicar?",
  "percebe o que os outros não notam — e isso pesa?",
  "está sempre cuidando de todos, menos de si mesma?",
  "carrega uma inquietação silenciosa, mesmo em dias bons?",
  "sabe que precisa parar, mas não sabe por onde começar?",
];

function FeelSection() {
  return (
    <section className="relative mx-auto max-w-5xl px-6 py-40">
      <p className="reveal-on-scroll text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Uma pausa
      </p>
      <h2 className="reveal-on-scroll mt-6 text-center font-serif text-4xl leading-tight text-primary sm:text-5xl">
        Você já sentiu que…
      </h2>

      <div className="mt-20 space-y-10">
        {feelings.map((f, i) => (
          <div
            key={i}
            className="reveal-on-scroll flex items-start gap-6 border-b border-border/60 pb-8"
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <span className="mt-3 font-serif text-2xl text-gradient-gold">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="text-balance font-serif text-2xl leading-snug text-primary sm:text-3xl">
              {f}
            </p>
          </div>
        ))}
      </div>

      <p className="reveal-on-scroll mt-16 text-center text-lg text-muted-foreground">
        Se algo aqui tocou você — talvez seja o momento de olhar para dentro com companhia.
      </p>
    </section>
  );
}

/* ---------------- Video Presentation ---------------- */

function VideoPresentation() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-32">
      <div className="reveal-on-scroll">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Uma apresentação
        </p>
        <h2 className="mt-4 text-center font-serif text-4xl text-primary sm:text-5xl">
          Olá, é um prazer receber você aqui.
        </h2>
      </div>

      <div className="reveal-on-scroll [transition-delay:180ms] mt-16 group relative mx-auto aspect-video max-w-4xl overflow-hidden rounded-3xl bg-petrol shadow-glow">
        <div
          data-video-placeholder="youtube-or-vimeo"
          className="absolute inset-0 grid place-items-center bg-[linear-gradient(135deg,color-mix(in_oklab,var(--petrol-deep)_90%,black),color-mix(in_oklab,var(--sage-deep)_70%,var(--petrol)))]"
        >
          <button
            aria-label="Reproduzir vídeo"
            className="relative grid h-24 w-24 place-items-center rounded-full bg-warm/90 text-primary shadow-glow transition-transform duration-500 group-hover:scale-110"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-gold opacity-30" />
            <PlayIcon className="relative h-8 w-8" />
          </button>
          <span className="absolute bottom-5 left-5 rounded-full glass px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-primary">
            [ vídeo — YouTube / Vimeo ]
          </span>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Method Timeline ---------------- */

const method = [
  {
    title: "Acolhimento",
    text: "Um primeiro encontro sem pressa. Escutar sua história como ela merece ser ouvida.",
  },
  {
    title: "Mapeamento",
    text: "Reconhecer os padrões emocionais, sensoriais e vinculares que moldam sua experiência.",
  },
  {
    title: "Integração",
    text: "Trabalhar corpo, emoção e narrativa em ritmo respeitoso à sua alta sensibilidade.",
  },
  {
    title: "Transformação",
    text: "Consolidar novas formas de estar no mundo — com clareza, presença e leveza.",
  },
];

function MethodTimeline() {
  return (
    <section id="metodo" className="relative bg-gradient-to-b from-transparent via-secondary/40 to-transparent py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="reveal-on-scroll text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">O método</p>
          <h2 className="mt-4 font-serif text-4xl text-primary sm:text-5xl">
            Uma jornada em quatro respirações
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Não é um passo a passo rígido. É um caminho que se adapta ao seu tempo interno.
          </p>
        </div>

        <ol className="relative mt-20 space-y-16 before:absolute before:left-4 before:top-2 before:h-full before:w-px before:bg-gradient-to-b before:from-gold/60 before:via-sage/60 before:to-transparent md:before:left-1/2">
          {method.map((m, i) => (
            <li
              key={i}
              className={`reveal-on-scroll relative flex flex-col gap-6 md:grid md:grid-cols-2 md:items-center md:gap-16 ${
                i % 2 ? "md:[&>*:first-child]:order-2" : ""
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className={`md:${i % 2 ? "text-left" : "text-right"} pl-12 md:pl-0`}>
                <span className="font-serif text-6xl text-gradient-gold">
                  0{i + 1}
                </span>
                <h3 className="mt-2 font-serif text-3xl text-primary">{m.title}</h3>
                <p className="mt-3 text-muted-foreground">{m.text}</p>
              </div>
              <div className="pl-12 md:pl-0">
                <div className="glass rounded-2xl p-6 shadow-soft">
                  <div
                    data-image-placeholder={`method-${i}`}
                    className="grid aspect-[4/3] place-items-center rounded-xl bg-gradient-to-br from-sage/30 to-lavender/30 text-xs uppercase tracking-[0.2em] text-muted-foreground"
                  >
                    imagem — etapa {i + 1}
                  </div>
                </div>
              </div>
              <span className="absolute left-0 top-4 grid h-8 w-8 place-items-center rounded-full bg-gold text-primary shadow-soft md:left-1/2 md:-translate-x-1/2">
                <span className="h-2 w-2 rounded-full bg-primary" />
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- Concept Cards ---------------- */

const concepts = [
  {
    icon: EarIcon,
    title: "Escuta profunda",
    text: "Ir além das palavras. Ouvir o que o corpo, o silêncio e a hesitação também dizem.",
  },
  {
    icon: LeafIcon,
    title: "Alta percepção",
    text: "Você não é ‘demais’. Você percebe mais — e isso pode se tornar sua maior força.",
  },
  {
    icon: HeartIcon,
    title: "Regulação emocional",
    text: "Aprender a habitar as emoções sem se afogar nelas. Presença, não controle.",
  },
  {
    icon: MoonIcon,
    title: "Vínculo seguro",
    text: "Reconstruir a confiança começa por um lugar onde você não precisa se explicar.",
  },
  {
    icon: SunIcon,
    title: "Autoconhecimento",
    text: "Reconhecer padrões, honrar sua história e criar novos caminhos possíveis.",
  },
  {
    icon: SparkIcon,
    title: "Sentido e propósito",
    text: "Traduzir sensibilidade em escolhas conscientes, alinhadas ao que importa.",
  },
];

function ConceptCards() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-32">
      <div className="reveal-on-scroll text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Fundamentos</p>
        <h2 className="mt-4 font-serif text-4xl text-primary sm:text-5xl">
          Os alicerces do trabalho
        </h2>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {concepts.map((c, i) => (
          <article
            key={i}
            className="reveal-on-scroll group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-glow"
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold-soft opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60" />
            <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-primary shadow-soft">
              <c.icon className="h-6 w-6" />
            </span>
            <h3 className="relative mt-6 font-serif text-2xl text-primary">{c.title}</h3>
            <p className="relative mt-3 text-muted-foreground">{c.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------- How it works ---------------- */

const steps = [
  { t: "Você entra em contato", d: "Uma mensagem simples pelo WhatsApp para começarmos." },
  { t: "Agendamos uma conversa", d: "Um encontro inicial para nos conhecermos e ajustarmos ritmo." },
  { t: "Nossas sessões online", d: "Video-chamada segura, semanal, no conforto do seu espaço." },
  { t: "Sua jornada continua", d: "Um caminho contínuo de escuta, integração e presença." },
];

function HowItWorks() {
  return (
    <section id="atendimento" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal-on-scroll text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Atendimento online
          </p>
          <h2 className="mt-4 font-serif text-4xl text-primary sm:text-5xl">
            Como funciona, do primeiro passo à sua rotina
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div
              key={i}
              className="reveal-on-scroll group relative overflow-hidden rounded-3xl bg-card p-8 shadow-soft transition-all hover:-translate-y-1"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="absolute right-6 top-6 font-serif text-5xl text-gold-soft/70 transition-transform duration-500 group-hover:scale-110">
                {i + 1}
              </span>
              <div
                data-image-placeholder={`step-${i}`}
                className="grid aspect-square place-items-center rounded-2xl bg-gradient-to-br from-sage/25 via-lavender/20 to-gold-soft/25 text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
              >
                ilustração
              </div>
              <h3 className="mt-6 font-serif text-xl text-primary">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Quiz ---------------- */

const questions = [
  "Você percebe detalhes emocionais que outras pessoas não notam?",
  "Sente-se rapidamente sobrecarregada em ambientes muito estimulantes?",
  "Costuma refletir profundamente sobre situações do dia a dia?",
  "Se emociona com facilidade com arte, música ou histórias?",
  "Sente que precisa de mais tempo sozinha para se recompor?",
];

function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const done = step >= questions.length;
  const score = answers.filter(Boolean).length;

  const reset = () => {
    setStep(0);
    setAnswers([]);
  };

  return (
    <section id="quiz" className="relative py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="reveal-on-scroll text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Auto-percepção</p>
          <h2 className="mt-4 font-serif text-4xl text-primary sm:text-5xl">
            Você apresenta sinais de Alta Percepção?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Um convite delicado para se olhar. Sem julgamentos. Sem diagnóstico.
          </p>
        </div>

        <div className="reveal-on-scroll mt-14 rounded-3xl bg-card p-8 shadow-glow sm:p-12">
          {!done ? (
            <div key={step} className="animate-blur-in">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
                <span>Pergunta {step + 1} de {questions.length}</span>
                <span className="text-gradient-gold">{Math.round(((step) / questions.length) * 100)}%</span>
              </div>
              <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full bg-gold transition-all duration-700"
                  style={{ width: `${(step / questions.length) * 100}%` }}
                />
              </div>

              <p className="mt-10 font-serif text-2xl leading-snug text-primary sm:text-3xl">
                {questions[step]}
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                {[
                  { label: "Sim, com frequência", val: true },
                  { label: "Raramente", val: false },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => {
                      setAnswers((a) => [...a, opt.val]);
                      setStep((s) => s + 1);
                    }}
                    className="group flex-1 rounded-2xl border border-border bg-warm px-6 py-4 text-left transition-all hover:-translate-y-0.5 hover:border-gold hover:shadow-soft"
                  >
                    <span className="font-serif text-lg text-primary">{opt.label}</span>
                    <ArrowIcon className="ml-3 inline h-3.5 w-3.5 text-gold transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-blur-in text-center">
              <div className="mx-auto grid h-28 w-28 place-items-center rounded-full bg-gold shadow-glow">
                <span className="font-serif text-4xl text-primary">{score}/{questions.length}</span>
              </div>
              <h3 className="mt-8 font-serif text-3xl text-primary">
                {score >= 4
                  ? "Você provavelmente é uma mulher de alta percepção."
                  : score >= 2
                    ? "Você apresenta alguns sinais de alta sensibilidade."
                    : "Você tende a uma percepção mais serena e regulada."}
              </h3>
              <p className="mx-auto mt-4 max-w-md text-muted-foreground">
                Este é apenas um retrato inicial. Um espaço terapêutico pode ajudar você a compreender com mais profundidade.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-petrol px-6 py-3 text-primary-foreground shadow-soft transition-transform hover:scale-[1.03]"
                >
                  Conversar no WhatsApp
                  <ArrowIcon className="h-3.5 w-3.5" />
                </a>
                <button
                  onClick={reset}
                  className="rounded-full border border-border bg-transparent px-6 py-3 text-sm text-primary transition-colors hover:bg-secondary"
                >
                  Refazer o quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */

const testimonials = [
  {
    q: "Encontrei um espaço onde finalmente pude respirar sem me explicar.",
    n: "M., 34",
  },
  {
    q: "A escuta é tão precisa que parece que ela lê o que eu não digo.",
    n: "L., 41",
  },
  {
    q: "Depois de meses, voltei a dormir com o corpo leve.",
    n: "R., 29",
  },
  {
    q: "A terapia online não me distanciou — me trouxe presença.",
    n: "A., 37",
  },
];

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="relative bg-secondary/40 py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="reveal-on-scroll text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Quem já sentiu
          </p>
          <h2 className="mt-4 font-serif text-4xl text-primary sm:text-5xl">
            Palavras de quem caminhou
          </h2>
        </div>

        <div className="reveal-on-scroll mt-16 overflow-hidden rounded-3xl bg-card p-10 shadow-soft sm:p-16">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${i * 100}%)` }}
          >
            {testimonials.map((t, k) => (
              <blockquote key={k} className="w-full shrink-0 px-2 text-center">
                <QuoteIcon className="mx-auto h-8 w-8 text-gold" />
                <p className="mt-6 text-balance font-serif text-2xl leading-snug text-primary sm:text-3xl">
                  “{t.q}”
                </p>
                <footer className="mt-6 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {t.n}
                </footer>
              </blockquote>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((_, k) => (
              <button
                key={k}
                aria-label={`Depoimento ${k + 1}`}
                onClick={() => setI(k)}
                className={`h-1.5 rounded-full transition-all ${
                  k === i ? "w-8 bg-gold" : "w-2 bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

const faqs = [
  {
    q: "Como funciona a terapia online?",
    a: "Sessões por vídeo em plataforma segura, com a mesma profundidade de um encontro presencial.",
  },
  {
    q: "Qual a duração e frequência?",
    a: "Cada sessão dura 50 minutos, geralmente com frequência semanal.",
  },
  {
    q: "Preciso de algum equipamento especial?",
    a: "Apenas um lugar tranquilo, conexão estável e fones de ouvido.",
  },
  {
    q: "E se eu não souber por onde começar?",
    a: "Você não precisa saber. Basta chegar. O primeiro encontro é para isso.",
  },
  {
    q: "Atende fora do Brasil?",
    a: "Sim — atendo mulheres brasileiras em qualquer fuso, com agenda flexível.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="reveal-on-scroll text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Perguntas</p>
          <h2 className="mt-4 font-serif text-4xl text-primary sm:text-5xl">
            Antes de começar, talvez você queira saber
          </h2>
        </div>

        <div className="reveal-on-scroll mt-14 divide-y divide-border rounded-3xl border border-border bg-card">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left transition-colors hover:bg-secondary/40"
                >
                  <span className="font-serif text-lg text-primary sm:text-xl">{f.q}</span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary text-primary transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <PlusIcon className="h-3.5 w-3.5" />
                  </span>
                </button>
                <div
                  className="grid overflow-hidden transition-all duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="min-h-0">
                    <p className="px-6 pb-6 text-muted-foreground">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Final CTA ---------------- */

function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-40">
      <div className="absolute inset-0 -z-10 bg-petrol" />
      <div className="absolute inset-0 -z-10 opacity-50">
        <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-sage blur-3xl animate-float-slow" />
        <div className="absolute -right-24 bottom-10 h-[28rem] w-[28rem] rounded-full bg-lavender blur-3xl animate-float-slow [animation-delay:3s]" />
      </div>

      <div className="reveal-on-scroll mx-auto max-w-3xl px-6 text-center text-primary-foreground">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs uppercase tracking-[0.28em] backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          Um convite
        </span>
        <h2 className="mt-8 font-serif text-5xl leading-[1.05] sm:text-6xl">
          Sua sensibilidade sempre foi{" "}
          <em className="not-italic text-gradient-gold">um dom.</em>
          <br /> Agora ela também pode ser um caminho.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/80">
          Se você chegou até aqui, algo já pediu passagem. Vamos conversar.
        </p>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="group mt-12 inline-flex items-center gap-3 rounded-full bg-gold px-10 py-5 text-lg text-[oklch(0.22_0.02_230)] shadow-glow transition-transform hover:scale-[1.03]"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Iniciar minha jornada agora
          <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-warm py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-gold">
            <LotusIcon className="h-3.5 w-3.5 text-primary" />
          </span>
          <span className="font-serif text-primary">Aurora Terapia</span>
        </div>
        <p>© {new Date().getFullYear()} · Todos os direitos reservados</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-primary">Privacidade</a>
          <a href="#" className="hover:text-primary">Termos</a>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Icons ---------------- */

function ArrowIcon(p: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={p.className}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PlusIcon(p: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={p.className}>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}
function PlayIcon(p: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={p.className}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function QuoteIcon(p: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={p.className}>
      <path d="M7 7h4v4H8c0 3 1 4 3 5v2c-4 0-6-3-6-7V7zm9 0h4v4h-3c0 3 1 4 3 5v2c-4 0-6-3-6-7V7z" />
    </svg>
  );
}
function LotusIcon(p: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={p.className}>
      <path d="M12 3c1.5 3 1.5 6 0 9-1.5-3-1.5-6 0-9zM4 12c3-1 6 0 8 3-3 1-6 0-8-3zm16 0c-3-1-6 0-8 3 3 1 6 0 8-3z" strokeLinejoin="round" />
      <path d="M4 15c2 3 5 4 8 4s6-1 8-4" strokeLinecap="round" />
    </svg>
  );
}
function WhatsAppIcon(p: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={p.className}>
      <path d="M20 3.5A11 11 0 0 0 3.4 17.9L2 22l4.2-1.4A11 11 0 1 0 20 3.5zM12 20a8 8 0 0 1-4.1-1.1l-.3-.2-2.5.8.8-2.4-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5.1a6.5 6.5 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.2a.5.5 0 0 0 0-.5c0-.1-.5-1.3-.7-1.7s-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-1 2.3c0 1.4 1 2.7 1.2 2.9s2 3.1 5 4.3 3 .8 3.6.8a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z" />
    </svg>
  );
}
function EarIcon(p: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={p.className}>
      <path d="M6 10a6 6 0 1 1 12 0c0 3-3 4-4 6s-2 3-4 3a3 3 0 0 1-3-3" strokeLinecap="round" />
      <path d="M10 10a2 2 0 1 1 4 0c0 2-2 2-2 4" strokeLinecap="round" />
    </svg>
  );
}
function LeafIcon(p: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={p.className}>
      <path d="M4 20c0-8 6-14 16-14 0 10-6 16-16 14z" strokeLinejoin="round" />
      <path d="M4 20c4-4 8-6 12-6" strokeLinecap="round" />
    </svg>
  );
}
function HeartIcon(p: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={p.className}>
      <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.7A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" strokeLinejoin="round" />
    </svg>
  );
}
function MoonIcon(p: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={p.className}>
      <path d="M20 14A8 8 0 1 1 10 4a7 7 0 0 0 10 10z" strokeLinejoin="round" />
    </svg>
  );
}
function SunIcon(p: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={p.className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" strokeLinecap="round" />
    </svg>
  );
}
function SparkIcon(p: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={p.className}>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" strokeLinejoin="round" />
    </svg>
  );
}
