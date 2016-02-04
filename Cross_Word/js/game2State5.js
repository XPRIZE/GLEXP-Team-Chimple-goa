	
var ansName = new Array();
var textId = new Array ();
var panId = new Array (); 
var overLap = new Array();

var panIdOrg = new Array();
var pankaj10 = new Array();
var squarePos = new Array();
var checkFlag ;
var checkFlag1;
var ans;
var textOverans;
var c =0;
var home;
var positionx, positiony;
/*var flagPeach1 = 0;
var flagPapa1 = 0;
var flagPeach2 =0;
var flagPapa2 =0;
var flagPeach3 = 0;
var flagPapa3 = 0;*/
var playState5 = {
	


	preload: function(){
								game.load.image('gamebg', 'assets/gamebg.png');
								game.load.image('1','assets/1.png');
								game.load.image('dot1','assets/dot1.png');
								game.load.image('bg_1','assets/bg_1.png');
								game.load.image('apple','assets/apple.png');
								game.load.image('grapes','assets/grapes.png');
								game.load.image('papaya','assets/papaya.png');
								game.load.image('panelDigi','assets/digital/panelDigi.png');
								game.load.image('panel1','assets/ansPanel1.png');
								game.load.image('1dark','assets/1dark.png');
								game.load.image('digitalBg','assets/digital/digitalBg.png');
								game.load.image('home','assets/home.png');
								game.load.image('home1','assets/home1.png');
								game.load.image('keyboard','assets/digital/keyboard.png');
								game.load.image('camera','assets/digital/camera.png');
								game.load.image('mouse','assets/digital/mouse.png');
								game.load.image('copier','assets/digital/copier.png');
								game.load.image('cpu','assets/digital/cpu.png');
								game.load.image('cellphone','assets/digital/cellphone.png');
								game.load.image('floppy','assets/digital/floppy.png');
								game.load.image('printer','assets/digital/printer.png');
								game.load.image('harddisk','assets/digital/harddisk.png');
								game.load.image('moniter','assets/digital/moniter.png');
								game.load.image('pendrive','assets/digital/pendrive.png');
								game.load.image('tablet','assets/digital/tablet.png');
	},


	gameLayout: function(){

									this.bg = game.add.image(0,0,'digitalBg');
									this.bg.alpha= .9;


									home1 = game.add.image(game.world.centerX-575,game.world.centerY-340,'home1');
									home1.anchor.setTo(.5,.5);
									home1.scale.setTo(.6,.6);
										home = game.add.image(game.world.centerX-575,game.world.centerY-347,'home');
									home.anchor.setTo(.5,.5);
									home.scale.setTo(.6,.6);
									home.inputEnabled = true;
									home.events.onInputDown.add(this.homeAgain, this);


										var posX =game.world.centerX-280;
								var posY= game.world.centerY-365;
							 	var addX= 0;
								var addY = 0;
								//var c =0;
								var img1Id =0;
								this.grid = game.add.group();
								//var squarePos = new Array();

								this.panel = game.add.image(0,game.world.centerY+230, 'panelDigi');
								//this.panel.tint = 0x70c1e5;
								for(var i=1; i<11; i++)
								{
									
									for(var j=1; j<11; j++)
									{
										   var realX = posX+addX;
								 		   var realY = posY+addY;
									//var	img ='this.image'+c;
									//console.log(img);
											var img1 = game.add.sprite(realX,realY,'1');
											img1.anchor.setTo(.5,.5);
											img1.scale.setTo(.9,.9);
											img1.id =img1Id+1;
											img1.alpha = 1;
											img1Id++;
											//img1.tint = 0xff00ff;
											
									     squarePos.push({X:img1.position.x, Y:img1.position.y, id:img1.id});

											addX= addX+60.66;	
									//	addX= addX+90;			
											c++;							
										}
										addY= addY+60.66;
										//addY= addY+90;
											addX= 0;
									}



	},

	word3:function(){


								this.props = game.add.group();

								 	this.grid.enableBody =true;
								game.physics.arcade.enable(this.grid);
							// this.image1.scale.setTo(.5,.5);
							var prop1 = ['K', ' ', 'Y', 'B', 'O', 'A', ' ','D'];
							var prop2=  ['H', 'A', 'R', 'D',' ', 'I','S', ' '];
							var prop3 = [' ', 'L', 'O', 'P', 'P', ' '];
							//var prop4= ['P', 'A', 'P', ' ', ' ', 'A'];

								this.prop1 = game.add.sprite(squarePos[7].X+4,squarePos[7].Y+13, 'harddisk',0,this.props);
								this.prop1.scale.x = .9;
								this.prop1.scale.y = .9;
								this.prop1.anchor.setTo(.5,.5);

								this.prop1Tween=game.add.tween(this.prop1);
								this.prop1Tween.to({x:this.prop1.position.x-10},1800, Phaser.Easing.Linear.None);
								this.prop1Tween.to({x:this.prop1.position.x+10},1800, Phaser.Easing.Linear.None);
								this.prop1Tween.to({x:this.prop1.position.x},1800, Phaser.Easing.Linear.None);
								this.prop1Tween.to( { angle: 360 }, 1000, Phaser.Easing.Quintic.Out, true);
								this.prop1Tween.loop();
								this.prop1Tween.start();
								


								this.prop3 = game.add.sprite(squarePos[15].X-10,squarePos[14].Y-28, 'floppy', 0, this.props);
								this.prop3.scale.x = .8;
								this.prop3.scale.y = .8;
								this.prop3.anchor.setTo(.5,.5);

										var prop3Tween=game.add.tween(this.prop3);
								prop3Tween.to({y:this.prop3.position.y-5},2500, Phaser.Easing.Linear.None);
								prop3Tween.to({angle:-45},1500, Phaser.Easing.Quintic.Out);
								prop3Tween.to({angle:45},1500, Phaser.Easing.Quintic.Out);
								prop3Tween.to({angle:360},1500, Phaser.Easing.Quintic.Out);
								prop3Tween.to({y:this.prop3.position.y},2500, Phaser.Easing.Linear.None);
								prop3Tween.loop();
								prop3Tween.start();


							

								this.prop2 = game.add.sprite(squarePos[30].X+10,squarePos[30].Y-27, 'keyboard',0,this.props);
								//this.prop2.scale.x = .7;
								//this.prop2.scale.y = .7;
								this.prop2.anchor.setTo(.5,.5);

								this.prop2Tween=game.add.tween(this.prop2);
								this.prop2Tween.to({x:this.prop2.position.x+15},2500, Phaser.Easing.Linear.None);
								this.prop2Tween.to({x:this.prop2.position.x},2500, Phaser.Easing.Linear.None);
								this.prop2Tween.loop();
								this.prop2Tween.start();

							
							//var appleBlank = [ 'P', 'L'];
						var	c1=0;
						var c12 = 0;
						var idOption = 1;
						var d =0
						
							this.squareOver = game.add.group();
							this.textOver = game.add.group();
							for(var i=0; i<8 ; i++)
						
							{  
								
								
									// for apple square text color
								
								var textXprop1 = squarePos[41+c1].X;
								var textYprop1 = squarePos[41+c1].Y;

								var squareprop1 = game.add.sprite(textXprop1,textYprop1,'1',0,  this.squareOver);
								squareprop1.anchor.setTo(.5,.5);
								squareprop1.scale.setTo(.9,.9);

										squareprop1.tint = 0xe60000;
										squareprop1.alpha= .5;
							

							this.text =game.add.text(textXprop1,textYprop1, prop1[i],{font:'32px Oswald', fill: "#ffffff"});
							this.text.anchor.setTo(.5,.5);
								this.textOver.add(this.text);
								if(prop1[i] === ' ')
								{
									
													var imgDot1 = game.add.sprite(textXprop1,textYprop1,'dot1',0,this.grid);
													imgDot1.anchor.setTo(.5,.5);
													imgDot1.scale.setTo(4,4);
													imgDot1.id = c;
													imgDot1.flag = 0;
													c++;
													panIdOrg.push(imgDot1);
								}

							
								//for peach square text color
								
						
								var textXprop2 = squarePos[18+c12].X;
								var textYprop2= squarePos[18+c12].Y;

								var squareprop2 = game.add.sprite(textXprop2,textYprop2,'1', 0,this.squareOver);
								squareprop2.anchor.setTo(.5,.5);
								squareprop2.scale.setTo(.9,.9);
								
								squareprop2.tint = 0xffd200;
								squareprop2.alpha = .5;

								
							
							this.text =game.add.text(textXprop2,textYprop2, prop2[i],{font:'32px Oswald', fill: "#ffffff"});
							this.text.anchor.setTo(.5,.5);
							
									this.textOver.add(this.text);
								if(prop2[i] === ' ')
								{
									
									var imgDot1 = game.add.sprite(textXprop2,textYprop2,'dot1',0,this.grid);
													imgDot1.anchor.setTo(.5,.5);
													imgDot1.scale.setTo(4,4);
													imgDot1.id = c;
													imgDot1.flag = 0;
													c++;
													panIdOrg.push(imgDot1);
								}

							

						//	this.textOver.add(this.text);
								//for grape square text color
								if(i<6)
						{
								var textXprop3 = squarePos[25+c12].X;
								var textYprop3= squarePos[25+c12].Y;

								
								
								var squareprop3 = game.add.sprite(textXprop3,textYprop3,'1',0, this.squareOver);
								squareprop3.anchor.setTo(.5,.5);
								squareprop3.scale.setTo(.9,.9);

								squareprop3.tint = 0x2da8f6;
								squareprop3.alpha= .5;

								
								this.text =game.add.text(textXprop3,textYprop3, prop3[i],{font:'32px Oswald',fill: "#ffffff"});
								this.text.anchor.setTo(.5,.5);
								this.textOver.add(this.text);
									if(prop3[i] === ' ')
								{
								
									var imgDot1 = game.add.sprite(textXprop3,textYprop3,'dot1',0,this.grid);
													imgDot1.anchor.setTo(.5,.5);
													imgDot1.scale.setTo(4,4);
													imgDot1.id = c;
													imgDot1.flag = 0;
													c++;
													panIdOrg.push(imgDot1);
								}

							}
								
							

										c1=c1+1;
										c12=c12+10;
							
							}

							
						//console.log(panIdOrg);

							this.squareAns = game.add.group();

							var letterAns = ['S','K', 'I', 'D', 'J', 'M', 'T', 'Q', 'R','Y', 'A', 'H', 'F', 'N', 'L', 'E'];
							this.option= game.add.group();
							optionPosx = game.world.centerX-350;
							optionPosy = game.world.centerY+285;
							optionAddx = 0;
							optionAddy = 0;
							

						for(var t=0; t<2; t++)
							{
								for(var e=0; e<8; e++)
								{
									optionRealx = optionPosx+optionAddx;
									optionRealy = optionPosy+optionAddy;

										ans1 = game.add.image(optionRealx, optionRealy, '1',0,this.squareAns);
	                   		 			ans1.anchor.setTo(.5,.5);
	                   		 			ans1.scale.setTo(.9,.9);  
	                   		 			ans1.tint = 0x000000;
	                   		 			ans1.alpha =.3;
										optionAddx= optionAddx+100;

								}
									optionAddx= 0;
									optionAddy =optionAddy+75;

							}
						
									//this.squareAns2 = game.add.group();
									textOverans = game.add.group();



							this.option= game.add.group();
							optionPosx = game.world.centerX-350;
							optionPosy = game.world.centerY+285;
							optionAddx = 0;
							optionAddy = 0;

							var r =0;
							var r1 =1;
							var f=0;

								for(var t=0; t<2; t++)
							{
								for(var e=0; e<8; e++)
							


							{
								optionRealx = optionPosx+optionAddx;
								optionRealy = optionPosy+optionAddy;


								var ans = 'ans'+r;
								ans = game.add.sprite(optionRealx, optionRealy, '1dark', 0, this.option);
								ans.flag = 0;
							//	ans.alpha= 2;
								ansName.push(ans);
						
							ans.id = r;
							ans.inputEnabled = true;
							ans.input.enableDrag();
							
	            			ans.anchor.setTo(.5,.5);   
	            			ans.tint = 0x262626;
	            			ans.scale.setTo(.9,.9); 
	                   		game.physics.arcade.enable(ans);

	                 		 // 	game.world.bringToTop(this.option);
	                   		var style = { font: "32px Oswald", fill: "#ffffff", align: "center" };

	                   		//textOpt = 'pan'+r;
	                   		//this.text =game.add.text(optionRealx, optionRealy, appleX[t],{font:'30px solid arial'});
	                   		//textOpt  =game.add.text(optionRealx, optionRealy, letterAns[f],style, this.textOverAns);
							textOpt  =game.add.text(optionRealx, optionRealy, letterAns[f],style);
							textOpt.anchor.setTo(.5,.5);
							textOpt.id = r1;
							//this.textOverAns.add(textOpt);
							
							panId.push(textOpt);
	                   		optionAddx= optionAddx+100;
	                   		
	                   		r++;
	                   		r1++;
	                   			 ans.events.onDragStart.add(this.onTop, this);
	                   		   ans.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, this.grid);}, this);
	                   		   ans.originalPosition = ans.position.clone();
	                   		   textOpt.originalPosition = textOpt.position.clone();
	                   		   ans.events.onDragUpdate.add(this.posupdate);

	                   		   f++;
	                   		//this.textOverans.add(textOpt);
	                   	}
	                   			optionAddx= 0;
	                   			optionAddy =optionAddy+75;
	                   }

	},

				// START
