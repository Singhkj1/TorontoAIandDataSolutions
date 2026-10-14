/* Toronto AI and Data Solutions — site behaviour. No dependencies. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Header: add a border once the page has scrolled ----------------------- */
  var header = document.querySelector("[data-header]");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Mobile navigation ------------------------------------------------------ */
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
    };

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });

    window.matchMedia("(min-width: 861px)").addEventListener("change", function (mq) {
      if (mq.matches) setOpen(false);
    });
  }

  /* Reveal-on-scroll ------------------------------------------------------- */
  var revealItems = document.querySelectorAll(".reveal");
  if (revealItems.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach(function (el) {
        el.classList.add("is-visible");
      });
    } else {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      revealItems.forEach(function (el) {
        revealObserver.observe(el);
      });
    }
  }

  /* Pause the hero diagram's SMIL animation for reduced-motion users ------ */
  if (reduceMotion) {
    document.querySelectorAll("svg[data-animated]").forEach(function (svg) {
      if (typeof svg.pauseAnimations === "function") svg.pauseAnimations();
    });
  }

  /* Services page: highlight the section in view -------------------------- */
  var subnavLinks = document.querySelectorAll("[data-subnav] a[href^='#']");
  if (subnavLinks.length && "IntersectionObserver" in window) {
    var linkFor = {};
    subnavLinks.forEach(function (link) {
      linkFor[link.getAttribute("href").slice(1)] = link;
    });

    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          subnavLinks.forEach(function (link) {
            link.classList.remove("is-active");
            link.removeAttribute("aria-current");
          });
          var active = linkFor[entry.target.id];
          if (active) {
            active.classList.add("is-active");
            active.setAttribute("aria-current", "true");
            // Keep the active tab visible in the horizontally scrolling bar
            // (scrollIntoView would also scroll the page).
            var list = active.closest("ul");
            if (list && list.scrollWidth > list.clientWidth) {
              list.scrollTo({ left: active.offsetLeft - 16, behavior: reduceMotion ? "auto" : "smooth" });
            }
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    Object.keys(linkFor).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) spy.observe(section);
    });
  }

  /* Contact form ----------------------------------------------------------- */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    var status = form.querySelector("[data-form-status]");
    var submit = form.querySelector("button[type='submit']");
    var submitLabel = submit ? submit.innerHTML : "";

    // Pre-select a service when arriving from a service page (?service=analytics).
    var requested = new URLSearchParams(window.location.search).get("service");
    if (requested) {
      var match = form.querySelector("input[name='services'][data-key='" + CSS.escape(requested) + "']");
      if (match) match.checked = true;
    }

    var showStatus = function (type, message) {
      status.className = "form-status is-visible is-" + type;
      status.textContent = message;
    };

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (form.action.indexOf("YOUR_FORM_ID") !== -1) {
        showStatus(
          "error",
          "This form isn't connected yet. Add your Formspree form ID in contact.html (see README), or email us directly."
        );
        return;
      }

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      submit.disabled = true;
      submit.textContent = "Sending…";

      // Send multiple selected services as one readable line.
      var data = new FormData(form);
      var services = data.getAll("services");
      data.delete("services");
      if (services.length) data.append("services", services.join(", "));

      fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          if (!response.ok) throw new Error("Request failed: " + response.status);
          form.reset();
          showStatus(
            "success",
            "Thanks — your message is on its way. We'll be in touch within one business day."
          );
        })
        .catch(function () {
          showStatus(
            "error",
            "Something went wrong sending your message. Please try again, or email us directly."
          );
        })
        .then(function () {
          submit.disabled = false;
          submit.innerHTML = submitLabel;
        });
    });
  }

  /* Footer year ------------------------------------------------------------ */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
