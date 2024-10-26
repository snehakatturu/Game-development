const canvas = document.querySelector('canvas')
const a = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
console.log(a)
const gravity = 1.5

const bgImage = new Image(); 
bgImage.src = './bg.webp';

class Player{
    constructor()
    {
        this.position = { x: 100, y: 100}
        this.width = 144
        this.height= 150
        this.velocity = { x: 0, y: 0 };
        this.isRunning = false;
        this.frameIndex = 0; // Current frame index for running animation
        this.frameSpeed = 20; // Speed of frame change (higher is slower)
        this.frameCount = 0; 

        this.imageRight = new Image();
        this.imageRight.src = './standright.png';

        this.imageRunRight = new Image();
        this.imageRunRight.src = './walkright.png';

        this.image = this.imageRight;

        
    }
    
    draw() 
    {
       
        if (this.isRunning) {
            
            const frameX = this.frameIndex * 144; 
            a.drawImage(this.imageRunRight, frameX, 0, 144, this.height, this.position.x, this.position.y, this.width, this.height);
        } else {
            // Draw the standing image
            a.drawImage(this.imageRight, this.position.x, this.position.y, this.width, this.height);
        }
        
    }
       
    
change()
{
    
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

   
    if(this.velocity.y + this.height + this.position.y <= canvas.height)
    {
      this.velocity.y += gravity;
    }
    if (this.position.y < 0) {
        this.position.y = 0,
        this.velocity.y = 0;
    }
       
    if (this.isRunning)
    {
        this.image = this.imageRunRight;
    } 
    else 
    {
        this.image = this.imageRight;
    }
    if (this.isRunning) 
    {
        this.frameCount++;
        if (this.frameCount % this.frameSpeed === 0) 
        {
            this.frameIndex = (this.frameIndex + 1) % 3; // Cycle through 3 frames
        }
    } 
    else 
    {
        this.frameIndex = 0; // Reset frame index when not running
        this.frameCount = 0; // Reset frame count when not running
    }
       this.draw()
}

}


class Base
{
    constructor({x , y})
    {
        this.position ={x , y}
        this.width =350
        this.height= 100
        this.image = new Image()
        this.image.src = './base6.jpg';

        
    }
    draw()
    {
        a.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        const grd = a.createRadialGradient(
            this.position.x + this.width / 2, // Center x
            this.position.y + this.height / 2, // Center y
            5, // Inner radius
            this.position.x + this.width / 2, // Center x
            this.position.y + this.height / 2, // Center y
            100 // Outer radius
        );
        grd.addColorStop(0, 'white');     // Center color
        grd.addColorStop(1, 'orange');    // Outer color
        
        // Fill with gradient
        a.fillStyle = grd;
        a.fillRect(this.position.x, this.position.y, this.width, this.height);

        
    }
}

// to call the funct

let player= new Player()
let bases = [new Base({ x: 0, y: canvas.height - 100 }), new Base({ x: 400, y: canvas.height - 200 }), new Base({ x: 750, y: canvas.height - 200 }), new Base({ x: 1150, y: canvas.height - 150 }), new Base({ x: 1600, y: canvas.height - 250 }), new Base({ x: 2000, y: canvas.height - 100 }), new Base({ x: 2500, y: canvas.height - 300 }), new Base({ x: 3000, y: canvas.height - 400}) ];
const keys = 
{
  right: 
  {
   pressed : false,
  } ,
  left: 
  {
   pressed : false,
  } 
}

Scrolloffset = 0
distanceCovered = 0;