word5:function(){

								this.props = game.add.group();

								  	this.grid.enableBody =true;
									game.physics.arcade.enable(this.grid);
							// this.image1.scale.setTo(.5,.5);
							var prop1 = ['C', 'E', ' ', 'L', 'P','H', 'O', 'N', 'E'];
							var prop2 = [' ', 'A', ' ', 'L', 'E','T'];
							var prop3=  ['M', 'O', ' ', 'S', 'E'];
							var prop4=  [' ', 'O', 'N', 'I', 'T', 'E', ' '];
							var prop5=  ['C', ' ', 'U'];


								this.prop1 = game.add.sprite(squarePos[31].X+8,squarePos[31].Y-25, 'cpu',0,this.props);
								this.prop1.scale.x = .8;
								this.prop1.scale.y = .8;
								this.prop1.anchor.setTo(.5,.5);

								this.prop1Tween=game.add.tween(this.prop1);
								this.prop1Tween.to({x:this.prop1.position.x},1800, Phaser.Easing.Linear.None);
								this.prop1Tween.to({x:this.prop1.position.x+20},1800, Phaser.Easing.Linear.None);
								this.prop1Tween.to({x:this.prop1.position.x},1800, Phaser.Easing.Linear.None);
								this.prop1Tween.to( { angle: 360 }, 1000, Phaser.Easing.Quintic.Out, true);
								this.prop1Tween.loop();
								this.prop1Tween.start();
								


								this.prop3 = game.add.sprite(squarePos[17].X-12,squarePos[17].Y+40, 'mouse', 0, this.props);
								this.prop3.scale.x = .9;
								this.prop3.scale.y = .9;
								this.prop3.anchor.setTo(.5,.5);

								var prop3Tween=game.add.tween(this.prop3);
								prop3Tween.to({y:this.prop3.position.y-5},2500, Phaser.Easing.Linear.None);
								prop3Tween.to({angle:-45},1500, Phaser.Easing.Quintic.Out);
								prop3Tween.to({angle:45},1500, Phaser.Easing.Quintic.Out);
								prop3Tween.to({angle:360},1500, Phaser.Easing.Quintic.Out);
								prop3Tween.to({y:this.prop3.position.y},2500, Phaser.Easing.Linear.None);
								prop3Tween.loop();
								
								setTimeout(function(){prop3Tween.start();  }, 1400);

								this.prop4 = game.add.sprite(squarePos[30].X-50,squarePos[30].Y+15, 'cellphone',0,this.props);
								this.prop4.scale.x = .7;
								this.prop4.scale.y = .7;


								this.prop4Tween=game.add.tween(this.prop4);
								this.prop4Tween.to({y:this.prop4.position.y-15},2500, Phaser.Easing.Linear.None);
								this.prop4Tween.to({y:this.prop4.position.y},2500, Phaser.Easing.Linear.None);
								this.prop4Tween.loop();
								this.prop4Tween.start();

								this.prop5 = game.add.sprite(squarePos[71].X-10,squarePos[71].Y+25, 'moniter',0,this.props);
								this.prop5.scale.x = .7;
								this.prop5.scale.y = .7;
								this.prop5.anchor.setTo(.5,.5);
							
							
								this.prop5Tween=  game.add.tween(this.prop5)
								this.prop5Tween.to( { x:this.prop5.position.x-10}, 2000, "Linear");
								this.prop5Tween.to( { angle:-180}, 2000,  Phaser.Easing.Quintic.Out);
								
								this.prop5Tween.to( { angle:0}, 2000,  Phaser.Easing.Quintic.Out);
								this.prop5Tween.to( {  x:this.prop5.position.x}, 2000, "Linear");

 								this.prop5Tween.loop();
								this.prop5Tween.start();

								this.prop2 = game.add.sprite(squarePos[27].X-20,squarePos[7].Y-23, 'tablet',0,this.props);
								this.prop2.scale.x = .8;
								this.prop2.scale.y = .8;


								this.prop2Tween=game.add.tween(this.prop2);
								this.prop2Tween.to({y:this.prop2.position.y-15, x:this.prop2.position.x-15},2000, Phaser.Easing.Linear.None);
								this.prop2Tween.to({y:this.prop2.position.y-30, x:this.prop2.position.x},2000, Phaser.Easing.Linear.None);
								this.prop2Tween.to({y:this.prop2.position.y-15, x:this.prop2.position.x+15},2000, Phaser.Easing.Linear.None);
								this.prop2Tween.to({y:this.prop2.position.y, x:this.prop2.position.x},2000, Phaser.Easing.Linear.None);
								this.prop2Tween.loop();
								this.prop2Tween.start();

							
							//var appleBlank = [ 'P', 'L'];
						var	c1=0;
						var c12 = 0;
						var idOption = 1;
						var d =0
						
							this.squareOver = game.add.group();
							this.textOver = game.add.group();
							for(var i=0; i<9 ; i++)
						
							{  
								
								
									// for apple square text color
								
								var textXprop1 = squarePos[41+c1].X;
								var textYprop1 = squarePos[41+c1].Y;

								var squareprop1 = game.add.sprite(textXprop1,textYprop1,'1',0,  this.squareOver);
								squareprop1.anchor.setTo(.5,.5);
								squareprop1.scale.setTo(.9,.9);

										squareprop1.tint = 0xe60000;
										squareprop1.alpha= .5;
							

							this.text =game.add.text(textXprop1,textYprop1, prop1[i],{font:'32px Oswald', fill: "#ffffff"});
							this.text.anchor.setTo(.5,.5);

								if(prop1[i] === ' ')
								{
									
													var imgDot1 = game.add.sprite(textXprop1,textYprop1,'dot1',0,this.grid);
													imgDot1.anchor.setTo(.5,.5);
													imgDot1.scale.setTo(4,4);
													imgDot1.id = c;
													imgDot1.flag = 0;
													c++;
													panIdOrg.push(imgDot1);
								}


							if(i<6)	//for peach square text color
							{
								var textXprop2 = squarePos[9+c12].X;
								var textYprop2= squarePos[9+c12].Y;

								var squareprop2 = game.add.sprite(textXprop2,textYprop2,'1', this.squareOver);
								squareprop2.anchor.setTo(.5,.5);
								squareprop2.scale.setTo(.9,.9);
								
								squareprop2.tint = 0xffd200;
								squareprop2.alpha = .5;

								
							
							this.text =game.add.text(textXprop2,textYprop2, prop2[i],{font:'32px Oswald', fill: "#ffffff"});
							this.text.anchor.setTo(.5,.5);


								if(prop2[i] === ' ')
								{
									
									var imgDot1 = game.add.sprite(textXprop2,textYprop2,'dot1',0,this.grid);
													imgDot1.anchor.setTo(.5,.5);
													imgDot1.scale.setTo(4,4);
													imgDot1.id = c;
													imgDot1.flag = 0;
													c++;
													panIdOrg.push(imgDot1);
								}

							
										
							}
								//for grape square text color
							if(i<5)
							{
								var textXprop3 = squarePos[37+c12].X;
								var textYprop3= squarePos[37+c12].Y;

								
								
								var squareprop3 = game.add.sprite(textXprop3,textYprop3,'1',0, this.squareOver);
								squareprop3.anchor.setTo(.5,.5);
								squareprop3.scale.setTo(.9,.9);

								squareprop3.tint = 0x2da8f6;
								squareprop3.alpha= .5;

								
								this.text =game.add.text(textXprop3,textYprop3, prop3[i],{font:'32px Oswald',fill: "#ffffff"});
								this.text.anchor.setTo(.5,.5);

									if(prop3[i] === ' ')
								{
								
									var imgDot1 = game.add.sprite(textXprop3,textYprop3,'dot1',0,this.grid);
													imgDot1.anchor.setTo(.5,.5);
													imgDot1.scale.setTo(4,4);
													imgDot1.id = c;
													imgDot1.flag = 0;
													c++;
													panIdOrg.push(imgDot1);
								}

							}
								//for papaya square text color
								if(i<7)
								{
								var textXprop4 = squarePos[72+c1].X;
								var textYprop4 = squarePos[72+c1].Y;
								
								var squareprop4 = game.add.sprite(textXprop4,textYprop4,'1',0,this.squareOver);
								squareprop4.anchor.setTo(.5,.5);
								squareprop4.scale.setTo(.9,.9);
							
								squareprop4.tint = 0x5fea3a;
								squareprop4.alpha = .5;

							
								this.text =game.add.text(textXprop4,textYprop4, prop4[i],{font:'32px Oswald', fill: "#ffffff"});
								this.text.anchor.setTo(.5,.5);

								if(prop4[i] === ' ')
								{
									
									var imgDot1 = game.add.sprite(textXprop4,textYprop4,'dot1',0,this.grid);
													imgDot1.anchor.setTo(.5,.5);
													imgDot1.scale.setTo(4,4);
													imgDot1.id = c;
													imgDot1.flag = 0;
													c++;
													panIdOrg.push(imgDot1);
								}

							}	// prop5
								if(i<3)
							{
								var textXprop5 = squarePos[41+c12].X;
								var textYprop5= squarePos[41+c12].Y;
								
								var squareprop5 = game.add.sprite(textXprop5,textYprop5,'1',0,this.squareOver);
								squareprop5.anchor.setTo(.5,.5);
								squareprop5.scale.setTo(.9,.9);
							
								squareprop5.tint = 0x7825c1;
								squareprop5.alpha = .5;

							
								this.text =game.add.text(textXprop5,textYprop5, prop5[i],{font:'32px Oswald', fill: "#ffffff"});
								this.text.anchor.setTo(.5,.5);

								if(prop5[i] === ' ')
								{
									
									var imgDot1 = game.add.sprite(textXprop5,textYprop5,'dot1',0,this.grid);
													imgDot1.anchor.setTo(.5,.5);
													imgDot1.scale.setTo(4,4);
													imgDot1.id = c;
													imgDot1.flag = 0;
													c++;
													panIdOrg.push(imgDot1);
								}
							
							}

										c1=c1+1;
										c12=c12+10;
							
							}

							
						//console.log(panIdOrg);

							this.squareAns = game.add.group();

							var letterAns = ['J','M', 'B', 'U', 'R', 'E', 'Q', 'C', 'L','T', 'Y', 'K', 'P', 'S', 'W', 'A'];
							this.option= game.add.group();
							optionPosx = game.world.centerX-350;
							optionPosy = game.world.centerY+285;
							optionAddx = 0;
							optionAddy = 0;
							var r =0;
							var r1 =1;
							var f=0;

						for(var t=0; t<2; t++)
							{
								for(var e=0; e<8; e++)
								{
									optionRealx = optionPosx+optionAddx;
									optionRealy = optionPosy+optionAddy;

										ans1 = game.add.image(optionRealx, optionRealy, '1',0,this.squareAns);
	                   		 			ans1.anchor.setTo(.5,.5);
	                   		 			ans1.scale.setTo(.9,.9);  
	                   		 			ans1.tint = 0x000000;
	                   		 			ans1.alpha =.3;
										optionAddx= optionAddx+100;

								}
									optionAddx= 0;
									optionAddy =optionAddy+75;

							}
						
									//this.squareAns2 = game.add.group();
									textOverAns = game.add.group();



							this.option= game.add.group();
							optionPosx = game.world.centerX-350;
							optionPosy = game.world.centerY+285;
							optionAddx = 0;
							optionAddy = 0;

								for(var t=0; t<2; t++)
							{
								for(var e=0; e<8; e++)
							


							{
								optionRealx = optionPosx+optionAddx;
								optionRealy = optionPosy+optionAddy;


								var ans = 'ans'+r;
								ans = game.add.sprite(optionRealx, optionRealy, '1dark', 0, this.option);
								ans.flag = 0;
							//	ans.alpha= 2;
								ansName.push(ans);
						
							ans.id = r;
							ans.inputEnabled = true;
							ans.input.enableDrag();
							
	            			ans.anchor.setTo(.5,.5);   
	            			ans.tint = 0x262626;
	            			ans.scale.setTo(.9,.9); 
	                   		game.physics.arcade.enable(ans);

	                 		 // 	game.world.bringToTop(this.option);
	                   		var style = { font: "32px Oswald", fill: "#ffffff", wordWrap: true, wordWrapWidth: ans.width, align: "center" };

	                   		textOpt = 'pan'+r;
	                   		//this.text =game.add.text(optionRealx, optionRealy, appleX[t],{font:'30px solid arial'});
	                   		textOpt  =game.add.text(optionRealx, optionRealy, letterAns[f],style);
							//textOpt  =game.add.text(optionRealx, optionRealy, letterAns[f],style);
							textOpt.anchor.setTo(.5,.5);
							textOpt.id = r1;
							
							panId.push(textOpt);
	                   		optionAddx= optionAddx+100;
	                   		
	                   		r++;
	                   		r1++;
	                   			 ans.events.onDragStart.add(this.onTop, this);
	                   		   ans.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, this.grid);}, this);
	                   		   ans.originalPosition = ans.position.clone();
	                   		   textOpt.originalPosition = textOpt.position.clone();
	                   		   ans.events.onDragUpdate.add(this.posupdate);

	                   		   f++;
	                   		
	                   	}
	                   			optionAddx= 0;
	                   			optionAddy =optionAddy+75;
	                   }
				},



							//END
	


	


	create: function() {			checkFlag1=0;
									checkFlag=0;
									 game.time.events.add(0, this.gameLayout, this);

									 game.time.events.add(0, this.word3, this);


	},

	word4:function(){

								this.props = game.add.group();

								  	this.grid.enableBody =true;
									game.physics.arcade.enable(this.grid);
							// this.image1.scale.setTo(.5,.5);
							var prop1 = [' ', 'E', 'N', 'D', 'R', 'I', ' ', 'E'];
							var prop2 = ['P', 'R', 'I', ' ', ' ', 'E', 'R'];
							 var prop3= [' ', 'A', 'M', ' ', 'R', 'A'];
							 var prop4= ['C', ' ', 'P', 'I', 'E', 'R'];

								this.prop1 = game.add.sprite(squarePos[72].X-40,squarePos[72].Y-30, 'camera',0,this.props);
								this.prop1.scale.x = .9;
								this.prop1.scale.y = .9;
								this.prop1.anchor.setTo(.5,.5);

								this.prop1Tween=game.add.tween(this.prop1);
								this.prop1Tween.to({x:this.prop1.position.x-10},1800, Phaser.Easing.Linear.None);
								this.prop1Tween.to({x:this.prop1.position.x+10},1800, Phaser.Easing.Linear.None);
								this.prop1Tween.to({x:this.prop1.position.x},1800, Phaser.Easing.Linear.None);
								this.prop1Tween.to( { angle: 360 }, 1000, Phaser.Easing.Quintic.Out, true);
								this.prop1Tween.loop();
								this.prop1Tween.start();
								


								this.prop3 = game.add.sprite(squarePos[31].X-25,squarePos[31].Y-5, 'pendrive', 0, this.props);
								this.prop3.scale.x = .8;
								this.prop3.scale.y = .8;
								this.prop3.anchor.setTo(.5,.5);

								var prop3Tween=game.add.tween(this.prop3);
								prop3Tween.to({y:this.prop3.position.y-5},2500, Phaser.Easing.Linear.None);
								prop3Tween.to({angle:-45},1500, Phaser.Easing.Quintic.Out);
								prop3Tween.to({angle:45},1500, Phaser.Easing.Quintic.Out);
								prop3Tween.to({angle:360},1500, Phaser.Easing.Quintic.Out);
								prop3Tween.to({y:this.prop3.position.y},2500, Phaser.Easing.Linear.None);
								prop3Tween.loop();
								
								setTimeout(function(){prop3Tween.start();  }, 1400);

								this.prop4 = game.add.sprite(squarePos[6].X-33,squarePos[6].Y-20, 'printer',0,this.props);
								this.prop4.scale.x = .8;
								this.prop4.scale.y = .8;

								this.prop4Tween=game.add.tween(this.prop4);
								this.prop4Tween.to({y:this.prop4.position.y-15},2500, Phaser.Easing.Linear.None);
								this.prop4Tween.to({y:this.prop4.position.y},2500, Phaser.Easing.Linear.None);
								this.prop4Tween.loop();
								this.prop4Tween.start();

									this.prop2 = game.add.sprite(squarePos[70].X-15,squarePos[70].Y+30, 'copier',0,this.props);
								this.prop2.scale.x = .7;
								this.prop2.scale.y = .7;


								this.prop2Tween=game.add.tween(this.prop2);
								this.prop2Tween.to({y:this.prop2.position.y-15, x:this.prop2.position.x-15},2000, Phaser.Easing.Linear.None);
								this.prop2Tween.to({y:this.prop2.position.y-30, x:this.prop2.position.x},2000, Phaser.Easing.Linear.None);
								this.prop2Tween.to({y:this.prop2.position.y-15, x:this.prop2.position.x+15},2000, Phaser.Easing.Linear.None);
								this.prop2Tween.to({y:this.prop2.position.y, x:this.prop2.position.x},2000, Phaser.Easing.Linear.None);
								this.prop2Tween.loop();
								this.prop2Tween.start();

							

							
							//var appleBlank = [ 'P', 'L'];
						var	c1=0;
						var c12 = 0;
						var idOption = 1;
						var d =0
						
							this.squareOver = game.add.group();
							this.textOver = game.add.group();
							for(var i=0; i<8; i++)
						
							{  
								
								
									// for apple square text color
								
								var textXprop1 = squarePos[32+c1].X;
								var textYprop1 = squarePos[32+c1].Y;

								var squareprop1 = game.add.sprite(textXprop1,textYprop1,'1',0,  this.squareOver);
								squareprop1.anchor.setTo(.5,.5);
								squareprop1.scale.setTo(.9,.9);

										squareprop1.tint = 0xe60000;
										squareprop1.alpha= .5;
							

							this.text =game.add.text(textXprop1,textYprop1, prop1[i],{font:'32px Oswald', fill: "#ffffff"});
							this.text.anchor.setTo(.5,.5);

								if(prop1[i] === ' ')
								{
									
													var imgDot1 = game.add.sprite(textXprop1,textYprop1,'dot1',0,this.grid);
													imgDot1.anchor.setTo(.5,.5);
													imgDot1.scale.setTo(4,4);
													imgDot1.id = c;
													imgDot1.flag = 0;
													c++;
													panIdOrg.push(imgDot1);
								}


								//for peach square text color
							if(i<7)
							{
								var textXprop2 = squarePos[26+c12].X;
								var textYprop2= squarePos[26+c12].Y;

								var squareprop2 = game.add.sprite(textXprop2,textYprop2,'1', this.squareOver);
								squareprop2.anchor.setTo(.5,.5);
								squareprop2.scale.setTo(.9,.9);
								
								squareprop2.tint = 0xffd200;
								squareprop2.alpha = .5;

								
							
							this.text =game.add.text(textXprop2,textYprop2, prop2[i],{font:'32px Oswald', fill: "#ffffff"});
							this.text.anchor.setTo(.5,.5);


								if(prop2[i] === ' ')
								{
									
									var imgDot1 = game.add.sprite(textXprop2,textYprop2,'dot1',0,this.grid);
													imgDot1.anchor.setTo(.5,.5);
													imgDot1.scale.setTo(4,4);
													imgDot1.id = c;
													imgDot1.flag = 0;
													c++;
													panIdOrg.push(imgDot1);
								}

							}


								//for grape square text color
							if(i<6)
							{
								var textXprop3 = squarePos[73+c1].X;
								var textYprop3= squarePos[73+c1].Y;

								
								
								var squareprop3 = game.add.sprite(textXprop3,textYprop3,'1',0, this.squareOver);
								squareprop3.anchor.setTo(.5,.5);
								squareprop3.scale.setTo(.9,.9);

								squareprop3.tint = 0x2da8f6;
								squareprop3.alpha= .5;

								
								this.text =game.add.text(textXprop3,textYprop3, prop3[i],{font:'32px Oswald',fill: "#ffffff"});
								this.text.anchor.setTo(.5,.5);

									if(prop3[i] === ' ')
								{
								
									var imgDot1 = game.add.sprite(textXprop3,textYprop3,'dot1',0,this.grid);
													imgDot1.anchor.setTo(.5,.5);
													imgDot1.scale.setTo(4,4);
													imgDot1.id = c;
													imgDot1.flag = 0;
													c++;
													panIdOrg.push(imgDot1);
								}

								
								//for papaya square text color
							
								var textXprop4 = squarePos[82+c1].X;
								var textYprop4= squarePos[82+c1].Y;
								
								var squareprop4 = game.add.sprite(textXprop4,textYprop4,'1',0,this.squareOver);
								squareprop4.anchor.setTo(.5,.5);
								squareprop4.scale.setTo(.9,.9);
							
								squareprop4.tint = 0x5fea3a;
								squareprop4.alpha = .5;

							
								this.text =game.add.text(textXprop4,textYprop4, prop4[i],{font:'32px Oswald', fill: "#ffffff"});
								this.text.anchor.setTo(.5,.5);

								if(prop4[i] === ' ')
								{
									
									var imgDot1 = game.add.sprite(textXprop4,textYprop4,'dot1',0,this.grid);
													imgDot1.anchor.setTo(.5,.5);
													imgDot1.scale.setTo(4,4);
													imgDot1.id = c;
													imgDot1.flag = 0;
													c++;
													panIdOrg.push(imgDot1);
								}
							}
							

										c1=c1+1;
										c12=c12+10;
							
							}

							
						//console.log(panIdOrg);

							this.squareAns = game.add.group();

							var letterAns = ['C','Q', 'S', 'O', 'J', 'K', 'V', 'D', 'T','H', 'I', 'P', 'E', 'M', 'Q', 'N'];
							this.option= game.add.group();
							optionPosx = game.world.centerX-350;
							optionPosy = game.world.centerY+285;
							optionAddx = 0;
							optionAddy = 0;
							var r =0;
							var r1 =1;
							var f=0;

						for(var t=0; t<2; t++)
							{
								for(var e=0; e<8; e++)
								{
									optionRealx = optionPosx+optionAddx;
									optionRealy = optionPosy+optionAddy;

										ans1 = game.add.image(optionRealx, optionRealy, '1',0,this.squareAns);
	                   		 			ans1.anchor.setTo(.5,.5);
	                   		 			ans1.scale.setTo(.9,.9);  
	                   		 			ans1.tint = 0x000000;
	                   		 			ans1.alpha =.3;
										optionAddx= optionAddx+100;

								}
									optionAddx= 0;
									optionAddy =optionAddy+75;

							}
						
									//this.squareAns2 = game.add.group();
								textOverAns = game.add.group();



							this.option= game.add.group();
							optionPosx = game.world.centerX-350;
							optionPosy = game.world.centerY+285;
							optionAddx = 0;
							optionAddy = 0;

								for(var t=0; t<2; t++)
							{
								for(var e=0; e<8; e++)
							


							{
								optionRealx = optionPosx+optionAddx;
								optionRealy = optionPosy+optionAddy;


								var ans = 'ans'+r;
								ans = game.add.sprite(optionRealx, optionRealy, '1dark', 0, this.option);
								ans.flag = 0;
							//	ans.alpha= 2;
								ansName.push(ans);
						
							ans.id = r;
							ans.inputEnabled = true;
							ans.input.enableDrag();
							
	            			ans.anchor.setTo(.5,.5);   
	            			ans.tint = 0x262626;
	            			ans.scale.setTo(.9,.9); 
	                   		game.physics.arcade.enable(ans);

	                 		 // 	game.world.bringToTop(this.option);
	                   		var style = { font: "32px Oswald", fill: "#ffffff", wordWrap: true, wordWrapWidth: ans.width, align: "center" };

	                   		textOpt = 'pan'+r;
	                   		//this.text =game.add.text(optionRealx, optionRealy, appleX[t],{font:'30px solid arial'});
	                   		textOpt  =game.add.text(optionRealx, optionRealy, letterAns[f],style);
							//textOpt  =game.add.text(optionRealx, optionRealy, letterAns[f],style);
							textOpt.anchor.setTo(.5,.5);
							textOpt.id = r1;
							
							panId.push(textOpt);
	                   		optionAddx= optionAddx+100;
	                   		
	                   		r++;
	                   		r1++;
	                   			 ans.events.onDragStart.add(this.onTop, this);
	                   		   ans.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, this.grid);}, this);
	                   		   ans.originalPosition = ans.position.clone();
	                   		   textOpt.originalPosition = textOpt.position.clone();
	                   		   ans.events.onDragUpdate.add(this.posupdate);

	                   		   f++;
	                   		
	                   	}
	                   			optionAddx= 0;
	                   			optionAddy =optionAddy+75;
	                   }
	},



				

	update : function()
	{
		home1.angle+=.5;
	},


	homeAgain: function(){
	   						
	   							 game.add.tween(home.scale).to({x: 0.5, y: 0.5}, 150, Phaser.Easing.Cubic.Out, true);
  								  game.add.tween(home.scale).to({x: 0.5, y: 0.5}, 150, Phaser.Easing.Cubic.Out, true, 150);
	   							
	   							//setTimeout(function(){ game.state.start('game2State0'); }, 300);
	   							setTimeout(function(){ game.state.start('menu'); }, 150);
				 				

		    },


	onTop : function(sprite, pointer, dragX, dragY, snapPoint)
				{


						 
						 textOverans.add(sprite);
					     textOverans.add(panId[sprite.id]);
						
						 game.world.bringToTop(textOverans);
                  
				},

	posupdate : function (sprite, pointer, dragX, dragY, snapPoint)
		{
			

			panId[sprite.id].position.x = sprite.position.x;
			panId[sprite.id].position.y = sprite.position.y;	
			//console.log(panId[sprite.id].text);

		
						
		},

