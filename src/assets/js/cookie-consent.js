(function () {
  const CONSENT_KEY = "mywebclass_cookie_consent";

  function getConsent() {
    return JSON.parse(localStorage.getItem(CONSENT_KEY));
  }

  function setConsent(value) {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
    location.reload();
  }

  function hasConsent() {
    const consent = getConsent();
    return consent && consent.analytics === true;
  }

  function createBanner() {
    const banner = document.createElement("div");
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-live", "polite");
    banner.innerHTML = `
      <div style="
        position:fixed;
        bottom:0;
        left:0;
        right:0;
        background:#111;
        color:#fff;
        padding:1rem;
        z-index:9999;
        font-family:system-ui;
      ">
        <p style="max-width:800px;margin:0 auto 1rem;">
          We use cookies only for anonymous analytics to improve MyWebClass.org.
          You can accept or reject analytics cookies.
        </p>
        <div style="text-align:center;">
          <button id="acceptCookies">Accept</button>
          <button id="rejectCookies">Reject</button>
        </div>
      </div>
    `;
    document.body.appendChild(banner);

    document.getElementById("acceptCookies").onclick = () =>
      setConsent({ analytics: true });

    document.getElementById("rejectCookies").onclick = () =>
      setConsent({ analytics: false });
  }

  if (!getConsent()) {
    document.addEventListener("DOMContentLoaded", createBanner);
  }

  window.myWebClassHasAnalyticsConsent = hasConsent;
})();
