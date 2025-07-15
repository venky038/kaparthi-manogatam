const BACKEND_URL = "https://kaparthi-manogatam.onrender.com";

const videoList = document.getElementById("videoList");
const shortsList = document.getElementById("shortsList");
const searchInput = document.getElementById("search");

async function fetchVideos() {
  try {
    const res = await fetch(`${BACKEND_URL}/videos`);
    const data = await res.json();

    data.forEach(video => {
      const title = video.title;
      const videoId = video.videoId;
      const duration = video.duration;

      const isShort = duration <= 60;
      const container = isShort ? shortsList : videoList;

      const videoEl = document.createElement("div");
      videoEl.className = "video-item";
      videoEl.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${videoId}" title="${title}" allowfullscreen></iframe>
        <span>${title}</span>
      `;
      container.appendChild(videoEl);
    });

  } catch (err) {
    console.error("Error fetching videos:", err);
  }
}

async function fetchShortsFromPlaylist() {
  try {
    const res = await fetch(`${BACKEND_URL}/shorts`);
    const data = await res.json();

    data.forEach(item => {
      const videoId = item.videoId;
      const title = item.title;

      const videoEl = document.createElement("div");
      videoEl.className = "video-item";
      videoEl.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${videoId}" title="${title}" allowfullscreen></iframe>
        <span>${title}</span>
      `;
      shortsList.appendChild(videoEl);
    });

  } catch (error) {
    console.error("Error fetching Shorts:", error);
  }
}

searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const allVideos = document.querySelectorAll(".video-item");
  allVideos.forEach(v => {
    const title = v.innerText.toLowerCase();
    v.style.display = title.includes(query) ? "block" : "none";
  });
});

fetchVideos();
fetchShortsFromPlaylist();
