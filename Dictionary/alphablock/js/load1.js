//var imported = document.createElement("script");
//imported.src = "word.js";
//document.getElementsByTagName("head")[0].appendChild(imported);


var group1, group2, group3, group4, group5, group6, group7, group8, group9;

//var group1function, group2function, group3function, group4function, group5function, group6function, group7function, group8function, group8function;

var clickLetter = new Array();
var groupArray = new Array();
var letterArray = new Array();
var functionArray = new Array();

var vowelArray = new Array();
var consonantArray = new Array();

var chars=[], letterFunction, text, wrong_button, correct_button, sorryText, calText, score, hintButton, wordhint, Score_board, score_text;

var position = [];

var style = { font: "bold 32px Century Gothic", fill: "#061e23", wordWrap: true, wordWrapWidth: 100, align: "center" };
var scorestyle = { font: "32px Century Gothic", fill: "#061e23", wordWrap: true, wordWrapWidth: 100, align: "center" };

var mainarray = new Array();

var ekfunction;

var load1 = 
{
	preload : function ()
	{
		game.load.image('Score_board' , 'fwd/Score_board.png');
        game.load.image('Hint_Button' , 'fwd/Hint_Button.png');
		game.load.image('bg' , 'fwd/First_State_BG.jpg');
		game.load.image('Home' , 'fwd/Home.png');
		game.load.image('Blue_shadow_tile' , 'final_tiles/Blue_shadow_tile.png');
		game.load.image('Blue_tile' , 'final_tiles/Blue_tile.png');
		game.load.image('Green_shadow_tile' , 'final_tiles/Green_shadow_tile.png');
		game.load.image('Green_tile' , 'final_tiles/Green_tile.png');
		game.load.image('Orange_shadow_tile' , 'final_tiles/Orange_shadow_tile.png');
		game.load.image('Orange_tile' , 'final_tiles/Orange_tile.png');
		game.load.image('Pink_shadow_tile' , 'final_tiles/Pink_shadow_tile.png');
		game.load.image('Pink_tile' , 'final_tiles/Pink_tile.png');
		game.load.image('Red_shadow_tile' , 'final_tiles/Red_shadow_tile.png');
		game.load.image('Red_tile' , 'final_tiles/Red_tile.png');		
		game.load.image('Special_blue_shadow_tile' , 'final_tiles/Special_blue_shadow_tile.png');
		game.load.image('Special_blue_tile' , 'final_tiles/Special_blue_tile.png');
		game.load.image('Special_Orange_shadow_tile' , 'final_tiles/Special_Orange_shadow_tile.png');		
		game.load.image('Special_Orange_tile' , 'final_tiles/Special_Orange_tile.png');		
		game.load.image('Special_pink_shadow_tile' , 'final_tiles/Special_pink_shadow_tile.png');
		game.load.image('Special_pink_tile' , 'final_tiles/Special_pink_tile.png');
		game.load.image('Yellow_shadow_tile' , 'final_tiles/Yellow_shadow_tile.png');
		game.load.image('Yellow_tile' , 'final_tiles/Yellow_tile.png');
		game.load.image('Special_yellow_tile' , 'final_tiles/Special_yellow_tile.png');
		game.load.image('Special_yellow_shadow_tile' , 'final_tiles/Special_yellow_shadow_tile.png');

		game.load.image('correct_button' , 'final_tiles/correct_button.png');
		game.load.image('correct_button_on_click' , 'final_tiles/correct_button_on_click.png');
		game.load.image('wrong_button' , 'final_tiles/wrong_button.png');
		game.load.image('wrong_button_on_click' , 'final_tiles/wrong_button_on_click.png');
		
		game.load.image('a' , 'letters/A.png');
		game.load.image('b' , 'letters/B.png');
		game.load.image('c' , 'letters/C.png');
		game.load.image('d' , 'letters/D.png');
		game.load.image('e' , 'letters/E.png');
		game.load.image('f' , 'letters/F.png');
		game.load.image('g' , 'letters/G.png');
		game.load.image('h' , 'letters/H.png');
		game.load.image('i' , 'letters/I.png');
		game.load.image('j' , 'letters/J.png');
		game.load.image('k' , 'letters/K.png');
		game.load.image('l' , 'letters/L.png');
		game.load.image('m' , 'letters/M.png');
		game.load.image('n' , 'letters/N.png');
		game.load.image('o' , 'letters/O.png');
		game.load.image('p' , 'letters/P.png');
		game.load.image('q' , 'letters/Q.png');
		game.load.image('r' , 'letters/R.png');
		game.load.image('s' , 'letters/S.png');
		game.load.image('t' , 'letters/T.png');
		game.load.image('u' , 'letters/U.png');
		game.load.image('v' , 'letters/V.png');
		game.load.image('w' , 'letters/W.png');
		game.load.image('x' , 'letters/X.png');
		game.load.image('y' , 'letters/Y.png');
		game.load.image('z' , 'letters/Z.png');
	},
	
	create : function ()
	{
        
position = [{x:530, y:182}, {x:635, y:190}, {x:732, y:182}, {x:540, y:290}, {x:625, y:280}, {x:740, y:295}, {x:535, y:390}, {x:635, y:385}, {x:725, y:380}];
        
        chars=[];
        mainarray = [];
        vowelArray = [];
        consonantArray = [];
        groupArray = [];
        
		this.bg = game.add.image(640, 400, 'bg');
		this.bg.anchor.setTo(0.5,0.5);
		this.bg.scale.setTo(0.15);

		score = game.add.text(745, 10, '0', scorestyle);
        score.fill = "#ffffff";
		this.scoretxt = game.add.text(815, 10, 'pts', scorestyle);
        this.scoretxt.fill = "#ffffff"
        
		this.Home = game.add.sprite(435, 35, 'Home');
		this.Home.anchor.setTo(0.5, 0.5);
		this.Home.scale.setTo(0.6);
		this.Home.inputEnabled = true;
		this.Home.events.onInputUp.add(this.homefunction);


		
		this.Orange_shadow_tile = game.add.sprite(542, 192, 'Orange_shadow_tile');
		this.Orange_shadow_tile.anchor.setTo(0.5, 0.5);
		this.Orange_shadow_tile.id = 1;
//		this.Orange_shadow_tile.scale.setTo(0.2);

		this.Orange_tile = game.add.sprite(535, 185, 'Orange_tile');
		this.Orange_tile.anchor.setTo(0.5, 0.5);
		this.Orange_tile.id = 2;
	//	this.Orange_tile.scale.setTo(0.2);

		this.Special_Orange_tile = game.add.sprite(530, 180, 'Special_Orange_tile');
		this.Special_Orange_tile.anchor.setTo(0.5, 0.5);
		this.Special_Orange_tile.inputEnabled = true;
		this.Special_Orange_tile.events.onInputUp.add(this.group1function);
		this.Special_Orange_tile.id = 3;
		this.Special_Orange_tile.flag = 0;
	//	this.Special_Orange_tile.scale.setTo(0.2);

		group1 = game.add.group();
		group1.add(this.Orange_shadow_tile);
		group1.add(this.Orange_tile);
		group1.add(this.Special_Orange_tile);
		
		
/*		this.group1 = game.add.group();
		this.group1.create(470, 260, 'Orange_shadow_tile');
		this.group1.create(465, 255, 'Orange_tile');
		this.group1.create(460, 250, 'Special_Orange_tile');
*/		
		
		this.Red_shadow_tile = game.add.sprite(642, 192, 'Red_shadow_tile');
		this.Red_shadow_tile.anchor.setTo(0.5, 0.5);
	//	this.Red_shadow_tile.scale.setTo(0.2);

		this.Red_tile = game.add.sprite(635, 185, 'Red_tile');
		this.Red_tile.anchor.setTo(0.5, 0.5);
		this.Red_tile.inputEnabled = true;
		this.Red_tile.events.onInputUp.add(this.group2function);
		this.Red_tile.flag = 0;
	//	this.Red_tile.scale.setTo(0.2);

/*		this.Special_Orange_tile = game.add.sprite(472, 250, 'Special_Orange_tile');
		this.Special_Orange_tile.anchor.setTo(0.5, 0.5);
		this.Special_Orange_tile.scale.setTo(0.2);
*/
		group2 = game.add.group();
		group2.add(this.Red_shadow_tile);
		group2.add(this.Red_tile);
//		this.group2.add(this.Special_Orange_tile);


/*		this.group2 = game.add.group();
		this.group2.create(570, 260, 'Red_shadow_tile');
		this.group2.create(565, 255, 'Red_tile');
*/		
		
		this.Special_yellow_shadow_tile = game.add.sprite(742, 192, 'Special_yellow_shadow_tile');
		this.Special_yellow_shadow_tile.anchor.setTo(0.5, 0.5);
	//	this.Yellow_shadow_tile.scale.setTo(0.2);

		this.Special_yellow_tile1 = game.add.sprite(735, 185, 'Special_yellow_tile');
		this.Special_yellow_tile1.anchor.setTo(0.5, 0.5);
	//	this.Yellow_tile1.scale.setTo(0.2);

		this.Special_yellow_tile2 = game.add.sprite(730, 180, 'Special_yellow_tile');
		this.Special_yellow_tile2.anchor.setTo(0.5, 0.5);
		this.Special_yellow_tile2.inputEnabled = true;
		this.Special_yellow_tile2.events.onInputUp.add(this.group3function);
		this.Special_yellow_tile2.flag = 0;
	//	this.Yellow_tile2.scale.setTo(0.2);

		group3 = game.add.group();
		group3.add(this.Special_yellow_shadow_tile);
		group3.add(this.Special_yellow_tile1);
		group3.add(this.Special_yellow_tile2);
		
/*
		this.group3 = game.add.group();
		this.group3.create(670, 260, 'Special_yellow_shadow_tile');
		this.group3.create(665, 255, 'Special_yellow_tile');
		this.group3.create(660, 250, 'Special_yellow_tile');
*/
/* second line start */

		this.Special_pink_shadow_tile = game.add.sprite(542, 292, 'Special_pink_shadow_tile');
		this.Special_pink_shadow_tile.anchor.setTo(0.5, 0.5);
		this.Special_pink_shadow_tile.inputEnabled = true;
		this.Special_pink_shadow_tile.events.onInputUp.add(this.group4function);
		this.Special_pink_shadow_tile.flag = 0;
		
		group4 = game.add.group();
		group4.add(this.Special_pink_shadow_tile);
		
/*		
		this.group4 = game.add.group();
		this.group4.create(470, 360, 'Special_pink_shadow_tile');
*/		
		this.Green_shadow_tile = game.add.sprite(642, 292, 'Green_shadow_tile');
		this.Green_shadow_tile.anchor.setTo(0.5, 0.5);

		this.Green_tile1 = game.add.sprite(635, 285, 'Green_tile');
		this.Green_tile1.anchor.setTo(0.5, 0.5);

		this.Green_tile2 = game.add.sprite(630, 280, 'Green_tile');
		this.Green_tile2.anchor.setTo(0.5, 0.5);
		
		this.Green_tile3 = game.add.sprite(625, 275, 'Green_tile');
		this.Green_tile3.anchor.setTo(0.5, 0.5);
		this.Green_tile3.inputEnabled = true;
		this.Green_tile3.events.onInputUp.add(this.group5function);
		this.Green_tile3.flag = 0;

		group5 = game.add.group();
		group5.add(this.Green_shadow_tile);
		group5.add(this.Green_tile1);
		group5.add(this.Green_tile2);
		group5.add(this.Green_tile3);


/*		this.group5 = game.add.group();
		this.group5.create(570, 360, 'Green_shadow_tile');
		this.group5.create(565, 355, 'Green_tile');
		this.group5.create(560, 350, 'Green_tile');
		this.group5.create(555, 345, 'Green_tile');
*/

		this.Pink_shadow_tile = game.add.sprite(742, 292, 'Pink_shadow_tile');
		this.Pink_shadow_tile.anchor.setTo(0.5, 0.5);
		this.Pink_shadow_tile.inputEnabled = true;
		this.Pink_shadow_tile.events.onInputUp.add(this.group6function);
		this.Pink_shadow_tile.flag = 0;

		group6 = game.add.group();
		group6.add(this.Pink_shadow_tile);
		
/*		
		this.group6 = game.add.group();
		this.group6.create(670, 360, 'Pink_shadow_tile');
*/		
/* third line start */

		this.Red_shadow_tileg7 = game.add.sprite(542, 392, 'Red_shadow_tile');
		this.Red_shadow_tileg7.anchor.setTo(0.5, 0.5);

		this.Red_tileg7 = game.add.sprite(535, 385, 'Red_tile');
		this.Red_tileg7.anchor.setTo(0.5, 0.5);
		this.Red_tileg7.inputEnabled = true;
		this.Red_tileg7.events.onInputUp.add(this.group7function);
		this.Red_tileg7.flag = 0;

		group7 = game.add.group();
		group7.add(this.Red_shadow_tileg7);
		group7.add(this.Red_tileg7);
		
/*		
		this.group7 = game.add.group();
		this.group7.create(470, 460, 'Red_shadow_tile');
		this.group7.create(465, 455, 'Red_tile');
*/		
		this.Yellow_shadow_tile = game.add.sprite(642, 392, 'Yellow_shadow_tile');
		this.Yellow_shadow_tile.anchor.setTo(0.5, 0.5);

		this.Yellow_tile1 = game.add.sprite(635, 385, 'Yellow_tile');
		this.Yellow_tile1.anchor.setTo(0.5, 0.5);

		this.Yellow_tile2 = game.add.sprite(630, 380, 'Yellow_tile');
		this.Yellow_tile2.anchor.setTo(0.5, 0.5);
		this.Yellow_tile2.inputEnabled = true;
		this.Yellow_tile2.events.onInputUp.add(this.group8function);
		this.Yellow_tile2.flag = 0;

		group8 = game.add.group();
		group8.add(this.Yellow_shadow_tile);
		group8.add(this.Yellow_tile1);
		group8.add(this.Yellow_tile2);


/*		this.group8 = game.add.group();
		this.group8.create(570, 460, 'Yellow_shadow_tile');
		this.group8.create(565, 455, 'Yellow_tile');
		this.group8.create(560, 450, 'Yellow_tile');
*/		

		this.Orange_shadow_tileg6 = game.add.sprite(742, 392, 'Orange_shadow_tile');
		this.Orange_shadow_tileg6.anchor.setTo(0.5, 0.5);

		this.Orange_tileg61 = game.add.sprite(735, 385, 'Orange_tile');
		this.Orange_tileg61.anchor.setTo(0.5, 0.5);

		this.Orange_tileg62 = game.add.sprite(730, 380, 'Orange_tile');
		this.Orange_tileg62.anchor.setTo(0.5, 0.5);
		
		this.Orange_tileg63 = game.add.sprite(725, 375, 'Orange_tile');
		this.Orange_tileg63.anchor.setTo(0.5, 0.5);
		this.Orange_tileg63.inputEnabled = true;
		this.Orange_tileg63.events.onInputUp.add(this.group9function);
		this.Orange_tileg63.flag = 0;

		group9 = game.add.group();
		group9.add(this.Orange_shadow_tileg6);
		group9.add(this.Orange_tileg61);
		group9.add(this.Orange_tileg62);
		group9.add(this.Orange_tileg63);

		correct_button = game.add.sprite(800, game.world.height-60, 'correct_button');
		correct_button.anchor.setTo(0.5, 0.5);
		correct_button.scale.setTo(0.15);
		correct_button.inputEnabled = true;
		correct_button.events.onInputUp.add(this.correct_button_clicked,this);
		
		wrong_button = game.add.sprite(865, game.world.height-60, 'wrong_button');
		wrong_button.anchor.setTo(0.5, 0.5);
		wrong_button.scale.setTo(0.15);
		wrong_button.inputEnabled = true;
		wrong_button.events.onInputUp.add(this.wrong_button_clicked);

		text = game.add.text(425, game.world.height-82, '', style);
		
		sorryText = game.add.text(425, game.world.height-140, '', style);
        sorryText.fill = "#ffffff"
        
        Score_board = game.add.sprite(game.world.centerX, game.world.centerY-50, 'Score_board');
        Score_board.anchor.setTo(0.5, 0.5);
        Score_board.scale.setTo(0.2);
        Score_board.alpha = 0;
        
        score_text = game.add.text(game.world.centerX, game.world.centerY-50, '0', style1);
        score_text.alpha = 0;
        
/*		this.group9 = game.add.group();
		this.group9.create(670, 460, 'Orange_shadow_tile');
		this.group9.create(665, 455, 'Orange_tile');
		this.group9.create(660, 450, 'Orange_tile');
		this.group9.create(655, 445, 'Orange_tile');
*/		

		functionArray.push(this.group1function);
		functionArray.push(this.group2function);
		functionArray.push(this.group3function);
		functionArray.push(this.group4function);
		functionArray.push(this.group5function);
		functionArray.push(this.group6function);
		functionArray.push(this.group7function);
		functionArray.push(this.group8function);
		functionArray.push(this.group9function);

		hintButton = game.add.sprite(440, game.world.height-195, 'Hint_Button');
		hintButton.anchor.setTo(0.5, 0.5);
		hintButton.scale.setTo(0.70);
		hintButton.inputEnabled = true;
		hintButton.events.onInputUp.add(this.hintButton_clicked);
        

        points = game.add.text(800, game.world.height-220, '', style);
        points.alpha = 0;
        points.fill = '#ffffff';

        wordhint = game.add.text(800, game.world.height-220, '', style);
//        wordhint.alpha = 0;
        wordhint.fill = '#ffffff';
        
        
/*		chars = this.random_char();


		var newArray = new Array();
		while(mainarray.length==0)
		{
			Array.prototype.push.apply(mainarray, two(chars.join("")));
			Array.prototype.push.apply(mainarray, three(chars.join("")));
			Array.prototype.push.apply(mainarray, four(chars.join("")));
//		console.log(mainarray.length);
			newArray = mainarray.slice();
			
			for(var i=0; i<newArray.length; i++)
			{
				var arr = new Uint8Array(26); 

				for(j=0; j<newArray[i].length; j++)
				{
					var val = newArray[i];
					var code = val.charCodeAt(val.length-1);
					arr[code-97]++;					
				}
//				console.log(arr);				
				for(var k=0; k<arr.length; k++)
				{
					if(arr[k]>1)
					{
						mainarray.splice(newArray.indexOf(newArray[i]),1);
						break;
					}
				}
			}
		}
		*/
//		console.log(mainarray.length);
//		console.log(correct_button.tint);
/*		var pan = correct_button.id;
		pan.tint = Math.random() * 0xffffff;
		console.log(pan);
*///		ekfunction = this.mainFunction;

		groupArray.push(group1);
		groupArray.push(group2);
		groupArray.push(group3);
		groupArray.push(group4);
		groupArray.push(group5);
		groupArray.push(group6);
		groupArray.push(group7);
		groupArray.push(group8);
		groupArray.push(group9);

		this.mainFunction();	

		var flag = 0;
		for(var i=0; i<chars.length; i++)
		{
//			console.log(chars[i]+' '+position[i].x+' '+position[i].y);
			var v = 'letter'+i;
			v = game.add.sprite(position[i].x, position[i].y, chars[i]);
			v.scale.setTo(.20);
			v.anchor.setTo(0.5, 0.5);
			v.inputEnabled = true;
			v.events.onInputUp.add(this.storeLetter);
			v.id = flag++;
			v.flag = 0;
			clickLetter.push(v);
		}
		
		letterFunction = this.storeLetter;

//		console.log(mainarray);
	},
	
	update : function ()
	{
	},
	
    
    hintButton_clicked : function()
    {
/*        if(letterArray.length==0)
            {
                var sc2 = parseInt(score.text);
                if(sc2>=10)
                    {
                        score.text = sc2 -10;
                        hintButton.inputEnabled = false; 
                        
                        var res = two(chars.join(""), 5);
                        if(res==5)
                            {
                                res = three(chars.join(""), 5);
                            }
                        
                        if(res==5)
                            {
                                res = four(chars.join(""), 5);
                            }
                        
                        if(res!=5)
                            {
                                var pos;
                                for(var i = 0; i<chars.length; i++)
                                    {
                                        if(res.charAt(0)==chars[i])
                                            {
                                                pos = i;
                                                break;
                                            }
                                    }

        //                        console.log('x= '+groupArray2[pos].getAt(groupArray2[pos].total-1).position.x);
        //                        console.log('y= '+groupArray2[pos].getAt(groupArray2[pos].total-1).position.y);

                                groupArray[pos].getAt(groupArray[pos].total-1).position.x = groupArray[pos].getAt(groupArray[pos].total-1).position.x-5;
                                groupArray[pos].getAt(groupArray[pos].total-1).position.y = groupArray[pos].getAt(groupArray[pos].total-1).position.y-5;

                                    clickLetter[pos].position.x = clickLetter[pos].position.x-5;
                                    clickLetter[pos].position.y = clickLetter[pos].position.y-5;

                                    letterArray.push(clickLetter[pos].key);	
                                 //   letterIndex2.push(pos);
                                    groupArray[pos].getAt(groupArray[pos].total-1).flag = 1;

                                text.text = res.charAt(0);
                            }
                    }
            } */
        var sc2 = parseInt(score.text);
        if(sc2>=10)
        {
            var res = 5;// two(chars.join(""), 5);

                    res = two(chars.join(""), 5);

                if(res==5)
                {
                    res = three(chars.join(""), 5);
                }
                
                if(res==5)
                {
                    res = four(chars.join(""), 5);
                }
                
                if(res==5)
                {
                    res = five(chars.join(""), 5);
                }
                
                if(res==5)
                {
                    res = six(chars.join(""), 5);
                }
        
                wordhint.alpha = 1;
                score.text = sc2 -10;
                wordhint.text = res;
                this.pts1 = game.add.tween(wordhint);
                this.pts1.to({alpha:1}, 1000);
                this.pts1.to({alpha:0}, 200);
                this.pts1.start();
        }
        
    },
    
    
	homefunction : function ()
	{
		clickLetter = [];
		groupArray = [];
		letterArray = [];
		functionArray = [];
		
		vowelArray = [];
		consonantArray = [];
		chars=[];
		position = [{x:530, y:182}, {x:635, y:190}, {x:732, y:182}, {x:540, y:290}, {x:625, y:280}, {x:740, y:295}, {x:535, y:390}, {x:635, y:385}, {x:725, y:380}];
		mainarray = [];
		
		game.state.start('levelState');
	//	game.state.start("levelState",true,true);
	},
	
	
	mainFunction : function ()
	{
//		console.log('first time');
        
        vowelArray = [];
        consonantArray = [];
        
		if(chars.length<1)
		{
			chars = this.random_char(vowelArray, consonantArray);
		}
		else
		{
			for(var j = 0; j<chars.length; j++)
			{
				if(chars[j]=='a' || chars[j]=='e' || chars[j]=='i' || chars[j]=='o' || chars[j]=='u')
				{
					vowelArray.push(chars[j]);
				}
				else
				{
					consonantArray.push(chars[j]);
				}
			}

			var tempchar = this.random_char(vowelArray, consonantArray);
			var newChar = new Array();
			newChar = chars.slice();
			console.log('newChar= '+newChar);
//			console.log('chars= '+chars+' letterArray='+letterArray+' vowelArray='+vowelArray+' consonantArray='+consonantArray+' tempchar='+tempchar+' tempchar='+tempchar.length);
			for(var i = 0; i<tempchar.length; i++)
			{
				var ch = chars.join("");
				var ind = chars.indexOf(letterArray[i]);
				
//				console.log(i+' ind='+ind+' '+letterArray[i]+' '+clickLetter[ind].id);
				var id = clickLetter[ind].id;
				newChar[ind] = tempchar[i];
				var len = groupArray[ind].total;
				if(len>0)
				{
				var v = newChar[ind];
				position[ind].x = position[ind].x+5;
				position[ind].y = position[ind].y+5;
				v = game.add.sprite(position[ind].x, position[ind].y, newChar[ind]);
				v.scale.setTo(.20);
				v.anchor.setTo(0.5, 0.5);
				v.inputEnabled = true;
				v.events.onInputUp.add(this.storeLetter);
				v.id = id;
				v.flag = 0;
				clickLetter[ind] = v;
				}
			}
			chars = newChar.slice();
		}

		letterArray = [];
		mainarray = [];
		
		for(var x = 0; x<groupArray.length; x++)
		{
			if(groupArray[x].total==0)
			{
				chars[x] = '0';
			}
		}
		
		console.log('chars = '+chars);
		
		var newArray = new Array();
        
        var count1=0;
        for(var vv = 0; vv<chars.length; vv++)
        {
            if(chars[vv]>='a' && chars[vv]<='z')
                count1++;
        }
        
//		while(mainarray.length==0)
//		{
//			Array.prototype.push.apply(mainarray, two(chars.join("")));
			var result = 0;

            if(count1>=2) 
                result = two(chars.join(""), 1);
//			console.log('2result= '+result);
			if(result==0 && count1>=3)
			{
//				Array.prototype.push.apply(mainarray, three(chars.join("")));
				result = three(chars.join(""), 1);
//				console.log('3result= '+result);
			}
			
			if(result==0 && count1>=4)
			{
//				Array.prototype.push.apply(mainarray, four(chars.join("")));
				result = four(chars.join(""), 1);
//				console.log('4result= '+result);
			}
			
/*        
			var count1=0;
			for(var vv = 0; vv<chars.length; vv++)
			{
				if(chars[vv]>='a' && chars[vv]<='z')
					count1++;
			}
			
			if(count1>=5 && count1<=8)
			{
				if(result==0)
				{
					result = five(chars.join(""), 1);
				}
				
				if(result==0)
				{
					result = six(chars.join(""), 1);
				}
				
				if(result==0)
				{
					result = seven(chars.join(""), 1);
				}
				
				if(result==0)
				{
					result = eight(chars.join(""), 1);
				}
                
				if(result==0)
				{
					result = nine(chars.join(""), 1);
				}
			}
*/      
			if(result==0)
			{
                Score_board.alpha = 1;
                score_text.alpha = 1;
                score_text.text = score.text;
                
                setTimeout(function(){game.state.start('level2');}, 3000);
                
/*                var vv = 0;
                for(var m = 0; m<groupArray.length; m++)
                    {
                        vv += groupArray[m].total;
                        if(groupArray[m].total>0)
                            {
                                game.add.tween(clickLetter[m]).to({x:800, y:30},200).start();
                                this.click = game.add.tween(groupArray[m]).to({x:800, y:30},200);
                                this.click.start();
                                this.click.onComplete.add(this.nextLevel, this); */
/*                                var le = groupArray[m].total;
                                for(var l = 0; l<le; l++)
                                    {
                                        if(clickLetter[m]>='a' && clickLetter[m]<='z')
                                            {
                                                game.add.tween(clickLetter[m]).to({x:800, y:30},200);
                                            }
                                        
                                        this.click = game.add.tween(groupArray[m].getAt(groupArray[m].total-1)).to({x:800, y:30},200).start();
                                        this.click.start();
                                        this.click.onComplete.add(this.nextLevel, this);
                                    }
                                
//                                this.click.onComplete.add(this.nextLevel, this);
*/ //                            }
     //               }
//                console.log('vv= '+vv);
//				game.state.start('level2');

                
              //  setTimeout(function(){game.state.start('level2');}, 1600*(vv+1));
			}

//		console.log(mainarray.length);
/*			newArray = mainarray.slice();
			
			for(var i=0; i<newArray.length; i++)
			{
				var arr = new Uint8Array(27); 
				
				var element = newArray[i];
				for(j=0; j<newArray[i].length; j++)
				{
					var val = element[j];
					var code = val.charCodeAt(val.length-1);
					if(code==48)
					{	// 48 is the ascii code of 0
						a[26]++;
					}
					else
						arr[code-97]++;
				}
//				console.log(arr);				
				for(var k=0; k<arr.length; k++)
				{
					if(arr[k]>1 || arr[arr.length-1]>=1)
					{
						mainarray.splice(mainarray.indexOf(newArray[i]),1);
						break;
					}
				}
			} */
//		}
//		mainarray.sort();
/*		if(mainarray.length==0)
		{
			game.state.start('load');
		}
*/
//		console.log(mainarray);
	},
	
    nextLevel :  function()
    {
//        setTimeout(function(){game.state.start('level2');},2000);
        
                for(var m = 0; m<groupArray.length; m++)
                    {
                        if(groupArray[m].total>0)
                            {
                                groupArray[m].remove(groupArray[m].total-1);
                                groupArray[m].getAt(groupArray[m].total-1).kill();
                                clickLetter[m].kill();
                                break;
                            }
                    }
        
    },
	
	correct_button_clicked : function ()
	{
			var self = this;

			var start = 0;
			var end = game.global.b.length-1;
			var mid = (start+end)/2;
	
			var pankaj10 = 0;
			var t = new Array();
//			if (b.length > a.length)
//			t = b, b = a, a = t; // indexOf to loop over shorter
			var element = 0;
			var flag = 0;

/*			if(letterArray.length==2)
			{
				var a1 = letterArray[0];
				var a2 = letterArray[1];
			
				while(start<=end)
				{
					mid = ~~mid;

					var element = game.global.b[mid];
//					console.log(element.length);
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1) && element.length==letterArray.length)
					{
						break;
					}
					else if(element.charAt(0) == a1)
					{
						if(element.charAt(1) < a2)
						{
							start = mid+1;
						}
						else if(element.charAt(1) == a2 && element.length==letterArray.length)
						{
							break;
						}
						else
						{
							end = mid-1;
						}
					}
					else
					{
						end = mid-1;
					}
					mid = (start+end)/2;
				}
			}
			
			if(letterArray.length==3)
			{
				var a1 = letterArray[0];
				var a2 = letterArray[1];
				var a3 = letterArray[2];

				while(start<=end)
				{
					mid = ~~mid;

					var element = game.global.b[mid];
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && element.length==letterArray.length)
					{
						break;
					}
					else if(element.charAt(0) == a1)
					{
						if(element.charAt(1) < a2)
						{
							start = mid+1;
						}
						else if(element.charAt(1) == a2)
						{
							if(element.charAt(2) < a3)
							{
								start = mid+1;
							}
							else if(element.charAt(2) == a3 && element.length==letterArray.length)
							{
								break;
							}
							else
							{
								end = mid-1;
							}
						}
						else
						{
							end = mid-1;
						}
					}
					else
					{
						end = mid-1;
					}
					mid = (start+end)/2;
				}
			}
			
			if(letterArray.length==4)
			{
				var a1 = letterArray[0];
				var a2 = letterArray[1];
				var a3 = letterArray[2];
				var a4 = letterArray[3];

				while(start<=end)
				{
					mid = ~~mid;

					var element = game.global.b[mid];
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && a4 == element.charAt(3) && element.length==letterArray.length)
					{
						break;
					}
					else if(element.charAt(0) == a1)
					{
						if(element.charAt(1) < a2)
						{
							start = mid+1;
						}
						else if(element.charAt(1) == a2)
						{
							if(element.charAt(2) < a3)
							{
								start = mid+1;
							}
							else if(element.charAt(2) == a3)
							{
								if(element.charAt(3) < a4)
								{
									start = mid+1;
								}
								else if(element.charAt(3) == a4 && element.length==letterArray.length)
								{
									break;
								}
								else
								{
									end = mid-1;
								}
							}
							else
							{
								end = mid-1;
							}
						}
						else
						{
							end = mid-1;
						}
					}
					else
					{
						end = mid-1;
					}
					mid = (start+end)/2;
				}
			}

			if(letterArray.length==5)
			{
				var a1 = letterArray[0];
				var a2 = letterArray[1];
				var a3 = letterArray[2];
				var a4 = letterArray[3];
				var a5 = letterArray[4];

				while(start<=end)
				{
					mid = ~~mid;

					var element = game.global.b[mid];
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && a4 == element.charAt(3) && a5 == element.charAt(4) && element.length==letterArray.length)
					{
						break;
					}
					else if(element.charAt(0) == a1)
					{
						if(element.charAt(1) < a2)
						{
							start = mid+1;
						}
						else if(element.charAt(1) == a2)
						{
							if(element.charAt(2) < a3)
							{
								start = mid+1;
							}
							else if(element.charAt(2) == a3)
							{
								if(element.charAt(3) < a4)
								{
									start = mid+1;
								}
								else if(element.charAt(3) == a4)
								{
									if(element.charAt(4) < a5)
									{
										start = mid+1;
									}
									else if(element.charAt(4) == a5 && element.length==letterArray.length)
									{
										break;
									}
									else
									{
										end = mid-1;
									}
								}
								else
								{
									end = mid-1;
								}
							}
							else
							{
								end = mid-1;
							}
						}
						else
						{
							end = mid-1;
						}
					}
					else
					{
						end = mid-1;
					}
					mid = (start+end)/2;
				}
			}
			
			if(letterArray.length==6)
			{
				var a1 = letterArray[0];
				var a2 = letterArray[1];
				var a3 = letterArray[2];
				var a4 = letterArray[3];
				var a5 = letterArray[4];
				var a6 = letterArray[5];

				while(start<=end)
				{
					mid = ~~mid;

					var element = game.global.b[mid];
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && a4 == element.charAt(3) && a5 == element.charAt(4) && a6 == element.charAt(5) && element.length==letterArray.length)
					{
						break;
					}
					else if(element.charAt(0) == a1)
					{
						if(element.charAt(1) < a2)
						{
							start = mid+1;
						}
						else if(element.charAt(1) == a2)
						{
							if(element.charAt(2) < a3)
							{
								start = mid+1;
							}
							else if(element.charAt(2) == a3)
							{
								if(element.charAt(3) < a4)
								{
									start = mid+1;
								}
								else if(element.charAt(3) == a4)
								{
									if(element.charAt(4) < a5)
									{
										start = mid+1;
									}
									else if(element.charAt(4) == a5)
									{
										if(element.charAt(5) < a6)
										{
											start = mid+1;
										}
										else if(element.charAt(5) == a6 && element.length==letterArray.length)
										{
											break;
										}
										else
										{
											end = mid-1;
										}
									}
									else
									{
										end = mid-1;
									}
								}
								else
								{
									end = mid-1;
								}
							}
							else
							{
								end = mid-1;
							}
						}
						else
						{
							end = mid-1;
						}
					}
					else
					{
						end = mid-1;
					}
					mid = (start+end)/2;
				}
			}
        
        
			if(letterArray.length==7)
			{
				var a1 = string[0];
				var a2 = string[1];
				var a3 = string[2];
				var a4 = string[3];
				var a5 = string[4];
				var a6 = string[5];
				var a7 = string[6];

				while(start<=end)
				{
					mid = ~~mid;

					var element = game.global.b[mid];
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && a4 == element.charAt(3) && a5 == element.charAt(4) && a6 == element.charAt(5) && a7 == element.charAt(6) && element.length==letterArray.length)
					{
						break;
					}
					else if(element.charAt(0) == a1)
					{
						if(element.charAt(1) < a2)
						{
							start = mid+1;
						}
						else if(element.charAt(1) == a2)
						{
							if(element.charAt(2) < a3)
							{
								start = mid+1;
							}
							else if(element.charAt(2) == a3)
							{
								if(element.charAt(3) < a4)
								{
									start = mid+1;
								}
								else if(element.charAt(3) == a4)
								{
									if(element.charAt(4) < a5)
									{
										start = mid+1;
									}
									else if(element.charAt(4) == a5)
									{
										if(element.charAt(5) < a6)
										{
											start = mid+1;
										}
										else if(element.charAt(5) == a6)
										{
											if(element.charAt(6) < a7)
											{
												start = mid+1;
											}
											else if(element.charAt(6) == a7 && element.length==letterArray.length)
											{
												break;
											}
											else
											{
												end = mid-1;
											}
										}
										else
										{
											end = mid-1;
										}
									}
									else
									{
										end = mid-1;
									}
								}
								else
								{
									end = mid-1;
								}
							}
							else
							{
								end = mid-1;
							}
						}
						else
						{
							end = mid-1;
						}
					}
					else
					{
						end = mid-1;
					}
					mid = (start+end)/2;
				}
			}
			
			
			
			if(letterArray.length==8)
			{
				var a1 = string[0];
				var a2 = string[1];
				var a3 = string[2];
				var a4 = string[3];
				var a5 = string[4];
				var a6 = string[5];
				var a7 = string[6];
				var a8 = string[7];

				while(start<=end)
				{
					mid = ~~mid;

					var element = game.global.b[mid];
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && a4 == element.charAt(3) && a5 == element.charAt(4) && a6 == element.charAt(5) && a7 == element.charAt(6) && a8 == element.charAt(7) && element.length==letterArray.length)
					{
						break;
					}
					else if(element.charAt(0) == a1)
					{
						if(element.charAt(1) < a2)
						{
							start = mid+1;
						}
						else if(element.charAt(1) == a2)
						{
							if(element.charAt(2) < a3)
							{
								start = mid+1;
							}
							else if(element.charAt(2) == a3)
							{
								if(element.charAt(3) < a4)
								{
									start = mid+1;
								}
								else if(element.charAt(3) == a4)
								{
									if(element.charAt(4) < a5)
									{
										start = mid+1;
									}
									else if(element.charAt(4) == a5)
									{
										if(element.charAt(5) < a6)
										{
											start = mid+1;
										}
										else if(element.charAt(5) == a6)
										{
											if(element.charAt(6) < a7)
											{
												start = mid+1;
											}
											else if(element.charAt(6) == a7)
											{
												if(element.charAt(7) < a8)
												{
													start = mid+1;
												}
												else if(element.charAt(7) == a8 && element.length==letterArray.length)
												{
													break;
												}
												else
												{
													end = mid-1;
												}
											}
											else
											{
												end = mid-1;
											}
										}
										else
										{
											end = mid-1;
										}
									}
									else
									{
										end = mid-1;
									}
								}
								else
								{
									end = mid-1;
								}
							}
							else
							{
								end = mid-1;
							}
						}
						else
						{
							end = mid-1;
						}
					}
					else
					{
						end = mid-1;
					}
					mid = (start+end)/2;
				}
			}
			
			
			if(letterArray.length==9)
			{
				var a1 = string[0];
				var a2 = string[1];
				var a3 = string[2];
				var a4 = string[3];
				var a5 = string[4];
				var a6 = string[5];
				var a7 = string[6];
				var a8 = string[7];
				var a9 = string[8];

				while(start<=end)
				{
					mid = ~~mid;

					var element = game.global.b[mid];
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && a4 == element.charAt(3) && a5 == element.charAt(4) && a6 == element.charAt(5) && a7 == element.charAt(6) && a8 == element.charAt(7) && a9 == element.charAt(8) && element.length==letterArray.length)
					{
						break;
					}
					else if(element.charAt(0) == a1)
					{
						if(element.charAt(1) < a2)
						{
							start = mid+1;
						}
						else if(element.charAt(1) == a2)
						{
							if(element.charAt(2) < a3)
							{
								start = mid+1;
							}
							else if(element.charAt(2) == a3)
							{
								if(element.charAt(3) < a4)
								{
									start = mid+1;
								}
								else if(element.charAt(3) == a4)
								{
									if(element.charAt(4) < a5)
									{
										start = mid+1;
									}
									else if(element.charAt(4) == a5)
									{
										if(element.charAt(5) < a6)
										{
											start = mid+1;
										}
										else if(element.charAt(5) == a6)
										{
											if(element.charAt(6) < a7)
											{
												start = mid+1;
											}
											else if(element.charAt(6) == a7)
											{
												if(element.charAt(7) < a8)
												{
													start = mid+1;
												}
												else if(element.charAt(7) == a8)
												{
													if(element.charAt(8) < a9)
													{
														start = mid+1;
													}
													else if(element.charAt(8) == a9 && element.length==letterArray.length)
													{
														break;
													}
													else
													{
														end = mid-1;
													}
												}
												else
												{
													end = mid-1;
												}
											}
											else
											{
												end = mid-1;
											}
										}
										else
										{
											end = mid-1;
										}
									}
									else
									{
										end = mid-1;
									}
								}
								else
								{
									end = mid-1;
								}
							}
							else
							{
								end = mid-1;
							}
						}
						else
						{
							end = mid-1;
						}
					}
					else
					{
						end = mid-1;
					}
					mid = (start+end)/2;
				}
			}
        
*/        
			
			var ch = checkWord(letterArray);
			if(ch==0 || letterArray.length<=1)
			{
				sorryText.text = 'Invalid';
				console.log('no');
//				console.log(letterArray);
			}
			else
			{
                
                text.fill = "#061e23";
                hintButton.inputEnabled = true;
				sorryText.text = '';
//				console.log('yes');
				var lenvowel = 0, lencon = 0;				
				for(var i=0; i<letterArray.length; i++)
				{
					var ind = chars.indexOf(letterArray[i]);
					var len = groupArray[ind].total;

					if(letterArray[i]=='a' || letterArray[i]=='e' || letterArray[i]=='i' || letterArray[i]=='o' || letterArray[i]=='u')
					{
						lenvowel++;
					}
					else
					{
						lencon++;
					}
					
//					console.log(len);
					
//					console.log(groupArray[ind].total);
					if(len>=1)
					{
//						groupArray[ind].remove(groupArray[ind].total-1);
//						groupArray[ind].getAt(groupArray[ind].total-1).kill();
//						clickLetter[ind].kill();
						
						game.add.tween(groupArray[ind].getAt(groupArray[ind].total-1)).to({x:800, y:30},200).start();
						this.click = game.add.tween(clickLetter[ind]).to({x:800, y:30},200);
						this.click.start();
						this.click.onComplete.add(this.myfunction, this);
					}
					
/*					if(groupArray[ind].total>=1)
					{
						groupArray[ind].children[groupArray[ind].total-1].inputEnabled = true;
						groupArray[ind].children[groupArray[ind].total-1].events.onInputUp.add(functionArray[ind]);
						groupArray[ind].children[groupArray[ind].total-1].flag = 0;
					}
		*/		}
//				text.text = '';
//				self.mainFunction();

				var sc = parseInt(score.text);
                if(letterArray.length==2)
                    {
                        score.text = sc + 20;
                        points.text = '+20';
                    }                    
                else if(letterArray.length==3)
                    {
                        points.text = '+40';
                        score.text = sc + 40;
                    }
                else if(letterArray.length==4)
                {
                        points.text = '+60';
                        score.text = sc + 60;
                }                    
                else if(letterArray.length==5)
                {
                        points.text = '+70';
                        score.text = sc + 70;
                }
                else if(letterArray.length==6)
                {
                        points.text = '+90';
                        score.text = sc + 90;
                }
                else if(letterArray.length==7)
                {
                        points.text = '+100';
                        score.text = sc + 100;
                }
                else if(letterArray.length==8)
                {
                        points.text = '+120';
                        score.text = sc + 120;
                }
                else if(letterArray.length==9)
                {
                        points.text = '+140';
                        score.text = sc + 140;
                }
                else if(letterArray.length>=10)
                {
                        points.text = '+150';
                        score.text = sc + 150;
                }
                
                this.pts = game.add.tween(points);
                this.pts.to({alpha:1}, 1000);
                this.pts.to({alpha:0}, 200);
                this.pts.start();
			}
	},

	myfunction : function ()
	{
				for(var i=0; i<letterArray.length; i++)
				{
					var ind = chars.indexOf(letterArray[i]);
					var len = groupArray[ind].total;
					
//					console.log(len);
					
//					console.log(groupArray[ind].total);
					if(len>=1)
					{
						groupArray[ind].remove(groupArray[ind].total-1);
						groupArray[ind].getAt(groupArray[ind].total-1).kill();
						clickLetter[ind].kill();
						
//						game.add.tween(groupArray[ind].getAt(groupArray[ind].total-1)).to({x:800, y:30},1000).start();
//						this.click = game.add.tween(clickLetter[ind]).to({x:800, y:30},1000);
//						this.click.start();
//						this.click.onComplete.add(this.myfunction, this);
					}
					
					if(groupArray[ind].total>=1)
					{
						groupArray[ind].children[groupArray[ind].total-1].inputEnabled = true;
						groupArray[ind].children[groupArray[ind].total-1].events.onInputUp.add(functionArray[ind]);
						groupArray[ind].children[groupArray[ind].total-1].flag = 0;
					}
				}
				
				text.text = '';
				this.mainFunction();
	},
	
/*
	mainFunction : function ()
	{
		console.log('first time');
		if(chars.length<1)
		{
			chars = this.random_char(vowelArray, consonantArray);
		}
		else
		{
			for(var j = 0; j<chars.length; j++)
			{
				if(chars[j]=='a' || chars[j]=='e' || chars[j]=='i' || chars[j]=='o' || chars[j]=='u')
				{
					vowelArray.push(chars[j]);
				}
				else
				{
					consonantArray.push(chars[j]);
				}
			}

			var tempchar = this.random_char(vowelArray, consonantArray);
			for(var i = 0; i<tempchar.length; i++)
			{
				var ch = chars.join("");
				var ind = chars.indexOf(letterArray[i]);
				var id = clickLetter[ind].id;
				chars[ind] = tempchar[i];
				var v = chars[ind];
				v = game.add.sprite(position[ind].x, position[ind].y, chars[ind]);
				v.scale.setTo(.20);
				v.anchor.setTo(0.5, 0.5);
				v.inputEnabled = true;
				v.events.onInputUp.add(this.storeLetter);
				v.id = id;
				v.flag = 0;
				clickLetter[ind] = v;
			}
		}
		
		letterArray = [];
		mainarray = [];
		
		var newArray = new Array();
		while(mainarray.length==0)
		{
			Array.prototype.push.apply(mainarray, two(chars.join("")));
			Array.prototype.push.apply(mainarray, three(chars.join("")));
			Array.prototype.push.apply(mainarray, four(chars.join("")));
//		console.log(mainarray.length);
			newArray = mainarray.slice();
			
			for(var i=0; i<newArray.length; i++)
			{
				var arr = new Uint8Array(26); 

				for(j=0; j<newArray[i].length; j++)
				{
					var val = newArray[i];
					var code = val.charCodeAt(val.length-1);
					arr[code-97]++;					
				}
//				console.log(arr);				
				for(var k=0; k<arr.length; k++)
				{
					if(arr[k]>1)
					{
						mainarray.splice(newArray.indexOf(newArray[i]),1);
						break;
					}
				}
			}
		}
	},
*/
	
	wrong_button_clicked : function ()
	{
				sorryText.text = '';	
/*		for(var i=0; i<letterArray.length; i++)
		{
			for(var j=0; j<chars.length; j++)
			{
				if(letterArray[i]==chars[j])
				{
					break;
				}
				else
					console.log(j);
			}
			var len = groupArray[j].total;
			groupArray[j].children[len-1].position.x = groupArray[j].children[len-1].position.x+5;
			groupArray[j].children[len-1].position.y = groupArray[j].children[len-1].position.y+5;
			groupArray[j].children[len-1].scale.setTo(1);
			groupArray[j].children[len-1].inputEnabled = true;
			groupArray[j].children[len-1].events.onInputUp.add(functionArray[j]);
			groupArray[j].children[len-1].flag = 0;
			
			clickLetter[j].position.x = clickLetter[j].position.x+5;
			clickLetter[j].position.y = clickLetter[j].position.y+5;
			clickLetter[j].scale.setTo(.20);
			clickLetter[j].inputEnabled = true;
			clickLetter[j].events.onInputUp.add(letterFunction);
//		console.log(groupArray[j].children[len-1].position.x);
//		console.log(groupArray[j].children[len-1].position.y);
			
		}
		console.log(letterArray);
		letterArray = [];
		text.text = letterArray.join(""); */
        
        if(letterArray.length>0)
        {
            var pos;
            for(var i = 0; i<chars.length; i++)
                {
                    if(letterArray[letterArray.length-1]==chars[i])
                        {
                            pos = i;
                            break;
                        }
                }

    //                        console.log('x= '+groupArray2[pos].getAt(groupArray2[pos].total-1).position.x);
    //                        console.log('y= '+groupArray2[pos].getAt(groupArray2[pos].total-1).position.y);

            groupArray[pos].getAt(groupArray[pos].total-1).position.x = groupArray[pos].getAt(groupArray[pos].total-1).position.x+5;
            groupArray[pos].getAt(groupArray[pos].total-1).position.y = groupArray[pos].getAt(groupArray[pos].total-1).position.y+5;

                clickLetter[pos].position.x = clickLetter[pos].position.x+5;
                clickLetter[pos].position.y = clickLetter[pos].position.y+5;

                letterArray.splice(letterArray.indexOf(clickLetter[pos].key), 1);
             //   letterIndex2.push(pos);
                groupArray[pos].getAt(groupArray[pos].total-1).flag = 0;
            text.text = letterArray.join("");

            if(letterArray.length<2)
            {
                    text.fill = "#061e23";
            }
            else
            {
                var ch = checkWord3(letterArray);
                if(ch==1)
                    {
                        text.fill = '#368e3c';
                    }
                else
                    {
                        text.fill = "#061e23";
                    }
            }
        }
	},
	
	
	storeLetter : function (item)
	{
	//	sorryText.text = '';
		var len = groupArray[item.id].total;

		if(groupArray[item.id].children[len-1].flag==0)
		{
			item.position.x = item.position.x-5;
			item.position.y = item.position.y-5;
//			item.scale.setTo(.25);
//			item.inputEnabled = false;
		

			groupArray[item.id].children[len-1].position.x = groupArray[item.id].children[len-1].position.x-5;
			groupArray[item.id].children[len-1].position.y = groupArray[item.id].children[len-1].position.y-5;
//			groupArray[item.id].children[len-1].scale.setTo(1.2);
		
//			groupArray[item.id].children[len-1].inputEnabled = false;
//			console.log(groupArray[item.id].children[len-1].flag);

			letterArray.push(item.key);
			groupArray[item.id].children[len-1].flag = 1;

            if(letterArray.length<2)
            {
                    text.fill = "#061e23";
            }
            else
            {
                var ch = checkWord3(letterArray);
                if(ch==1)
                    {
                        text.fill = '#368e3c';
                    }
                else
                    {
                        text.fill = "#061e23";
                    }
            }
            
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(.25);
//			item.inputEnabled = false;
		
//			var len = groupArray[item.id].children.length;
			groupArray[item.id].children[len-1].position.x = groupArray[item.id].children[len-1].position.x+5;
			groupArray[item.id].children[len-1].position.y = groupArray[item.id].children[len-1].position.y+5;
//			groupArray[item.id].children[len-1].scale.setTo(1.2);
		
//			groupArray[item.id].children[len-1].inputEnabled = false;
			console.log(groupArray[item.id].children[len-1].flag);

			letterArray.splice(letterArray.indexOf(item.key),1);
			groupArray[item.id].children[len-1].flag = 0;
		}
*/		text.text = letterArray.join("");
        
        if(letterArray.length<2)
        {
                text.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray);
            if(ch==1)
                {
                    text.fill = '#368e3c';
                }
            else
                {
                    text.fill = "#061e23";
                }
        }
        
	},
	
	group1function : function (item)
	{
	//	sorryText.text = '';
		if(item.flag==0)
		{
			item.position.x = item.position.x-5;
			item.position.y = item.position.y-5;
//			item.scale.setTo(1.2);

//			console.log(item.position.x);
//			console.log(item.position.y);
		
			clickLetter[0].position.x = clickLetter[0].position.x-5;
			clickLetter[0].position.y = clickLetter[0].position.y-5
//			clickLetter[0].scale.setTo(.25);

//		item.inputEnabled = false;
		//	console.log(item.flag);
			letterArray.push(clickLetter[0].key);	

			item.flag = 1;
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(1.2);

//			console.log(item.position.x);
//			console.log(item.position.y);
		
			clickLetter[0].position.x = clickLetter[0].position.x+5;
			clickLetter[0].position.y = clickLetter[0].position.y+5
//			clickLetter[0].scale.setTo(.25);

//		item.inputEnabled = false;
			console.log(item.flag);
//			letterArray.push(clickLetter[0].key);
			letterArray.splice(letterArray.indexOf(clickLetter[0].key),1);
			
			item.flag = 0;
		}
*/		text.text = letterArray.join("");
        
        if(letterArray.length<2)
        {
                text.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray);
            if(ch==1)
                {
                    text.fill = '#368e3c';
                }
            else
                {
                    text.fill = "#061e23";
                }
        }
	},
	
	group2function : function (item)
	{
	//	sorryText.text = '';
		if(item.flag==0)
		{
			item.position.x = item.position.x-5;
			item.position.y = item.position.y-5;
//			item.scale.setTo(1.2);
		
			clickLetter[1].position.x = clickLetter[1].position.x-5;
			clickLetter[1].position.y = clickLetter[1].position.y-5
//			clickLetter[1].scale.setTo(.25);
		
//			item.inputEnabled = false;
			letterArray.push(clickLetter[1].key);
			item.flag = 1;
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(1.2);
		
			clickLetter[1].position.x = clickLetter[1].position.x+5;
			clickLetter[1].position.y = clickLetter[1].position.y+5
//			clickLetter[1].scale.setTo(.25);
		
//			item.inputEnabled = false;
			letterArray.splice(letterArray.indexOf(clickLetter[1].key),1);
			item.flag = 0;
		}
*/		text.text = letterArray.join("");

        if(letterArray.length<2)
        {
                text.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray);
            if(ch==1)
                {
                    text.fill = '#368e3c';
                }
            else
                {
                    text.fill = "#061e23";
                }
        }
        
    },
	
	group3function : function (item)
	{
//		sorryText.text = '';
		if(item.flag==0)
		{
			item.position.x = item.position.x-5;
			item.position.y = item.position.y-5;
//			item.scale.setTo(1.2);
		
//			item.inputEnabled = false;
		
			clickLetter[2].position.x = clickLetter[2].position.x-5;
			clickLetter[2].position.y = clickLetter[2].position.y-5
//			clickLetter[2].scale.setTo(.25);
			letterArray.push(clickLetter[2].key);
			item.flag = 1;
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(1.2);
		
//			item.inputEnabled = false;
		
			clickLetter[2].position.x = clickLetter[2].position.x+5;
			clickLetter[2].position.y = clickLetter[2].position.y+5
//			clickLetter[2].scale.setTo(.25);
			letterArray.splice(letterArray.indexOf(clickLetter[2].key),1);
			item.flag = 0;
		}
*/		text.text = letterArray.join("");

        if(letterArray.length<2)
        {
                text.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray);
            if(ch==1)
                {
                    text.fill = '#368e3c';
                }
            else
                {
                    text.fill = "#061e23";
                }
        }
        
    },
	
	group4function : function (item)
	{
	//	sorryText.text = '';
		if(item.flag==0)
		{
			item.position.x = item.position.x-5;
			item.position.y = item.position.y-5;
//			item.scale.setTo(1.2);
		
//			item.inputEnabled = false;
		
			clickLetter[3].position.x = clickLetter[3].position.x-5;
			clickLetter[3].position.y = clickLetter[3].position.y-5
//			clickLetter[3].scale.setTo(.25);
			letterArray.push(clickLetter[3].key);
			item.flag = 1;
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(1.2);
		
//			item.inputEnabled = false;
		
			clickLetter[3].position.x = clickLetter[3].position.x+5;
			clickLetter[3].position.y = clickLetter[3].position.y+5
//			clickLetter[3].scale.setTo(.25);
			letterArray.splice(letterArray.indexOf(clickLetter[3].key),1);
			item.flag = 0;
		}
*/		text.text = letterArray.join("");

        if(letterArray.length<2)
        {
                text.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray);
            if(ch==1)
                {
                    text.fill = '#368e3c';
                }
            else
                {
                    text.fill = "#061e23";
                }
        }
        
    },	
	
	group5function : function (item)
	{
		//sorryText.text = '';
		if(item.flag==0)
		{
			item.position.x = item.position.x-5;
			item.position.y = item.position.y-5;
//			item.scale.setTo(1.2);
		
//			item.inputEnabled = false;
		
			clickLetter[4].position.x = clickLetter[4].position.x-5;
			clickLetter[4].position.y = clickLetter[4].position.y-5
//			clickLetter[4].scale.setTo(.25);
			letterArray.push(clickLetter[4].key);
			item.flag = 1;
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(1.2);
		
//			item.inputEnabled = false;
		
			clickLetter[4].position.x = clickLetter[4].position.x+5;
			clickLetter[4].position.y = clickLetter[4].position.y+5
//			clickLetter[4].scale.setTo(.25);
			letterArray.splice(letterArray.indexOf(clickLetter[4].key),1);
			item.flag = 0;
		}
*/		text.text = letterArray.join("");
        
        if(letterArray.length<2)
        {
                text.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray);
            if(ch==1)
                {
                    text.fill = '#368e3c';
                }
            else
                {
                    text.fill = "#061e23";
                }
        }
        
	},
	
	group6function : function (item)
	{
//		sorryText.text = '';
		if(item.flag==0)
		{
			item.position.x = item.position.x-5;
			item.position.y = item.position.y-5;
//			item.scale.setTo(1.2);
		
//			item.inputEnabled = false;
		
			clickLetter[5].position.x = clickLetter[5].position.x-5;
			clickLetter[5].position.y = clickLetter[5].position.y-5
//			clickLetter[5].scale.setTo(.25);
			letterArray.push(clickLetter[5].key);
			item.flag = 1;
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(1.2);
		
//			item.inputEnabled = false;
		
			clickLetter[5].position.x = clickLetter[5].position.x+5;
			clickLetter[5].position.y = clickLetter[5].position.y+5
//			clickLetter[5].scale.setTo(.25);
			letterArray.splice(letterArray.indexOf(clickLetter[5].key),1);
			item.flag = 0;
		}
*/		text.text = letterArray.join("");
        
        if(letterArray.length<2)
        {
                text.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray);
            if(ch==1)
                {
                    text.fill = '#368e3c';
                }
            else
                {
                    text.fill = "#061e23";
                }
        }
        
	},
	
	group7function : function (item)
	{
	//	sorryText.text = '';
		if(item.flag==0)
		{
			item.position.x = item.position.x-5;
			item.position.y = item.position.y-5;
//			item.scale.setTo(1.2);
		
//			item.inputEnabled = false;
		
			clickLetter[6].position.x = clickLetter[6].position.x-5;
			clickLetter[6].position.y = clickLetter[6].position.y-5
//			clickLetter[6].scale.setTo(.25);
			letterArray.push(clickLetter[6].key);
			item.flag=1;
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(1.2);
		
//			item.inputEnabled = false;
		
			clickLetter[6].position.x = clickLetter[6].position.x+5;
			clickLetter[6].position.y = clickLetter[6].position.y+5
//			clickLetter[6].scale.setTo(.25);
			letterArray.splice(letterArray.indexOf(clickLetter[6].key),1);
			item.flag=0;
		}
*/		text.text = letterArray.join("");
        
        if(letterArray.length<2)
        {
                text.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray);
            if(ch==1)
                {
                    text.fill = '#368e3c';
                }
            else
                {
                    text.fill = "#061e23";
                }
        }
        
	},
	
	group8function : function (item)
	{
//		sorryText.text = '';
		if(item.flag==0)
		{
			item.position.x = item.position.x-5;
			item.position.y = item.position.y-5;
//			item.scale.setTo(1.2);
		
//			item.inputEnabled = false;
		
			clickLetter[7].position.x = clickLetter[7].position.x-5;
			clickLetter[7].position.y = clickLetter[7].position.y-5
//			clickLetter[7].scale.setTo(.25);
			item.flag = 1;
			letterArray.push(clickLetter[7].key);
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(1.2);
		
//			item.inputEnabled = false;
		
			clickLetter[7].position.x = clickLetter[7].position.x+5;
			clickLetter[7].position.y = clickLetter[7].position.y+5
//			clickLetter[7].scale.setTo(.25);
			item.flag = 0;
			letterArray.splice(letterArray.indexOf(clickLetter[7].key),1);
		}
*/		text.text = letterArray.join("");
        
        if(letterArray.length<2)
        {
                text.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray);
            if(ch==1)
                {
                    text.fill = '#368e3c';
                }
            else
                {
                    text.fill = "#061e23";
                }
        }
        
	},
	
	group9function : function (item)
	{
//		sorryText.text = '';
		if(item.flag==0)
		{
			item.position.x = item.position.x-5;
			item.position.y = item.position.y-5;
//			item.scale.setTo(1.2);

//			item.inputEnabled = false;
		
			clickLetter[8].position.x = clickLetter[8].position.x-5;
			clickLetter[8].position.y = clickLetter[8].position.y-5
//			clickLetter[8].scale.setTo(.25);
			letterArray.push(clickLetter[8].key);
			item.flag = 1;
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(1.2);

//			item.inputEnabled = false;
		
			clickLetter[8].position.x = clickLetter[8].position.x+5;
			clickLetter[8].position.y = clickLetter[8].position.y+5
//			clickLetter[8].scale.setTo(.25);
			letterArray.splice(letterArray.indexOf(clickLetter[8].key),1);
			item.flag = 0;
		}
*/		text.text = letterArray.join("");
        
        if(letterArray.length<2)
        {
                text.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray);
            if(ch==1)
                {
                    text.fill = '#368e3c';
                }
            else
                {
                    text.fill = "#061e23";
                }
        }
        
	},
	
	
	random_char : function(v,c)
			{
				var vowellen = 0, consonantlen = 0;
//				console.log(v.length+' '+c.length);
				if(v.length==0 && c.length==0)
				{
//					console.log('if');

					var selectvowel = new Array(); //['o','i','a','l','k','p','m','r','t'];
					var selconso = new Array();
					var vowel = ['a', 'e', 'i', 'o'];
					var consonant = ['c', 'd', 'f', 'g', 'h', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'y'];
	//				var consonant = ['c', 'd', 'h', 'l', 'm', 'n', 'r', 's', 't', 'w'];

					for(var i=0; i<3; i++)
					{
						var vowel1 = vowel[Math.floor(Math.random() * vowel.length)];
						var j = vowel.indexOf(vowel1);
						if(j!=-1)
						{
							vowel.splice(j, 1);
						}
						selectvowel.push(vowel1);
					}
				
				
					for(var i=0; i<6; i++)
					{
						var consonant1 = consonant[Math.floor(Math.random() * consonant.length)];
						var j = consonant.indexOf(consonant1);
						if(j!=-1)
						{
							consonant.splice(j, 1);
						}
						selectvowel.push(consonant1);
					}
				}
				else
				{
					Array.prototype.difference = function(e) {
						return this.filter(function(i) {return e.indexOf(i) < 0;});
					};

					var selectvowel = new Array();//['a','i','e','c','h','p','y','g','s'];
					var selconso = new Array();
					var vowel = ['a', 'e', 'i', 'o'];
					var consonant = ['c', 'd', 'f', 'g', 'h', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'y'];
	//				var consonant = ['c', 'd', 'h', 'l', 'm', 'n', 'r', 's', 't', 'w'];

	
//					console.log('my');

//					count total vowel and consonant in letterArray array;					
					for(var j=0; j<chars.length; j++)
					{
						var vowelflag = 0, consflag = 0;
						
						if(chars[j]=='a' || chars[j]=='e' || chars[j]=='i' || chars[j]=='o' || chars[j]=='u')
						{
							var lettervalue;
							for(var i=0; i<letterArray.length; i++)
							{
//								console.log(chars[j]);
//								console.log(letterArray[i]);
								if(chars[j]==letterArray[i])
								{
									lettervalue = letterArray[i];
									vowelflag++;
									vowellen++;
									break;
								}
							}
							if(vowelflag==0)
								vowel.splice(vowel.indexOf(chars[j]), 1);							
						}
						else
						{
							for(var i=0; i<letterArray.length; i++)
							{
								if(chars[j]==letterArray[i])
								{
									lettervalue = letterArray[i];
									consflag++;
									consonantlen++;
									break;
								}
							}
							if(consflag==0)
								consonant.splice(consonant.indexOf(chars[j]), 1);
						}
					}
					
//					console.log(vowel);
//					console.log(consonant);

					for(var i=0; i<vowellen; i++)
					{
						var vowel1 = vowel[Math.floor(Math.random() * vowel.length)];
						var j = vowel.indexOf(vowel1);
						if(j!=-1)
						{
							vowel.splice(j, 1);
						}
						selectvowel.push(vowel1);
//						console.log(vowel1);
					}
				
				
					for(var i=0; i<consonantlen; i++)
					{
						var consonant1 = consonant[Math.floor(Math.random() * consonant.length)];
						var j = consonant.indexOf(consonant1);
						if(j!=-1)
						{
							consonant.splice(j, 1);
						}
						selectvowel.push(consonant1);
//						console.log(consonant1);
					}
				}
//				console.log('vowellen= '+vowellen+' consonantlen='+consonantlen+' letterArraylen='+letterArray.length+' letterArray='+letterArray);
//				document.write(selectvowel);
                var finalArray = new Array();
                for(var k = 0; selectvowel.length>0; k++)
                    {
						var con = selectvowel[Math.floor(Math.random() * selectvowel.length)];
						selectvowel.splice(selectvowel.indexOf(con), 1);
						finalArray.push(con); 
                    }
                
				return finalArray;//document.write(selectvowel);
			}
};

			function common (a,z)
			{
				var t;
				if (z.length > a.length) t = z, z = a, a = t; // indexOf to loop over shorter
				return a.filter(function (e) {
				if (z.indexOf(e) !== -1) return true;
				});			

/*	
	b.filter(function(n) {
    return a.indexOf(n) != -1
});
*/
//			document.write(a.length);
//			document.write("<br>");
//			document.write(b.length);
	}

			
			function two(string, co)
			{
                var com = 5;
				var arr = new Array();
				var check;
				for(var i=0; i<string.length; i++)
				{
					for(var j=0; j<string.length; j++)
					{
						if(string.charAt(i)==string.charAt(j))
						{
						}
						else
						{
							var value = string.charAt(i)+''+string.charAt(j);
//						arr.push(value);
							check = checkWord(value);
							
							if(check==1)
							{
                                com = value;
								break;
							}
						}
					}
					
					if(check==1)
					{
						break;
					}
				}
//				document.write(arr.length);

/*				var t;
				if (b.length > arr.length) t = b, b = arr, arr = t; // indexOf to loop over shorter
				return arr.filter(function (e) {
				if (b.indexOf(e) !== -1) return true;
				});

				*/
//				return arr;
//				return common(arr,game.global.b);
                if(co==5)
                    return com;
				else if(check==1)
					return 1;
				else
					return 0;
			}
			
			
			function three(string, co)
			{
				var check;
                var com = 5;
				var arr = new Array();
				for(var i=0; i<string.length; i++)
				{
					for(var j=0; j<string.length; j++)
					{
//						var val = checkWord2(string.charAt(i)+''+string.charAt(j), 3);
//						if(val)
//						{
							for(var l=0; l<string.length; l++)
							{
								var value = string.charAt(i)+''+string.charAt(j)+''+string.charAt(l);
//								arr.push(value);
								check = checkWord(value);
							
								if(check==1)
								{
                                    com = value;
									break;
								}
							}
//						}
							if(check==1)
							{
								break;
							}
					}
					if(check==1)
					{
						break;
					}
				}

                if(co==5)
                    return com;
				else if(check==1)
					return 1;
				else
					return 0;
				
//				return common(arr,game.global.b);
//				document.write(arr.length);
//				return arr;
/*				var t;
				if (b.length > arr.length) t = b, b = arr, arr = t; // indexOf to loop over shorter
				return arr.filter(function (e) {
				if (b.indexOf(e) !== -1) return true;
				});
*/			}
			
			
			function four(string, co)
			{
                var com = 5;
				var arr = new Array();
				var check;
				for(var i=0; i<string.length; i++)
				{
					for(var j=0; j<string.length; j++)
					{
						for(var k=0; k<string.length; k++)
						{
//							var val = checkWord3(string.charAt(i)+''+string.charAt(j)+''+string.charAt(k), 4);
//							console.log(string.charAt(i)+''+string.charAt(j)+''+string.charAt(k));
//							document.writeln(string.charAt(i)+''+string.charAt(j)+''+string.charAt(k));
//							if(val)
//							{
								for(var l=0; l<string.length; l++)
								{
									var value = string.charAt(i)+''+string.charAt(j)+''+string.charAt(k)+''+string.charAt(l);
									check = checkWord(value);
							
									if(check==1)
									{
                                        com = value;
										break;
									}
//									arr.push(value);
								}
//							}
									if(check==1)
									{
										break;
									}
						}
									if(check==1)
									{
										break;
									}
					}
									if(check==1)
									{
										break;
									}
				}
                
                if(co==5)
                    return com;
				else if(check==1)
					return 1;
				else
					return 0;
                
//				return common(arr,game.global.b);
//				document.write(arr.length);
//				return arr;
/*				var t;
				if (b.length > arr.length) t = b, b = arr, arr = t; // indexOf to loop over shorter
				return arr.filter(function (e) {
				if (b.indexOf(e) !== -1) return true;
				});
*/			}
			

			function five(string, co)
			{
                var com = 5;
				var arr = new Array();
				var check;
				for(var i=0; i<string.length; i++)
				{
					for(var j=0; j<string.length; j++)
					{
						for(var k=0; k<string.length; k++)
						{
							for(var l=0; l<string.length; l++)
							{
								for(var m=0; m<string.length; m++)
								{
									var value = string.charAt(i)+''+string.charAt(j)+''+string.charAt(k)+''+string.charAt(l)+''+string.charAt(m);
								//	check = check5(value, 5);
									if(value.indexOf('0')>-1)
									{
										check = checkWord(value);
									}
									if(check==1)
									{
                                        com = value;
										break;
									}
								}
								if(check==1)
								{
									break;
								}
							}
							if(check==1)
							{
								break;
							}
						}
						if(check==1)
						{
							break;
						}
					}
					if(check==1)
					{
						break;
					}
				}
                
                if(co==5)
                    return com;
				else if(check==1)
					return 1;
				else
					return 0;
//				return common(arr,b);
//				document.write(arr.length);
//				return arr;
/*				var t;
				if (b.length > arr.length) t = b, b = arr, arr = t; // indexOf to loop over shorter
				return arr.filter(function (e) {
				if (b.indexOf(e) !== -1) return true;
				});
				
*/			}
			
			
			function six(string, co)
			{
                var com = 5;
				var arr = new Array();
				var check;
				for(var i=0; i<string.length; i++)
				{
					for(var j=0; j<string.length; j++)
					{
						for(var k=0; k<string.length; k++)
						{
							for(var l=0; l<string.length; l++)
							{
								for(var m=0; m<string.length; m++)
								{
									for(var n=0; n<string.length; n++)
									{
										var value = string.charAt(i)+''+string.charAt(j)+''+string.charAt(k)+''+string.charAt(l)+''+string.charAt(m)+''+string.charAt(n);
									//	check = check6(value, 6);			
										if(value.indexOf('0')>-1)
										{
											check = checkWord(value);
										}
										if(check==1)
										{
                                            com = value;
											break;
										}
									}
									if(check==1)
									{
										break;
									}
								}
								if(check==1)
								{
									break;
								}
							}
							if(check==1)
							{
								break;
							}
						}
						if(check==1)
						{
							break;
						}
					}
					if(check==1)
					{
						break;
					}
				}
                
                if(co==5)
                    return com;
				else if(check==1)
					return 1;
				else
					return 0;
//				document.write(arr.length);
//				return arr;
/*				var t;
				if (b.length > arr.length) t = b, b = arr, arr = t; // indexOf to loop over shorter
				return arr.filter(function (e) {
				if (b.indexOf(e) !== -1) return true;
				});
*/			}	
			
			function seven(string, co)
			{
                var com = 5;
				var arr = new Array();
				var check;
				for(var i=0; i<string.length; i++)
				{
					for(var j=0; j<string.length; j++)
					{
						for(var k=0; k<string.length; k++)
						{
							for(var l=0; l<string.length; l++)
							{
								for(var m=0; m<string.length; m++)
								{
									for(var n=0; n<string.length; n++)
									{
										for(var o=0; o<string.length; o++)
										{
											var value = string.charAt(i)+''+string.charAt(j)+''+string.charAt(k)+''+string.charAt(l)+''+string.charAt(m)+''+string.charAt(n)+''+string.charAt(o);
										//	check = check7(value, 7);
											if(value.indexOf('0')>-1)
											{
												check = checkWord(value);
											}
											if(check==1)
                                                {
                                                    com = value;
                                                    break;
                                                }
										}
										if(check==1)
											break;
									}
									if(check==1)
										break;
								}
								if(check==1)
									break;
							}
							if(check==1)
								break;
						}
						if(check==1)
							break;
					}
					if(check==1)
						break;
				}
				
                if(co==5)
                    return com;
				else if(check==1)
					return 1;
				else
					return 0;
			}


			function eight(string, co)
			{
                var com = 5;
				var arr = new Array();
				var check;
				for(var i=0; i<string.length; i++)
				{
					for(var j=0; j<string.length; j++)
					{
						for(var k=0; k<string.length; k++)
						{
							for(var l=0; l<string.length; l++)
							{
								for(var m=0; m<string.length; m++)
								{
									for(var n=0; n<string.length; n++)
									{
										for(var o=0; o<string.length; o++)
										{
											for(var p=0; p<string.length; p++)
											{
												var value = string.charAt(i)+''+string.charAt(j)+''+string.charAt(k)+''+string.charAt(l)+''+string.charAt(m)+''+string.charAt(n)+''+string.charAt(o)+''+string.charAt(p);
//												check = check8(value, 8);
												if(value.indexOf('0')>-1)
												{
													check = checkWord(value);
												}
												if(check==1)
                                                    {
                                                        com = value;
                                                        break;
                                                    }
											}
											if(check==1)
												break;
										}
										if(check==1)
											break;
									}
									if(check==1)
										break;
								}
								if(check==1)
									break;
							}
							if(check==1)
								break;
						}
						if(check==1)
							break;
					}
					if(check==1)
						break;
				}
				
                if(co==5)
                    return com;
				else if(check==1)
					return 1;
				else
					return 0;
			}
			
			
			
			function nine(string, co)
			{
                var com = 5;
				var arr = new Array();
				var check;
				for(var i=0; i<string.length; i++)
				{
					for(var j=0; j<string.length; j++)
					{
						for(var k=0; k<string.length; k++)
						{
							for(var l=0; l<string.length; l++)
							{
								for(var m=0; m<string.length; m++)
								{
									for(var n=0; n<string.length; n++)
									{
										for(var o=0; o<string.length; o++)
										{
											for(var p=0; p<string.length; p++)
											{
												for(var q=0; q<string.length; q++)
												{
													var value = string.charAt(i)+''+string.charAt(j)+''+string.charAt(k)+''+string.charAt(l)+''+string.charAt(m)+''+string.charAt(n)+''+string.charAt(o)+''+string.charAt(p)+''+string.charAt(q);
//													check = check9(value, 9);
													if(value.indexOf('0')>-1)
													{
														check = checkWord(value);
													}
													if(check==1)
                                                        {
                                                            com = value;
                                                            break;
                                                        }
												}
												if(check==1)
													break;
											}
											if(check==1)
												break;
										}
										if(check==1)
											break;
									}
									if(check==1)
										break;
								}
								if(check==1)
									break;
							}
							if(check==1)
								break;
						}
						if(check==1)
							break;
					}
					if(check==1)
						break;
				}
				
                if(co==5)
                    return com;
				else if(check==1)
					return 1;
				else
					return 0;
			}


