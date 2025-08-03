gsap.registerPlugin(ScrollTrigger);
const btn = document.getElementById("roleBtn");
const front = btn.querySelector(".front");
const back = btn.querySelector(".back");

btn.addEventListener("mouseenter", () => {
  gsap.to(front, {
    duration: 0.4,
    rotationY: 180,
    ease: "power2.inOut",
    opacity: 0,
  });
  gsap.to(back, {
    duration: 0.4,
    rotationY: 0,
    ease: "power2.inOut",
    opacity: 1,
  });
});

btn.addEventListener("mouseleave", () => {
  gsap.to(front, {
    duration: 0.4,
    rotationY: 0,
    ease: "power2.inOut",
    opacity: 1,
  });
  gsap.to(back, {
    duration: 0.4,
    rotationY: -180,
    ease: "power2.inOut",
    opacity: 0,
  });
});

gsap.from("#navbar-r-side", {
  x: "30vw",
  opacity: 0,
  ease: "power.out(1.2)",
  duration: 1,
  delay: 0.5,
});

gsap.from("#logopic", {
  x: "-30vw",
  opacity: 0,
  ease: "power.out(1.2)",
  duration: 1,
  delay: 0.5,
});

gsap.to("#main-container", {
  scrollTrigger: {
    trigger: "#main-container",
    start: "top 70%", // when Herosection leaves view
    end: "top 10%", // you can tweak this for faster/sooner effect
    scrub: 1,
  },
  width: "100vw",
  borderRadius: 0,
  opacity: 1,
  ease: "power.in",
  backgroundColor: "#FFFFFF",
  paddingTop: "100px",
});

gsap.to(".bi-chevron-double-up", {
  scrollTrigger: {
    trigger: "#main-container",
    start: "top 65%", // when Herosection leaves view
    end: "top 10%", // you can tweak this for faster/sooner effect
    scrub: 1,
  },
  opacity: 0,
  duration: 1,
  y: -50,
  ease: "back.out(1.1)",
});

const sizeContainer = document.getElementById("size-container");
const errorMsg = document.getElementById("error-msg");
const buyBtn = document.getElementById("buy-btn");
const priceDisplay = document.getElementById("product-price");
const infoForm = document.getElementById("info-form");

const sizes = [
  { label: "250มล.", value: "250มล.", available: true, price: 329 },
  { label: "450มล.", value: "450มล.", available: true, price: 399 },
  { label: "600มล.", value: "600มล.", available: true, price: 449 }, // simulate out of stock
  { label: "750มล.", value: "750มล.", available: true, price: 499 },
  { label: "1ลิตร", value: "1ลิตร", available: true, price: 589 },
];

let selectedSize = null;

sizes.forEach((size) => {
  const btn = document.createElement("button");
  btn.textContent = size.label;
  btn.type = "button";
  btn.className =
    "size-option px-4 py-2 border rounded-full text-sm font-medium transition duration-200 " +
    (size.available
      ? "hover:border-black text-gray-800 border-gray-300"
      : "text-gray-400 border-gray-200 cursor-not-allowed line-through");
  btn.disabled = !size.available;

  if (size.available) {
    btn.addEventListener("click", () => {
      selectedSize = size.value;
      errorMsg.classList.add("hidden");

      document.querySelectorAll(".size-option").forEach((el) => {
        el.classList.remove("bg-black", "text-white", "border-black");
        el.classList.add("border-gray-300", "text-gray-800");
      });

      btn.classList.remove("border-gray-300", "text-gray-800");
      btn.classList.add("bg-black", "text-white", "border-black");

      priceDisplay.textContent = size.price;
    });
  }

  sizeContainer.appendChild(btn);
});

buyBtn.addEventListener("click", () => {
  if (!selectedSize) {
    errorMsg.classList.remove("hidden");
    return;
  }

  // Check if already expanded (avoid repeating animation)
  if (infoForm.dataset.expanded === "true") return;

  // Set initial styles
  infoForm.style.overflow = "hidden";
  infoForm.style.height = "0px";

  // Force a reflow so height = 0 is applied before animation
  infoForm.offsetHeight;

  // Measure the full height
  const fullHeight = infoForm.scrollHeight;

  // Animate to full height
  gsap.to(infoForm, {
    height: fullHeight,
    delay: 0.3,
    duration: 1,
    ease: "power2.out",
    onComplete: () => {
      // Let the container grow naturally after expanding
      infoForm.style.height = "fit-content";
      infoForm.dataset.expanded = "true";
      const fname = document.getElementById("f-name");
      fname?.scrollIntoView({ behavior: "smooth", block: "center" });
    },
  });
});

gsap.to("#f-title", {
  scrollTrigger: {
    trigger: "#main-container",
    start: "top 70%",
    end: "top 10%",
    scrub: 1,
  },
  y: 100,
  x: -50,
});

gsap.to("#l-title", {
  scrollTrigger: {
    trigger: "#main-container",
    start: "top 70%",
    end: "top 10%",
    scrub: 1,
  },
  y: -100,
  x: 50,
});

gsap.from("#f-title", {
  x: -100,
  opacity: 0,
  duration: 1,
  ease: "back.out(1.4)",
});

gsap.from("#l-title", {
  x: 100,
  opacity: 0,
  duration: 1,
  ease: "back.out(1.4)",
});

const shippingButtons = document.querySelectorAll(".shipping-btn");
const shippingInput = document.getElementById("shipping-type");
const submitBtn = document.getElementById("submit");
const shippingError = document.getElementById("shipping-error");

shippingButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const isSelected = btn.classList.contains("bg-black");

    // Clear all selections
    shippingButtons.forEach((b) =>
      b.classList.remove("bg-black", "text-white", "hover:bg-gray-800")
    );

    if (!isSelected) {
      // If not selected before, select this one
      btn.classList.add("bg-black", "text-white", "hover:bg-gray-800");
      shippingInput.value = btn.dataset.value;
    } else {
      // If already selected, deselect
      shippingInput.value = "";
    }
  });
});

submitBtn.addEventListener("click", (e) => {
  const shippingValue = document.getElementById("shipping-type").value;

  if (!shippingValue) {
    e.preventDefault(); // stop form submission
    shippingError.classList.remove("hidden"); // show warning
    return;
  } else {
    shippingError.classList.add("hidden"); // hide warning if valid
  }
});

const slipInput = document.getElementById("slip-upload");
const slipPreview = document.getElementById("slip-preview");
const slipImg = document.getElementById("slip-image");
const removeSlipBtn = document.getElementById("remove-slip");

slipInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    slipImg.src = URL.createObjectURL(file);
    slipPreview.classList.remove("hidden");
  }
});

removeSlipBtn.addEventListener("click", () => {
  slipInput.value = "";
  slipImg.src = "";
  slipPreview.classList.add("hidden");
});
