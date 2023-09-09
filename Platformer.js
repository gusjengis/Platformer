//FUNCTIONS
function randomNum(min,max){
    return min + Math.floor(Math.random() * (max-min+1));
}
function newRectObj(x,y,w,h,foreground,color,key,keyNum){
    rectangleArray.push(new rectangle);
    rectangleArray[rectangleArray.length - 1].x = x;
    rectangleArray[rectangleArray.length - 1].y = y;
    rectangleArray[rectangleArray.length - 1].w = w;
    rectangleArray[rectangleArray.length - 1].h = h;
    if(foreground != null){
        rectangleArray[rectangleArray.length - 1].foreground = foreground;
    }
    if(color != null){
        rectangleArray[rectangleArray.length - 1].color = color;
    }
    if(key != null){
        rectangleArray[rectangleArray.length - 1].key = key;
    }
    if(keyNum != null){
        rectangleArray[rectangleArray.length - 1].keyNum = keyNum;
    }
}
function drawRectObjs(){
    for(k=0; k < rectangleArray.length; k++){
        if(rectangleArray[k].foreground == false){
            if(rectangleArray[k].color == "#ffffff"){
                frame.fillStyle = "gray"; 
            } else {
                frame.fillStyle = rectangleArray[k].color;
            }
            frame.fillRect(rectangleArray[k].x,rectangleArray[k].y,rectangleArray[k].w,rectangleArray[k].h);
        }
    }
    drawImg(false);
    updateProjectiles();
    for(k=0; k < rectangleArray.length; k++){
        if(rectangleArray[k].foreground == true){
            frame.fillStyle = rectangleArray[k].color;
            frame.fillRect(rectangleArray[k].x,rectangleArray[k].y,rectangleArray[k].w,rectangleArray[k].h);
        }
    }
    drawImg(true);
}
function newImg(src,x,y,foreground){
    imgArray.push(new img);
    imgArray[imgArray.length - 1].x = x;
    imgArray[imgArray.length - 1].y = y;
    imgArray[imgArray.length - 1].src = src;
    if(foreground != null){
        imgArray[imgArray.length - 1].foreground = foreground;
    }
}
function drawImg(foreground){
    for(k=0; k < imgArray.length; k++){
        if(imgArray[k].foreground == false && foreground == false){
            var temp = new Image;
            temp.src = imgArray[k].src;
            frame.drawImage(temp, imgArray[k].x, imgArray[k].y);
        }
        if(imgArray[k].foreground == true && foreground == true){
            var temp = new Image;
            temp.src = imgArray[k].src;
            frame.drawImage(temp, imgArray[k].x, imgArray[k].y);
        }
    }
}
function newSkeleton(x,y){
    skeletonArray.push(new skeleton);
    skeletonArray[skeletonArray.length - 1].x = x;
    skeletonArray[skeletonArray.length - 1].y = y;
}
function drawEnemies(){
    for(a=0; a < skeletonArray.length; a++){
        if(skeletonArray[a].x < player.x && pause == false){
            skeletonArray[a].x = skeletonArray[a].x + skeletonArray[a].speed;
            skeletonArray[a].direction = "right";
            skeletonImg.src = 'Assets/PlatformerSkeletonR.png';
        } else if(skeletonArray[a].x > player.x && pause == false){
            skeletonArray[a].x = skeletonArray[a].x - skeletonArray[a].speed;
            skeletonArray[a].direction = "left";
            skeletonImg.src = 'Assets/PlatformerSkeletonL.png';
        }
        frame.drawImage(skeletonImg, skeletonArray[a].x, skeletonArray[a].y);
        newRectObj(skeletonArray[a].x)
    }
}
function fireProjectile(){
    if(keyList[0] == true || keyList[3] == true){
        projectileArray.push(new projectile);
        var xV = event.clientX*canvasW/document.documentElement.clientWidth - projectileArray[projectileArray.length - 1].x;
        var yV = projectileArray[projectileArray.length - 1].y - event.clientY*canvasW/document.documentElement.clientWidth;
        if(keyList[3] == true){
            projectileArray[projectileArray.length - 1].damage = 10;
            projectileArray[projectileArray.length - 1].speed = 20;
        }
        if((xV < 0 && yV < 0) || (xV > 0 && yV < 0)){
            var temp = projectileArray[projectileArray.length - 1].speed/((xV/yV)**2+1)**(1/2);
            xV = -1*xV/yV * temp;
            yV = -1*temp;
        } else {
            var temp = projectileArray[projectileArray.length - 1].speed/((xV/yV)**2+1)**(1/2);
            xV = xV/yV * temp;
            yV = temp;
        }
        projectileArray[projectileArray.length - 1].xV = xV;
        projectileArray[projectileArray.length - 1].yV = yV;
    }
}
function updateProjectiles(){
    frame.fillStyle = "#ffffff";
    for (k=0; k < projectileArray.length; k++){
        if(pause == false){
            projectileArray[k].x = projectileArray[k].x + projectileArray[k].xV;
            projectileArray[k].y = projectileArray[k].y - projectileArray[k].yV;
        }
        if(keyList[3] == false){
            frame.fillStyle = "white";
            frame.fillRect(projectileArray[k].x - 2, projectileArray[k].y - 2, 4, 4);
        } else if(keyList[3] == true){
            frame.fillStyle = "#ff5d00";
            frame.fillRect(projectileArray[k].x - 3, projectileArray[k].y - 3, 6, 6);
            frame.fillStyle = "white";
        }
        if(projectileArray[k].x < 0 || projectileArray[k].x > canvasW || projectileArray[k].y < 0 || projectileArray[k].y > canvasH){
            projectileArray.splice(k,1);
        }
    }
}
function keydown(e) {
    if(e.keyCode == 97 || e.keyCode == 65){
        left = true;
        player.direction = "left";
    }
    if(e.keyCode == 100 || e.keyCode == 68){
        right = true;
        player.direction = "right";
    }
    if(e.keyCode == 83){
        down = true;
    }
    if(e.keyCode == 16){
        shift = true;
    }
    if(e.keyCode == 32){
        jumped = true;
        jumps = jumps + 1;
    }
    if(e.keyCode == 90){
        if(invert == false){
            invert = true;
        } else {
            invert = false;
        }
    }
    if(e.keyCode == 192){
        pause = true;
        setLevel("resume");
    }
    //console.log(e.keyCode);
}
function keyup(e) {
    if(e.keyCode == 97 || e.keyCode == 65){
        left = false;
    }
    if(e.keyCode == 100 || e.keyCode == 68){
        right = false;
    }
    if(e.keyCode == 83){
        down = false;
    }
    if(e.keyCode == 16){
        shift = false;
    }
}
function wasd() {
    if(shift == true && right == true){
        player.xV = 11;
    }
    else if(shift == true && left == true){
        player.xV = -11;
    }
    else if(right == true){
        player.xV = 6;
    } else {
        player.xV = -6;
    }
    if (left == true || right == true) {player.x = player.x + player.xV;}
}
function jump(){
    if(jumps == 0 && player.y < groundHeight){
	j = 1;
    }
    if(jumps == 2 && keyList[2] == true){
        j = 0;
	jumps = 3;
    }
    if(jumped == true){
        player.yV = 19 - j;
        j = j + g;
    }
}
function wrapAround(){
    if(player.x < -27){
        if(currentLevel == 1){
            currentLevel = currentLevel - 2;
        } else {
            currentLevel = currentLevel - 1;
        }
        setLevel("levelChange");
        player.x = canvasW;
    }
    if(player.x > canvasW){
        currentLevel = currentLevel + 1; 
        setLevel("levelChange");
        player.x = -27;
    }
}
function gravity() {
    if(jumped == false){
        player.yV = player.yV - g;
    }
    if(player.y >= groundHeight && jumped == false){
        player.y = groundHeight;
        player.yV = 0;
    }
    player.y = player.y - player.yV;
    if(player.y >= groundHeight){
        jumped = false;
        player.yV = 0;
        j = 0;
        jumps = 0;
    }
}
function collisions(){
    for(k=0; k < rectangleArray.length; k++){
        if(player.x < rectangleArray[k].x + rectangleArray[k].w && player.x + player.width > rectangleArray[k].x && player.y < rectangleArray[k].y + rectangleArray[k].h && player.y + player.height > rectangleArray[k].y){
            if(rectangleArray[k].key == true){
                keyList[rectangleArray[k].keyNum] = true;
                setLevel("keyGet");
            }
            if(player.xV > 0 && player.y > rectangleArray[k].y - player.height && player.y < rectangleArray[k].y + rectangleArray[k].h && player.x < rectangleArray[k].x && rectangleArray[k].foreground == true){
                player.x = rectangleArray[k].x - player.width;
            }
            else if(player.xV < 0 && player.y > rectangleArray[k].y - player.height && player.y < rectangleArray[k].y + rectangleArray[k].h && player.x + player.width > rectangleArray[k].x + rectangleArray[k].w && rectangleArray[k].foreground == true){
                player.x = rectangleArray[k].x + rectangleArray[k].w;
            }
            else if(player.yV < 0 && player.y > rectangleArray[k].y - player.height && rectangleArray[k].foreground == true){
                player.y = rectangleArray[k].y - player.height;
                groundHeight = rectangleArray[k].y - player.height;
                jumped = false;
                player.yV = 0;
                j = 0;
                jumps = 0;
            } else if(player.yV > 0 && player.y < rectangleArray[k].y + rectangleArray[k].h && rectangleArray[k].foreground == true){
                player.y = rectangleArray[k].y + rectangleArray[k].h;
                player.yV = 0;
            }
        } else {
            groundHeight = canvasH - 82;
        }
    }
    for(a=0; a < projectileArray.length; a++){
        for(k=0; k < rectangleArray.length; k++){
            if(projectileArray[a].x < rectangleArray[k].x + rectangleArray[k].w && projectileArray[a].x > rectangleArray[k].x && projectileArray[a].y < rectangleArray[k].y + rectangleArray[k].h && projectileArray[a].y > rectangleArray[k].y && rectangleArray[k].foreground == true){
                projectileArray.splice(a,1);
                a = a - 1;
            }
        }
    }
    for(a=0; a < projectileArray.length; a++){
        for(k=0; k < skeletonArray.length; k++){
            if(projectileArray[a].x < skeletonArray[k].x + skeletonArray[k].w && projectileArray[a].x > skeletonArray[k].x && projectileArray[a].y < skeletonArray[k].y + skeletonArray[k].h && projectileArray[a].y > skeletonArray[k].y){
                skeletonArray[k].HP = skeletonArray[k].HP - projectileArray[a].damage;
                projectileArray.splice(a,1);
                if(skeletonArray[k].HP <= 0){
                    skeletonArray.splice(k,1);
                    k = k - 1;
                    if(currentLevel == 5 && skeletonArray.length == 0){
                        keyList[4] = true;
                        setLevel("levelClear");
                    }
                    if(currentLevel == 4 && skeletonArray.length == 0){
                        keyList[1] = true;
                        setLevel("keyGet");
                    }
                }
                a = a - 1;
            }
        }
    }
    for(a=0; a < skeletonArray.length; a++){
        if(player.x < skeletonArray[a].x + skeletonArray[a].w && player.x + player.width > skeletonArray[a].x && player.y < skeletonArray[a].y + skeletonArray[a].h && player.y + player.height > skeletonArray[a].y){
            if(skeletonArray[a].x > player.x){
                skeletonArray[a].x = skeletonArray[a].x + 150;
                player.x = player.x - 150;
                player.HP = player.HP - skeletonArray[a].damage;
            } else if(skeletonArray[a].x < player.x){
                skeletonArray[a].x = skeletonArray[a].x - 150;
                player.x = player.x + 150;
                player.HP = player.HP - skeletonArray[a].damage;
            }
            if(player.HP <= 0){
                console.log("DEAD");
            }
        }
        for(k=0; k < rectangleArray.length; k++){
            if(skeletonArray[a].x < rectangleArray[k].x + rectangleArray[k].w && skeletonArray[a].x + skeletonArray[a].w > rectangleArray[k].x && skeletonArray[a].y < rectangleArray[k].y + rectangleArray[k].h && skeletonArray[a].y + skeletonArray[a].h > rectangleArray[k].y){
                if(rectangleArray[k].key == true){
                    keyList[rectangleArray[k].keyNum] = true;
                    setLevel("keyGet");
                }
                if(skeletonArray[a].xV > 0 && skeletonArray[a].y > rectangleArray[k].y - skeletonArray[a].h && skeletonArray[a].y < rectangleArray[k].y + rectangleArray[k].h && skeletonArray[a].x < rectangleArray[k].x && rectangleArray[k].foreground == true){
                    skeletonArray[a].x = rectangleArray[k].x - skeletonArray[a].w;
                }
                else if(skeletonArray[a].xV < 0 && skeletonArray[a].y > rectangleArray[k].y - skeletonArray[a].h && skeletonArray[a].y < rectangleArray[k].y + rectangleArray[k].h && skeletonArray[a].x + skeletonArray[a].width > rectangleArray[k].x + rectangleArray[k].w && rectangleArray[k].foreground == true){
                    skeletonArray[a].x = rectangleArray[k].x + rectangleArray[k].w;
                }
                else if(skeletonArray[a].yV < 0 && skeletonArray[a].y > rectangleArray[k].y - skeletonArray[a].h && rectangleArray[k].foreground == true){
                    skeletonArray[a].y = rectangleArray[k].y - skeletonArray[a].height;
                    groundHeight = rectangleArray[k].y - skeletonArray[a].height;
                    jumped = false;
                    skeletonArray[a].yV = 0;
                    j = 0;
                    jumps = 0;
                } else if(skeletonArray[a].yV > 0 && skeletonArray[a].y < rectangleArray[k].y + rectangleArray[k].h && rectangleArray[k].foreground == true){
                    skeletonArray[a].y = rectangleArray[k].y + rectangleArray[k].h;
                    skeletonArray[a].yV = 0;
                }
            } else {
                groundHeight = canvasH - 82;
            }
        }
    }
}
function drawChar() {
    if(player.direction == "left" && pause == false && keyList[2] == false){
        playerImg.src = 'Assets/PlatformerCharL.png';
    } else if(player.direction == "left" && keyList[2] == true){
        playerImg.src = 'Assets/PlatformerCharL2.png';
    }
    if(player.direction == "right" && pause == false && keyList[2] == false){
        playerImg.src = 'Assets/PlatformerCharR.png';
    } else if(player.direction == "right" && keyList[2] == true){
        playerImg.src = 'Assets/PlatformerCharR2.png';
    }
    frame.drawImage(playerImg,player.x,player.y);
}
function invertColors(){
    if(invert == true){
        frame.globalCompositeOperation='difference';
        frame.fillStyle='white';
        frame.fillRect(0,0,canvasW,canvasH);
    }
}
function stats() {
    console.clear();
    console.log(player.direction);
    console.log("X-Velocity: "+ player.xV);
    console.log("Y-Velocity: "+ player.yV);
    console.log("x: "+ player.x);
    console.log("y: "+ -1*(player.y-groundHeight));
    console.log(groundHeight);
}
function resumeButton(event){
    if(event.clientX*canvasW/document.documentElement.clientWidth > canvasW/2 - 350 && event.clientX*canvasW/document.documentElement.clientWidth < canvasW/2 + 250 && event.clientY*canvasW/document.documentElement.clientWidth > canvasH/2 - 259 && event.clientY*canvasW/document.documentElement.clientWidth < canvasH/2 - 47){
        display.requestFullscreen();
        pause = false;
        if(currentLevel == 0){
            currentLevel = 1;
        }
        setLevel("resume");
    }
}
function acceptInput(){
    document.onkeydown = keydown;
    document.onkeyup = keyup;
    document.onclick = fireProjectile;
}
//BUILDING
var currentLevel = 0;
function clearLevel(input){
    if(input == "resume"){
        rectangleArray.length = 0;
        drawRectObjs();
    } else {
        rectangleArray.length = 0;
        projectileArray.length = 0;
        skeletonArray.length = 0;
        imgArray.length = 0;
    }
}
function setLevel(input){
    clearLevel(input);
    if(currentLevel == 1){
        //intro level
        newRectObj()
        newRectObj(0, canvasH-2, canvasW, 2, true);
        newRectObj(0, 0, 25, canvasH, true);
        newRectObj(canvasW - 25, 0, 25, canvasH - 200, true);
        newRectObj(0, 0, canvasW/2, 10, true);
        newRectObj(canvasW/2 + 200, 0, canvasW/2 - 200, 10, true);
        newRectObj(0, 0, canvasW, canvasH, false);
        newImg('Assets/Controls.png',canvasW/2 - 571,canvasH/2 - 148, false);
    } else if(currentLevel == 2){
        //double jump unlock
            newRectObj(0, canvasH-2, canvasW, 2, true);
            newRectObj(0, 0, 25, canvasH - 200, true);
            newRectObj(canvasW - 25, 0, 25, canvasH - 200, true);
            newRectObj(0, 0, canvasW, 10, true);
            newRectObj(0, 0, canvasW, canvasH, false);
            newRectObj(canvasW - 225, 200, 325, 35, true);
            newRectObj(canvasW/2 - 325, canvasH - 180, 325, 30, true);
            newRectObj(canvasW/4 - 250   , canvasH - 358, 325, 30, true);
            newRectObj(canvasW/2 - 325, canvasH - 538, 325, 30, true);
            newRectObj(canvasW/2 - 325 + ((canvasW/2 - 325) - (canvasW/4 - 250)), canvasH - 718, 325, 30, true);
            newRectObj(3*canvasW/4 + 20, canvasH - 898, 80, 30, true);
            newRectObj(3*canvasW/4 + 200, canvasH - 1078, 80, 30, true);
            if(keyList[2] == false){
                newRectObj(canvasW - 25, canvasH - 200, 25, 198, true, "green");
                newRectObj(canvasW - 140, 80, 60, 60, true, "gray", true, 2);
                newImg('Assets/DoubleJump.png', canvasW - 140, 80);
            }
    } else if(currentLevel == 3){
        //double jump practice / gun unlock
        newRectObj(0, canvasH-2, canvasW, 2, true);
        newRectObj(0, 0, 25, canvasH - 200, true);
        newRectObj(canvasW - 25, 0, 25, canvasH - 200, true);
        newRectObj(0, 0, canvasW, 10, true);
        newRectObj(0, 0, canvasW, canvasH, false);
        newRectObj(2*canvasW/5 - 100, canvasH - 120, 200, 120, true);
        newRectObj(3*canvasW/5 - 100, canvasH - 120, 200, 120, true);
        newRectObj(0, canvasH - 385, 600, 35, true);
        newRectObj(canvasW - 600, canvasH - 385, 600, 35, true);
        newRectObj(canvasW/2 - 200, canvasH/2 + 50, 400, 50, true);
        newRectObj(canvasW/2 - 225, 360, 450, 50, true);
        newRectObj(canvasW/2 - 455, 0, 50, canvasH/2 - 80, true);
        newRectObj(canvasW/2 + 425, 0, 50, canvasH/2 - 80, true);
        newRectObj(canvasW/2 - 455, canvasH/2 - 100, 100, 20, true);
        newRectObj(canvasW/2 + 375, canvasH/2 - 100, 100, 20, true);
        newRectObj(0, 0, canvasW, 10, true);
        if(keyList[1] == false){
            newRectObj(canvasW - 25, canvasH - 200, 25, 198, false, "black");
        }
        if(keyList[0] == false){
            newRectObj(canvasW - 25, canvasH - 200, 25, 198, true, "red");
            newRectObj(canvasW/2 - 30, 300, 60, 60, true, "grey", true, 0);
            newImg('Assets/1x.png', canvasW/2 - 30, 300);
        }
    } else if(currentLevel == 4){
        //first fight
        newRectObj(0, canvasH-2, canvasW, 2, true);
        newRectObj(0, 0, 25, canvasH - 200, true);
        newRectObj(canvasW - 25, 0, 25, 150, true);
        newRectObj(canvasW - 25, 351, 25, canvasH - 350, true);
        newRectObj(0, 0, canvasW, 10, true);
        newRectObj(0, 0, canvasW, canvasH, false);
        newRectObj(0, canvasH - 425, 4*canvasW/5, 35, true);
        newRectObj(canvasW - 200, canvasH - 250, 200, 35, true);
        newRectObj(4*canvasW/5 - 25, canvasH - 425, 25, 225, true);
        newRectObj(canvasW - 725, 350, 825, 35, true);
        newRectObj(canvasW - 1025, 550, 200, 30, true);
        newRectObj(canvasW - 1725, 750, 500, 30, true);
        if(keyList[1] == false){
            if(input != "resume"){
                newSkeleton(4*canvasW/5 - 175, canvasH - 82);
            }
            newRectObj(0, canvasH - 200, 25, 198, false, "black");
            newRectObj(25, canvasH - 390, 4*canvasW/5 - 25, 388, false, "black");
            newRectObj(4*canvasW/5 - 25, canvasH - 200, 25, 198, true, "red");
        }
    } else if(currentLevel == 5) {
        //gun upgrade
        newRectObj(0, canvasH-2, canvasW, 2, true);
        newRectObj(0, 0, 25, 150, true);
        newRectObj(0, 351, 25, canvasH - 350, true);
        newRectObj(canvasW - 25, 0, 25, canvasH - 200, true);
        newRectObj(0, 0, canvasW, 10, true);
        newRectObj(0, 0, canvasW, canvasH, false);
        newRectObj(-75, 350, 400, 35, true);
        if(keyList[3] == false){
            newRectObj(canvasW/2 - 30, canvasH - 62, 60, 60, true, "gray", true, 3);
            newImg('Assets/10x.png', canvasW/2 - 30, canvasH - 62);
        } else if(keyList[3] == true ){
            newRectObj(0, 0, canvasW, canvasH, false, "black");
            if(keyList[4] == false){
                newSkeleton(2*canvasW/7, canvasH - 82);
                newSkeleton(3*canvasW/7, canvasH - 82);
                newSkeleton(5*canvasW/7, canvasH - 82);
                newSkeleton(6*canvasW/7, canvasH - 82);
                newRectObj(canvasW - 25, canvasH - 200, 25, 198, true);
            }
        if(input != "levelClear" || skeletonArray.length != 0){
            newRectObj(canvasW - 25, canvasH - 200, 25, 198, true);
        }
        }
    } else {
        newRectObj(0, canvasH-2, canvasW, 2, true);
        newRectObj(0, 0, 25, canvasH - 200, true);
        newRectObj(canvasW - 25, 0, 25, canvasH, true);
        newRectObj(0, 0, canvasW, 10, true);
    }
    if(keyList[2] == true){
        newImg('Assets/DoubleJump.png', canvasW - 110, 25);
    }
    if(keyList[3] == true){
        newImg('Assets/10x.png', canvasW - 195, 25);
    } else if(keyList[0] == true){
        newImg('Assets/1x.png', canvasW - 195, 25);
    }
}

//MAIN
window.onload = function(){
    setInterval(function(){
        if(pause == false){
            acceptInput();
            wasd();
            jump();
            wrapAround();
            gravity();
            collisions();
            frame.clearRect(0, 0, canvasW, canvasH);
            drawRectObjs();
            drawChar();
            drawEnemies();
            //stats();
        } else if(pause == true) {
            document.onclick = resumeButton;
            newRectObj(canvasW/2 - 400, canvasH/2 - 150, 800 , 300, true, "red");
            drawRectObjs();
            drawChar();
            drawEnemies();
            frame.drawImage(introImg,canvasW/2 - 350,canvasH/2 - 259);
        }
    }, 1000/FPS);
} 

window.onresize = function(){
    document.body.style.zoom = document.documentElement.clientWidth/canvasW;
    document.body.style.zoom=document.body.style.zoom+0.1;
}