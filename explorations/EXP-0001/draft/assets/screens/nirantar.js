/* Nirantar screen designs. Shared helpers come from components.js; samples from fixtures.js. */
(() => {
  "use strict";
  const {
    getPlan,
    plans,
    historyItems,
    notice,
    formatted,
    row,
    page,
    badge,
    paymentBadge,
    identity,
    beneficiary,
    icon,
    esc,
    progress,
    date,
    button,
    historyRow,
    support,
  } = window.JBDesign;

  function planDetail(id) {
    const p = getPlan(id),
      isEnded = ["Inactive", "Cancelled"].includes(p.status),
      historyOwner = plans[id] ? id : p.base || "N1",
      hist = historyItems(historyOwner);
    let statusNotice = "";
    if (p.status === "Payment retrying")
      statusNotice = notice(
        "Your payment is being retried",
        `The seva on 10 November was discontinued because payment was unsuccessful. We will retry until <b>${formatted(p.retryEnd)}</b> for the next eligible seva.`,
        "red",
        "alert",
      );
    if (p.status === "Inactive")
      statusNotice = notice(
        "This Nirantar Daan Seva is inactive",
        "Payment could not be completed within the retry window. Restart to continue with a new UPI AutoPay mandate.",
        "red",
        "alert",
      );
    if (p.status === "Cancelled")
      statusNotice = notice(
        "AutoPay cancelled",
        "AutoPay was cancelled in your UPI app. Your past seva records and evidence remain available.",
        "neutral",
        "info",
      );
    if (p.sync)
      statusNotice += notice(
        "Updating your AutoPay status",
        "Showing the last confirmed status while we check for an update.",
        "neutral",
        "repeat",
      );
    if (p.retrySuccess)
      statusNotice = notice(
        "Payment received for the next eligible seva",
        "You are registered for 17 November. The missed seva on 10 November remains discontinued.",
        "green",
        "check",
      );
    return page(
      "Nirantar Daan Seva",
      `<section class="detail-hero"><div class="type-row">${badge(p.cadence, "brown")}${paymentBadge(p)}</div>${identity(p, { large: true })}${beneficiary(p)}<p class="schedule">${icon("repeat")}${esc(p.schedule)}</p>${p.milestone ? notice("7 week Daan Seva completed", "You are continuing toward the recommended 14 week Daan Seva.", "green", "spark") : ""}${progress(p)}<p class="micro muted">Your Nirantar Daan Seva continues until you cancel AutoPay in your UPI app. Milestones are recommendations.</p><div class="data-rows">${row("Next seva", p.next ? date(p.next) : "No upcoming seva registered", p.next && !isEnded ? p.registration : "")}</div>${!isEnded && p.next ? `<p class="micro muted">${p.registration === "Awaiting payment" ? "This date will appear in Upcoming after payment and registration are confirmed." : "This is a dated seva with its own tracking and evidence."}</p>${p.id === "N2" ? button("Track Seva Details", "occurrence/U1", "", "arrow") : p.retrySuccess ? button("Track Seva Details", "occurrence/retry-success", "", "arrow") : ""}` : ""}<p class="ref">Booking reference ${esc(p.ref)}</p></section>${statusNotice}<section class="detail-section"><div class="section-title"><h2>Seva history</h2>${!p.editable ? `<a href="#history/${historyOwner}">View all</a>` : ""}</div>${p.editable ? `<div class="card"><p class="small muted">Your performed sevas will appear here.</p></div>` : `<div class="card history-list">${hist.slice(0, 3).map(historyRow).join("")}</div>`}</section>${isEnded ? `<section class="detail-section">${button(p.status === "Inactive" ? "Restart Nirantar Seva" : "Book This Seva Again", "details", "", "repeat")}</section>` : ""}<section class="detail-section"><h2>Beneficiary details</h2><div class="card"><div class="edit-row"><div><p class="value">For ${esc(p.beneficiary)}</p><p class="small muted">${esc(p.gotra)} gotra</p></div>${p.editable ? icon("edit") : `<span class="lock">${icon("lock")}Locked</span>`}</div><p class="micro muted spaced">${p.editable ? "You can update these details before your first seva is performed." : "The first seva has been performed. Contact support to request a change for future sevas."}</p>${button(p.editable ? "Edit Beneficiary" : "Request a Change", p.editable ? `beneficiary/edit/${p.id}` : `beneficiary/locked/${historyOwner}`, "secondary")}</div></section>${support(p.ref)}`,
      { back: "bookings/nirantar" },
    );
  }
  function historyPage(id) {
    const p = getPlan(id === "older" ? "N1" : id),
      items = historyItems(id === "older" ? "N1" : id);
    return page(
      "Seva History",
      `<p class="eyebrow">Nirantar Daan Seva · ${esc(p.schedule)}</p><h2 class="subheading spaced">For ${esc(p.beneficiary)}</h2><p class="subtext">${esc(p.gotra)} gotra · ${esc(p.ref)}</p><p class="list-intro">Each date keeps its own bill, certificate and videos. Discontinued dates remain in your history.</p><div class="card history-list">${items.map(historyRow).join("")}</div>`,
      { back: `plan/${p.id}` },
    );
  }

  Object.assign(window.JBDesign, {
    planDetail,
    historyPage,
  });
})();