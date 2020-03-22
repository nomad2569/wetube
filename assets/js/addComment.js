import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.querySelector(".video__comment-number");

const increaseNumber = () => {
  commentNumber.innerHTML = `${parseInt(commentNumber.innerHTML, 10) +
    1} comments`;
};

const addComment = comment => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerHTML = comment;
  li.appendChild(span);
  commentList.prepend(li);
  increaseNumber();
};

const sendComment = async comment => {
  const videoId = window.location.href.split("/videos/")[1];
  console.log(videoId);
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment: comment
    }
  });
  addComment(comment);
};

function handleSubmit(event) {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
}

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}
