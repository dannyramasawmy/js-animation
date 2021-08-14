// Set canvas H and W
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// drawing
var c = canvas.getContext('2d')


function Circle(x, y, vx, vy, radius, color, tdecay) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.maxRadius = 50;
    this.minRadius = radius
    this.color = color
    // this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
    this.tdecay = 1
    this.redness = 150
    this.tf = 0.004

    this.draw = function () {
        c.beginPath();
        c.moveTo(this.x, this.y)
        c.lineTo(this.x + this.vx * innerWidth * 0.05, this.y + this.vy * innerWidth * 0.05)
        // c.strokeStyle  = `rgba(255, ${255}, 0, ${0.1})`;
        c.strokeStyle = `rgba(255, ${this.color}, 0, ${this.tdecay})`;
        c.lineWidth = 5;
        c.setStr
        // c.fill();
        c.stroke();

    };

    this.update = function () {
        // update velocity
        this.x += this.vx;
        this.y += this.vy;
        this.tdecay -= this.tf;
        this.redness = Math.round(this.redness + 0.5)

        this.draw();
    };
};

// initialise canvas elements
var circle = [];
var mountainArray = []
var waterLevel = 0.6
var boatArray = []
window.addEventListener('resize', function (event) {
    //console.log(event)
    circle = []
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init(100);
    drawBackground()
    makeMountains()
    drawBoats()
});


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
        c.arc(0, 0, innerHeight * 0.2, 0, Math.PI * 2, false);
        var grd = c.createLinearGradient(0, 0, innerWidth * 0.1, innerHeight * 0.1)
        grd.addColorStop(0, colorDict.sunGradient[0]);
        grd.addColorStop(1, colorDict.sunGradient[1]);
        c.fillStyle = grd;
        c.fill();
    }
}


function makeMountains() {
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
makeMountains();


// generate circles
var nCircles = 5;
function init(numCircles) {
    for (var i = 0; i < numCircles; i++) {
        var radius = Math.random() * 5 + 1;
        // var x = Math.random() * (innerWidth - 2*radius) + radius;
        // var y = Math.random() * (innerHeight - 2*radius) + radius;;
        var vx = Math.random();
        var vy = Math.random();
        var tdecay = Math.random() * 0.4
        var color = RandomIntRange(100, 255)
        circle.push(new Circle(radius, radius, vx, vy, radius, color, tdecay))
    }

}


function drawBackground() {
    // create background color gradient
    gradient = c.createLinearGradient(0, 0, 0, innerHeight)
    var colorStops = [0, 0.2, 0.5, waterLevel, 0.8, 1]
    for (var i = 0; i < colorStops.length; i++) {
        gradient.addColorStop(colorStops[i], colorDict.sunset2Sea[i]);
    }
    c.fillStyle = gradient;
    c.fillRect(0, 0, innerWidth, innerHeight);
}
drawBackground()





// call a recursive like function to draw each frame
function animate() {
    requestAnimationFrame(animate)

    drawBackground()

    // update all circles
    for (var i = 0; i < circle.length; i++) {
        circle[i].update();
        if (circle[i].tdecay < 0) {
            circle.splice(i, 1)
            init(1)
        }
    }

    theSun.draw();
    drawArrayObjects(mountainArray)
    drawArrayObjects(boatArray)

}

var theSun = new drawSun();

for (var i = 0; i < 100; i++) {
    init(1);
}
animate();