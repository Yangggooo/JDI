# JDI$ Borderless Fullscreen Design QA

## Evidence

- Source visual truth: `/Users/tong/Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/yyyyy0122_592c/msg/file/2026-08/JDI$ 项目概念与代币经济模型 (2).pdf` plus the user's annotated screenshot `/var/folders/w3/x45yvr9n4z78xnq_dckv6m7r0000gn/T/codex-clipboard-3a96b206-ef9b-423a-8f31-8adc958d278c.png`, which explicitly marks the four rounded frame corners for removal.
- Source format: 9 pages, each 2560 × 1440 pt, 16:9.
- Borderless target derived from the source page and the requested crop: `qa/reference-fullscreen-borderless-page-9.png`.
- Browser-rendered implementation: `qa/implementation-fullscreen-page-9-settled.png`.
- Desktop viewport: 1800 × 980 CSS px. The source and implementation evidence are normalized to 1800 × 980 px.
- Mobile viewport: 390 × 844 CSS px; evidence at `qa/implementation-mobile-borderless-page-1.png`.
- Full-view side-by-side comparison: `qa/comparison-fullscreen-borderless-page-9.png`, with the intended borderless source treatment at left and the browser implementation at right.
- Focused corner comparison: `qa/comparison-fullscreen-corners.png`; the first row contains the four target corners and the second row the four implementation corners.
- State: default dark presentation, representative final contact page, plus responsive first-page and page-snap states.

## Findings

- No actionable P0, P1, or P2 mismatches remain.
- Fonts and typography: the source page remains raster-preserved, so family, weights, hierarchy, line breaks, mixed Chinese/English copy, and antialiasing do not reflow.
- Spacing and layout rhythm: landscape pages now cover the entire browser viewport. A centered 1.2% overscan removes the source PDF's thin rounded frame and corner artifacts. On portrait screens, the full page remains visible and centered, while the same overscan clips only the outer frame.
- Colors and visual tokens: the page and canvas use the sampled navy background `#0b0f1a`, avoiding a visible seam around the page.
- Image quality and asset fidelity: all nine pages continue to use the lossless 3912 × 2200 PNG renders. The only intentional visual change is cropping the outer frame requested by the user.
- Copy and content: page text and imagery remain unchanged. Page 9 retains invisible email and website hotspots without adding visible UI.
- Responsive behavior: desktop full-bleed, portrait contain behavior, keyboard paging, wheel/touch scrolling, snap-to-page, and first/last page navigation were checked.
- Browser console: no warnings or errors.

## Comparison History

- Earlier implementation issue (P2): the 16:9 page used contain sizing, exposing the PDF's rounded picture-frame corners and side margins on a slightly wider viewport.
- Fix: landscape pages now use a full-viewport frame with cover cropping; a centered 1.2% overscan removes the remaining thin outer border. Portrait mode preserves the entire page and applies only the border-removing overscan.
- Post-fix evidence: the settled page-9 frame begins at `(0, 0)` and covers the 1800 × 980 viewport; focused corner evidence shows no rounded edge, frame line, or outside gap.
- Existing mobile snap correction remains valid: the page-2 retest settled at `scrollTop: 844`, with page 2 at top `0`.

## Primary Interactions Tested

- Arrow-right paging from page 1 to page 2 at 1800 × 980.
- `End` navigation to page 9 and exact settlement at `scrollTop: 7840`.
- Touch/wheel-style scrolling from page 1 to page 2 at 390 × 844.
- Page-9 email and website hotspot geometry and destinations.
- Browser-rendered image loading and the full 9-page DOM structure.

## Follow-up Polish

- None required for this change.

final result: passed
