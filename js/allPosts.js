document.getElementById("fetch-images").addEventListener("click", async () => {
  const imagesContainer = document.getElementById("images");
  const preloader = document.createElement("img")
  preloader.src = "images/preloader.gif";
  preloader.height = "40%"
  preloader.width = "40%"
  imagesContainer.appendChild(preloader);
  const channelTag = "sanyaich";
  const response = await fetch(
    `http://localhost:1489/fetch-images/${channelTag}`,
    {
      method: "GET",
      mode: "cors",
    }
  );
  const images = await response.json();

  imagesContainer.innerHTML = "";
  let count = 0;
  images.forEach((image) => {
    const div = document.createElement("div");
    div.className = `content__section content__section_text-centered content__section_padding-l content__section_size-s ${
      count % 2 == 0
        ? "bg-color_coders-gray color_coders-green"
        : "color_coders-gray bg-color_coders-green"
    }`;
    div.innerHTML = `
            <img width="30%" height="30%" src="\\tg-photo-fetcher\\${
              image.filePath
            }">
            <p>
            <h>${image.caption || "Без подписи"}</h>
            <p>Рейтинг: ${image.rating}</p>
        `;
    imagesContainer.appendChild(div);
    count++;
  });
});