function init() 
{
   player= new Player()
   bases = [new Base({ x: 0, y: canvas.height - 100 }), new Base({ x: 400, y: canvas.height - 200 }), new Base({ x: 750, y: canvas.height - 200 }), new Base({ x: 1150, y: canvas.height - 150 }), new Base({ x: 1600, y: canvas.height - 250 }), new Base({ x: 2000, y: canvas.height - 100 }), new Base({ x: 2500, y: canvas.height - 270 }), new Base({ x: 3000, y: canvas.height - 400}) ];

   const keys = 
{
  right: 
  {
   pressed : false,
  } ,
  left: 
  {
   pressed : false,
  } 
}
   

   Scrolloffset = 0;
   distanceCovered =0;
}

  function animate() 
  {
    requestAnimationFrame(animate);
    a.clearRect(0, 0, canvas.width, canvas.height);
    a.drawImage(bgImage,0, 0, canvas.width, canvas.height);
   
    bases.forEach((base) => {base.draw()});
    player.change(); 

    // to stop the player once player reaches the destination

    if (Scrolloffset >= 2300) {
        horizontalLimitReached = true;
        player.velocity.x = 0;  // Disable horizontal movement
    }

   
    const previousX = player.position.x;
    if (distanceCovered < 2300) 
    { 

     if(keys.right.pressed && player.position.x < 400)
     {
        player.velocity.x = 30
     }
      else if((keys.left.pressed && player.position.x > 100) || keys.left.pressed && Scrolloffset ==0 && player.position.x > 0)
     {
        player.velocity.x = -30
     }
     else
     {
        player.velocity.x = 0
        if(keys.right.pressed)
        {
            Scrolloffset += 30
            bases.forEach((base) => {base.position.x -= 5})
        }
        else if (keys.left.pressed && Scrolloffset > 0)
        {
            Scrolloffset -= 30
            bases.forEach((base) => {base.position.x += 5})
        }
     }
    }
    else 
    {
        player.velocity.x = 0; // Stop player movement
        console.log("Player has reached the set offset limit!");
    }
    console.log(Scrolloffset)
     
    if (keys.right.pressed)
    {
        distanceCovered += 5; // Increment distance covered when moving right
    } 
    else if (keys.left.pressed)
    {
        distanceCovered -= 5; // Decrement distance covered when moving left, if not less than 0
        if (distanceCovered < 0) 
        {
            distanceCovered = 0; // Prevent negative distance
        }
    }
    if (distanceCovered < 2300) 
    { 
    a.font = "20px Arial"; // Set font size and type
    a.strokeStyle = "black"; // Set text color
    a.strokeText("Distance Covered: " + distanceCovered, canvas.width - 250, 50); // Display distance
    }
    else{
        a.font = "20px Arial"; // Set font size and type
        a.strokeStyle = "black"; // Set text color
        a.strokeText("Game Finished succesfully",  canvas.width / 2 - 100, 50)
    }

    //collision detection
    bases.forEach((base) => {
    if(player.position.y + player.height <= base.position.y && player.position.y + player.height + player.velocity.y >= base.position.y && player.position.x + player.width >= base.position.x && player.position.x <= base.position.x + base.width)
    {
        player.velocity.y = 0
    }
    });

    // Win logic
    if (player.position.x >= 2300) {
        console.log('Congrats you win'); 
    }
    
    if (player.position.y > canvas.height)
    {
        init()// calling the function after lossing the game
    
    }
    }

    bgImage.onload = () => {
        animate(); // Start the animation once the image is loaded
    };

window.addEventListener('keydown', (event) => {
    switch(event.code) {
        case 'ArrowLeft':  
            console.log('left');
            keys.left.pressed = true
            player.isRunning = false;
            break;
        case 'ArrowRight':
            console.log('right');
            /*player.velocity.x += 10 this line is actually removed i want to test it */
            keys.right.pressed = true
            player.isRunning = true;
            break;
        case 'ArrowUp':
            console.log('up');
            if (player.position.y > 0) 
            {
                player.velocity.y -= 30
            }
            break;
        case 'ArrowDown':
            console.log('Down');
            break;
        default:
            console.log('Other key pressed');
    }
    console.log(keys.right.pressed)
    
});

window.addEventListener('keyup', (event) => {
    switch(event.code) {
        case 'ArrowLeft':  
            console.log('left');
            player.velocity.x = 0
            keys.left.pressed = false
            break;
        case 'ArrowRight':
            console.log('right');
            player.velocity.x = 0
            keys.right.pressed = false
            player.isRunning = false;
            break;
        case 'ArrowUp':
            console.log('up');
            break;
        case 'ArrowDown':
            console.log('Down');
            break;
        default:
            console.log('Other key pressed');
    }
    console.log(keys.right.pressed)
});

    


