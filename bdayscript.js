/* ==========================================================
   Happy Birthday Sonali 💜
   script.js
   Snippet 1/5
   ========================================================== */

/* ==========================================================
   CUSTOMISATION
   ========================================================== */

const birthdayName = "Sonali";

const birthdayMessage =
`Happy Birthday BESTieee! I hope you know you are truly perfect and I hope you had an amazing day. <3`;

const shootingStarMinDelay = 8000;
const shootingStarMaxDelay = 15000;

const typeSpeed = 55;

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


/* ==========================================================
   DOM REFERENCES
   ========================================================== */

const surpriseButton =
document.getElementById("surpriseButton");

const birthdayCard =
document.getElementById("birthdayCard");

const birthdayText =
document.getElementById("birthdayMessage");

const subtitle =
document.querySelector(".subtitle");

const rocket =
document.getElementById("rocket");

const confettiCanvas =
document.getElementById("confettiCanvas");

const heartsContainer =
document.getElementById("heartsContainer");

const sparkleContainer =
document.getElementById("sparkleContainer");

const shootingStarContainer =
document.querySelector(".shooting-stars");

const spaceObjects =
document.getElementById("spaceObjects");


/* ==========================================================
   INITIAL STATE
   ========================================================== */

birthdayText.textContent = "";

birthdayCard.style.display = "none";

let surpriseOpened = false;

let rocketFinished = false;

let animationPaused = false;


/* ==========================================================
   SMALL UTILITIES
   ========================================================== */

function random(min,max){

    return Math.random() * (max-min) + min;

}

function randomInt(min,max){

    return Math.floor(random(min,max));

}

function sleep(ms){

    return new Promise(resolve=>{

        setTimeout(resolve,ms);

    });

}


/* ==========================================================
   TYPEWRITER
   ========================================================== */

async function typeMessage(){

    birthdayText.textContent = "";

    for(let i=0;i<birthdayMessage.length;i++){

        birthdayText.textContent += birthdayMessage[i];

        await sleep(typeSpeed);

    }

}


/* ==========================================================
   REVEAL CARD
   ========================================================== */

async function revealBirthdayCard(){

    birthdayCard.style.display="block";

    birthdayCard.style.opacity=0;

    birthdayCard.style.transform=
    "translateY(80px) scale(.92)";

    await sleep(30);

    birthdayCard.animate(

        [

            {

                opacity:0,

                transform:
                "translateY(80px) scale(.92)"

            },

            {

                opacity:1,

                transform:
                "translateY(0) scale(1)"

            }

        ],

        {

            duration:900,

            easing:"cubic-bezier(.2,.9,.2,1)",

            fill:"forwards"

        }

    );

    birthdayCard.style.opacity=1;

    birthdayCard.style.transform=
    "translateY(0)";

    await sleep(350);

    await typeMessage();

}


/* ==========================================================
   BUTTON
========================================================== */

surpriseButton.addEventListener("click", async()=>{

    if(surpriseOpened) return;

    surpriseOpened = true;

    if(subtitle){

        subtitle.animate(
            [
                {
                    opacity:1,
                    transform:"translateY(0)"
                },
                {
                    opacity:0,
                    transform:"translateY(-20px)"
                }
            ],
            {
                duration:500,
                easing:"ease",
                fill:"forwards"
            }
        );

    }

    surpriseButton.disabled = true;

    surpriseButton.animate(
        [
            {
                opacity:1,
                transform:"scale(1)"
            },
            {
                opacity:0,
                transform:"scale(.4)"
            }
        ],
        {
            duration:500,
            easing:"cubic-bezier(.4,0,.2,1)",
            fill:"forwards"
        }
    );

    setTimeout(()=>{
        surpriseButton.style.display="none";
    },500);


    startConfetti();

    createHeartBurst();

    createSparkleBurst();

    await revealBirthdayCard();

});


/* ==========================================================
   ROCKET INTRO
========================================================== */

async function startRocketIntro(){

    if(prefersReducedMotion){

        rocket.style.transform =
        "translate(50vw,120px)";

        rocketFinished=true;

        return;

    }


    rocket.style.left="0";
    rocket.style.top="0";


    let startX=-200;
    let startY=window.innerHeight+200;

    let endX=window.innerWidth*0.65;
    let endY=window.innerHeight*0.25;


    const duration=3200;

    const start=performance.now();


    return new Promise(resolve=>{


        function fly(now){

            let progress =
            Math.min(
                (now-start)/duration,
                1
            );


            // smooth easing
            let ease =
            1-Math.pow(1-progress,3);


            let x =
            startX+(endX-startX)*ease;


            let y =
            startY+(endY-startY)*ease;


            rocket.style.transform =
            `
            translate(${x}px,${y}px)
            rotate(-20deg)
            `;


            if(progress<1){

                requestAnimationFrame(fly);

            }else{

                orbitRocket()
                .then(resolve);

            }

        }


        requestAnimationFrame(fly);


    });

}


