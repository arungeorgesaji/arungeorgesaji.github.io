export const animationVisibility = (): void => {
 const elements = document.querySelectorAll("*") as NodeListOf<HTMLElement>;
 const viewportHeight = window.innerHeight;

 const handleScroll = (): void => {
   elements.forEach((element) => {
     const rect = element.getBoundingClientRect();
     if (rect.top < viewportHeight && rect.bottom > 0) {
       element.classList.add("visible");
     } else {
       element.classList.remove("visible");
     }
   });
 };

 window.addEventListener("load-animation", handleScroll);
 handleScroll();
};
