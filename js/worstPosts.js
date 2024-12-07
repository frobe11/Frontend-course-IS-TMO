import { requestImages } from "./requestImages.js";
import { createImageElement } from "./createImageElement.js";

const channelTag = "sanyaich";
const step = 10;
const sort = -1;
const fetchButton = document.getElementById("fetch-images")
let count = 0;


document.addEventListener("DOMContentLoaded", async () => {
    fetchButton.classList.add("button_hidden")
    const imagesContainer = document.getElementById("imagesId");
    const preloaderContainer = document.getElementById("preloader");
    localStorage.setItem("end", 0);
  
    const preloader = document.createElement("img");
    preloader.src = "images/preloader.gif";
    preloaderContainer.appendChild(preloader);
  
  
    const images = await requestImages(channelTag, 0, step, sort);
  
    preloaderContainer.removeChild(preloaderContainer.firstChild);
  
    images.forEach((image) => {
      const div = createImageElement(image, count);
      imagesContainer.appendChild(div);
      count++
    });
    fetchButton.classList.remove("button_hidden")
    localStorage.setItem("end", step);
  });
  
  fetchButton.addEventListener("click", async () => {
    fetchButton.classList.add("button_hidden")
    const start = Number(localStorage.getItem("end"));
    const end = start + step;
    const imagesContainer = document.getElementById("imagesId");
    const preloaderContainer = document.getElementById("preloader");
  
    const preloader = document.createElement("img");
    preloader.src = "images/preloader.gif";
    preloaderContainer.appendChild(preloader);
  
  
    const images = await requestImages(channelTag, start, end, sort);
  
    preloaderContainer.removeChild(preloaderContainer.firstChild);
  
    images.forEach((image) => {
      const div = createImageElement(image, count);
      imagesContainer.appendChild(div);
      count++
    });
    fetchButton.classList.remove("button_hidden")
    localStorage.setItem("end", end);
  });