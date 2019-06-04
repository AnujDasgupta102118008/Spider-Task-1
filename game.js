var canvas=document.getElementById('canvas');
if(canvas.getContext)
	{
	var ctx=canvas.getContext('2d');
	console.log("Canvas On");
	}
var cw='FALSE';
var acw='FALSE';

var redBall ={
		x:200,
        y:575,
        color:"red",
        radius:10,
        draw: function(){
	    ctx.beginPath();
	    ctx.arc(this.x,this.y,this.radius,0,2*Math.PI,true);
	    ctx.closePath();
	    ctx.fillStyle=this.color;
	    ctx.fill();
	    //console.log("drawr");
	}
};

var blueBall ={
		x:400,
        y:575,
        color:"blue",
        radius:10,
        draw: function(){
	    ctx.beginPath();
	    ctx.arc(this.x,this.y,this.radius,0,2*Math.PI,true);
	    ctx.closePath();
	    ctx.fillStyle=this.color;
	    ctx.fill();
	    //console.log("drawb");
	}
};
var obs=[];

function bgDraw()
{
ctx.fillStyle="black";
ctx.fillRect(0,0,600,900);
//console.log("bg draw");
}

function orbitDraw()
{
ctx.beginPath();
ctx.strokeStyle="grey";
ctx.arc(300,575,100,0,2*Math.PI);
ctx.stroke();
}

var cx,cy;
var d=(Math.PI)/10,angle1=0,angle2=Math.PI;

document.addEventListener('keydown',function(event){
	console.log(event.key,event.keyCode);
	if(event.keyCode==37)
		{ 
		cw='TRUE';
		angle1+=d;
		angle2+=d;
		console.log(angle1);
		console.log(angle2);
		}
	else
		if(event.keyCode==39)
			{
			acw='TRUE';
			angle1-=d;
			angle2-=d;
			console.log(angle1);
			console.log(angle2);
			}
});
	
document.addEventListener('keyup',function(event){
	console.log(event.key,event.keyCode);
	if(event.keyCode==37)
		{
		cw='FALSE';
		}
	else
		if(event.keyCode==39)
			{
			acw='FALSE';
			}
});

function genObs(){
var obstacle= new Object();
		obstacle.x=Math.floor(Math.random()*300+70);
		obstacle.width = Math.floor(Math.random()*100+70);
		obstacle.height = Math.floor(Math.random()*100+70);
		obstacle.spd=5;
		obstacle.color = "white";
obs.push(obstacle);
console.log("genObs");
}
var score={
		val:0,
		id:"Run "
};
var icr=5;
var a=-1;
function drawObs(){
	for(var i=0;i<obs.length;i++)
		{console.log(obs[i]);
		for(var j=0;j<1000;j++);
			ctx.beginPath();
			ctx.fillStyle=obs[i].color;
			ctx.fillRect(obs[i].x,obs[i].spd,obs[i].width,obs[i].height);
			if(a%600==0)
				icr+=0.25;
		   obs[i].spd+=icr;
		   ctx.closePath();
		   if( collision(redBall,obs[i]) || collision(blueBall,obs[i]))
			   over();
		}
}

function collision(circle,rect)
{ 
	var distX = Math.abs(circle.x - rect.x-rect.width/2);
    var distY = Math.abs(circle.y - rect.spd-rect.height/2);

    if (distX > (rect.width/2 + circle.radius)) { return false; }
    if (distY > (rect.height/2 + circle.radius)) { return false; }

    if (distX <= (rect.width/2)) { return true; } 
    if (distY <= (rect.height/2)) { return true; }

    var dx=distX-rect.width/2;
    var dy=distY-rect.height/2;
    if (dx*dx+dy*dy<=(circle.radius*circle.radius))
        return true;
}

var ctr=0;
var timeOutId=null;
var point=[];

function over()
{    ctr=localStorage.getItem('ctr');
	ctr++;
	ctx.clearRect(0,0,600,900);
	bgDraw();
	score.id+=ctr;
	localStorage.setItem('ctr',ctr);
	localStorage.setItem(score.id,JSON.stringify(score));
	ctx.fillStyle='white';
	ctx.font = '36px Arial';
	ctx.textAlign='center';
	ctx.fillText('GAME OVER :(',300,100);
	ctx.fillStyle='red';
	ctx.font ='28px Arial';
	ctx.fillText('This Run '+score.val,300,150);
	ctx.fillStyle='white';
	ctx.font ='28px Arial';
	var pos=225;
	ctx.fillText('Past HighScores',300,pos);
	for(var j=0;j<localStorage.length;j++)
		{ 
		    var key=localStorage.key(j);
		    if(key.substring(0,3)=='Run')
		      {
		    	var q=JSON.parse(localStorage.getItem(key));
		        point.push(q);
		      }
		}
	point.sort(function(a,b){return b.val-a.val;});
	pos+=50;
	for(var k=0;k<point.length;k++)
		{
		    ctx.fillText(point[k].id+'   '+point[k].val,300,pos);
		    pos+=25;
		}
	pos+=25;
	ctx.fillText('Refresh page to play again',300,pos);
	console.log(point);
		cancelAnimationFrame();
		return;
		//menu();
		
}

