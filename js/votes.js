let postId = "";

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

  const res = await fetch(`${apiUrl}/votes`, requestOptions);
  if (res.ok) {
    return {
      error: false,
      message: `Vote added Successfully <br /> <p>Congratulations !!!! </p>
      <p> Your vote has been registered. </p>
      
      <p> You have been rewarded a Reliance Trends Voucher worth Rs 500/-
     <strong> Redeemable at the nearest Reliance Trends Store </strong> </p>`,
    };
  } else {
    return {
      error: false,
      message: (await res.json()).message,
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
  }
};

const voteModal = document.getElementById("exampleModal");
voteModal.addEventListener("show.bs.modal", function (event) {
  const button = event.relatedTarget;
  postId = button.getAttribute("data-bs-post-id");

  const voteButton = document.getElementById("modal-vote-btn");
  const statusDiv = document.querySelector(".modal-status");
  statusDiv.innerHTML = "";

  voteButton.removeEventListener("click", handleVoteButtonClicked);
  voteButton.addEventListener("click", handleVoteButtonClicked);
});
