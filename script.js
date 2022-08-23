"use strict";

// Project Elements
const seeMoreBtns = document.querySelectorAll(".see-more");
const overlay = document.querySelector(".overlay");

// Navigation navbar
const header = document.querySelector(".header");
const navEl = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav-item");
const scrollToNavBtn = document.querySelector(".scroll-to-nav");

// Navigation mobile
const menuBtn = document.querySelector(".btn-menu");
const closeMenuBtn = document.querySelector(".btn-close-menu");

// Sections
const sections = document.querySelectorAll(".section");
const sectionIntroduction = document.querySelector(".section-introduction");

//////////////////////////////
// NAVIGATING THROUGH SECTIONS
//////////////////////////////

// Restarting scroll position
window.addEventListener("load", () => {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);
});

// Navigation through sections
navLinks.forEach((link) =>
  link.addEventListener("click", function (e) {
    const linkName = link.dataset.section;
    const chosenSection = document.querySelector(`.section-${linkName}`);

    chosenSection.scrollIntoView({ behavior: "smooth" });

    // Navigation UI (only visible on mobile)
    closeNavigationMobile();
  })
);

// Revealing scroll-to-nav button
const revealScrollBtn = function (entries) {
  const [entry] = entries;

  if (entry.isIntersecting) scrollToNavBtn.classList.add("hidden");
  else scrollToNavBtn.classList.remove("hidden");
};

const sectionIntroductionObserver = new IntersectionObserver(revealScrollBtn, {
  root: null,
  threshold: 0,
});

sectionIntroductionObserver.observe(sectionIntroduction);

// Scrolling to top of the page (to navigation bar)
scrollToNavBtn.addEventListener("click", () =>
  header.scrollIntoView({ behavior: "smooth" })
);

// Revealing section
const revealSection = function (entries) {
  const [entry] = entries;
  entry.target.classList.remove("section-shifted");

  sectionObserver.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

sections.forEach((section) => sectionObserver.observe(section));

/////////////////////////
// PROJECT SECTION
////////////////////////

const openProjectModal = function (projectModalType) {
  overlay.classList.remove("hidden");
  projectModalType.classList.remove("hidden");
};

const closeProjectModal = function (projectModalType) {
  overlay.classList.add("hidden");
  projectModalType.classList.add("hidden");
};

seeMoreBtns.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    const target = e.target;
    const projectType = target.dataset.type;
    const projectModalType = document.querySelector(
      `.project-details-${projectType}`
    );
    const exitBtn = projectModalType.querySelector(".btn-exit");

    openProjectModal(projectModalType);

    [exitBtn, overlay].forEach((el) =>
      el.addEventListener(
        "click",
        closeProjectModal.bind(null, projectModalType)
      )
    );
  })
);

////////////////////////////////
// MOBILE NAVIGATION
///////////////////////////////
const openNavigationMobile = function () {
  menuBtn.classList.toggle("hidden");
  closeMenuBtn.classList.toggle("hidden");
  navEl.classList.toggle("nav-open");
  document.body.classList.toggle("no-scroll");
};

const closeNavigationMobile = function () {
  closeMenuBtn.classList.add("hidden");
  navEl.classList.remove("nav-open");
  menuBtn.classList.remove("hidden");
  document.body.classList.remove("no-scroll");
};

[menuBtn, closeMenuBtn].forEach((btn) =>
  btn.addEventListener("click", openNavigationMobile)
);
