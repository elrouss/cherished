const { innerWidth: WINDOW_WIDTH, innerHeight: WINDOW_HEIGHT } = window;

const form = document.querySelector(".form");
const content = document.querySelector(".content");
const question = content.querySelector(".question");
const answer = content.querySelector(".answer");

const btns = question.querySelector(".buttons");
const yesBtn = btns.querySelector(".btn_yes");
const noBtn = btns.querySelector(".btn_no");

setTimeout(() => {
  document.querySelector(".preloader").classList.add("invisible");
  document.querySelector(".wrapper").classList.remove("invisible");

  handleBtnsCoords();
  findBtnsWrapperWidth();
}, 1000);

const handleBtnsInitialWidth = () => {
  return btns.getBoundingClientRect().width;
};

const findBtnsWrapperWidth = () => {
  const width = handleBtnsInitialWidth();

  if (!width) return;
  btns.style.width = `${width}px`;
};

const handleBtnsCoords = () => {
  noBtn.style.top = `${Math.floor(noBtn.getBoundingClientRect().top)}px`;
  noBtn.style.left = `${Math.floor(noBtn.getBoundingClientRect().left)}px`;
};

const onMouseClick = () => {
  question.style.display = "none";
  answer.style.display = "block";
};

const onMouseOver = () => {
  const coords = countCoords();

  noBtn.style.position = "absolute";
  noBtn.style.top = coords.y;
  noBtn.style.left = coords.x;
};

const countCoords = () => {
  const curr = { x: noBtn.style.left, y: noBtn.style.top };
  const next = {
    x: `${Math.floor(Math.random() * WINDOW_WIDTH)}px`,
    y: `${Math.floor(Math.random() * WINDOW_HEIGHT)}px`,
  };

  if (next.x === curr.x || next.y === curr.y) {
    countCoords();
  } else {
    return next;
  }
};

const updateUrl = (query) => {
  const url = window.location.origin + "?question=" + encodeURI(query);

  history.pushState(history.state, document.title, url);
};

const getQuery = (query) => {
  return new URLSearchParams(window.location.search).get(query);
};

const updateQuestion = (question) => {
  document.querySelector(".title").textContent = question + "?";
};

const handleContent = () => {
  const question = getQuery("question");

  if (!question) return;

  updateQuestion(question);
  form.classList.add("invisible");
  content.classList.remove("invisible");
  handleBtnsCoords();
  findBtnsWrapperWidth();
};

const onSubmit = (evt) => {
  evt.preventDefault();

  const { value } = evt.target.querySelector("input");
  if (!value) return;

  updateUrl(value);
  handleContent();
};

form.addEventListener("submit", onSubmit);
yesBtn.addEventListener("click", onMouseClick);
noBtn.addEventListener("mouseover", onMouseOver);

document.addEventListener("DOMContentLoaded", handleContent);
