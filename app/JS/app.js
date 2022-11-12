/* ------------- Auto Typing with Typed JS---------------*/

let typed = new Typed(".auto-type", {
  strings: ["Jatin Kumar", "Web Developer"],
  typeSpeed: 100,
  backSpeed: 100,
  loop: true,
});

/*---------Navigation Menu-------------*/

(() => {
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  const navMenu = document.querySelector(".nav-menu");
  const closeNavBtn = navMenu.querySelector(".close-nav-menu");

  hamburgerBtn.addEventListener("click", showNavMenu);
  closeNavBtn.addEventListener("click", hideNavMenu);

  function showNavMenu() {
    navMenu.classList.toggle("open");
    bodyScrollingToggle();
  }

  function hideNavMenu() {
    navMenu.classList.remove("open");
    fadeOutEffect();
    bodyScrollingToggle();
  }

  function fadeOutEffect() {
    document.querySelector(".fade-out-effect").classList.add("active");
    setTimeout(() => {
      document.querySelector(".fade-out-effect").classList.remove("active");
    }, 300);
  }

  // attach an event handler to document
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("link-item")) {
      /*make sure event.target has a value before overriding default behavior*/
      if (event.target.hash !== "") {
        //prevent default anchor click behavior
        event.preventDefault();
        const hash = event.target.hash;
        //deactivate existing active section
        document.querySelector(".section.active").classList.add("hide");
        document.querySelector(".section.active").classList.remove("active");
        //activate new section
        document.querySelector(hash).classList.add("active");
        document.querySelector(hash).classList.remove("hide");
        //deactivating existing acitve nav menu link-item
        navMenu
          .querySelector(".active")
          .classList.add("outer-shadow", "hover-in-shadow");
        navMenu
          .querySelector(".active")
          .classList.remove("active", "inner-shadow");
        if (navMenu.classList.contains("open")) {
          /*activate new nav menu link-item*/
          event.target.classList.add("active", "inner-shadow");
          event.target.classList.remove("outer-shadow", "hover-in-shadow");
          //hide navigation menu
          hideNavMenu();
        } else {
          let navItems = navMenu.querySelectorAll(".link-item");
          navItems.forEach((item) => {
            if (hash === item.hash) {
              //activate new nav menu link item
              item.classList.add("active", "inner-shadow");
              item.classList.remove("outer-shadow", "hover-in-shadow");
            }
          });
          fadeOutEffect();
        }
        //add hash(#) to url
        window.location.hash = hash;
      }
    }
  });
})();

/* -----------------About Section------------------*/
const aboutSection = document.querySelector(".about-section");
const tabsContainer = document.querySelector(".about-tabs");

tabsContainer.addEventListener("click", (event) => {
  /* If event.target contains 'tab-item' class & not 'acitve' class*/
  if (
    event.target.classList.contains("tab-item") &&
    !event.target.classList.contains("active")
  ) {
    const target = event.target.getAttribute("data-target");
    // deactivating existing tab-item
    tabsContainer
      .querySelector(".active")
      .classList.remove("outer-shadow", "active");
    // activate new tab-item
    event.target.classList.add("active", "outer-shadow");
    // deactivate existing tab-content
    aboutSection
      .querySelector(".tab-content.active")
      .classList.remove("active");
    //activate new tab-content
    aboutSection.querySelector(target).classList.add("active");
  }
});

function bodyScrollingToggle() {
  document.body.classList.toggle("stop_scrolling");
}

/* ----------- Portfolio filter and Popup -------------*/

const filterContainer = document.querySelector(".portfolio-filter");
const portfolioItemsContainer = document.querySelector(".portfolio-items");
const portfolioItems = document.querySelectorAll(".portfolio-item");
const popup = document.querySelector(".portfolio-popup");
const prevBtn = popup.querySelector(".pp-prev");
const nextBtn = popup.querySelector(".pp-next");
const closeBtn = popup.querySelector(".pp-close");
const projectDetailsContainer = popup.querySelector(".pp-details");
const projectDetailsBtn = popup.querySelector(".pp-project-detail-btn");

let itemIndex, slideIndex, screenShots;

//filter portfolio items

filterContainer.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("filter-item") &&
    !event.target.classList.contains("active")
  ) {
    // deactivating existing active 'filter-item'
    filterContainer
      .querySelector(".active")
      .classList.remove("outer-shadow", "active");

    // activate new filter item
    event.target.classList.add("active", "outer-shadow");
    const target = event.target.getAttribute("data-target");

    portfolioItems.forEach((item) => {
      if (target === "all") {
        item.classList.add("show");
      } else if (target === item.getAttribute("data-category")) {
        item.classList.remove("hide");
        item.classList.add("show");
      } else {
        item.classList.remove("show");
        item.classList.add("hide");
      }
    });
  }
});

