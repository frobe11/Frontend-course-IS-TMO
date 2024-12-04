document.getElementById('fetch-images').addEventListener('click', async () => {
    const channelTag = 'sanyaich';
    const response = await fetch(`http://localhost:1489/fetch-images/${channelTag}`, {
        method: 'GET',
        mode: 'cors'
    });
    const images = await response.json();

    const imagesContainer = document.getElementById('images');
    imagesContainer.innerHTML = '';
    let count = 0;
    images.sort((first, second) => first.rating - second.rating).forEach(image => {
        const div = document.createElement('div');
        div.className = `content__section content__section_text-centered content__section_padding-l ${count % 2 == 0 ? 'bg-color_coders-gray color_coders-green': 'color_coders-gray bg-color_coders-green'}`;
        div.innerHTML = `
            <img width="60%" height="40%" src="\\tg-photo-fetcher\\${image.filePath}">
            <p>
            <h>${image.caption || 'Без подписи'}</h>
            <p>Рейтинг: ${image.rating}</p>
        `;
        imagesContainer.appendChild(div);
        count++;
    });
});