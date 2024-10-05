// 1. Функция для получения параметра imageId из URL
function getImageIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('imageId');
}

// 2. Функция для загрузки данных из JSON-файла
async function loadContent() {
    try {
        const response = await fetch('gallery/content.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return null;
    }
}

// 3. Функция для нахождения объекта по id
function findArtworkById(data, id) {
    return data.find(item => item.id == id);
}

// 4. Функция для вставки данных в HTML
function populatePage(artwork) {
    if (!artwork) {
        console.error('Not fount item by id');
        return;
    }

    document.getElementById('picturePreview').src = "gallery/" + artwork.id + ".jpg";
    document.getElementById('authorName').textContent = artwork.authorName;
    document.getElementById('pictureName').textContent = artwork.pictureName;
    document.getElementById('pictureDescription').textContent = artwork.pictureDescription;
    document.getElementById('pictureSize').textContent = `Size: ${artwork.pictureSize}`;
    document.getElementById('price').textContent = `Price: ${artwork.price}`;
    document.getElementById('bio').textContent = artwork.bio;
}

// 5. Основная логика скрипта
(async function() {
    const imageId = getImageIdFromUrl();  // Считываем imageId из URL
    const contentData = await loadContent(); // Загружаем данные из JSON

    if (contentData) {
        const artwork = findArtworkById(contentData, imageId); // Находим объект по id
        populatePage(artwork);  // Вставляем данные на страницу
    }
})();
