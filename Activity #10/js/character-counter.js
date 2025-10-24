const input = document.getElementById("char");
const show = document.getElementById("show");

input.addEventListener("input", (e) => {
  const count = e.target.value.length;
  show.textContent = "Characters: " + count;
});