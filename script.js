const addButtonElement = document.getElementById("add-button");
const addFormElement = document.getElementById("add-form");
const nameInputElement = document.getElementById("name-input");
const commentAreaElement = document.getElementById("comment-area");
const commentsList = document.getElementById("comments-list");

const comments = [
  {
    userName: "Глеб Фокин",
    time: "12.02.22 12:18",
    commentText: "Это будет первый комментарий на этой странице",
    likes: "3",
    isLiked: "",
  },
  {
    userName: "Варвара Н.",
    time: "13.02.22 19:22",
    commentText: "Мне нравится как оформлена эта страница! ❤",
    likes: "75",
    isLiked: "-active-like",
  },
];

nameInputElement.addEventListener('input', handleInputChange);
commentAreaElement.addEventListener('input', handleInputChange);

function handleInputChange() {
  const name = nameInputElement.value.trim();
  const comment = commentAreaElement.value.trim();

  if (name !== '' && comment !== '') {
    addButtonElement.disabled = false;
    addButtonElement.classList.remove('error');
  } else {
    addButtonElement.disabled = true;
    addButtonElement.classList.add('error');
  }
}

const answerOnComment = () => {
  const commentsElement = document.querySelectorAll(".comment");

  for (const commentElement of commentsElement) {
    commentElement.addEventListener("click", () => {
      const commentIndex = commentElement.dataset.index
      
      author = comments[commentIndex].userName;
      authorComment = comments[commentIndex].commentText;

      commentAreaElement.innerHTML = `QUOTE_BEGIN ${author} + ${authorComment} QUOTE_END`;
  
  
      renderComments();
    });
  }
};

const likeComments = () => {
  const likeButtonsElement = document.querySelectorAll(".like-button")
  
  for (const likeButtonElement of likeButtonsElement) {
    likeButtonElement.addEventListener("click", (event) => {
      event.stopPropagation(); 
      const likeIndex = likeButtonElement.dataset.index;

      if (comments[likeIndex].isLiked) {
        comments[likeIndex].likes--;
        comments[likeIndex].isLiked = "";
      } else {
        comments[likeIndex].likes++;
        comments[likeIndex].isLiked = "-active-like";
      }

      renderComments();
    });
  }

};

const deleteComments = () => {
  const deleteButtonElement = document.getElementById("delete-button");

  deleteButtonElement.addEventListener("click", () => {
    comments.pop();
    renderComments();
  });
};


commentAreaElement.addEventListener("keyup", function(event) {
  if (event.key === 'Enter') {
    addComment();
  }
});

addButtonElement.addEventListener("click", addComment);

const renderComments = () => {
  const commentsHtml = comments
    .map((comment, index) => {
      return `<li data-index="${index}" class="comment">
      <div class="comment-header">
        <div>${comment.userName}</div>
        <div>${comment.time}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${comment.commentText}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button data-index="${index}" class="like-button ${comment.isLiked}"></button>
        </div>
      </div>
      </li>`
    })
    .join("");

  commentsList.innerHTML = commentsHtml;

  likeComments();
  answerOnComment();

};

renderComments();
likeComments();
answerOnComment();
deleteComments();

function addComment() {
  const oldCommentsListHtml = commentsList.innerHTML;
  const name = nameInputElement.value.trim();
  const comment = commentAreaElement.value.trim();

  if (name !== '' && comment !== '') {

    const formattedDateTime = new Date().toLocaleString('ru-Ru', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    comments.push({
      userName: nameInputElement.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
      commentText: commentAreaElement.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
        .replaceAll("QUOTE_END", "</div>"),
      time: `${formattedDateTime}`,
      likes: 0,
      isLiked: "",
    });

    renderComments();

    nameInputElement.value = '';
    commentAreaElement.value = '';
    addButtonElement.disabled = true;
    addButtonElement.classList.add('error');
  }
}

