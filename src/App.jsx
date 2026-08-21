import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChartBar,
  Coins,
  EnvelopeSimple,
  Fire,
  Gavel,
  GlobeHemisphereWest,
  GlobeSimple,
  GraduationCap,
  MagnifyingGlass,
  Scales,
  ShieldCheck,
  Sparkle,
  Target,
} from "@phosphor-icons/react";

const PAGE_COUNT = 9;
const assetBase = import.meta.env.BASE_URL;

const scenes = {
  hero: `${assetBase}assets/cinematic/coin-hero-guardian-v3.jpg`,
  justice: `${assetBase}assets/cinematic/pain-guardian.jpg`,
  mission: `${assetBase}assets/cinematic/mission-guardian.jpg`,
  dawn: `${assetBase}assets/cinematic/dawn-collective.jpg`,
  value: `${assetBase}assets/cinematic/value-capture.jpg`,
  allocation: `${assetBase}assets/cinematic/token-allocation.jpg`,
  capture: `${assetBase}assets/cinematic/value-loop.jpg`,
  road: `${assetBase}assets/cinematic/road-guardian.jpg`,
  final: `${assetBase}assets/cinematic/final-guardian.jpg`,
};

const pillars = [
  {
    icon: GraduationCap,
    title: "L2E 防守教育",
    body: "学以致赚模型。用户通过完成安全教育 and 风险防范测试获取代币奖励，实现真正的正向防御。",
  },
  {
    icon: MagnifyingGlass,
    title: "链上正义追踪",
    body: "发布正义悬赏，让顶尖链上侦探提供跑路资金的流向分析报告，为后续法律诉讼定案提供铁证。",
  },
  {
    icon: Gavel,
    title: "众筹联合诉讼",
    body: "通过代币众筹律师费，并由 JDI 平台对接跨境集体诉讼律所，实现低成本、高威慑力的司法阻击。",
  },
];

const allocations = [
  { value: "40%", label: "项目举证与白帽黑客奖励" },
  { value: "20%", label: "教育平台激励/学习者奖励" },
  { value: "20%", label: "法律维权储备基金" },
  { value: "20%", label: "团队与流动性做市储备" },
];

const roadmap = [
  {
    title: "Q1 - 上线金融教育平台",
    body: "全面上线“学以致赚”底层网络，推出基础反诈、安全审计、避坑投研课程。冷启动阶段，聚焦教育流量蓄水池。",
  },
  {
    title: "Q2 - 投资者举证平台",
    body: "根据 CoinMarketCap 项目排名收录行业库。支持散户针对每个项目的项目方信息、可疑动态等贡献举证材料并共享信息，沉淀全网最真实的群智风控数据库。",
  },
  {
    title: "Q3 - 诉讼中介化",
    body: "代币众筹正式起航，平台作为去中心化隔离中介，将资金与链上铁证统一打包，对接跨境集体诉讼律所。",
  },
  {
    title: "Q4 - B端合规审计",
    body: "对正规优质项目发起反欺诈及合规评测并进行商业化变现，实现健康的 B2B2C 商业自造血。",
  },
];

function Scene({ src, position = "center", priority = false }) {
  return (
    <div className="scene" aria-hidden="true">
      <img
        src={src}
        alt=""
        style={{ objectPosition: position }}
        loading="eager"
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        draggable="false"
      />
    </div>
  );
}

function SectionHeading({ children, compact = false }) {
  return (
    <h2 className={`section-heading${compact ? " section-heading--compact" : ""}`}>
      {children}
    </h2>
  );
}

function AppChrome({ activePage, onNavigate }) {
  const navItems = [
    { page: 2, icon: GlobeSimple, label: "痛点剖析：跨境与信息鸿沟" },
    { page: 5, icon: ChartBar, label: "代币经济：正义的无限通缩" },
    { page: 8, icon: Target, label: "JDI$ 业务落地推进路线图" },
    { page: 9, icon: Sparkle, label: "加入 JDI$，守护正义" },
  ];

  return (
    <>
      <header className="topbar">
        <button
          className="brand-button"
          type="button"
          onClick={() => onNavigate(1)}
          aria-label="JOINT DEFENCE INITIATIVE (JDI$)"
        >
          <span>JDI$</span>
        </button>

        <nav className="top-actions" aria-label="JDI$">
          {navItems.map(({ page, icon: Icon, label }) => (
            <button
              key={page}
              className={activePage === page ? "is-active" : ""}
              type="button"
              onClick={() => onNavigate(page)}
              aria-label={label}
              title={label}
            >
              <Icon weight="light" />
            </button>
          ))}
        </nav>
      </header>

      <nav className="page-rail" aria-label="JDI$">
        {Array.from({ length: PAGE_COUNT }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              className={pageNumber === activePage ? "is-active" : ""}
              type="button"
              onClick={() => onNavigate(pageNumber)}
              aria-label={`${pageNumber}`}
              aria-current={pageNumber === activePage ? "page" : undefined}
            />
          );
        })}
      </nav>
    </>
  );
}

