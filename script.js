const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelector("[data-nav-links]");

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 8);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navLinks.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("nav-open", !isOpen);
  });

  navLinks.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLAnchorElement)) return;
    navToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  });
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -40px" }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const caseStudies = {
  mimba: {
    links: [
      ["Open in Figma", "https://www.figma.com/design/SdHv4DPoptVmwilCQqC9G5/MIMBA-Redesign?m=auto&t=3VMGWZZxsRUWzMv9-6"]
    ],
    title: "Mimba Smart Dairy",
    client: "Smart dairy product",
    impact: "Improved operational efficiency by 30% by simplifying inventory, milk production, herd health, and farm management workflows.",
    role: "Product design, UI design, prototyping",
    timeline: "Selected project",
    metric: "+30% operational efficiency",
    overview:
      "Mimba is a smart dairy product where the interface had to support practical farm operations. I designed high-fidelity web and mobile app mockups for inventory tracking, milk production monitoring, herd health dashboards, and farm management.",
    problem:
      "Dairy teams needed fast access to operational information without digging through scattered workflows. The design challenge was to make complex farm data easier to read, monitor, and act on.",
    process: [
      "Mapped the key dairy farm workflows and the information users needed most often.",
      "Designed web and mobile dashboards for inventory, milk production, and herd health.",
      "Collaborated with product and development partners to keep the solution practical and intuitive."
    ],
    solution:
      "The final direction centered on clear dashboard views, high-fidelity interaction patterns, and a simpler product structure for daily farm management. The experience made important operational signals easier to find and use.",
    results: [
      ["+30%", "operational efficiency"],
      ["Web", "farm management app"],
      ["Mobile", "farm management app"]
    ],
    takeaways: [
      "Operational products need dashboards that support real daily decisions.",
      "High-fidelity prototypes help teams align before build work gets expensive.",
      "Good product design turns complex workflows into clear, repeatable actions."
    ]
  },
  sumo: {
    links: [
      ["Open in Figma", "https://www.figma.com/design/eFVkKRA64gOE8355BxIgT2/SUMO--Restaurant-Management-System?m=auto&t=3VMGWZZxsRUWzMv9-6"],
      ["Style guide", "https://www.figma.com/design/XGqCnlhwkibeddAidSZUm7/Sumo---Style-Guide?m=auto&t=3VMGWZZxsRUWzMv9-6"]
    ],
    title: "Sumo Cloud Restaurant Management",
    client: "Restaurant management system",
    impact: "Improved order efficiency by 21% and customer satisfaction by 65% through clearer order, delivery, and POS workflows.",
    role: "UX/UI design, prototyping, stakeholder alignment",
    timeline: "Selected project",
    metric: "+65% customer satisfaction",
    overview:
      "Sumo is a cloud restaurant management system covering order taking, delivery, and POS workflows. I designed and prototyped high-fidelity mockups to improve the experience for restaurant staff and customers.",
    problem:
      "Restaurant operations move quickly, and unclear flows slow down staff while creating friction for customers. The product needed an interface that made daily service work faster and easier to follow.",
    process: [
      "Reviewed the core restaurant workflows across order taking, delivery, and POS.",
      "Created high-fidelity screens that reduced complexity for staff-facing tasks.",
      "Worked with stakeholders to keep the design aligned with business goals and user needs."
    ],
    solution:
      "The design focused on practical workflow clarity: easier order handling, smoother delivery coordination, and a cleaner POS experience. The result was a more usable management product for both staff and customers.",
    results: [
      ["+21%", "order efficiency"],
      ["+65%", "customer satisfaction"],
      ["POS", "optimized workflow"]
    ],
    takeaways: [
      "Service products win when the interface respects real operating speed.",
      "Customer satisfaction can improve when staff workflows become easier too.",
      "Stakeholder alignment matters most when a product touches several roles."
    ]
  },
  amex: {
    title: "Amex Member Verification",
    client: "American Express \u2014 unofficial concept",
    impact:
      "A redesign of the member verification flow. National ID, a live photo and an NFC chip read, rebuilt so people always know which step they are on, what the camera wants, and why the data is needed.",
    role: "Product designer \u2014 audit, UX, UI, prototype-ready screens",
    timeline: "Design task",
    metric: "21 screens \u2192 3 steps",
    note:
      "Unofficial concept for a design task. Not affiliated with, endorsed by, or commissioned by American Express. Brand assets belong to their owner.",
    overview:
      "The brief was to streamline a member verification process that submits a National ID, a personal photo and an NFC-based chip read. I audited the existing 21 screens, mapped the three verification paths through them, and rebuilt the journey as three visible steps on iOS.",
    problem:
      "People do not abandon verification because it is hard. They abandon it because they cannot tell how long it will take. The original flow gave no sense of position, the camera asked for documents without explaining what a good capture looked like, and nothing said why any of the data was needed.",
    process: [
      "Audited all 21 original screens and mapped the three verification paths through them.",
      "Rewrote the flow as three visible steps, with one job per screen.",
      "Designed a camera experience that coaches through the capture instead of waiting for a result.",
      "Rebuilt the hub as a progress view with four real states."
    ],
  solution:
      "Every screen carries a step indicator, so position in the flow is never in question. Instructions and buttons are rewritten in plain language, the capture states tell people what to correct, and the hub reports real progress rather than a single pending state. Sample ID images are blurred so no document data is readable.",
    results: [
      ["21 \u2192 3", "screens rebuilt as visible steps"],
      ["20", "screens delivered"],
      ["4", "hub states"]
    ],
    takeaways: [
      "Telling someone where they are in a flow is cheaper than making any single screen easier.",
      "A camera that coaches during capture prevents the retries a camera that only validates afterwards creates.",
      "Explaining why data is needed belongs next to the request, not in a policy page."
    ],
    deck: [
      ["case-amex/01.webp", "Cover details", 1114],
      ["case-amex/02.webp", "Overview", 1028],
      ["case-amex/03.webp", "The starting point", 1474],
      ["case-amex/04.webp", "Research plan", 1068],
      ["case-amex/05.webp", "Desk research", 1406],
      ["case-amex/06.webp", "What people said", 1480],
      ["case-amex/07.webp", "Who it is for", 1224],
      ["case-amex/08.webp", "Problem and principles", 1147],
      ["case-amex/09.webp", "Structure and flows", 1967],
      ["case-amex/10.webp", "Explorations", 1276],
      ["case-amex/11.webp", "Key decisions", 2104],
      ["case-amex/12.webp", "The system", 1492],
      ["case-amex/13.webp", "Final screens", 1807],
      ["case-amex/14.webp", "Accessibility, next steps, reflection", 1776]
    ]
  },
  oride: {
    title: "Oride App Ecosystem",
    client: "Ride-sharing app",
    impact: "Spearheaded UX/UI for a four-app ecosystem: User, Driver, Vendor, and Delivery.",
    role: "Founding product designer, UX/UI",
    timeline: "Selected project",
    metric: "4 mobile apps launched",
    overview:
      "Oride needed a comprehensive ride-sharing ecosystem with connected mobile experiences for different roles. As founding designer, I shaped the UX/UI foundation for the User, Driver, Vendor, and Delivery apps.",
    problem:
      "The product required multiple mobile apps that felt consistent while serving very different needs. The team also needed a design process from scratch so delivery could stay organized as the ecosystem grew.",
    process: [
      "Defined the core flows for User, Driver, Vendor, and Delivery experiences.",
      "Established a repeatable design process to improve consistency and efficiency.",
      "Worked across product and development needs to prepare the ecosystem for launch."
    ],
    solution:
      "The final product foundation gave each app its own task-focused flow while keeping the ecosystem coherent. The design process helped the team move from idea to implementation with clearer standards.",
    results: [
      ["4", "mobile apps launched"],
      ["User", "Driver, Vendor, Delivery"],
      ["0-1", "design process created"]
    ],
    takeaways: [
      "Multi-role ecosystems need shared principles, not copied screens.",
      "A design process can be as valuable as a single interface when a product is scaling.",
      "Foundational UX work keeps complex mobile ecosystems easier to build."
    ]
  }
};

