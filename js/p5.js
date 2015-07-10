//var height = window.innerHeight;
var height = 320;
var width = window.innerWidth;
var EDUCATION = 81.0164;
var HEALTH = 71.0244;
var LIFE = 67.924;
var ECONOMIC = 34.0862;
var POLITICAL = 58.6742;

var finish = new Boolean();

var theSpinTop = [];
var SpinPoints = [];

var numSPoint = 8;

var countangle = 0;
var SpinAngle = 360;
var PointNum;
var Frequency = 10;
var angle = 0;
var SpinLines = SpinAngle/Frequency;



var NAME = new String("test land");


var defaultx = 10;
var defaulty = 10;

var edu1 = 0;
var edu2 = 0;

var ValueRadius;
var lastX;
var lastY;
var eco = 0;
var number = new String();

$(document).ready(function(){
	var select1 = $('#CountriesSelect');
	var countr = $('#myDetails');
			$.ajax({
				type: "GET",
				url: "spintop.xml",
				dataType: "xml",
				success: function(xml) {
					$('c', xml).each(function(){
						//var title = $(this).find('name').text();
						var title = $(this).attr('name');
						select1.append("<option>"+title+"</option>");
					});
					
					$("#CountriesSelect").change(function()
					{
							$("#myDetails, .details").empty();
							var selectedIndex = $('#CountriesSelect option').index($('#CountriesSelect option:selected'));
							var ss = $(xml).find("s").eq(selectedIndex).each(function(){
							EDUCATION = $(this).attr('ed'); //EDUCATION
							HEALTH = $(this).attr('he'); //HEALTH
							LIFE = $(this).attr('li'); //LIFE
							ECONOMIC = $(this).attr('ec'); //ECONOMIC
							POLITICAL = $(this).attr('po'); //POLITICAL
							finish = false;
							
							/*$(".details").append('<li>' + EDUCATION + '</li>');
							$(".details").append('<li>' + HEALTH + '</li>');
							$(".details").append('<li>' + LIFE + '</li>');
							$(".details").append('<li>' + ECONOMIC + '</li>');
							$(".details").append('<li>' + POLITICAL + '</li>');*/
							//countr.append("<option>"+value+"</option>");
							});
							var ss = $(xml).find("c").eq(selectedIndex).each(function(){
								//var title = $(this).find('name').text();
								var title = $(this).attr('name');
								//$(".me").append('<li>' + title + '</li>');
								//var main = $("#aboutMe").val();
								$(".me").html("Download STL File of " + title).addClass("high");
								var titellink = "download.php?filename=" + title + ".stl";
								titellink = titellink.replace(/\s+/g,'');
								document.getElementById("download").setAttribute("href",titellink);
							});
							/*
								var main = $("#aboutMe").val();
								$(".me").html(main).addClass("high");
								$("#myDetails option").each(function()
								{
									var details = ($(this).val());
									$(".details").append('<li>' + details + '</li>');
								});*/
					});
					/*
					$('#aboutMe option:first').addClass("bold");
					$("#myDetails").change(function()
					{
						$(".details").empty();
						var detaSelec = $("#myDetails option:selected").val();
						$(".details").append("<li class='highSel'>" + detaSelec + "</li>");
					});*/
				}
			});
});


var sketch = new Processing.Sketch();
//define 3D context
sketch.use3DContext = true;

