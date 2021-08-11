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

var circle = [];
window.addEventListener('resize', function (event) {
    //console.log(event)
    circle = []
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init(100);
    background()

});

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



function drawMountain(x, h, w, cols) {
    this.x = x
    this.height = h
    this.width = w
    this.gray = cols
    this.y = innerHeight * 0.6


    this.draw_ = function(reflection) {
        // positive mountains
        c.beginPath();
        if (reflection) 
        {   // mountains
            c.fillStyle = `rgba(${this.gray}, ${this.gray}, ${this.gray}, ${1})`
            c.moveTo(this.x, this.y - this.height)
        }
        else 
        {   // reflections
            c.fillStyle = `rgba(${this.gray}, ${this.gray}, ${this.gray + 50}, ${0.7} )`
            c.moveTo(this.x, this.y + this.height)
        }
        c.lineTo(this.x + this.width, this.y)
        c.lineTo(this.x - this.width, this.y)
        c.fill();
    }

    this.draw = function () {
        // draw mountain
        this.draw_(false)
        // draw reflection
        this.draw_(true)
    };
};


function drawSun() {
    this.draw = function () {
        c.beginPath();
        c.arc(0, 0, innerWidth * 0.1, 0, Math.PI * 2, false);
        c.fillStyle = grd;
        c.fill();
    }
}



var mymounts = []

var xs = undefined
var height_ = undefined
var width_ = undefined
var gray_ = undefined
var muns = 100
for (var i = 0; i < muns; i++) {
    xs = (Math.random() * innerWidth)
    height_ = ((Math.random() * 150 + 50))
    width_ = ((Math.random() * 150 + 50))
    gray_ = (Math.round(Math.random() * 100))
    mymounts.push(new drawMountain(xs, height_, width_, gray_))
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

// background color gradient
gradient = c.createLinearGradient(0, 0, 0, innerHeight)
gradient.addColorStop(0, '#D73E02');
gradient.addColorStop(0.2, '#F35C03');
// gradient.addColorStop(0.4, '#F17302');
gradient.addColorStop(0.5, 'yellow');

gradient.addColorStop(0.6, '#AEDFF2');
gradient.addColorStop(0.8, '#04B2D9');
gradient.addColorStop(1, '#0669BF');


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

    // drawMounts()
    for (var i = 0; i < muns; i++) {
        mymounts[i].draw()
    }

}

var theSun = new drawSun();

for (var i = 0; i < 100; i++) {
    init(1);
}
animate();