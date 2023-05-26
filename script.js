// initializing variables
let songIndex = 0;
let audioElement = new Audio("Indila_-_Tourner_Dans_Le_Vide_(Jesusful.com).mp3");
let masterPlay = document.getElementById('masterPlay');
let progressbar = document.getElementById('progressbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from( document.getElementsByClassName('songitem'));


//
let songs = [
    {songName:"Tourner Dans Le Vid", filePath:"Indila_-_Tourner_Dans_Le_Vide_(Jesusful.com).mp3", coverPath:"https://img.discogs.com/yMhq4g5Vy8KiwNbwq5BOZAtlnmg=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-7654127-1446029472-1839.jpeg.jpg" },
    {songName:"Suicide", filePath:"y2mate.com - Andrew Tate ft Kris Kiss  Suicide Official Audio.mp3", coverPath:"https://i.scdn.co/image/ab67616d0000b273e935873784f108677e4a3d34"},
    {songName:"Forgot Your Name", filePath:"y2mate.com - Forgot Your Name feat Kris Kiss.mp3", coverPath:"https://is4-ssl.mzstatic.com/image/thumb/Music113/v4/fc/51/2a/fc512ab5-9cd6-76ee-8d4d-58d2e4feec8a/artwork.jpg/600x600bf-60.jpg"},
    {songName:"Sugar Daddy", filePath:"y2mate.com - Sugar Daddy feat Kris Kiss.mp3", coverPath:"https://images.genius.com/e3534fe6fa4d2e1bec5e656bd23f6a4b.1000x1000x1.png"},
    {songName:"Broke Boyz", filePath:"y2mate.com - Andrew Tate  Broke Boys Music Video.mp3", coverPath:"https://i.ytimg.com/vi/dTjw3Aw2W4I/hqdefault.jpg"},
    {songName:"Part Time", filePath:"y2mate.com - Andrew Tate  Part Time Ft KrissKiss Music Video.mp3", coverPath:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcPzvwRPqNcVBceodiDx5iOCgXqKVLS2AxeJi0DiMnO7_Tm-JtMbKuFnYrdU86qQ9hK7XOHTPWuD0&usqp=CAU&ec=48665701"},
]



songItems.forEach((element, i )=>{ 
    if (songs[i]) {
        element.getElementsByTagName("img")[0].src = songs[i].coverPath;
        element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    }
});




// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1
       
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})


// listen to events

audioElement.addEventListener('timeupdate', ()=>{

// update seekbar
progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
progressbar.value = progress

})

// change seekbar
progressbar.addEventListener('change',() =>{
    audioElement.currentTime = progressbar.value *audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");

})
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e) => {
        makeAllPlays();
        let index = songItems.indexOf(e.target.closest('.songitem'));
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        let filePath = songs[index].filePath;
        audioElement.src = filePath;
        audioElement.onloadedmetadata = function() {
            masterSongName.innerText = songs[index].songName;
        };
        songIndex = index;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})


document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= 6){
        songIndex= 0;
    }
    else{
        songIndex += 1;
    }
    filePath = songs[songIndex].filePath; // assign filePath variable
    audioElement.src = filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
   
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0){
        songIndex= 0;
    }
    else{
        songIndex -= 1;
    }
    filePath = songs[songIndex].filePath; // assign filePath variable
    audioElement.src = filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
   
})