/* ==========================================================
   ORBIT
   (continued in Snippet 2)
   ========================================================== */

async function orbitRocket(){
    const centreX = window.innerWidth * 0.5;
    const centreY = window.innerHeight * 0.28;

    const radius = Math.min(window.innerWidth, window.innerHeight) * 0.18;

    const duration = 4200;

    const start = performance.now();

    return new Promise(resolve => {

        function animate(now){

            if(animationPaused){

                requestAnimationFrame(animate);
                return;

            }

            const elapsed = now - start;

            const progress = Math.min(elapsed / duration,1);

            const angle = progress * Math.PI * 2;

            const x = centreX + Math.cos(angle) * radius;

            const y = centreY + Math.sin(angle) * radius;

            rocket.style.left = x + "px";

            rocket.style.top = y + "px";

            rocket.style.transform =
                `translate(-50%,-50%) rotate(${angle + Math.PI/2}rad)`;

            createRocketSparkle(x,y);

            if(progress < 1){

                requestAnimationFrame(animate);

            }else{

                landRocket().then(resolve);

            }

        }

        requestAnimationFrame(animate);

    });

}


/* ==========================================================
   LAND ROCKET
   ========================================================== */

async function landRocket(){

    const rect =
    surpriseButton.getBoundingClientRect();


    const targetX =
    rect.left + rect.width/2;


    const targetY =
    rect.top - 70;


    rocket.animate(

        [
            {
                transform:
                getComputedStyle(rocket).transform
            },
            {
                transform:
                `translate(${targetX}px,${targetY}px)
                 rotate(0deg)`
            }
        ],

        {
            duration:1600,
            easing:"cubic-bezier(.22,1,.36,1)",
            fill:"forwards"
        }

    );


    await sleep(1600);

    rocketFinished=true;

}


/* ==========================================================
   SHOOTING STARS
   ========================================================== */

function startShootingStars(){

    if(prefersReducedMotion) return;

    scheduleNextStar();

}

function scheduleNextStar(){

    const delay = randomInt(
        shootingStarMinDelay,
        shootingStarMaxDelay
    );

    setTimeout(()=>{

        if(!animationPaused){

            createShootingStar();

            if(Math.random() < 0.12){

                setTimeout(createShootingStar,450);

            }

        }

        scheduleNextStar();

    },delay);

}


/* ==========================================================
   CREATE SHOOTING STAR
   ========================================================== */

function createShootingStar(){

    const star =
        document.createElement("div");

    star.className = "shooting-star";

    const startX =
        random(-150,window.innerWidth * 0.6);

    const startY =
        random(0,window.innerHeight * 0.35);

    const distance =
        random(450,900);

    const duration =
        random(1200,1900);

    const golden =
        Math.random() < 0.05;

    if(golden){

        star.classList.add("golden");

    }

    star.style.left = startX + "px";
    star.style.top = startY + "px";

    star.style.setProperty(
        "--travel",
        distance + "px"
    );

    star.style.animationDuration =
        duration + "ms";

    shootingStarContainer.appendChild(star);

    if(golden){

        createGoldenTrail(startX,startY);

    }

    star.addEventListener("animationend",()=>{

        star.remove();

    });

}


/* ==========================================================
   GOLDEN STAR TRAIL
   ========================================================== */

function createGoldenTrail(x,y){

    for(let i=0;i<18;i++){

        const spark =
            document.createElement("div");

        spark.className =
            "gold-spark";

        spark.style.left =
            x + random(-10,10) + "px";

        spark.style.top =
            y + random(-10,10) + "px";

        spark.style.animationDelay =
            (i*30) + "ms";

        sparkleContainer.appendChild(spark);

        setTimeout(()=>{

            spark.remove();

        },1800);

    }

}


/* ==========================================================
   ROCKET SPARKLES
   ========================================================== */

function createRocketSparkle(x,y){

    if(Math.random() > 0.45) return;

    const spark =
        document.createElement("div");

    spark.className = "rocket-spark";

    spark.style.left =
        x + random(-6,6) + "px";

    spark.style.top =
        y + random(-6,6) + "px";

    sparkleContainer.appendChild(spark);

    setTimeout(()=>{

        spark.remove();

    },900);

}


