// Function to fetch random texts based on the name from the URL
async function fetchRandomTexts(name) {
  try {
    const response = await fetch(`api/fetch_random_texts.php?nama=${name}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.texts;
  } catch (error) {
    console.error('Failed to fetch random texts:', error);
    return [];
  }
}

// Function to fetch background images from the server
async function fetchBackgroundImages() {
  try {
    const response = await fetch('api/fetch_background_images.php');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const images = await response.json();
    return images;
  } catch (error) {
    console.error('Failed to fetch background images:', error);
    return [];
  }
}

// Function to set a new background image with fade animation
function setBackgroundImage(url) {
  const body = document.body;
  const currentBg = body.style.backgroundImage;
  const tempBg = document.createElement('div');

  tempBg.style.backgroundImage = `url('${url}')`;
  tempBg.style.position = 'fixed';
  tempBg.style.top = 0;
  tempBg.style.left = 0;
  tempBg.style.width = '100%';
  tempBg.style.height = '100%';
  tempBg.style.zIndex = -1;
  tempBg.style.opacity = 0;
  tempBg.style.transition = 'opacity 2s';

  document.body.appendChild(tempBg);

  setTimeout(() => {
    tempBg.style.opacity = 1;
    setTimeout(() => {
      body.style.backgroundImage = `url('${url}')`;
      document.body.removeChild(tempBg);
    }, 2000);
  }, 100);
}

// Change background image every 10 seconds
async function cycleBackgroundImages() {
  const images = await fetchBackgroundImages();
  let currentIndex = 0;

  if (images.length > 0) {
    setBackgroundImage(images[currentIndex]);

    setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      setBackgroundImage(images[currentIndex]);
    }, 10000);
  }
}

// Start cycling background images
cycleBackgroundImages();

// Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('nama');

// If a name is provided in the URL, pre-fill the input field
if (name) {
  document.getElementById('nameInput').value = name;
}

// Get the elements
const namePromptContainer = document.getElementById('namePromptContainer');
const inputContainer = document.getElementById('inputContainer');
const resultContainer = document.getElementById('resultContainer');
const loadingContainer = document.getElementById('loadingContainer');
const checkAgainButton = document.getElementById('checkAgainButton');
const nameInput = document.getElementById('nameInput');
const checkButton = document.getElementById('checkButton');
const resultText = document.getElementById('resultText');
const randomText = document.getElementById('randomText');

checkButton.addEventListener('click', async () => {
  const name = nameInput.value;

  if (name.trim() === "") {
    alert("Silakan masukkan nama kamu!");
    return;
  }

  resultContainer.classList.add('hidden');
  checkAgainButton.classList.add('hidden');
  loadingContainer.classList.remove('hidden');
  namePromptContainer.classList.add('hidden');
  inputContainer.classList.add('hidden');

  const randomTexts = await fetchRandomTexts(name);

  setTimeout(() => {
    loadingContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    resultText.textContent = `Kodam Anda (${name}) adalah`;
    randomText.textContent = randomTexts.length > 0 ? randomTexts[0] : 'Tidak ada teks yang ditemukan.';
    checkAgainButton.classList.remove('hidden');
  }, 2000);
});

checkAgainButton.addEventListener('click', () => {
  resultContainer.classList.add('hidden');
  checkAgainButton.classList.add('hidden');
  namePromptContainer.classList.remove('hidden');
  inputContainer.classList.remove('hidden');
  nameInput.value = "";
  nameInput.focus();
});
