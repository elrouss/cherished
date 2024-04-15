const WINDOW_WIDTH = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;

const question = document.querySelector(".question");
const answer = document.querySelector(".answer");

const btns = question.querySelector(".buttons");
const yesBtn = btns.querySelector(".btn_yes");
const noBtn = btns.querySelector(".btn_no");

const audio = document.querySelector(".audio");

const btnsInitialWidth = btns.getBoundingClientRect().width;
noBtn.style.top = `${Math.floor(noBtn.getBoundingClientRect().top)}px`;
noBtn.style.left = `${Math.floor(noBtn.getBoundingClientRect().left)}px`;

const onMouseClick = () => {
  question.style.display = "none";
  answer.style.display = "block";
};

const onMouseOver = () => {
  const coords = countCoords();

  noBtn.style.position = "absolute";
  noBtn.style.top = coords.y;
  noBtn.style.left = coords.x;

  btns.style.width = `${btnsInitialWidth}px`;
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

yesBtn.addEventListener("click", onMouseClick);
noBtn.addEventListener("mouseover", onMouseOver);
audio.addEventListener("click", onAudioPlay);
