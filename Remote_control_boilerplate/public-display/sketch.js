

//Create the socket
let socket = io();

let pantalla;
let puntos;
let ancho;

let imgFinal;
let serpientes;
let pastel;

let character = {
    x: 0,
    y: 0
};

let comida = {
    x: 0,
    y: 0
}
let speed = 10;

function preload() {
    imgFinal = new loadImage('data/que pro.jpg')
    serpientes = new loadImage('data/serpiente.png')
    pastel = new loadImage('data/pastel.png')
}

function setup() {

    pantalla = 0;
    puntos = 0;
    ancho = 180;

    frameRate(60);
    createCanvas(windowWidth, windowHeight);
    //configura la aparición de la sserpiente
    character.x = windowWidth / 2;
    character.y = windowHeight / 2;

    //Configura aparición de la comida
    comida.x = windowWidth / 2;
    comida.y = windowHeight / 2;
}

function draw() {

    switch(pantalla){
        //pantalla donde se desarrolla el juego
        case 0:
            background(40);

            /* fill(80, 36, 25);
            noStroke(); */
            image(serpientes,character.x, character.y, 90, 90);

           /*  fill(80, 36, 25);
            noStroke(); */
            image(pastel,comida.x, comida.y, 30, 30);

            atrapaComida();
            temporizador();
        break;

        case 1:
            background(40);
            
            
            
            
            image(imgFinal, 0, 0, windowHeight, windowWidth);
            /* fill(80, 36, 25);
            textSize(30);
            text('game over', windowWidth/2, windowHeight/2); */
            fill(255);
            textSize(40);
            noStroke();
            text(puntos, windowWidth/2+25, windowHeight/2 + 122);
            text('puntos obtenidos:', windowWidth/2-300, windowHeight/2 + 120);
            text('mira tu telefono', windowWidth/2-300, windowHeight/2 + 170);
           

            socket.emit('finjuego');
        break;
    }
    
}   
function atrapaComida() {
    if(dist(character.x, character.y, comida.x, comida.y) <= 45){
        comida.x = random(0, windowWidth-20);
        comida.y = random(0, windowHeight-80);
        puntos += 1

    }
}

function temporizador() {
    
    
    noFill()
    strokeWeight(5)
    stroke(255)
    rect(20, 20, 180, 20)

    fill(255);
    textSize(20);
    noStroke();
    text('Tiempo (1 min)', 220, 40);

    fill(255);
    textSize(20);
    noStroke();
    text('puntos:', 20, 80);
    text(puntos, 100, 80);
    
    
    fill(255);
    rect(20, 20, ancho, 20);
    
    if(frameCount % 60 === 0){
        ancho -= 3;
        if(ancho <= 0){
            ancho = 0
            pantalla = 1
            
            console.log('pasó un minuto');
        }
    }
    
}

/*
Listen to the event and use the directions
You may want to use switch-case structure
*/

    socket.on('position', (movement)=> {

        switch (movement) {
            case 'UP': 
            character.y -= speed;
                
                break;
        
                case 'DOWN': 
            character.y += speed;
                
                break;
    
                case 'RIGHT': 
            character.x += speed;
                
                break;
    
                case 'LEFT': 
            character.x -= speed;
                
                break;
            
        }
        
    })
    



/* socket.on('positions', (character) => {
    character.x, character.y = character;
}); */