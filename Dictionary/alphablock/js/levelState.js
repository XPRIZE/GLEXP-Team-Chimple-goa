var count = 0, backleft, backright, Level_1_Grass_theme, Level_2_Water_theme, Level_3_Dessert_theme, Level_4_Snow_theme, Level_5_Ice_theme, wateranim;

var levelState = 
{
	preload : function ()
	{
		game.load.image('Level_map_BG', 'fwd/Level_map_BG.jpg');
		
		game.load.image('Level_1_Grass_theme', 'fwd/Level_1_Grass_theme.png');
		game.load.image('Level_2_Water_theme', 'fwd/Level_2_Water_theme.png');
		game.load.image('Level_3_Dessert_theme', 'fwd/Level_3_Dessert_theme.png');
		game.load.image('Level_4_Snow_theme', 'fwd/Level_4_Snow_theme.png');
		game.load.image('Level_5_Ice_theme', 'fwd/Level_5_Ice_theme.png');
		
		game.load.image('backleft', 'fwd/backleft.png');
		game.load.image('backright', 'fwd/backright.png');	
        
        game.load.spritesheet('water_anim', 'fwd/Water_waves.png', 131, 100, 19);
        
	},

	create : function()
	{
		count = 0;
		this.bg = game.add.sprite(640, 400, 'Level_map_BG');
		this.bg.anchor.setTo(0.5,0.5);
		this.bg.scale.setTo(0.15);
		
		Level_1_Grass_theme = game.add.sprite(575, 250, 'Level_1_Grass_theme');
		Level_1_Grass_theme.inputEnabled = true;
		Level_1_Grass_theme.events.onInputUp.add(this.Level1Function);
//		Level_1_Grass_theme.anchor.setTo(1,1);
		Level_1_Grass_theme.scale.setTo(0.80);
		Level_1_Grass_theme.id = 1;
		
		
		wateranim = game.add.image(555, 390, 'water_anim');
//		wateranim.alpha = 0;
        wateranim.scale.setTo(1.4);
		var walk1 = wateranim.animations.add('walk1');
		wateranim.animations.play('walk1', 19, true);
        
        
		Level_2_Water_theme = game.add.sprite(575, 250, 'Level_2_Water_theme');
		Level_2_Water_theme.alpha = 0;
		Level_2_Water_theme.scale.setTo(0.80);	
		Level_2_Water_theme.inputEnabled = true;
		Level_2_Water_theme.id = 2;
		Level_2_Water_theme.events.onInputUp.add(this.Level2Function);
		
		Level_3_Dessert_theme = game.add.sprite(570, 250, 'Level_3_Dessert_theme');
		Level_3_Dessert_theme.alpha = 0;
		Level_3_Dessert_theme.scale.setTo(0.80);
		Level_3_Dessert_theme.inputEnabled = true;
		Level_3_Dessert_theme.id = 3;
		Level_3_Dessert_theme.events.onInputUp.add(this.Level3Function);
		
		Level_4_Snow_theme = game.add.sprite(250, 250, 'Level_4_Snow_theme');
		Level_4_Snow_theme.alpha = 0;
		Level_4_Snow_theme.scale.setTo(0.80);
		Level_4_Snow_theme.inputEnabled = true;
		Level_4_Snow_theme.id = 4;
		Level_4_Snow_theme.events.onInputUp.add(this.Level4Function);
		
		Level_5_Ice_theme = game.add.sprite(560, 250, 'Level_5_Ice_theme');
		Level_5_Ice_theme.alpha = 0;
		Level_5_Ice_theme.scale.setTo(0.80);
		Level_5_Ice_theme.inputEnabled = true;
		Level_5_Ice_theme.id = 5;
		Level_5_Ice_theme.events.onInputUp.add(this.Level5Function);
		
		
		backleft = game.add.image(420, 350, 'backleft');
		backleft.alpha = 0;
		backleft.inputEnabled = true;
		backleft.events.onInputUp.add(this.pressLeft);
		backleft.scale.setTo(0.70);
		
		backright = game.add.image(800, 350, 'backright');
		backright.inputEnabled = true;
		backright.events.onInputUp.add(this.pressRight);
		backright.scale.setTo(0.70);
//		backright.alpha = 0;
		
//		setTimeout(function() {game.state.start('load');},2000);

		console.log('count= '+count);
	},
	
	update: function ()
	{
		if(count==0)
		{
			backright.alpha = 1;
			backleft.alpha = 0;
			Level_1_Grass_theme.alpha = 1;
			Level_2_Water_theme.alpha = 0;
			Level_3_Dessert_theme.alpha = 0;
			Level_4_Snow_theme.alpha = 0;
			Level_5_Ice_theme.alpha = 0;
			
			Level_1_Grass_theme.inputEnabled = true;
			Level_2_Water_theme.inputEnabled = false;
			Level_3_Dessert_theme.inputEnabled = false;
			Level_4_Snow_theme.inputEnabled = false;
			Level_5_Ice_theme.inputEnabled = false;
            wateranim.alpha = 0;
		}
		
	},
	
	Level1Function : function (item)
	{
			game.state.start('load');
	},
	
	Level2Function : function (item)
	{
			game.state.start('level2');
	},
	
	Level3Function : function (item)
	{
			game.state.start('level3');
	},
	
	Level4Function : function (item)
	{
//			count = 0;
			game.state.start('level4');
	},
	
	Level5Function : function (item)
	{
			count = 0;
			game.state.start('level5');
	},
	
	pressLeft : function ()
	{
		if(count>=1)
		{			
			count--;
		}
		
		if(count==1)
		{
            wateranim.alpha = 1;
            
			backright.alpha = 1;
			backleft.alpha = 1;
			Level_1_Grass_theme.alpha = 0;
			Level_2_Water_theme.alpha = 1;
			Level_3_Dessert_theme.alpha = 0;
			Level_4_Snow_theme.alpha = 0;
			Level_5_Ice_theme.alpha = 0;
			
			Level_1_Grass_theme.inputEnabled = false;
			Level_2_Water_theme.inputEnabled = true;
			Level_3_Dessert_theme.inputEnabled = false;
			Level_4_Snow_theme.inputEnabled = false;
			Level_5_Ice_theme.inputEnabled = false;
		}
		
		if(count==2)
		{
			backright.alpha = 1;
			backleft.alpha = 1;
			Level_1_Grass_theme.alpha = 0;
			Level_2_Water_theme.alpha = 0;
			Level_3_Dessert_theme.alpha = 1;
			Level_4_Snow_theme.alpha = 0;
			Level_5_Ice_theme.alpha = 0;
			
			Level_1_Grass_theme.inputEnabled = false;
			Level_2_Water_theme.inputEnabled = false;
			Level_3_Dessert_theme.inputEnabled = true;
			Level_4_Snow_theme.inputEnabled = false;
			Level_5_Ice_theme.inputEnabled = false;
            wateranim.alpha = 0;
		}
		
		if(count==3)
		{
			backleft.alpha = 1;
			backright.alpha = 1;
			Level_1_Grass_theme.alpha = 0;
			Level_2_Water_theme.alpha = 0;
			Level_3_Dessert_theme.alpha = 0;
			Level_4_Snow_theme.alpha = 1;
			Level_5_Ice_theme.alpha = 0;
			
			Level_1_Grass_theme.inputEnabled = false;
			Level_2_Water_theme.inputEnabled = false;
			Level_3_Dessert_theme.inputEnabled = false;
			Level_4_Snow_theme.inputEnabled = true;
			Level_5_Ice_theme.inputEnabled = false;
            wateranim.alpha = 1;
		}
		
		if(count==4)
		{
			backleft.alpha = 1;
			backright.alpha = 0;
			Level_1_Grass_theme.alpha = 0;
			Level_2_Water_theme.alpha = 0;
			Level_3_Dessert_theme.alpha = 0;
			Level_4_Snow_theme.alpha = 0;
			Level_5_Ice_theme.alpha = 1;
			
			Level_1_Grass_theme.inputEnabled = false;
			Level_2_Water_theme.inputEnabled = false;
			Level_3_Dessert_theme.inputEnabled = false;
			Level_4_Snow_theme.inputEnabled = false;
			Level_5_Ice_theme.inputEnabled = true;
            wateranim.alpha = 0;
		}
	},
	
	pressRight : function ()
	{
		if(count<5)
		{
			count++;
		}
		
		if(count==1)
		{
            wateranim.alpha = 1;
			backright.alpha = 1;
			backleft.alpha = 1;
			Level_1_Grass_theme.alpha = 0;
			Level_2_Water_theme.alpha = 1;
			Level_3_Dessert_theme.alpha = 0;
			Level_4_Snow_theme.alpha = 0;
			Level_5_Ice_theme.alpha = 0;
			
			Level_1_Grass_theme.inputEnabled = false;
			Level_2_Water_theme.inputEnabled = true;
			Level_3_Dessert_theme.inputEnabled = false;
			Level_4_Snow_theme.inputEnabled = false;
			Level_5_Ice_theme.inputEnabled = false;
		}
		
		if(count==2)
		{
            wateranim.alpha = 0;
			backright.alpha = 1;
			backleft.alpha = 1;
			Level_1_Grass_theme.alpha = 0;
			Level_2_Water_theme.alpha = 0;
			Level_3_Dessert_theme.alpha = 1;
			Level_4_Snow_theme.alpha = 0;
			Level_5_Ice_theme.alpha = 0;
			
			Level_1_Grass_theme.inputEnabled = false;
			Level_2_Water_theme.inputEnabled = false;
			Level_3_Dessert_theme.inputEnabled = true;
			Level_4_Snow_theme.inputEnabled = false;
			Level_5_Ice_theme.inputEnabled = false;
		}
		
		if(count==3)
		{
            wateranim.alpha = 1;
			backleft.alpha = 1;
			backright.alpha = 1;
			Level_1_Grass_theme.alpha = 0;
			Level_2_Water_theme.alpha = 0;
			Level_3_Dessert_theme.alpha = 0;
			Level_4_Snow_theme.alpha = 1;
			Level_5_Ice_theme.alpha = 0;
			
			Level_1_Grass_theme.inputEnabled = false;
			Level_2_Water_theme.inputEnabled = false;
			Level_3_Dessert_theme.inputEnabled = false;
			Level_4_Snow_theme.inputEnabled = true;
			Level_5_Ice_theme.inputEnabled = false;
		}
		
		if(count==4)
		{
            wateranim.alpha = 1;
			backleft.alpha = 1;
			backright.alpha = 0;
			Level_1_Grass_theme.alpha = 0;
			Level_2_Water_theme.alpha = 0;
			Level_3_Dessert_theme.alpha = 0;
			Level_4_Snow_theme.alpha = 0;
			Level_5_Ice_theme.alpha = 1;
			
			Level_1_Grass_theme.inputEnabled = false;
			Level_2_Water_theme.inputEnabled = false;
			Level_3_Dessert_theme.inputEnabled = false;
			Level_4_Snow_theme.inputEnabled = false;
			Level_5_Ice_theme.inputEnabled = true;
		}
	},
	

};