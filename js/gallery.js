const btn = document.getElementById("submit-btn");
const loadMoreBtn = document.getElementById("load-more");
const countryElem = document.getElementById("country");

let globalStart = 0;
let globalCountry = "";
let globalName = "";

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
          <!-- <div class="wrapper-add-to-cart">
            <div class="add-to-cart-inner">
              <a
                id="${post.id}"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                data-bs-post-id="${post.id}"
                class="button product_type_simple add_to_cart_button ajax_add_to_cart octf-btn octf-btn-primary octf-btn-icon"
                >Vote <i class="fa-solid fa-thumbs-up"></i
              ></a>
            </div>
          </div> -->
        </div>
        <h2 class="woocommerce-loop-product__title text-uppercase">
          <a href="/posts/?id=${post.id}">${post.displayName}</a>
        </h2>
      </li>`;
  });

  return str;
};

countryElem.addEventListener("change", (e) => {
  const country = countryElem.options[countryElem.selectedIndex].value;
  const params = new URLSearchParams(window.location.search);

  params.set("start", 0);

  if (country) {
    params.set("country", country);
  } else {
    params.delete("country");
    params.delete("name");
  }

  window.location.search = params;
});

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  const search = document.getElementById("search");
  const start = 0;
  const country = countryElem.options[countryElem.selectedIndex].value;
  const name = search.value;

  const params = new URLSearchParams();
  params.append("start", start);
  if (country) {
    params.append("country", country);
  }

  if (name) {
    params.append("name", name);
  }

  const posts = await fetchPosts(params);
  document.querySelector(".products").innerHTML = renderPosts(posts);
  window.location.search = params;
  globalCountry = country;
  globalName = name;
});

const fetchPosts = async (params) => {
  const loading = document.getElementById("loading");
  loadMoreBtn.disabled = true;
  loading.classList.remove("d-none");
  const res = await fetch(`${apiUrl}/posts?${params.toString()}`).then((res) =>
    res.json()
  );
  loading.classList.add("d-none");
  loadMoreBtn.disabled = false;
  return res;
};

window.addEventListener("load", async (e) => {
  console.log("WooW");
  const url = window.location.href;
  const params = new URL(url).searchParams;
  const posts = await fetchPosts(params);

  document.querySelector(".products").innerHTML = renderPosts(posts);
  globalCountry = params.get("country");
  globalName = params.get("name");
  const countryElem = document.getElementById("country");

  const countryIndex = Array.from(countryElem.options).findIndex(
    (elem) => globalCountry === elem.value
  );

  if (countryIndex >= 0) countryElem.selectedIndex = countryIndex;
});

loadMoreBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  globalStart = parseInt(globalStart) + 10;

  const loading = document.getElementById("loading");
  loading.classList.remove("d-none");

  const params = new URLSearchParams();

  params.append("start", globalStart);

  if (globalCountry) {
    params.append("country", globalCountry);
  }

  if (globalName) {
    params.append("name", globalName);
  }

  const posts = await fetchPosts(params);

  document.querySelector(".products").innerHTML += renderPosts(posts);

  if (posts.length !== 10) {
    loadMoreBtn.style.display = "none";
  }
});