/* ==========================================================
   CONFETTI
   (continues in Snippet 3)
   ========================================================== */

const ctx =
    confettiCanvas.getContext("2d");

let confettiPieces = [];
/* ==========================================================
   CONFETTI ENGINE
   ========================================================== */

function resizeCanvas(){

    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


class ConfettiPiece{

    constructor(){

        this.reset(true);

    }

    reset(initial = false){

        this.x = initial
            ? random(0, confettiCanvas.width)
            : random(confettiCanvas.width * 0.2, confettiCanvas.width * 0.8);

        this.y = initial
            ? random(-confettiCanvas.height, 0)
            : -20;

        this.size = random(6,12);

        this.speedY = random(2.5,6);

        this.speedX = random(-2.5,2.5);

        this.rotation = random(0,360);

        this.rotationSpeed = random(-12,12);

        this.opacity = 1;

        this.colour = [

            "#ff70c8",
            "#8b5cf6",
            "#59e3ff",
            "#ffd95b",
            "#ffffff"

        ][randomInt(0,5)];

    }

    update(){

        this.x += this.speedX;

        this.y += this.speedY;

        this.rotation += this.rotationSpeed;

        if(this.y > confettiCanvas.height + 30){

            this.opacity = 0;

        }

    }

    draw(){

        ctx.save();

        ctx.translate(this.x,this.y);

        ctx.rotate(this.rotation * Math.PI/180);

        ctx.globalAlpha = this.opacity;

        ctx.fillStyle = this.colour;

        ctx.fillRect(
            -this.size/2,
            -this.size/2,
            this.size,
            this.size
        );

        ctx.restore();

    }

}


function startConfetti(){

    confettiPieces = [];

    for(let i=0;i<260;i++){

        confettiPieces.push(new ConfettiPiece());

    }

    animateConfetti();

}


function animateConfetti(){

    ctx.clearRect(
        0,
        0,
        confettiCanvas.width,
        confettiCanvas.height
    );

    let alive = false;

    confettiPieces.forEach(piece=>{

        if(piece.opacity > 0){

            alive = true;

            piece.update();

            piece.draw();

        }

    });

    if(alive){

        requestAnimationFrame(animateConfetti);

    }else{

        ctx.clearRect(
            0,
            0,
            confettiCanvas.width,
            confettiCanvas.height
        );

    }

}


/* ==========================================================
   HEART BURST
   ========================================================== */

function createHeartBurst(){

    for(let i=0;i<20;i++){

        const heart =
            document.createElement("div");

        heart.className = "floating-heart";

        heart.textContent = "💜";

        const rect =
            surpriseButton.getBoundingClientRect();

        heart.style.left =
            rect.left + rect.width/2 + "px";

        heart.style.top =
            rect.top + "px";

        heart.style.setProperty(
            "--x",
            random(-220,220) + "px"
        );

        heart.style.setProperty(
            "--y",
            random(-350,-120) + "px"
        );

        heart.style.animationDuration =
            random(2.5,4.5) + "s";

        heartsContainer.appendChild(heart);

        heart.addEventListener("animationend",()=>{

            heart.remove();

        });

    }

}


/* ==========================================================
   SPARKLE BURST
   ========================================================== */

function createSparkleBurst(){

    for(let i=0;i<45;i++){

        createSparkle(
            window.innerWidth/2,
            window.innerHeight/2
        );

    }

}


function createSparkle(x,y){

    const sparkle =
        document.createElement("div");

    sparkle.className = "sparkle";

    sparkle.style.left =
        x + random(-120,120) + "px";

    sparkle.style.top =
        y + random(-120,120) + "px";

    sparkle.style.animationDuration =
        random(0.8,1.8) + "s";

    sparkleContainer.appendChild(sparkle);

    sparkle.addEventListener("animationend",()=>{

        sparkle.remove();

    });

}


/* ==========================================================
   AMBIENT SPARKLES
   (continues in Snippet 4)
   ========================================================== */

function spawnAmbientSparkle(){
    if(animationPaused) return;

    const sparkle = document.createElement("div");

    sparkle.className = "ambient-sparkle";

    sparkle.style.left = random(0, window.innerWidth) + "px";
    sparkle.style.top = random(0, window.innerHeight) + "px";

    sparkle.style.animationDuration =
        random(2.5, 5.5) + "s";

    sparkleContainer.appendChild(sparkle);

    sparkle.addEventListener("animationend", () => {

        sparkle.remove();

    });

}

function ambientSparkleLoop(){

    spawnAmbientSparkle();

    setTimeout(
        ambientSparkleLoop,
        randomInt(350,900)
    );

}

function getSafePlanetPosition(size){

    let x;
    let y;
    let safe = false;

    let attempts = 0;


    while(!safe && attempts < 100){

        attempts++;


        x = random(20, window.innerWidth - size - 20);

        y = random(20, window.innerHeight - size - 20);


        let overlapsObject = false;


        // Check all planets already on screen
        const planets = document.querySelectorAll(
            ".generated-planet, .saturn, .moon"
        );


        planets.forEach(existing=>{

            const rect =
            existing.getBoundingClientRect();


            const existingX =
            rect.left + rect.width / 2;


            const existingY =
            rect.top + rect.height / 2;


            const newX =
            x + size / 2;


            const newY =
            y + size / 2;


            const distance =
            Math.hypot(
                newX - existingX,
                newY - existingY
            );


            // Add padding so they don't touch
            if(distance < (size/2 + rect.width/2 + 40)){

                overlapsObject = true;

            }


        });


        if(!overlapsObject){

            safe = true;

        }

    }


    return {
        x,
        y
    };

}

function createRandomPlanet(){

    const planet =
    document.createElement("div");


    planet.className =
    "generated-planet";


    const size =
    randomInt(40,130);


    planet.style.width =
    size+"px";

    planet.style.height =
    size+"px";


    const position =
    getSafePlanetPosition(size);


    planet.style.left =
    position.x+"px";


    planet.style.top =
    position.y+"px";


    const colours = [

        "radial-gradient(circle at 30% 30%,#ffe6a7,#d16ba5)",

        "radial-gradient(circle at 30% 30%,#8be9fd,#4361ee)",

        "radial-gradient(circle at 30% 30%,#ff9a9e,#fad0c4)",

        "radial-gradient(circle at 30% 30%,#c77dff,#240046)",

        "radial-gradient(circle at 30% 30%,#90be6d,#277da1)"

    ];


    planet.style.background =
    colours[randomInt(0,colours.length)];


    // Different movement for each planet

    planet.style.setProperty(
        "--float-speed",
        random(6,18)+"s"
    );


    planet.style.setProperty(
        "--float-distance",
        random(-30,30)+"px"
    );

    if(Math.random() < 0.2){

        planet.classList.add("ringed");

    }

    spaceObjects.appendChild(planet);

}

/* ==========================================================
   VISIBILITY / PERFORMANCE
   ========================================================== */

document.addEventListener("visibilitychange",()=>{

    animationPaused = document.hidden;

});


/* ==========================================================
   REDUCED MOTION SUPPORT
   ========================================================== */

if(prefersReducedMotion){

    birthdayCard.style.transition = "none";

    rocket.style.transition = "none";

}


/* ==========================================================
   WINDOW RESIZE
   ========================================================== */

window.addEventListener("resize",()=>{

    if(rocketFinished){

        const rect =
            surpriseButton.getBoundingClientRect();

        rocket.style.left =
            rect.left + rect.width/2 + "px";

        rocket.style.top =
            rect.top - 70 + "px";

    }

});


/* ==========================================================
   OPTIONAL MUSIC SUPPORT
   ========================================================== */

const music =
    document.getElementById("backgroundMusic");

function playMusic(){

    if(!music) return;

    music.volume = 0.35;

    music.play().catch(()=>{});

}


/* ==========================================================
   BUTTON ENHANCEMENTS
   ========================================================== */

surpriseButton.addEventListener("mouseenter",()=>{

    if(prefersReducedMotion) return;

    surpriseButton.animate(

        [

            { transform:"scale(1)" },

            { transform:"scale(1.08)" },

            { transform:"scale(1)" }

        ],

        {

            duration:400

        }

    );

});


surpriseButton.addEventListener("click",()=>{

    playMusic();

});


/* ==========================================================
   SMALL FLOATING PIXELS
   ========================================================== */

function createFloatingPixel(){

    if(animationPaused) return;

    const pixel =
        document.createElement("div");

    pixel.className = "floating-pixel";

    pixel.textContent =
        Math.random() > 0.5 ? "■" : "✦";

    pixel.style.left =
        random(-20,window.innerWidth+20)+"px";

    pixel.style.top =
        window.innerHeight+20+"px";

    pixel.style.fontSize =
        random(8,16)+"px";

    pixel.style.animationDuration =
        random(8,14)+"s";

    sparkleContainer.appendChild(pixel);

    pixel.addEventListener("animationend",()=>{

        pixel.remove();

    });

}


function floatingPixelLoop(){

    createFloatingPixel();

    setTimeout(

        floatingPixelLoop,

        randomInt(1200,2200)

    );

}


/* ==========================================================
   RANDOM UFO EASTER EGG
   ========================================================== */

function maybeSpawnUFO(){

    if(prefersReducedMotion) return;

    if(Math.random()>0.02){

        setTimeout(

            maybeSpawnUFO,

            60000

        );

        return;

    }

    const ufo =
        document.createElement("div");

    ufo.className = "ufo";

    ufo.textContent = "🛸";

    ufo.style.left = "-100px";

    ufo.style.top =
        random(40,160)+"px";

    document.body.appendChild(ufo);

    ufo.animate(

        [

            {

                transform:"translateX(0)"

            },

            {

                transform:`translateX(${window.innerWidth+250}px)`

            }

        ],

        {

            duration:9000,

            easing:"linear"

        }

    );

    setTimeout(()=>{

        ufo.remove();

    },9000);

    setTimeout(

        maybeSpawnUFO,

        60000

    );

}


/* ==========================================================
   KONAMI CODE
   ========================================================== */

const konami = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a"
];

