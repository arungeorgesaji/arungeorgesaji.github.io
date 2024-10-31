export const checkSectionsVisibility = (): void => {
  const sectionIds = ["home", "about", "experience", "projects", "blog", "contact"];
  const leftLinks = document.querySelector('.left-links') as NodeListOf<HTMLElement>; 
  const sections = sectionIds.map(id => document.getElementById(id));

  const handleScroll = (): void => {
    const viewportHeight = window.innerHeight;

    sections.forEach((section) => {
      if (section) {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < viewportHeight && rect.bottom > 0;

        console.log(`Section: ${section.id}, Is Visible: ${isVisible}`);

        if (leftLinks) {
          leftLinks.querySelectorAll('.active-section').forEach(link => {
            link.classList.remove('active-section');
          });

          if (isVisible) {
            const activeLink = leftLinks.querySelector(`#${section.id}`);
            if (activeLink) {
              activeLink.classList.add('active-section');
            }
          }
        }
      }
    });
  };

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleScroll);

  handleScroll();
};

