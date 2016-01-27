//var imported = document.createElement("script");
//imported.src = "word.js";
//document.getElementsByTagName("head")[0].appendChild(imported);


var group31, group32, group33, group34, group35, group36, group37, group38, group39, group310, group311, group312, group313, group314, group315, group316, group317, group318, group319, group320, group321, group322, group323, group324, group325;

//var group1function, group2function, group3function, group4function, group5function, group6function, group7function, group8function, group8function;

var clickLetter2 = new Array();
var groupArray2 = new Array();
var letterIndex2 = new Array();
var letterArray2 = new Array();
var functionArray2 = new Array();

var vowelArray2 = new Array();
var consonantArray2 = new Array();

var chars2=[], letterFunction2, text2, wrong_button2, correct_button2, sorryText2, calText2, score2, hintButton, points, wordhint, score_text, Score_board;

var position1 ; /*= [{x:442, y:122}, {x:547, y:132}, {x:633, y:118}, {x:723, y:113}, {x:830, y:127}, 
                 {x:447, y:220}, {x:538, y:212}, {x:638, y:220}, {x:730, y:212}, {x:835, y:223},
                 {x:442, y:302}, {x:538, y:302}, {x:633, y:297}, {x:735, y:307}, {x:830, y:307},
                 {x:442, y:393}, {x:543, y:398}, {x:636, y:393}, {x:740, y:401}, {x:830, y:398},
                 {x:442, y:483}, {x:547, y:488}, {x:638, y:485}, {x:735, y:485}, {x:830, y:485}];
*/
var style1 = { font: "bold 32px Century Gothic", fill: "#061e23", wordWrap: true, wordWrapWidth: 100, align: "center" };
var scorestyle = { font: "32px Century Gothic", fill: "#061e23", wordWrap: true, wordWrapWidth: 100, align: "center" };

var mainarray2 = new Array();

var ekfunction2;

