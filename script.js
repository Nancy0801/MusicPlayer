let progress = document.getElementById('progress');
let song = document.getElementById('song');
let icon = document.getElementById('icon');
let backIcon = document.getElementById('back');
let forIcon = document.getElementById('for');
let prev = document.getElementById('prev');
let next = document.getElementById('next');
let artist = document.getElementById('artist');
let img = document.querySelector('img');

const songList = [
    {
        title: "Let Her Go",
        artist: "Let Her Go(Passenger)"
    },
    {
        title: "Perfect",
        artist: "Perfect(Ed Shreen)"
    }
];

song.onloadedmetadata = function(){
    progress.max = song.duration;
    progress.value = song.currentTime;
}

function playPause(){
    if(icon.classList.contains("fa-pause")){
        song.pause();
        icon.classList.remove("fa-pause");
        icon.classList.add("fa-play");
    }
    else{
        song.play();
        icon.classList.add("fa-pause");
        icon.classList.remove("fa-play ");
    }
}

if(song.play()){
    setInterval(()=>{
        progress.value = song.currentTime;
    },500);
}

progress.onchange = function(){
    song.play();
    song.currentTime = progress.value;
    icon.classList.add("fa-pause");
    icon.classList.remove("fa-play");
}

function backward(){
    if(backIcon.classList.contains("fa-backward")){
        if(song.currentTime >= 10){
            song.currentTime = song.currentTime - 10;
        }
        else{
            song.currentTime = 0;
        }
    }
}

function forward(){
    // console.log("Forward function called");
    // console.log("ChangeIcon classes:", forIcon.classList);

    if(forIcon.classList.contains("fa-forward")){
        // console.log("Icon has 'fa-forward' class");
        if(song.currentTime <= song.duration-10){
            // console.log("Adjusting currentTime by 10 seconds forward");
            song.currentTime = song.currentTime + 10;
        }
        else{
            // console.log("Setting currentTime to the end of the song");
            song.currentTime = song.duration;
        }
    }
}

const loadSong = (songList) => {
    artist.textContent = songList.artist;
    song.src = `media/${songList.title}.mp3`;
    img.src = `media/${songList.title}.jpeg`;
}

// loadSong(songList[1]);
let songIndex = 0;

const nextSong = () => {
    songIndex = (songIndex + 1) % songList.length;
    loadSong((songList[songIndex]) );
    song.play();
    icon.classList.add("fa-pause");
    icon.classList.remove("fa-play");
    // playPause();
}
const prevSong = () => {
    songIndex = (songIndex - 1 + songList.length)% songList.length ;
    loadSong((songList[songIndex] ) );
    song.play();
    icon.classList.add("fa-pause");
    icon.classList.remove("fa-play");
    // playPause();
}

next.addEventListener("click" , nextSong);
prev.addEventListener("click" , prevSong);
