let mouseMoveTimeout;

document.addEventListener("mousemove", () => {
  document.body.style.cursor = "auto";
  clearTimeout(mouseMoveTimeout);
  mouseMoveTimeout = setTimeout(() => {
    document.body.style.cursor = "none";
  }, 2000);
});
