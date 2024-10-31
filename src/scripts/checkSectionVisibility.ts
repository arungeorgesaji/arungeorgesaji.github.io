export const checkSectionVisibility = (): void => {
  const sections = document.querySelectorAll("section[id]") as NodeListOf<HTMLElement>;
  const navLinks = document.querySelectorAll(".nav-links a[href^='#']") as NodeListOf<HTMLAnchorElement>;
  const sidebarLinks = document.querySelectorAll(".sidebar a[href^='#']") as NodeListOf<HTMLAnchorElement>;
  const viewportHeight = window.innerHeight;

  const handleScroll = (): void => {
    const scrollPosition = window.scrollY;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionId = section.id;

      if (rect.top < viewportHeight / 2 && rect.bottom > viewportHeight / 2) {
        navLinks.forEach((link) => link.classList.remove("active-section"));
        sidebarLinks.forEach((link) => link.classList.remove("active-section"));

        const activeLinks = document.querySelectorAll(
          `a[href="#${sectionId}"]`
        ) as NodeListOf<HTMLAnchorElement>;
        activeLinks.forEach((link) => link.classList.add("active-section"));
      }
    });
  };

  let timeoutId: number | undefined;
  const debouncedScroll = (): void => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }
    
    timeoutId = window.setTimeout(() => {
      handleScroll();
    }, 10);
  };

  const handleLinkClick = (e: MouseEvent): void => {
    const target = e.currentTarget as HTMLAnchorElement;
    const sectionId = target.getAttribute("href");
    
    if (sectionId && sectionId.startsWith("#")) {
      e.preventDefault();
      const section = document.querySelector(sectionId);
      section?.scrollIntoView({ behavior: "smooth" });
    }
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", handleLinkClick);
  });

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", handleLinkClick);
  });

  window.addEventListener("scroll", debouncedScroll);
  window.addEventListener("resize", debouncedScroll);

  handleScroll();
};
