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
            </div>
            <div class="team-info">
              <h4>${post.displayName}</h4>
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
    const res = await fetch(`${apiUrl}/posts/count?city=${id}`).then((res) =>
      res.json()
    );
    listing.innerHTML = `${res.data} Listings`;
  });
