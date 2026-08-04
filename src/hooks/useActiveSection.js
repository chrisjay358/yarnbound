import { useEffect, useState } from 'react';

/*
 * Scrollspy: reports which section is currently in the middle of the screen
 * so the nav can highlight it.
 *
 * rootMargin '-45% 0px -45% 0px' shrinks the observer's detection zone to a
 * thin band across the vertical MIDDLE of the viewport (45% cut off the top,
 * 45% off the bottom → a ~10%-tall strip left in the centre). A section counts
 * as active only while it passes through that middle strip, so exactly one
 * section is ever active at a time — steadier than "topmost visible section",
 * which flickers between two.
 */
export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );

    sections.forEach((section) => sectionObserver.observe(section));
    return () => sectionObserver.disconnect();
  }, [sectionIds]);

  return activeId;
}
