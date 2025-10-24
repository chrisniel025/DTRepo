const backgroundColor = document.getElementById("backgroundColor");
const backgroundColorButton = document.getElementById("backgroundColorButton");
const backgroundColorInput = document.getElementById("backgroundColorInput");

const file = document.getElementById("file");
const image = document.getElementById("image");

const title = document.getElementById("title");
const description = document.getElementById("description");
const div = document.getElementById("div");
const heading = div.querySelector("h4");
const paragraph = div.querySelector("p");
const fontColor = document.getElementById("fontColor");

backgroundColorButton.addEventListener("click", () => {
  backgroundColorInput.showPicker();
});

backgroundColorInput.addEventListener("input", () => {
  const selectedColor = event.target.value;
  backgroundColor.style.backgroundColor = selectedColor;
});

file.addEventListener("change", function () {
  const fileUploaded = file.files[0];

  if (fileUploaded) {
    const newImage = URL.createObjectURL(fileUploaded);
    image.src = newImage;

    image.onload = () => {
      URL.revokeObjectURL(newImage);
    };
  }
});

title.addEventListener("input", () => {
  const newTitle = title.value.trim();

  if(newTitle === "") {
    heading.textContent = "Title";
  } else {
    heading.textContent = newTitle;
  }
});

description.addEventListener("input", () => {
  const newDescription = description.value.trim();

  if(newDescription === "") {
    paragraph.textContent = "Description";
  } else {
    paragraph.textContent = newDescription;
  }
});

fontColor.addEventListener("input", () => {
  const selectedColor = event.target.value;

  heading.style.color = selectedColor;
  paragraph.style.color = selectedColor;
});