portfolioItemsContainer.addEventListener("click", (event) => {
  if (event.target.closest(".portfolio-item-inner")) {
    const portfolioItem = event.target.closest(
      ".portfolio-item-inner"
    ).parentElement;

    // get the portfolio item index
    itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(
      portfolioItem
    );

    screenShots = portfolioItems[itemIndex]
      .querySelector(".portfolio-item-img img")
      .getAttribute("data-screenshots");
    // convert the ss into array
    screenShots = screenShots.split(",");
    if (screenShots.length === 1) {
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
    } else {
      prevBtn.style.display = "block";
      nextBtn.style.display = "block";
    }
    slideIndex = 0;
    popupToggle();
    popupSlidShow();
    popupDetails();
  }
});

closeBtn.addEventListener("click", function () {
  popupToggle();
  if (projectDetailsContainer.classList.contains("active")) {
    popupDetailsToggle();
  }
});

function popupSlidShow() {
  const imgSrc = screenShots[slideIndex];

  const popupImg = popup.querySelector(".pp-img");
  //activate loader until the popupImg loaded
  popup.querySelector(".pp-loader").classList.add("active");
  popupImg.src = imgSrc;
  popupImg.onload = () => {
    //deactivate the loader popupImg after image loaded;
    popup.querySelector(".pp-loader").classList.remove("active");
  };

  popup.querySelector(".pp-counter").innerHTML =
    slideIndex + 1 + " of " + screenShots.length;
}

//Next slide
nextBtn.addEventListener("click", () => {
  if (slideIndex === screenShots.length - 1) {
    slideIndex = 0;
  } else {
    slideIndex++;
  }
  popupSlidShow();
});

//Previous slide
prevBtn.addEventListener("click", () => {
  if (slideIndex === 0) {
    slideIndex = screenShots.length - 1;
  } else {
    slideIndex--;
  }
  popupSlidShow();
});

// Project details

function popupDetails() {
  if (!portfolioItems[itemIndex].querySelector(".portfolio-item-details")) {
    projectDetailsBtn.style.display = "none";
    return;
  }
  projectDetailsBtn.style.display = "block";
  // get the project details
  const details = portfolioItems[itemIndex].querySelector(
    ".portfolio-item-details"
  ).innerHTML;
  // set the project details
  popup.querySelector(".pp-projects-details").innerHTML = details;
  // get the project title
  const title = portfolioItems[itemIndex].querySelector(
    ".portfolio-item-title"
  ).innerHTML;
  // set the project title
  popup.querySelector(".pp-title h2").innerHTML = title;
  // get the project category
  const category = portfolioItems[itemIndex].getAttribute("data-category");
  // set the project category
  popup.querySelector(".pp-project-category").innerHTML = category
    .split("-")
    .join(" ");
}

projectDetailsBtn.addEventListener("click", () => {
  popupDetailsToggle();
});

function popupToggle() {
  popup.classList.toggle("open");
  bodyScrollingToggle();
}

function popupDetailsToggle() {
  if (projectDetailsContainer.classList.contains("active")) {
    projectDetailsBtn.querySelector("i").classList.add("fa-plus");
    projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
    projectDetailsContainer.classList.remove("active");
    projectDetailsContainer.style.maxHeight = 0 + "px";
  } else {
    projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
    projectDetailsBtn.querySelector("i").classList.add("fa-minus");
    projectDetailsContainer.classList.add("active");
    projectDetailsContainer.style.maxHeight =
      projectDetailsContainer.scrollHeight + "px";
    popup.scrollTo(0, projectDetailsContainer.offsetTop);
  }
}

/*------------- Testimonial slider -----------------*/

(() => {
  const sliderContainer = document.querySelector(".testi-slider-container"),
    slides = sliderContainer.querySelectorAll(".testi-item"),
    slideWidth = sliderContainer.offsetWidth,
    prevBtn = document.querySelector(".testi-slider-nav .prev"),
    nextBtn = document.querySelector(".testi-slider-nav .next");
  activeSlide = sliderContainer.querySelector(".testi-item.active");
  let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(
    activeSlide
  );

  // set widths of all slides
  slides.forEach((slide) => {
    slide.style.width = slideWidth + "px";
  });

  // set width of sliderContainer
  sliderContainer.style.width = slideWidth * slides.length + "px";

  nextBtn.addEventListener("click", () => {
    if (slideIndex === slides.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    slider();
  });

  prevBtn.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = slides.length - 1;
    } else {
      slideIndex--;
    }
    slider();
  });

  function slider() {
    // deactivating existing active slides
    sliderContainer
      .querySelector(".testi-item.active")
      .classList.remove("active");
    // activate new slide
    slides[slideIndex].classList.add("active");
    sliderContainer.style.marginLeft = -(slideWidth * slideIndex) + "px";
  }
  slider();
})();

/*--------hide all section except active--------------*/

(() => {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    if (!section.classList.contains("active")) {
      section.classList.add("hide");
    }
  });
})();

window.addEventListener("load", () => {
  //preloader
  document.querySelector(".preloader").classList.add("fade-out");
  setTimeout(() => {
    document.querySelector(".preloader").style.display = "none";
  }, 600);
});