var level3 = 
{
	preload : function ()
	{
        game.load.image('Score_board' , 'fwd/Score_board.png');
        game.load.image('Hint_Button' , 'fwd/Hint_Button.png');
		game.load.image('bg' , 'fwd/BG.jpg');
		game.load.image('Home' , 'attachments/Home.png');
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
		
/*		game.load.image('a' , 'letters/A.png');
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
		game.load.image('z' , 'letters/Z.png');	*/	
	},
	
	create : function ()
	{
		clickLetter2 = [];
		groupArray2 = [];
		letterArray2 = [];
		functionArray2 = [];
		
		vowelArray2 = [];
		consonantArray2 = [];
		chars2=[];
        
position1 = [{x:442, y:122}, {x:547, y:132}, {x:633, y:118}, {x:723, y:113}, {x:830, y:127}, 
                 {x:447, y:220}, {x:538, y:212}, {x:638, y:220}, {x:730, y:212}, {x:835, y:223},
                 {x:442, y:302}, {x:538, y:302}, {x:633, y:297}, {x:735, y:307}, {x:830, y:307},
                 {x:442, y:393}, {x:543, y:398}, {x:636, y:393}, {x:740, y:401}, {x:830, y:398},
                 {x:442, y:483}, {x:547, y:488}, {x:638, y:485}, {x:735, y:485}, {x:830, y:485}];
        
		this.bg = game.add.image(640, 400, 'bg');
		this.bg.anchor.setTo(0.5,0.5);
		this.bg.scale.setTo(0.15);

		score2 = game.add.text(745, 10, '0', scorestyle);
        score2.fill = "#061e23";
		this.scoretxt = game.add.text(815, 10, 'pts', scorestyle);
		this.scoretxt.fill = "#061e23";
        
		this.Home = game.add.sprite(435, 35, 'Home');
		this.Home.anchor.setTo(0.5, 0.5);
		this.Home.scale.setTo(0.6);
		this.Home.inputEnabled = true;
		this.Home.events.onInputUp.add(this.homefunction);
		
		this.Green_shadow_tile_line1 = game.add.sprite(452, 132, 'Green_shadow_tile');
		this.Green_shadow_tile_line1.anchor.setTo(0.5, 0.5);
		this.Green_shadow_tile_line1.id = 1;
		
		this.Green_tile_line1_1 = game.add.sprite(445, 125, 'Green_tile');
		this.Green_tile_line1_1.anchor.setTo(0.5, 0.5);
		this.Green_tile_line1_1.id = 1;

		this.Green_tile_line1_2 = game.add.sprite(440, 120, 'Green_tile');
		this.Green_tile_line1_2.anchor.setTo(0.5, 0.5);
		this.Green_tile_line1_2.inputEnabled = true;
		this.Green_tile_line1_2.events.onInputUp.add(this.group1function);
		this.Green_tile_line1_2.id = 3;
		this.Green_tile_line1_2.flag = 0;

		group31 = game.add.group();
		group31.add(this.Green_shadow_tile_line1);
		group31.add(this.Green_tile_line1_1);
		group31.add(this.Green_tile_line1_2);

		
		this.Red_shadow_tile_line1 = game.add.sprite(547, 132, 'Red_shadow_tile');
		this.Red_shadow_tile_line1.anchor.setTo(0.5, 0.5);
		this.Red_shadow_tile_line1.inputEnabled = true;
		this.Red_shadow_tile_line1.events.onInputUp.add(this.group2function);
		this.Red_shadow_tile_line1.flag = 0;

		group32 = game.add.group();
		group32.add(this.Red_shadow_tile_line1);

		
		this.Orange_shadow_tile_line1 = game.add.sprite(647, 132, 'Orange_shadow_tile');
		this.Orange_shadow_tile_line1.anchor.setTo(0.5, 0.5);
		
		this.Orange_tile_line1_1 = game.add.sprite(640, 125, 'Orange_tile');
		this.Orange_tile_line1_1.anchor.setTo(0.5, 0.5);
		
		this.Orange_tile_line1_2 = game.add.sprite(635, 120, 'Orange_tile');
		this.Orange_tile_line1_2.anchor.setTo(0.5, 0.5);

		this.Orange_tile_line1_3 = game.add.sprite(630, 115, 'Orange_tile');
		this.Orange_tile_line1_3.anchor.setTo(0.5, 0.5);		
		this.Orange_tile_line1_3.inputEnabled = true;
		this.Orange_tile_line1_3.events.onInputUp.add(this.group3function);
		this.Orange_tile_line1_3.flag = 0;
		
		group33 = game.add.group();
		group33.add(this.Orange_shadow_tile_line1);
		group33.add(this.Orange_tile_line1_1);
		group33.add(this.Orange_tile_line1_2);
		group33.add(this.Orange_tile_line1_3);
		
		
		this.Blue_shadow_tile_line1 = game.add.sprite(742, 132, 'Blue_shadow_tile');
		this.Blue_shadow_tile_line1.anchor.setTo(0.5, 0.5);
		
		this.Blue_tile_line1_1 = game.add.sprite(735, 125, 'Blue_tile');
		this.Blue_tile_line1_1.anchor.setTo(0.5, 0.5);

		this.Blue_tile_line1_2 = game.add.sprite(730, 120, 'Blue_tile');
		this.Blue_tile_line1_2.anchor.setTo(0.5, 0.5);
		
		this.Blue_tile_line1_3 = game.add.sprite(725, 115, 'Blue_tile');
		this.Blue_tile_line1_3.anchor.setTo(0.5, 0.5);
		
		this.Blue_tile_line1_4 = game.add.sprite(720, 110, 'Blue_tile');
		this.Blue_tile_line1_4.anchor.setTo(0.5, 0.5);
		this.Blue_tile_line1_4.inputEnabled = true;
		this.Blue_tile_line1_4.events.onInputUp.add(this.group4function);
		this.Blue_tile_line1_4.flag = 0;
		
		group34 = game.add.group();
		group34.add(this.Blue_shadow_tile_line1);
		group34.add(this.Blue_tile_line1_1);
		group34.add(this.Blue_tile_line1_2);
		group34.add(this.Blue_tile_line1_3);
		group34.add(this.Blue_tile_line1_4);
		
		
		this.Yellow_shadow_tile_line1 = game.add.sprite(837, 132, 'Yellow_shadow_tile');
		this.Yellow_shadow_tile_line1.anchor.setTo(0.5, 0.5);
		
		this.Yellow_tile_line1_1 = game.add.sprite(830, 125, 'Yellow_tile');
		this.Yellow_tile_line1_1.anchor.setTo(0.5, 0.5);
		this.Yellow_tile_line1_1.inputEnabled = true;
		this.Yellow_tile_line1_1.events.onInputUp.add(this.group5function);
		this.Yellow_tile_line1_1.flag = 0;
		
		group35 = game.add.group();
		group35.add(this.Yellow_shadow_tile_line1);
		group35.add(this.Yellow_tile_line1_1);
		
/* second line start */

		this.Blue_shadow_tile_line2 = game.add.sprite(452, 222, 'Blue_shadow_tile');
		this.Blue_shadow_tile_line2.anchor.setTo(0.5, 0.5);
		
		this.Blue_tile_line2_1 = game.add.sprite(445, 215, 'Blue_tile');
		this.Blue_tile_line2_1.anchor.setTo(0.5, 0.5);
		this.Blue_tile_line2_1.inputEnabled = true;
		this.Blue_tile_line2_1.events.onInputUp.add(this.group6function);
		this.Blue_tile_line2_1.flag = 0;
		
		group36 = game.add.group();
		group36.add(this.Blue_shadow_tile_line2);
		group36.add(this.Blue_tile_line2_1);
		
		
				
		this.Yellow_shadow_tile_line2 = game.add.sprite(547, 222, 'Yellow_shadow_tile');
		this.Yellow_shadow_tile_line2.anchor.setTo(0.5, 0.5);

		this.Yellow_tile_line2_1 = game.add.sprite(540, 215, 'Yellow_tile');
		this.Yellow_tile_line2_1.anchor.setTo(0.5, 0.5);

		this.Yellow_tile_line2_2 = game.add.sprite(535, 210, 'Yellow_tile');
		this.Yellow_tile_line2_2.anchor.setTo(0.5, 0.5);		
		this.Yellow_tile_line2_2.inputEnabled = true;
		this.Yellow_tile_line2_2.events.onInputUp.add(this.group7function);
		this.Yellow_tile_line2_2.flag = 0;

		group37 = game.add.group();
		group37.add(this.Yellow_shadow_tile_line2);
		group37.add(this.Yellow_tile_line2_1);
		group37.add(this.Yellow_tile_line2_2);


		
		this.Green_shadow_tile_line2 = game.add.sprite(647, 222, 'Green_shadow_tile');
		this.Green_shadow_tile_line2.anchor.setTo(0.5, 0.5);

		this.Green_tile_line2_1 = game.add.sprite(640, 215, 'Green_tile');
		this.Green_tile_line2_1.anchor.setTo(0.5, 0.5);
		this.Green_tile_line2_1.inputEnabled = true;
		this.Green_tile_line2_1.events.onInputUp.add(this.group8function);
		this.Green_tile_line2_1.flag = 0;
		
		group38 = game.add.group();
		group38.add(this.Green_shadow_tile_line2);
		group38.add(this.Green_tile_line2_1);
		

		this.Red_shadow_tile_line2 = game.add.sprite(742, 222, 'Red_shadow_tile');
		this.Red_shadow_tile_line2.anchor.setTo(0.5, 0.5);

		this.Red_tile_line2_1 = game.add.sprite(735, 215, 'Red_tile');
		this.Red_tile_line2_1.anchor.setTo(0.5, 0.5);

		this.Red_tile_line2_2 = game.add.sprite(730, 210, 'Red_tile');
		this.Red_tile_line2_2.anchor.setTo(0.5, 0.5);
		this.Red_tile_line2_2.inputEnabled = true;
		this.Red_tile_line2_2.events.onInputUp.add(this.group9function);
		this.Red_tile_line2_2.flag = 0;
		
		
		group39 = game.add.group();
		group39.add(this.Red_shadow_tile_line2);
		group39.add(this.Red_tile_line2_1);
		group39.add(this.Red_tile_line2_2);
		
		
		this.Orange_shadow_tile_line2 = game.add.sprite(837, 222, 'Orange_shadow_tile');
		this.Orange_shadow_tile_line2.anchor.setTo(0.5, 0.5);
		this.Orange_shadow_tile_line2.inputEnabled = true;
		this.Orange_shadow_tile_line2.events.onInputUp.add(this.group10function);
		this.Orange_shadow_tile_line2.flag = 0;
		
		group310 = game.add.group();
		group310.add(this.Orange_shadow_tile_line2);
        
        
/* third line start */

		this.Yellow_shadow_tile_line3 = game.add.sprite(452, 312, 'Yellow_shadow_tile');
		this.Yellow_shadow_tile_line3.anchor.setTo(0.5, 0.5);

		this.Yellow_tile_line3_1 = game.add.sprite(445, 305, 'Yellow_tile');
		this.Yellow_tile_line3_1.anchor.setTo(0.5, 0.5);
		
		this.Yellow_tile_line3_2 = game.add.sprite(440, 300, 'Yellow_tile');
		this.Yellow_tile_line3_2.anchor.setTo(0.5, 0.5);
		this.Yellow_tile_line3_2.inputEnabled = true;
		this.Yellow_tile_line3_2.events.onInputUp.add(this.group11function);
		this.Yellow_tile_line3_2.flag = 0;

		group311 = game.add.group();
		group311.add(this.Yellow_shadow_tile_line3);
		group311.add(this.Yellow_tile_line3_1);
		group311.add(this.Yellow_tile_line3_2);
		


		this.Pink_shadow_tile_line3 = game.add.sprite(547, 312, 'Pink_shadow_tile');
		this.Pink_shadow_tile_line3.anchor.setTo(0.5, 0.5);
        
		this.Pink_tile_line3_1 = game.add.sprite(540, 305, 'Pink_tile');
		this.Pink_tile_line3_1.anchor.setTo(0.5, 0.5);
        
		this.Pink_tile_line3_2 = game.add.sprite(535, 300, 'Pink_tile');
		this.Pink_tile_line3_2.anchor.setTo(0.5, 0.5);
		this.Pink_tile_line3_2.inputEnabled = true;
		this.Pink_tile_line3_2.events.onInputUp.add(this.group12function);
		this.Pink_tile_line3_2.flag = 0;

		group312 = game.add.group();
		group312.add(this.Pink_shadow_tile_line3);
		group312.add(this.Pink_tile_line3_1);
		group312.add(this.Pink_tile_line3_2);

		
		this.Red_shadow_tile_line3 = game.add.sprite(647, 312, 'Red_shadow_tile');
		this.Red_shadow_tile_line3.anchor.setTo(0.5, 0.5);

		this.Red_tile_line3_1 = game.add.sprite(640, 305, 'Red_tile');
		this.Red_tile_line3_1.anchor.setTo(0.5, 0.5);

		this.Red_tile_line3_2 = game.add.sprite(635, 300, 'Red_tile');
		this.Red_tile_line3_2.anchor.setTo(0.5, 0.5);
		
		this.Red_tile_line3_3 = game.add.sprite(630, 295, 'Red_tile');
		this.Red_tile_line3_3.anchor.setTo(0.5, 0.5);
		this.Red_tile_line3_3.inputEnabled = true;
		this.Red_tile_line3_3.events.onInputUp.add(this.group13function);
		this.Red_tile_line3_3.flag = 0;

		group313 = game.add.group();
		group313.add(this.Red_shadow_tile_line3);
		group313.add(this.Red_tile_line3_1);
		group313.add(this.Red_tile_line3_2);
		group313.add(this.Red_tile_line3_3);

		
		this.Green_shadow_tile_line3 = game.add.sprite(742, 312, 'Green_shadow_tile');
		this.Green_shadow_tile_line3.anchor.setTo(0.5, 0.5);

		this.Green_tile_line3_1 = game.add.sprite(735, 305, 'Green_tile');
		this.Green_tile_line3_1.anchor.setTo(0.5, 0.5);
		this.Green_tile_line3_1.inputEnabled = true;
		this.Green_tile_line3_1.events.onInputUp.add(this.group14function);
		this.Green_tile_line3_1.flag = 0;

		group314 = game.add.group();
		group314.add(this.Green_shadow_tile_line3);
		group314.add(this.Green_tile_line3_1);		
		
        
		this.Blue_shadow_tile_line3 = game.add.sprite(837, 312, 'Blue_shadow_tile');
		this.Blue_shadow_tile_line3.anchor.setTo(0.5, 0.5);

		this.Blue_tile_line3_1 = game.add.sprite(830, 305, 'Blue_tile');
		this.Blue_tile_line3_1.anchor.setTo(0.5, 0.5);
		this.Blue_tile_line3_1.inputEnabled = true;
		this.Blue_tile_line3_1.events.onInputUp.add(this.group15function);
		this.Blue_tile_line3_1.flag = 0;
        
		group315 = game.add.group();
		group315.add(this.Blue_shadow_tile_line3);
		group315.add(this.Blue_tile_line3_1); 
        
/* fourth line start */

		this.Red_shadow_tile_line4 = game.add.sprite(452, 402, 'Red_shadow_tile');
		this.Red_shadow_tile_line4.anchor.setTo(0.5, 0.5);

		this.Red_tile_line4_1 = game.add.sprite(445, 395, 'Red_tile');
		this.Red_tile_line4_1.anchor.setTo(0.5, 0.5);
		
		this.Red_tile_line4_2 = game.add.sprite(440, 390, 'Red_tile');
		this.Red_tile_line4_2.anchor.setTo(0.5, 0.5);
		this.Red_tile_line4_2.inputEnabled = true;
		this.Red_tile_line4_2.events.onInputUp.add(this.group16function);
		this.Red_tile_line4_2.flag = 0;

		
		group316 = game.add.group();
		group316.add(this.Red_shadow_tile_line4);
		group316.add(this.Red_tile_line4_1);
		group316.add(this.Red_tile_line4_2);
		
		
		this.Orange_shadow_tile_line4 = game.add.sprite(547, 402, 'Orange_shadow_tile');
		this.Orange_shadow_tile_line4.anchor.setTo(0.5, 0.5);

		this.Orange_tile_line4_1 = game.add.sprite(540, 395, 'Orange_tile');
		this.Orange_tile_line4_1.anchor.setTo(0.5, 0.5);
		this.Orange_tile_line4_1.inputEnabled = true;
		this.Orange_tile_line4_1.events.onInputUp.add(this.group17function);
		this.Orange_tile_line4_1.flag = 0;

		group317 = game.add.group();
		group317.add(this.Orange_shadow_tile_line4);
		group317.add(this.Orange_tile_line4_1);
		
		
		
		this.Blue_shadow_tile_line4 = game.add.sprite(647, 402, 'Blue_shadow_tile');
		this.Blue_shadow_tile_line4.anchor.setTo(0.5, 0.5);

		this.Blue_tile_line4_1 = game.add.sprite(640, 395, 'Blue_tile');
		this.Blue_tile_line4_1.anchor.setTo(0.5, 0.5);

		this.Blue_tile_line4_2 = game.add.sprite(635, 390, 'Blue_tile');
		this.Blue_tile_line4_2.anchor.setTo(0.5, 0.5);
		this.Blue_tile_line4_2.inputEnabled = true;
		this.Blue_tile_line4_2.events.onInputUp.add(this.group18function);
		this.Blue_tile_line4_2.flag = 0;

		group318 = game.add.group();
		group318.add(this.Blue_shadow_tile_line4);
		group318.add(this.Blue_tile_line4_1);
		group318.add(this.Blue_tile_line4_2);
		
		
		
		
		this.Yellow_shadow_tile_line4 = game.add.sprite(742, 402, 'Yellow_shadow_tile');
		this.Yellow_shadow_tile_line4.anchor.setTo(0.5, 0.5);
		this.Yellow_shadow_tile_line4.inputEnabled = true;
		this.Yellow_shadow_tile_line4.events.onInputUp.add(this.group19function);
		this.Yellow_shadow_tile_line4.flag = 0;
		
		group319 = game.add.group();
		group319.add(this.Yellow_shadow_tile_line4);
		
		
		this.Pink_shadow_tile_line4 = game.add.sprite(837, 402, 'Pink_shadow_tile');
		this.Pink_shadow_tile_line4.anchor.setTo(0.5, 0.5);

		this.Pink_tile_line4_1 = game.add.sprite(830, 395, 'Pink_tile');
		this.Pink_tile_line4_1.anchor.setTo(0.5, 0.5);
		this.Pink_tile_line4_1.inputEnabled = true;
		this.Pink_tile_line4_1.events.onInputUp.add(this.group20function);
		this.Pink_tile_line4_1.flag = 0;
		
		group320 = game.add.group();
		group320.add(this.Pink_shadow_tile_line4);
		group320.add(this.Pink_tile_line4_1);
		
/* fifth line start */

		this.Pink_shadow_tile_line5 = game.add.sprite(452, 492, 'Pink_shadow_tile');
		this.Pink_shadow_tile_line5.anchor.setTo(0.5, 0.5);

		this.Pink_tile_line5_1 = game.add.sprite(445, 485, 'Pink_tile');
		this.Pink_tile_line5_1.anchor.setTo(0.5, 0.5);
		
		this.Pink_tile_line5_2 = game.add.sprite(440, 480, 'Pink_tile');
		this.Pink_tile_line5_2.anchor.setTo(0.5, 0.5);
		this.Pink_tile_line5_2.inputEnabled = true;
		this.Pink_tile_line5_2.events.onInputUp.add(this.group21function);
		this.Pink_tile_line5_2.flag = 0;

		group321 = game.add.group();
		group321.add(this.Pink_shadow_tile_line5);
		group321.add(this.Pink_tile_line5_1);
		group321.add(this.Pink_tile_line5_2);
		


		this.Blue_shadow_tile_line5 = game.add.sprite(547, 492, 'Blue_shadow_tile');
		this.Blue_shadow_tile_line5.anchor.setTo(0.5, 0.5);
		this.Blue_shadow_tile_line5.inputEnabled = true;
		this.Blue_shadow_tile_line5.events.onInputUp.add(this.group22function);
		this.Blue_shadow_tile_line5.flag = 0;

		group322 = game.add.group();
		group322.add(this.Blue_shadow_tile_line5);


		
		this.Yellow_shadow_tile_line5 = game.add.sprite(647, 492, 'Yellow_shadow_tile');
		this.Yellow_shadow_tile_line5.anchor.setTo(0.5, 0.5);

		this.Yellow_tileg_line5_1 = game.add.sprite(640, 485, 'Yellow_tile');
		this.Yellow_tileg_line5_1.anchor.setTo(0.5, 0.5);
		this.Yellow_tileg_line5_1.inputEnabled = true;
		this.Yellow_tileg_line5_1.events.onInputUp.add(this.group23function);
		this.Yellow_tileg_line5_1.flag = 0;

		group323 = game.add.group();
		group323.add(this.Yellow_shadow_tile_line5);
		group323.add(this.Yellow_tileg_line5_1);

		
		this.Orange_shadow_tile_line5 = game.add.sprite(742, 492, 'Orange_shadow_tile');
		this.Orange_shadow_tile_line5.anchor.setTo(0.5, 0.5);

		this.Orange_tile_line5_1 = game.add.sprite(735, 485, 'Orange_tile');
		this.Orange_tile_line5_1.anchor.setTo(0.5, 0.5);
		this.Orange_tile_line5_1.inputEnabled = true;
		this.Orange_tile_line5_1.events.onInputUp.add(this.group24function);
		this.Orange_tile_line5_1.flag = 0;

		group324 = game.add.group();
		group324.add(this.Orange_shadow_tile_line5);
		group324.add(this.Orange_tile_line5_1);		
		
        
        
        
		this.Green_shadow_tile_line5 = game.add.sprite(837, 492, 'Green_shadow_tile');
		this.Green_shadow_tile_line5.anchor.setTo(0.5, 0.5);

		this.Green_tile_line5_1 = game.add.sprite(830, 485, 'Green_tile');
		this.Green_tile_line5_1.anchor.setTo(0.5, 0.5);
		this.Green_tile_line5_1.inputEnabled = true;
		this.Green_tile_line5_1.events.onInputUp.add(this.group25function);
		this.Green_tile_line5_1.flag = 0;
        
		group325 = game.add.group();
		group325.add(this.Green_shadow_tile_line5);
		group325.add(this.Green_tile_line5_1);
		
// line end here		
		correct_button2 = game.add.sprite(800, game.world.height-60, 'correct_button');
		correct_button2.anchor.setTo(0.5, 0.5);
		correct_button2.scale.setTo(0.15);
		correct_button2.inputEnabled = true;
		correct_button2.events.onInputUp.add(this.correct_button_clicked,this);
		
		wrong_button2 = game.add.sprite(865, game.world.height-60, 'wrong_button');
		wrong_button2.anchor.setTo(0.5, 0.5);
		wrong_button2.scale.setTo(0.15);
		wrong_button2.inputEnabled = true;
		wrong_button2.events.onInputUp.add(this.wrong_button_clicked);

		text2 = game.add.text(425, game.world.height-82, '', style1);
		
		sorryText2 = game.add.text(425, game.world.height-140, '', style1);
/*		this.group9 = game.add.group();
		this.group9.create(670, 460, 'Orange_shadow_tile');
		this.group9.create(665, 455, 'Orange_tile');
		this.group9.create(660, 450, 'Orange_tile');
		this.group9.create(655, 445, 'Orange_tile');
*/		

		hintButton = game.add.sprite(440, game.world.height-195, 'Hint_Button');
		hintButton.anchor.setTo(0.5, 0.5);
		hintButton.scale.setTo(0.70);
		hintButton.inputEnabled = true;
		hintButton.events.onInputUp.add(this.hintButton_clicked);
        
        points = game.add.text(800, game.world.height-220, '', style1);
        points.alpha = 0;
        points.fill = '#368e3c';
        
        wordhint = game.add.text(800, game.world.height-220, '', style);
//        wordhint.alpha = 0;
        wordhint.fill = '#000000';
        
        Score_board = game.add.sprite(game.world.centerX, game.world.centerY-50, 'Score_board');
        Score_board.anchor.setTo(0.5, 0.5);
        Score_board.scale.setTo(0.2);
        Score_board.alpha = 0;
        
        score_text = game.add.text(game.world.centerX, game.world.centerY-50, '0', style1);
        score_text.alpha = 0;
        
		functionArray2.push(this.group1function);
		functionArray2.push(this.group2function);
		functionArray2.push(this.group3function);
		functionArray2.push(this.group4function);
		functionArray2.push(this.group5function);
		functionArray2.push(this.group6function);
		functionArray2.push(this.group7function);
		functionArray2.push(this.group8function);
		functionArray2.push(this.group9function);
		functionArray2.push(this.group10function);
		functionArray2.push(this.group11function);
		functionArray2.push(this.group12function);
		functionArray2.push(this.group13function);
		functionArray2.push(this.group14function);
		functionArray2.push(this.group15function);
		functionArray2.push(this.group16function);
		functionArray2.push(this.group17function);
		functionArray2.push(this.group18function);
		functionArray2.push(this.group19function);
		functionArray2.push(this.group20function);
        functionArray2.push(this.group21function);
        functionArray2.push(this.group22function);
        functionArray2.push(this.group23function);
        functionArray2.push(this.group24function);
        functionArray2.push(this.group25function);
        
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
		this.mainFunction();	

		var flag = 0;
		for(var i=0; i<chars2.length; i++)
		{
//			console.log(chars[i]+' '+position1[i].x+' '+position1[i].y);
			var v = 'letter'+i;
			v = game.add.sprite(position1[i].x, position1[i].y, chars2[i]);
			v.scale.setTo(.20);
			v.anchor.setTo(0.5, 0.5);
			v.inputEnabled = true;
			v.events.onInputUp.add(this.storeLetter);
			v.id = flag++;
			v.flag = 0;
			clickLetter2.push(v);
		}
		
		letterFunction2 = this.storeLetter;

		groupArray2.push(group31);
		groupArray2.push(group32);
		groupArray2.push(group33);
		groupArray2.push(group34);
		groupArray2.push(group35);
		groupArray2.push(group36);
		groupArray2.push(group37);
		groupArray2.push(group38);
		groupArray2.push(group39);	
		groupArray2.push(group310);
		groupArray2.push(group311);
		groupArray2.push(group312);
		groupArray2.push(group313);
		groupArray2.push(group314);
		groupArray2.push(group315);
		groupArray2.push(group316);
		groupArray2.push(group317);
		groupArray2.push(group318);
		groupArray2.push(group319);
        groupArray2.push(group320);
        groupArray2.push(group321);
        groupArray2.push(group322);
        groupArray2.push(group323);
        groupArray2.push(group324);
        groupArray2.push(group325);
        
//		console.log(mainarray);
	},
	
	update : function ()
	{
	},
	
	homefunction : function ()
	{
		game.state.start('levelState');
	},
	
    hintButton_clicked : function()
    {
/*        if(letterArray2.length==0)
            {
                var sc2 = parseInt(score2.text);
                if(sc2>=10)
                    {
                        score2.text = sc2 -10;
                        hintButton.inputEnabled = false; 
                        
                        var res = two3(chars2.join(""), 5);
                        if(res==5)
                            {
                                res = three3(chars2.join(""), 5);
                            }
                        
                        if(res==5)
                            {
                                res = four3(chars2.join(""), 5);
                            }
                        
                        if(res==5)
                            {
                                res = five3(chars2.join(""), 5);
                            }
                        
                        if(res==5)
                            {
                                res = six3(chars2.join(""), 5);
                            }
                        
                        var pos;
                        for(var i = 0; i<chars2.length; i++)
                            {
                                if(res.charAt(0)==chars2[i])
                                    {
                                        pos = i;
                                        break;
                                    }
                            }

//                        console.log('x= '+groupArray2[pos].getAt(groupArray2[pos].total-1).position.x);
//                        console.log('y= '+groupArray2[pos].getAt(groupArray2[pos].total-1).position.y);

                        groupArray2[pos].getAt(groupArray2[pos].total-1).position.x = groupArray2[pos].getAt(groupArray2[pos].total-1).position.x-5;
                        groupArray2[pos].getAt(groupArray2[pos].total-1).position.y = groupArray2[pos].getAt(groupArray2[pos].total-1).position.y-5;

                            clickLetter2[pos].position.x = clickLetter2[pos].position.x-5;
                            clickLetter2[pos].position.y = clickLetter2[pos].position.y-5;

                            letterArray2.push(clickLetter2[pos].key);	
                            letterIndex2.push(pos);
                            groupArray2[pos].getAt(groupArray2[pos].total-1).flag = 1;

                        text2.text = res.charAt(0);
                    }
            }
*/
        
        var sc2 = parseInt(score2.text);
        if(sc2>=10)
        {
            var res = 5;// two(chars.join(""), 5);

                    res = two(chars2.join(""), 5);

                if(res==5)
                {
                    res = three(chars2.join(""), 5);
                }
                
                if(res==5)
                {
                    res = four(chars2.join(""), 5);
                }
                
                if(res==5)
                {
                    res = five(chars2.join(""), 5);
                }
                
                if(res==5)
                {
                    res = six(chars2.join(""), 5);
                }
        
                wordhint.alpha = 1;
                score2.text = sc2 -10;
                wordhint.text = res;
                this.pts1 = game.add.tween(wordhint);
                this.pts1.to({alpha:1}, 1000);
                this.pts1.to({alpha:0}, 200);
                this.pts1.start();
        }   
                
    },
    
	mainFunction : function ()
	{
//		console.log('first time');
		if(chars2.length<1)
		{
			chars2 = this.random_char(vowelArray2, consonantArray2);
		}
		else
		{
			for(var j = 0; j<chars2.length; j++)
			{
				if(chars2[j]=='a' || chars2[j]=='e' || chars2[j]=='i' || chars2[j]=='o' || chars2[j]=='u')
				{
					vowelArray2.push(chars2[j]);
				}
				else
				{
					consonantArray2.push(chars2[j]);
				}
			}

			var tempchar = this.random_char(vowelArray2, consonantArray2);
			var newChar = new Array();
			newChar = chars2.slice();
		//	console.log('newChar= '+newChar);
//			console.log('chars2= '+chars2+' letterArray2='+letterArray2+' vowelArray2='+vowelArray2+' consonantArray2='+consonantArray2+' tempchar='+tempchar+' tempchar='+tempchar.length);
			for(var i = 0; i<tempchar.length; i++)
			{
				var ch = chars2.join("");
//				var ind = letterIndex2.indexOf(letterIndex2[i]);
                var ind = letterIndex2[i];
//				console.log(i+' ind='+ind+' '+letterArray2[i]+' '+clickLetter2[ind].id);
				var id = clickLetter2[ind].id;
				newChar[ind] = tempchar[i];
				var len = groupArray2[ind].total;
				if(len>0)
				{
				var v = newChar[ind];
				position1[ind].x = position1[ind].x+5;
				position1[ind].y = position1[ind].y+5;
				v = game.add.sprite(position1[ind].x, position1[ind].y, newChar[ind]);
				v.scale.setTo(.20);
				v.anchor.setTo(0.5, 0.5);
				v.inputEnabled = true;
				v.events.onInputUp.add(this.storeLetter);
				v.id = id;
				v.flag = 0;
				clickLetter2[ind] = v;
                
				}
			}
			chars2 = newChar.slice();
		}
            console.log('new chars = '+chars2);

		letterArray2 = [];
        letterIndex2 = [];
		mainarray2 = [];
		
		for(var x = 0; x<groupArray2.length; x++)
		{
			if(groupArray2[x].total==0)
			{
				chars2[x] = '0';
			}
		}
		
	//	console.log('chars2 = '+chars2);
		
		var newArray = new Array();
        
        var count1=0;
        for(var vv = 0; vv<chars2.length; vv++)
        {
            if(chars2[vv]>='a' && chars2[vv]<='z')
                count1++;
        }
            var result = 0;
            if(count1>=2)
                result = two3(chars2.join(""), 1);

        
//		while(mainarray.length==0)
//		{
//			Array.prototype.push.apply(mainarray, two(chars2.join("")));
//			var result = two3(chars2.join(""), 1);
//			console.log('2result= '+result);
			if(result==0 && count1>=3)
			{
//				Array.prototype.push.apply(mainarray, three(chars2.join("")));
				result = three3(chars2.join(""), 1);
//				console.log('3result= '+result);
			}
			
			if(result==0 && count1>=4)
			{
//				Array.prototype.push.apply(mainarray, four(chars2.join("")));
				result = four3(chars2.join(""), 1);
//				console.log('4result= '+result);
			}
			
/*			var count1=0;
			for(var vv = 0; vv<chars2.length; vv++)
			{
				if(chars2[vv]>='a' && chars2[vv]<='z')
					count1++;
			}
			
			if(count1>=5)
			{
				if(result==0)
				{
					result = five3(chars2.join(""), 1);
				}
				
				if(result==0)
				{
					result = six3(chars2.join(""), 1);
				}
				
				if(result==0)
				{
					result = seven3(chars2.join(""), 1);
				}
				
				if(result==0)
				{
					result = eight3(chars2.join(""), 1);
				}			
			}

			if(count1>=9 && count1<=12)
			{
				if(result==0)
				{
					result = nine3(chars2.join(""), 1);
				}
				
				if(result==0)
				{
					result = ten3(chars2.join(""), 1);
				}
				
				if(result==0)
				{
					result = eleven3(chars2.join(""), 1);
				}
				
				if(result==0)
				{
					result = twelve3(chars2.join(""), 1);
				}			
			}
*/        
			if(result==0)
			{
                Score_board.alpha = 1;
                score_text.alpha = 1;
                score_text.text = score2.text;
                
                setTimeout(function(){game.state.start('level4');}, 3000);
            }
                
/*                var vv = 0;
                for(var m = 0; m<groupArray2.length; m++)
                    {
                        vv += groupArray2[m].total;
                        if(groupArray2[m].total>0)
                            {
                                game.add.tween(clickLetter2[m]).to({x:800, y:30},200).start();
                                this.click = game.add.tween(groupArray2[m]).to({x:800, y:30},200);
                                this.click.start();
                                this.click.onComplete.add(this.nextLevel2, this);
*/ /*                                var le = groupArray[m].total;
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
*/                            
                    
//                console.log('vv= '+vv);
//				game.state.start('level2');

//                score2.text = vv*10 + parseInt(score2.text);
//                setTimeout(function(){game.state.start('level4');}, 1600*(vv+1));

			
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
	
    nextLevel2 :  function()
    {
//        setTimeout(function(){game.state.start('level2');},2000);
        
                for(var m = 0; m<groupArray2.length; m++)
                    {
                        if(groupArray2[m].total>0)
                            {
                                groupArray2[m].remove(groupArray2[m].total-1);
                                groupArray2[m].getAt(groupArray2[m].total-1).kill();
                                clickLetter2[m].kill();
                                break;
                            }
                    }
        
    },	
    
	correct_button_clicked : function ()
	{
            console.log('old chars = '+chars2);
            console.log(letterArray2);
            console.log(letterIndex2);
        
//			sorryText.text = 'Ca';
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
/*
			if(letterArray2.length==2)
			{
				var a1 = letterArray2[0];
				var a2 = letterArray2[1];
			
				while(start<=end)
				{
					mid = ~~mid;

					var element = game.global.b[mid];
//					console.log(element.length);
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1) && element.length==letterArray2.length)
					{
						break;
					}
					else if(element.charAt(0) == a1)
					{
						if(element.charAt(1) < a2)
						{
							start = mid+1;
						}
						else if(element.charAt(1) == a2 && element.length==letterArray2.length)
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
			
			if(letterArray2.length==3)
			{
				var a1 = letterArray2[0];
				var a2 = letterArray2[1];
				var a3 = letterArray2[2];

				while(start<=end)
				{
					mid = ~~mid;

					var element = game.global.b[mid];
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && element.length==letterArray2.length)
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
							else if(element.charAt(2) == a3 && element.length==letterArray2.length)
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
			
			if(letterArray2.length==4)
			{
				var a1 = letterArray2[0];
				var a2 = letterArray2[1];
				var a3 = letterArray2[2];
				var a4 = letterArray2[3];

				while(start<=end)
				{
					mid = ~~mid;

					var element = game.global.b[mid];
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && a4 == element.charAt(3) && element.length==letterArray2.length)
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
								else if(element.charAt(3) == a4 && element.length==letterArray2.length)
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

			if(letterArray2.length==5)
			{
				var a1 = letterArray2[0];
				var a2 = letterArray2[1];
				var a3 = letterArray2[2];
				var a4 = letterArray2[3];
				var a5 = letterArray2[4];

				while(start<=end)
				{
					mid = ~~mid;

					var element = game.global.b[mid];
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && a4 == element.charAt(3) && a5 == element.charAt(4) && element.length==letterArray2.length)
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
									else if(element.charAt(4) == a5 && element.length==letterArray2.length)
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
			
			if(letterArray2.length==6)
			{
				var a1 = letterArray2[0];
				var a2 = letterArray2[1];
				var a3 = letterArray2[2];
				var a4 = letterArray2[3];
				var a5 = letterArray2[4];
				var a6 = letterArray2[5];

				while(start<=end)
				{
					mid = ~~mid;

					var element = game.global.b[mid];
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && a4 == element.charAt(3) && a5 == element.charAt(4) && a6 == element.charAt(5) && element.length==letterArray2.length)
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
										else if(element.charAt(5) == a6 && element.length==letterArray2.length)
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
			
			
			if(letterArray2.length==7)
			{
				var a1 = letterArray2[0];
				var a2 = letterArray2[1];
				var a3 = letterArray2[2];
				var a4 = letterArray2[3];
				var a5 = letterArray2[4];
				var a6 = letterArray2[5];
				var a7 = letterArray2[6];

				while(start<=end)
				{
					mid = ~~mid;

					var element = game.global.b[mid];
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && a4 == element.charAt(3) && a5 == element.charAt(4) && a6 == element.charAt(5) && a7 == element.charAt(6) && element.length==letterArray2.length)
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
											else if(element.charAt(6) == a7 && element.length==letterArray2.length)
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
			
			
			
			if(letterArray2.length==8)
			{
				var a1 = letterArray2[0];
				var a2 = letterArray2[1];
				var a3 = letterArray2[2];
				var a4 = letterArray2[3];
				var a5 = letterArray2[4];
				var a6 = letterArray2[5];
				var a7 = letterArray2[6];
				var a8 = letterArray2[7];

				while(start<=end)
				{
					mid = ~~mid;

					var element = game.global.b[mid];
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && a4 == element.charAt(3) && a5 == element.charAt(4) && a6 == element.charAt(5) && a7 == element.charAt(6) && a8 == element.charAt(7) && element.length==letterArray2.length)
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
												else if(element.charAt(7) == a8 && element.length==letterArray2.length)
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
			
			
			if(letterArray2.length==9)
			{
				var a1 = letterArray2[0];
				var a2 = letterArray2[1];
				var a3 = letterArray2[2];
				var a4 = letterArray2[3];
				var a5 = letterArray2[4];
				var a6 = letterArray2[5];
				var a7 = letterArray2[6];
				var a8 = letterArray2[7];
				var a9 = letterArray2[8];

				while(start<=end)
				{
					mid = ~~mid;

					var element = game.global.b[mid];
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && a4 == element.charAt(3) && a5 == element.charAt(4) && a6 == element.charAt(5) && a7 == element.charAt(6) && a8 == element.charAt(7) && a9 == element.charAt(8) && element.length==letterArray2.length)
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
													else if(element.charAt(8) == a9 && element.length==letterArray2.length)
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
			
			var ch = checkWord3(letterArray2);
			
            if(ch==0 || letterArray2.length==1)
			{
				sorryText2.text = 'Invalid';
				console.log('no');
//				console.log(letterArray2);
			}
			else
			{
                hintButton.inputEnabled = true;
				sorryText2.text = '';
                text2.fill = '#061e23';
//				console.log('yes');
				var lenvowel2 = 0, lencon2 = 0;	
				for(var i=0; i<letterArray2.length; i++)
				{
					if(letterArray2[i]=='a' || letterArray2[i]=='e' || letterArray2[i]=='i' || letterArray2[i]=='o' || letterArray2[i]=='u')
					{
						lenvowel2++;
					}
					else
					{
						lencon2++;
					}
					
//					var ind = letterIndex2.indexOf(letterIndex2[i]);
                    var ind = letterIndex2[i];
					var len = groupArray2[ind].total;
					
//					console.log(len);
					
//					console.log(groupArray2[ind].total);
					if(len>=1)
					{
//						groupArray2[ind].remove(groupArray2[ind].total-1);
//						groupArray2[ind].getAt(groupArray2[ind].total-1).kill();
//						clickLetter2[ind].kill();
						
						game.add.tween(groupArray2[ind].getAt(groupArray2[ind].total-1)).to({x:800, y:30},200).start();
						this.click2 = game.add.tween(clickLetter2[ind]).to({x:800, y:30},200);
						this.click2.start();
						this.click2.onComplete.add(this.myfunction2, this);
					}
					
/*					if(groupArray2[ind].total>=1)
					{
						groupArray2[ind].children[groupArray2[ind].total-1].inputEnabled = true;
						groupArray2[ind].children[groupArray2[ind].total-1].events.onInputUp.add(functionArray2[ind]);
						groupArray2[ind].children[groupArray2[ind].total-1].flag = 0;
					}
*/				}
//				text2.text = '';
//				self.mainFunction();

				var sc = parseInt(score2.text);
                if(letterArray2.length==2)
                    {
                        score2.text = sc + 20;
                        points.text = '+20';
                    }                    
                else if(letterArray2.length==3)
                    {
                        points.text = '+40';
                        score2.text = sc + 40;
                    }
                else if(letterArray2.length==4)
                {
                        points.text = '+60';
                        score2.text = sc + 60;
                }                    
                else if(letterArray2.length==5)
                {
                        points.text = '+70';
                        score2.text = sc + 70;
                }
                else if(letterArray2.length==6)
                {
                        points.text = '+90';
                        score2.text = sc + 90;
                }
                else if(letterArray2.length==7)
                {
                        points.text = '+100';
                        score2.text = sc + 100;
                }
                else if(letterArray2.length==8)
                {
                        points.text = '+120';
                        score2.text = sc + 120;
                }
                else if(letterArray2.length==9)
                {
                        points.text = '+140';
                        score2.text = sc + 140;
                }
                else if(letterArray2.length==10)
                {
                        points.text = '+150';
                        score2.text = sc + 150;
                }
                else if(letterArray2.length==11)
                {
                        points.text = '+160';
                        score2.text = sc + 160;
                }
                else if(letterArray2.length==12)
                {
                        points.text = '+180';
                        score2.text = sc + 180;
                }
                
                this.pts = game.add.tween(points);
                this.pts.to({alpha:1}, 1000);
                this.pts.to({alpha:0}, 200);
                this.pts.start();
			}
	},

	
	myfunction2 : function ()
	{
				for(var i=0; i<letterArray2.length; i++)
				{
//					var ind = letterIndex2.indexOf(letterIndex2[i]);
                    var ind = letterIndex2[i];
					var len = groupArray2[ind].total;
					
//					console.log(len);
					
//					console.log(groupArray[ind].total);
					if(len>=1)
					{
						groupArray2[ind].remove(groupArray2[ind].total-1);
						groupArray2[ind].getAt(groupArray2[ind].total-1).kill();
						clickLetter2[ind].kill();
						
//						game.add.tween(groupArray[ind].getAt(groupArray[ind].total-1)).to({x:800, y:30},1000).start();
//						this.click = game.add.tween(clickLetter[ind]).to({x:800, y:30},1000);
//						this.click.start();
//						this.click.onComplete.add(this.myfunction, this);
					}
					
					if(groupArray2[ind].total>=1)
					{
						groupArray2[ind].children[groupArray2[ind].total-1].inputEnabled = true;
						groupArray2[ind].children[groupArray2[ind].total-1].events.onInputUp.add(functionArray2[ind]);
						groupArray2[ind].children[groupArray2[ind].total-1].flag = 0;
					}
				}
				
				text2.text = '';
				this.mainFunction();
	},
	
