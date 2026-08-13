import { useCallback, useEffect, useRef, useState } from "react";

const PAGE_COUNT = 9;
const pages = Array.from({ length: PAGE_COUNT }, (_, index) => index + 1);

export function App() {
  const deckRef = useRef(null);
  const pageRefs = useRef([]);
  const [activePage, setActivePage] = useState(1);

  const goToPage = useCallback((pageNumber) => {
    const nextPage = Math.min(PAGE_COUNT, Math.max(1, pageNumber));
    pageRefs.current[nextPage - 1]?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }, []);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActivePage(Number(visible.target.dataset.page));
        }
      },
      { root: deck, threshold: [0.55, 0.8, 1] },
    );

    pageRefs.current.forEach((page) => page && observer.observe(page));

    const settleOnPage = () => {
      const pageHeight = deck.clientHeight;
      const nearestPageTop = Math.round(deck.scrollTop / pageHeight) * pageHeight;

      if (Math.abs(deck.scrollTop - nearestPageTop) > 1) {
        deck.scrollTo({ top: nearestPageTop, behavior: "auto" });
      }
    };

    deck.addEventListener("scrollend", settleOnPage);

    return () => {
      observer.disconnect();
      deck.removeEventListener("scrollend", settleOnPage);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (["ArrowDown", "ArrowRight", "PageDown"].includes(event.key)) {
        event.preventDefault();
        goToPage(activePage + 1);
      } else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        goToPage(activePage - 1);
      } else if (event.key === " " && !event.shiftKey) {
        event.preventDefault();
        goToPage(activePage + 1);
      } else if (event.key === " " && event.shiftKey) {
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

  return (
    <main
      ref={deckRef}
      className="deck"
      aria-label="JDI$ 项目概念与代币经济模型"
    >
      {pages.map((pageNumber) => (
        <section
          key={pageNumber}
          ref={(node) => {
            pageRefs.current[pageNumber - 1] = node;
          }}
          className="slide"
          data-page={pageNumber}
          aria-label={`第 ${pageNumber} 页，共 ${PAGE_COUNT} 页`}
        >
          <div className="slide-frame">
            <img
              src={
                pageNumber === 3
                  ? "/pages/page-3-filled-v3.png"
                  : `/pages/page-${pageNumber}.png`
              }
              alt={`JDI$ 项目概念与代币经济模型，第 ${pageNumber} 页`}
              width="3912"
              height="2200"
              loading={pageNumber <= 2 ? "eager" : "lazy"}
              fetchPriority={pageNumber === 1 ? "high" : "auto"}
              draggable="false"
            />

            {pageNumber === 9 && (
              <div className="contact-hotspots" aria-label="联系方式">
                <a
                  className="contact-hotspot contact-email"
                  href="mailto:info@jdi-justice.io"
                  aria-label="发送邮件到 info@jdi-justice.io"
                  title="发送邮件到 info@jdi-justice.io"
                >
                  <span className="sr-only">info@jdi-justice.io</span>
                </a>
              </div>
            )}
          </div>
        </section>
      ))}

      <p className="sr-only" aria-live="polite">
        当前第 {activePage} 页，共 {PAGE_COUNT} 页
      </p>
    </main>
  );
}
