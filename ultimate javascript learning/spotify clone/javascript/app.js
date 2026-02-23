const lyriaSongs = [
  {
    title: "Badshah Ka Yaar",
    artist: "Lyria by Google",
    album: "Bhai Ka Raaj",
    genre: "Hindi Drill",
    src: "../assests/songs/Badshah_Ka_Yaar.mp4"
  },
  {
    title: "Haiwaan Dhaakad",
    artist: "Lyria by Google",
    album: "Raja Galiyon Ka",
    genre: "Hindi Drill",
    src: "../assests/songs/Haiwaan_Dhaakad.mp4"
  },
  {
    title: "Ruswa Ishq",
    artist: "Lyria by Google",
    album: "Aasmaan Ki Pukaar",
    genre: "Modern Soul / Gospel Ballad",
    src: "../assests/songs/Ruswa_Ishq.mp4"
  }
];

const trending = [
  {
    title: "Hum",
    subtitle: "Murtaza Qizilbash",
    image: "../assests/ref/trending_1.jpg",
    trackIndex: 0
  },
  {
    title: "Apology",
    subtitle: "aleemrk",
    image: "../assests/ref/trending_2.jpg",
    trackIndex: 1
  },
  {
    title: "Thinking of You",
    subtitle: "AP Dhillon",
    image: "../assests/ref/trending_3.jpg",
    trackIndex: 2
  },
  {
    title: "Tareefan",
    subtitle: "Sonu Thukral, Fukra Insaan, Kanika Mann",
    image: "../assests/ref/trending_4.jpg"
  },
  {
    title: "Khat",
    subtitle: "Navjot Ahuja",
    image: "../assests/ref/trending_5.jpg"
  }
];

const artists = [
  { title: "Pritam", subtitle: "Artist", image: "../assests/ref/artist_1.jpg" },
  { title: "Afusic", subtitle: "Artist", image: "../assests/ref/artist_2.jpg" },
  { title: "Atif Aslam", subtitle: "Artist", image: "../assests/ref/artist_3.jpg", showPlay: true },
  { title: "Shubh", subtitle: "Artist", image: "../assests/ref/artist_4.jpg" },
  { title: "Anuv Jain", subtitle: "Artist", image: "../assests/ref/artist_5.jpg" }
];

const albums = [
  { title: "Pal Pal", subtitle: "Album", image: "../assests/ref/album_1.jpg" },
  { title: "Dooriyaan", subtitle: "Single", image: "../assests/ref/album_2.jpg" },
  { title: "JHOL", subtitle: "Album", image: "../assests/ref/album_3.jpg" },
  { title: "SAFAR", subtitle: "Album", image: "../assests/ref/album_4.jpg" },
  { title: "AFSOS", subtitle: "Single", image: "../assests/ref/album_5.jpg" }
];

const radios = [
  { title: "Arijit Singh", subtitle: "With Amit Trivedi, Pritam, Jeet Gannguli and more", image: "../assests/ref/radio_1.jpg" },
  { title: "Shubh", subtitle: "With AP Dhillon, Gurinder Gill, Cheema and more", image: "../assests/ref/radio_2.jpg" },
  { title: "Talwinder", subtitle: "With Anuv Jain, Shubh, Karan Aujla and more", image: "../assests/ref/radio_3.jpg", showPlay: true },
  { title: "Diljit Dosanjh", subtitle: "With Karan Aujla, AP Dhillon, thiarajxtt and more", image: "../assests/ref/radio_4.jpg" },
  { title: "Sidhu Moose Wala", subtitle: "With Shubh, AP Dhillon, Prem Dhillon and more", image: "../assests/ref/radio_5.jpg" }
];

const charts = [
  { title: "Top Songs Global", subtitle: "Your weekly update of the most played tracks", image: "../assests/ref/chart_1.jpg" },
  { title: "Top Songs Pakistan", subtitle: "Your weekly update of the most played tracks", image: "../assests/ref/chart_2.jpg" },
  { title: "Top 50", subtitle: "Your weekly update of the most played tracks", image: "../assests/ref/chart_3.jpg" },
  { title: "Top 50", subtitle: "Your weekly update of the most played tracks", image: "../assests/ref/chart_4.jpg" },
  { title: "Viral 50", subtitle: "Your weekly update of the most viral tracks", image: "../assests/ref/chart_5.jpg" }
];

const audio = document.getElementById("audioPlayer");
let currentTrack = -1;

function createCard(item, type) {
  const card = document.createElement("article");
  card.className = `media-card ${type}-card hoverable`;
  if (item.showPlay) {
    card.classList.add("show-play");
  }

  card.innerHTML = `
    <img class="thumb" src="${item.image}" alt="${item.title}" />
    <div class="media-meta">
      <h3>${item.title}</h3>
      <p>${item.subtitle}</p>
    </div>
    <button class="play-fab" aria-label="Play"><i class="fa-solid fa-play"></i></button>
  `;

  if (typeof item.trackIndex === "number") {
    card.dataset.trackIndex = String(item.trackIndex);
  }

  return card;
}

function renderRow(targetId, items, type) {
  const row = document.getElementById(targetId);
  row.innerHTML = "";
  items.forEach((item) => row.appendChild(createCard(item, type)));
}

function updateCardPlayState() {
  document.querySelectorAll("#trendingRow .media-card").forEach((card) => {
    const idx = Number(card.dataset.trackIndex);
    const icon = card.querySelector(".play-fab i");

    if (Number.isNaN(idx)) {
      if (icon) icon.className = "fa-solid fa-play";
      card.classList.remove("active");
      return;
    }

    const isActive = idx === currentTrack && !audio.paused;
    card.classList.toggle("active", isActive);
    if (icon) {
      icon.className = isActive ? "fa-solid fa-pause" : "fa-solid fa-play";
    }
  });
}

function playTrack(trackIndex) {
  if (trackIndex < 0 || trackIndex >= lyriaSongs.length) return;

  if (currentTrack === trackIndex && !audio.paused) {
    audio.pause();
    updateCardPlayState();
    return;
  }

  currentTrack = trackIndex;
  audio.src = lyriaSongs[trackIndex].src;
  audio.play();
  updateCardPlayState();
}

function wireEvents() {
  const trendingRow = document.getElementById("trendingRow");

  trendingRow.addEventListener("click", (event) => {
    const card = event.target.closest(".media-card");
    if (!card) return;
    const idx = Number(card.dataset.trackIndex);
    if (Number.isNaN(idx)) return;
    playTrack(idx);
  });

  audio.addEventListener("pause", updateCardPlayState);
  audio.addEventListener("play", updateCardPlayState);
  audio.addEventListener("ended", () => {
    currentTrack = -1;
    updateCardPlayState();
  });
}

renderRow("trendingRow", trending, "song");
renderRow("artistsRow", artists, "artist");
renderRow("albumsRow", albums, "album");
renderRow("radioRow", radios, "radio");
renderRow("chartsRow", charts, "chart");
wireEvents();
updateCardPlayState();