/*
	mainFunction : function ()
	{
		console.log('first time');
		if(chars2.length<1)
		{
			chars2 = this.random_char(vowelArray2, consonantArray2);
		}
		else
		{
			for(var j = 0; j<chars2.length; j++)
			{
				if(chars2[j]=='a' || chars2[j]=='e' || chars2[j]=='i' || chars2[j]=='o' || chars2[j]=='u')
				{
					vowelArray2.push(chars2[j]);
				}
				else
				{
					consonantArray2.push(chars2[j]);
				}
			}

			var tempchar = this.random_char(vowelArray2, consonantArray2);
			for(var i = 0; i<tempchar.length; i++)
			{
				var ch = chars2.join("");
				var ind = chars2.indexOf(letterArray2[i]);
				var id = clickLetter2[ind].id;
				chars2[ind] = tempchar[i];
				var v = chars2[ind];
				v = game.add.sprite(position1[ind].x, position1[ind].y, chars2[ind]);
				v.scale.setTo(.20);
				v.anchor.setTo(0.5, 0.5);
				v.inputEnabled = true;
				v.events.onInputUp.add(this.storeLetter);
				v.id = id;
				v.flag = 0;
				clickLetter2[ind] = v;
			}
		}
		
		letterArray2 = [];
		mainarray = [];
		
		var newArray = new Array();
		while(mainarray.length==0)
		{
			Array.prototype.push.apply(mainarray, two(chars2.join("")));
			Array.prototype.push.apply(mainarray, three(chars2.join("")));
			Array.prototype.push.apply(mainarray, four(chars2.join("")));
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
//            hintButton.inputEnabled = true;
        console.log(letterIndex2);
				sorryText2.text = '';	
/*		for(var i=0; i<letterArray2.length; i++)
		{
			var charvalue;
			for(var j=0; j<chars2.length; j++)
			{
				if(letterIndex2[i]==j)
				{
					charvalue = j;
					break;
				}
//				else
//					console.log(j);
			}
			var len = groupArray2[charvalue].total;
			groupArray2[charvalue].children[len-1].position.x = groupArray2[charvalue].children[len-1].position.x+5;
			groupArray2[charvalue].children[len-1].position.y = groupArray2[charvalue].children[len-1].position.y+5;
			groupArray2[charvalue].children[len-1].scale.setTo(1);
			groupArray2[charvalue].children[len-1].inputEnabled = true;
			groupArray2[charvalue].children[len-1].events.onInputUp.add(functionArray2[charvalue]);
			groupArray2[charvalue].children[len-1].flag = 0;
			
			clickLetter2[charvalue].position.x = clickLetter2[charvalue].position.x+5;
			clickLetter2[charvalue].position.y = clickLetter2[charvalue].position.y+5;
			clickLetter2[charvalue].scale.setTo(.20);
			clickLetter2[charvalue].inputEnabled = true;
			clickLetter2[charvalue].events.onInputUp.add(letterFunction2);
//		console.log(groupArray2[j].children[len-1].position.x);
//		console.log(groupArray2[j].children[len-1].position.y);
			
		}
		console.log(letterArray2);
		console.log(letterIndex2);
		letterArray2 = [];
        letterIndex2 = [];
		text2.text = letterArray2.join("");
*/
        if(letterIndex2.length>0)
        {
            var pos = letterIndex2[letterIndex2.length-1];

    /*        for(var i = 0; i<chars2.length; i++)
                {
                    if(letterArray2[letterArray2.length-1]==chars2[i])
                        {
                            pos = i;
                            break;
                        }
                }
    */
    //                        console.log('x= '+groupArray2[pos].getAt(groupArray2[pos].total-1).position.x);
    //                        console.log('y= '+groupArray2[pos].getAt(groupArray2[pos].total-1).position.y);

            groupArray2[pos].getAt(groupArray2[pos].total-1).position.x = groupArray2[pos].getAt(groupArray2[pos].total-1).position.x+5;
            groupArray2[pos].getAt(groupArray2[pos].total-1).position.y = groupArray2[pos].getAt(groupArray2[pos].total-1).position.y+5;

            clickLetter2[pos].position.x = clickLetter2[pos].position.x+5;
            clickLetter2[pos].position.y = clickLetter2[pos].position.y+5;

    //        letterArray2.splice(letterArray2.indexOf(clickLetter2[pos].key), 1);
            letterArray2.pop();
            letterIndex2.pop();
         // letterIndex2.push(pos);
            groupArray2[pos].getAt(groupArray2[pos].total-1).flag = 0;

            text2.text = letterArray2.join("");


            if(letterArray2.length<2)
            {
                    text2.fill = "#061e23";
            }
            else
            {
                var ch = checkWord(letterArray2);
                if(ch==1)
                {
                    text2.fill = '#368e3c';
                }
                else
                {
                    text2.fill = "#061e23";
                }
            }

        }
	},
	
	
	storeLetter : function (item)
	{
	//	sorryText.text = '';
		var len = groupArray2[item.id].total;

//        console.log('itemkey= '+item.key +' itemid= '+item.id);
        
		if(groupArray2[item.id].children[len-1].flag==0)
		{
            if(letterArray2.length<12)
            {
                item.position.x = item.position.x-5;
                item.position.y = item.position.y-5;
    //			item.scale.setTo(.25);
    //			item.inputEnabled = false;


                groupArray2[item.id].children[len-1].position.x = groupArray2[item.id].children[len-1].position.x-5;
                groupArray2[item.id].children[len-1].position.y = groupArray2[item.id].children[len-1].position.y-5;
    //			groupArray2[item.id].children[len-1].scale.setTo(1.2);

    //			groupArray2[item.id].children[len-1].inputEnabled = false;
    //			console.log(groupArray2[item.id].children[len-1].flag);

                letterArray2.push(item.key);
                letterIndex2.push(item.id);
                groupArray2[item.id].children[len-1].flag = 1;
    //            console.log(item.id);			
            }
		}

/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(.25);
//			item.inputEnabled = false;
		
//			var len = groupArray2[item.id].children.length;
			groupArray2[item.id].children[len-1].position.x = groupArray2[item.id].children[len-1].position.x+5;
			groupArray2[item.id].children[len-1].position.y = groupArray2[item.id].children[len-1].position.y+5;
//			groupArray2[item.id].children[len-1].scale.setTo(1.2);
		
//			groupArray2[item.id].children[len-1].inputEnabled = false;
			console.log(groupArray2[item.id].children[len-1].flag);

			letterArray2.splice(letterArray2.indexOf(item.key),1);
            letterIndex2.splice(letterIndex2.indexOf(item.id),1);
			groupArray2[item.id].children[len-1].flag = 0;
		}
