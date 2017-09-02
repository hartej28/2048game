var Game= (function() {
    var change=false;
    function rotatearray() {

var noo=4;
var tmp;
for (var ii=0; ii<noo/2; ii++){
        for (var jj=ii; jj<noo-ii-1; jj++){
                tmp=mat[ii][jj];
                qwe['el'+(4*ii + jj +1)].classList.remove("tile_"+mat[ii][jj]);
                mat[ii][jj]=mat[jj][noo-ii-1];
                qwe['el'+(4*jj + noo-ii-1 +1)].classList.remove("tile_"+mat[jj][noo-ii-1]);
                mat[jj][noo-ii-1]=mat[noo-ii-1][noo-jj-1];
                qwe['el'+(4*(noo-ii-1) + noo-jj-1 +1)].classList.remove("tile_"+mat[noo-ii-1][noo-jj-1]);
                mat[noo-ii-1][noo-jj-1]=mat[noo-jj-1][ii];
                qwe['el'+(4*(noo-jj-1) + ii +1)].classList.remove("tile_"+mat[noo-jj-1][ii]);
                mat[noo-jj-1][ii]=tmp;
        }
}
}
    var qwe={};
    var el1,el2,el3,el4,el5,el6,el7,el8,el9,el10,el11,el12,el13,el14,el15,el16;
    var mat = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    var score = 0;
    var show2048dialog = 0;
    // function to change state of mat;
    // and set show2048dialog variable if required
    function moveLeft() {
                      rotatearray();

                 rotatearray();
                  rotatearray();
                  var left1=moveTop();
                   rotatearray();
                   if(left1===true) {
                fillOneRandomEmptyCell();
                
            }
            redraw();
    }
    function moveRight() {
        rotatearray();
           var right1=moveTop();
           rotatearray();
           rotatearray();
            rotatearray();
            if(right1===true) {
            fillOneRandomEmptyCell();
                
            }
            redraw();
    }
    function moveTop() {
        var full;
        change=false;
          var k;
          var done = false,firstzero=false;
        var curx=-1,cury=-1;
        for(var i=0;i< 4; i++)
        {
            done=false;
            for(var j=0;j<4;j++)
            {

                if(mat[j][i]!==0)
                {
                    curx=j;
                    cury=i;

                    for(k =j-1;k>=0;k--)
                        {
                    if((mat[k][i]===mat[curx][cury]&&mat[k][i]!==0)&&done===false)
                    {
                    
                        
                        
                        qwe['el'+(4*k + i +1)].classList.remove("tile_"+mat[k][i]);

                        mat[k][i]=mat[curx][cury]+mat[k][i];
                        score+=mat[k][i];
                        var no= mat[k][i];
                        //qwe['el'+(4*k + i +1)].className += " tile_"+no;
                        qwe['el'+(4*curx +cury +1)].classList.remove("tile_"+mat[curx][cury]);
                        mat[curx][cury]=0;
                       // qwe['el'+(4*curx+cury+1)].className += " tile_0";
                        curx = k;
                        cury = i;
                        done=true;
                         change=true;
                    }
                    else if((mat[k][i]===mat[curx][cury]&&mat[k][i]!=0)&&done===true)
                    {
                        done=false;
                        continue;
                    }
                    else if(done===true&&mat[k][i]!=0){ 
                        done=false;
                        continue;
                    }
                     else if(mat[k][i]!=mat[curx][cury]&&mat[k][i]!=0)
                        break;
                    else if(mat[k][i]===0)
                    {
                                          
                       
                        qwe['el'+(4*k + i + 1)].classList.remove("tile_0");

                        mat[k][i]=mat[curx][cury];
                        //qwe['el'+(4*k + i + 1)].className += " tile_"+mat[curx][cury]
                      qwe['el'+(4*curx + cury + 1)].classList.remove("tile_"+mat[curx][cury]);
                        mat[curx][cury]=0;
                        //qwe['el'+(4*curx+cury+1)].className += " tile_0";

                        curx=k;
                        cury=i;
                      
                        change=true;
                        
                     
                        

                    }
                }

            }
        }
    }
    return change;
}
    function moveDown() {
        rotatearray();
        rotatearray();
       var down1= moveTop();
        rotatearray();
        rotatearray();
        if(down1===true) {
        fillOneRandomEmptyCell();
        
    }
    redraw();
        
}
    // reflect state of mat
    function redraw() {

        var a,b;
        document.getElementById("score").innerHTML=score;


        for(a=0;a<4;a++)
        {
            for(b=0;b<4;b++)
            {
                var pop=mat[a][b];
               
                qwe['el'+(4*a+b+1)].className += " tile_"+pop;

                 
            }
        }
    }

    // randomw number between 2 and 4
    
    function getRandomValue() {
          
         var x = Math.floor((Math.random() * 10) + 1);
         if(x===1)
            return 4;
        else 
            return 2;
    }
    // returns x.y of a random empty cell
    function getRandomEmptyCell() {
            var doner=false;


            while(doner!==true)
            {
                var i = Math.floor((Math.random() * 4) );
                var j = Math.floor((Math.random() * 4) );
                if(mat[i][j]===0) {
                  qwe['el'+(4*i + j + 1)].classList.remove("tile_0"); 
                  doner=true;
                  
                  
                }


            }
            return {
                    i:i,
                    j:j
        }

    }

    


    function fillOneRandomEmptyCell() {
        var coord = getRandomEmptyCell();
        var value = getRandomValue();
        mat[coord.i][coord.j] = value;
        
    }

    // checks if gameover
    function isGameOver() {}

    // show Dialog for GameOver()
    function showGameOverDialog() {}

    // show dialog for 2048
    function show2048Dialog() {

    }

    function move(e) {
       
        //depending upon keypress you call the respective function
         e.preventDefault();
        
        
        
       /* if (isGameOver()) {
            showGameOverDialog();
        }
        if (show2048dialog === true) {
            show2048Dialog();
            show2048dialog = false;
        }*/

        if (e.keyCode === 37) {
            moveLeft();

        } else if (e.keyCode === 38) {
            var rr=moveTop();
            console.log(rr);
            if(rr===true){
            fillOneRandomEmptyCell();
            redraw();

        }
            
        } else if (e.keyCode === 39) {
            moveRight();
        } else if (e.keyCode === 40) {
            moveDown();
        }
    }
    function reset(e) {

        if (e !== undefined) {
            e.preventDefault();
        }
        mat = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        score = 0;
        fillOneRandomEmptyCell();
        fillOneRandomEmptyCell();
        redraw();
    }
    function init(arr) {

        

         el1=document.getElementById(arr[0]);
         el2=document.getElementById(arr[1]);
         el3=document.getElementById(arr[2]);
         el4=document.getElementById(arr[3]);
         el5=document.getElementById(arr[4]);
         el6=document.getElementById(arr[5]);
         el7=document.getElementById(arr[6]);
         el8=document.getElementById(arr[7]);
         el9=document.getElementById(arr[8]);
         el10=document.getElementById(arr[9]);
         el11=document.getElementById(arr[10]);
         el12=document.getElementById(arr[11]);
         el13=document.getElementById(arr[12]);
         el14=document.getElementById(arr[13]);
         el15=document.getElementById(arr[14]);
         el16=document.getElementById(arr[15]);
         
   
     qwe['el1']=el1;
     qwe['el2']=el2;
     qwe['el3']=el3;
     qwe['el4']=el4;
     qwe['el5']=el5;
     qwe['el6']=el6;
     qwe['el7']=el7;
     qwe['el8']=el8;
     qwe['el9']=el9;
     qwe['el10']=el10;
     qwe['el11']=el11;
     qwe['el12']=el12;
     qwe['el13']=el13;
     qwe['el14']=el14;
     qwe['el15']=el15;
     qwe['el16']=el16;
     
reset();
        // add reset method on click actions of all the reset elements
        window.addEventListener('keydown', move);
        
                              
    }
    return {
        init : init
    };
})();
