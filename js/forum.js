document.addEventListener("DOMContentLoaded", function () {
  const nickHolder = document.getElementById("nickname");
  nickname = localStorage.getItem("nickname");
  if (nickname) {
    nickHolder.value = nickname;
  }
});

document
  .getElementById("og-forum-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const container = document.getElementById("og-messages-container");

    const theme = document.getElementById("theme").value
      ? document.getElementById("theme").value
      : "Без темы";

    const messageText = document.getElementById("message-text").value;

    const messageImage = document.getElementById("message-image").files[0];
    const messageImageUrl = messageImage
      ? URL.createObjectURL(messageImage)
      : undefined;

    const nickname = document.getElementById("nickname").value
      ? document.getElementById("nickname").value
      : "anon";

    const avatar = document.getElementById("avatar").files[0];
    const avatarUrl = avatar
      ? URL.createObjectURL(avatar)
      : "images/anon_ava.png";

    localStorage.removeItem("nickname");
    localStorage.setItem("nickname", nickname);

    const newMessage = document.createElement("div");
    newMessage.classList.add("message");
    newMessage.classList.add("bg-color_coders-gray");
    newMessage.classList.add("color_coders-green");

    const themeEl = document.createElement("h2");
    themeEl.classList.add("message__theme");
    themeEl.textContent = theme;

    const messageTextEl = document.createElement("p");
    messageTextEl.classList.add("message__text");
    messageTextEl.textContent = messageText;

    const messageImageEl = document.createElement("img");
    messageImageEl.classList.add("message__image");
    messageImageEl.src = messageImageUrl;

    const nicknameEl = document.createElement("p");
    nicknameEl.classList.add("message__nickname");
    nicknameEl.textContent = nickname;

    const avatarEl = document.createElement("img");
    avatarEl.classList.add("message__avatar");
    avatarEl.src = avatarUrl;

    newMessage.appendChild(themeEl);
    newMessage.appendChild(messageTextEl);
    newMessage.appendChild(messageImageEl);
    newMessage.appendChild(nicknameEl);
    newMessage.appendChild(avatarEl);

    container.appendChild(newMessage);
  });