let konamiIndex = 0;

document.addEventListener("keydown",(event)=>{

    const key =
        event.key.length === 1
            ? event.key.toLowerCase()
            : event.key;

    if(key === konami[konamiIndex]){

        konamiIndex++;

        if(konamiIndex === konami.length){

            document.body.classList.add(
                "rainbow-mode"
            );

            setTimeout(()=>{

                document.body.classList.remove(
                    "rainbow-mode"
                );

            },8000);

            konamiIndex = 0;

        }

    }else{

        konamiIndex = 0;

    }

});


/* ==========================================================
   INITIALISATION
   (continues in Snippet 5)
   ========================================================== */

window.addEventListener("load",()=>{

    startRocketIntro();

    startShootingStars();

    ambientSparkleLoop();

    //floatingPixelLoop();

    maybeSpawnUFO();

    for(let i=0;i<6;i++){

        createRandomPlanet();

    }

});
/* ==========================================================
   FINAL INITIALISATION HELPERS
   ========================================================== */


/*
   Add a small delay before allowing the button
   so the rocket intro feels complete.
*/

async function unlockSurpriseButton(){

    if(prefersReducedMotion){

        surpriseButton.disabled = false;

        return;

    }

    await sleep(800);

    surpriseButton.disabled = false;

}


/* ==========================================================
   SAFE IMAGE FALLBACK
   ========================================================== */

