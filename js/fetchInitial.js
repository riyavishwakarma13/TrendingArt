const fetchTop10 = async () => {
  return await fetch(`${apiUrl}/posts`).then((res) => res.json());
};

const fetchLatest = async () => {
  return await fetch(`${apiUrl}/posts?sort=time`).then((res) => res.json());
};

const renderHtml = (posts) => {
  let str = ``;
  posts?.map((post) => {
    str += `
      <div class="partners-slide">
        <div class="team-wrap sm-p-t0 m-b15 p-t30">
          <a href="/posts/?id=${post.id}">
            <div class="figure">
              <div class="product last product-media">
                <span class="onsale">${post.votes} Votes</span>
              </div>
              <img class="Sirv image-main" data-src="${post.imageLink}" />
              <div class="wrapper-add-to-cart home-gallery">
              <div class="add-to-cart-inner">
                <a
                  id="${post.id}"
                  href="/posts/?id=${post.id}"
                  class="button product_type_simple add_to_cart_button ajax_add_to_cart octf-btn octf-btn-primary octf-btn-icon"
                  >Click to Vote <i class="fa-solid fa-thumbs-up"></i
                ></a>
              </div>
            </div>
              </div>
            <div class="team-info text-uppercase">
              <h4>${post.displayName}</h4>
              <div class= "text-center text-muted">
              <span>${post.city}, ${post.category}</span>
              
              </div>
            </div>
          </a>
        </div>
      </div>`;
  });

  return str;
};

const top10 = document.getElementById("top-10");
const topLatest = document.getElementById("top-latest");

fetchTop10().then((posts) => {
  if (posts) {
    top10.innerHTML = renderHtml(posts);
    initTopClientCarousel();
  }
});

fetchLatest().then((posts) => {
  if (posts) {
    topLatest.innerHTML = renderHtml(posts);
    initLatestClientCarousel();
  }
});

const listings = document
  .querySelectorAll(".listings")
  .forEach(async (listing) => {
    const id = listing.id;
    if (id) {
      const res = await fetch(`${apiUrl}/posts/count?city=${id}`).then((res) =>
        res.json()
      );
      listing.innerHTML = `${res.data} Listings`;
    }
  });
