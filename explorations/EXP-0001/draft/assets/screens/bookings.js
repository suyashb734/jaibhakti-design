/* Bookings screen designs. Shared helpers come from components.js; samples from fixtures.js. */
(() => {
  "use strict";
  const {
    plans,
    occurrences,
    upcoming,
    completed,
    state,
    icon,
    button,
    action,
    notice,
    planCard,
    occurrenceCard,
    page,
    tabs,
  } = window.JBDesign;

  function bookings(category = "nirantar", special = "") {
    let content = "";
    if (special === "empty") {
      const empties = {
        nirantar: [
          "Your Nirantar journey starts here",
          "You do not have an active Nirantar Daan Seva yet.",
          "Explore Nirantar Sevas",
        ],
        upcoming: [
          "No upcoming sevas",
          "No Daan Sevas are currently scheduled.",
          "Explore Sevas",
        ],
        completed: [
          "Your seva memories will be here",
          "Your completed Daan Sevas will appear here with certificates and videos.",
          "",
        ],
      };
      const [title, copy, cta] = empties[category];
      content = `<div class="empty-state"><div class="empty-icon">${icon(category === "completed" ? "certificate" : "temple")}</div><h2>${title}</h2><p>${copy}</p>${cta ? button(cta, "home") : ""}</div>`;
    } else if (special === "loading") {
      content = `<p class="loading-label" role="status">Loading your Nirantar Sevas…</p><div aria-hidden="true">${[1, 2].map(() => '<div class="card"><div class="skeleton big"></div><div class="skeleton wide"></div><div class="skeleton half"></div><div class="skeleton wide"></div><div class="skeleton wide spaced"></div><div class="skeleton half"></div><div class="skeleton wide"></div></div>').join("")}</div>`;
    } else if (special === "error") {
      content = `<div class="empty-state"><div class="empty-icon">${icon("alert")}</div><h2>We couldn’t load your bookings</h2><p>Your bookings are safe. Check your connection and try again.</p>${button("Try Again", `bookings/${category}`)}</div>`;
    } else if (category === "nirantar") {
      const all = Object.values(plans),
        ended = (p) => ["Cancelled", "Inactive", "Payment retrying"].includes(p.status),
        ongoing = [
          ...all.filter((p) => !ended(p)).map((p) => ({ date: p.next, html: planCard(p) })),
          ...upcoming.filter((o) => !o.parent).map((o) => ({ date: o.date, html: occurrenceCard(o) })),
        ].sort((a, b) => (a.date || "9999").localeCompare(b.date || "9999")),
        cancelled = all.filter((p) => p.status === "Cancelled"),
        failed = all.filter((p) => ["Inactive", "Payment retrying"].includes(p.status)),
        group = (title, copy, items) =>
          items.length
            ? `<h3 class="group-title">${title} · ${items.length}</h3><p class="group-note">${copy}</p>${items.map(planCard).join("")}`
            : "";
      content = `<p class="list-intro"><strong>${ongoing.length} ongoing sevas</strong> · Your Daan Seva continues until you cancel AutoPay in your UPI app.</p>${cancelled.length + failed.length ? `<a class="notice red attention-link" href="#bookings/nirantar" data-scroll="inactive-sevas">${icon("alert")}<div><strong>${cancelled.length + failed.length} ${cancelled.length + failed.length === 1 ? "seva needs" : "sevas need"} attention</strong><p>View Inactive Sevas</p></div>${icon("arrow")}</a>` : ""}${ongoing.map((x) => x.html).join("")}${cancelled.length || failed.length ? `<section id="inactive-sevas" class="inactive-zone"><div class="section-title"><h2>Inactive Sevas</h2></div>${group("AutoPay cancelled", "You cancelled AutoPay in your UPI app.", cancelled)}${group("AutoPay payment failed", "AutoPay payment could not be completed.", failed)}</section>` : ""}`;
    } else if (category === "upcoming") {
      content = `<p class="list-intro"><strong>2 upcoming sevas</strong> · Nearest date first. Only registered or scheduled sevas appear here.</p>${upcoming.map(occurrenceCard).join("")}`;
    } else {
      const shown = completed.slice(0, state.completedLimit);
      content = `${shown.map(occurrenceCard).join("")}${state.completedLimit < completed.length ? action("Load Older Sevas", "older", "secondary") : ""}<p class="list-end">Showing ${shown.length} of ${completed.length} performed sevas</p>`;
    }
    return `<div class="screen"><header><a href="#home" class="circle-button" aria-label="Back to Home">${icon("back")}</a><h1 tabindex="-1">My Bookings</h1></header>${tabs(category)}<div class="body fill" role="tabpanel" id="booking-panel" aria-labelledby="tab-${category}">${content}</div></div>`;
  }
  function sections() {
    return page(
      "My Bookings",
      `<p class="list-intro">Your ongoing sevas, upcoming dates and completed memories.</p><div class="section-summary"><div><strong>3</strong>Nirantar</div><div><strong>2</strong>Upcoming</div><div><strong>8</strong>Completed</div></div>${notice("1 seva needs payment attention", '<a href="#plan/N3">Meera Sharma · View payment details</a>', "red", "alert")}<div class="section-title"><h2>Nirantar Sevas</h2><a href="#bookings/nirantar">View all 3</a></div>${planCard(plans.N1)}<div class="section-title"><h2>Upcoming Sevas</h2><a href="#bookings/upcoming">View all 2</a></div>${occurrenceCard(occurrences.U1)}<div class="section-title"><h2>Completed Sevas</h2><a href="#bookings/completed">View all 8</a></div>${occurrenceCard(occurrences.C2)}`,
      { back: "home" },
    );
  }

  Object.assign(window.JBDesign, {
    bookings,
    sections,
  });
})();