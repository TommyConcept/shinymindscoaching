(function () {
  var ID = "G-M0JJ4X9EP7";
  var KEY = "sm_consent_v1";
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    wait_for_update: 500
  });

  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}
  if (stored === "granted") {
    gtag("consent", "update", { analytics_storage: "granted" });
  }

  gtag("js", new Date());
  gtag("config", ID, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });

  function track(name, params) { gtag("event", name, params || {}); }

  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    if (!a) return;
    var href = a.getAttribute("href") || "";
    if (href.indexOf("calendly.com") !== -1) {
      track("book_chat_click", {
        link_url: a.href,
        link_text: (a.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80),
        page_location: location.pathname
      });
    } else if (href.indexOf("instagram.com") !== -1) {
      track("instagram_click", { link_url: a.href });
    }
  }, true);

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  ready(function () {
    var banner = document.getElementById("sm-cookie");
    if (!banner) return;

    function hide() { banner.setAttribute("hidden", ""); }
    function set(value) {
      try { localStorage.setItem(KEY, value); } catch (e) {}
      if (value === "granted") {
        gtag("consent", "update", { analytics_storage: "granted" });
        track("consent_granted");
      } else {
        gtag("consent", "update", { analytics_storage: "denied" });
        track("consent_denied");
      }
      hide();
    }

    if (stored) { hide(); } else { banner.removeAttribute("hidden"); }

    var yes = banner.querySelector("[data-consent='yes']");
    var no = banner.querySelector("[data-consent='no']");
    if (yes) yes.addEventListener("click", function () { set("granted"); });
    if (no) no.addEventListener("click", function () { set("denied"); });
  });
})();
