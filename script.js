const $ = id => document.getElementById(id);
const music = $("music");

function loadConfig() {
  $("introTitle").textContent = CONFIG.introTitle;
  $("introSubtitle").textContent = CONFIG.introSubtitle;
  $("birthdayTitle").textContent = CONFIG.birthdayTitle;
  $("birthdayText").textContent = CONFIG.birthdayText;
  $("letterTitle").textContent = CONFIG.letterTitle;
  $("letterText").textContent = CONFIG.letterText;
  $("memoriesTitle").textContent = CONFIG.memoriesTitle;
  $("memoriesSubtitle").textContent = CONFIG.memoriesSubtitle;
  $("playlistTitle").textContent = CONFIG.playlistTitle;
  $("playlistSubtitle").textContent = CONFIG.playlistSubtitle;
  $("finalTitle").textContent = CONFIG.finalTitle;
  $("finalText").textContent = CONFIG.finalText;
  $("senderName").textContent = CONFIG.senderName;

  music.src = "assets/music/" + CONFIG.musicFile;
  $("songName").textContent = CONFIG.musicFile.replace(/\.[^/.]+$/, "");

  const gallery = $("gallery");
  CONFIG.photos.forEach((file, i) => {
    const div = document.createElement("div");
    div.className = "photo";
    div.innerHTML = `<img src="assets/images/${file}" alt="Memory ${i+1}" onerror="this.style.opacity=.15">`;
    gallery.appendChild(div);
  });
}

function unlock() {
  if ($("password").value === CONFIG.password) {
    $("lockScreen").classList.remove("active");
    $("lockScreen").style.display = "none";
    $("mainContent").classList.remove("hidden");
    window.scrollTo(0,0);
    startHearts();
  } else {
    $("wrong").textContent = "Wrong password ♡ Try again.";
    $("password").animate([
      {transform:"translateX(-6px)"},{transform:"translateX(6px)"},{transform:"translateX(0)"}
    ], {duration:220});
  }
}

$("password").addEventListener("keydown", e => {
  if (e.key === "Enter") unlock();
});

function toggleMusic() {
  if (music.paused) {
    music.play().then(() => {
      $("musicText").textContent = "Pause our song";
      $("record").classList.add("playing");
    }).catch(() => {
      $("musicText").textContent = "Tap again to play";
    });
  } else {
    music.pause();
    $("musicText").textContent = "Play our song";
    $("record").classList.remove("playing");
  }
}

function startHearts() {
  setInterval(() => {
    const h = document.createElement("span");
    h.className = "heart";
    h.textContent = Math.random() > .5 ? "♡" : "✦";
    h.style.left = Math.random()*100 + "vw";
    h.style.animationDuration = (5 + Math.random()*5) + "s";
    h.style.fontSize = (12 + Math.random()*18) + "px";
    $("hearts").appendChild(h);
    setTimeout(() => h.remove(), 11000);
  }, 650);
}

loadConfig();
