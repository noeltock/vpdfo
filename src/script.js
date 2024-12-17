function createMerchCard(item) {
    // Create the outer div with class 'relative'
    const merchDiv = document.createElement('div');
    merchDiv.classList.add('relative');

    // Create the img element
    const imgElement = document.createElement('img');
    imgElement.src = item.img;

    // Create the inner div with class and content
    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('bg-[rgba(47,65,91,0.8)]', 'text-center', 'text-hat', 'p-2', 'pb-8', 'leading-6');

    // Create the content for the inner div
    const strongElement = document.createElement('strong');
    strongElement.textContent = item.name;

    const breakElement = document.createElement('br');

    const priceText = document.createTextNode(item.price);

    // Append elements to the inner div
    detailsDiv.appendChild(strongElement);
    detailsDiv.appendChild(breakElement);
    detailsDiv.appendChild(priceText);

    // Append the img and details div to the outer div
    merchDiv.appendChild(imgElement);
    merchDiv.appendChild(detailsDiv);

    return merchDiv;
}

var i = 0

function createGalleryCard(item) {
    const title = item.pictureName;
    const pictureSize = item.pictureSize;
    const price = item.price;
    const authorName = item.authorName;
    const pictureDescription = item.pictureDescription;
    const bio = item.bio;
    const image = "gallery/" + item.id + ".jpg"; // Здесь используется полное изображение для попапа

    const galleryDiv = document.createElement('div');
    galleryDiv.classList.add('gallery-item', 'relative');


    const img = document.createElement('img');
    img.classList.add('protect-image','gallery-image');
    img.src = image;
//    galleryDiv.appendChild(img); // Сначала добавляем изображение

    const imageContainerDiv = document.createElement('div');
    imageContainerDiv.classList.add('image-container');
    imageContainerDiv.appendChild(img);
    galleryDiv.appendChild(imageContainerDiv);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('bg-[rgba(0,0,0,0.8)]', 'text-center', 'text-hat', 'p-2', 'pb-5', 'leading-6');
    descriptionDiv.innerHTML = `<strong>${title}</strong><br /><p class="italic">${authorName}</p>${pictureSize}<br />${price}`;

    galleryDiv.appendChild(descriptionDiv); // Добавляем описание и кнопки под изображением

    // Создаём popup
    const popup = document.createElement('div');
    popup.classList.add(
        'fixed',
        'top-0',
        'left-0',
        'w-full',
        'h-full',
        'bg-black',
        'bg-opacity-75',
        'hidden',
        'flex',
        'items-center',
        'justify-center',
        'z-50'
    );
    popup.innerHTML = `
        <div class="bg-black p-5 rounded-lg w-full lg:max-w-7xl h-auto max-h-full overflow-auto shadow-lg relative">
                <div class="flex flex-col md:flex-row w-full">
                    <img class="w-full md:w-1/2 h-auto max-h-60 object-contain mb-4 md:mb-0" src="${image}" alt="${title}" />
                    <div class="w-full md:w-1/2 md:ml-4 text-center md:text-left">
                        ${title ? `<strong class="text-[2rem] md:text-[3rem] font-extrabold font-staat -skew-y-2 inline-block text-hat">${title}</strong><br/>` : ''}
                        ${authorName ? `<strong class="text-[2rem] md:text-[3rem] font-extrabold font-staat -skew-y-2 inline-block">${authorName}</strong><br/>` : ''}
                        ${pictureSize ? `<p><strong>Size:</strong> ${pictureSize}</p>` : ''}
                        ${price ? `<p><strong>Price:</strong> ${price}</p>` : ''}
                        ${bio ? `<p class="mt-2"><strong>Artist Bio:</strong> ${bio}</p>` : ''}
                        ${pictureDescription ? `<p class="mt-2"><strong>Description:</strong> ${pictureDescription}</p>` : ''}
                        <div class="flex flex-col md:flex-row justify-between mt-4 space-y-4 md:space-y-0 md:space-x-4">
                            <button class="bg-hat hover:bg-orange-400 text-white text-sm py-2 px-4 rounded w-full md:w-48" onclick="window.location.href='https://send.monobank.ua/jar/8QfVSfKFoi'">Donate, UAH</button>
                            <button class="bg-hat hover:bg-orange-400 text-white text-sm py-2 px-4 rounded w-full md:w-48" onclick="window.location.href='https://www.crowdfunder.co.uk/p/ukraine-can-win-vpdfo-2024'">Donate, $/£</button>
                        </div>
                    </div>
                </div>
                <button class="absolute top-2 right-2 text-white bg-black hover:bg-gray-700 p-2 rounded-full close-btn">X</button>
            </div>
    `;

    galleryDiv.addEventListener('click', () => {
        popup.classList.remove('hidden');
        document.body.appendChild(popup);
    });

    popup.addEventListener('click', (event) => {
        if (event.target.classList.contains('close-btn') || event.target === popup) {
            popup.classList.add('hidden');
            popup.remove();
        }
    });

    return galleryDiv;
}



// Global function to close popup
document.addEventListener("DOMContentLoaded", () => {
    console.log("document.addEventListener");

    // Fetch the content.json from the 'merch' folder
    fetch('merch/content.json')
        .then(response => {
            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Get the container where the merchandise will be added
            const merchContainer = document.getElementById('merch-container');

            // Ensure the container exists before appending
            if (merchContainer) {
                // Loop through the data and create child divs
                data.forEach(item => {
                    const card = createMerchCard(item);
                    merchContainer.appendChild(card);
                });
            } else {
                console.error('Merch container not found.');
            }
        })
        .then(() => {
            let allImages = document.querySelectorAll("img");
            allImages.forEach((value) => {
                value.oncontextmenu = (e) => {
                    e.preventDefault();
                }
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

    // Fetch the content.json from the 'gallery' folder
    fetch('gallery/content.json')
        .then(response => {
            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Get the container where the gallery will be added
            const galleryContainer = document.getElementById('gallery-container');

            // Ensure the container exists before appending
            if (galleryContainer) {
                // Loop through the data and create child divs
                data.forEach(item => {
                    const card = createGalleryCard(item);
                    galleryContainer.appendChild(card);
                });
            } else {
                console.error('Gallery container not found.');
            }
        })
        .then(() => {
            let allImages = document.querySelectorAll("img");
            allImages.forEach((value) => {
                value.oncontextmenu = (e) => {
                    e.preventDefault();
                }
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});
