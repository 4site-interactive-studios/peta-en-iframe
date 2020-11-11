import { Shortcode } from "./utils/shortcodde";
export const run = () => {
  const getFrameByEvent = (event) => {
    return [].slice
      .call(document.getElementsByTagName("iframe"))
      .filter(function(iframe) {
        return iframe.contentWindow === event.source;
      })[0];
  };
  document.querySelectorAll("#content-area section").forEach((el) => {
    console.log(el);
    let petaIframe = new Shortcode(el, {
      iframe: function() {
        return `<iframe loading='lazy' id='peta-iframe' width='100%' scrolling='no' class='peta-iframe' src='${this.options.url}' frameborder='0' allowfullscreen></iframe>`;
      },
    });
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
        window.scrollTo({
          top: scrollTo,
          left: 0,
          behavior: "smooth",
        });
        console.log(
          "Scrolling to",
          scrollTo,
          iframe.getBoundingClientRect().top,
          e.data.scroll
        );
      }
    }
  };
};
