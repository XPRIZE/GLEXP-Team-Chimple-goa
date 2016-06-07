var level3round1Layer = cc.Layer.extend({
    size : null,
    self : null,
    
    a_ball : null,
    b_ball : null,
    c_ball : null,
    
    a_ping : null,
    b_ping : null,
    c_ping : null,
    
    a_ball_tween : null,
    b_ball_tween : null,
    c_ball_tween : null,
    c_ball_second_tween : null,

    a_ball_initial_tween : null,
    b_ball_initial_tween : null,
    c_ball_initial_tween : null,
    
    a_char : null,
    b_char : null,
    
    a_char_tween : null,
    b_char_tween : null,

    ball_a : null,
    ball_b : null,
    ball_c : null,
    ping_a : null,
    ping_b : null,
    char_a : null,
    char_b : null,
        
    a_ping_tween : null,
    b_ping_tween : null,    
        
    ballArray : null,
    charArray : null,
    pingArray : null,
    soundArray : null,
        
    position : null,
    randomArray : null,
    level_num : null,
    
    callerObject : null,
    
    ctor : function(level_number, object){
        this._super();
        size = cc.winSize;
        self = this;
        callerObject = object;

        level_num = level_number;

        a_ball_tween = null;
        b_ball_tween = null;
        c_ball_tween = null;
        c_ball_second_tween = null;
     
        a_char = null;
        b_char = null;
     
        a_char_tween = null;
        b_char_tween = null;
        
        cc.spriteFrameCache.addSpriteFrames(res.Game_screen_03_plist);
        
  /*      
        ballArray = [
            {x :res.level3round1_a_ball, y :res.level3round1_b_ball, z :res.level3round1_d_ball},
            {x :res.level3round1_c_ball, y :res.level3round1_d_ball, z :res.level3round1_b_ball},
            {x :res.level3round1_e_ball, y :res.level3round1_f_ball, z :res.level3round1_l_ball},
            {x :res.level3round1_g_ball, y :res.level3round1_h_ball, z :res.level3round1_m_ball},
            {x :res.level3round1_i_ball, y :res.level3round1_j_ball, z :res.level3round1_z_ball},
            {x :res.level3round1_k_ball, y :res.level3round1_l_ball, z :res.level3round1_a_ball},
            {x :res.level3round1_m_ball, y :res.level3round1_n_ball, z :res.level3round1_w_ball},
            {x :res.level3round1_o_ball, y :res.level3round1_p_ball, z :res.level3round1_j_ball},
            {x :res.level3round1_q_ball, y :res.level3round1_r_ball, z :res.level3round1_z_ball},
            {x :res.level3round1_s_ball, y :res.level3round1_t_ball, z :res.level3round1_x_ball},
            {x :res.level3round1_u_ball, y :res.level3round1_v_ball, z :res.level3round1_f_ball},
            {x :res.level3round1_w_ball, y :res.level3round1_x_ball, z :res.level3round1_c_ball},
            {x :res.level3round1_y_ball, y :res.level3round1_z_ball, z :res.level3round1_u_ball}
        ];
        */
        ballArray = [
            
            {x :"A_Ball.png", y :"B_Ball.png", z :"D_Ball.png"},                     
            {x :"C_Ball.png", y :"D_Ball.png", z :"B_Ball.png"},             
            {x :"E_Ball.png", y :"F_Ball.png", z :"L_Ball.png"},
            {x :"G_Ball.png", y :"H_Ball.png", z :"M_Ball.png"},
            {x :"I_Ball.png", y :"J_Ball.png", z :"G_Ball.png"},
            {x :"K_Ball.png", y :"L_Ball.png", z :"E_Ball.png"},
            {x :"M_Ball.png", y :"N_Ball.png", z :"W_Ball.png"},
            {x :"O_Ball.png", y :"P_Ball.png", z :"L_Ball.png"},
            {x :"Q_Ball.png", y :"R_Ball.png", z :"T_Ball.png"},
            {x :"S_Ball.png", y :"T_Ball.png", z :"E_Ball.png"},             
            {x :"U_Ball.png", y :"V_Ball.png", z :"K_Ball.png"},             
            {x :"W_Ball.png", y :"X_Ball.png", z :"M_Ball.png"},
            {x :"Y_Ball.png", y :"Z_Ball.png", z :"A_Ball.png"},
        ];
        
        pingArray = [
            {x :"A_Ping.png", y :"B_Ping.png"},
            {x :"C_Ping.png", y :"D_Ping.png"},
            {x :"E_Ping.png", y :"F_Ping.png"},
            {x :"G_Ping.png", y :"H_Ping.png"},
            {x :"I_Ping.png", y :"J_Ping.png"},
            {x :"K_Ping.png", y :"L_Ping.png"},
            {x :"M_Ping.png", y :"N_Ping.png"},
            {x :"O_Ping.png", y :"P_Ping.png"},
            {x :"Q_Ping.png", y :"R_Ping.png"},
            {x :"S_Ping.png", y :"T_Ping.png"},
            {x :"U_Ping.png", y :"V_Ping.png"},
            {x :"W_Ping.png", y :"X_Ping.png"},
            {x :"Y_Ping.png", y :"Z_Ping.png"}
        ];
        
        soundArray = [
            {x :res.a_Sound, y :res.b_Sound},
            {x :res.c_Sound, y :res.d_Sound},
            {x :res.e_Sound, y :res.f_Sound},
            {x :res.g_Sound, y :res.h_Sound},
            {x :res.i_Sound, y :res.j_Sound},
            {x :res.k_Sound, y :res.l_Sound},
            {x :res.m_Sound, y :res.n_Sound},
            {x :res.o_Sound, y :res.p_Sound},
            {x :res.q_Sound, y :res.r_Sound},
            {x :res.s_Sound, y :res.t_Sound},
            {x :res.u_Sound, y :res.v_Sound},
            {x :res.w_Sound, y :res.x_Sound},
            {x :res.y_Sound, y :res.z_Sound}
        ];
        
        charArray = [
                {x :"A .png", y :"B.png"},
                {x :"C.png", y :"D.png"},
                {x :"E.png", y :"F.png"},
                {x :"G.png", y :"H.png"},
                {x :"I.png", y :"J.png"},
                {x :"K.png", y :"L.png"},
                {x :"M.png", y :"N.png"},
                {x :"O.png", y :"P.png"},
                {x :"Q.png", y :"R.png"},
                {x :"S.png", y :"T.png"},
                {x :"U.png", y :"V.png"},
                {x :"W.png", y :"X.png"},
                {x :"Y.png", y :"Z.png"}
            ];
        
//        this.scheduleUpdate();

        ball_a = ballArray[level_num].x;
        ball_b = ballArray[level_num].y;
        ball_c = ballArray[level_num].z;
        ping_a = pingArray[level_num].x;
        ping_b = pingArray[level_num].y;
        char_a = charArray[level_num].x;
        char_b = charArray[level_num].y;

        position = [{x: size.width*30/100, y: size.height*30/100},
                    {x: size.width*50/100, y: size.height*30/100},
                    {x: size.width*70/100, y: size.height*30/100}];
        
        randomArray = new Array();
        
        for(var i=0; i<3; i++)
        {
            var val = position[Math.floor(Math.random() * position.length)];
            position.splice(position.indexOf(val),1);
            randomArray.push(val);
        }    
        

        this.backGround = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Background_level_03.png"));
        this.backGround.attr({
           x : size.width/2,
           y : size.height/2,
           anchorX : .5,
           anchorY : .5 
        });
        this.addChild(this.backGround);

        a_ping = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(ping_a));   
        a_ping.attr({
           x : size.width*46/100,
           y : size.height*88/100,
           anchorX : .5,
           anchorY : .5
        });
        this.addChild(a_ping);
        
        b_ping = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(ping_b));   
        b_ping.attr({
           x : size.width*54/100,
           y : size.height*88/100,
           anchorX : .5,
           anchorY : .5 
        });
        this.addChild(b_ping);
        
        this.backLayer = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Board.png"));
        this.backLayer.attr({
           x : size.width/2,
           y : size.height*88/100,
           anchorX : .5,
           anchorY : .5 
        });
        this.addChild(this.backLayer);
                
        a_ping_tween = cc.MoveTo.create(2, cc.p(size.width*46/100, size.height*67.7/100));
        b_ping_tween = cc.MoveTo.create(2, cc.p(size.width*54/100, size.height*67.7/100));
        
        a_ball = new eventListenerClick(ball_a, this);   
        a_ball.attr({
           x : randomArray[0].x,
           y : -200,
           anchorX : .5,
           anchorY : .5
        });
        this.addChild(a_ball);
        a_ball.id = "a_ball";
        
        b_ball = new eventListenerClick(ball_b, this);   
        b_ball.attr({
           x : randomArray[1].x,
           y : -200,
           anchorX : .5,
           anchorY : .5 
        });
        this.addChild(b_ball);
        b_ball.id = "b_ball";
        
        c_ball = new eventListenerClick(ball_c, this);   
        c_ball.attr({
           x : randomArray[2].x,
           y : -200,
           anchorX : .5,
           anchorY : .5 
        });
        this.addChild(c_ball);
        c_ball.id = "c_ball";
        
        this.removeListener();
        
        a_char = new eventListenerClick(char_a, this);
        a_char.attr({
           x : size.width*50/100,
           y : size.height*87/100,
           anchorX : .5,
           anchorY : .5,
           scale : .5,
            opacity : 0
        });
        this.addChild(a_char);
        
        b_char = new eventListenerClick(char_b, this);
        b_char.attr({
           x : size.width*50/100,
           y : size.height*87/100,
           anchorX : .5,
           anchorY : .5,
           scale : .5,
           opacity : 0
        });
        this.addChild(b_char);
        
        this.pingTweenFunction();
    },
    
    pingTweenFunction : function()
    {
        a_ping.runAction(cc.sequence(a_ping_tween, cc.callFunc(this.ball_tweenFunction, this)));
        b_ping.runAction(b_ping_tween);
    },
    
    ball_tweenFunction : function()
    {
        a_ball_initial_tween = cc.MoveTo.create(2, cc.p(randomArray[0].x, randomArray[0].y));
        b_ball_initial_tween = cc.MoveTo.create(2, cc.p(randomArray[1].x, randomArray[1].y));
        c_ball_initial_tween = cc.MoveTo.create(2, cc.p(randomArray[2].x, randomArray[2].y));
        
        a_ball.runAction(cc.sequence(a_ball_initial_tween, cc.callFunc(this.enableListener, this)));
        b_ball.runAction(b_ball_initial_tween);
        c_ball.runAction(c_ball_initial_tween);
    },
    
    a_ball_tween_finish_action : function()
    {
//        cc.audioEngine.stopMusic();
        cc.audioEngine.playMusic(res.blast_Heavy, false);
        this.removeChild(a_ball);
        this.removeChild(a_ping);
        a_ball = null;
        this.enableListener();
        this.a_char_tween_function();
    },
    
    b_ball_tween_finish_action : function()
    {
//        cc.audioEngine.stopMusic();
        cc.audioEngine.playMusic(res.blast_Heavy, false);
        this.removeChild(b_ball);
        this.removeChild(b_ping);
        b_ball = null;
        this.enableListener();
        this.b_char_tween_function();
    }, 

    c_ball_tween_finish_action : function()
    {
        cc.audioEngine.stopMusic();
        this.removeChild(c_ball);
        this.cBallComeBack();
        c_ball_tween = null;
        this.enableListener();
    },
    
    a_char_tween_finish_action : function()
    {
        cc.audioEngine.playMusic(soundArray[level_num].x, false);
        if(b_ball==null)
        {
            this.parent.removeChild(this);
            callerObject.Level_3(++level_num); 
        }
        else if(a_char_tween!=null)
        {
            a_char.scale = .5;
            this.a_char_tween_function();
        }
    },
    
    b_char_tween_finish_action : function()
    {
        cc.audioEngine.playMusic(soundArray[level_num].y, false);
        if(a_ball==null)
        {
            this.parent.removeChild(this);
            callerObject.Level_3(++level_num); 
        }
        else if(b_char_tween!=null)
        {
            b_char.scale = .5;
            this.b_char_tween_function();
        }
    },
    
