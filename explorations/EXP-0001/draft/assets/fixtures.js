/* Sample design data and derived scenario variants; no service or persistence. */
(() => {
  "use strict";
  /* Real sevas as listed on jaibhakti.com (captured 13 Nov 2026 in references/live-web). */
  const RAHU = {
    name: "Rahu Gochar Vishesh: Rahu Dosh Shanti & Sarva Badha Mukti Weekly Daan Seva",
    items: "Neel Vastra and Til Daan Seva",
    temple: "Rahu Paithani, Uttarakhand",
  };
  const GAJ = {
    name: "Shri Gaj Mahalakshmi Ujjain (2000 Year old Temple) Shukravar Special Weekly Daan Seva",
    items: "Lal Chunri Kumkum Daan Seva",
    temple: "Shri Gaj Mahalakshmi (2000 Year old Temple), Ujjain (MP)",
  };
  const TRI = {
    name: "Kartik Somvar Vishesh: Triyuginarayan Mandir Shiv-Parvati Atoot Bandhan Somvar Daan Seva",
    items: "Lal Chunri, Mauli, Ganga Jal and Akhand Dhuni Ahuti Daan Seva",
    temple: "Triyuginarayan Temple, Uttarakhand",
  };
  const SHANI = {
    name: "Shanivar Shani Dev Tel Abhishek Seva",
    items: "Shani Dev Tel Abhishek",
    temple: "Shri Shanaishwar Devasthan, Shingnapur (Maharashtra)",
  };
  const NAME = RAHU.name;
  const TEMPLE = RAHU.temple;
  const plans = {
    N1: {
      id: "N1",
      ref: "JB-N1042",
      name: RAHU.name,
      temple: RAHU.temple,
      items: RAHU.items,
      beneficiary: "Rohit Sharma",
      gotra: "Kashyap",
      cadence: "Weekly",
      schedule: "Every Saturday",
      completed: 4,
      target: 7,
      unit: "weeks",
      status: "Active",
      next: "2026-11-14",
      registration: "Awaiting payment",
      chargeDate: "2026-11-13",
      charge: 121,
      regular: 121,
    },
    N2: {
      id: "N2",
      ref: "JB-N1043",
      name: GAJ.name,
      temple: GAJ.temple,
      items: GAJ.items,
      beneficiary: "Aarav Sharma",
      gotra: "Bharadwaj",
      cadence: "Weekly",
      schedule: "Every Friday",
      completed: 3,
      target: 7,
      unit: "weeks",
      status: "Active",
      next: "2026-11-13",
      registration: "Scheduled",
      chargeDate: "2026-11-19",
      charge: 101,
      regular: 101,
    },
    N3: {
      id: "N3",
      ref: "JB-N1044",
      name: TRI.name,
      temple: TRI.temple,
      items: TRI.items,
      beneficiary: "Meera Sharma",
      gotra: "Kashyap",
      cadence: "Weekly",
      schedule: "Every Monday",
      completed: 3,
      target: 7,
      unit: "weeks",
      status: "Payment retrying",
      next: "2026-11-16",
      registration: "Awaiting payment",
      retryEnd: "2026-11-20",
      charge: 151,
      regular: 151,
    },
    N4: {
      id: "N4",
      ref: "JB-N1047",
      name: GAJ.name,
      temple: GAJ.temple,
      items: GAJ.items,
      beneficiary: "Anjali Sharma",
      gotra: "Vashishtha",
      cadence: "Weekly",
      schedule: "Every Friday",
      completed: 3,
      target: 7,
      unit: "weeks",
      status: "Cancelled",
      next: null,
      charge: 101,
      regular: 101,
    },
  };
  const occurrences = {
    U1: {
      id: "U1",
      ref: "JB-S2041",
      parent: "N2",
      name: plans.N2.name,
      temple: plans.N2.temple,
      beneficiary: "Aarav Sharma",
      gotra: "Bharadwaj",
      date: "2026-11-13",
      booked: "2026-11-12",
      status: "Scheduled",
      offering: GAJ.items,
      amount: 101,
      certificate: "Preparing",
      videos: 0,
    },
    U2: {
      id: "U2",
      ref: "JB-S2042",
      name: SHANI.name,
      temple: SHANI.temple,
      beneficiary: "Kavita Sharma",
      gotra: "Vashishtha",
      date: "2026-11-14",
      booked: "2026-11-11",
      status: "Scheduled",
      offering: SHANI.items,
      amount: 71,
      certificate: "Preparing",
      videos: 0,
    },
    C1: {
      id: "C1",
      ref: "JB-S2038",
      parent: "N1",
      name: RAHU.name,
      temple: RAHU.temple,
      beneficiary: "Rohit Sharma",
      gotra: "Kashyap",
      date: "2026-11-07",
      booked: "2026-11-06",
      status: "Performed",
      offering: RAHU.items,
      amount: 121,
      certificate: "Ready",
      videos: 2,
    },
    C2: {
      id: "C2",
      ref: "JB-S2040",
      name: SHANI.name,
      temple: SHANI.temple,
      beneficiary: "Kavita Sharma",
      gotra: "Vashishtha",
      date: "2026-11-07",
      booked: "2026-11-06",
      status: "Performed",
      offering: SHANI.items,
      amount: 71,
      certificate: "Preparing",
      videos: 0,
    },
    C3: {
      id: "C3",
      ref: "JB-S2028",
      parent: "N1",
      name: RAHU.name,
      temple: RAHU.temple,
      beneficiary: "Rohit Sharma",
      gotra: "Kashyap",
      date: "2026-10-24",
      booked: "2026-10-23",
      status: "Performed",
      offering: RAHU.items,
      amount: 121,
      certificate: "Ready",
      videos: 2,
    },
    C4: {
      id: "C4",
      ref: "JB-S2021",
      parent: "N1",
      name: RAHU.name,
      temple: RAHU.temple,
      beneficiary: "Rohit Sharma",
      gotra: "Kashyap",
      date: "2026-10-17",
      booked: "2026-10-16",
      status: "Performed",
      offering: RAHU.items,
      amount: 51,
      intro: true,
      certificate: "Ready",
      videos: 1,
    },
    C5: {
      id: "C5",
      ref: "JB-S2032",
      parent: "N1",
      name: RAHU.name,
      temple: RAHU.temple,
      beneficiary: "Rohit Sharma",
      gotra: "Kashyap",
      date: "2026-10-31",
      booked: "2026-10-30",
      status: "Performed",
      offering: RAHU.items,
      amount: 121,
      certificate: "Ready",
      videos: 2,
    },
    F1: {
      id: "F1",
      ref: "JB-S2035",
      parent: "N2",
      name: plans.N2.name,
      temple: plans.N2.temple,
      beneficiary: "Aarav Sharma",
      gotra: "Bharadwaj",
      date: "2026-11-06",
      booked: "2026-11-05",
      status: "Performed",
      offering: GAJ.items,
      amount: 101,
      certificate: "Ready",
      videos: 1,
    },
    F2: {
      id: "F2",
      ref: "JB-S2030",
      parent: "N2",
      name: plans.N2.name,
      temple: plans.N2.temple,
      beneficiary: "Aarav Sharma",
      gotra: "Bharadwaj",
      date: "2026-10-30",
      booked: "2026-10-29",
      status: "Performed",
      offering: GAJ.items,
      amount: 101,
      certificate: "Ready",
      videos: 2,
    },
    F3: {
      id: "F3",
      ref: "JB-S2024",
      parent: "N2",
      name: plans.N2.name,
      temple: plans.N2.temple,
      beneficiary: "Aarav Sharma",
      gotra: "Bharadwaj",
      date: "2026-10-23",
      booked: "2026-10-22",
      status: "Performed",
      offering: GAJ.items,
      amount: 51,
      intro: true,
      certificate: "Ready",
      videos: 1,
    },
    D1: {
      id: "D1",
      ref: "JB-S2039",
      parent: "N3",
      name: TRI.name,
      temple: TRI.temple,
      beneficiary: "Meera Sharma",
      gotra: "Kashyap",
      date: "2026-11-09",
      status: "Discontinued",
      offering: TRI.items,
      amount: 0,
      certificate: null,
      videos: 0,
    },
  };
  const completed = Object.values(occurrences)
    .filter((o) => o.status === "Performed")
    .sort((a, b) => b.date.localeCompare(a.date));
  const upcoming = [occurrences.U1, occurrences.U2];
  const state = {
    completedLimit: 3,
    selectedVideo: 1,
    rating: {},
    form: { name: "", gotra: "", phone: "" },
    otpSent: false,
    verified: false,
    otpError: "",
    edit: { name: "Aarav Sharma", gotra: "Bharadwaj" },
    formErrors: {},
  };
  function getPlan(id) {
    if (plans[id]) return plans[id];
    if (id === "checkout") {
      const p = checkoutIdentity();
      return {
        ...plans.N2,
        ...p,
        id: "checkout",
        ref: "JB-N1046",
        completed: 0,
        registration: "Registered",
        editable: true,
      };
    }
    if (id === "new")
      return {
        ...plans.N1,
        id: "new",
        ref: "JB-N1045",
        beneficiary: state.edit.name,
        gotra: state.edit.gotra,
        completed: 0,
        charge: 51,
        editable: true,
      };
    if (id === "milestone")
      return {
        ...plans.N1,
        id,
        base: "milestone",
        completed: 7,
        target: 14,
        milestone: true,
      };
    if (id === "inactive" || id === "cancelled")
      return {
        ...plans.N3,
        id,
        base: "N3",
        status: id === "inactive" ? "Inactive" : "Cancelled",
        next: null,
        chargeDate: null,
      };
    if (id === "sync")
      return {
        ...plans.N3,
        id,
        base: "N3",
        status: "Cancelled",
        next: null,
        sync: true,
      };
    if (id === "retry-success")
      return {
        ...plans.N3,
        id,
        base: "retry-success",
        status: "Active",
        registration: "Registered",
        retrySuccess: true,
        chargeDate: "2026-11-23",
      };
    return plans.N1;
  }
  function historyItems(id) {
    if (id === "milestone")
      return [
        ...historyItems("N1").map((o) => ({
          ...o,
          id: "LM-" + o.id,
          parent: "milestone",
          amount: 121,
          intro: false,
        })),
        ...["2026-10-10", "2026-10-03", "2026-09-26"].map((d, i) => ({
          ...occurrences.C4,
          id: "LM-X" + i,
          parent: "milestone",
          ref: "JB-S" + (2018 - i),
          date: d,
          booked: d,
          amount: i === 2 ? 51 : 121,
          intro: i === 2,
        })),
      ].sort((a, b) => b.date.localeCompare(a.date));
    if (id === "retry-success")
      return [getOccurrence("retry-success"), ...historyItems("N3")];
    if (id === "N4")
      return ["2026-10-30", "2026-10-23", "2026-10-16"].map((d, i) => ({
        ...occurrences.C5,
        id: `A${i}`,
        ref: `JB-A${i + 2050}`,
        parent: "N4",
        name: plans.N4.name,
        temple: plans.N4.temple,
        beneficiary: "Anjali Sharma",
        gotra: "Vashishtha",
        date: d,
        booked: d,
        offering: GAJ.items,
        amount: i === 2 ? 51 : 101,
        intro: i === 2,
      }));
    if (id === "N3")
      return [
        occurrences.D1,
        ...["2026-11-02", "2026-10-26", "2026-10-19"].map((d, i) => ({
          ...occurrences.C5,
          id: `M${i}`,
          ref: `JB-M${i + 2020}`,
          parent: "N3",
          name: TRI.name,
          temple: TRI.temple,
          offering: TRI.items,
          beneficiary: "Meera Sharma",
          gotra: "Kashyap",
          date: d,
          amount: i === 2 ? 51 : 151,
          intro: i === 2,
        })),
      ];
    return Object.values(occurrences)
      .filter((o) => o.parent === (id === "N2" ? "N2" : "N1"))
      .sort((a, b) => b.date.localeCompare(a.date));
  }
  function getOccurrence(id) {
    if (occurrences[id]) return occurrences[id];
    if (id.startsWith("LM-"))
      return (
        historyItems("milestone").find((o) => o.id === id) || occurrences.C1
      );
    if (/^M\d$/.test(id)) return historyItems("N3").find((o) => o.id === id);
    if (/^A\d$/.test(id)) return historyItems("N4").find((o) => o.id === id);
    if (id === "checkout") {
      const p = checkoutIdentity();
      return {
        ...occurrences.U1,
        ...p,
        id: "checkout",
        ref: "JB-S2043",
        parent: "checkout",
        amount: 51,
        intro: true,
        status: "Registered",
      };
    }
    if (id === "landscape")
      return { ...occurrences.C1, id, orient: "landscape" };
    if (id === "registered")
      return { ...occurrences.U1, id, status: "Registered" };
    if (id === "retry-success")
      return {
        ...occurrences.U1,
        id,
        parent: "retry-success",
        beneficiary: "Meera Sharma",
        gotra: "Kashyap",
        name: TRI.name,
        temple: TRI.temple,
        offering: TRI.items,
        date: "2026-11-16",
        status: "Registered",
      };
    if (id === "partial-certificate")
      return { ...occurrences.C2, id, certificate: "Ready" };
    if (id === "partial-video") return { ...occurrences.C2, id, videos: 2 };
    if (id === "overdue")
      return { ...occurrences.C1, id, videos: 0, overdue: true };
    if (id === "mixed")
      return { ...occurrences.C1, id, videos: 1, mixed: true };
    if (id === "error") return { ...occurrences.C1, id, videoError: true };
    return occurrences.C1;
  }
  function checkoutIdentity() {
    return {
      name: GAJ.name,
      temple: GAJ.temple,
      items: GAJ.items,
      beneficiary: state.form.name || "Aarav Sharma",
      gotra: state.form.gotra || "Bharadwaj",
    };
  }

  window.JBDesign = { NAME, TEMPLE, plans, occurrences, completed, upcoming, state, getPlan, historyItems, getOccurrence, checkoutIdentity };
})();