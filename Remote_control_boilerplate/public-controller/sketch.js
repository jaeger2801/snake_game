

//Create the socket
let socket = io();
let pantalla;

function setup() {
    pantalla = 0
    frameRate(16);
    createCanvas(windowWidth, windowHeight);

}

function draw() {
    switch (pantalla) {
        case 0:
            background(0);
            fill(255);

                movementButton('UP', windowWidth / 2, windowHeight / 3);
                movementButton('DOWN', windowWidth / 2, windowHeight / 1.5);
                movementButton('RIGHT', windowWidth / 1.5, windowHeight / 2);
                movementButton('LEFT', windowWidth / 3, windowHeight / 2);

            socket.on('finjuego', (finDelJuego) => {
                    pantalla = 1
                })
            
            
        break;
    
        case 1:
            
                background(0);
                fill(255);

                fill(255);
                textSize(20);
                text('Game Over', windowWidth / 2, windowHeight / 2);

                fill(255);
                textSize(10);
                text('gracias por jugar <3', windowWidth / 2 , windowHeight / 2 + 20);

                /* fill(0);
                textSize(20);
                text(puntos, windowWidth / 2, windowHeight / 2 + 40); */
            
        break;
        
    }
    

    /* ellipse.up(posX, posY, 50, 50); */

   


}

function movementButton(direction, posX, posY) {
    fill(235, 190, 155);
    ellipse(posX, posY, 50, 50);
    if (dist(pmouseX, pmouseY, posX, posY) < 50) {
        //Send the direction to the server
        socket.emit('position', direction);
    }   
}; 



