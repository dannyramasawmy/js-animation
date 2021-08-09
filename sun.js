
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
window.addEventListener('resize', function(event) {
    //console.log(event)
    circle = []
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init(5);
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

    this.draw = function() {

        // c.beginPath();
        // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // c.fillStyle = `rgba(255, ${self.color}, 0, ${this.tdecay})`;
        // c.fill();



        c.beginPath();
        c.moveTo(this.x, this.y)
        c.lineTo(this.x+this.vx*innerWidth*0.05 , this.y + this.vy*innerWidth*0.05)
        // c.strokeStyle  = `rgba(255, ${255}, 0, ${0.1})`;
        c.strokeStyle = `rgba(255, ${self.color}, 0, ${this.tdecay})`;
        c.lineWidth = 5;
        c.setStr
        // c.fill();
        c.stroke();

    };

    this.update = function() {
        // wall collision
        // if (this.x > innerWidth-this.radius || this.x < this.radius ) {
        //     this.vx = -this.vx
        // }
        // if (this.y > innerHeight ) {
        //     this.y = this.radius
        // }
   
        // update velocity
        this.x += this.vx ;
        this.y += this.vy ;
        this.tdecay -= this.tf;
        this.redness = Math.round(this.redness + 0.5) 
        
        this.draw();
    };
};



function drawMountain(x, height, width , gray) {
    this.x = x
    this.height = height
    this.width = width
    this.gray = gray
    this.y = innerHeight*0.6


    this.draw = function() {
        c.beginPath();
        // c.strokeStyle = 'black';
        c.moveTo( this.x , this.y - this.height)
        c.lineTo( this.x + this.width  , this.y )
        c.lineTo( this.x - this.width, this.y )
        // c.lineTo( x  - 300 , y )
        // c.lineTo( x  , y )
        c.strokeStyle = 'gray';
        c.lineWidth = 5;
        // c.setStr
        // c.fillStyle = `rgb(${this.gray}, ${this.gray}, ${this.gray})`
        c.fill();
        // c.stroke();
    };
};


var xs = []
var height_ =[]
var width_ = []
var gray_ = []
var muns = 100
for (var i = 0; i < muns; i++) {
    xs.push( (Math.random() ) * innerWidth)
    height_.push( (Math.random()*150 + 50))
    width_.push( (Math.random()*150 + 50))
    gray_.push( Math.round(Math.random()*100))

}



// generate circles

var numCircles = 5;
function init(numCircles) {
    for (var i = 0; i < numCircles; i++) {
        var radius =  Math.random() * 5 + 1;
        // var x = Math.random() * (innerWidth - 2*radius) + radius;
        // var y = Math.random() * (innerHeight - 2*radius) + radius;;
        var vx =  Math.random() ;
        var vy = Math.random() ;
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


grd = c.createLinearGradient(0, 0, innerWidth*0.1, innerHeight*0.1)
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

    // reset the canvas
    // c.clearRect(0, 0, innerWidth, innerHeight);
    // Set the fill style and draw a rectangle
    background()

    // update all circles
    for (var i = 0; i < circle.length; i++) {
        circle[i].update();
        if (circle[i].tdecay < 0) {
            circle.splice(i, 1)
            init(1)
        }
    }


    c.beginPath();
    c.arc(0, 0, innerWidth*0.1, 0, Math.PI * 2, false);
    c.fillStyle = grd;
    c.fill();


    console.log(xs)
console.log(height_)
console.log(width_)
console.log(gray_)
   for (var i =0; i < muns; i++) {
    // console.log(xs[i])
    // console.log(height_[i])
    // console.log(width_[i])
    // console.log(gray_[i])

    c.beginPath();
    // c.strokeStyle = 'black';
    c.moveTo( xs[i] ,innerHeight*0.6 - height_[i])
    c.lineTo( xs[i] + width_[i]  , innerHeight*0.6 )
    c.lineTo( xs[i] - width_[i], innerHeight*0.6 )
    // c.lineTo( x  - 300 , y )
    // c.lineTo( x  , y )
    c.lineWidth = 5;
    // c.setStr
    c.fillStyle = `rgba(${gray_[i]}, ${gray_[i]}, ${gray_[i]}, ${1})`
    c.fill();

    c.beginPath();
    // c.strokeStyle = 'black';
    c.moveTo( xs[i] ,innerHeight*0.6 + height_[i])
    c.lineTo( xs[i] + width_[i]  , innerHeight*0.6 )
    c.lineTo( xs[i] - width_[i], innerHeight*0.6 )
    // c.lineTo( x  - 300 , y )
    // c.lineTo( x  , y )
    c.lineWidth = 5;
    // c.setStr
    c.fillStyle = `rgba(${gray_[i]}, ${gray_[i]}, ${gray_[i]+50}, ${0.7} )`
    c.fill();

    }


    // for (var i =0; i < xs.length; i++) {
    //     drawMountain(xs[i], height[i], width[i], gray[i])
    // }

//         x = (Math.random()) * innerWidth
//     height = (Math.random()*150 + 50)
//     width = (Math.random()*150 + 50)
//     gray = Math.round(Math.random*100)
//    var xx = drawMountain(x, height, width, gray)
//     // xx.draw()
    //c.font = "100px Arial";
    //c.fillText("Welcome", innerWidth/3, innerHeight/2);
    
}

for (var i = 0; i < 100 ; i ++ ) {
    init(1);
}
animate();