const birthdayPhoto =
    document.getElementById("birthdayPhoto");


if(birthdayPhoto){

    birthdayPhoto.addEventListener(
        "error",
        ()=>{

            birthdayPhoto.src =
            "https://via.placeholder.com/600x600?text=Add+Your+Photo";

        }
    );

}


/* ==========================================================
   BUTTON TEXT CUSTOMISATION
   ========================================================== */

function updateBirthdayContent(){

    if(birthdayText){

        birthdayText.setAttribute(
            "aria-label",
            birthdayMessage
        );

    }

}


updateBirthdayContent();



/* ==========================================================
   SIMPLE STAR PARTICLE GENERATOR
   ========================================================== */

function createBackgroundStar(){

    if(animationPaused) return;

    const star =
        document.createElement("div");

    star.className =
        "generated-star";

    star.style.left =
        random(0,window.innerWidth)+"px";

    star.style.top =
        random(0,window.innerHeight)+"px";

    star.style.animationDuration =
        random(2,5)+"s";

    document.body.appendChild(star);


    setTimeout(()=>{

        star.remove();

    },6000);

}


function starGeneratorLoop(){

    createBackgroundStar();

    setTimeout(

        starGeneratorLoop,

        randomInt(600,1400)

    );

}



/* ==========================================================
   PREVENT DOUBLE ACTIVATION
   ========================================================== */

document.addEventListener(
    "keydown",
    (event)=>{

        if(
            event.key === "Enter" &&
            document.activeElement === surpriseButton
        ){

            surpriseButton.click();

        }

    }
);



/* ==========================================================
   STARTUP SEQUENCE
   ========================================================== */

window.addEventListener(
    "load",
    async()=>{

        await sleep(500);

        unlockSurpriseButton();

        //starGeneratorLoop();

    }
);



/* ==========================================================
   CLEANUP WHEN PAGE CLOSES
   ========================================================== */

window.addEventListener(
    "beforeunload",
    ()=>{

        confettiPieces = [];

    }
);


/* ==========================================================
   END OF SCRIPT
   ========================================================== */