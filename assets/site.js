/* ============================================================
   Child Care Professionals of BC — site behaviour
   No dependencies. Safe to load with `defer`.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close" : "Menu";
    });
  }

  /* ---------- Newsletter sign-up ----------
     The form posts to Formspree. This script submits it in the background
     so the visitor stays on the page and sees the result inline, rather
     than being bounced to Formspree's own thank-you screen.

     If JavaScript fails to load, the form still works — the browser posts
     it normally and Formspree shows its own confirmation page. Nothing
     here is required for the form to function.

     If the Formspree form ID has not been filled in yet, the script falls
     back to opening the visitor's email client instead, so the page is
     never dead.
  -------------------------------------------- */

  var form = document.getElementById("newsletter-form");
  if (!form) return;

  var status = document.getElementById("form-status");
  var submit = form.querySelector('button[type="submit"]');
  var INBOX = "CCPofBC@gmail.com";

  function show(message) {
    if (!status) return;
    status.textContent = message;
    status.hidden = false;
    status.setAttribute("tabindex", "-1");
    status.focus();
  }

  function busy(on) {
    if (!submit) return;
    submit.disabled = on;
    submit.textContent = on ? "Sending…" : "Sign me up";
  }

  function configured() {
    var action = form.getAttribute("action") || "";
    return action.indexOf("formspree.io") !== -1 &&
           action.indexOf("YOUR_FORM_ID") === -1;
  }

  /* Fallback used before Formspree is set up, or if the network fails. */
  function mailtoFallback(data, note) {
    var lines = [
      "Please add me to the Child Care Professionals of BC newsletter.",
      "",
      "Name: " + (data.get("name") || ""),
      "Email: " + (data.get("email") || ""),
      "Role: " + (data.get("role") || "Not given"),
      "Region: " + ((data.get("region") || "").trim() || "Not given"),
      "Organization: " + ((data.get("organization") || "").trim() || "Not given"),
      "",
      "I consent to receiving email from CCPofBC and understand I can",
      "unsubscribe at any time."
    ];
    window.location.href =
      "mailto:" + INBOX +
      "?subject=" + encodeURIComponent("Newsletter sign-up — " + (data.get("name") || "")) +
      "&body=" + encodeURIComponent(lines.join("\n"));
    show(note);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Formspree's honeypot. Real people never fill this in.
    var trap = form.querySelector('[name="_gotcha"]');
    if (trap && trap.value !== "") return;

    var data = new FormData(form);
    var name = (data.get("name") || "").trim();
    var email = (data.get("email") || "").trim();
    var consent = form.querySelector('[name="consent"]');

    if (!name || !email) {
      show("Add your name and email address, then send again.");
      return;
    }
    if (consent && !consent.checked) {
      show("Tick the consent box so we know it's alright to email you.");
      return;
    }

    if (!configured()) {
      mailtoFallback(
        data,
        "Your email app is opening with the message ready to send. Press send " +
        "and you're on the list. If nothing opened, email " + INBOX +
        " and we'll add you by hand."
      );
      return;
    }

    busy(true);

    fetch(form.getAttribute("action"), {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" }
    })
      .then(function (response) {
        busy(false);
        if (response.ok) {
          form.reset();
          show("You're on the list. Thanks — we'll be in touch.");
          return;
        }
        return response.json().then(function (body) {
          var detail = body && body.errors && body.errors.length
            ? body.errors.map(function (e) { return e.message; }).join(" ")
            : "";
          show(
            "That didn't go through. " + detail +
            " You can also email " + INBOX + " and we'll add you by hand."
          );
        });
      })
      .catch(function () {
        busy(false);
        mailtoFallback(
          data,
          "We couldn't reach the sign-up service, so your email app is opening " +
          "with the message ready instead. Press send and you're on the list."
        );
      });
  });
})();