const setText = (selector, value) => {
  const node = document.querySelector(selector);
  if (node && value) node.textContent = value;
};

const renderList = (selector, items, renderer) => {
  const node = document.querySelector(selector);
  if (!node || !items) return;
  node.innerHTML = items.map(renderer).join("");
};

const caseTitle = document.querySelector("[data-case-title]");

if (caseTitle) {
  const params = new URLSearchParams(window.location.search);
  const selected = caseStudies[params.get("work")] || caseStudies.mimba;

  document.title = `${selected.title} | Md Omar Faruque`;
  setText("[data-case-title]", selected.title);
  setText("[data-case-client]", selected.client);
  setText("[data-case-impact]", selected.impact);
  setText("[data-case-role]", selected.role);
  setText("[data-case-timeline]", selected.timeline);
  setText("[data-case-metric]", selected.metric);
  setText("[data-case-overview]", selected.overview);
  setText("[data-case-problem]", selected.problem);
  setText("[data-case-solution]", selected.solution);

  renderList("[data-case-process]", selected.process, (item, index) => {
    const number = String(index + 1).padStart(2, "0");
    return `<div><span>${number}</span><p>${item}</p></div>`;
  });

  renderList("[data-case-results]", selected.results, ([metric, label]) => {
    return `<div><strong>${metric}</strong><span>${label}</span></div>`;
  });

  renderList("[data-case-links]", selected.links, ([label, href]) => {
    return `<a class="text-link" href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  });

  const note = document.querySelector("[data-case-note]");
  if (note && selected.note) {
    note.textContent = selected.note;
    note.hidden = false;
  }

  const deck = document.querySelector("[data-case-deck]");
  if (deck && selected.deck) {
    deck.hidden = false;
    // The placeholder graphic is a stand-in for work we do not have; when the
    // real screens exist, it should not sit above them.
    const placeholder = document.querySelector(".case-visual-shell");
    if (placeholder) placeholder.hidden = true;
    renderList("[data-case-deck]", selected.deck, ([src, label, height]) => {
      return `<figure><img src="${src}" alt="${label}" width="1440" height="${height}" loading="lazy" decoding="async"><figcaption>${label}</figcaption></figure>`;
    });
  }

  renderList("[data-case-takeaways]", selected.takeaways, (item) => {
    return `<li>${item}</li>`;
  });
}

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name") || "";
    const email = formData.get("email") || "";
    const company = formData.get("company") || "";
    const budget = formData.get("budget") || "";
    const message = formData.get("message") || "";

    const subject = encodeURIComponent(`Project inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany/Product: ${company}\nProject range: ${budget}\n\nWhat needs to improve:\n${message}`
    );

    const status = document.querySelector("[data-form-status]");
    if (status) {
      status.textContent = "Opening your email client with the project note.";
    }

    window.location.href = `mailto:omarmahin0@gmail.com?subject=${subject}&body=${body}`;
  });
}
