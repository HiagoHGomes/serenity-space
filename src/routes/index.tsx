import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const olharAsset = { url: "/media/leandra-olhar.jpg" };
const sorrisoAsset = { url: "/media/leandra-sorriso.jpg" };
const depoimentoAsset = { url: "/media/depoimento.mp4" };

/** WhatsApp oficial: +55 98 8830-0203 */
const WHATSAPP_URL =
  "https://wa.me/559888300203?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20minha%20Consulta%20Diagn%C3%B3stico.";

const INSTAGRAM_URL = "https://www.instagram.com/leandraestrelahterapeuta/";

const CTA_LABEL = "Agendar minha Consulta Diagnóstico";

export const Route = createFileRoute("/")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Reestruturação Natural do Ser · Leandra Estrelah" },
      {
        name: "description",
        content:
          "Mapeamento e Calibragem para pessoas com Alta Percepção. Engenharia de precisão para organizar o seu Canal Vital e retomar o comando da sua potência.",
      },
      {
        property: "og:title",
        content: "Reestruturação Natural do Ser · Leandra Estrelah",
      },
      {
        property: "og:description",
        content:
          "Mapeamento e Calibragem para pessoas com Alta Percepção. Não é terapia convencional.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://calm-wave-path.lovable.app/" }],
  }),
});

/* ---------------------------------------------------------------- utilities */

function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
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
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function GoldCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let rx = window.innerWidth / 2;
    let ry = window.innerHeight / 2;
    let mx = rx;
    let my = ry;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    };
    const loop = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] hidden md:block">
      <div
        ref={ring}
        className="absolute -ml-4 -mt-4 h-8 w-8 rounded-full border border-gold/50 transition-opacity"
      />
      <div ref={dot} className="absolute -ml-[2px] -mt-[2px] h-1 w-1 rounded-full bg-gold" />
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="tracking-brand text-[0.65rem] text-gold">{children}</p>
  );
}

