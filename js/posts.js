const getPost = async () => {
  const id = new URL(window.location.href).searchParams.get("id");

  if (!id) {
    alert("Post not found");
    window.location.href = "/";
    return;
  }

  const res = await fetch(`${apiUrl}/posts/${id}`);

  if (!res.ok) {
    alert("Post not found");
    window.location.href = "/";
    return;
  }
  const voteButton = document.getElementById("user-vote-btn");

  voteButton.disabled = true;
  const postData = await res.json();
  document.getElementById("display-name").innerHTML = postData.displayName;
  document.getElementById("vote-count").innerHTML = `${postData.votes} Votes`;
  document.getElementById("user-name").innerHTML = postData.name;
  document.getElementById("user-country").innerHTML = postData.country;
  document.getElementById("user-link").innerHTML = window.location.href;
  document
    .getElementById("display-image")
    .setAttribute("src", postData.imageLink);
  voteButton.setAttribute("data-bs-post-id", postData.id);
  voteButton.disabled = false;
};

window.onload = getPost();