function menu()
{
      bgDraw();
	  ctx.fillStyle = 'white';
	  ctx.font = '38px Arial';
	  ctx.textAlign = 'center';
	  ctx.fillText('The Game of Interdependence!', canvas.width / 2, canvas.height / 4);
	  ctx.font = '28px Arial';
	  ctx.fillText('Click to Start', canvas.width / 2, canvas.height / 2);
	  ctx.font = '24px Arial';
	  ctx.fillText('CONTROLS-', canvas.width / 2, (canvas.height / 4) * 3);
	  ctx.fillText('1.Left arrow key for clockwise movement', canvas.width / 2, ((canvas.height / 4) * 3)+25);
	  ctx.fillText('2.Right arrow key for anti-clockwise movement', canvas.width / 2, ((canvas.height / 4) * 3)+50);
	  ctx.fillText('3.Refresh to start new game', canvas.width / 2, ((canvas.height / 4) * 3)+75);
	  
	  
	  canvas.addEventListener('click', start);
}
function start()
{  
	//timeOutId=setInterval(genObs,3000);
	//setTimeout(genObs,1500);
	draw();
	canvas.removeEventListener('click',start);
}
var g;
function scr()
{
   ctx.fillStyle='white';
   ctx.font='22px Arial';
   ctx.textAlign='left';
   ctx.fillText('Score :'+score.val,4,25);
}
function draw()
{   a++;
	ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
	bgDraw();
	orbitDraw();
	if(a%125==0)
	{genObs();score.val++;}
	drawObs();
	redBall.x=(100*Math.cos(angle2))+300;
	redBall.y=(100*Math.sin(angle2))+575;
	blueBall.x=(100*Math.cos(angle1))+300;
	blueBall.y=(100*Math.sin(angle1))+575;
	redBall.draw();
	blueBall.draw();
	scr();
	 g= requestAnimationFrame(draw);
}
menu();
var canvas=document.getElementById('canvas');
if(canvas.getContext)
	{
	var ctx=canvas.getContext('2d');
	console.log("Canvas On");
	}
var cw='FALSE';
var acw='FALSE';

var redBall ={
		x:200,
        y:575,
        color:"red",
        radius:10,
        draw: function(){
	    ctx.beginPath();
	    ctx.arc(this.x,this.y,this.radius,0,2*Math.PI,true);
	    ctx.closePath();
	    ctx.fillStyle=this.color;
	    ctx.fill();
	    //console.log("drawr");
	}
};

var blueBall ={
		x:400,
        y:575,
        color:"blue",
        radius:10,
        draw: function(){
	    ctx.beginPath();
	    ctx.arc(this.x,this.y,this.radius,0,2*Math.PI,true);
	    ctx.closePath();
	    ctx.fillStyle=this.color;
	    ctx.fill();
	    //console.log("drawb");
	}
};
var obs=[];

function bgDraw()
{
ctx.fillStyle="black";
ctx.fillRect(0,0,600,900);
//console.log("bg draw");
}

function orbitDraw()
{
ctx.beginPath();
ctx.strokeStyle="grey";
ctx.arc(300,575,100,0,2*Math.PI);
ctx.stroke();
}

var cx,cy;
var d=(Math.PI)/10,angle1=0,angle2=Math.PI;

document.addEventListener('keydown',function(event){
	console.log(event.key,event.keyCode);
	if(event.keyCode==37)
		{ 
		cw='TRUE';
		angle1+=d;
		angle2+=d;
		console.log(angle1);
		console.log(angle2);
		}
	else
		if(event.keyCode==39)
			{
			acw='TRUE';
			angle1-=d;
			angle2-=d;
			console.log(angle1);
			console.log(angle2);
			}
});
	
document.addEventListener('keyup',function(event){
	console.log(event.key,event.keyCode);
	if(event.keyCode==37)
		{
		cw='FALSE';
		}
	else
		if(event.keyCode==39)
			{
			acw='FALSE';
			}
});

