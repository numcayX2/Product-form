gsap.registerPlugin(ScrollTrigger);
let lastScrollY = window.scrollY;

gsap.from("#welcome-title", {
  opacity: 0,
  scale: 0.8,
  ease: "back.out(1.2)",
  duration: 1,
});

gsap.to(".menu-item", {
  opacity: 1,
  y: 0,
  stagger: 0.2,
  duration: 0.8,
  ease: "back.out(1.5)",
});

gsap.from("#main", {
  opacity: 0,
  duration: 1,
  y: 20,
  ease: "power.out(1.3)",
});

function updateMainMargin() {
  const navbar = document.getElementById("navbar");
  const main = document.getElementById("main");
  const navbarHeight = navbar.offsetHeight;
  main.style.marginTop = navbarHeight + 20 + "px";
}

window.addEventListener("DOMContentLoaded", updateMainMargin);
window.addEventListener("resize", updateMainMargin);

// Color management
let colors = [];
const colorInput = document.getElementById("colorInput");
const addColorBtn = document.getElementById("addColorBtn");
const colorList = document.getElementById("colorList");

function addColor() {
  const colorName = colorInput.value.trim();
  if (colorName && !colors.includes(colorName)) {
    colors.push(colorName);
    renderColors();
    colorInput.value = "";
  }
}

function removeColor(colorName) {
  colors = colors.filter((c) => c !== colorName);
  renderColors();
}

function renderColors() {
  colorList.innerHTML = colors
    .map(
      (color) => `
                <div class="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                    <span class="text-sm font-medium">${color}</span>
                    <button type="button" onclick="removeColor('${color}')" class="text-red-500 hover:text-red-700">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>
            `
    )
    .join("");
}

addColorBtn.addEventListener("click", addColor);
colorInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addColor();
  }
});

// Image management
let selectedImages = [];
const imageInput = document.getElementById("imageInput");
const imagePreview = document.getElementById("imagePreview");

imageInput.addEventListener("change", (e) => {
  const files = Array.from(e.target.files);
  files.forEach((file) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        selectedImages.push({
          file: file,
          url: e.target.result,
          name: file.name,
        });
        renderImages();
      };
      reader.readAsDataURL(file);
    }
  });
});

function removeImage(index) {
  selectedImages.splice(index, 1);
  renderImages();
}

function renderImages() {
  imagePreview.innerHTML = selectedImages
    .map(
      (img, index) => `
                <div class="relative group">
                    <img src="${img.url}" alt="${img.name}" class="w-full h-32 object-cover rounded-lg border">
                    <button
                        type="button"
                        onclick="removeImage(${index})"
                        class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        ×
                    </button>
                    <p class="text-xs text-gray-500 mt-1 truncate">${img.name}</p>
                </div>
            `
    )
    .join("");
}

// Form submission
document.getElementById("productForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData();
  const form = e.target;

  // Basic form data
  formData.append("name", form.productName.value);
  formData.append("description", form.productDescription.value);
  formData.append("price", form.productPrice.value);

  // Size
  formData.append("sizes", JSON.stringify(selectedSizes));

  // Colors
  formData.append("colors", JSON.stringify(colors));

  // Images
  selectedImages.forEach((img, index) => {
    formData.append(`image_${index}`, img.file);
  });

  // Demo: Show collected data
  console.log("Product Data:", {
    name: form.productName.value,
    description: form.productDescription.value,
    price: form.productPrice.value,
    sizes: selectedSizes,
    colors: colors,
    images: selectedImages.length + " images",
  });

  alert("Product data ready for submission! Check console for details.");
});

// Size selection management
let selectedSizes = [];
const sizeButtons = document.querySelectorAll(".size-btn");

sizeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const size = btn.dataset.size;

    if (selectedSizes.includes(size)) {
      // Remove size
      selectedSizes = selectedSizes.filter((s) => s !== size);
      btn.classList.remove("bg-black", "text-white");
      btn.classList.add("border-gray-300", "text-gray-700");
    } else {
      // Add size
      selectedSizes.push(size);
      btn.classList.remove("border-gray-300", "text-gray-700");
      btn.classList.add("bg-black", "text-white", "border-black");
    }
  });
});

gsap.set(".back", { rotationY: -180 });
gsap.set("#roleBtn", { transformStyle: "preserve-3d", perspective: 600 });

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

const sizeOptionsMap = {
  clothes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  ring: ["6", "7", "8", "9", "10"],
  glass: ["250มล.", "500มล.", "750มล."],
  flask: ["350มล.", "500มล.", "750มล.", "1ลิตร"],
  keychain: ["รูปแบบที่ 1", "รูปแบบที่ 2"],
};

const categorySelect = document.getElementById("categorySelect");
const sizeContainer = document.getElementById("sizeContainer");

function updateSizeOptions(category) {
  const sizes = sizeOptionsMap[category] || [];
  sizeContainer.innerHTML = "";
  selectedSizes = [];

  sizes.forEach((size) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = size;
    btn.dataset.size = size;
    btn.className =
      "size-btn px-4 py-2 border border-gray-300 rounded-full text-sm font-medium hover:border-blue-600 duration-200";

    btn.addEventListener("click", () => {
      if (selectedSizes.includes(size)) {
        selectedSizes = selectedSizes.filter((s) => s !== size);
        btn.classList.remove("bg-blue-400", "text-white", "border-blue-300", "shadow-md");
        btn.classList.add("border-blue-300", "text-gray-700");
      } else {
        selectedSizes.push(size);
        btn.classList.remove("border-blue-300", "text-gray-700");
        btn.classList.add("bg-blue-400", "text-white", "border-blue-300", "shadow-md");
      }
    });

    sizeContainer.appendChild(btn);
  });
}

categorySelect.addEventListener("change", (e) => {
  updateSizeOptions(e.target.value);
});

updateSizeOptions(categorySelect.value);

document.getElementById("submit-btn").addEventListener("mouseenter", () => {
  gsap.to("#submit-btn", {
    duration: 1,
    ease: "elastic.out(1,0.3)",
    scale: 1.1,
  });
});

document.getElementById("submit-btn").addEventListener("mouseleave", () => {
  gsap.to("#submit-btn", {
    duration: 1,
    ease: "elastic.out(1,0.3)",
    scale: 1,
  });
});

gsap.from('#roleBtnFrame', {
  x: "30vw",
  opacity: 0,
  ease: 'power.out(1.2)',
  duration: 1,
  delay: 0.5
});

gsap.from('#logopic', {
  x: "-30vw",
  opacity: 0,
  ease: 'power.out(1.2)',
  duration: 1,
  delay: 0.5
});
