export function createImageElement(image, count) {
    const div = document.createElement("div");
    div.classList.add("content__section");
    div.classList.add("content__section_text-centered");
    div.classList.add("content__section_padding-l");
    div.classList.add("content__section_size-s");
    div.classList.add(
      `${
        count % 2 == 0
          ? "bg-color_coders-gray"
          : "bg-color_coders-green"
      }`
    );div.classList.add(
      `${
        count % 2 == 0
          ? "color_coders-green"
          : "color_coders-gray"
      }`
    );

    const img = document.createElement("img");
    img.style.width = "35vw";
    img.style.height = "auto";
    img.src = image.fileUrl;
    const padding = document.createElement("p");
    const caption = document.createElement("h");
    caption.textContent = `${image.caption || "Без подписи"}`;
    const rating = document.createElement("p");
    rating.textContent = `Рейтинг: ${image.rating}`;
    div.appendChild(img);
    div.appendChild(padding);
    div.appendChild(caption);
    div.appendChild(rating);
    return div;
  }
  