// =============================================================================
//  COLORS
// =============================================================================
var colorDict = {
    "grayRGB": [],
    "sunset2Sea": ['#D73E02', '#F35C03', 'yellow', '#AEDFF2', '#04B2D9', '#0669BF'],
    "boat": {
        "boat": "#8C3718",
        "sail": "#F2D0A7"
    }
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


// =============================================================================
//  Classes (ish?)
// =============================================================================

// Will draw a mountain at x,y with height (h) and width (w) using  across the screen
function drawMountain(x, y, h, w, grayLevel, drawReflection = false) {
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
function boat(x, y, h, boatColor, sailColor) {
    this.x = x
    this.y = y
    this.height = h
    this.constHeight = 270
    this.reflectionAlpha = "44" // hex
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
        // sail
        c.beginPath();
        c.fillStyle = this.sailColor
        c.moveTo(this.x, this.y - this.sailYOffset - this.boatDepth)
        c.lineTo(this.x, this.y - this.sailHeight - this.sailYOffset - this.boatDepth)
        c.lineTo(this.x + this.sailLength, this.y - this.sailYOffset - this.boatDepth)
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

        // sail reflection
        c.beginPath();
        c.fillStyle = this.sailColor + this.reflectionAlpha
        c.moveTo(this.x, this.y + this.sailYOffset + this.boatDepth)
        c.lineTo(this.x, this.y + this.sailHeight + this.sailYOffset + this.boatDepth)
        c.lineTo(this.x + this.sailLength, this.y + this.sailYOffset + this.boatDepth)
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
