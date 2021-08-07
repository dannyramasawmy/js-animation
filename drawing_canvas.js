
// Set canvas H and W
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// drawing
var c = canvas.getContext('2d')

var mouse = {
    x : undefined,
    y : undefined,
    d : false,
    vmult : 1
}

// interaction
window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x
        mouse.y = event.y
    })
window.addEventListener('mousedown',
    function(event) {
        mouse.d = true
        mouse.vmult = -1.5
    })
window.addEventListener('mouseup',
    function(event) {
        mouse.d = false
        mouse.vmult = 1
    })

    

// Color info:
// Carmen Russmann
// https://color.adobe.com/search?q=warm&t=term
var colorArray = [
    '#291B19',
    '#794034',
    '#B96D47',
    '#D89848',
    '#6E8B76',
];

window.addEventListener('resize', function(event) {
    //console.log(event)
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

function Circle(x, y, vx, vy, radius, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.maxRadius = 60;
    this.minRadius = radius
    this.color = color;

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
        if (this.y > innerHeight-this.radius || this.y < this.radius ) {
            this.vy = -this.vy
        }


   
        // update velocity
        this.x += this.vx * mouse.vmult;
        this.y += this.vy * mouse.vmult;



        // if near mouse
        var radiusOfInfluence = 75; 
        if ((Math.abs(mouse.x - this.x) < radiusOfInfluence) && (Math.abs(mouse.y - this.y) < radiusOfInfluence) ){
            if (this.radius < this.maxRadius) {
                this.radius += 0.5
            // user clicks
            var fac = 1
            this.x +=  (mouse.x - this.x)/Math.abs(mouse.x - this.x) * fac
            this.y +=  (mouse.y - this.y)/Math.abs(mouse.y - this.y) * fac
            }
        } else {
            if (this.radius > this.minRadius) {
                this.radius -= 0.5
            }
        }
        
        this.draw();
    };
};


// generate circles
var circle = [];
var numCircles = 400;
function init() {
    circle = [];
    for (var i = 0; i < numCircles; i++) {
        var radius =  Math.random() * 5 + 1;
        var x = Math.random() * (innerWidth - 2*radius) + radius;
        var y = Math.random() * (innerHeight - 2*radius) + radius;;
        var vx =  Math.round((Math.random() - 0.5) * 5) ;
        var vy = Math.round((Math.random() - 0.5) * 5) ;
        color = colorArray[Math.floor(Math.random() * colorArray.length)]
        circle.push(new Circle(x, y, vx, vy, radius, color))
    }

}

// call a recursive like function to draw each frame
function animate() {
    requestAnimationFrame(animate)

    // reset the canvas
    c.clearRect(0, 0, innerWidth, innerHeight);

    // update all circles
    for (var i = 0; i < circle.length; i++) {
        circle[i].update();
    }

}

init();
animate();