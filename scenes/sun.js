// Set canvas H and W
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d')

// initialize canvas elements
var lightRayArray = [];
var mountainArray = []
var waterLevel = 0.6
var boatArray = []

var mouse = {
    x: undefined,
    y: undefined,
}

// event listeners
window.addEventListener('resize', function (event) {
    //console.log(event)
    lightRayArray = []
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawLightRays(100);
    drawSunset2Sea()
    drawMountains()
    drawBoats()
});

window.addEventListener('mousemove',
function (event) {
    mouse.x = event.x
    mouse.y = event.y

})


function drawBoats() {
    nBoat = 4
    boatArray = []
    for (var i = 0; i < nBoat; i++) {
        var boatYCoordinate = RandomRange(innerHeight * waterLevel, innerHeight);
        var boatHeight = RandomRange(70, 70) * Math.pow((boatYCoordinate/innerHeight), 2);
        var vx = RandomRange(0.2, 1) * Math.pow(-1, RandomIntRange(0, 1));
        boatArray.push(new Boat(innerWidth / 2, boatYCoordinate,
            boatHeight, vx, colorDict.boat.boat, colorDict.boat.sail));
    }
}
drawBoats();


function drawSun() {
    this.draw = function () {
        c.beginPath();
        if (innerWidth > innerHeight) {
            var sunRadius = innerHeight * 0.2
        } else {
            var sunRadius = innerWidth * 0.2
        }
        c.arc(0, 0, sunRadius, 0, Math.PI * 2, false);
        var grd = c.createLinearGradient(0, 0, innerWidth * 0.1, innerHeight * 0.1)
        grd.addColorStop(0, colorDict.sunGradient[0]);
        grd.addColorStop(1, colorDict.sunGradient[1]);
        c.fillStyle = grd;
        c.fill();
    }
}
var theSun = new drawSun();


function drawMountains() {
    var nMountain = 100
    mountainArray = []
    for (var i = 0; i < nMountain; i++) {
        var mountainBaseX = RandomRange(0, innerWidth)
        var mountainBaseY = innerHeight * waterLevel
        var mountainHeight = RandomRange(innerHeight * 0.07, innerHeight * 0.25)
        var mountainWidth = RandomRange(innerHeight * 0.07, innerHeight * 0.25)
        var grayLevel = RandomIntRange(0, 100)
        mountainArray.push(new Mountain(mountainBaseX, mountainBaseY, mountainHeight, mountainWidth, grayLevel, true))
    }
}
drawMountains();


function drawLightRays(nCircles) {
    lightRayArray = []
    for (var i = 0; i < nCircles; i++) {
        var rayWidth = RandomRange(1, 6);
        var vx =  RandomRange(0, 1);
        var vy = RandomRange(0, 1);
        var decayFactor = RandomRange(0.002, 0.005);
        var color = RandomIntRange(100, 255);
        lightRayArray.push(new LightRay(rayWidth, rayWidth, vx, vy, rayWidth, color, decayFactor));
    }
}
var nLightRays = 100;
drawLightRays(nLightRays);


function drawSunset2Sea() {
    // create sunset 2 sea color gradient
    gradient = c.createLinearGradient(0, 0, 0, innerHeight)
    var colorStops = [0, 0.2, 0.5, waterLevel, 0.8, 1]
    for (var i = 0; i < colorStops.length; i++) {
        gradient.addColorStop(colorStops[i], colorDict.sunset2Sea[i]);
    }
    c.fillStyle = gradient;
    c.fillRect(0, 0, innerWidth, innerHeight);
}
drawSunset2Sea()


// TODO: adding components of birds and clouds
var birdFlock = new InteractiveBirdFlock(400, 400, 30, 0);

// TODO: adding components of birds and clouds
var cloudHeight = 50
var cloudYCoordinate =  innerHeight/4 
var cloudColorGradient = c.createLinearGradient(0, cloudYCoordinate*2/3, 0, cloudYCoordinate + cloudHeight)
cloudColorGradient.addColorStop(0, colorDict.cloud[0]);
cloudColorGradient.addColorStop(1, colorDict.cloud[1]);
var cloudArray = []
cloudArray.push(new Cloud(innerWidth*2/3, innerHeight/4, cloudHeight, 0, cloudColorGradient));
cloudArray.push(new Cloud(innerWidth*0.85, innerHeight/5, cloudHeight, 0, cloudColorGradient));


// initalize counter for sun rays
var counter = 0
var minWait = 400
var maxWait = 1000
var resetCounter = minWait
// start animating

function animate() {
    requestAnimationFrame(animate)
    
    // regenerate light rays
    counter++
    if (counter > resetCounter) {
        resetCounter = RandomIntRange(minWait, maxWait)
        drawLightRays(nLightRays)
        counter = 0
    }
    
    // draw elements
    drawSunset2Sea()
    drawArrayObjects(lightRayArray)
    theSun.draw();
    drawArrayObjects(mountainArray)
    drawArrayObjects(boatArray)
    drawArrayObjects(cloudArray)
    birdFlock.draw(mouse)
}
animate();