function Cta({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const base =
    "group inline-flex items-center gap-4 border px-8 py-4 text-[0.7rem] tracking-brand transition-all duration-700";
  const styles =
    tone === "dark"
      ? "border-forest/25 text-forest hover:border-gold hover:bg-forest hover:text-pearl"
      : "border-pearl/35 text-pearl hover:border-gold hover:bg-gold hover:text-forest-deep";
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      data-cta="consulta-diagnostico"
      className={`${base} ${styles} ${className}`}
    >
      {CTA_LABEL}
      <span className="inline-block transition-transform duration-700 group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}

function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`relative px-6 py-28 md:px-12 md:py-40 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ content */

const SINTOMAS = [
  "Exaustão crônica que o sono não resolve",
  "Dificuldade em separar o que é seu sentimento e o que é absorção do ambiente",
  "Ruído mental constante e sensação de estar fora de lugar",
  "Incompreensão sobre o real sentido da vida",
  "Sobrecarga sensorial diante de ambientes ou pessoas.",
  "Alta carga emocional que te sufoca",
  "Ausência de realização pessoal, procrastinação crônica e desvalorização pessoal - insegurança e baixa autoestima",
  "Sobrepeso e Fobia social",
  "Depressão profunda, ansiedade generalizada, dores físicas constantes, ideação suicida, dependência de remédios de uso contínuo, abuso de drogas e alcoolismo. "

];

const SINTOMAS_CRONICOS =
  "";

const PILARES = [
  { n: "01", t: "Limpeza do seu canal vital", d: "Desobstrução." },
  { n: "02", t: "Calibração", d: "Instalação de filtros." },
  { n: "03", t: "Consolidação", d: "Comando do seu sistema." },
];

const JORNADA = [
  {
    t: "Consulta Diagnóstico",
    s: "O ponto de entrada",
    d: "O primeiro passo é mapear o seu sistema. Nesta consulta, identificamos onde estão os gargalos do seu Canal Vital, olhamos cuidadosamente para a sua atual estrutura e o que ela precisa para retomar o funcionamento saudável.",
  },
  {
    t: "O Ciclo de 10 Sessões",
    s: "Protocolo",
    d: "O protocolo de limpeza, organização e calibragem para você retomar o domínio da sua estrutura.",
  },
  {
    t: "A Sustentação",
    s: "Vida real",
    d: "A vida acontece. Após o domínio da estrutura, seguimos com manutenções estratégicas para sustentar sua potência conforme seus desafios evoluem.",
  },
];

const DEPOIMENTOS: { nome: string; meta: string; texto: string }[] = [
  {
    nome: "Chris Lima",
    meta: "28 anos · Imperatriz — MA",
    texto:
      'E eu devo parte de ta vivo (não só de corpo, mas de alma e mente) a pessoa que você é. Então MUITO OBRIGADO! E também "não obrigado" kkkk. Brincadeira. É só uma paret do meu passado que tenta me iludir para eu achar que ter a alma aprisionada, mas "confortável?!" (O caramba que era confortável! Mas as vezes essa parte quer que eu volte a estar preso) A luz da liberdade assusta, porquê depois das coisas que me ensinou eu percebi que podia ser livre, que tinha muito mais em mim e na vida. Conto com você e comigo mesmo para continuar aprendendo o quão a vida é linda quando lhamos com amor.',
  },
  { nome: "Anna Duailibe", meta: "40 anos · São Luís — MA", texto: "Queria dexar aqui registrado que esotu em tratamento com a Leandra (um tratamento que dura 3 meses) e tem sido um grande divisor de águas na minha vida, eu venho de um histórico de mediunidade aflorada e descontrolada, na qual me causou grande desequilibrios durante toda a vida. O tratamento com a Leandra é completo, físico, emocional e energético (como ela mesma disse). Sentia dores fortes e já sinto leveza no meu corpo e principalmente na minha alma. Obrigada por tudo, Leandra.!" },
  { nome: "Pedro Oliveira", meta: "38 anos · São Paulo — SP", texto: "Isso ajuda muita gente não só a se compreender, mas sobre a própria sanidade. Se não fosse pela senhora eu terai ficado louco só por achar que estava ficando. O espiritual é muito desonsiderado pelas pessoas. Quem sente se falar com algum profissional 95% vão dizer que é a pessoa esquizofrenica ou derivados. E a falta de alguém que já passou por algo parecido vai fazer a pessoa se sentir a mais solitária do mundo." },
];

const FAQ = [
  {
    q: "Isso é terapia convencional?",
    a: "Não. A terapia convencional foca na narrativa emocional e no histórico de traumas. A Reestruturação Natural do Ser foca na organização do seu sistema sensorial, na remoção de entulhos e na calibração de filtros. É um processo técnico e prático de gestão de energia e percepção.",
  },
  {
    q: "Como sei se tenho Alta Percepção?",
    a: "Se você sente que absorve o ambiente como uma esponja, tem dificuldade em distinguir o que é seu do que é do outro, sofre de esgotamento crônico mesmo sem esforço físico e sente que o mundo é \u201cbarulhento demais\u201d, o seu sistema está operando em alta percepção, mas sem a estrutura necessária.",
  },
  { q: "Quanto tempo dura a Consulta Diagnóstico?", a: "2 horas." },
  {
    q: "Quanto tempo dura cada sessão?",
    a: "Cada sessão do ciclo tem duração de 80 minutos, focada exclusivamente na execução do protocolo de reestruturação. Nosso tempo é dedicado à precisão, não à conversa genérica.",
  },
  {
    q: "O método funciona para quem não tem crenças religiosas?",
    a: "Sim. O método é estritamente clínico e estrutural. Não trabalhamos com dogmas ou religião, mas com a organização do seu sistema humano. A eficácia da reestruturação é sentida na prática, independentemente da sua visão de mundo.",
  },
];

/* --------------------------------------------------------------------- page */

function Page() {
  useReveal();

  return (
    <main className="grain overflow-x-hidden bg-background">
      <GoldCursor />
      <Nav />
      <Hero />
      <Identificacao />
      <Impacto />
      <Descompasso />
      <Metodo />
      <Jornada />
      <SobreLeandra />
      <ParaQuem />
      <Depoimentos />
      <Faq />
      <Garantia />
      <CtaFinal />
      <Footer />
    </main>
  );
}

/* ----------------------------------------------------------------------- nav */

function Nav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        solid
          ? "border-b border-forest/10 bg-pearl/85 py-4 backdrop-blur-xl"
          : "border-b border-transparent py-7"
      }`}
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-6 px-6 md:px-12">
        <a href="#top" className="min-w-0">
          <span
            className={`block truncate font-serif text-lg tracking-[0.18em] transition-colors duration-700 ${
              solid ? "text-forest" : "text-pearl"
            }`}
          >
            LEANDRA ESTRELAH
          </span>
          <span
            className={`tracking-brand text-[0.55rem] transition-colors duration-700 ${
              solid ? "text-muted-foreground" : "text-pearl/70"
            }`}
          >
            Reestruturação Natural do Ser
          </span>
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          data-cta="nav"
          className={`shrink-0 border px-5 py-3 text-[0.6rem] tracking-brand transition-all duration-700 ${
            solid
              ? "border-forest/25 text-forest hover:border-gold hover:text-gold"
              : "border-pearl/35 text-pearl hover:border-gold hover:text-gold"
          }`}
        >
          <span className="hidden sm:inline">Consulta Diagnóstico</span>
          <span className="sm:hidden">Agendar</span>
        </a>
      </div>
    </header>
  );
}

