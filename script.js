
let currentSong = new Audio();
let songs;
let currFolder;



//get song into an array 

async function getSongs(folder) {
    currFolder = folder;
    console.log(folder)
    let a = await fetch(`/${folder}/`)
     

    let response = await a.text();
    console.log(response)
    
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    }
    //get list of all songs
    
    
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    songUL.innerHTML= " "
    
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>${song.replaceAll("%20", " ")}</li>`;
        
    }
    
    Array.from(document.querySelector(".songList").getElementsByTagName("ul")).forEach(e => {
        // e.addEventListener("click", element => {
            playMusic(e.firstElementChild.innerHTML.trim())
            console.log(e.firstElementChild.innerHTML.trim())
            // })
        })
        
    }
    
    
    // play music 
    const playMusic = (track, pause = false) => {
        //  let audio = new audio(track)
        currentSong.src = `/${currFolder}/` + track
        if (!pause) {
            
            currentSong.play()
            play.src = "img/pause.svg"
        }
        var periodIndex = track.indexOf('.');
        var result = track.substring(0, periodIndex);
        
        document.querySelector(".songinfo").innerHTML = decodeURI(result)
        
        
        
        
    }

     // load playlist according to box
    
     Array.from(document.getElementsByClassName("play")).forEach(e => {
        
        e.addEventListener("click", async item => {

           
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
            console.log(`songs/${item.currentTarget.dataset.folder}`)
           
       
        })

    })
    
    async function main() {
    
        // await getSongs("songs/red")
        // playMusic(songs[0], true)
    
        // add el to  play buttons
    
        play.addEventListener("click", () => {
            if (currentSong.paused) {
                currentSong.play()
                play.src = "img/pause.svg"
            }
            else {
                currentSong.pause()
                play.src = "img/player.svg"
            }
        })
    
        currentSong.addEventListener("timeupdate", () => {
            document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
            document.querySelector(".sb").style.width = (currentSong.currentTime / currentSong.duration) * 100 + "%";
        })
    
    
        // seekbar el
    
        document.querySelector(".seekbar").addEventListener("click", e => {
            let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
            document.querySelector(".circle").style.left = percent + "%";
            document.querySelector(".sb").style.width = percent + "%";
            currentSong.currentTime = ((currentSong.duration) * percent) / 100
        })
    
        // prev button
    
        prev.addEventListener("click", () => {
            console.log("Prev clicked")
            songs =  getSongs(currFolder)
    
        })
    
        // next button
    
        next.addEventListener("click", () => {
            console.log("next clicked")
            songs =  getSongs(currFolder)
    
    
        })
    
        // volume
    
        document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
      
            currentSong.volume = parseInt(e.target.value) / 100
        })
    
       
    
    // song list 

    
    
    
    
    
    
    }
    main()