sketch.attachFunction = function(p5) {
	
	p5.setup = function() {
		finish = false;
		p5.size(600, 520,p5.P3D);
		
		//p5.noStroke();
		for(var i = 0; i < SpinLines;i++){
			for (var j = 0; j < numSPoint; j++) {
				theSpinTop.push({
					p:{
						x:0,
						y:0,
						z:0
					}
				});
			}
			angle += Frequency;
		}
		for(var i = 0; i < numSPoint;i++){
			SpinPoints.push({
				p:{
					x:0-defaultx,
					y:defaulty,
					z:0
				},
				r:{
					n:number,
					STradius:HEALTH
				}
			});
		}
	}
	
	p5.draw = function() {
		p5.background(255,255,255);
		if(!finish){
			
			UpdatePoints();
			/*console.log(EDUCATION);
			console.log(HEALTH);
			console.log(LIFE);
			console.log(ECONOMIC);
			console.log(POLITICAL);*/
		}
		//Title();
		//Values();
		Draw3D();
		
	}
	
	function CalculatePoint6Y(_EDUCATION) {
		  edu1 = p5.map(_EDUCATION, 0, 105, 75, 30);
		  return edu1;
		}

	function CalculatePoint6X(_EDUCATION) {
		  edu2 = p5.map(_EDUCATION, 0, 105, 90, 15);
		  return edu2;
		}

	function CalculatePointX(_ECONOMIC) {
		  eco = p5.map(_ECONOMIC, 0, 102, 100, 30);
		  return eco;
	}
	
	function UpdatePoints(){
		for (var j = 0; j < numSPoint; j++) {
			var x;
			var y;
		    switch(j){
		    case 0: 
		    	x = defaultx;
		      	y = 0;
		      break;
		    case 1: 
		    	x = defaultx;
		      	y = lastY  + POLITICAL - 20;
		      break;
		    case 2:     
		    	x = lastX + CalculatePointX(ECONOMIC)/2 + (100/POLITICAL)*20; 
		    	/*var temp04 = j * 10;
		    	//console.log(temp05);
		    	var temp01 = 50/1.7;
		    	var temp02 = j * temp01;
		    	var temp03 = Number(LIFE) + temp02;
		    	var temp04 = 100/POLITICAL;
		    	var temp05 = temp04*10;
		    	y = temp03 - temp05;*/
		    	y = Number(LIFE) + j*50/1.7 - (100/POLITICAL) *10; 
		      	//console.log(y);
		      break;
		    case 3: 
		    	x = lastX/10 + CalculatePointX(ECONOMIC)*2;
		      	y = Number(LIFE) + j*50/1.7;
		      break;
		    case 4: 
		    	x = lastX - CalculatePointX(ECONOMIC)/2;
		        y = Number(LIFE) + j*50/1.7;
		      break;
		    case 5: 
		    	x = lastX - CalculatePointX(ECONOMIC)/3;
		        y = Number(LIFE) + j*50/1.7;
		      break;
		    case 6:         
		    	x = CalculatePoint6X(EDUCATION);
		        y = lastY  + CalculatePoint6Y(EDUCATION);
		      break;
		    case 7: 
		      x = 0;
		      y = 300;
		      break;  
		    default:             
		      x = defaultx;
		      y = defaulty;
		      break;
		    }
		    SpinPoints[j].p.x = 0 - x;
		    SpinPoints[j].p.y = y;
		    //console.log("x: " + x);
		    //console.log("y: " + y);
		    angle = 0;
		    PointNumbr = 0;
		    UpdateSpinTop(HEALTH);
		    lastX = x;
		    lastY = y;	    
		  }
	}
	
	function UpdateSpinTop(_HEALTH) {
		  for (var i = 0; i < SpinLines; i++) {
		    if (angle > 210) { 
		      ValueRadius = 0;
		    }
		    else {          
		      var HealthCal = (100/_HEALTH)*20; 
		      var ValueRadiusNew = p5.map(HealthCal, 10, 400, 0, 100);
		      if (angle <= 45) {
		        ValueRadius -= ValueRadiusNew/4.5;
		      }
		      if (angle >= 45 && angle < 90) {
		        ValueRadius -= ValueRadiusNew/4.5;
		      } 
		      if (angle >= 90 && angle <= 135) {
		        ValueRadius -= ValueRadiusNew/4.5;
		      }
		      if (angle <= 210 && angle >= 135) {
		        ValueRadius += ValueRadiusNew/4.5;
		      }
		    }

		    for (var j = 0; j < numSPoint; j++) {      
		      CalcSpinPoint(PointNumbr, ValueRadius, j);
		      PointNumbr++;
		    }
		    angle += Frequency;
		  }
		  
		  finish = true;
	}
	
	function CalcSpinPoint(SpinTopNr, _ValueRadius, Nm) {
		  if (Nm == 6 || Nm == 7 || Nm == 0 || Nm == 1) {
		    _ValueRadius = 0;
		  }
		  //println(SpinPoints[Nm].x);
		  var d = p5.dist(SpinPoints[Nm].p.x, SpinPoints[Nm].p.y, _ValueRadius, SpinPoints[Nm].p.y); 
		  theSpinTop[SpinTopNr].p.x = p5.sin(p5.radians(angle))*d;
		  theSpinTop[SpinTopNr].p.y = SpinPoints[Nm].p.y;
		  theSpinTop[SpinTopNr].p.z = p5.cos(p5.radians(angle))*d;
	}
	
	function Draw3D() {
		  if (countangle > 360) {
		    countangle = 0;
		  }
		  //console.log("ich zeichne neu");
		  p5.pushMatrix();
		  p5.translate(p5.width/2, p5.height/10*4); 
		  p5.rotateY(p5.radians(countangle));
		  
		  //SpinTopDrawRect(); 
		  SpinTopDrawShape();
		  p5.popMatrix();
		  countangle ++;
	}
	
	function SpinTopDrawRect() {
		  for (var j = 0; j < theSpinTop.length; j++) {
		    p5.fill(0);
		    p5.stroke(j);
		    //console.log(j);
		    /*p5.beginShape();
		    p5.vertex(theSpinTop[j].p.x, theSpinTop[j].p.y, theSpinTop[j].p.z);
		    p5.vertex(theSpinTop[j].p.x + 5, theSpinTop[j].p.y, theSpinTop[j].p.z);
		    p5.vertex(theSpinTop[j].p.x + 5, theSpinTop[j].p.y + 5, theSpinTop[j].p.z);
		    p5.vertex(theSpinTop[j].p.x, theSpinTop[j].p.y + 5, theSpinTop[j].p.z);
		    p5.endShape(p5.CLOSE);*/
		    p5.point(theSpinTop[j].p.x, theSpinTop[j].p.y + 5, theSpinTop[j].p.z);
		    p5.line(theSpinTop[j].p.x, theSpinTop[j].p.y, 0,0);
		  }
		/*for (var j = 0; j < theSpinTop.length; j++) {
	    p5.fill(0);
	    p5.point(theSpinTop[j].p.x, theSpinTop[j].p.y + 5, theSpinTop[j].p.z);
	  }*/
	}
	
	function SpinTopDrawShape() {
		  p5.fill(255);
		  p5.strokeWeight(.1);
		  p5.stroke(20);    
		  //console.log("DrawSpinTop");
		  var e = 0;
		  while (e <= theSpinTop.length-numSPoint) {

			  p5.fill(255);
		    if (e == theSpinTop.length-numSPoint) {
		      //TOP
		    	p5.beginShape(p5.TRIANGLE_FAN);
		    	p5.vertex(theSpinTop[e].p.x, theSpinTop[e].p.y, theSpinTop[e].p.z);     
		    	p5.vertex(theSpinTop[0].p.x, theSpinTop[0].p.y, theSpinTop[0].p.z);
		    	p5.vertex(0, theSpinTop[0].p.y, 0);
		    	p5.endShape(p5.CLOSE); 

		      //BOTTOM
		    	p5.beginShape(p5.TRIANGLE_FAN);
		    	p5.vertex(theSpinTop[e + numSPoint - 1].p.x, theSpinTop[e + numSPoint - 1].p.y, theSpinTop[e + numSPoint - 1].p.z);     
		    	p5.vertex(theSpinTop[numSPoint - 1].p.x, theSpinTop[numSPoint - 1].p.y, theSpinTop[numSPoint - 1].p.z);
		    	p5.vertex(0, theSpinTop[numSPoint - 1].p.y, 0);
		    	p5.endShape(p5.CLOSE); // AENDERN!!
		    }
		    else {
		      //TOP
		    	p5.beginShape(p5.TRIANGLE_FAN);
		    	p5.vertex(theSpinTop[e].p.x, theSpinTop[e].p.y, theSpinTop[e].p.z);     
		    	p5.vertex(theSpinTop[e + numSPoint].p.x, theSpinTop[e + numSPoint].p.y, theSpinTop[e + numSPoint].p.z);
		    	p5.vertex(0, theSpinTop[0].p.y, 0);
		    	p5.endShape(p5.CLOSE); 

		      //BOTTOM
		    	p5.beginShape(p5.TRIANGLE_FAN);
		    	p5.vertex(theSpinTop[e + numSPoint - 1].p.x, theSpinTop[e + numSPoint - 1].p.y, theSpinTop[e + numSPoint - 1].p.z);     
		    	p5.vertex(theSpinTop[e + numSPoint + numSPoint - 1].p.x, theSpinTop[e + numSPoint + numSPoint - 1].p.y, theSpinTop[e + numSPoint + numSPoint - 1].p.z);
		    	p5.vertex(0, theSpinTop[numSPoint - 1].p.y, 0);
		    	p5.endShape(p5.CLOSE);
		    }
		    //BODY
		    for (var j = 0; j < numSPoint-1; j++) {
		      var test = j+e;
		      p5.fill(255);
		      if (e == theSpinTop.length-numSPoint) {       
		    	  p5.beginShape(p5.TRIANGLE_FAN);
		    	  p5.vertex(theSpinTop[e + j].p.x, theSpinTop[e + j].p.y, theSpinTop[e + j].p.z);     
		    	  p5.vertex(theSpinTop[0 + j].p.x, theSpinTop[0 + j].p.y, theSpinTop[0 + j].p.z);
		    	  p5.vertex(theSpinTop[0 + j + 1].p.x, theSpinTop[0 + j + 1].p.y, theSpinTop[0 + j + 1].p.z);
		    	  p5.vertex(theSpinTop[e + j + 1].p.x, theSpinTop[e + j + 1].p.y, theSpinTop[e + j + 1].p.z);
		    	  p5.endShape(p5.CLOSE);
		      }
		      else {        
		    	  p5.beginShape(p5.TRIANGLE_FAN);
		    	  p5.vertex(theSpinTop[e + j].p.x, theSpinTop[e + j].p.y, theSpinTop[e + j].p.z);      
		    	  p5.vertex(theSpinTop[e + j + numSPoint].p.x, theSpinTop[e + j + numSPoint].p.y, theSpinTop[e + j + numSPoint].p.z);
		    	  p5.vertex(theSpinTop[e + j + numSPoint + 1].p.x, theSpinTop[e + j + numSPoint + 1].p.y, theSpinTop[e + j + numSPoint + 1].p.z);
		    	  p5.vertex(theSpinTop[e + j + 1].p.x, theSpinTop[e + j + 1].p.y, theSpinTop[e + j + 1].p.z);
		        p5.endShape(p5.CLOSE);
		      }
		    }

		    e = e + numSPoint;
		  }
		}
	
}


var canvas = document.getElementById("canvas1");
//attaching the sketchProc function to the canvas
var p = new Processing(canvas, sketch);