/* ---------------------------------------------------------------------- hero */

function Hero() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      {/* PLACEHOLDER — vídeo de fundo. Substitua por <video src="..." autoPlay muted loop playsInline /> */}
      <div className="absolute inset-0">
        <div
          className="animate-drift absolute inset-0"
          style={{ transform: `translateY(${y * 0.12}px)` }}
        >
          <img
            src={olharAsset.url}
            alt="Leandra Estrelah"
            className="h-full w-full object-cover object-[60%_28%]"
          />
        </div>
        <div className="absolute inset-0 bg-forest-deep/55" />
        <div className="absolute inset-0 bg-linear-to-b from-forest-deep/75 via-forest-deep/25 to-forest-deep/90" />
        <div className="leaf-shadow absolute inset-0" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 pt-32 pb-28 md:px-12">
        <div className="animate-veil max-w-3xl">
          <Eyebrow>Leandra Estrelah</Eyebrow>
          <h1 className="mt-8 font-serif text-[clamp(2rem,5.2vw,4.2rem)] leading-[1.06] text-pearl text-balance">
            Reestruturação Natural do Ser:{" "}
            <span className="italic text-gold-soft">
              Mapeamento e Calibragem para pessoas com Alta Percepção.
            </span>
          </h1>
          <p className="mt-10 max-w-xl text-sm leading-relaxed text-pearl/75 md:text-base">
            Não é terapia convencional. É engenharia de precisão para organizar o seu Canal Vital,
            eliminar a sobrecarga e retomar o comando da sua potência.
          </p>
          <div className="mt-12">
            <Cta tone="light" />
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-3">
        <span className="tracking-brand text-[0.55rem] text-pearl/50">Respire e desça</span>
        <div className="h-12 w-px overflow-hidden bg-pearl/20">
          <div className="animate-scroll-hint h-4 w-px bg-gold" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- identificação */

