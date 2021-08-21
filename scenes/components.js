// =============================================================================
//  COLORS
// =============================================================================
var colorDict = {
    "grayRGB": [],
    "sunset2Sea": ['#D73E02', '#F35C03', 'yellow', '#AEDFF2', '#04B2D9', '#0669BF'],
    "boat": {
        "boat": "#8C3718",
        "sail": "#F2D0A7"
    },
    "sunGradient": [`rgb(255, 255, 0)`, 'rgb(255, 100, 0)'],
    "cloud": ["#FBDDB5", '#F35C03']
}

// =============================================================================
//  Utility functions
// =============================================================================
function RandomRange(start, end) {
    // random number between start and end
    var value = (Math.random() * (end - start)) + start
    return value
}

function RandomIntRange(start, end) {
    // random int including start and end
    var value = Math.floor(RandomRange(start, end + 1))
    return value
}

function RandomElementInArray(arr) {
    // random element 
    return arr[RandomIntRange(0, arr.length - 1)]
}

function drawArrayObjects(arr) {
    // calls the .draw() method on all array objects
    for (var i = 0; i < arr.length; i++) {
        arr[i].draw()
    }
}

function linspace(start, end, steps) {
    // linear steps 
    var stepSize = (end - start) / (steps - 1);
    var arr = [];
    for (var i = 0; i < steps; i++) {
        arr[i] = start + i * stepSize
    }
    return arr
}


// =============================================================================
//  Classes / Objects / Drawn things 
// =============================================================================

// Will draw a mountain at x,y with height (h) and width (w) using  across the screen
function Mountain(x, y, h, w, grayLevel, drawReflection = false) {
    this.x = x
    this.height = h
    this.width = w
    this.grayLevel = grayLevel
    this.y = y
    this.drawReflection = drawReflection // boolean

    this.draw = function () {
        c.beginPath();
        c.fillStyle = `rgba(${this.grayLevel}, ${this.grayLevel}, ${this.grayLevel}, ${1})`
        c.moveTo(this.x, this.y - this.height)
        c.lineTo(this.x + this.width, this.y)
        c.lineTo(this.x - this.width, this.y)
        c.fill();

        if (this.drawReflection) {
            c.beginPath();
            c.fillStyle = `rgba(${this.grayLevel}, ${this.grayLevel}, ${this.grayLevel + 50}, ${0.7} )`
            c.moveTo(this.x, this.y + this.height)
            c.lineTo(this.x + this.width, this.y)
            c.lineTo(this.x - this.width, this.y)
            c.fill();
        }
    };
};


// Will draw a boat at x,y with height (h) with different base and sail colors
function Boat(x, y, h, vx, boatColor, sailColor) {
    this.x = x
    this.y = y
    this.height = h
    this.constHeight = 270
    this.reflectionAlpha = "44" // hex
    this.vx = vx
    // boat measurments
    this.boatColor = boatColor
    this.bottomScale = this.height / this.constHeight
    this.boatDepth = 70 * this.bottomScale
    this.sailYOffset = 10 * this.bottomScale
    this.longLength = 150 * this.bottomScale
    this.shortLength = 100 * this.bottomScale
    // sail measuements
    this.sailColor = sailColor
    this.sailScale = this.height / this.constHeight
    this.sailHeight = 200 * this.sailScale
    this.sailLength = 100 * this.sailScale

    this.update = function (pixels) {
        this.x += pixels

        if (this.x > innerWidth) {
            this.x = 0
        }
        if (this.x < 0) {
            this.x = innerWidth
        }

        if ((pixels < 0) && (this.sailLength > 0)) {
            this.sailLength = - this.sailLength
        }
    }

    this.draw = function () {
        this.update(this.vx)
        // sail
        c.beginPath();
        c.fillStyle = this.sailColor
        c.moveTo(this.x, this.y - this.sailYOffset - this.boatDepth)
        c.lineTo(this.x, this.y - this.sailHeight - this.sailYOffset - this.boatDepth)
        c.lineTo(this.x + this.sailLength, this.y - this.sailYOffset - this.boatDepth)
        c.fill();

        // sail reflection
        c.beginPath();
        c.fillStyle = this.sailColor + this.reflectionAlpha
        c.moveTo(this.x, this.y + this.sailYOffset + this.boatDepth)
        c.lineTo(this.x, this.y + this.sailHeight + this.sailYOffset + this.boatDepth)
        c.lineTo(this.x + this.sailLength, this.y + this.sailYOffset + this.boatDepth)
        c.fill();

        // boat
        c.beginPath();
        c.fillStyle = this.boatColor
        c.moveTo(this.x, this.y - this.boatDepth)
        c.lineTo(this.x + this.longLength, this.y - this.boatDepth)
        c.lineTo(this.x + this.shortLength, this.y)
        c.lineTo(this.x - this.shortLength, this.y)
        c.lineTo(this.x - this.longLength, this.y - this.boatDepth)
        c.fill();

        // boat reflection
        c.beginPath();
        c.fillStyle = this.boatColor + this.reflectionAlpha
        c.moveTo(this.x, this.y + this.boatDepth)
        c.lineTo(this.x + this.longLength, this.y + this.boatDepth)
        c.lineTo(this.x + this.shortLength, this.y)
        c.lineTo(this.x - this.shortLength, this.y)
        c.lineTo(this.x - this.longLength, this.y + this.boatDepth)
        c.fill();
    }
}


