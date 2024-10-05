function createMerchCard(item) {
    // Create the outer div with class 'relative'
    const merchDiv = document.createElement('div');
    merchDiv.classList.add('relative');

    // Create the img element
    const imgElement = document.createElement('img');
    imgElement.src = item.img;

    // Create the inner div with class and content
    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('bg-[rgba(47,65,91,0.8)]', 'text-center', 'text-hat', 'p-2', 'pb-5', 'leading-6');

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
    const title = item.pictureName + " - " + item.authorName
    const pictureSize = item.pictureSize
    const price = item.price
    // const image = item.image

    const image = "gallery/" + item.id + ".JPG"
    // const image = "gallery/2.JPG"


    const galleryDiv = document.createElement('div');
    galleryDiv.classList.add('gallery-item', 'relative');

    // Create the image element
    const img = document.createElement('img');
    img.classList.add('protect-image');
    img.src = image; // Assuming content.json contains image URLs
    galleryDiv.appendChild(img);

    // Create description div
    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('bg-[rgba(47,65,91,0.8)]', 'text-center', 'text-hat', 'p-2', 'pb-5', 'leading-6');
    descriptionDiv.innerHTML = `<strong>${title}</strong><br />${pictureSize}<br />${price}`;
    galleryDiv.appendChild(descriptionDiv);

    // Create button div
    const buttonDiv = document.createElement('div');
    buttonDiv.style.display = 'flex';
    buttonDiv.style.justifyContent = 'center';

    // Create the Buy button
    const buyButton = document.createElement('button');
    buyButton.classList.add('block', 'bg-hat', 'hover:bg-orange-400', 'text-white', 'text-lg', 'py-2', 'px-4', 'rounded', 'leading-6', 'w-full');
    buyButton.style.width = '100%';
    buyButton.textContent = 'Buy';

    // Step 4: Add event listener to redirect when clicked
    galleryDiv.addEventListener('click', () => {
        window.location.href = `https://vpdfo.org/gallery/${item.id}`;
    });

    // Step 5: Redirect to a static page when clicking the buy button
    buyButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Stop event bubbling to the parent div
        window.location.href = 'https://www.crowdfunder.co.uk/p/ukraine-can-win-vpdfo-2024';
    });

    // Append the button to buttonDiv
    buttonDiv.appendChild(buyButton);
    galleryDiv.appendChild(buttonDiv);

    return galleryDiv;
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("document.addEventListener")
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

            // Loop through the data and create child divs
            data.forEach(item => {
                const card = createMerchCard(item);
                merchContainer.appendChild(card);
            });
        })
        .then(data => {
            let allImages = document.querySelectorAll("img");
            allImages.forEach((value) => {
                value.oncontextmenu = (e) => {
                    e.preventDefault();
                }
            })
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

    fetch('gallery/content.json')
        .then(response => {
            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Get the container where the merchandise will be added
            const merchContainer = document.getElementById('gallery-container');

            // Loop through the data and create child divs
            data.forEach(item => {
                const card = createGalleryCard(item);
                merchContainer.appendChild(card);
            });
        })
        .then(data => {
            let allImages = document.querySelectorAll("img");
            allImages.forEach((value) => {
                value.oncontextmenu = (e) => {
                    e.preventDefault();
                }
            })
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});


// document.addEventListener('DOMContentLoaded', async () => {
//     try {
//         // Step 2: Fetch data from content.json
//         const response = await fetch('gallery/content.json');
//         const galleryItems = await response.json();
//
//         const galleryContainer = document.getElementById('gallery-container');
//
//         // Step 3: Loop through galleryItems and create child divs
//         galleryItems.forEach(item => {
//             // Append the galleryDiv to the galleryContainer
//             galleryContainer.appendChild(galleryDiv);
//         });
//     } catch (error) {
//         console.error('Error fetching or processing gallery content:', error);
//     }
// });
