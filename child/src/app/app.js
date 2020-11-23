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
      // If you find a page error, scroll to it
      if (document.querySelector(".en__errorHeader")) {
        return document
          .querySelector(".en__errorHeader")
          .getBoundingClientRect().top;
      }
      // If you find a field error, scroll to it
      if (document.querySelector(".en__field__error")) {
        return document
          .querySelector(".en__field__error")
          .getBoundingClientRect().top;
      }
      // Try to match the iframe referrer URL by testing valid EN Page URLs
      let referrer = document.referrer;
      let enURLPattern = new RegExp(/^(.*)\/(page)\/(\d+.*)/);

      // Scroll if the Regex matches, don't scroll otherwise
      return enURLPattern.test(referrer) ? 1 : 0;
    };
    window.onload = () => {
      // repeat with the interval of 200ms
      let timerId = setInterval(() => sendIframeHeight(), 200);
      // after 3 seconds, stop
      setTimeout(() => {
        clearInterval(timerId);
      }, 3000);
      // Scroll to top of iFrame after half second
      setTimeout(() => {
        window.parent.postMessage(
          {
            scroll: shouldScroll(),
          },
          "*"
        );
      }, 500);

      document.addEventListener("click", (e) => {
        var targetElement = e.target || e.srcElement;
        var parentElement = targetElement.parentNode;
        if (parentElement.classList.contains("en__submit")) {
          setTimeout(() => {
            window.parent.postMessage(
              {
                scroll: shouldScroll(),
              },
              "*"
            );
          }, 200);
        } else {
          sendIframeHeight();
        }
      });
    };
    window.onresize = () => sendIframeHeight();
    // Add data-en-embedded class to the body
    document.documentElement.setAttribute("data-en-embedded", true);
    document.documentElement.setAttribute("data-en-suppress-lightboxes", true);
  }
  // Iframe Code End
};
