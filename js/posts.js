const renderHTML = (post) => {
  return `
<div class="container">
  <!-- <section class="about-home bg-light"> -->
  <!-- <div class="container"> -->
  <div class=" m-tb100 text-center">
    <img
      src="${post.imageLink}"
      alt="Ganpati"
      style="width:95%; max-wdith: 95%;"
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
              id="${post.id}"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              data-bs-post-id="${post.id}"
              class="button product_type_simple add_to_cart_button ajax_add_to_cart octf-btn octf-btn-primary octf-btn-icon"
              >Vote <i class="fa-solid fa-thumbs-up"></i
            ></a>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="flex-row lol-margin justify-content-start">
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
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12 sm-m-b40">
          <div class="service-box-s2 s-box service-box-s2-bg2">
            <div class="content-box">
              <h5>City: ${post.city}</h5>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12">
          <div class="service-box-s2 s-box service-box-s2-bg3">
            <div class="content-box">
              <h5>Displayed Name: ${post.displayName}</h5>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12">
          <div class="service-box-s2 s-box service-box-s2-bg3">
            <div class="content-box">
              <h5>Vote Count: ${post.votes}</h5>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12">
          <div class="service-box-s2 s-box service-box-s2-bg3">
            <div class="content-box" style="word-break: break-word">
              <h5>Post Link: ${window.location.href}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
`;
};

const getPost = async () => {
  const id = new URL(window.location.href).searchParams.get("id");

  if (!id) {
    alert("Post not found");
    window.location.href = "/";
    return;
  }

  const postDiv = document.getElementById("post-details");

  const res = await fetch(`${apiUrl}/posts/${id}`);

  if (!res.ok) return;

  const postData = await res.json();
  document.getElementById("display-name").innerHTML = postData.displayName;
  document.getElementById("vote-count").innerHTML = `${postData.votes} Votes`;
  document.getElementById("user-name").innerHTML = postData.name;
  document.getElementById("user-category").innerHTML = postData.category;
  document.getElementById("user-city").innerHTML = postData.city;
  document.getElementById("user-link").innerHTML = window.location.href;
  document
    .getElementById("display-image")
    .setAttribute("src", postData.imageLink);
  document
    .getElementById("user-vote-btn")
    .setAttribute("data-bs-post-id", postData.id);
};

window.onload = getPost();
