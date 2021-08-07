
// Set canvas H and W
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// drawing
var c = canvas.getContext('2d')

window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x
        mouse.y = event.y
    })

var mouse = {
    x : undefined,
    y : undefined
}

function Circle(x, y, vx, vy, radius) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.maxRadius = 60;
    this.minRadius = radius
    this.color = "blue";

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.stroke();
        c.fill();
    };

    this.update = function() {
        if (this.x > innerWidth-this.radius || this.x < this.radius ) {
            this.vx = -this.vx
        }
        if (this.y > innerHeight-this.radius || this.y < this.radius ) {
            this.vy = -this.vy
        }

        this.x += this.vx
        this.y += this.vy

        if ((Math.abs(mouse.x - this.x) < 50) && (Math.abs(mouse.y - this.y) < 50) ){
            if (this.radius < this.maxRadius) {
                this.radius += 1
            }
        } else {
            if (this.radius > this.minRadius) {
                this.radius -= 1
            }
        }
        
   

        this.draw();
    };
};


// generate circles
var circle = [];
var numCircles = 400;
for (var i = 0; i < numCircles; i++) {
    var radius =  Math.random() * 15 + 1;
    var x = Math.random() * (innerWidth - 2*radius) + radius;
    var y = Math.random() * (innerHeight - 2*radius) + radius;;
    var vx =  Math.round((Math.random() - 0.5) * 10) ;
    var vy = Math.round((Math.random() - 0.5) * 10) ;
    circle.push(new Circle(x, y, vx, vy, radius))
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

animate();