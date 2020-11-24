import { Shortcode } from "./utils/shortcodde";
export const run = () => {
  const getFrameByEvent = (event) => {
    return [].slice
      .call(document.getElementsByTagName("iframe"))
      .filter(function(iframe) {
        return iframe.contentWindow === event.source;
      })[0];
  };
  document.querySelectorAll(".iframe-shortcode").forEach((el) => {
    console.log(el);
    new Shortcode(el, {
      iframe: function() {
        return `<iframe loading='lazy' id='peta-iframe' width='100%' scrolling='no' class='peta-iframe' src='${this.options.url}' frameborder='0' allowfullscreen referrerpolicy='no-referrer-when-downgrade'></iframe>`;
      },
    });
    el.classList.remove("iframe-shortcode");
  });

  // Scrolling Code
  window.onmessage = (e) => {
    var iframe = getFrameByEvent(e);
    if (iframe) {
      if (e.data.hasOwnProperty("frameHeight")) {
        iframe.style.height = `${e.data.frameHeight}px`;
      } else if (e.data.hasOwnProperty("scroll") && e.data.scroll > 0) {
        // e.data.scroll will be the iframe offset to scroll, 1 = top of the iframe
        const elDistanceToTop =
          window.pageYOffset + iframe.getBoundingClientRect().top;
        let scrollTo = elDistanceToTop + e.data.scroll - 80; // 80 = Fixed Header Offset

        // Check if has splash
        let overlay = document.querySelector(".reveal-overlay");
        if (overlay) {
          scrollTo = e.data.scroll - 80;
          overlay.scrollTo({
            top: scrollTo,
            left: 0,
            behavior: "smooth",
          });
          console.log("Scrolling Overlay To", scrollTo);
        } else {
          window.scrollTo({
            top: scrollTo,
            left: 0,
            behavior: "smooth",
          });
          console.log("Scrolling Window To", scrollTo);
        }
      }
    }
  };
};
