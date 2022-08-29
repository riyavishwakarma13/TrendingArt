const btn = document.getElementById("submit-btn");

const renderPosts = (posts) => {
  let str = ``;
  posts.map((post) => {
    str += `<li class="product">
        <div class="product-media">
        <div class="product last ">
          <span class="onsale">${post.votes} Votes</span>
        </div>
          <img
            class="gallery-image"
            src="${post.imageLink}"
            alt=""
          />
          <div class="wrapper-add-to-cart">
            <div class="add-to-cart-inner">
              <a
                id="${post._id}"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                data-bs-post-id="${post._id}"
                class="button product_type_simple add_to_cart_button ajax_add_to_cart octf-btn octf-btn-primary octf-btn-icon"
                >Vote <i class="fa-solid fa-thumbs-up"></i
              ></a>
            </div>
          </div>
        </div>
        <h2 class="woocommerce-loop-product__title">
          <a href="/users.html#${post.phone}">${post.displayName}</a>
        </h2>
      </li>`;
  });

  return str;
};

btn.addEventListener("click", async (e) => {
  e.preventDefault();

  const cityElem = document.getElementById("city");
  const categoryElem = document.getElementById("category");
  const search = document.getElementById("search");
  const start = 0;
  const city = cityElem.options[cityElem.selectedIndex].value;
  const category = categoryElem.options[categoryElem.selectedIndex].value;
  const name = search.value;

  const params = new URLSearchParams();
  params.append("start", start);
  if (city) {
    params.append("city", city);
  }
  if (category) {
    params.append("category", category);
  }

  if (name) {
    params.append("name", name);
  }

  const loading = document.getElementById("loading");
  loading.classList.remove("d-none");

  const res = await fetch(`${apiUrl}/posts?${params.toString()}`).then((res) =>
    res.json()
  );

  loading.classList.add("d-none");

  document.querySelector(".products").innerHTML = renderPosts(res);
});

const fetchPosts = async () => {
  const url = window.location.href;
  const params = new URL(url).searchParams.toString();
  const loading = document.getElementById("loading");
  loading.classList.remove("d-none");
  const res = await fetch(`${apiUrl}/posts?${params.toString()}`).then((res) =>
    res.json()
  );
  loading.classList.add("d-none");

  document.querySelector(".products").innerHTML = renderPosts(res);
};



window.onload = fetchPosts;