function Identificacao() {
  return (
    <Section id="identificacao" className="bg-background">
      <div className="reveal max-w-3xl">
        <Eyebrow>O problema</Eyebrow>
        <h2 className="mt-8 font-serif text-[clamp(1.9rem,4.6vw,3.4rem)] leading-[1.12] text-forest text-balance">
          Você vive em estado de alerta constante, sente que absorve o ruído do ambiente e está
          exausta de tentar se encaixar em estruturas que não foram feitas para você?
        </h2>
        <p className="mt-10 text-sm leading-relaxed text-muted-foreground">
          Se sim, você reconhece dois ou mais desses sintomas?
        </p>
      </div>

      <div className="mt-20 grid border border-border md:grid-cols-2 lg:grid-cols-3">
        {SINTOMAS.map((s, i) => (
          <article
            key={s}
            className="reveal group relative border-b border-r border-border bg-background p-10 transition-colors duration-700 hover:bg-card last:border-b-0 md:[&:nth-child(2n)]:border-r-0 md:[&:nth-last-child(-n+1)]:border-b-0 lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-last-child(-n+3)]:border-b-0 md:p-12"
            style={{ transitionDelay: `${(i % 3) * 90}ms` }}
          >
            <span className="font-serif text-xs italic text-gold/70">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-6 font-serif text-xl leading-snug text-forest break-words md:text-[1.55rem]">
              {s}
            </p>
            <span className="mt-8 block h-px w-0 bg-gold transition-all duration-1000 group-hover:w-12" />
          </article>
        ))}
      </div>

      <p className="reveal mt-16 max-w-3xl border-l border-gold/40 pl-6 text-sm leading-relaxed text-muted-foreground">
        {SINTOMAS_CRONICOS}
      </p>
    </Section>
  );
}

/* ------------------------------------------------------------------- impacto */

