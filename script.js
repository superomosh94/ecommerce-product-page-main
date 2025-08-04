document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenuClose = document.getElementById("mobileMenuClose");
  const mainNav = document.getElementById("mainNav");
  const cartBtn = document.getElementById("cartBtn");
  const cartDropdown = document.getElementById("cartDropdown");
  const cartCount = document.getElementById("cartCount");
  const cartContent = document.getElementById("cartContent");
  const mainImage = document.getElementById("mainImage");
  const thumbnails = document.querySelectorAll(".thumbnail");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxThumbnails = document.querySelectorAll("[data-lightbox-image]");
  const decrementBtn = document.getElementById("decrementBtn");
  const incrementBtn = document.getElementById("incrementBtn");
  const quantityValue = document.getElementById("quantityValue");
  const addToCartBtn = document.getElementById("addToCartBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const lightboxPrevBtn = document.getElementById("lightboxPrevBtn");
  const lightboxNextBtn = document.getElementById("lightboxNextBtn");

  // State
  let currentImage = 1;
  let cartItems = [];
  let quantity = 0;

  // Mobile menu toggle
  mobileMenuBtn.addEventListener("click", () => {
    mainNav.classList.add("active");
  });

  mobileMenuClose.addEventListener("click", () => {
    mainNav.classList.remove("active");
  });

  // Cart toggle
  cartBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    cartDropdown.style.display =
      cartDropdown.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".cart")) {
      cartDropdown.style.display = "none";
    }
  });

  // Image gallery functionality
  function updateMainImage(imageNumber) {
    currentImage = imageNumber;
    mainImage.src = `./images/image-product-${imageNumber}.jpg`;
    lightboxImage.src = `./images/image-product-${imageNumber}.jpg`;

    // Update active thumbnail
    thumbnails.forEach((thumb) => {
      thumb.classList.remove("active");
      if (parseInt(thumb.dataset.image) === imageNumber) {
        thumb.classList.add("active");
      }
    });

    lightboxThumbnails.forEach((thumb) => {
      thumb.classList.remove("active");
      if (parseInt(thumb.dataset.lightboxImage) === imageNumber) {
        thumb.classList.add("active");
      }
    });
  }

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const imageNumber = parseInt(thumb.dataset.image);
      updateMainImage(imageNumber);
    });
  });

  // Lightbox functionality
  mainImage.addEventListener("click", () => {
    if (window.innerWidth > 768) {
      lightbox.style.display = "flex";
    }
  });

  lightboxClose.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  lightboxThumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const imageNumber = parseInt(thumb.dataset.lightboxImage);
      updateMainImage(imageNumber);
    });
  });

  // Navigation buttons
  function navigate(direction) {
    let newImage = currentImage + direction;
    if (newImage < 1) newImage = 4;
    if (newImage > 4) newImage = 1;
    updateMainImage(newImage);
  }

  prevBtn.addEventListener("click", () => navigate(-1));
  nextBtn.addEventListener("click", () => navigate(1));
  lightboxPrevBtn.addEventListener("click", () => navigate(-1));
  lightboxNextBtn.addEventListener("click", () => navigate(1));

  // Quantity controls
  decrementBtn.addEventListener("click", () => {
    if (quantity > 0) {
      quantity--;
      quantityValue.textContent = quantity;
    }
  });

  incrementBtn.addEventListener("click", () => {
    quantity++;
    quantityValue.textContent = quantity;
  });

  // Add to cart functionality
  addToCartBtn.addEventListener("click", () => {
    if (quantity > 0) {
      cartItems = [
        {
          id: 1,
          name: "Fall Limited Edition Sneakers",
          price: 125.0,
          quantity: quantity,
          image: "./images/image-product-1-thumbnail.jpg",
        },
      ];

      updateCart();
      quantity = 0;
      quantityValue.textContent = quantity;
    }
  });

  function updateCart() {
    const totalItems = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    if (totalItems > 0) {
      cartCount.textContent = totalItems;
      cartCount.style.display = "block";

      let cartHTML = "";
      let totalPrice = 0;

      cartItems.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        cartHTML += `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item__img">
            <div class="cart-item__details">
              <p class="cart-item__name">${item.name}</p>
              <p class="cart-item__price">$${item.price.toFixed(2)} x ${
          item.quantity
        } <span class="cart-item__total">$${itemTotal.toFixed(2)}</span></p>
            </div>
            <button class="cart-item__delete">
              <img src="./images/icon-delete.svg" alt="Delete">
            </button>
          </div>
        `;
      });

      cartHTML += `<button class="checkout-btn">Checkout</button>`;
      cartContent.innerHTML = cartHTML;
      cartContent
        .querySelector(".cart-item__delete")
        .addEventListener("click", () => {
          cartItems = [];
          updateCart();
        });
    } else {
      cartCount.style.display = "none";
      cartContent.innerHTML = '<p class="cart__empty">Your cart is empty</p>';
    }

    cartDropdown.style.display = "block";
  }

  // Initialize
  updateMainImage(1);
});