/*			function five(string)
			{
				var arr = new Array();
				for(var i=0; i<string.length; i++)
				{
					for(var j=0; j<string.length; j++)
					{
						for(var k=0; k<string.length; k++)
						{
							for(var l=0; l<string.length; l++)
							{
								var val;// = checkWord4(string.charAt(i)+''+string.charAt(j)+''+string.charAt(k)+''+string.charAt(l), 5);
//								console.log(val);
								if(val)
								{
									for(var m=0; m<string.length; m++)
									{
										var value = string.charAt(i)+''+string.charAt(j)+''+string.charAt(k)+''+string.charAt(l)+''+string.charAt(m);
										arr.push(value);
									}
								}
							}
						}
					}
				}
				return common(arr,b); */
//				document.write(arr.length);
//				return arr;
/*				var t;
				if (b.length > arr.length) t = b, b = arr, arr = t; // indexOf to loop over shorter
				return arr.filter(function (e) {
				if (b.indexOf(e) !== -1) return true;
				});
*/ //			}
			
			
/*			function six(string)
			{
				var arr = new Array();
				for(var i=0; i<string.length; i++)
				{
					for(var j=0; j<string.length; j++)
					{
						for(var k=0; k<string.length; k++)
						{
							for(var l=0; l<string.length; l++)
							{
									for(var m=0; m<string.length; m++)
									{
								var val = checkWord5(string.charAt(i)+''+string.charAt(j)+''+string.charAt(k)+''+string.charAt(l)+''+string.charAt(m), 6);
//						console.log(val);
								if(val)
								{
										for(var n=0; n<string.length; n++)
										{
											var value = string.charAt(i)+''+string.charAt(j)+''+string.charAt(k)+''+string.charAt(l)+''+string.charAt(m)+''+string.charAt(n);
											arr.push(value);
										}
									}
								}
							}
						}
					}
				}
				return common(arr,b); */
