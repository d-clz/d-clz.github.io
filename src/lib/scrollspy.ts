// src/lib/scrollspy.ts
// Watches a set of elements and marks the matching [data-rail-link] as
// aria-current="true" for whichever one is topmost in the viewport.
// Shared by the post TOC (watches headings) and the home timeline
// (watches post cards).

export function initScrollspy(targets: Element[]) {
  const links = new Map(
    Array.from(document.querySelectorAll('[data-rail-link]')).map((link) => [
      link.getAttribute('data-rail-link'),
      link,
    ])
  );
  if (targets.length === 0 || links.size === 0) return;

  function setActive(key: string) {
    for (const link of links.values()) link.removeAttribute('aria-current');
    links.get(key)?.setAttribute('aria-current', 'true');
  }

  const firstKey = targets[0].getAttribute('data-rail-key') ?? targets[0].id;
  if (firstKey) setActive(firstKey);

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (visible) {
        const key = visible.target.getAttribute('data-rail-key') ?? visible.target.id;
        if (key) setActive(key);
      }
    },
    { rootMargin: '-18% 0px -68% 0px', threshold: 0 }
  );
  for (const target of targets) observer.observe(target);
  return observer;
}