/*/		text2.text = letterArray2.join("");
        
        if(letterArray2.length<2)
        {
                text2.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray2);
            if(ch==1)
                {
                    text2.fill = '#368e3c';
                }
            else
                {
                    text2.fill = "#061e23";
                }
        }
        
	},
	
	group1function : function (item)
	{
	//	sorryText.text = '';
		if(item.flag==0)
		{
            if(letterArray2.length<12)
            {
                item.position.x = item.position.x-5;
                item.position.y = item.position.y-5;
    //			item.scale.setTo(1.2);

    //			console.log(item.position.x);
    //			console.log(item.position.y);

                clickLetter2[0].position.x = clickLetter2[0].position.x-5;
                clickLetter2[0].position.y = clickLetter2[0].position.y-5
    //			clickLetter2[0].scale.setTo(.25);

    //		item.inputEnabled = false;
            //	console.log(item.flag);
                letterArray2.push(clickLetter2[0].key);	
                letterIndex2.push(0);
                item.flag = 1;
            }
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(1.2);

//			console.log(item.position.x);
//			console.log(item.position.y);
		
			clickLetter2[0].position.x = clickLetter2[0].position.x+5;
			clickLetter2[0].position.y = clickLetter2[0].position.y+5
//			clickLetter2[0].scale.setTo(.25);

//		item.inputEnabled = false;
			console.log(item.flag);
//			letterArray2.push(clickLetter2[0].key);
			letterArray2.splice(letterArray2.indexOf(clickLetter2[0].key),1);
			letterIndex2.splice(letterIndex2.indexOf(0),1);
            
			item.flag = 0;
		}
/*/		text2.text = letterArray2.join("");
        
        if(letterArray2.length<2)
        {
                text2.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray2);
            if(ch==1)
                {
                    text2.fill = '#368e3c';
                }
            else
                {
                    text2.fill = "#061e23";
                }
        } 
        
	},
	
	group2function : function (item)
	{
	//	sorryText.text = '';
		if(item.flag==0)
		{
            if(letterArray2.length<12)
            {
                item.position.x = item.position.x-5;
                item.position.y = item.position.y-5;
    //			item.scale.setTo(1.2);

                clickLetter2[1].position.x = clickLetter2[1].position.x-5;
                clickLetter2[1].position.y = clickLetter2[1].position.y-5
    //			clickLetter2[1].scale.setTo(.25);

    //			item.inputEnabled = false;
                letterArray2.push(clickLetter2[1].key);
                letterIndex2.push(1);

                item.flag = 1;
            }
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(1.2);
		
			clickLetter2[1].position.x = clickLetter2[1].position.x+5;
			clickLetter2[1].position.y = clickLetter2[1].position.y+5
//			clickLetter2[1].scale.setTo(.25);
		
//			item.inputEnabled = false;
			letterIndex2.splice(letterIndex2.indexOf(1),1);
            letterArray2.splice(letterArray2.indexOf(clickLetter2[1].key),1);
			item.flag = 0;
		}
/*/		text2.text = letterArray2.join("");
        
        if(letterArray2.length<2)
        {
                text2.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray2);
            if(ch==1)
                {
                    text2.fill = '#368e3c';
                }
            else
                {
                    text2.fill = "#061e23";
                }
        }
        
	},
	
	group3function : function (item)
	{
//		sorryText.text = '';
		if(item.flag==0)
		{
            if(letterArray2.length<12)
            {
                item.position.x = item.position.x-5;
                item.position.y = item.position.y-5;
    //			item.scale.setTo(1.2);

    //			item.inputEnabled = false;

                clickLetter2[2].position.x = clickLetter2[2].position.x-5;
                clickLetter2[2].position.y = clickLetter2[2].position.y-5
    //			clickLetter2[2].scale.setTo(.25);
                letterArray2.push(clickLetter2[2].key);
                letterIndex2.push(2);
                item.flag = 1;
            }
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(1.2);
		
//			item.inputEnabled = false;
		
			clickLetter2[2].position.x = clickLetter2[2].position.x+5;
			clickLetter2[2].position.y = clickLetter2[2].position.y+5
//			clickLetter2[2].scale.setTo(.25);
			letterArray2.splice(letterArray2.indexOf(clickLetter2[2].key),1);
			letterIndex2.splice(letterIndex2.indexOf(2),1);
            item.flag = 0;
		}
/*/		text2.text = letterArray2.join("");
        
        if(letterArray2.length<2)
        {
                text2.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray2);
            if(ch==1)
                {
                    text2.fill = '#368e3c';
                }
            else
                {
                    text2.fill = "#061e23";
                }
        }
        
	},
	
	group4function : function (item)
	{
	//	sorryText.text = '';
		if(item.flag==0)
		{
            if(letterArray2.length<12)
            {
                item.position.x = item.position.x-5;
                item.position.y = item.position.y-5;
    //			item.scale.setTo(1.2);

    //			item.inputEnabled = false;

                clickLetter2[3].position.x = clickLetter2[3].position.x-5;
                clickLetter2[3].position.y = clickLetter2[3].position.y-5
    //			clickLetter2[3].scale.setTo(.25);
                letterArray2.push(clickLetter2[3].key);
                letterIndex2.push(3);
                item.flag = 1;
            }
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(1.2);
		
//			item.inputEnabled = false;
		
			clickLetter2[3].position.x = clickLetter2[3].position.x+5;
			clickLetter2[3].position.y = clickLetter2[3].position.y+5
//			clickLetter2[3].scale.setTo(.25);
			letterArray2.splice(letterArray2.indexOf(clickLetter2[3].key),1);
			letterIndex2.splice(letterIndex2.indexOf(3),1);
            item.flag = 0;
		}
/*/		text2.text = letterArray2.join("");
        
        if(letterArray2.length<2)
        {
                text2.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray2);
            if(ch==1)
                {
                    text2.fill = '#368e3c';
                }
            else
                {
                    text2.fill = "#061e23";
                }
        }
        
	},	
	
	group5function : function (item)
	{
		//sorryText.text = '';
		if(item.flag==0)
		{
            if(letterArray2.length<12)
            {
                item.position.x = item.position.x-5;
                item.position.y = item.position.y-5;
    //			item.scale.setTo(1.2);

    //			item.inputEnabled = false;

                clickLetter2[4].position.x = clickLetter2[4].position.x-5;
                clickLetter2[4].position.y = clickLetter2[4].position.y-5
    //			clickLetter2[4].scale.setTo(.25);
                letterArray2.push(clickLetter2[4].key);
                letterIndex2.push(4);
                item.flag = 1;
            }
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(1.2);
		
//			item.inputEnabled = false;
		
			clickLetter2[4].position.x = clickLetter2[4].position.x+5;
			clickLetter2[4].position.y = clickLetter2[4].position.y+5
//			clickLetter2[4].scale.setTo(.25);
			letterArray2.splice(letterArray2.indexOf(clickLetter2[4].key),1);
			letterIndex2.splice(letterIndex2.indexOf(4),1);
            item.flag = 0;
		}
/*/		text2.text = letterArray2.join("");
        
        if(letterArray2.length<2)
        {
                text2.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray2);
            if(ch==1)
                {
                    text2.fill = '#368e3c';
                }
            else
                {
                    text2.fill = "#061e23";
                }
        }
        
	},
	
	group6function : function (item)
	{
//		sorryText.text = '';
		if(item.flag==0)
		{
            if(letterArray2.length<12)
            {
                item.position.x = item.position.x-5;
                item.position.y = item.position.y-5;
    //			item.scale.setTo(1.2);

    //			item.inputEnabled = false;

                clickLetter2[5].position.x = clickLetter2[5].position.x-5;
                clickLetter2[5].position.y = clickLetter2[5].position.y-5
    //			clickLetter2[5].scale.setTo(.25);
                letterIndex2.push(5);
                letterArray2.push(clickLetter2[5].key);
                item.flag = 1;
            }
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(1.2);
		
//			item.inputEnabled = false;
		
			clickLetter2[5].position.x = clickLetter2[5].position.x+5;
			clickLetter2[5].position.y = clickLetter2[5].position.y+5
//			clickLetter2[5].scale.setTo(.25);
			letterArray2.splice(letterArray2.indexOf(clickLetter2[5].key),1);
			letterIndex2.splice(letterIndex2.indexOf(5),1);
            item.flag = 0;
		}
/*/		text2.text = letterArray2.join("");
        
        if(letterArray2.length<2)
        {
                text2.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray2);
            if(ch==1)
                {
                    text2.fill = '#368e3c';
                }
            else
                {
                    text2.fill = "#061e23";
                }
        }
        
	},
	
	group7function : function (item)
	{
	//	sorryText.text = '';
		if(item.flag==0)
		{
            if(letterArray2.length<12)
            {
                item.position.x = item.position.x-5;
                item.position.y = item.position.y-5;
    //			item.scale.setTo(1.2);

    //			item.inputEnabled = false;

                clickLetter2[6].position.x = clickLetter2[6].position.x-5;
                clickLetter2[6].position.y = clickLetter2[6].position.y-5
    //			clickLetter2[6].scale.setTo(.25);
                letterArray2.push(clickLetter2[6].key);
                letterIndex2.push(6);
                item.flag=1;
            }
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(1.2);
		
//			item.inputEnabled = false;
		
			clickLetter2[6].position.x = clickLetter2[6].position.x+5;
			clickLetter2[6].position.y = clickLetter2[6].position.y+5
//			clickLetter2[6].scale.setTo(.25);
			letterIndex2.splice(letterIndex2.indexOf(6),1);
			letterArray2.splice(letterArray2.indexOf(clickLetter2[6].key),1);
			item.flag=0;
		}
/*/		text2.text = letterArray2.join("");
        
        if(letterArray2.length<2)
        {
                text2.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray2);
            if(ch==1)
                {
                    text2.fill = '#368e3c';
                }
            else
                {
                    text2.fill = "#061e23";
                }
        }
        
	},
	
	group8function : function (item)
	{
//		sorryText.text = '';
		if(item.flag==0)
		{
            if(letterArray2.length<12)
            {
                item.position.x = item.position.x-5;
                item.position.y = item.position.y-5;
    //			item.scale.setTo(1.2);

    //			item.inputEnabled = false;

                clickLetter2[7].position.x = clickLetter2[7].position.x-5;
                clickLetter2[7].position.y = clickLetter2[7].position.y-5
    //			clickLetter2[7].scale.setTo(.25);
                item.flag = 1;
                letterIndex2.push(7);
                letterArray2.push(clickLetter2[7].key);
            }
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(1.2);
		
//			item.inputEnabled = false;
		
			clickLetter2[7].position.x = clickLetter2[7].position.x+5;
			clickLetter2[7].position.y = clickLetter2[7].position.y+5
//			clickLetter2[7].scale.setTo(.25);
			item.flag = 0;
			letterIndex2.splice(letterIndex2.indexOf(7),1);
			letterArray2.splice(letterArray2.indexOf(clickLetter2[7].key),1);
		}
/*/		text2.text = letterArray2.join("");
        
        if(letterArray2.length<2)
        {
                text2.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray2);
            if(ch==1)
                {
                    text2.fill = '#368e3c';
                }
            else
                {
                    text2.fill = "#061e23";
                }
        }
        
	},
	
	group9function : function (item)
	{
//		sorryText.text = '';
		if(item.flag==0)
		{
            if(letterArray2.length<12)
            {
                item.position.x = item.position.x-5;
                item.position.y = item.position.y-5;
    //			item.scale.setTo(1.2);

    //			item.inputEnabled = false;

                clickLetter2[8].position.x = clickLetter2[8].position.x-5;
                clickLetter2[8].position.y = clickLetter2[8].position.y-5
    //			clickLetter2[8].scale.setTo(.25);
                letterArray2.push(clickLetter2[8].key);
                letterIndex2.push(8);
                item.flag = 1;
            }
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(1.2);

//			item.inputEnabled = false;
		
			clickLetter2[8].position.x = clickLetter2[8].position.x+5;
			clickLetter2[8].position.y = clickLetter2[8].position.y+5
//			clickLetter2[8].scale.setTo(.25);
			letterArray2.splice(letterArray2.indexOf(clickLetter2[8].key),1);
			letterIndex2.splice(letterIndex2.indexOf(8),1);
            item.flag = 0;
		}
/*/		text2.text = letterArray2.join("");
        
        if(letterArray2.length<2)
        {
                text2.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray2);
            if(ch==1)
                {
                    text2.fill = '#368e3c';
                }
            else
                {
                    text2.fill = "#061e23";
                }
        }
        
	},
	
	group10function : function (item)
	{
//		sorryText.text = '';
		if(item.flag==0)
		{
            if(letterArray2.length<12)
            {
                item.position.x = item.position.x-5;
                item.position.y = item.position.y-5;
    //			item.scale.setTo(1.2);

    //			item.inputEnabled = false;

                clickLetter2[9].position.x = clickLetter2[9].position.x-5;
                clickLetter2[9].position.y = clickLetter2[9].position.y-5
    //			clickLetter2[9].scale.setTo(.25);
                letterArray2.push(clickLetter2[9].key);
                letterIndex2.push(9);
                item.flag = 1;
            }
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(1.2);

//			item.inputEnabled = false;
		
			clickLetter2[9].position.x = clickLetter2[9].position.x+5;
			clickLetter2[9].position.y = clickLetter2[9].position.y+5
//			clickLetter2[9].scale.setTo(.25);
			letterArray2.splice(letterArray2.indexOf(clickLetter2[9].key),1);
			letterIndex2.splice(letterIndex2.indexOf(9),1);
            item.flag = 0;
		}
/*/		text2.text = letterArray2.join("");
        
        if(letterArray2.length<2)
        {
                text2.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray2);
            if(ch==1)
                {
                    text2.fill = '#368e3c';
                }
            else
                {
                    text2.fill = "#061e23";
                }
        }
        
	},	


	group11function : function (item)
	{
//		sorryText.text = '';
		if(item.flag==0)
		{
            if(letterArray2.length<12)
            {
                item.position.x = item.position.x-5;
                item.position.y = item.position.y-5;
    //			item.scale.setTo(1.2);

    //			item.inputEnabled = false;

                clickLetter2[10].position.x = clickLetter2[10].position.x-5;
                clickLetter2[10].position.y = clickLetter2[10].position.y-5
    //			clickLetter2[10].scale.setTo(.25);
                letterArray2.push(clickLetter2[10].key);
                letterIndex2.push(10);
                item.flag = 1;
            }
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(1.2);

//			item.inputEnabled = false;
		
			clickLetter2[10].position.x = clickLetter2[10].position.x+5;
			clickLetter2[10].position.y = clickLetter2[10].position.y+5
//			clickLetter2[10].scale.setTo(.25);
			letterArray2.splice(letterArray2.indexOf(clickLetter2[10].key),1);
			letterIndex2.splice(letterIndex2.indexOf(10),1);
			item.flag = 0;
		}
/*/		text2.text = letterArray2.join("");
        
        if(letterArray2.length<2)
        {
                text2.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray2);
            if(ch==1)
                {
                    text2.fill = '#368e3c';
                }
            else
                {
                    text2.fill = "#061e23";
                }
        }
        
	},
	
	group12function : function (item)
	{
//		sorryText.text = '';
		if(item.flag==0)
		{
            if(letterArray2.length<12)
            {
                item.position.x = item.position.x-5;
                item.position.y = item.position.y-5;
    //			item.scale.setTo(1.2);

    //			item.inputEnabled = false;

                clickLetter2[11].position.x = clickLetter2[11].position.x-5;
                clickLetter2[11].position.y = clickLetter2[11].position.y-5
    //			clickLetter2[11].scale.setTo(.25);
                letterArray2.push(clickLetter2[11].key);
                letterIndex2.push(11);
                item.flag = 1;
            }
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(1.2);

//			item.inputEnabled = false;
		
			clickLetter2[11].position.x = clickLetter2[11].position.x+5;
			clickLetter2[11].position.y = clickLetter2[11].position.y+5
//			clickLetter2[11].scale.setTo(.25);
			letterArray2.splice(letterArray2.indexOf(clickLetter2[11].key),1);
			letterIndex2.splice(letterIndex2.indexOf(11),1);
            item.flag = 0;
		}
/*/		text2.text = letterArray2.join("");
        
        if(letterArray2.length<2)
        {
                text2.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray2);
            if(ch==1)
                {
                    text2.fill = '#368e3c';
                }
            else
                {
                    text2.fill = "#061e23";
                }
        }
        
	},
	
	group13function : function (item)
	{
//		sorryText.text = '';
		if(item.flag==0)
		{
            if(letterArray2.length<12)
            {
                item.position.x = item.position.x-5;
                item.position.y = item.position.y-5;
    //			item.scale.setTo(1.2);

    //			item.inputEnabled = false;

                clickLetter2[12].position.x = clickLetter2[12].position.x-5;
                clickLetter2[12].position.y = clickLetter2[12].position.y-5
    //			clickLetter2[12].scale.setTo(.25);
                letterArray2.push(clickLetter2[12].key);
                letterIndex2.push(12);
                item.flag = 1;
            }
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(1.2);

//			item.inputEnabled = false;
		
			clickLetter2[12].position.x = clickLetter2[12].position.x+5;
			clickLetter2[12].position.y = clickLetter2[12].position.y+5
//			clickLetter2[12].scale.setTo(.25);
			letterArray2.splice(letterArray2.indexOf(clickLetter2[12].key),1);
			letterIndex2.splice(letterIndex2.indexOf(12),1);
            item.flag = 0;
		}
/*/		text2.text = letterArray2.join("");
        
        if(letterArray2.length<2)
        {
                text2.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray2);
            if(ch==1)
                {
                    text2.fill = '#368e3c';
                }
            else
                {
                    text2.fill = "#061e23";
                }
        }
        
	},
	
	group14function : function (item)
	{
//		sorryText.text = '';
		if(item.flag==0)
		{
            if(letterArray2.length<12)
            {
                item.position.x = item.position.x-5;
                item.position.y = item.position.y-5;
    //			item.scale.setTo(1.2);

    //			item.inputEnabled = false;

                clickLetter2[13].position.x = clickLetter2[13].position.x-5;
                clickLetter2[13].position.y = clickLetter2[13].position.y-5
    //			clickLetter2[13].scale.setTo(.25);
                letterArray2.push(clickLetter2[13].key);
                letterIndex2.push(13);
                item.flag = 1;
            }
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(1.2);

//			item.inputEnabled = false;
		
			clickLetter2[13].position.x = clickLetter2[13].position.x+5;
			clickLetter2[13].position.y = clickLetter2[13].position.y+5
//			clickLetter2[13].scale.setTo(.25);
			letterArray2.splice(letterArray2.indexOf(clickLetter2[13].key),1);
			letterIndex2.splice(letterIndex2.indexOf(13),1);
            item.flag = 0;
		}
/*/		text2.text = letterArray2.join("");
        
        if(letterArray2.length<2)
        {
                text2.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray2);
            if(ch==1)
                {
                    text2.fill = '#368e3c';
                }
            else
                {
                    text2.fill = "#061e23";
                }
        }
        
	},	

	
	group15function : function (item)
	{
//		sorryText.text = '';
		if(item.flag==0)
		{
            if(letterArray2.length<12)
            {
                item.position.x = item.position.x-5;
                item.position.y = item.position.y-5;
    //			item.scale.setTo(1.2);

    //			item.inputEnabled = false;

                clickLetter2[14].position.x = clickLetter2[14].position.x-5;
                clickLetter2[14].position.y = clickLetter2[14].position.y-5
    //			clickLetter2[14].scale.setTo(.25);
                letterIndex2.push(14);
                letterArray2.push(clickLetter2[14].key);
                item.flag = 1;
            }
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(1.2);

//			item.inputEnabled = false;
		
			clickLetter2[14].position.x = clickLetter2[14].position.x+5;
			clickLetter2[14].position.y = clickLetter2[14].position.y+5
//			clickLetter2[14].scale.setTo(.25);
			letterArray2.splice(letterArray2.indexOf(clickLetter2[14].key),1);
			letterIndex2.splice(letterIndex2.indexOf(14),1);
            item.flag = 0;
		}
/*/		text2.text = letterArray2.join("");
        
        if(letterArray2.length<2)
        {
                text2.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray2);
            if(ch==1)
                {
                    text2.fill = '#368e3c';
                }
            else
                {
                    text2.fill = "#061e23";
                }
        }
        
	},


	group16function : function (item)
	{
//		sorryText.text = '';
		if(item.flag==0)
		{
            if(letterArray2.length<12)
            {
                item.position.x = item.position.x-5;
                item.position.y = item.position.y-5;
    //			item.scale.setTo(1.2);

    //			item.inputEnabled = false;

                clickLetter2[15].position.x = clickLetter2[15].position.x-5;
                clickLetter2[15].position.y = clickLetter2[15].position.y-5
    //			clickLetter2[15].scale.setTo(.25);
                letterIndex2.push(15);
                letterArray2.push(clickLetter2[15].key);
                item.flag = 1;
            }
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(1.2);

//			item.inputEnabled = false;
		
			clickLetter2[15].position.x = clickLetter2[15].position.x+5;
			clickLetter2[15].position.y = clickLetter2[15].position.y+5
//			clickLetter2[15].scale.setTo(.25);
			letterArray2.splice(letterArray2.indexOf(clickLetter2[15].key),1);
			letterIndex2.splice(letterIndex2.indexOf(15),1);
            item.flag = 0;
		}
*/		text2.text = letterArray2.join("");
        
        if(letterArray2.length<2)
        {
                text2.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray2);
            if(ch==1)
                {
                    text2.fill = '#368e3c';
                }
            else
                {
                    text2.fill = "#061e23";
                }
        }
        
	},

	group17function : function (item)
	{
//		sorryText.text = '';
		if(item.flag==0)
		{
            if(letterArray2.length<12)
            {
                item.position.x = item.position.x-5;
                item.position.y = item.position.y-5;
    //			item.scale.setTo(1.2);

    //			item.inputEnabled = false;

                clickLetter2[16].position.x = clickLetter2[16].position.x-5;
                clickLetter2[16].position.y = clickLetter2[16].position.y-5
    //			clickLetter2[16].scale.setTo(.25);
                letterArray2.push(clickLetter2[16].key);
                letterIndex2.push(16);
                item.flag = 1;
            }
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(1.2);

//			item.inputEnabled = false;
		
			clickLetter2[16].position.x = clickLetter2[16].position.x+5;
			clickLetter2[16].position.y = clickLetter2[16].position.y+5
//			clickLetter2[16].scale.setTo(.25);
			letterArray2.splice(letterArray2.indexOf(clickLetter2[16].key),1);
			letterIndex2.splice(letterIndex2.indexOf(16),1);
            item.flag = 0;
		}
*/		text2.text = letterArray2.join("");
        
        if(letterArray2.length<2)
        {
                text2.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray2);
            if(ch==1)
                {
                    text2.fill = '#368e3c';
                }
            else
                {
                    text2.fill = "#061e23";
                }
        }
        
	},
    
	group18function : function (item)
	{
//		sorryText.text = '';
		if(item.flag==0)
		{
            if(letterArray2.length<12)
            {
                item.position.x = item.position.x-5;
                item.position.y = item.position.y-5;
    //			item.scale.setTo(1.2);

    //			item.inputEnabled = false;

                clickLetter2[17].position.x = clickLetter2[17].position.x-5;
                clickLetter2[17].position.y = clickLetter2[17].position.y-5
    //			clickLetter2[17].scale.setTo(.25);
                letterIndex2.push(17);
                letterArray2.push(clickLetter2[17].key);
                item.flag = 1;
            }
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(1.2);

//			item.inputEnabled = false;
		
			clickLetter2[17].position.x = clickLetter2[17].position.x+5;
			clickLetter2[17].position.y = clickLetter2[17].position.y+5
//			clickLetter2[17].scale.setTo(.25);
			letterArray2.splice(letterArray2.indexOf(clickLetter2[17].key),1);
			letterIndex2.splice(letterIndex2.indexOf(17),1);
            item.flag = 0;
		}
*/		text2.text = letterArray2.join("");
        
        if(letterArray2.length<2)
        {
                text2.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray2);
            if(ch==1)
                {
                    text2.fill = '#368e3c';
                }
            else
                {
                    text2.fill = "#061e23";
                }
        }
        
	},
    

	group19function : function (item)
	{
//		sorryText.text = '';
		if(item.flag==0)
		{
            if(letterArray2.length<12)
            {
                item.position.x = item.position.x-5;
                item.position.y = item.position.y-5;
    //			item.scale.setTo(1.2);

    //			item.inputEnabled = false;

                clickLetter2[18].position.x = clickLetter2[18].position.x-5;
                clickLetter2[18].position.y = clickLetter2[18].position.y-5
    //			clickLetter2[18].scale.setTo(.25);
                letterIndex2.push(18);
                letterArray2.push(clickLetter2[18].key);
                item.flag = 1;
            }
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(1.2);

//			item.inputEnabled = false;
		
			clickLetter2[18].position.x = clickLetter2[18].position.x+5;
			clickLetter2[18].position.y = clickLetter2[18].position.y+5
//			clickLetter2[18].scale.setTo(.25);
			letterArray2.splice(letterArray2.indexOf(clickLetter2[18].key),1);
			letterIndex2.splice(letterIndex2.indexOf(18),1);
            item.flag = 0;
		}
*/		text2.text = letterArray2.join("");
        
        if(letterArray2.length<2)
        {
                text2.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray2);
            if(ch==1)
                {
                    text2.fill = '#368e3c';
                }
            else
                {
                    text2.fill = "#061e23";
                }
        }
        
	},
    
    
	group20function : function (item)
	{
//		sorryText.text = '';
		if(item.flag==0)
		{
            if(letterArray2.length<12)
            {
                item.position.x = item.position.x-5;
                item.position.y = item.position.y-5;
    //			item.scale.setTo(1.2);

    //			item.inputEnabled = false;

                clickLetter2[19].position.x = clickLetter2[19].position.x-5;
                clickLetter2[19].position.y = clickLetter2[19].position.y-5
    //			clickLetter2[19].scale.setTo(.25);
                letterArray2.push(clickLetter2[19].key);
                letterIndex2.push(19);
                item.flag = 1;
            }
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(1.2);

//			item.inputEnabled = false;
		
			clickLetter2[19].position.x = clickLetter2[19].position.x+5;
			clickLetter2[19].position.y = clickLetter2[19].position.y+5
//			clickLetter2[19].scale.setTo(.25);
			letterArray2.splice(letterArray2.indexOf(clickLetter2[19].key),1);
			letterIndex2.splice(letterIndex2.indexOf(19),1);
			item.flag = 0;
		}
*/		text2.text = letterArray2.join("");
        
        if(letterArray2.length<2)
        {
                text2.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray2);
            if(ch==1)
                {
                    text2.fill = '#368e3c';
                }
            else
                {
                    text2.fill = "#061e23";
                }
        }
        
	},
    
    
    
	group21function : function (item)
	{
//		sorryText.text = '';
		if(item.flag==0)
		{
            if(letterArray2.length<12)
            {
                item.position.x = item.position.x-5;
                item.position.y = item.position.y-5;
    //			item.scale.setTo(1.2);

    //			item.inputEnabled = false;

                clickLetter2[20].position.x = clickLetter2[20].position.x-5;
                clickLetter2[20].position.y = clickLetter2[20].position.y-5
    //			clickLetter2[20].scale.setTo(.25);
                letterIndex2.push(20);
                letterArray2.push(clickLetter2[20].key);
                item.flag = 1;
            }
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(1.2);

//			item.inputEnabled = false;
		
			clickLetter2[20].position.x = clickLetter2[20].position.x+5;
			clickLetter2[20].position.y = clickLetter2[20].position.y+5
//			clickLetter2[20].scale.setTo(.25);
			letterArray2.splice(letterArray2.indexOf(clickLetter2[20].key),1);
			letterIndex2.splice(letterIndex2.indexOf(20),1);
            item.flag = 0;
		}
*/		text2.text = letterArray2.join("");
        
        if(letterArray2.length<2)
        {
                text2.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray2);
            if(ch==1)
                {
                    text2.fill = '#368e3c';
                }
            else
                {
                    text2.fill = "#061e23";
                }
        }
        
	},
    
    
    
	group22function : function (item)
	{
//		sorryText.text = '';
		if(item.flag==0)
		{
            if(letterArray2.length<12)
            {
                item.position.x = item.position.x-5;
                item.position.y = item.position.y-5;
    //			item.scale.setTo(1.2);

    //			item.inputEnabled = false;

                clickLetter2[21].position.x = clickLetter2[21].position.x-5;
                clickLetter2[21].position.y = clickLetter2[21].position.y-5
    //			clickLetter2[21].scale.setTo(.25);
                letterArray2.push(clickLetter2[21].key);
                letterIndex2.push(21);            
                item.flag = 1;
            }
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(1.2);

//			item.inputEnabled = false;
		
			clickLetter2[21].position.x = clickLetter2[21].position.x+5;
			clickLetter2[21].position.y = clickLetter2[21].position.y+5
//			clickLetter2[21].scale.setTo(.25);
			letterArray2.splice(letterArray2.indexOf(clickLetter2[21].key),1);
			letterIndex2.splice(letterIndex2.indexOf(21),1);
            item.flag = 0;
		}
*/		text2.text = letterArray2.join("");
        
        if(letterArray2.length<2)
        {
                text2.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray2);
            if(ch==1)
                {
                    text2.fill = '#368e3c';
                }
            else
                {
                    text2.fill = "#061e23";
                }
        }
        
	},
    
    
    
	group23function : function (item)
	{
//		sorryText.text = '';
		if(item.flag==0)
		{
            if(letterArray2.length<12)
            {
                item.position.x = item.position.x-5;
                item.position.y = item.position.y-5;
    //			item.scale.setTo(1.2);

    //			item.inputEnabled = false;

                clickLetter2[22].position.x = clickLetter2[22].position.x-5;
                clickLetter2[22].position.y = clickLetter2[22].position.y-5
    //			clickLetter2[22].scale.setTo(.25);
                letterArray2.push(clickLetter2[22].key);
                letterIndex2.push(22);
                item.flag = 1;
            }
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(1.2);

//			item.inputEnabled = false;
		
			clickLetter2[22].position.x = clickLetter2[22].position.x+5;
			clickLetter2[22].position.y = clickLetter2[22].position.y+5
//			clickLetter2[22].scale.setTo(.25);
			letterArray2.splice(letterArray2.indexOf(clickLetter2[22].key),1);
			letterIndex2.splice(letterIndex2.indexOf(22),1);
			item.flag = 0;
		}
*/		text2.text = letterArray2.join("");
        
        if(letterArray2.length<2)
        {
                text2.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray2);
            if(ch==1)
                {
                    text2.fill = '#368e3c';
                }
            else
                {
                    text2.fill = "#061e23";
                }
        }
        
	},
    
    
    
	group24function : function (item)
	{
//		sorryText.text = '';
		if(item.flag==0)
		{
            if(letterArray2.length<12)
            {
                item.position.x = item.position.x-5;
                item.position.y = item.position.y-5;
    //			item.scale.setTo(1.2);

    //			item.inputEnabled = false;

                clickLetter2[23].position.x = clickLetter2[23].position.x-5;
                clickLetter2[23].position.y = clickLetter2[23].position.y-5
    //			clickLetter2[23].scale.setTo(.25);
                letterArray2.push(clickLetter2[23].key);
                letterIndex2.push(23);
                item.flag = 1;
            }
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(1.2);

//			item.inputEnabled = false;
		
			clickLetter2[23].position.x = clickLetter2[23].position.x+5;
			clickLetter2[23].position.y = clickLetter2[23].position.y+5
//			clickLetter2[23].scale.setTo(.25);
			letterArray2.splice(letterArray2.indexOf(clickLetter2[23].key),1);
			letterIndex2.splice(letterIndex2.indexOf(23),1);
            item.flag = 0;
		}
*/		text2.text = letterArray2.join("");
        
        if(letterArray2.length<2)
        {
                text2.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray2);
            if(ch==1)
                {
                    text2.fill = '#368e3c';
                }
            else
                {
                    text2.fill = "#061e23";
                }
        }
        
	},
    
    
    
	group25function : function (item)
	{
//		sorryText.text = '';
		if(item.flag==0)
		{
            if(letterArray2.length<12)
            {
                item.position.x = item.position.x-5;
                item.position.y = item.position.y-5;
    //			item.scale.setTo(1.2);

    //			item.inputEnabled = false;

                clickLetter2[24].position.x = clickLetter2[24].position.x-5;
                clickLetter2[24].position.y = clickLetter2[24].position.y-5
    //			clickLetter2[24].scale.setTo(.25);
                letterArray2.push(clickLetter2[24].key);
                letterIndex2.push(24);
                item.flag = 1;
            }
		}
/*		else
		{
			item.position.x = item.position.x+5;
			item.position.y = item.position.y+5;
//			item.scale.setTo(1.2);

//			item.inputEnabled = false;
		
			clickLetter2[24].position.x = clickLetter2[24].position.x+5;
			clickLetter2[24].position.y = clickLetter2[24].position.y+5
//			clickLetter2[24].scale.setTo(.25);
			letterArray2.splice(letterArray2.indexOf(clickLetter2[24].key),1);
			letterIndex2.splice(letterIndex2.indexOf(24),1);
            item.flag = 0;
		}
*/		text2.text = letterArray2.join("");
        
        if(letterArray2.length<2)
        {
                text2.fill = "#061e23";
        }
        else
        {
            var ch = checkWord3(letterArray2);
            if(ch==1)
                {
                    text2.fill = '#368e3c';
                }
            else
                {
                    text2.fill = "#061e23";
                }
        }
        
	},
    
    
	
	random_char : function(v,c)
			{
				var vowellen = 0, consonantlen = 0;
                var finalArray = new Array();
//				console.log(v.length+' '+c.length);
                var selectvowel = new Array();
				if(v.length==0 && c.length==0)
				{
//					console.log('if');

					 //['o','i','a','l','k','p','m','r','t'];
					var selconso = new Array();
					var vowel = ['a', 'e', 'i', 'o','u'];
					var consonant = ['c', 'd', 'f', 'g', 'h', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'y'];
	//				var consonant = ['c', 'd', 'h', 'l', 'm', 'n', 'r', 's', 't', 'w'];

					for(var i=0; i<10; i++)
					{
						var vowel1 = vowel[Math.floor(Math.random() * vowel.length)];
/*						var j = vowel.indexOf(vowel1);
						if(j!=-1)
						{
							vowel.splice(j, 1);
						}
*/						selectvowel.push(vowel1);
					}
				
				
					for(var j=0; j<15; j++)
					{
						var consonant1 = consonant[Math.floor(Math.random() * consonant.length)];
/*						var j = consonant.indexOf(consonant1);
						if(j!=-1)
						{
							consonant.splice(j, 1);
						}
*/						selectvowel.push(consonant1);
					}
				}
				else
				{
					Array.prototype.difference = function(e) {
						return this.filter(function(i) {return e.indexOf(i) < 0;});
					};

//					var selectvowel = new Array();//['a','i','e','c','h','p','y','g','s'];
					var selconso = new Array();
					var vowel = ['a', 'e', 'i', 'o', 'u'];
					var consonant = ['c', 'd', 'f', 'g', 'h', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'y'];
	//				var consonant = ['c', 'd', 'h', 'l', 'm', 'n', 'r', 's', 't', 'w'];

	
//					console.log('my');

//					count total vowel and consonant in letterArray2 array;					
					for(var j=0; j<letterArray2.length; j++)
					{
						var vowelflag = 0, consflag = 0;
						
						if(letterArray2[j]=='a' || letterArray2[j]=='e' || letterArray2[j]=='i' || letterArray2[j]=='o' || letterArray2[j]=='u')
						{
/*							var lettervalue;
							for(var i=0; i<letterArray2.length; i++)
							{
//								console.log(chars2[j]);
//								console.log(letterArray2[i]);
								if(chars2[j]==letterArray2[i])
								{
									lettervalue = letterArray2[i];
									vowelflag++;
									vowellen++;
									break;
								}
							}
							if(vowelflag==0)
								vowel.splice(vowel.indexOf(chars2[j]), 1);							*/
                            vowellen++;
						}
						else
						{
/*							for(var i=0; i<letterArray2.length; i++)
							{
								if(chars2[j]==letterArray2[i])
								{
									lettervalue = letterArray2[i];
									consflag++;
									consonantlen++;
									break;
								}
							}
							if(consflag==0)
								consonant.splice(consonant.indexOf(chars2[j]), 1);  */
                            consonantlen++;
						}
					}
					
//					console.log(vowel);
//					console.log(consonant);

					for(var i=0; i<vowellen; i++)
					{
						var vowel1 = vowel[Math.floor(Math.random() * vowel.length)];
/*						var j = vowel.indexOf(vowel1);
						if(j!=-1)
						{
							vowel.splice(j, 1);
						}
*/						selectvowel.push(vowel1);
//						console.log(vowel1);
					}
				
				
					for(var j=0; j<consonantlen; j++)
					{
						var consonant1 = consonant[Math.floor(Math.random() * consonant.length)];
/*						var j = consonant.indexOf(consonant1);
						if(j!=-1)
						{
							consonant.splice(j, 1);
						}
*/						selectvowel.push(consonant1);
//						console.log(consonant1);
					}
				}
//				console.log('vowellen= '+vowellen+' consonantlen='+consonantlen+' letterArray2len='+letterArray2.length+' letterArray2='+letterArray2);
//				document.write(selectvowel);

                var vv = selectvowel.slice();
                for(var x = 0; x<selectvowel.length; x++)
                    {
						var cons = vv[Math.floor(Math.random() * vv.length)];
                        vv.splice(vv.indexOf(cons), 1);
                        finalArray.push(cons);
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

			
			function two3(string, co)
			{
				var arr = new Array();
                var comb=5;
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
//							check = check2(value,2);
							if(value.indexOf('0')==-1)
							{
								check = checkWord3(value);
							}

							if(check==1)
							{
                                comb = value;
								break;
							}
						}
					}
					
					if(check==1)
					{
						break;
					}
				}
