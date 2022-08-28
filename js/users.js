const renderHTML = (post)=> {
return ` 
<div class="container">
  <!-- <section class="about-home bg-light"> -->
  <!-- <div class="container"> -->
  <div class=" m-tb100 text-center">
    <img
      src="${post.imageLink}"
      alt="Ganpati"
    />
  </div>
  <!-- </div> -->
  <!-- </section> -->
  <section>
    <div>
      <div class="row text-center p-b10">
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
    </div>
    <div class="container">
      <div class="flex-row lol-margin justify-content-center">
        <div class="col-md-4 col-sm-6 col-xs-12 sm-m-b40">
          <div class="service-box-s2 s-box service-box-s2-bg1">
            <div class="content-box">
              <h5>Name: ${post.name}</h5>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12 sm-m-b40">
          <div class="service-box-s2 s-box service-box-s2-bg2">
            <div class="content-box">
              <h5>Category: ${post.category}</h5>
              <!-- <p>
              We believe that a culture will build a thriving company.
            </p> -->
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12 sm-m-b40">
          <div class="service-box-s2 s-box service-box-s2-bg2">
            <div class="content-box">
              <h5>City: ${post.city}</h5>
              <!-- <p>
                We believe that a culture will build a thriving company.
              </p> -->
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12">
          <div class="service-box-s2 s-box service-box-s2-bg3">
            <div class="content-box">
              <h5>Displayed Name: ${post.displayName}</h5>
              <!-- <p>
              We’re driven to becoming the best version of ourselves.
            </p> -->
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12">
          <div class="service-box-s2 s-box service-box-s2-bg3">
            <div class="content-box">
              <h5>Vote Count: ${post.votes}</h5>
              <!-- <p>
              We’re driven to becoming the best version of ourselves.
            </p> -->
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12">
          <div class="service-box-s2 s-box service-box-s2-bg3">
            <div class="content-box" style="word-break: break-word;">
              <h5>Post Link: ${window.location.href}</h5>
              <!-- <p>
              We’re driven to becoming the best version of ourselves.
            </p> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
`
}

const getPost = async () => {
  const number = window.location.hash.substring(1);
  if (!number) return;
  const res = await fetch(`${apiUrl}/posts/${number}`);

  if (res.ok) {
   document.getElementById("post-details").innerHTML =   renderHTML(await res.json());
    // document.write(JSON.stringify(await res.json()));
  } else {
    alert("Post not found");
    window.location.href = "/";
  }
};

window.addEventListener("hashchange", async (e) => {
  getPost();
});

window.onload = getPost();
