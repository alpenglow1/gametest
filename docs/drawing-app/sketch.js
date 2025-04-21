function setup() {
    createCanvas(800, 600);
    background(20, 40, 80);
    strokeWeight(3);
    colorMode(RGB, 255, 255, 255, 1);
    
    describe('An interactive canvas where users can draw colorful glowing lines');
}

function mouseDragged() {
    let r = map(mouseX, 0, width, 50, 255);
    let b = map(mouseY, 0, height, 50, 255);
    let g = (r + b) / 2;
    
    stroke(r, g, b, 0.7);

    let offsetX = random(-2, 2);
    let offsetY = random(-2, 2);

    line(pmouseX, pmouseY, mouseX + offsetX, mouseY + offsetY);
}
