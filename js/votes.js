let postId = "";
const modal = `
  <div
    class="modal fade"
    id="voucher-modal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
      <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">
        Your Voucher has been created
      </h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button>
    </div>
        <div class="modal-body mb-0 p-0">
          <div class="d-flex justify-content-center my-3">
            <img style="max-width: 95%" src="/images/voucher/1.jpg" />
          </div>
        </div>

        <div class="modal-footer justify-content-center">
          <button
            type="button"
            class="btn btn-outline-primary btn-rounded btn-md ml-4"
          >
          <a href="/images/voucher/1.jpg" download="voucher">Download Voucher</a>
          </button>
          <button
            type="button"
            class="btn btn-outline-primary btn-rounded btn-md ml-4"
            data-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
`;

const vote = async (postId, email, phone) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    postId,
    email,
    phone,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const res = await fetch(`${apiUrl}/votes/${postId}`, requestOptions);
  if (res.ok) {
    return {
      error: false,
      message: `Congratulations! You have won a Rs 500 discount coupon from Trends. Please visit your nearest Trends store to collect your coupon`,
    };
  } else {
    const errRes = await res.json();
    let msg = errRes.message;
    if (errRes.message.toLowerCase() === "something went wrong") {
      msg += " Refresh and try again";
    }
    return {
      error: true,
      message: msg,
    };
  }
};

const ValidateEmail = (mail) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
};

const handleVoteButtonClicked = async (e) => {
  e.preventDefault();
  const emailElem = document.getElementById("modal-email");
  const phoneElem = document.getElementById("modal-phone");
  const statusDiv = document.querySelector(".modal-status");

  const email = emailElem.value;

  if (!ValidateEmail(email)) {
    statusDiv.classList.add("modal-error");
    statusDiv.innerHTML = "Invalid Email";
    return;
  }

  const phone = phoneElem.value;
  const parsedPhone = parseInt(phone);
  if (phone.length !== 10 || isNaN(parsedPhone)) {
    statusDiv.classList.add("modal-error");
    statusDiv.innerHTML = "Invalid Number";
    return;
  }
  e.target.disabled = true;
  const { error, message } = await vote(postId, email, phone);
  e.target.disabled = false;
  if (error) {
    statusDiv.classList.add("modal-error");
    statusDiv.innerHTML = message;
    return;
  } else {
    statusDiv.innerHTML = message;
    // const d = document.createElement("div");
    // d.innerHTML = modal;

    // document.body.appendChild(d);

    // var myModal = new bootstrap.Modal(
    //   document.getElementById("voucher-modal"),
    //   {
    //     keyboard: false,
    //   }
    // );

    // myModal.show();
  }
};

const voteModal = document.getElementById("exampleModal");
voteModal.addEventListener("show.bs.modal", function (event) {
  const button = event.relatedTarget;
  postId = button.getAttribute("data-bs-post-id");

  if (!postId) return;

  const voteButton = document.getElementById("modal-vote-btn");
  const statusDiv = document.querySelector(".modal-status");
  statusDiv.innerHTML = "";

  voteButton.removeEventListener("click", handleVoteButtonClicked);
  voteButton.addEventListener("click", handleVoteButtonClicked);
});
