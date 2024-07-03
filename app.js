console.log("Welcome to Spotify");


let songIndex  = 0;
let audioElement = new Audio("songs/1.mp3");


let masterPlay = document.querySelector("#masterplay");
let myProgressBar = document.getElementById("progressbar");
let gif = document.getElementById("gif");
let songItem = Array.from(document.getElementsByClassName("songitem"));
let masterSongName = document.querySelector(".masterSongName");

let songs = [
    {songName : "Keep On Lovin", filePath : "songs/1.mp3", coverPath: "covers/cover1.jpg"}, 
    {songName : "Downtown", filePath : "songs/2.mp3", coverPath: "covers/cover2.jpg"}, 
    {songName : "Set Fire To The Rain", filePath : "songs/3.mp3", coverPath: "covers/cover3.jpg"},  
    {songName : "Keep On Lovin", filePath : "songs/4.mp3", coverPath: "covers/cover3.jpg"}, 
    {songName : "Keep On Lovin", filePath : "songs/5.mp3", coverPath: "covers/cover3.jpg"},
    {songName : "Keep On Lovin", filePath : "songs/6.mp3", coverPath: "covers/cover3.jpg"},
    {songName : "Keep On Lovin", filePath : "songs/7.mp3", coverPath: "covers/cover3.jpg"},
    {songName : "Keep On Lovin", filePath : "songs/8.mp3", coverPath: "covers/cover3.jpg"}
];


songItem.forEach((element, i)=>{
    console.log("element ", element , "i ", i);
    element.querySelector("img").src = songs[i].coverPath;
    element.querySelector(".songname").innerText = songs[i].songName;
})


//Handle Play Pause on click (MasterPlay)
masterPlay.addEventListener('click', ()=>{
    
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
})



//Listen to events 

audioElement.addEventListener('timeupdate', ()=>{
   //console.log('timeupate');
    //update seekbar 
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    //console.log(progress);
    myProgressBar.value = progress;

})

myProgressBar.addEventListener("change",()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration / 100);
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}



document.querySelectorAll(".songItemPlay").forEach((element)=>
{
    
    element.addEventListener("click",(e)=>
    {
       
        // console.log(e.target);
        // console.log(typeof e);
        // console.log(e);
        
        
        //console.log(e.target.id);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-play");
        e.target.classList.add("fa-pause");
        
        audioElement.src = `songs/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex-1].songName;
        audioElement.currentTime = 0;
        audioElement.play();

        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');


    })
}
)

document.getElementById("next").addEventListener("click", (e)=>{
    if(songIndex >=8)
    {
        songIndex=0
    }
    else{
        songIndex+=1;
    }
        
        audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterSongName.innerText = songs[songIndex].songName;
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
})


document.getElementById("previous").addEventListener("click", (e)=>{
    if(songIndex <= 1)
    {
        songIndex=0
    }
    else{
        songIndex-=1;
    }
        
        audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterSongName.innerText = songs[songIndex].songName;
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
})