function LightRay(x, y, vx, vy, radius, color, decayFactor) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.linewidth = radius;
    this.color = color;
    this.initalAlpha = 1;
    this.decayFactor = decayFactor;// 0.004

    this.update = function () {
        // update velocity
        this.x += this.vx;
        this.y += this.vy;
        this.initalAlpha -= this.decayFactor;
    }

    this.draw = function () {
        this.update();

        // c.shadowBlur = 20;
        c.beginPath();
        c.moveTo(this.x, this.y)
        c.lineTo(this.x + this.vx * innerWidth * 0.05, this.y + this.vy * innerWidth * 0.05);
        c.lineCap = 'round';
        // c.shadowColor = 'white';
        c.strokeStyle = `rgba(255, ${this.color}, 0, ${this.initalAlpha})`;
        c.lineWidth = this.linewidth;
        c.stroke();
        // c.shadowBlur = 0;
    }
}

// Will draw 2 or 3 birds following the mouse around the screen
function InteractiveBirdFlock(x, y, wingSpan, flapVelocity) {
    this.x = x;
    this.y = y;
    // wing lengths
    this.wingSpan = wingSpan;
    this.elbowTipRatio = 1/3
    this.elbowLength = this.wingSpan * this.elbowTipRatio;
    this.tipLength = this.wingSpan - this.elbowLength;
    // flapping properties
    this.flapVelocity = flapVelocity; 
    this.offset = {
        x: this.wingSpan,
        y: this.wingSpan
    }
    this.wingPositionIndex = 0
    this.wing = {
        // angle
        elbow: [Math.PI/180*45, -Math.PI/180*20,-Math.PI/180*45],
        tip: [Math.PI/180*45, Math.PI/180*30, -Math.PI/180*45],
        steps:  Math.round(100 / this.flapVelocity)
    }
    this.wingList = {
        elbow: [].concat(
            linspace(this.wing.elbow[0], this.wing.elbow[1], this.wing.steps),
            linspace(this.wing.elbow[1], this.wing.elbow[2], this.wing.steps),
            linspace(this.wing.elbow[2], this.wing.elbow[0], this.wing.steps)),
        tip: [].concat(
            linspace(this.wing.tip[0], this.wing.tip[1], this.wing.steps),
            linspace(this.wing.tip[1], this.wing.tip[2], this.wing.steps),
            linspace(this.wing.tip[2], this.wing.tip[0], this.wing.steps)),
    }

    this.update = function (mouse) {
        this.x = mouse.x
        this.y = mouse.y
    }

    this.drawBird = function (x, y) {
        y = y - this.wingSpan/3
        // dynamic
        var elbowX = this.elbowLength * Math.cos(this.wingList.elbow[this.wingPositionIndex])
        var elbowY = this.elbowLength * Math.sin(this.wingList.elbow[this.wingPositionIndex])

        var tipX = this.tipLength * Math.cos(this.wingList.tip[this.wingPositionIndex]) + elbowX
        var tipY = this.tipLength * Math.sin(this.wingList.tip[this.wingPositionIndex]) + elbowY
        
        this.wingPositionIndex = (this.wingPositionIndex + 1) % this.wingList.elbow.length

        c.beginPath();
        c.moveTo(x, y )
        c.lineTo(x + elbowX, y + elbowY );
        c.lineTo(x + tipX, y + tipY);
        c.strokeStyle = "black";
        c.stroke();

        c.beginPath();
        c.moveTo(x, y )
        c.lineTo(x - elbowX, y + elbowY);
        c.lineTo(x - tipX, y + tipY);
        c.strokeStyle = "black";
        c.stroke();

    }

    this.draw = function (mouse) {
        this.update(mouse)
        this.drawBird(this.x, this.y)
        this.drawBird(this.x + this.offset.x, this.y + this.offset.y)

    }
}


// Will draw a group of clouds
function Cloud(x, y, h, vx, cloudColor) {
    this.x = x;
    this.y = y;
    this.height = h;
    this.vx = vx;
    this.cloudColor = cloudColor;

    this.update = function () {
        // TODO: will be updated with some velocity
        this.x = this.x
        this.y = this.y
    }

    this.drawCloud = function (x, y) {
        c.beginPath();
        c.arc(x, y, this.height, -Math.PI, 0, false);
        c.fillStyle = this.cloudColor;
        c.fill();
    }

    this.draw = function () {
        this.update()

        this.drawCloud(this.x + this.height * 1 / 2, this.y - this.height / 4)
        this.drawCloud(this.x + this.height, this.y + this.height / 4)
        this.drawCloud(this.x, this.y)

    }
}
