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
  checkout: {
    title: "Checkout Growth Sprint",
    client: "SaaS onboarding",
    impact: "Raised checkout completion by 28% by removing uncertainty from plan comparison and payment.",
    role: "UX strategy, UI design, testing",
    timeline: "6 weeks",
    metric: "+28% checkout completion",
    overview:
      "The checkout flow had enough intent but not enough confidence. I rebuilt the page hierarchy around the questions buyers asked before entering payment details: what is included, what changes after trial, and why this plan is the right fit.",
    problem:
      "Analytics showed a steep drop after plan selection. Interviews and session reviews pointed to three issues: vague pricing context, weak reassurance before payment, and a support-heavy feature comparison.",
    process: [
      "Mapped checkout events against support tickets and sales objections.",
      "Rewrote the decision hierarchy around value, commitment, and risk.",
      "Tested layout variants with five target buyers before final UI design."
    ],
    solution:
      "The final experience paired a simplified plan comparison with contextual proof, plain-language billing details, and a checkout summary that stayed visible until purchase. The UI became calmer because every block had a job.",
    results: [
      ["+28%", "checkout completion"],
      ["-19%", "billing support questions"],
      ["+14%", "annual plan selection"]
    ],
    takeaways: [
      "Conversion improves when the page answers the real buyer question.",
      "Reducing interface weight is only useful when the decision logic gets clearer.",
      "Support data can expose conversion friction faster than another design critique."
    ]
  },
  analytics: {
    title: "Analytics Activation",
    client: "B2B dashboard",
    impact: "Improved activation by 34% by turning a dense analytics product into a guided first-use experience.",
    role: "Product UX, prototyping, design system",
    timeline: "8 weeks",
    metric: "+34% activation",
    overview:
      "The product had useful data but asked new users to interpret too much too soon. I redesigned the first-run experience around role-based defaults, empty states that taught the product, and clearer paths to the first useful insight.",
    problem:
      "New users landed in a powerful dashboard with weak context. Teams skipped setup, missed high-value reports, and depended on customer success to explain what the interface should have made obvious.",
    process: [
      "Audited onboarding sessions to identify where new users paused or left.",
      "Defined activation around the first saved report instead of first login.",
      "Prototyped guided states and tested them with admins, analysts, and founders."
    ],
    solution:
      "The redesign introduced a lighter home state, role-specific report starters, visible setup progress, and dashboard defaults that matched the user's business model. The interface focused attention without hiding power.",
    results: [
      ["+34%", "activation rate"],
      ["-41%", "time to first insight"],
      ["+23%", "saved report creation"]
    ],
    takeaways: [
      "A dashboard should not make new users prove they deserve the data.",
      "Activation metrics get sharper when they describe a meaningful product moment.",
      "Strong defaults can reduce onboarding work without making the product feel limited."
    ]
  },
  lending: {
    title: "Lending Funnel Redesign",
    client: "Fintech funnel",
    impact: "Increased completed applications by 22% by making risk, rates, and next steps easier to trust.",
    role: "UX research, funnel design, UI design",
    timeline: "7 weeks",
    metric: "+22% completed applications",
    overview:
      "Applicants were interested in estimated rates but uncertain about what happened next. I redesigned the quote-to-application path around transparency, document readiness, and confidence at each handoff.",
    problem:
      "The flow treated rate estimates as the finish line, but users saw them as the start of a risk decision. They needed to understand eligibility, documents, privacy, and commitment before continuing.",
    process: [
      "Reviewed drop-off by step and compared it with support and compliance questions.",
      "Interviewed applicants who abandoned after viewing their estimate.",
      "Reworked the quote path to explain commitment level before asking for more data."
    ],
    solution:
      "The final flow added clearer rate context, a document readiness preview, plain privacy language, and trust cues near sensitive form fields. The structure stayed short while the decision felt better supported.",
    results: [
      ["+22%", "completed applications"],
      ["-17%", "form field errors"],
      ["+31%", "document upload starts"]
    ],
    takeaways: [
      "Trust is part of the interface, not a badge pasted near the footer.",
      "Sensitive flows need clarity before they need persuasion.",
      "The right explanation can reduce friction without adding more screens."
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
  const selected = caseStudies[params.get("work")] || caseStudies.checkout;

  document.title = `${selected.title} | Ari Morgan`;
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

    window.location.href = `mailto:hello@arimorgan.design?subject=${subject}&body=${body}`;
  });
}