stopDrag: function(currentSprite, outlines) {

							var self = this;
						//	self.colorChange();
						textOverans= game.add.group();
     				
  

   if (!this.game.physics.arcade.overlap(currentSprite, outlines, function() {

            	var flag = 0;
            outlines.forEach(function(endSprite) {

                if (!this.game.physics.arcade.overlap(currentSprite, endSprite, function() {


                				//console.log('hello');

                       
                            var gupta = 0;
                          for(var i = 0; i<pankaj10.length; i++)
                          {
                         
                          	if(pankaj10[i].id1 == endSprite.id)
                          	{
                          		gupta++;
                          	}

                          				for(var k =0; k<pankaj10.length; k++)
							       {

							       		if(pankaj10[k].id == currentSprite.id)
							       			pankaj10.splice(k,1);
							       }
                          }

                            flag = 1;
                          
                          if(gupta==0)
                          {
                          	
                      		 currentSprite.position.copyFrom(endSprite.position);
                             panId[currentSprite.id].position.copyFrom(endSprite.position);                         	
//                            endSprite.flag= 1;                          	
						  	currentSprite.flag = 1;

                          

							pankaj10.push({id:currentSprite.id,id1:endSprite.id});
							
							
						if(checkFlag == 1)
						{

							self.colorChangeAlpha();
							console.log('HHHHHHAAAAAAAAAHHHHHHHHHAAAAA');
						}		

						if(checkFlag1 == 1)
						{

							self.colorChangeGama();
							console.log('HHHHHHAAAAAAAAAHHHHHHHHHAAAAA');
						}		
						else{

								self.colorChangeBeta();
						}
							
     						console.log(pankaj10);
     						//self.colorChangeAlpha();
							
                          }
                          else
                          {
							//currentSprite.position.copyFrom(currentSprite.originalPosition);
					 		//panId[currentSprite.id].position.copyFrom(panId[currentSprite.id].originalPosition);

					 		game.add.tween(currentSprite).to({x:currentSprite.originalPosition.x, y:currentSprite.originalPosition.y}, 1200, Phaser.Easing.Quintic.Out,true);
					 		game.add.tween(panId[currentSprite.id]).to({x:panId[currentSprite.id].originalPosition.x, y:panId[currentSprite.id].originalPosition.y}, 1200,Phaser.Easing.Quintic.Out,true);


											for(var i =0; i<pankaj10.length; i++)
							       {

							       		if(pankaj10[i].id == currentSprite.id)
							       			pankaj10.splice(i,1);
							       }
							       	console.log(pankaj10);

                          }
                       
                      // console.log(pankaj10);
                      
                        	
                        	
                         {
                        
                         }
                      	
                			
                        }


                    ) )
                {
                	
                	

                }

              
           });
			if(flag==0)
			{
				//currentSprite.position.copyFrom(currentSprite.originalPosition);
				//panId[currentSprite.id].position.copyFrom(panId[currentSprite.id].originalPosition);

				game.add.tween(currentSprite).to({x:currentSprite.originalPosition.x, y:currentSprite.originalPosition.y}, 1200, Phaser.Easing.Quintic.Out,true);
				game.add.tween(panId[currentSprite.id]).to({x:panId[currentSprite.id].originalPosition.x, y:panId[currentSprite.id].originalPosition.y}, 1200,Phaser.Easing.Quintic.Out,true);




				for(var i =0; i<pankaj10.length; i++)
       {

       			if(pankaj10[i].id == currentSprite.id)
       			pankaj10.splice(i,1);
       }

       				//console.log(pankaj10);
			


				
			}
        }))

    {
      
     			 //  currentSprite.position.copyFrom(currentSprite.originalPosition);
				 // panId[currentSprite.id].position.copyFrom(panId[currentSprite.id].originalPosition);

	 game.add.tween(currentSprite).to({x:currentSprite.originalPosition.x, y:currentSprite.originalPosition.y}, 1200, Phaser.Easing.Quintic.Out,true);
	game.add.tween(panId[currentSprite.id]).to({x:panId[currentSprite.id].originalPosition.x, y:panId[currentSprite.id].originalPosition.y}, 1200,Phaser.Easing.Quintic.Out,true);



     
     

       for(var i =0; i<pankaj10.length; i++)
       {

       		if(pankaj10[i].id == currentSprite.id)
       			pankaj10.splice(i,1);
       }

				console.log(pankaj10);
    }
    		

},

