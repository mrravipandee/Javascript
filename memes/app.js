const image = document.querySelector("#image");
const btnNext = document.querySelector("#next");
const btnShare = document.querySelector("#share");

const generateMemes = () => {
    const apiUrl = "https://meme-api.com/gimme/wholesomememes";
    fetch(apiUrl)
        .then(response => {
            if (response.ok) {  // Corrected condition
                return response.json();
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        })
        .then(data => {
            // console.log(data);
            // Assuming 'image' is an <img> element, you can set the 'src' attribute
            image.src = data.url;
            // console.log(data.url);
        })
        .catch(error => {
            console.error("Fetch error", error);
        });
}

btnNext.addEventListener("click", generateMemes);

btnShare.addEventListener("click", () => {
    if (navigator.share && currentMemeData) {
        navigator.share({
            title: 'Check out this meme!',
            text: 'Found this awesome meme using the Meme App!',
            url: currentMemeData.url,
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing:', error));
    } else {
        console.log('Web Share API not supported or meme data not available.');
        // Fallback for browsers that do not support Web Share API
        // You can implement your own custom sharing functionality here
    }
});