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
    {songName:"Ed Sheeran-Perfect", filePath:"Ed_Sheeran_-_Perfect_NaijaMusic.Ng.mp3", coverPath:"https://i1.sndcdn.com/artworks-000223236077-yd8331-t500x500.jpg"},
    {songName:"Thinking Out Loud", filePath:"Ed_Sheeran_Thinking_Out_Loud_(NaijaMusic.NG).mp3", coverPath:"https://i.pinimg.com/originals/2d/0d/6e/2d0d6e817e438bd4cb853be5f40ec58f.jpg"},
    {songName:"Kaise Mujhe Tum mil gai", filePath:"Kaise Mujhe Tum Mil Gaye Full Song Amir khan Ghajini Movie Song.mp3", coverPath:"5.jpg"},
    {songName:"Tere Hoke Rehengay", filePath:"01. Tere Hoke Rehengay.mp3", coverPath:"5.jpg"},
    {songName:"Aaya Na Tu", filePath:"Aaya Na Tu - Arjun Kanungo_64-(PagalWorld.Ink).mp3", coverPath:"https://th.bing.com/th/id/OIP.6eUuDocLITRnWyXuX9WJhAHaE8?pid=ImgDet&rs=1"},
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