//				document.write(arr.length);
//				return arr;
/*				var t;
				if (b.length > arr.length) t = b, b = arr, arr = t; // indexOf to loop over shorter
				return arr.filter(function (e) {
				if (b.indexOf(e) !== -1) return true;
				});
*/		/*	}	
			
			function seven(string)
			{
				var arr = new Array();
				for(var i=0; i<string.length; i++)
				{
					for(var j=0; j<string.length; j++)
					{
						for(var k=0; k<string.length; k++)
						{
							for(var l=0; l<string.length; l++)
							{
								var val = checkWord(string.charAt(i)+''+string.charAt(j)+''+string.charAt(k)+''+string.charAt(l), 7);
//						console.log(val);
								if(val)
								{					
									for(var m=0; m<string.length; m++)
									{
										for(var n=0; n<string.length; n++)
										{
											for(var o=0; o<string.length; o++)
											{
												var value = string.charAt(i)+''+string.charAt(j)+''+string.charAt(k)+''+string.charAt(l)+''+string.charAt(m)+''+string.charAt(n)+''+string.charAt(o);
												arr.push(value);
											}
										}
									}
								}
							}
						}
					}
				}
				return arr;
			}	
			*/
			
			function randon_char()
			{
			    var selectvowel = new Array();//['a','i','e','c','h','p','y','g','s'];
				var selconso = new Array();
				var vowel = ['a', 'e', 'i', 'o'];
				var consonant = ['c', 'd', 'f', 'g', 'h', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'y'];
//				var consonant = ['c', 'd', 'h', 'l', 'm', 'n', 'r', 's', 't', 'w'];

				for(var i=0; i<3; i++)
				{
					var vowel1 = vowel[Math.floor(Math.random() * vowel.length)];
					var j = vowel.indexOf(vowel1);
					if(j!=-1)
					{
						vowel.splice(j, 1);
					}
					selectvowel.push(vowel1);
				}
				
				
				for(var i=0; i<6; i++)
				{
					var consonant1 = consonant[Math.floor(Math.random() * consonant.length)];
					var j = consonant.indexOf(consonant1);
					if(j!=-1)
					{
						consonant.splice(j, 1);
					}
					selectvowel.push(consonant1);
				}
//				document.write(selectvowel);
				
				return selectvowel;//document.write(selectvowel);
			}

			