function Impacto() {
  return (
    <section className="relative bg-pearl px-6 py-40 md:px-12 md:py-56">
      <div className="leaf-shadow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="reveal font-serif text-[clamp(2rem,5.5vw,4rem)] leading-[1.1] text-forest text-balance">
          O seu sistema não está quebrado ele só está funcionando{" "}
          <span className="italic text-gold">sem filtro.</span>
        </p>
        <span className="reveal mx-auto mt-16 block h-16 w-px bg-gold/40" />
        <p className="reveal mt-16 font-serif text-[clamp(1.8rem,4.6vw,3.2rem)] leading-[1.12] text-forest text-balance">
          O que você sente tem nome:{" "}
          <span className="italic text-gold">Descompasso Mediúnico</span>
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- descompasso */

function Descompasso() {
  const [open, setOpen] = useState(false);

  return (
    <Section id="descompasso" className="bg-forest text-pearl">
      <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div className="reveal">
          <Eyebrow> </Eyebrow>
          <h2 className="mt-8 font-serif text-[clamp(2rem,5vw,3.6rem)] leading-[1.05] text-pearl">
            Mas o que é o
            <br />
            <span className="italic text-gold-soft">Descompasso Mediúnico?</span>
          </h2>
        </div>

        <div className="space-y-10">
          {[
            "É uma condição clínica que afeta pessoas de alta sensibilidade, manifestando-se através de um desequilíbrio que atravessa as esferas física, mental, emocional e espiritual.",
            "É fundamental esclarecer que esta condição não possui qualquer relação com dogmas, práticas ou instituições religiosas.",
          ].map((t, i) => (
            <p
              key={t}
              className="reveal max-w-xl border-l border-gold/30 pl-6 text-sm leading-relaxed text-pearl/80 md:text-base"
              style={{ transitionDelay: `${i * 110}ms` }}
            >
              {t}
            </p>
          ))}

          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="reveal inline-flex items-center gap-3 border border-pearl/25 px-7 py-3.5 text-[0.65rem] tracking-brand text-pearl transition-all duration-700 hover:border-gold hover:text-gold"
          >
            {open ? "Recolher" : "Entenda melhor"}
            <span className={`transition-transform duration-700 ${open ? "rotate-180" : ""}`}>
              ↓
            </span>
          </button>

          <div
            className="grid transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
          >
            <div className="overflow-hidden">
              <div className="max-w-xl space-y-6 border-t border-pearl/15 pt-8 text-sm leading-relaxed text-pearl/70">
                <p>
                  Trata-se de um fenômeno de processamento sensorial e energético, onde o sistema
                  humano, por ser altamente sensível, acaba por absorver e acumular um volume de
                  dados que não consegue processar, resultando em sobrecarga sistêmica.
                </p>
                <p>
                  O que chamamos de Descompasso Mediúnico acontece quando a alta percepção capta
                  mais dados do ambiente do que o sistema consegue processar. Sem uma estrutura de
                  filtragem, esse excesso se transforma em entulho emocional, gerando o esgotamento
                  que muitas vezes é confundido com patologia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------- método */

function Metodo() {
  return (
    <Section id="metodo" className="bg-background">
      <div className="reveal max-w-2xl">
        <Eyebrow>O método</Eyebrow>
        <h2 className="mt-8 font-serif text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.02] text-forest">
          Reestruturação
          <br />
          <span className="italic">Natural do Ser</span>
        </h2>
        <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
          Após anos de pesquisa, atendimentos e descobertas que impactaram a mim mesma e a centenas
          de pessoas que já atendi, desenvolvi a Restruturação Natural do Ser, um processo voltado
          especificamente para pessoas com altas percepções e com alta sensibilidade.
        </p>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          A Reestruturação Natural do Ser é um processo cíclico que se inicia com 10 sessões
          estruturadas, e foi desenhado para quem busca autonomia e não dependência. <br />
          <strong>Pilares:</strong> Limpeza do seu canal vital  (desobstrução), Calibração (instalação de filtros) e Consolidação (comando do seu sistema).
        </p>
      </div>

      <div className="mt-24 space-y-0">
        {PILARES.map((p, i) => (
          <div key={p.n} className="reveal" style={{ transitionDelay: `${i * 120}ms` }}>
            <div className="grid gap-8 border-t border-border py-14 md:grid-cols-[auto_1fr_1.2fr] md:gap-16">
              <span className="font-serif text-4xl italic text-gold/60 md:text-5xl">{p.n}</span>
              <h3 className="font-serif text-3xl leading-tight text-forest md:text-[2.4rem]">
                {p.t}
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{p.d}</p>
            </div>
            {i < PILARES.length - 1 && (
              <div className="flex justify-center">
                <span className="h-10 w-px bg-gold/30" />
              </div>
            )}
          </div>
        ))}
        <div className="border-t border-border" />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------- jornada */

function Jornada() {
  return (
    <Section id="jornada" className="bg-card">
      <div className="reveal max-w-2xl">
        <Eyebrow> </Eyebrow>
        <h2 className="mt-8 font-serif text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.05] text-forest">
          A jornada em
          <br />
          <span className="italic">três etapas.</span>
        </h2>
      </div>

      <div className="mt-24 grid gap-16 md:grid-cols-3 md:gap-10">
        {JORNADA.map((j, i) => (
          <div key={j.t} className="reveal relative" style={{ transitionDelay: `${i * 140}ms` }}>
            <svg
              viewBox="0 0 64 64"
              aria-hidden
              className="h-14 w-14 text-gold"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            >
              {i === 0 && (
                <>
                  <circle cx="32" cy="32" r="20" />
                  <path d="M32 12v40M12 32h40" opacity="0.4" />
                  <circle cx="32" cy="32" r="3" />
                </>
              )}
              {i === 1 && (
                <>
                  <path d="M10 44c8-26 36-26 44 0" />
                  <path d="M32 18v26" />
                  <circle cx="32" cy="44" r="2.5" />
                </>
              )}
              {i === 2 && (
                <>
                  <path d="M32 52V22" />
                  <path d="M32 30c-6-8-14-8-14-8s0 10 14 10z" />
                  <path d="M32 38c6-9 14-9 14-9s0 11-14 11z" />
                </>
              )}
            </svg>
            <p className="mt-8 tracking-brand text-[0.55rem] text-gold">Etapa {i + 1}</p>
            <h3 className="mt-4 font-serif text-3xl text-forest">{j.t}</h3>
            <p className="mt-2 text-[0.7rem] tracking-[0.18em] text-muted-foreground uppercase">
              {j.s}
            </p>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{j.d}</p>
            {i < JORNADA.length - 1 && (
              <span className="absolute top-7 -right-5 hidden h-px w-10 bg-gold/30 md:block" />
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

/* --------------------------------------------------------------------- sobre */

function SobreLeandra() {
  return (
    <section id="sobre" className="bg-background">
      {/* bloco editorial 1 — olhar firme */}
      <div className="grid items-stretch lg:grid-cols-2">
        <div className="reveal relative min-h-[70vh] overflow-hidden lg:min-h-[110vh]">
          <img
            src={olharAsset.url}
            alt="Leandra Estrelah, terapeuta, olhando diretamente para a câmera"
            loading="lazy"
            className="h-full w-full object-cover object-[55%_25%] transition-transform duration-[2200ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04]"
          />
          <div className="leaf-shadow absolute inset-0" />
        </div>
        <div className="flex items-center px-6 py-24 md:px-16 lg:px-20">
          <div className="reveal max-w-lg">
            <Eyebrow> </Eyebrow>
            <h2 className="mt-8 font-serif text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.08] text-forest">
              Porque eu mapeio e
              <br />
              <span className="italic">reestruturo o seu sistema</span>
            </h2>
            <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]">
              <p>
                A minha trajetória não foi construída apenas no campo clínico, mas na observação
                técnica de como sistemas de alta percepção operam sob sobrecarga. Eu entendi, na
                prática, que o acolhimento genérico é insuficiente para quem possui uma constituição
                de alta precisão.
              </p>
              <p>
                Foi a partir da minha própria busca por estabilidade e da prática clínica que
                desenvolvi a Reestruturação Natural do Ser. Não trabalho com suposições ou
                narrativas infinitas; trabalho com o mapeamento de falhas estruturais no seu Canal
                Vital. A precisão que o seu diagnóstico exige vem da minha capacidade de isolar o
                que é ruído ambiente do que é a sua potência real.
              </p>
              <p className="border-l border-gold/40 pl-6 font-serif text-xl leading-snug text-forest italic md:text-2xl">
                Minha função aqui não é ser sua terapeuta eterna, mas a engenheira que vai te
                entregar o manual de operação do seu próprio sistema.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* bloco editorial 2 — sorriso */}
      <div className="grid items-stretch lg:grid-cols-2">
        <div className="order-2 flex items-center px-6 py-24 md:px-16 lg:order-1 lg:px-20">
          <div className="reveal max-w-lg space-y-6 text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]">
            <Eyebrow>Sobre Leandra Estrelah</Eyebrow>
            <p>
              Sou terapeuta especializada na reestruturação de sistemas de alta percepção, e eu
              mesma, sei o que é sentir o mundo na pele, de uma forma intensa demais, pois também
              possuo altas percepções e um cérebro neurodivergente.
            </p>
            <p>
              Desenvolvi o método da Reestruturação Natural do Ser após anos de prática clínica, ao
              observar que o sofrimento de pessoas sensíveis não era causado por desequilíbrios
              mentais, mas pela ausência de uma estrutura lógica de filtragem do mundo externo.
            </p>
            <p>
              Meu trabalho é aplicar a engenharia necessária para que a sua sensibilidade deixe de
              ser um fardo e passe a ser a sua maior ferramenta de comando e presença no mundo.
            </p>
            <p className="border-l border-gold/40 pl-6 font-serif text-xl leading-snug text-forest italic md:text-2xl">
              A sua sensibilidade não é um defeito de fabricação. É um sistema de alta precisão que,
              até hoje, operou sem filtro. Está na hora de assumir o comando da sua estrutura.
            </p>
          </div>
        </div>
        <div className="reveal relative order-1 min-h-[70vh] overflow-hidden lg:order-2 lg:min-h-[100vh]">
          <img
            src={sorrisoAsset.url}
            alt="Leandra Estrelah sorrindo, gesticulando com as mãos"
            loading="lazy"
            className="h-full w-full object-cover object-[40%_30%] transition-transform duration-[2200ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04]"
          />
          <div className="leaf-shadow absolute inset-0" />
        </div>
      </div>

      {/* placeholder vídeo institucional */}
      <Section className="bg-background">
        <div className="reveal">
          <Eyebrow>Vídeo institucional</Eyebrow>
          <h3 className="mt-6 font-serif text-3xl text-forest md:text-4xl">
            Uma conversa, em breve
          </h3>
        </div>
        <div className="reveal mt-12 flex aspect-[16/9] w-full items-center justify-center border border-border bg-card">
          <div className="text-center">
            <svg
              viewBox="0 0 64 64"
              aria-hidden
              className="mx-auto h-12 w-12 text-gold"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            >
              <circle cx="32" cy="32" r="22" />
              <path d="M27 24l14 8-14 8z" />
            </svg>
            <p className="mt-6 tracking-brand text-[0.6rem] text-muted-foreground">
              Vídeo de apresentação em breve
            </p>
            <p className="mt-3 text-xs text-muted-foreground/70">
              {/* PLACEHOLDER — substituir por <video> quando o institucional for gravado */}
              Espaço reservado para o vídeo de Leandra Estrelah
            </p>
          </div>
        </div>
      </Section>
    </section>
  );
}

/* ---------------------------------------------------------------- para quem */

function ParaQuem() {
  return (
    <Section id="para-quem" className="bg-forest text-pearl">
      <div className="reveal max-w-3xl">
        <Eyebrow>Para quem é</Eyebrow>
        <p className="mt-10 font-serif text-[clamp(1.7rem,4vw,2.8rem)] leading-[1.2] text-pearl text-balance">
          Este processo é para pessoas de{" "}
          <span className="italic text-gold-soft">Alta Percepção</span> que buscam resultados
          concretos, valorizam a sobriedade técnica e estão prontas para deixar de ser esponja do
          ambiente para se tornarem guardiãs da própria potência.
        </p>
      </div>
    </Section>
  );
}

/* --------------------------------------------------------------- depoimentos */

function Depoimentos() {
  return (
    <Section id="depoimentos" className="bg-background">
      <div className="reveal max-w-2xl">
        <Eyebrow>Depoimentos</Eyebrow>
      </div>

      <figure className="reveal mt-12">
        <div className="overflow-hidden border border-border bg-card">
          <video
            src={depoimentoAsset.url}
            controls
            playsInline
            preload="metadata"
            className="max-h-[80vh] w-full bg-forest-deep object-contain"
          />
        </div>
        <figcaption className="mt-5 text-xs tracking-[0.16em] text-muted-foreground uppercase">
          Depoimento em vídeo
        </figcaption>
      </figure>

      <div className="mt-24 grid border border-editorial md:grid-cols-3">
        {DEPOIMENTOS.map((d, i) => (
          <blockquote
            key={d.nome}
            className="reveal flex min-h-[16rem] flex-col justify-between border-b border-r border-editorial bg-background p-10 last:border-b-0 md:[&:nth-child(3n)]:border-r-0 md:[&:nth-last-child(-n+3)]:border-b-0 md:p-12"
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            {d.texto ? (
              <p className="font-serif text-lg leading-snug text-forest italic md:text-[1.3rem]">
                “{d.texto}”
              </p>
            ) : (
              // PLACEHOLDER — depoimento a ser inserido pela cliente
              <p className="tracking-brand text-[0.6rem] text-muted-foreground/70">
                Depoimento em breve
              </p>
            )}
            <footer className="mt-10">
              <p className="text-sm text-forest">{d.nome}</p>
              <p className="mt-1 text-xs text-muted-foreground">{d.meta}</p>
            </footer>
          </blockquote>
        ))}
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------------------- faq */

function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" className="bg-card">
      <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div className="reveal">
          <Eyebrow>Perguntas frequentes</Eyebrow>
          <h2 className="mt-8 font-serif text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] text-forest">
            A precisão que o
            <br />
            <span className="italic">seu sistema exige</span>
          </h2>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
            Minha trajetória não foi construída apenas no campo clínico, mas na observação contínua
            de como sistemas de alta percepção operam. Eu entendi que, para quem possui essa
            sensibilidade, o acolhimento sem método é insuficiente. Foi a partir da minha própria
            busca por estabilidade e da prática clínica que desenvolvi a Reestruturação Natural do
            Ser. Não trabalho com suposições; trabalho com o mapeamento de falhas estruturais no
            Canal Vital. Minha função aqui não é ser sua terapeuta eterna, mas a engenheira que vai
            te entregar o manual de operação do seu próprio sistema.
          </p>
        </div>

        <div className="border-t border-border">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="reveal border-b border-border">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-8 py-8 text-left"
                >
                  <span className="font-serif text-xl text-forest md:text-2xl">{f.q}</span>
                  <span
                    className={`mt-1 shrink-0 text-gold transition-transform duration-700 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className="grid transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-xl pr-10 pb-9 text-sm leading-relaxed text-muted-foreground">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ garantia */

function Garantia() {
  return (
    <Section className="bg-background">
      <div className="reveal mx-auto max-w-2xl text-center">
        <svg
          viewBox="0 0 64 64"
          aria-hidden
          className="mx-auto h-12 w-12 text-gold"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        >
          <path d="M32 8l20 8v16c0 12-8 20-20 24C20 52 12 44 12 32V16z" />
          <path d="M24 32l6 6 12-13" />
        </svg>
        <h2 className="mt-10 font-serif text-[clamp(2rem,5vw,3.4rem)] leading-[1.08] text-forest">
          Compromisso com a sua clareza
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
          A Consulta Diagnóstico é o primeiro passo para o seu comando. Se, ao final do nosso
          mapeamento, você não sentir que identificamos a raiz do seu descompasso e que o caminho
          para a sua reestruturação está claro, eu devolvo integralmente o valor investido na
          consulta. Você tem total segurança para entender como o seu sistema funciona, sem riscos.
        </p>
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------------- cta final */

function CtaFinal() {
  return (
    <section className="relative overflow-hidden bg-forest-deep px-6 py-40 text-pearl md:px-12 md:py-56">
      <div className="leaf-shadow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="reveal font-serif text-[clamp(1.8rem,5vw,3.6rem)] leading-[1.12] text-pearl text-balance">
          A sua sensibilidade não é um defeito de fabricação. É um sistema de alta precisão que, até
          hoje, operou sem filtro.
        </p>
        <p className="reveal mt-6 font-serif text-[clamp(1.8rem,5vw,3.6rem)] leading-[1.12] text-gold-soft italic text-balance">
          Está na hora de assumir o comando da sua estrutura.
        </p>
        <div className="reveal mt-16">
          <Cta tone="light" />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- footer */

function Footer() {
  return (
    <footer className="border-t border-pearl/10 bg-forest-deep px-6 py-14 text-pearl/60 md:px-12">
      <div className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="font-serif text-lg tracking-[0.18em] text-pearl">LEANDRA ESTRELAH</p>
          <p className="mt-2 text-xs">Reestruturação Natural do Ser · Atendimento online</p>
          <div className="mt-4 flex flex-wrap gap-5 text-xs">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              data-cta="footer-whatsapp"
              className="transition-colors hover:text-gold"
            >
              WhatsApp · +55 98 8830-0203
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-gold"
            >
              @leandraestrelahterapeuta
            </a>
          </div>
        </div>
        <p className="text-xs">
          © {new Date().getFullYear()} Leandra Estrelah. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
