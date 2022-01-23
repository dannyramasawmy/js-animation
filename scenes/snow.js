
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
    '#CEE4F2',
    '#9CC1D9',
    '#75A3BF',
    '#46718C',
    '#1A1E26',
];

window.addEventListener('resize', function(event) {
    //console.log(event)
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

function Circle(x, y, vx, vy, radius, color, tdecay) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.maxRadius = 50;
    this.minRadius = radius
    this.color = color;
    self.tdecay = tdecay

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    };

    this.update = function() {
        // wall collision
        if (this.x > innerWidth-this.radius || this.x < this.radius ) {
            this.vx = -this.vx
        }
        if (this.y > innerHeight ) {
            this.y = this.radius
        }
   
        // update velocity
        this.x += this.vx ;
        this.y += this.vy + 0.1;
        
        this.draw();
    };
};


// generate circles
var circle = [];
var numCircles = 500;
function init() {
    circle = [];
    for (var i = 0; i < numCircles; i++) {
        var radius =  Math.random() * 5 + 1;
        var x = Math.random() * (innerWidth - 2*radius) + radius;
        var y = Math.random() * (innerHeight - 2*radius) + radius;;
        var vx =  (Math.random() - 0.5) * 0.5 ;
        var vy = Math.random();
        var tdecay = Math.random() * 0.4 
        color = colorArray[Math.floor(Math.random() * colorArray.length)]
        circle.push(new Circle(x, y, vx, vy, radius, color, tdecay))
    }

}




function House(x, y, color) {
    this.x = x;
    this.y = y;
    this.fac = 100;
    this.color = color;

    this.draw = function() {
      c.beginPath();
        var fac = this.fac
        c.fillStyle = this.color
        c.moveTo(this.x, +this.y)
        c.lineTo(this.x + 4*fac, +this.y)
        c.lineTo(this.x + 4*fac, +this.y - 3*fac)
        c.lineTo(this.x, +this.y - 3*fac)
        c.moveTo(this.x, +this.y)
        c.fill();    

        /*
        c.fillStyle = this.color
        c.lineTo(this.x, +this.y - 3*fac)
        c.lineTo(this.x + 4*fac, +this.y - 3*fac)
        c.lineTo(this.x + 5*fac, +this.y - 4.5*fac)
        c.lineTo(this.x + 1*fac, +this.y - 4.5*fac)
        c.moveTo(this.x, +this.y - 3*fac)
        c.fill();    
*/
        
    };

    this.update = function() {
        this.draw();
    };
};


var myLogCabin = new House(innerWidth/19, innerHeight*4/5, '#AA5522')



// background color gradient
gradient = c.createLinearGradient(0, 0, 0, innerHeight)
gradient.addColorStop(0, 'black');
gradient.addColorStop(1, 'gray');


// call a recursive like function to draw each frame
function animate() {
    requestAnimationFrame(animate)

    // reset the canvas
    // c.clearRect(0, 0, innerWidth, innerHeight);
    // Set the fill style and draw a rectangle
    c.fillStyle = gradient;
    c.fillRect(0, 0, innerWidth, innerHeight);

    
    myLogCabin.update()

    // update all circles
    for (var i = 0; i < circle.length; i++) {
        circle[i].update();
    }
    
    //myLogCabin.update()
    //c.font = "100px Arial";
    //c.fillText("Welcome", innerWidth/3, innerHeight/2);
    
}

init();
animate();