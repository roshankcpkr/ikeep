
// script for theme-container
let btn = document.getElementById("switch");
let svg = document.querySelector(".svg");
let path = document.querySelector(".path");
let group = document.querySelector("g");
let defaultColor = document.getElementById("default");
let notes = document.querySelectorAll(".note");

let theme = localStorage.getItem("theme");
console.log(theme);

if (theme === "dark") {
  localStorage.setItem("theme", "dark");
  document.querySelector("body").setAttribute("data-theme", "dark");
  svg.setAttribute("stroke", "#fff");
  group.style.display = "block";
  path.style.display = "none";
  theme = "light";
  defaultColor.setAttribute("data-color", "black");
  notes.forEach((note) => {
    note.style.backgroundColor = "black";
  });
} else {
    localStorage.setItem("theme", "light");
    document.querySelector("body").removeAttribute("data-theme", "dark");
    svg.setAttribute("stroke", "#212121");
    group.style.display = "none";
    path.style.display = "block";
    theme = "dark";
    defaultColor.setAttribute("data-color", "white");
    notes.forEach((note) => {
        note.style.backgroundColor = "white";
        note.style.color = "black";
    });
}

btn.addEventListener("click", () => {
    if (theme === "dark") {
        localStorage.setItem("theme", "dark");
        document.querySelector("body").setAttribute("data-theme", "dark");
        svg.setAttribute("stroke", "#fff");
        group.style.display = "block";
        path.style.display = "none";
        theme = "light";
        defaultColor.setAttribute("data-color", "black");
        notes.forEach((note) => {
            note.style.backgroundColor = "black";
            note.style.color = "black";
        });
    } else {
        localStorage.setItem("theme", "light");
    document.querySelector("body").removeAttribute("data-theme", "dark");
    svg.setAttribute("stroke", "#212121");
    group.style.display = "none";
    path.style.display = "block";
    theme = "dark";
    defaultColor.setAttribute("data-color", "white");
    notes.forEach((note) => {
        note.style.backgroundColor = "white";
        note.style.color = "black";
    });
}
});

if (theme === "undefined") {
    theme = "light";
    defaultColor.setAttribute("data-color", "white");
    notes.forEach((note) => {
      note.style.backgroundColor = "white";
      note.style.color = "black";
    });
};
