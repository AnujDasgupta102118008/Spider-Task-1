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
        y:775,
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
        y:775,
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
ctx.arc(300,775,100,0,2*Math.PI);
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

/*function genObs(){
var obstacle= new Object();
		this.x=Math.floor(Math.random()*300+70);
		this.width = Math.floor(Math.random()*100+70);
		this.height = Math.floor(Math.random()*100+70);
        this.spd=10;
       this.color = "white";
this.draw= function ()
{
	//ctx.beginPath();
	ctx.fillStyle=this.color;
	ctx.fillRect(this.x,this.spd,this.width,this.height);
   spd+=10;
    //ctx.closePath();
};
obs.push(obstacle);
}

function drawObs(){
	for(var i=0;i<obs.length;i++)
		{
		obs[i].draw;
		}
}*/
function draw()
{  
	ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
	bgDraw();
	orbitDraw();
	//genObs();
	//drawObs();
	redBall.x=(100*Math.cos(angle2))+300;
	redBall.y=(100*Math.sin(angle2))+775;
	blueBall.x=(100*Math.cos(angle1))+300;
	blueBall.y=(100*Math.sin(angle1))+775;
	redBall.draw();
	blueBall.draw();
	 requestAnimationFrame(draw);
}
draw();