function genObs(){
var obstacle= new Object();
		obstacle.x=Math.floor(Math.random()*300+70);
		obstacle.width = Math.floor(Math.random()*100+70);
		obstacle.height = Math.floor(Math.random()*100+70);
		obstacle.spd=5;
		obstacle.color = "white";
obs.push(obstacle);
console.log("genObs");
}
var score={
		val:0,
		id:"Run "
};
var icr=5;
var a=-1;
function drawObs(){
	for(var i=0;i<obs.length;i++)
		{console.log(obs[i]);
		for(var j=0;j<1000;j++);
			ctx.beginPath();
			ctx.fillStyle=obs[i].color;
			ctx.fillRect(obs[i].x,obs[i].spd,obs[i].width,obs[i].height);
			if(a%600==0)
				icr+=0.25;
		   obs[i].spd+=icr;
		   ctx.closePath();
		   if( collision(redBall,obs[i]) || collision(blueBall,obs[i]))
			   over();
		}
}

function collision(circle,rect)
{ 
	var distX = Math.abs(circle.x - rect.x-rect.width/2);
    var distY = Math.abs(circle.y - rect.spd-rect.height/2);

    if (distX > (rect.width/2 + circle.radius)) { return false; }
    if (distY > (rect.height/2 + circle.radius)) { return false; }

    if (distX <= (rect.width/2)) { return true; } 
    if (distY <= (rect.height/2)) { return true; }

    var dx=distX-rect.width/2;
    var dy=distY-rect.height/2;
    if (dx*dx+dy*dy<=(circle.radius*circle.radius))
        return true;
}

var ctr=0;
var timeOutId=null;
var point=[];

function over()
{    ctr=localStorage.getItem('ctr');
	ctr++;
	ctx.clearRect(0,0,600,900);
	bgDraw();
	score.id+=ctr;
	localStorage.setItem('ctr',ctr);
	localStorage.setItem(score.id,JSON.stringify(score));
	ctx.fillStyle='white';
	ctx.font = '36px Arial';
	ctx.textAlign='center';
	ctx.fillText('GAME OVER :(',300,100);
	ctx.fillStyle='red';
	ctx.font ='28px Arial';
	ctx.fillText('This Run '+score.val,300,150);
	ctx.fillStyle='white';
	ctx.font ='28px Arial';
	var pos=225;
	ctx.fillText('Past HighScores',300,pos);
	for(var j=0;j<localStorage.length;j++)
		{ 
		    var key=localStorage.key(j);
		    if(key.substring(0,3)=='Run')
		      {
		    	var q=JSON.parse(localStorage.getItem(key));
		        point.push(q);
		      }
		}
	point.sort(function(a,b){return b.val-a.val;});
	pos+=50;
	for(var k=0;k<point.length;k++)
		{
		    ctx.fillText(point[k].id+'   '+point[k].val,300,pos);
		    pos+=25;
		}
	pos+=25;
	ctx.fillText('Refresh page to play again',300,pos);
	console.log(point);
		cancelAnimationFrame();
		return;
		//menu();
		
}

function menu()
{
      bgDraw();
	  ctx.fillStyle = 'white';
	  ctx.font = '38px Arial';
	  ctx.textAlign = 'center';
	  ctx.fillText('The Game of Interdependence!', canvas.width / 2, canvas.height / 4);
	  ctx.font = '28px Arial';
	  ctx.fillText('Click to Start', canvas.width / 2, canvas.height / 2);
	  ctx.font = '24px Arial';
	  ctx.fillText('CONTROLS-', canvas.width / 2, (canvas.height / 4) * 3);
	  ctx.fillText('1.Left arrow key for clockwise movement', canvas.width / 2, ((canvas.height / 4) * 3)+25);
	  ctx.fillText('2.Right arrow key for anti-clockwise movement', canvas.width / 2, ((canvas.height / 4) * 3)+50);
	  ctx.fillText('3.Refresh to start new game', canvas.width / 2, ((canvas.height / 4) * 3)+75);
	  
	  
	  canvas.addEventListener('click', start);
}
function start()
{  
	//timeOutId=setInterval(genObs,3000);
	//setTimeout(genObs,1500);
	draw();
	canvas.removeEventListener('click',start);
}
var g;
function scr()
{
   ctx.fillStyle='white';
   ctx.font='22px Arial';
   ctx.textAlign='left';
   ctx.fillText('Score :'+score.val,4,25);
}
function draw()
{   a++;
	ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
	bgDraw();
	orbitDraw();
	if(a%125==0)
	{genObs();score.val++;}
	drawObs();
	redBall.x=(100*Math.cos(angle2))+300;
	redBall.y=(100*Math.sin(angle2))+575;
	blueBall.x=(100*Math.cos(angle1))+300;
	blueBall.y=(100*Math.sin(angle1))+575;
	redBall.draw();
	blueBall.draw();
	scr();
	 g= requestAnimationFrame(draw);
}
menu();
canvas.focus();





