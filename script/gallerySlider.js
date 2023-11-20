const galleryImage = document.querySelectorAll(".js-Galleryimage");
const previewImage = document.querySelector(".js-imagePreview");
const chapterText = document.querySelector(".js-chapter");
galleryImage.forEach((image) => {
  image.addEventListener("click", () => {
    previewImage.src = image.src;

    if (image.src.includes("map1")) {
      chapterText.innerText = "Chapter 1";
    } else if (image.src.includes("map2")) {
      chapterText.innerText = "Chapter 2";
    } else if (image.src.includes("map3")) {
      chapterText.innerText = "Chapter 3";
    } else {
      chapterText.innerText = "Clear map";
    }
  });
});