//    update : function()
//    {
    /*    if(a_ball_tween!=null && a_ball_tween.isDone())
        {
            a_ball_tween = null;
            this.removeChild(a_ball);
            this.removeChild(a_ping);
            a_ball = null;
            this.enableListener();
            this.a_char_tween_function();
        }
        if(b_ball_tween!=null && b_ball_tween.isDone())
        {
            b_ball_tween = null;
            this.removeChild(b_ball);
            this.removeChild(b_ping);
            b_ball = null;
            this.enableListener();
            this.b_char_tween_function();
        }
        if(c_ball_tween!=null && c_ball_tween.isDone())
        {
            this.removeChild(c_ball);
            this.cBallComeBack();
            c_ball_tween = null;
            this.enableListener();
        }
        
        if(a_char_tween!=null && a_char_tween.isDone())
        {
            if(b_ball==null)
            {
                this.parent.removeChild(this);
                callerObject.Level_3(++level_num); 
            }
            else
            {
                a_char.scale = .5;
                this.a_char_tween_function();
            }
        }
        
        if(b_char_tween!=null && b_char_tween.isDone())
        {
            if(a_ball==null)
            {
                this.parent.removeChild(this);
                callerObject.Level_3(++level_num);
            }
            else
            {
                b_char.scale = .5;
                this.b_char_tween_function();
            }
        }
        
        if(c_ball!=null && a_ball==null && b_ball==null)
        {
  //         this.parent.removeChild(this);
//           callerObject.Level_3(++level_num);
        }
*///    },
    
    a_char_tween_function : function()
    {
  //      cc.audioEngine.stopMusic();
//        cc.audioEngine.playMusic(soundArray[level_num].x, false);
        a_char.opacity = 255;
        a_char_tween = cc.ScaleTo.create(2, .8, .8);
        a_char.runAction(cc.sequence(a_char_tween, cc.callFunc(this.a_char_tween_finish_action, this)));
    },
    
    b_char_tween_function : function()
    {
//        cc.audioEngine.stopMusic();
//        cc.audioEngine.playMusic(soundArray[level_num].y, false);
        b_char.opacity = 255;
        b_char_tween = cc.ScaleTo.create(2, .8, .8);
        b_char.runAction(cc.sequence(b_char_tween, cc.callFunc(this.b_char_tween_finish_action, this)));
    },
    
    hitABall : function()
    {
          cc.audioEngine.stopMusic();
          cc.audioEngine.playMusic(res.ball_Sound, false);
          this.removeListener();
          b_char_tween = null;
          a_char.opacity = 0;
          b_char.opacity = 0;
          a_ball_tween = cc.MoveTo.create(2, cc.p(size.width*45/100, size.height*66/100));
          a_ball.runAction(cc.sequence(a_ball_tween, cc.callFunc(this.a_ball_tween_finish_action, this)));
          
          var a_ball_scale = cc.ScaleTo.create(2, .6, .6);
          a_ball.runAction(a_ball_scale); 
          
          var a_ball_rotate = cc.RotateTo.create(2, 180);
          a_ball.runAction(a_ball_rotate);
    },
    
    hitBBall : function()
    {
          cc.audioEngine.stopMusic();
          cc.audioEngine.playMusic(res.ball_Sound, false);
          this.removeListener();
          a_char.opacity = 0;
          b_char.opacity = 0;
          a_char_tween = null;
          b_ball_tween = cc.MoveTo.create(2, cc.p(size.width*55/100, size.height*66/100));
          b_ball.runAction(cc.sequence(b_ball_tween, cc.callFunc(this.b_ball_tween_finish_action, this)));
          
          var b_ball_scale = cc.ScaleTo.create(2, .6, .6);
          b_ball.runAction(b_ball_scale); 
          
          var b_ball_rotate = cc.RotateTo.create(2, 180);
          b_ball.runAction(b_ball_rotate);
    },
    
    hitCBall : function()
    {
        cc.audioEngine.stopMusic();
        cc.audioEngine.playMusic(res.ball_Sound, false);
        a_char_tween = null;
        b_char_tween = null;
          a_char.opacity = 0;
          b_char.opacity = 0;
          this.removeListener();
//          var c_ball_tween = cc.MoveTo.create(2, cc.p(size.width*60.5/100, size.height*68/100));
          c_ball_tween = cc.MoveTo.create(2, cc.p(size.width*40/100, size.height*66/100));
          c_ball.runAction(cc.sequence(c_ball_tween, cc.callFunc(this.c_ball_tween_finish_action, this)));
          
          var c_ball_scale = cc.ScaleTo.create(2, .6, .6);
          c_ball.runAction(c_ball_scale); 
          
          var c_ball_rotate = cc.RotateTo.create(2, 180);
          c_ball.runAction(c_ball_rotate);          
    },
    
    cBallComeBack : function()
    {
        c_ball = new eventListenerClick(ballArray[level_num].z, this);   
        c_ball.attr({
           x: randomArray[2].x, 
           y: -100,
           anchorX : .5,
           anchorY : .5 
        });
        this.addChild(c_ball);
        c_ball.id = "c_ball";
        
        c_ball_second_tween = cc.MoveTo.create(1, cc.p(randomArray[2].x, randomArray[2].y));
        c_ball.runAction(c_ball_second_tween);
    },
    
    enableListener : function()
    {
        if(a_ball!=null)
        {
            this.removeChild(a_ball);
            a_ball = new eventListenerClick(ballArray[level_num].x, this);   
            a_ball.attr({
            x : randomArray[0].x,
            y : randomArray[0].y,
            anchorX : .5,
            anchorY : .5
            });
            this.addChild(a_ball);
            a_ball.id = "a_ball";
        }

        if(b_ball!=null)
        {
            this.removeChild(b_ball);
            b_ball = new eventListenerClick(ballArray[level_num].y, this);   
            b_ball.attr({
            x : randomArray[1].x,
            y : randomArray[1].y,
            anchorX : .5,
            anchorY : .5 
            });
            this.addChild(b_ball);
            b_ball.id = "b_ball";
        }

        if(c_ball!=null && (b_ball!=null || a_ball!=null))
        {
            this.removeChild(c_ball);
            c_ball = new eventListenerClick(ballArray[level_num].z, this);   
            c_ball.attr({
            x : randomArray[2].x,
            y : randomArray[2].y,
            anchorX : .5,
            anchorY : .5 
            });
            this.addChild(c_ball);
            c_ball.id = "c_ball";
        }
    },
    
    removeListener : function()
    {
        if(a_ball!=null)
        {
            cc.eventManager.removeListeners(a_ball);
        }
        if(b_ball!=null)
        {
            cc.eventManager.removeListeners(b_ball);
        }
        if(c_ball!=null)
        {
            cc.eventManager.removeListeners(c_ball);
        }
    }
    
});

var level3round1Scene = cc.Scene.extend({
    ctor : function(){
        this._super();
        var Layer = new level3round1Layer();
        this.addChild(Layer);
    }
})