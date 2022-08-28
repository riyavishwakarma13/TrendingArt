const getPost = async () => {
  const number = window.location.hash.substring(1);

  const res = await fetch(`${apiUrl}/posts/${number}`);

  if (res.ok) {
    document.write(JSON.stringify(await res.json()));
  } else {
    alert("Post not found");
    window.location.href = "/";
  }
};

window.addEventListener("hashchange", async (e) => {
  getPost();
});

window.onload = getPost();
