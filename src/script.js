function createCard(item) {
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

document.addEventListener("DOMContentLoaded", () => {
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
                const card = createCard(item);
                merchContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});
