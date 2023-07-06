let socket;
let inputString = '';
let yrname = '';
let inputBox;
let currUrl = '';
if (window.location.hostname == 'localhost') {
    currUrl = 'http://localhost:3000';
} else {
    currUrl = window.location.href;
}
function setup() {
    createCanvas(600, 400);
    background(21);
    textAlign(CENTER, CENTER);
    socket = io.connect(currUrl);
    print('connected at: ' + currUrl)
    socket.on('mouse', (data) => {
        fill(255, 0, 100);
        ellipse(data.x, data.y, 50);
        fill(0);
        text(data.n, data.x, data.y);
    });

    inputBox = createInput('add your name');
    inputBox.mousePressed(() => inputBox.value(''));
    inputBox.input(grabString);
}

function grabString() {
    inputString = this.value();
    print(inputString);
}

function keyPressed() {
    if (key == 'Enter') {
        yrname = inputString;
        inputBox.value('');
        print('its ' + yrname);
        let data = {
            x: mouseX,
            y: mouseY,
            n: yrname
        }
        socket.emit('mouse', data);
    }
}

function mouseDragged() {
    // background(21);
    fill(100, 0, 255);
    ellipse(mouseX, mouseY, 50);
    fill(0);
    text(yrname, mouseX, mouseY);
    let data = {
        x: mouseX,
        y: mouseY,
        n: yrname
    }
    socket.emit('mouse', data);
    //console.log('Sending: ' + data.x+','+data.y+','+data.n);
}

function draw() {
    // nothing to loop?
}