colorChangeAlpha: function(){
									console.log('aa gaya hu color change me');

										 console.log(panId);
										 console.log(panIdOrg);
										 console.log(pankaj10);
										 console.log(squarePos);
									var flag1 =0;
									var flag2 =0;
									var flag3 =0;
									var flag4 =0;


									 	if(  panIdOrg[2].position.x == panId[3].position.x && panIdOrg[2].position.y == panId[3].position.y)
                          	{
                          		panIdOrg[2].inputEnabled = false;
                          		ansName[3].kill();
                          		flag1 = 1;
                          	

                          	}


                   					 if(panIdOrg[1].position.y == panId[0].position.y 
                          					&& panIdOrg[1].position.x == panId[0].position.x )
                          			{
                          				panIdOrg[1].inputEnabled = false;
                          				//panIdOrg[4].inputEnabled = false;
                          				console.log('1');
                          				flag2 =1;
                     
                          		ansName[0].kill();
                          		//ansName[12].kill();

                          			}

                          		

						 if(panIdOrg[3].position.y == panId[15].position.y  && panIdOrg[5].position.y == panId[8].position.y && 
                                panIdOrg[3].position.x == panId[15].position.x  && panIdOrg[5].position.x == panId[8].position.x)
									

                          			{
                          						console.log("I AM IN 3rd loop position is 0 of papaya");
                          						panIdOrg[3].inputEnabled = false;
                          						panIdOrg[5].inputEnabled = false;

                          
                          				flag3=1;
		                          		ansName[15].kill();
		                          		ansName[8].kill();
                          				
                          			}

                     

								


                          			 if(panIdOrg[0].position.y == panId[11].position.y
                          				&& panIdOrg[0].position.x == panId[11].position.x && panIdOrg[6].position.y == panId[6].position.y
                          				&& panIdOrg[6].position.x == panId[6].position.x
                          				)
                          		{	
                          				console.log("I AM IN 1st loop position is 0");

                          				panIdOrg[0].inputEnabled = false;
                          				panIdOrg[6].inputEnabled = false;
                          			
                         				flag4=1;
		                          		ansName[6].kill();
		                          	    ansName[11].kill();              
		                          		                        			
                          		}

                          			
                          			if(flag1==1 && flag2==1 && flag3==1 && flag4==1)
                          			{
									
                          				this.props.remove();
										this.squareOver.remove();
										this.grid.remove();
										this.squareAns.remove();
										//this.textOver.destroy();
										this.option.remove();

										//this.textOverAns.destroy();

										//	 game.world.removeAll();
										
										 panId.splice(0, panId.length);
										 ansName.splice(0, ansName.length);
									

										panIdOrg.splice(0,panIdOrg.length);
										pankaj10.splice(0, pankaj10.length);
										squarePos.splice(0,squarePos.length);

										checkFlag1 = 1;
										 c =0;
										 console.log(panId);
										 console.log(panIdOrg);
										 console.log(pankaj10);
										 console.log(squarePos);
										 console.log('duniaya se hata do');
										 game.time.events.add(2000, this.gameLayout, this);                          				
                          				 game.time.events.add(2000, this.word5, this);

                          			}

                          		else {
                          				console.log('else me gaya h colorChangeNew ke');
                          	    	}


             },


    colorChangeBeta: function(){
									console.log('colorChangeNew');
									 console.log(panId);
										 console.log(panIdOrg);
										 console.log(pankaj10);
										 console.log(squarePos);
									var flag1 =0;
									var flag2 =0;
									var flag3 =0;
								

									 	if(  panIdOrg[0].position.y == panId[12].position.y && panIdOrg[3].position.y == panId[9].position.y
                          					&& panIdOrg[0].position.x == panId[12].position.x && panIdOrg[3].position.x == panId[9].position.x 
                          				)
                          	{
                          				panIdOrg[0].inputEnabled = false;
                          				panIdOrg[3].inputEnabled = false;
                          			
                          		ansName[12].kill();
                          		ansName[9].kill();

                          		flag1 = 1;
                          	

                          	}


                   					 if(panIdOrg[2].position.y == panId[3].position.y && panIdOrg[5].position.y == panId[1].position.y
                          					&& panIdOrg[2].position.x == panId[3].position.x && panIdOrg[5].position.x == panId[1].position.x
                          				)
                          			{
                          				panIdOrg[2].inputEnabled = false;
                          				panIdOrg[5].inputEnabled = false;
                          					//panIdOrg[5].inputEnabled = false;
                          			
                          				console.log('1');
                          				flag2 =1;
                     
                          		
                          		//ansName[15].kill();
                          		ansName[3].kill();
                          		ansName[1].kill();


                          			}

                          	
                          	

						 if( panIdOrg[1].position.y == panId[15].position.y	
						 		&& panIdOrg[1].position.x == panId[15].position.x && panIdOrg[4].position.y == panId[8].position.y	
						 		&& panIdOrg[4].position.x == panId[8].position.x )

                          			{
                          						console.log("I AM IN 3rd loop position is 0 of papaya");
                          						panIdOrg[1].inputEnabled = false;
                          						panIdOrg[4].inputEnabled = false;
                          					
                          
                          				flag3=1;
		                          	ansName[15].kill();
		                          			ansName[8].kill();
		                          		
                          			}

									

                          			if(flag1==1 && flag2==1 && flag3==1 )
                          			{
										this.props.remove();
										this.squareOver.remove();
										this.grid.remove();
										this.squareAns.remove();
										//this.textOver.destroy();
										this.option.remove();

										//this.textOverAns.destroy();

										//	 game.world.removeAll();
										
										 panId.splice(0, panId.length);
										 ansName.splice(0, ansName.length);
									

										panIdOrg.splice(0,panIdOrg.length);
										pankaj10.splice(0, pankaj10.length);
										squarePos.splice(0,squarePos.length);

										checkFlag = 1;
										 c =0;
										 console.log(panId);
										 console.log(panIdOrg);
										 console.log(pankaj10);
										 console.log(squarePos);
										 console.log('duniaya se hata do');
										 game.time.events.add(2000, this.gameLayout, this);                          				
                          				 game.time.events.add(2000, this.word4, this);


                          			}

                          		else {
                          				console.log('else me gaya h colorChangeNew ke');
                          	    	}


             },




    colorChangeGama: function(){
									console.log('colorChangeNew');
									 console.log(panId);
										 console.log(panIdOrg);
										 console.log(pankaj10);
										 console.log(squarePos);
									var flag1 =0;
									var flag2 =0;
									var flag3 =0;
									var flag4 =0;
									var flag5 =0;

									 	if(  panIdOrg[0].position.y == panId[9].position.y && panIdOrg[4].position.y == panId[2].position.y
                          					&& panIdOrg[0].position.x == panId[9].position.x && panIdOrg[4].position.x == panId[2].position.x )
                          	{
                          		panIdOrg[0].inputEnabled = false;
                          		ansName[9].kill();
                          		panIdOrg[4].inputEnabled = false;
                          		ansName[2].kill();
                          		flag1 = 1;
                          	

                          	}

								

                   					 if(panIdOrg[1].position.y == panId[1].position.y && panIdOrg[6].position.y == panId[4].position.y
                          					&& panIdOrg[1].position.x == panId[1].position.x && panIdOrg[6].position.x == panId[4].position.x
                          				)
                          			{
                          				panIdOrg[1].inputEnabled = false;
                          				panIdOrg[6].inputEnabled = false;
                          				
                          				flag2 =1;
                     
                          		ansName[4].kill();
                          		ansName[1].kill();
                          	

                          			}

                          		if(panIdOrg[3].position.y == panId[8].position.y 	&& panIdOrg[3].position.x == panId[8].position.x)
                          				
                          			{
                          				panIdOrg[3].inputEnabled = false;
                          				
                          				
                          				
                          		console.log('2');
                          		ansName[8].kill();
                          		flag3=1;

                          			}
                          	

							if(panIdOrg[2].position.y == panId[12].position.y 	&& panIdOrg[2].position.x == panId[12].position.x)
                          				
                          			{
                          				panIdOrg[2].inputEnabled = false;
                          				
                          				
                          				
                          		console.log('2');
                          		ansName[12].kill();
                          		flag4=1;

                          			}

                          	     	 if( panIdOrg[5].position.y == panId[3].position.y && panIdOrg[5].position.x == panId[3].position.x
                          				 )

                          			{
                          					console.log("I AM IN 3rd loop position is 8 of papaya");
                          						panIdOrg[5].inputEnabled = false;
                          						//panIdOrg[3].inputEnabled = false;

                          
                          				flag5=1;
		                          		ansName[3].kill();
		                          		//ansName[9].kill();
                          			}

                          	     
									

                          			if(flag1==1 && flag2==1 && flag3==1  && flag4==1 && flag5==1 )
                          			{
										this.props.remove();
										this.squareOver.remove();
										this.grid.remove();
										this.squareAns.remove();
										//this.textOver.destroy();
										this.option.remove();

										//this.textOverAns.destroy();

										//	 game.world.removeAll();
										
										 panId.splice(0, panId.length);
										 ansName.splice(0, ansName.length);
									

										panIdOrg.splice(0,panIdOrg.length);
										pankaj10.splice(0, pankaj10.length);
										squarePos.splice(0,squarePos.length);

										checkFlag = 1;
										 c =0;
										 console.log(panId);
										 console.log(panIdOrg);
										 console.log(pankaj10);
										 console.log(squarePos);
										 console.log('duniaya se hata do');
										// game.time.events.add(4, this.gameLayout, this);                          				
                          				 //game.time.events.add(4, this.word4, this);
                          				  setTimeout(function(){ game.state.start('game2State6'); }, 3000);

                          			}

                          		else {
                          				console.log('else me gaya h colorChangeNew ke');
                          	    	}


             }





}

