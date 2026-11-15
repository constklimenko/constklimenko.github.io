(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- mobile nav ---------- */

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");

  function setNav(open) {
    if (!toggle || !nav) return;
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setNav(false);
    });

    var brand = document.querySelector(".brand");
    if (brand) {
      brand.addEventListener("click", function () { setNav(false); });
    }

    document.addEventListener("click", function (event) {
      if (!event.target.closest(".topbar")) setNav(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setNav(false);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) setNav(false);
    });
  }

  /* ---------- reveal on scroll ---------- */

  var revealItems = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));

  revealItems.forEach(function (el) {
    var siblings = Array.prototype.filter.call(el.parentElement.children, function (child) {
      return child.hasAttribute("data-reveal");
    });
    var index = siblings.indexOf(el);
    el.style.transitionDelay = Math.min(index, 5) * 55 + "ms";
  });

  if (!("IntersectionObserver" in window) || reduceMotion) {
    revealItems.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });

    revealItems.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- count up ---------- */

  var counters = Array.prototype.slice.call(document.querySelectorAll("[data-count]"));
  var numberFormat = new Intl.NumberFormat("ru-RU");

  function animateCount(el) {
    var target = Number(el.getAttribute("data-count"));
    if (!isFinite(target)) return;
    if (reduceMotion) return;

    var duration = 900;
    var start = null;

    function frame(now) {
      if (start === null) start = now;
      var progress = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = numberFormat.format(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(frame);
    }

    el.textContent = "0";
    requestAnimationFrame(frame);
  }

  if (counters.length && "IntersectionObserver" in window && !reduceMotion) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      });
    }, { threshold: 0.6 });

    counters.forEach(function (el) { countObserver.observe(el); });
  }

  /* ---------- active section in nav ---------- */

  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav a"));
  var linkById = {};

  navLinks.forEach(function (link) {
    var id = link.getAttribute("href").slice(1);
    if (id) linkById[id] = link;
  });

  var sections = Object.keys(linkById)
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  function updateActiveNav() {
    var probe = window.innerHeight * 0.35;
    var active = null;

    sections.forEach(function (section) {
      var rect = section.getBoundingClientRect();
      if (rect.top <= probe && rect.bottom > probe) active = section;
    });

    navLinks.forEach(function (link) { link.removeAttribute("aria-current"); });
    if (active && linkById[active.id]) {
      linkById[active.id].setAttribute("aria-current", "true");
    }
  }

  if (sections.length) {
    var navTick = false;

    window.addEventListener("scroll", function () {
      if (navTick) return;
      navTick = true;
      requestAnimationFrame(function () {
        updateActiveNav();
        navTick = false;
      });
    }, { passive: true });

    window.addEventListener("resize", updateActiveNav);
    updateActiveNav();
  }

  /* ---------- case filters ---------- */

  var filterButtons = Array.prototype.slice.call(document.querySelectorAll(".filters button"));
  var cases = Array.prototype.slice.call(document.querySelectorAll(".case"));

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var filter = button.getAttribute("data-filter");

      filterButtons.forEach(function (other) {
        other.setAttribute("aria-pressed", String(other === button));
      });

      cases.forEach(function (card) {
        var tags = (card.getAttribute("data-tags") || "").split(/\s+/);
        var visible = filter === "all" || tags.indexOf(filter) !== -1;
        card.hidden = !visible;
      });
    });
  });

  /* ---------- certificate lightbox ---------- */

  var dialog = document.getElementById("cert-dialog");
  var dialogImage = document.getElementById("cert-dialog-img");
  var dialogCaption = document.getElementById("cert-dialog-caption");
  var dialogClose = dialog ? dialog.querySelector(".lightbox__close") : null;

  if (dialog && dialogImage && dialogCaption && typeof dialog.showModal === "function") {
    document.querySelectorAll(".cert").forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        var caption = link.getAttribute("data-caption") || "";
        dialogImage.src = link.getAttribute("data-cert");
        dialogImage.alt = caption;
        dialogCaption.textContent = caption;
        dialog.showModal();
      });
    });

    if (dialogClose) {
      dialogClose.addEventListener("click", function () { dialog.close(); });
    }

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });

    dialog.addEventListener("close", function () {
      dialogImage.src = "";
    });
  }
})();
