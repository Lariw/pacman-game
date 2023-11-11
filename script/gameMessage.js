const gameMessage = document.querySelector(".js-gameMessage");
const closeMessageBtn = document.querySelector(".js-closeGameMessage");
const nextLvBtn = document.querySelector('.js-gameMessage__nextLV');

closeMessageBtn.addEventListener("click", () => {
  gameMessage.style.display = "none";
});

const showGameMessage = () => {
  gameMessage.style.display = "block";
};

nextLvBtn.addEventListener('click', ()=> {
    location.reload();
})