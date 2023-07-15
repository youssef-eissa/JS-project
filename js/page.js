// start LS
let backgroundOpt =true;
let BGinterval;

let randomm = localStorage.getItem("random")
if (randomm !== null) {
    if (randomm === "yes") {
    backgroundOpt = true
            randomImg()
    } else if (randomm === "no") {
        backgroundOpt=false
            clearInterval(BGinterval)
    }
    
    let choose = document.querySelectorAll(".background-random span")
    choose.forEach(el => {
        if (el.dataset.background===randomm) {
        el.classList.add("active")
    }
    })
}

let mainColor = localStorage.getItem("color_option")

if (mainColor !== null) {
        
    document.documentElement.style.setProperty("--main-color", mainColor)
    document.querySelectorAll(".colors li").forEach(el => {
        if (el.dataset.color===mainColor) {
            el.classList.add("active")
        }
    })

}

let BulletBG = localStorage.getItem("bullet_option")
if (BulletBG !== null) {
    document.querySelectorAll(".bullets-settings span").forEach(btn => {
        if (btn.dataset.background === BulletBG) {
            btn.classList.add("active")
        }
    })
    if (BulletBG === "yes") {
            document.querySelector(".nav-bullets").style.display="block"
        
    } else if (BulletBG === "no") {
            document.querySelector(".nav-bullets").style.display="none"
        
    }
}
// end LS


// settings
let gear = document.querySelector(".fa-gear")
gear.onclick = function () {
    this.classList.toggle("fa-spin")
    document.querySelector(".settings").classList.toggle("open")
}


let span = document.querySelectorAll(".settings .background-random span")

span.forEach(el => {
    el.addEventListener("click", function (e) {
        span.forEach(ele => {
            ele.classList.remove("active")
        })
        el.classList.add("active")
        if (e.target.dataset.background === "yes") {
            backgroundOpt = true
            randomImg()
        } else if(e.target.dataset.background==="no") {
        backgroundOpt=false
            clearInterval(BGinterval)
        }
        localStorage.setItem("random",e.target.dataset.background)
    })
})


// background random

function randomImg() {
    if (backgroundOpt === true) {
        let landpageBG = document.querySelector(".landpage")
let imgsArr = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg"]


BGinterval= setInterval(() => {
    let randomNum = Math.floor(Math.random() * imgsArr.length)
    landpageBG.style.backgroundImage='url("imgs/'+imgsArr[randomNum]+'")'
}, 5000)

    }

}
randomImg()





// color option
let colorsLi = document.querySelectorAll(".settings .colors li")

colorsLi.forEach(li => {
    li.addEventListener("click", function (e) {
        colorsLi.forEach(li => {
            li.classList.remove("active")
        })
        li.classList.add("active")
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color)
        
        localStorage.setItem("color_option",e.target.dataset.color)
        
    })
})


// links in header
let links = document.querySelectorAll(".landpage .header a")
links.forEach(a => {
    a.addEventListener("click", function () {
        links.forEach(el => {
            el.classList.remove("active")
        })
        a.classList.add("active")
    

    })
})

let Ourskills = document.querySelector(".skills")
window.addEventListener("scroll", () => {
    let OurskillsTop = Ourskills.offsetTop
    console.log(Ourskills.offsetTop)
    console.log(Ourskills.offsetHeight )
    let OurskillsHeight = Ourskills.offsetHeight   
    let windowHeight = this.innerHeight
    let windowScroll = this.pageYOffset
    let Skillss = document.querySelectorAll(".skills .skill-progress span")
    if (windowScroll > (OurskillsTop + OurskillsHeight - windowHeight)) {
        Skillss.forEach(el => {
            el.style.width=el.dataset.progress
        })
    }
    if (windowScroll <(OurskillsTop + OurskillsHeight - windowHeight)) {
        Skillss.forEach(el => {
            el.style.width=0
        })
    }
        let scroller = document.querySelector(".scroller")
let height = document.documentElement.scrollHeight - document.documentElement.clientHeight
    let scrollTopp = document.documentElement.scrollTop
    scroller.style.width=`${(scrollTopp/height)*100}%`
}
) 

 



// gallery
let OurGallery = document.querySelectorAll(".gallery img")
OurGallery.forEach(img => {
    img.addEventListener("click", (e) => {
        // overlay start
        let popupOverlay = document.createElement("div")
        popupOverlay.className="popup-over"
        document.body.appendChild(popupOverlay)
        // overlay end

        // start popupbox

        let popupBox = document.createElement("div")
        popupBox.className = "popup-box"
        // end popupbox

if (img.alt !== null) {
            let popupHeading = document.createElement("h3")
            popupHeading.className = "popup-heading"
            popupHeading.textContent=img.alt
            popupBox.appendChild(popupHeading)
        }
        // start popImg
        let popupImg = document.createElement("img")
        popupImg.src=img.src
        popupBox.appendChild(popupImg)

        // end popImg
        let CloseBtn = document.createElement("span")
        CloseBtn.textContent = "X"
        CloseBtn.className="close-btn"
        popupBox.appendChild(CloseBtn)
        document.body.appendChild(popupBox)

        CloseBtn.onclick = function (e) {
            e.target.parentElement.remove()
            popupOverlay.remove()
}
        
    })
})


// start bullets
let bullets = document.querySelectorAll(".nav-bullets .bullet")
bullets.forEach(bullet => {
    bullet.addEventListener("click", (e) => {
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior:"smooth"
        })
    })
})

let bulletsBtn = document.querySelectorAll(".bullets-settings span")
bulletsBtn.forEach(btn => {
    btn.addEventListener("click", (e) => {
        bulletsBtn.forEach(btn => {
            btn.classList.remove("active")
        })
        btn.classList.add("active")
        if (e.target.dataset.background === "no") {
            document.querySelector(".nav-bullets").style.display="none"
        } else if ((e.target.dataset.background === "yes")) {
            document.querySelector(".nav-bullets").style.display="block"
            
        }
    localStorage.setItem("bullet_option",e.target.dataset.background)
    })
})
// end bullets
document.querySelector(".reset-opt").onclick = function () {
    localStorage.removeItem("bullet_option")
    localStorage.removeItem("color_option")
    localStorage.removeItem("random")
window.location.reload()
}

let togMenu = document.querySelector(".toggle-menu")
togMenu.onclick = function (e) {
    e.stopPropagation()
    let links = document.querySelector(".landpage .links-container .links")
    links.classList.toggle("open")
    this.classList.toggle("open")
}
let linkss = document.querySelector(".landpage .links-container .links")
    linkss.onclick = function (e) {
    e.stopPropagation()
}
document.addEventListener("click", (e) => {
    if (e.target !== togMenu && e.target!==linkss) {
        if (togMenu.classList.contains("open")) {
            togMenu.classList.toggle("open")
            linkss.classList.toggle("open")
    }
    }
})


let time = new Date()
let day = time.toLocaleString("en-us",{weekday:"long"})
console.log(day)