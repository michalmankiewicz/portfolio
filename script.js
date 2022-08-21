"use strict";

// window.addEventListener("hashchange", function (e) {
//   const sectionType = window.location.hash.slice(1);

//   const sectionEls = document.querySelectorAll(".section");
//   sectionEls.forEach((section) => {
//     if (section.classList.contains(`section-${sectionType}`))
//       section.classList.remove("hidden");
//     else section.classList.add("hidden");
//   });
// });

// PROJECT DETAILS HANDLING
const seeMoreBtns = document.querySelectorAll(".see-more");
const overlay = document.querySelector(".overlay");
const navLinks = document.querySelectorAll(".nav-item");
const header = document.querySelector(".header");

const menuBtn = document.querySelector(".btn-menu");
const closeMenuBtn = document.querySelector(".btn-close-menu");
const navEl = document.querySelector(".nav");

seeMoreBtns.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    const target = e.target;
    const projectType = target.dataset.type;

    const projectDetails = document.querySelector(
      `.project-details-${projectType}`
    );

    console.log(projectType, projectDetails);

    overlay.classList.remove("hidden");
    projectDetails.classList.remove("hidden");

    const exitBtn = projectDetails.querySelector(".btn-exit");

    console.log(exitBtn);

    [exitBtn, overlay].forEach((el) =>
      el.addEventListener("click", function (e) {
        console.log("click");
        overlay.classList.add("hidden");
        projectDetails.classList.add("hidden");
      })
    );
  })
);

navLinks.forEach((link) =>
  link.addEventListener("click", function (e) {
    console.log(link);
    const linkName = link.dataset.section;
    const chosenSection = document.querySelector(`.section-${linkName}`);

    closeMenuBtn.classList.add("hidden");
    navEl.classList.remove("nav-open");
    menuBtn.classList.remove("hidden");

    chosenSection.scrollIntoView({ behavior: "smooth" });
  })
);

const scrollToNavBtn = document.querySelector(".scroll-to-nav");
const sectionIntroduction = document.querySelector(".section-introduction");

// console.log(scrollToNavBtn.classList, sectionAbout);

const revealScrollBtn = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (entry.isIntersecting) scrollToNavBtn.classList.add("hidden");
  else scrollToNavBtn.classList.remove("hidden");
};

const sectionIntroductionObserver = new IntersectionObserver(revealScrollBtn, {
  root: null,
  threshold: 0,
});

sectionIntroductionObserver.observe(sectionIntroduction);

scrollToNavBtn.addEventListener("click", () =>
  header.scrollIntoView({ behavior: "smooth" })
);

const sections = document.querySelectorAll(".section");

const revealSection = function (entries) {
  const [entry] = entries;

  entry.target.classList.remove("section-shifted");
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

sections.forEach((section) => sectionObserver.observe(section));

[menuBtn, closeMenuBtn].forEach((btn) =>
  btn.addEventListener("click", function (e) {
    menuBtn.classList.toggle("hidden");
    closeMenuBtn.classList.toggle("hidden");
    navEl.classList.toggle("nav-open");
    document.body.classList.toggle("no-scroll");
  })
);

// navLinks.forEach((link) =>
//   link.addEventListener("click", function (e) {
//     const linkName = window.location.hash.slice(1);
//     console.log(linkName);
//     // const chosenSection =
//   })
// );
