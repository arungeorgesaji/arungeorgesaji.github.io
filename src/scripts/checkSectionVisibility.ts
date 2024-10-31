export const checkSectionsVisibility = (): void => {
  const sectionIds = ["home", "about", "experience", "projects", "blog", "contact"];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
  const viewportHeight = window.innerHeight;

  const navLinks = document.querySelectorAll('.left-links a');
  navLinks.forEach(link => link.classList.remove('active-page'));

  let activeSection: string | null = null; 

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < viewportHeight && rect.bottom > 0) {
      activeSection = section.id; 
    }
  });

  if (activeSection) {
    const activeLink = document.querySelector(`.left-links a[href="#${activeSection}"]`) as HTMLElement;
    if (activeLink) {
      activeLink.classList.add('active-page');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.querySelector('.toggle-sidebar') as HTMLElement;
  const sidebar = document.querySelector('.sidebar') as HTMLElement;

  if (toggleButton && sidebar) {
    toggleButton.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
  } else {
    console.warn('Toggle button or sidebar is not present in the DOM');
  }

  window.addEventListener('scroll', checkSectionsVisibility);
  window.addEventListener('resize', checkSectionsVisibility);
  checkSectionsVisibility(); 
});