/*			function check2(a,len)
			{
			var t = new Array();
//			if (b.length > a.length)
//			t = b, b = a, a = t; // indexOf to loop over shorter
			var a1 = a.charAt(0);
			var a2 = a.charAt(1);

			var start = 0;
			var end = game.global.b.length-1;
			var mid = (start+end)/2;
						
			var element = 0;
			var flag = 0;

			while(start<=end)
			{
				mid = ~~mid;

				var element = game.global.b[mid];
				if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
				{
					start = mid+1;
				}
				else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && element.length==len)
				{
					break;
				}
				else if(element.charAt(0) == a1)
				{
					if(element.charAt(1) < a2)
					{
						start = mid+1;
					}
					else if(element.charAt(1) == a2 && element.length==len)
					{
						break;
					}
					else
					{
						end = mid-1;
					}
				}
				else
				{
					end = mid-1;
				}
				mid = (start+end)/2;
			}

			if(start>end)
				return 0;
			else
				return 1;			
			}
			
			
			function check3(a,len)
			{
			var t = new Array();
//			if (b.length > a.length)
//			t = b, b = a, a = t; // indexOf to loop over shorter
			var a1 = a.charAt(0);
			var a2 = a.charAt(1);
			var a3 = a.charAt(2);

			var start = 0;
			var end = game.global.b.length-1;
			var mid = (start+end)/2;
						
			var element = 0;
			var flag = 0;
//			document.writeln('start= '+start+' end= '+end);
//				document.write('val = '+a+' a1= '+a1+' a2= '+a2+' a3= '+a3);
//				document.write("<br>");
			while(start<=end)
			{
				mid = ~~mid;
//				document.write('start= '+start+' end= '+end+' mid= '+mid+' val= '+a+' element= '+b[mid]);
//				document.write("<br>");

				var element = game.global.b[mid];
//				console.log(element);
				if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
				{
					start = mid+1;
//					console.log('a1 '+ a1);
//					console.log('element.charAt(0) '+ element.charAt(0));
				}
				else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && element.length==len)
				{
//					t.push(b[mid]);

//					console.log(a);
					break;
				}
				else if(element.charAt(0) == a1)
				{
					if(element.charAt(1) < a2)
					{
						start = mid+1;
					}
					else if(element.charAt(1) == a2)
					{
						if(element.charAt(2) < a3)
						{
							start = mid+1;
						}
						else if(element.charAt(2) == a3 && element.length==len)
						{
							break;
						}
						else
						{
							end = mid-1;
						}
					}
					else
					{
						end = mid-1;
					}
				}
				else
				{
					end = mid-1;
				}
				mid = (start+end)/2;
			}
                
			if(start>end)
				return 0;
			else
				return 1;
			
			}
			
			
			function check4(a,len)
			{
			var t = new Array();
//			if (b.length > a.length)
//			t = b, b = a, a = t; // indexOf to loop over shorter

			var a1 = a.charAt(0);
			var a2 = a.charAt(1);
			var a3 = a.charAt(2);
			var a4 = a.charAt(3);

			var start = 0;
			var end = game.global.b.length-1;
			var mid = (start+end)/2;
						
			var element = 0;
			
			while(start<=end)
			{
				mid = ~~mid;
//				document.write('start= '+start+' end= '+end+' mid= '+mid+' val= '+a+' element= '+b[mid]);
//				document.write("<br>");

				var element = game.global.b[mid];
//				console.log(element);
				if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
				{
					start = mid+1;
//					console.log('a1 '+ a1);
//					console.log('element.charAt(0) '+ element.charAt(0));
				}
				else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && a4 == element.charAt(3) && element.length==len)
				{
//					t.push(b[mid]);

//					console.log(a);
					break;
				}
				else if(element.charAt(0) == a1)
				{
					if(element.charAt(1) < a2)
					{
						start = mid+1;
					}
					else if(element.charAt(1) == a2)
					{
						if(element.charAt(2) < a3)
						{
							start = mid+1;
						}
						else if(element.charAt(2) == a3)
						{
							if(element.charAt(3) < a4)
							{
								start = mid+1;
							}
							else if(element.charAt(3) == a4 && element.length==len)
							{
								break;
							}
							else
							{
								end = mid-1;
							}
						}
						else
						{
							end = mid-1;
						}
					}
					else
					{
						end = mid-1;
					}
				}
				else
				{
					end = mid-1;
				}
				mid = (start+end)/2;
			}

			if(start>end)
				return 0;
			else
				return 1;
			
			}




			function checkWord5(a,len)
			{
			var t = new Array();

			var a1 = a.charAt(0);
			var a2 = a.charAt(1);
			var a3 = a.charAt(2);
			var a4 = a.charAt(3);
			var a5 = a.charAt(4);

			var start = 0;
			var end = game.global.b.length-1;
			var mid = (start+end)/2;
						
			var element = 0;
			
			while(start<=end)
			{
				mid = ~~mid;

				var element = game.global.b[mid];
				if(element.charAt(0) < a1)
				{
					start = mid+1;
				}
				else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && a4 == element.charAt(3) && a5 == element.charAt(4) && element.length==len)
				{
					break;
				}
				else if(element.charAt(0) == a1)
				{
					if(element.charAt(1) < a2)
					{
						start = mid+1;
					}
					else if(element.charAt(1) == a2)
					{
						if(element.charAt(2) < a3)
						{
							start = mid+1;
						}
						else if(element.charAt(2) == a3)
						{
							if(element.charAt(3) < a4)
							{
								start = mid+1;
							}
							else if(element.charAt(3) == a4)
							{
								if(element.charAt(4) < a5)
								{
									start = mid+1;
								}
								else if(element.charAt(4) == a5)
								{
									break;
								}
								else
								{
									end = mid-1;
								}
							}
							else
							{
								end = mid-1;
							}
						}
						else
						{
							end = mid-1;
						}
					}
					else
					{
						end = mid-1;
					}
				}
				else
				{
					end = mid-1;
				}
				mid = (start+end)/2;
			}

			if(start>end)
				return 0;
			else
				return 1;
			}

*/

	function checkWord(string)
	{
			var start = 0;
			var end = game.global.b.length-1;
			var mid = (start+end)/2;
			
			if(string.length==2)
			{
				var a1 = string[0];
				var a2 = string[1];
			
				while(start<=end)
				{
					mid = ~~mid;

					var element = game.global.b[mid];
//					console.log(element.length);
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1) && element.length==string.length)
					{
						break;
					}
					else if(element.charAt(0) == a1)
					{
						if(element.charAt(1) < a2)
						{
							start = mid+1;
						}
						else if(element.charAt(1) == a2 && element.length==string.length)
						{
							break;
						}
						else
						{
							end = mid-1;
						}
					}
					else
					{
						end = mid-1;
					}
					mid = (start+end)/2;
				}
			}
			
			if(string.length==3)
			{
				var a1 = string[0];
				var a2 = string[1];
				var a3 = string[2];

				while(start<=end)
				{
					mid = ~~mid;

					var element = game.global.b[mid];
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && element.length==string.length)
					{
						break;
					}
					else if(element.charAt(0) == a1)
					{
						if(element.charAt(1) < a2)
						{
							start = mid+1;
						}
						else if(element.charAt(1) == a2)
						{
							if(element.charAt(2) < a3)
							{
								start = mid+1;
							}
							else if(element.charAt(2) == a3 && element.length==string.length)
							{
								break;
							}
							else
							{
								end = mid-1;
							}
						}
						else
						{
							end = mid-1;
						}
					}
					else
					{
						end = mid-1;
					}
					mid = (start+end)/2;
				}
			}
			
			if(string.length==4)
			{
				var a1 = string[0];
				var a2 = string[1];
				var a3 = string[2];
				var a4 = string[3];

				while(start<=end)
				{
					mid = ~~mid;

					var element = game.global.b[mid];
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && a4 == element.charAt(3) && element.length==string.length)
					{
						break;
					}
					else if(element.charAt(0) == a1)
					{
						if(element.charAt(1) < a2)
						{
							start = mid+1;
						}
						else if(element.charAt(1) == a2)
						{
							if(element.charAt(2) < a3)
							{
								start = mid+1;
							}
							else if(element.charAt(2) == a3)
							{
								if(element.charAt(3) < a4)
								{
									start = mid+1;
								}
								else if(element.charAt(3) == a4 && element.length==string.length)
								{
									break;
								}
								else
								{
									end = mid-1;
								}
							}
							else
							{
								end = mid-1;
							}
						}
						else
						{
							end = mid-1;
						}
					}
					else
					{
						end = mid-1;
					}
					mid = (start+end)/2;
				}
			}

			if(string.length==5)
			{
				var a1 = string[0];
				var a2 = string[1];
				var a3 = string[2];
				var a4 = string[3];
				var a5 = string[4];

				while(start<=end)
				{
					mid = ~~mid;

					var element = game.global.b[mid];
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && a4 == element.charAt(3) && a5 == element.charAt(4) && element.length==string.length)
					{
						break;
					}
					else if(element.charAt(0) == a1)
					{
						if(element.charAt(1) < a2)
						{
							start = mid+1;
						}
						else if(element.charAt(1) == a2)
						{
							if(element.charAt(2) < a3)
							{
								start = mid+1;
							}
							else if(element.charAt(2) == a3)
							{
								if(element.charAt(3) < a4)
								{
									start = mid+1;
								}
								else if(element.charAt(3) == a4)
								{
									if(element.charAt(4) < a5)
									{
										start = mid+1;
									}
									else if(element.charAt(4) == a5 && element.length==string.length)
									{
										break;
									}
									else
									{
										end = mid-1;
									}
								}
								else
								{
									end = mid-1;
								}
							}
							else
							{
								end = mid-1;
							}
						}
						else
						{
							end = mid-1;
						}
					}
					else
					{
						end = mid-1;
					}
					mid = (start+end)/2;
				}
			}
			
			if(string.length==6)
			{
				var a1 = string[0];
				var a2 = string[1];
				var a3 = string[2];
				var a4 = string[3];
				var a5 = string[4];
				var a6 = string[5];

				while(start<=end)
				{
					mid = ~~mid;

					var element = game.global.b[mid];
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && a4 == element.charAt(3) && a5 == element.charAt(4) && a6 == element.charAt(5) && element.length==string.length)
					{
						break;
					}
					else if(element.charAt(0) == a1)
					{
						if(element.charAt(1) < a2)
						{
							start = mid+1;
						}
						else if(element.charAt(1) == a2)
						{
							if(element.charAt(2) < a3)
							{
								start = mid+1;
							}
							else if(element.charAt(2) == a3)
							{
								if(element.charAt(3) < a4)
								{
									start = mid+1;
								}
								else if(element.charAt(3) == a4)
								{
									if(element.charAt(4) < a5)
									{
										start = mid+1;
									}
									else if(element.charAt(4) == a5)
									{
										if(element.charAt(5) < a6)
										{
											start = mid+1;
										}
										else if(element.charAt(5) == a6 && element.length==string.length)
										{
											break;
										}
										else
										{
											end = mid-1;
										}
									}
									else
									{
										end = mid-1;
									}
								}
								else
								{
									end = mid-1;
								}
							}
							else
							{
								end = mid-1;
							}
						}
						else
						{
							end = mid-1;
						}
					}
					else
					{
						end = mid-1;
					}
					mid = (start+end)/2;
				}
			}
			
			
			if(string.length==7)
			{
				var a1 = string[0];
				var a2 = string[1];
				var a3 = string[2];
				var a4 = string[3];
				var a5 = string[4];
				var a6 = string[5];
				var a7 = string[6];

				while(start<=end)
				{
					mid = ~~mid;

					var element = game.global.b[mid];
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && a4 == element.charAt(3) && a5 == element.charAt(4) && a6 == element.charAt(5) && a7 == element.charAt(6) && element.length==string.length)
					{
						break;
					}
					else if(element.charAt(0) == a1)
					{
						if(element.charAt(1) < a2)
						{
							start = mid+1;
						}
						else if(element.charAt(1) == a2)
						{
							if(element.charAt(2) < a3)
							{
								start = mid+1;
							}
							else if(element.charAt(2) == a3)
							{
								if(element.charAt(3) < a4)
								{
									start = mid+1;
								}
								else if(element.charAt(3) == a4)
								{
									if(element.charAt(4) < a5)
									{
										start = mid+1;
									}
									else if(element.charAt(4) == a5)
									{
										if(element.charAt(5) < a6)
										{
											start = mid+1;
										}
										else if(element.charAt(5) == a6)
										{
											if(element.charAt(6) < a7)
											{
												start = mid+1;
											}
											else if(element.charAt(6) == a7 && element.length==string.length)
											{
												break;
											}
											else
											{
												end = mid-1;
											}
										}
										else
										{
											end = mid-1;
										}
									}
									else
									{
										end = mid-1;
									}
								}
								else
								{
									end = mid-1;
								}
							}
							else
							{
								end = mid-1;
							}
						}
						else
						{
							end = mid-1;
						}
					}
					else
					{
						end = mid-1;
					}
					mid = (start+end)/2;
				}
			}
			
			
			
			if(string.length==8)
			{
				var a1 = string[0];
				var a2 = string[1];
				var a3 = string[2];
				var a4 = string[3];
				var a5 = string[4];
				var a6 = string[5];
				var a7 = string[6];
				var a8 = string[7];

				while(start<=end)
				{
					mid = ~~mid;

					var element = game.global.b[mid];
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && a4 == element.charAt(3) && a5 == element.charAt(4) && a6 == element.charAt(5) && a7 == element.charAt(6) && a8 == element.charAt(7) && element.length==string.length)
					{
						break;
					}
					else if(element.charAt(0) == a1)
					{
						if(element.charAt(1) < a2)
						{
							start = mid+1;
						}
						else if(element.charAt(1) == a2)
						{
							if(element.charAt(2) < a3)
							{
								start = mid+1;
							}
							else if(element.charAt(2) == a3)
							{
								if(element.charAt(3) < a4)
								{
									start = mid+1;
								}
								else if(element.charAt(3) == a4)
								{
									if(element.charAt(4) < a5)
									{
										start = mid+1;
									}
									else if(element.charAt(4) == a5)
									{
										if(element.charAt(5) < a6)
										{
											start = mid+1;
										}
										else if(element.charAt(5) == a6)
										{
											if(element.charAt(6) < a7)
											{
												start = mid+1;
											}
											else if(element.charAt(6) == a7)
											{
												if(element.charAt(7) < a8)
												{
													start = mid+1;
												}
												else if(element.charAt(7) == a8 && element.length==string.length)
												{
													break;
												}
												else
												{
													end = mid-1;
												}
											}
											else
											{
												end = mid-1;
											}
										}
										else
										{
											end = mid-1;
										}
									}
									else
									{
										end = mid-1;
									}
								}
								else
								{
									end = mid-1;
								}
							}
							else
							{
								end = mid-1;
							}
						}
						else
						{
							end = mid-1;
						}
					}
					else
					{
						end = mid-1;
					}
					mid = (start+end)/2;
				}
			}
			
			
			if(string.length==9)
			{
				var a1 = string[0];
				var a2 = string[1];
				var a3 = string[2];
				var a4 = string[3];
				var a5 = string[4];
				var a6 = string[5];
				var a7 = string[6];
				var a8 = string[7];
				var a9 = string[8];

				while(start<=end)
				{
					mid = ~~mid;

					var element = game.global.b[mid];
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && a4 == element.charAt(3) && a5 == element.charAt(4) && a6 == element.charAt(5) && a7 == element.charAt(6) && a8 == element.charAt(7) && a9 == element.charAt(8) && element.length==string.length)
					{
						break;
					}
					else if(element.charAt(0) == a1)
					{
						if(element.charAt(1) < a2)
						{
							start = mid+1;
						}
						else if(element.charAt(1) == a2)
						{
							if(element.charAt(2) < a3)
							{
								start = mid+1;
							}
							else if(element.charAt(2) == a3)
							{
								if(element.charAt(3) < a4)
								{
									start = mid+1;
								}
								else if(element.charAt(3) == a4)
								{
									if(element.charAt(4) < a5)
									{
										start = mid+1;
									}
									else if(element.charAt(4) == a5)
									{
										if(element.charAt(5) < a6)
										{
											start = mid+1;
										}
										else if(element.charAt(5) == a6)
										{
											if(element.charAt(6) < a7)
											{
												start = mid+1;
											}
											else if(element.charAt(6) == a7)
											{
												if(element.charAt(7) < a8)
												{
													start = mid+1;
												}
												else if(element.charAt(7) == a8)
												{
													if(element.charAt(8) < a9)
													{
														start = mid+1;
													}
													else if(element.charAt(8) == a9 && element.length==string.length)
													{
														break;
													}
													else
													{
														end = mid-1;
													}
												}
												else
												{
													end = mid-1;
												}
											}
											else
											{
												end = mid-1;
											}
										}
										else
										{
											end = mid-1;
										}
									}
									else
									{
										end = mid-1;
									}
								}
								else
								{
									end = mid-1;
								}
							}
							else
							{
								end = mid-1;
							}
						}
						else
						{
							end = mid-1;
						}
					}
					else
					{
						end = mid-1;
					}
					mid = (start+end)/2;
				}
			}
        
        
        
			if(string.length==10)
			{
				var a1 = string[0];
				var a2 = string[1];
				var a3 = string[2];
				var a4 = string[3];
				var a5 = string[4];
				var a6 = string[5];
				var a7 = string[6];
				var a8 = string[7];
				var a9 = string[8];
                var a10 = string[9];
                
				while(start<=end)
				{
					mid = ~~mid;

					var element = game.global.b[mid];
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && a4 == element.charAt(3) && a5 == element.charAt(4) && a6 == element.charAt(5) && a7 == element.charAt(6) && a8 == element.charAt(7) && a9 == element.charAt(8) && a10 == element.charAt(9)  && element.length==string.length)
					{
						break;
					}
					else if(element.charAt(0) == a1)
					{
						if(element.charAt(1) < a2)
						{
							start = mid+1;
						}
						else if(element.charAt(1) == a2)
						{
							if(element.charAt(2) < a3)
							{
								start = mid+1;
							}
							else if(element.charAt(2) == a3)
							{
								if(element.charAt(3) < a4)
								{
									start = mid+1;
								}
								else if(element.charAt(3) == a4)
								{
									if(element.charAt(4) < a5)
									{
										start = mid+1;
									}
									else if(element.charAt(4) == a5)
									{
										if(element.charAt(5) < a6)
										{
											start = mid+1;
										}
										else if(element.charAt(5) == a6)
										{
											if(element.charAt(6) < a7)
											{
												start = mid+1;
											}
											else if(element.charAt(6) == a7)
											{
												if(element.charAt(7) < a8)
												{
													start = mid+1;
												}
												else if(element.charAt(7) == a8)
												{
													if(element.charAt(8) < a9)
													{
														start = mid+1;
													}
													else if(element.charAt(8) == a9)
													{
                                                        if(element.charAt(9) < a10)
                                                        {
                                                            start = mid+1;
                                                        }
                                                        else if(element.charAt(9) == a10 && element.length==string.length)
                                                        {
                                                            break;
                                                        }
                                                        else
                                                        {
                                                            end = mid-1;
                                                        }
													}
													else
													{
														end = mid-1;
													}
												}
												else
												{
													end = mid-1;
												}
											}
											else
											{
												end = mid-1;
											}
										}
										else
										{
											end = mid-1;
										}
									}
									else
									{
										end = mid-1;
									}
								}
								else
								{
									end = mid-1;
								}
							}
							else
							{
								end = mid-1;
							}
						}
						else
						{
							end = mid-1;
						}
					}
					else
					{
						end = mid-1;
					}
					mid = (start+end)/2;
				}
			}
        
        
			if(string.length==11)
			{
				var a1 = string[0];
				var a2 = string[1];
				var a3 = string[2];
				var a4 = string[3];
				var a5 = string[4];
				var a6 = string[5];
				var a7 = string[6];
				var a8 = string[7];
				var a9 = string[8];
                var a10 = string[9];
                var a11 = string[10];
                
				while(start<=end)
				{
					mid = ~~mid;

					var element = game.global.b[mid];
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && a4 == element.charAt(3) && a5 == element.charAt(4) && a6 == element.charAt(5) && a7 == element.charAt(6) && a8 == element.charAt(7) && a9 == element.charAt(8) && a10 == element.charAt(9) && a11 == element.charAt(10) && element.length==string.length)
					{
						break;
					}
					else if(element.charAt(0) == a1)
					{
						if(element.charAt(1) < a2)
						{
							start = mid+1;
						}
						else if(element.charAt(1) == a2)
						{
							if(element.charAt(2) < a3)
							{
								start = mid+1;
							}
							else if(element.charAt(2) == a3)
							{
								if(element.charAt(3) < a4)
								{
									start = mid+1;
								}
								else if(element.charAt(3) == a4)
								{
									if(element.charAt(4) < a5)
									{
										start = mid+1;
									}
									else if(element.charAt(4) == a5)
									{
										if(element.charAt(5) < a6)
										{
											start = mid+1;
										}
										else if(element.charAt(5) == a6)
										{
											if(element.charAt(6) < a7)
											{
												start = mid+1;
											}
											else if(element.charAt(6) == a7)
											{
												if(element.charAt(7) < a8)
												{
													start = mid+1;
												}
												else if(element.charAt(7) == a8)
												{
													if(element.charAt(8) < a9)
													{
														start = mid+1;
													}
													else if(element.charAt(8) == a9)
													{
                                                        if(element.charAt(9) < a10)
                                                        {
                                                            start = mid+1;
                                                        }
                                                        else if(element.charAt(9) == a10)
                                                        {
                                                            if(element.charAt(10) < a11)
                                                            {
                                                                start = mid+1;
                                                            }
                                                            else if(element.charAt(10) == a11 && element.length==string.length)
                                                            {
                                                                break;
                                                            }
                                                            else
                                                            {
                                                                end = mid-1;
                                                            }
                                                        }
                                                        else
                                                        {
                                                            end = mid-1;
                                                        }
													}
													else
													{
														end = mid-1;
													}
												}
												else
												{
													end = mid-1;
												}
											}
											else
											{
												end = mid-1;
											}
										}
										else
										{
											end = mid-1;
										}
									}
									else
									{
										end = mid-1;
									}
								}
								else
								{
									end = mid-1;
								}
							}
							else
							{
								end = mid-1;
							}
						}
						else
						{
							end = mid-1;
						}
					}
					else
					{
						end = mid-1;
					}
					mid = (start+end)/2;
				}
			}
            
        
			if(string.length==12)
			{
				var a1 = string[0];
				var a2 = string[1];
				var a3 = string[2];
				var a4 = string[3];
				var a5 = string[4];
				var a6 = string[5];
				var a7 = string[6];
				var a8 = string[7];
				var a9 = string[8];
                var a10 = string[9];
                var a11 = string[10];
                var a12 = string[11];
                
				while(start<=end)
				{
					mid = ~~mid;

					var element = game.global.b[mid];
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && a4 == element.charAt(3) && a5 == element.charAt(4) && a6 == element.charAt(5) && a7 == element.charAt(6) && a8 == element.charAt(7) && a9 == element.charAt(8) && a10 == element.charAt(9) && a11 == element.charAt(10) && a12 == element.charAt(11) && element.length==string.length)
					{
						break;
					}
					else if(element.charAt(0) == a1)
					{
						if(element.charAt(1) < a2)
						{
							start = mid+1;
						}
						else if(element.charAt(1) == a2)
						{
							if(element.charAt(2) < a3)
							{
								start = mid+1;
							}
							else if(element.charAt(2) == a3)
							{
								if(element.charAt(3) < a4)
								{
									start = mid+1;
								}
								else if(element.charAt(3) == a4)
								{
									if(element.charAt(4) < a5)
									{
										start = mid+1;
									}
									else if(element.charAt(4) == a5)
									{
										if(element.charAt(5) < a6)
										{
											start = mid+1;
										}
										else if(element.charAt(5) == a6)
										{
											if(element.charAt(6) < a7)
											{
												start = mid+1;
											}
											else if(element.charAt(6) == a7)
											{
												if(element.charAt(7) < a8)
												{
													start = mid+1;
												}
												else if(element.charAt(7) == a8)
												{
													if(element.charAt(8) < a9)
													{
														start = mid+1;
													}
													else if(element.charAt(8) == a9)
													{
                                                        if(element.charAt(9) < a10)
                                                        {
                                                            start = mid+1;
                                                        }
                                                        else if(element.charAt(9) == a10)
                                                        {
                                                            if(element.charAt(10) < a11)
                                                            {
                                                                start = mid+1;
                                                            }
                                                            else if(element.charAt(10) == a11)
                                                            {
                                                                if(element.charAt(11) < a12)
                                                                {
                                                                    start = mid+1;
                                                                }
                                                                else if(element.charAt(11) == a12 && element.length==string.length)
                                                                {
                                                                    break;
                                                                }
                                                                else
                                                                {
                                                                    end = mid-1;
                                                                }
                                                            }
                                                            else
                                                            {
                                                                end = mid-1;
                                                            }
                                                        }
                                                        else
                                                        {
                                                            end = mid-1;
                                                        }
													}
													else
													{
														end = mid-1;
													}
												}
												else
												{
													end = mid-1;
												}
											}
											else
											{
												end = mid-1;
											}
										}
										else
										{
											end = mid-1;
										}
									}
									else
									{
										end = mid-1;
									}
								}
								else
								{
									end = mid-1;
								}
							}
							else
							{
								end = mid-1;
							}
						}
						else
						{
							end = mid-1;
						}
					}
					else
					{
						end = mid-1;
					}
					mid = (start+end)/2;
				}
			}
        
        
        
			
			if(string.length<=1)
                return 0;
			else if(start>end)
				return 0;
			else
				return 1;
			
	}