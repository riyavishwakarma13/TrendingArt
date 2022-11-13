const validateObject = joi.object({
  name: joi.string().required(),
  country: joi.string().required(),
  displayName: joi.string().required(),
  contact: joi
    .string()
    .min(10)
    .max(10)
    .required()
    .pattern(/^[6-9]{1}\d{9}/),
});
const sendPost = async (data, file) => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("country", data.country);
    formData.append("contact", data.contact);
    formData.append("displayName", data.displayName);
    formData.append("file", file, file?.name);

    const res = await fetch(`${apiUrl}/posts`, {
      method: "POST",
      body: formData,
    });
    const resData = await res.json();
    if (res.ok) {
      return {
        error: false,
        message: resData.data.id,
      };
    } else {
      console.error(resData);
      return {
        error: true,
        message: resData.message,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "something went wrong",
    };
  }
};

const initModal = ({ type, title, body }) => {
  const modal = document.querySelector(".error-modal .modal");
  const modalHeader = document.querySelector(".error-modal .modal-header");
  const modalTitle = document.querySelector(".error-modal .modal-title");
  const modalBody = document.querySelector(".error-modal .modal-body");

  modalHeader.style.backgroundColor = type === "success" ? "green" : "red";
  modalTitle.innerHTML = title;
  modalBody.innerHTML = body;
  const myModal = new bootstrap.Modal(modal);
  myModal.show();
};

const checkFile = (fileType) => {
  const filetypes = /jpeg|jpg|png|webp/;

  return filetypes.test(fileType.toLowerCase());
};

const btn = document.getElementById("submit-btn");
const form = document.getElementById("post-form");

btn.addEventListener("click", async (e) => {
    console.log("Hello");
  e.preventDefault();
  const name = document.getElementById("name");
  const contact = document.getElementById("contact");
  const country = document.getElementById("country");
  const displayName = document.getElementById("display-name");

  const file = document.getElementById("file");

  const obj = {
    name: name.value,
    contact: contact.value,
    country: country.options[country.selectedIndex].value,
    displayName: displayName.value,
  };

  if (!file.files[0]) {
    return initModal({
      type: "error",
      title: "Error",
      body: "Select a file",
    });
  }

  console.log(obj);
  if (!checkFile(file.files[0].type)) {
    return initModal({
      type: "error",
      title: "Error",
      body: "Only jpg/png/webp are allowed",
    });
  }

  if (file.files[0].size > 5000000) {
    return initModal({
      type: "error",
      title: "Error",
      body: "Image should be at most 5MB",
    });
  }

  const { error } = validateObject.validate(obj);
  if (error) {
    return initModal({
      type: "error",
      title: "Error",
      body: error.message,
    });
  }

  btn.disabled = true;
  const sendPostRes = await sendPost(obj, file.files[0]);
  if (sendPostRes.error) {
    btn.disabled = false;

    return initModal({
      type: "error",
      title: "Error in Adding Post",
      body: sendPostRes.message,
    });
  }
  btn.disabled = false;
  document.getElementById("copy-link-btn").classList.remove("d-none");
  return initModal({
    type: "success",
    title: "Share & Win!",
    body: `${location.protocol}//${location.host}/posts/?id=${sendPostRes.message}`,
  });
  btn.disabled = true;
});
