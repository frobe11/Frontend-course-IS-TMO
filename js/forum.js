document.addEventListener("DOMContentLoaded", function () {
  const nickHolder = document.getElementById("nickname");
  nickname = localStorage.getItem("nickname");
  if (nickname) {
    nickHolder.value = nickname
  }
});

document
  .getElementById("og-forum-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
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
    const container = document.getElementById("og-messages-container");
    
    localStorage.removeItem("nickname")
    localStorage.setItem("nickname", nickname);
    
    const newMessage = document.createElement("div");
    newMessage.classList.add("message");
    newMessage.classList.add("bg-color_coders-gray");
    newMessage.classList.add("color_coders-green");
    const photo = `<img class="message__image" src="${messageImageUrl}">`;
    console.log(messageImageUrl ? photo : "");
    newMessage.innerHTML = `
        <h2 class="message__theme">${theme}</h2>
        <p class="message__text">${messageText}</p>

        ${messageImageUrl ? photo : ""}

        <div class="message__footer">
            <p class="message__nickname">${nickname}</p>
            <img class="message__avatar" src="${avatarUrl}" style="max-width: 108px; height: 108px">
        </div>
        
        
    `;

    container.appendChild(newMessage);

  });