//                console.log(comb);
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
					return comb;
				else if(check==1)
					return 1;
                else
                    return 0;
			}
			
			
			function three3(string, co)
			{
                var comb=5;
				var check;
				var arr = new Array();
				for(var i=0; i<string.length; i++)
				{
					for(var j=0; j<string.length; j++)
					{
//						var val = checkWord32(string.charAt(i)+''+string.charAt(j), 3);
//						if(val)
//						{
							for(var l=0; l<string.length; l++)
							{
								var value = string.charAt(i)+''+string.charAt(j)+''+string.charAt(l);
								
								if(value.indexOf('0')==-1)
								{
									check = checkWord3(value);
								}								
//								arr.push(value);
							//	check = check3(value,3);
								if(check==1)
								{
                                    comb = value;
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
					return comb;
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
			
			
			function four3(string, co)
			{
                var comb=5;
				var arr = new Array();
				var check;
				for(var i=0; i<string.length; i++)
				{
					for(var j=0; j<string.length; j++)
					{
						for(var k=0; k<string.length; k++)
						{
//							var val = checkWord33(string.charAt(i)+''+string.charAt(j)+''+string.charAt(k), 4);
//							console.log(string.charAt(i)+''+string.charAt(j)+''+string.charAt(k));
//							document.writeln(string.charAt(i)+''+string.charAt(j)+''+string.charAt(k));
//							if(val)
//							{
								for(var l=0; l<string.length; l++)
								{
									var value = string.charAt(i)+''+string.charAt(j)+''+string.charAt(k)+''+string.charAt(l);
								//	check = check4(value,4);
									if(value.indexOf('0')==-1)
									{
										check = checkWord3(value);
									}
									if(check==1)
									{
                                        comb = value;
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
					return comb;
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
			
			function five3(string, co)
			{
                var comb=5;
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
									if(value.indexOf('0')==-1)
									{
										check = checkWord3(value);
									}
									if(check==1)
									{
                                        comb = value;
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
					return comb;
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
			
			
			function six3(string, co)
			{
                var comb=5;
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
										if(value.indexOf('0')==-1)
										{
											check = checkWord3(value);
										}
										if(check==1)
										{
                                            comb = value;
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
					return comb;
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
			
			function seven3(string, co)
			{
                var comb=5;
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
											if(value.indexOf('0')==-1)
											{
												check = checkWord3(value);
											}
											if(check==1)
                                                {
                                                    comb = value;
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
					return comb;
				else if(check==1)
					return 1;
                else
                    return 0;
			}


			function eight3(string, co)
			{
                var comb=5;
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
												if(value.indexOf('0')==-1)
												{
													check = checkWord3(value);
												}
												if(check==1)
                                                    {
                                                        comb = value;
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
					return comb;
				else if(check==1)
					return 1;
                else
                    return 0;
			}
			
			
			
			function nine3(string, co)
			{
				var arr = new Array();
				var check;
                var comb=5;
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
													if(value.indexOf('0')==-1)
													{
														check = checkWord3(value);
													}
													if(check==1)
                                                        {
                                                            break;
                                                            comb = value;
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
					return comb;
				else if(check==1)
					return 1;
                else
                    return 0;
			}
			
			
			function ten3(string, co)
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
                                                    for(var r=0; r<string.length; r++)
												    {
													var value = string.charAt(i)+''+string.charAt(j)+''+string.charAt(k)+''+string.charAt(l)+''+string.charAt(m)+''+string.charAt(n)+''+string.charAt(o)+''+string.charAt(p)+''+string.charAt(q)+''+string.charAt(r);
//													check = check9(value, 9);

                                                    check = checkWord3(value);
													if(check==1)
                                                        {
                                                            com = value;
                                                            break;
                                                        }
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


			function eleven3(string, co)
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
                                                    for(var r=0; r<string.length; r++)
												    {
                                                        for(var s=0; s<string.length; s++)
                                                        {
                                                            var value = string.charAt(i)+''+string.charAt(j)+''+string.charAt(k)+''+string.charAt(l)+''+string.charAt(m)+''+string.charAt(n)+''+string.charAt(o)+''+string.charAt(p)+''+string.charAt(q)+''+string.charAt(r)+''+string.charAt(s);
        //													check = check9(value, 9);

                                                            check = checkWord3(value);
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


			function twelve3(string, co)
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
                                                    for(var r=0; r<string.length; r++)
												    {
                                                        for(var s=0; s<string.length; s++)
                                                        {
                                                            for(var t=0; t<string.length; t++)
                                                            {
                                                                var value = string.charAt(i)+''+string.charAt(j)+''+string.charAt(k)+''+string.charAt(l)+''+string.charAt(m)+''+string.charAt(n)+''+string.charAt(o)+''+string.charAt(p)+''+string.charAt(q)+''+string.charAt(r)+''+string.charAt(s)+''+string.charAt(t);
            //													check = check9(value, 9);

                                                                check = checkWord3(value);
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

			
			function check2(a,len)
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
/*			document.write("<br>");
			document.write("<br>");
			document.write("<br>");
			document.write("<br>");
*/			if(start>end)
				return 0;
			else
				return 1;
			
/*			return b.filter(function (e)
			{
				if(e.charAt(0)==a1 && e.charAt(1)==a2 && e.charAt(2)==a3 && b.length==len)
				{
//					t.push(e);
					return true;
				}
			}); */
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
			
			
	function checkWord3(string)
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
			