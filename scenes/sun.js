// Set canvas H and W
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// drawing
var c = canvas.getContext('2d')

// Color info:
// Carmen Russmann
// https://color.adobe.com/search?q=warm&t=term
var colorArray = [
    150,
    200,
    255,
    175,
    225,
];

// #DF7126
// #EDD06F
// #FFB551
// #FB9A1A
// #DB5817

function Circle(x, y, vx, vy, radius, color, tdecay) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.maxRadius = 50;
    this.minRadius = radius
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
    this.tdecay = 1
    this.redness = 150
    this.tf = 0.004

    this.draw = function () {
        c.beginPath();
        c.moveTo(this.x, this.y)
        c.lineTo(this.x + this.vx * innerWidth * 0.05, this.y + this.vy * innerWidth * 0.05)
        // c.strokeStyle  = `rgba(255, ${255}, 0, ${0.1})`;
        c.strokeStyle = `rgba(255, ${self.color}, 0, ${this.tdecay})`;
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

var circle = [];
window.addEventListener('resize', function (event) {
    //console.log(event)
    circle = []
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init(100);
    background()

});





var myBoat = new boat(innerWidth/2 , innerHeight*2/3, 50, "#8C3718", "#F2D0A7")
var myBoat2 = new boat(innerWidth/2 , innerHeight*4/5, 100, "#A64914", "#F2D0A7")




function drawSun() {
    this.draw = function () {
        c.beginPath();
        c.arc(0, 0, innerWidth * 0.1, 0, Math.PI * 2, false);
        c.fillStyle = grd;
        c.fill();
    }
}



var mountainArray = []
var nMountain = 100
for (var i = 0; i < nMountain; i++) {
    var mountainBaseX = RandomRange(0, innerWidth)
    var mountainBaseY = innerHeight * 0.6
    var mountainHeight =  RandomRange(innerHeight*0.07, innerHeight*0.25)  
    var mountainWidth =  RandomRange(innerHeight*0.07, innerHeight*0.25)  
    var grayLevel = RandomIntRange(0, 100)
    mountainArray.push(new drawMountain(mountainBaseX, mountainBaseY,  mountainHeight, mountainWidth, grayLevel, true))
}




// generate circles
var numCircles = 5;
function init(numCircles) {
    for (var i = 0; i < numCircles; i++) {
        var radius = Math.random() * 5 + 1;
        // var x = Math.random() * (innerWidth - 2*radius) + radius;
        // var y = Math.random() * (innerHeight - 2*radius) + radius;;
        var vx = Math.random();
        var vy = Math.random();
        var tdecay = Math.random() * 0.4
        color = colorArray[Math.floor(Math.random() * colorArray.length)]
        circle.push(new Circle(radius, radius, vx, vy, radius, color, tdecay))
    }

}


// create background color gradient
gradient = c.createLinearGradient(0, 0, 0, innerHeight)
var colorStops = [0, 0.2, 0.5, 0.6, 0.8, 1]
for (var i = 0; i < colorStops.length; i++) {
    gradient.addColorStop(colorStops[i], colorDict.sunset2Sea[i]);
}



grd = c.createLinearGradient(0, 0, innerWidth * 0.1, innerHeight * 0.1)
grd.addColorStop(0, `rgb(255, 255, 0)`);
grd.addColorStop(1, 'rgb(255, 100, 0)');

function background() {
    c.fillStyle = gradient;
    c.fillRect(0, 0, innerWidth, innerHeight);
}
count = 100
background()





// call a recursive like function to draw each frame
function animate() {
    requestAnimationFrame(animate)

    background()

    // update all circles
    for (var i = 0; i < circle.length; i++) {
        circle[i].update();
        if (circle[i].tdecay < 0) {
            circle.splice(i, 1)
            init(1)
        }
    }

    // draw the sun
    theSun.draw();

    drawArrayObjects(mountainArray)

    myBoat.move(1)
    myBoat.draw()
    myBoat2.move(-2)
    myBoat2.draw()

}

var theSun = new drawSun();

for (var i = 0; i < 100; i++) {
    init(1);
}
animate();