export function App() {
  const deckRef = useRef(null);
  const pageRefs = useRef([]);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    Object.values(scenes).forEach((src) => {
      const image = new Image();
      image.decoding = "async";
      image.src = src;
      image.decode?.().catch(() => undefined);
    });
  }, []);

  const goToPage = useCallback((pageNumber) => {
    const nextPage = Math.min(PAGE_COUNT, Math.max(1, pageNumber));
    pageRefs.current[nextPage - 1]?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return undefined;

    deck.scrollTop = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActivePage(Number(visible.target.dataset.page));
      },
      { root: deck, threshold: [0.35, 0.6, 0.85] },
    );

    pageRefs.current.forEach((page) => page && observer.observe(page));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (["ArrowDown", "ArrowRight", "PageDown"].includes(event.key)) {
        event.preventDefault();
        goToPage(activePage + 1);
      } else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        goToPage(activePage - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        goToPage(1);
      } else if (event.key === "End") {
        event.preventDefault();
        goToPage(PAGE_COUNT);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activePage, goToPage]);

  const registerPage = (pageNumber) => (node) => {
    pageRefs.current[pageNumber - 1] = node;
  };

  return (
    <main
      ref={deckRef}
      className="deck"
      aria-label="JDI$"
    >
      <AppChrome
        activePage={activePage}
        onNavigate={goToPage}
      />

      <section
        ref={registerPage(1)}
        className={`slide slide--hero${activePage === 1 ? " is-active" : ""}`}
        data-page="1"
      >
        <Scene src={scenes.hero} position="center" priority />
        <div className="hero-copy">
          <p className="eyebrow">JOINT DEFENCE INITIATIVE (JDI$)</p>
          <h1><span>守卫正义的</span><span>散户防线</span></h1>
          <strong className="hero-token">JDI$</strong>
          <p className="hero-summary">全球首个集金融安全教育与集体维权于一体的变革性生态模型</p>
        </div>

      </section>

      <section
        ref={registerPage(2)}
        className={`slide slide--pain${activePage === 2 ? " is-active" : ""}`}
        data-page="2"
      >
        <Scene src={scenes.justice} position="center" />
        <div className="statement-panel section-copy-block">
          <SectionHeading>痛点剖析：<span className="pdf-gold">跨境与信息鸿沟</span></SectionHeading>
          <p>Web3项目方来自全球，投资人也来自全球，信息不对称极大，维权成本高，散户永远沦为金融骗局中的受害者。</p>
        </div>
      </section>

      <section
        ref={registerPage(3)}
        className={`slide slide--mission${activePage === 3 ? " is-active" : ""}`}
        data-page="3"
      >
        <Scene src={scenes.mission} position="center" />
        <div className="section-content mission-content">
          <SectionHeading>JDI$ 的使命：双轮驱动闭环</SectionHeading>
          <div className="mission-grid">
            <article>
              <div className="article-icon"><ShieldCheck weight="duotone" /></div>
              <h3>以学促防 (Education)</h3>
              <p>“生前投保”：通过系统的链上反诈骗教育与高阶投研分析，全方位提升散户的风险控制能力与项目辨别力，从源头消灭被割韭菜的可能性。</p>
            </article>
            <article>
              <div className="article-icon"><Scales weight="duotone" /></div>
              <h3>以众筹权 (Advocacy)</h3>
              <p>“死后理赔”：一旦遭遇不可抗力损失，JDI$ 生态提供一站式的技术追踪（黑客追踪）和中介对接（集体诉讼），保障散户的正当权益。</p>
            </article>
          </div>
        </div>
      </section>

      <section
        ref={registerPage(4)}
        className={`slide slide--pillars${activePage === 4 ? " is-active" : ""}`}
        data-page="4"
      >
        <Scene src={scenes.dawn} position="67% center" />
        <div className="section-content pillars-content">
          <SectionHeading>JDI$ 的三大颠覆性产品支柱</SectionHeading>
          <div className="pillar-grid">
            {pillars.map(({ icon: Icon, title, body }) => (
              <article key={title}>
                <div className="article-icon"><Icon weight="duotone" /></div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={registerPage(5)}
        className={`slide slide--token${activePage === 5 ? " is-active" : ""}`}
        data-page="5"
      >
        <Scene src={scenes.value} position="center" />
        <div className="token-copy section-copy-block">
          <span className="token-icon" aria-hidden="true"><Fire weight="duotone" /></span>
          <SectionHeading>代币经济：<span className="pdf-gold">正义的无限通缩</span></SectionHeading>
          <p>JDI$ 代币不仅是生态系统的治理 and 支付凭证，更是与“正义胜利”深度绑定的通缩机制载体。</p>
        </div>
      </section>

      <section
        ref={registerPage(6)}
        className={`slide slide--allocation${activePage === 6 ? " is-active" : ""}`}
        data-page="6"
      >
        <Scene src={scenes.allocation} position="72% center" />
        <div className="section-content allocation-content">
          <SectionHeading>JDI$ 通证分配架构</SectionHeading>
          <div className="allocation-list">
            {allocations.map((item, index) => (
              <article key={item.label} style={{ "--delay": `${index * 90}ms` }}>
                <span className="allocation-value">{item.value}</span>
                <span className="allocation-label">{item.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={registerPage(7)}
        className={`slide slide--capture${activePage === 7 ? " is-active" : ""}`}
        data-page="7"
      >
        <Scene src={scenes.capture} position="center" />
        <div className="section-content capture-content">
          <SectionHeading compact>JDI$ 的多维价值捕获与通缩闭环</SectionHeading>
          <div className="capture-grid">
            <article>
              <h3><Scales weight="duotone" />C端：诉讼发起与维权刚需</h3>
              <p><strong>众筹发起费与诉讼结算：</strong>散户联合发起跨境集体诉讼或众筹诉讼费时，必须将 $JDI$ 质押或全额支付。对接签约国际律所的一对一高级法律咨询，也必须以 $JDI$ 统一支付。</p>
              <p><strong>举证防伪与风控治理机制：</strong>为防止恶意爆料和女巫攻击，散户在 JDI 举证平台提交项目证据时需质押小额代币。通过验证可解锁收益，作恶则罚没，确保数据的权威真实性。</p>
              <p><strong>胜诉强制回购销毁：</strong>当 JDI$ 平台对接的集体诉讼成功，散户获得项目方赔偿或和解协议资金后，10%-20% 的回款必须强制在二级市场回购并销毁 JDI$。</p>
            </article>
            <article>
              <h3><Coins weight="duotone" />B端及生态：造血反哺与通缩</h3>
              <p><strong>B端合规服务利润直接注入：</strong>优质 Web3 项目方为争取散户信任，付费向 JDI 平台申请合规评测和反欺诈审计。所得纯利润 of 30%，强制用来在二级市场回购并直接销毁 $JDI$。</p>
              <p><strong>业务消耗与服务黑洞：</strong>B端付费项目审计费用、用户支付的解锁高阶安全课程费、一对一法律咨询费，其支付代币金额的 20% 直接销毁。其余 80% 重新灌入教育奖池，确保持续通缩。</p>
              <p><strong>追赃索赔与资产追回抽成：</strong>通过平台白帽侦探成功追踪、拦截被盗赃款，或经跨境法律诉讼追回散户被骗资产后，平台提取挽回额的 5% 作为佣金，全额用于在市场回购并销毁，强力托底币价。</p>
            </article>
          </div>
        </div>
      </section>

      <section
        ref={registerPage(8)}
        className={`slide slide--roadmap${activePage === 8 ? " is-active" : ""}`}
        data-page="8"
      >
        <Scene src={scenes.road} position="center" />
        <div className="section-content roadmap-content">
          <SectionHeading>JDI$ 业务落地推进路线图</SectionHeading>
          <div className="roadmap-grid">
            {roadmap.map((item, index) => (
              <article key={item.title} style={{ "--delay": `${index * 100}ms` }}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={registerPage(9)}
        className={`slide slide--contact${activePage === 9 ? " is-active" : ""}`}
        data-page="9"
      >
        <Scene src={scenes.final} position="right top" />
        <div className="contact-copy section-copy-block">
          <div className="contact-mark" aria-hidden="true"><ShieldCheck weight="duotone" /></div>
          <SectionHeading>加入 <span className="pdf-gold">JDI$</span>，守护正义</SectionHeading>
          <p>让散户拥有足以抗衡机构的武器，不再做案板上的鱼肉。</p>
          <div className="contact-lines">
            <a href="mailto:info@jdi-justice.io"><EnvelopeSimple weight="duotone" /><span>info@jdi-justice.io</span></a>
            <div><GlobeHemisphereWest weight="duotone" /><span>www.jdi-justice.io</span></div>
          </div>
        </div>
      </section>

      <p className="sr-only" aria-live="polite">{activePage}{PAGE_COUNT}</p>
    </main>
  );
}
