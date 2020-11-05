// import { Shortcode } from "./utils/shortcodde";
export const run = () => {
  const sendIframeHeight = () => {
    let height = document.body.offsetHeight;
    window.parent.postMessage(
      {
        frameHeight: height,
      },
      "*"
    );
    console.log("Sending height... ", height); // check the message is being sent correctly
  };

  // Iframe Code Start
  const inIframe = () => {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  };
  if (inIframe()) {
    const shouldScroll = () => {
      // If you find a error, scroll
      if (document.querySelector(".en__errorHeader")) {
        return true;
      }
      // Try to match the iframe referrer URL by testing valid EN Page URLs
      let referrer = document.referrer;
      let enURLPattern = new RegExp(/^(.*)\/(page)\/(\d+.*)/);

      // Scroll if the Regex matches, don't scroll otherwise
      return enURLPattern.test(referrer);
    };
    window.onload = () => {
      sendIframeHeight();
      // Scroll to top of iFrame
      window.parent.postMessage(
        {
          scroll: shouldScroll(),
        },
        "*"
      );
      document.addEventListener("click", (e) => {
        var targetElement = e.target || e.srcElement;
        var parentElement = targetElement.parentNode;
        if (parentElement.classList.contains("en__submit")) {
          window.parent.postMessage(
            {
              scroll: true,
            },
            "*"
          );
        }
        setTimeout(() => {
          sendIframeHeight();
          window.parent.postMessage(
            {
              scroll: shouldScroll(),
            },
            "*"
          );
        }, 400);
      });
    };
    window.onresize = () => sendIframeHeight();
    // Add data-en-embedded class to the body
    document.documentElement.setAttribute("data-en-embedded", true);
  }
  // Iframe Code End
};
