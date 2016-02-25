var array;
var tween;
var flag = false;
import LoadState2 from 'states/LoadState2';
class LoadState1 extends Phaser.State
{
    preload() {
        this.game.load.image('BG','assets/D2/BG.png');
        this.game.load.image('a','assets/D2/A.png'); 
        this.game.load.image('b','assets/D2/B.png'); 
        this.game.load.image('c','assets/D2/C.png');
        this.game.load.image('d','assets/D2/D.png');
        this.game.load.image('e','assets/D2/E.png');
        this.game.load.image('f','assets/D2/F.png');
        this.game.load.image('g','assets/D2/G.png');
        this.game.load.image('h','assets/D2/H.png');
        this.game.load.image('i','assets/D2/I.png');
        this.game.load.image('j','assets/D2/J.png');
        this.game.load.image('k','assets/D2/K.png');
        this.game.load.image('l','assets/D2/L.png');
        this.game.load.image('m','assets/D2/M.png');
        this.game.load.image('n','assets/D2/N.png');
        this.game.load.image('o','assets/D2/O.png');
        this.game.load.image('p','assets/D2/P.png');
        this.game.load.image('q','assets/D2/Q.png');
        this.game.load.image('r','assets/D2/R.png');
        this.game.load.image('s','assets/D2/S.png');
        this.game.load.image('t','assets/D2/T.png');
        this.game.load.image('u','assets/D2/U.png');
        this.game.load.image('v','assets/D2/V.png');
        this.game.load.image('w','assets/D2/W.png');
        this.game.load.image('x','assets/D2/X.png');
        this.game.load.image('y','assets/D2/Y.png');
        this.game.load.image('z','assets/D2/Z.png');
        this.game.load.image('dot','assets/dot.png');
        this.game.load.image('menuscreen','assets/menu.png');
        this.game.load.image('completed','assets/completed.png');
        this.game.load.image('next','assets/next.png');
        this.game.load.image('home','assets/home.png');
        this.game.load.image('yes','assets/yes.png');
        this.game.load.image('no','assets/no.png');
      
     //   this.state.add('LoadState2', LoadState2, false);
    }
    
    create()
    {
         this.yes_button;
         this.no_button;
         this.menu_button;
         
        this.game.add.sprite(0,0,'BG');
        this.game.add.button(1130,5,'home',this.home,this);
        this.counter = 0;
        this.state_count = 1;
                 
         this.a=this.game.add.sprite(232,118,'a');
         this.a.anchor.setTo(0.5,0.5);
         this.a.id = 1;
         
         this.b=this.game.add.sprite(460,115,'b');
         this.b.anchor.setTo(0.5,0.5);
         this.b.id = 2;
         
         this.c=this.game.add.sprite(477,179,'c');
         this.c.anchor.setTo(0.5,0.5);
         this.c.id = 3;        
         
         this.d=this.game.add.sprite(520,207,'d');
         this.d.anchor.setTo(0.5,0.5);
         this.d.id = 4;
         
         this.e=this.game.add.sprite(443,228,'e');
         this.e.anchor.setTo(0.5,0.5);
         this.e.id = 5;
         
         this.f=this.game.add.sprite(395,280,'f');
         this.f.anchor.setTo(0.5,0.5);
         this.f.id = 6;
         
         this.g=this.game.add.sprite(355,298,'g');
         this.g.anchor.setTo(0.5,0.5);
         this.g.id = 7;
         
         this.h=this.game.add.sprite(458,274,'h');
         this.h.anchor.setTo(0.5,0.5);
         this.h.id = 8;
         
         this.i=this.game.add.sprite(504,268,'i');
         this.i.anchor.setTo(0.5,0.5);
         this.i.id = 9;
         
         this.j=this.game.add.sprite(529,279,'j');
         this.j.anchor.setTo(0.5,0.5);
         this.j.id = 10;
         
         this.k=this.game.add.sprite(586,246,'k');
         this.k.anchor.setTo(0.5,0.5);
         this.k.id =11;
         
         this.l=this.game.add.sprite(572,295,'l');
         this.l.anchor.setTo(0.5,0.5);
         this.l.id = 12;
         
         this.m=this.game.add.sprite(617,319,'m');
         this.m.anchor.setTo(0.5,0.5);
         this.m.id = 13;
         
         this.n=this.game.add.sprite(659,342,'n');
         this.n.anchor.setTo(0.5,0.5);
         this.n.id = 14;
         
         this.o=this.game.add.sprite(701,322,'o');
         this.o.anchor.setTo(0.5,0.5);
         this.o.id = 15;
         
         this.p=this.game.add.sprite(609,415,'p');
         this.p.anchor.setTo(0.5,0.5);
         this.p.id = 16;
         
         this.q=this.game.add.sprite(576,477,'q');
         this.q.anchor.setTo(0.5,0.5);
         this.q.id = 17;
         
         this.r=this.game.add.sprite(607,543,'r');
         this.r.anchor.setTo(0.5,0.5);
         this.r.id = 18;
         
         this.s=this.game.add.sprite(579,602,'s');
         this.s.anchor.setTo(0.5,0.5);
         this.s.id = 19;
         
         this.t=this.game.add.sprite(779,398,'t');
         this.t.anchor.setTo(0.5,0.5);
         this.t.id = 20;
         
         this.u=this.game.add.sprite(833,460,'u');
         this.u.anchor.setTo(0.5,0.5);
         this.u.id = 21;
         
         this.v=this.game.add.sprite(881,497,'v');
         this.v.anchor.setTo(0.5,0.5);
         this.v.id = 22;
         
         this.w=this.game.add.sprite(913,520,'w');
         this.w.anchor.setTo(0.5,0.5);
         this.w.id = 23;
         
         this.x=this.game.add.sprite(971,556,'x');
         this.x.anchor.setTo(0.5,0.5);
         this.x.id = 24;
         
         this.y=this.game.add.sprite(1008,576,'y');
         this.y.anchor.setTo(0.5,0.5);
         this.y.id = 25;
         
         this.z=this.game.add.sprite(1044,588,'z');
         this.z.anchor.setTo(0.5,0.5);
         this.z.id = 26;
       
        this.spritePosition=[{x:70,y:70},{x:1155,y:675},{x:160,y:125},{x:290,y:370},{x:175,y:285},{x:285,y:715},
                              {x:1155,y:500},{x:240,y:560},{x:700,y:180},{x:570,y:715},{x:930,y:320},{x:610,y:60},
                              {x:905,y:90},{x:1135,y:330},{x:435,y:600},{x:280,y:480},{x:730,y:70},{x:120,y:695},{x:855,y:225},
                              {x:115,y:450},{x:810,y:645},{x:420,y:465},{x:1140,y:235},{x:1050,y:450},{x:1035,y:145},{x:1000,y:700}];
       
        array = [ this.a,this.b,this.c,this.d,this.e,this.f,this.g,this.h,this.i,this.j,this.k,this.l,this.m,
                 this.n,this.o,this.p,this.q,this.r,this.s,this.t,this.u,this.v,this.w,this.x,this.y,this.z];
        
         
        this.game.physics.arcade.enable(this.a);
        this.game.physics.arcade.enable(this.b);
        this.game.physics.arcade.enable(this.c);
        this.game.physics.arcade.enable(this.d);
        this.game.physics.arcade.enable(this.e);
        this.game.physics.arcade.enable(this.f);
        this.game.physics.arcade.enable(this.g);
        this.game.physics.arcade.enable(this.h);
        this.game.physics.arcade.enable(this.i);
        this.game.physics.arcade.enable(this.j);
        this.game.physics.arcade.enable(this.k);
        this.game.physics.arcade.enable(this.l);
        this.game.physics.arcade.enable(this.m);
        this.game.physics.arcade.enable(this.n);
        this.game.physics.arcade.enable(this.o);
        this.game.physics.arcade.enable(this.p);
        this.game.physics.arcade.enable(this.q);
        this.game.physics.arcade.enable(this.r);
        this.game.physics.arcade.enable(this.s);
        this.game.physics.arcade.enable(this.t);
        this.game.physics.arcade.enable(this.u);
        this.game.physics.arcade.enable(this.v);
        this.game.physics.arcade.enable(this.w);
        this.game.physics.arcade.enable(this.x);
        this.game.physics.arcade.enable(this.y);
        this.game.physics.arcade.enable(this.z);
       
        this.a_dot = this.game.add.sprite(345,190, 'dot');
        this.a_dot.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(this.a_dot);
        this.a_dot.alpha=0;
        
        this.b_dot = this.game.add.sprite(490,150, 'dot');
        this.b_dot.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(this.b_dot);
        this.b_dot.alpha=0;
        
        this.c_dot = this.game.add.sprite(507,207, 'dot');
        this.c_dot.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(this.c_dot);
        this.c_dot.alpha=0;
         
        this.d_dot = this.game.add.sprite(548,240, 'dot');
        this.d_dot.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(this.d_dot);
        this.d_dot.alpha=0;
        
        this.e_dot = this.game.add.sprite(473,265, 'dot');
        this.e_dot.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(this.e_dot);
        this.e_dot.alpha=0;
        
        this.f_dot = this.game.add.sprite(425,299, 'dot');
        this.f_dot.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(this.f_dot);
        this.f_dot.alpha=0;
        
        this.g_dot = this.game.add.sprite(377,321, 'dot');
        this.g_dot.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(this.g_dot);
        this.g_dot.alpha=0;
        
        this.h_dot = this.game.add.sprite(507,308, 'dot');
        this.h_dot.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(this.h_dot);
        this.h_dot.alpha=0;
        
        this.i_dot = this.game.add.sprite(544,310, 'dot');
        this.i_dot.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(this.i_dot);
        this.i_dot.alpha=0;
        
        this.j_dot = this.game.add.sprite(577,319, 'dot');
        this.j_dot.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(this.j_dot);
        this.j_dot.alpha=0;
        
        this.k_dot = this.game.add.sprite(640,287, 'dot');
        this.k_dot.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(this.k_dot);
        this.k_dot.alpha=0;
       
        this.l_dot = this.game.add.sprite(605,338, 'dot');
        this.l_dot.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(this.l_dot);
        this.l_dot.alpha=0;
         
        this.m_dot = this.game.add.sprite(647,348, 'dot');
        this.m_dot.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(this.m_dot);
        this.m_dot.alpha=0;
        
        this.n_dot = this.game.add.sprite(692,370, 'dot');
        this.n_dot.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(this.n_dot);
        this.n_dot.alpha=0;
        
        this.o_dot = this.game.add.sprite(738,385, 'dot');
        this.o_dot.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(this.o_dot);
        this.o_dot.alpha=0;
        
        this.p_dot = this.game.add.sprite(663,456, 'dot');
        this.p_dot.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(this.p_dot);
        this.p_dot.alpha=0;
       
        this.q_dot = this.game.add.sprite(603,510, 'dot');
        this.q_dot.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(this.q_dot);
        this.q_dot.alpha=0;
        
        this.r_dot = this.game.add.sprite(648,587, 'dot');
        this.r_dot.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(this.r_dot);
        this.r_dot.alpha=0;
        
        this.s_dot = this.game.add.sprite(609,618, 'dot');
        this.s_dot.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(this.s_dot);
        this.s_dot.alpha=0;
        
        this.t_dot = this.game.add.sprite(817,439, 'dot');
        this.t_dot.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(this.t_dot);
        this.t_dot.alpha=0;
        
        this.u_dot = this.game.add.sprite(865,491, 'dot');
        this.u_dot.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(this.u_dot);
        this.u_dot.alpha=0;
        
        this.v_dot = this.game.add.sprite(908,521, 'dot');
        this.v_dot.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(this.v_dot);  
        this.v_dot.alpha=0;
        
        this.w_dot = this.game.add.sprite(945,550, 'dot');
        this.w_dot.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(this.w_dot);  
        this.w_dot.alpha=0;
         
        this.x_dot = this.game.add.sprite(994,576, 'dot');
        this.x_dot.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(this.x_dot);  
        this.x_dot.alpha=0;
        
        this.y_dot = this.game.add.sprite(1029,591, 'dot');
        this.y_dot.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(this.y_dot);  
        this.y_dot.alpha=0;
        
        this.z_dot = this.game.add.sprite(1077,600, 'dot');
        this.z_dot.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(this.z_dot);  
        this.z_dot.alpha=0;
         
         
          this.game.physics.arcade.enable(this.a);
          this.a.originalPosition=this.newPosition();
          this.game.add.tween(this.a).to({y:this.a.y-60}, 400).to(this.a.originalPosition, 1000).start();
          this.a.inputEnabled='true';
          this.a.input.enableDrag(); 
          this.a.events.onDragStart.add(this.onDragStart, this);
          this.a.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, this.a_dot);}, this);
          
          this.game.physics.arcade.enable(this.b);
          this.b.originalPosition=this.newPosition();
          this.game.add.tween(this.b).to({y:this.b.y-60}, 400).to(this.b.originalPosition, 1000).start();
          this.b.inputEnabled='true';
          this.b.input.enableDrag(); 
          this.b.events.onDragStart.add(this.onDragStart, this);
          this.b.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, this.b_dot);}, this);
          
          this.game.physics.arcade.enable(this.c);
          this.c.originalPosition=this.newPosition();
          this.game.add.tween(this.c).to({y:this.c.y-60}, 400).to(this.c.originalPosition, 1000).start();
          this.c.inputEnabled='true';
          this.c.input.enableDrag(); 
          this.c.events.onDragStart.add(this.onDragStart, this);
          this.c.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, this.c_dot);}, this);
         
          this.game.physics.arcade.enable(this.d);
          this.d.originalPosition=this.newPosition();
          this.game.add.tween(this.d).to({y:this.d.y-60}, 400).to(this.d.originalPosition, 1000).start();
          this.d.inputEnabled='true';
          this.d.input.enableDrag(); 
          this.d.events.onDragStart.add(this.onDragStart, this);
          this.d.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, this.d_dot);}, this);
          
          this.game.physics.arcade.enable(this.e);
          this.e.originalPosition=this.newPosition();
          this.game.add.tween(this.e).to({y:this.e.y-60}, 400).to(this.e.originalPosition, 1000).start();
          this.e.inputEnabled='true';
          this.e.input.enableDrag(); 
          this.e.events.onDragStart.add(this.onDragStart, this);
          this.e.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, this.e_dot);}, this);
          
          this.game.physics.arcade.enable(this.f);
          this.f.originalPosition=this.newPosition();
          this.game.add.tween(this.f).to({y:this.f.y-60}, 400).to(this.f.originalPosition, 1000).start();
          this.f.inputEnabled='true';
          this.f.input.enableDrag(); 
          this.f.events.onDragStart.add(this.onDragStart, this);
          this.f.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, this.f_dot);}, this);
          
          this.game.physics.arcade.enable(this.g);
          this.g.originalPosition=this.newPosition();
          this.game.add.tween(this.g).to({y:this.g.y-60}, 400).to(this.g.originalPosition, 1000).start();
          this.g.inputEnabled='true';
          this.g.input.enableDrag(); 
          this.g.events.onDragStart.add(this.onDragStart, this);
          this.g.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, this.g_dot);}, this);
          
          this.game.physics.arcade.enable(this.h);
          this.h.originalPosition=this.newPosition();
          this.game.add.tween(this.h).to({y:this.h.y-60}, 400).to(this.h.originalPosition, 1000).start();
          this.h.inputEnabled='true';
          this.h.input.enableDrag(); 
          this.h.events.onDragStart.add(this.onDragStart, this);
          this.h.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, this.h_dot);}, this);
          
          this.game.physics.arcade.enable(this.i);
          this.i.originalPosition=this.newPosition();
          this.game.add.tween(this.i).to({y:this.i.y-60}, 400).to(this.i.originalPosition, 1000).start();
          this.i.inputEnabled='true';
          this.i.input.enableDrag(); 
          this.i.events.onDragStart.add(this.onDragStart, this);
          this.i.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, this.i_dot);}, this);
          
          this.game.physics.arcade.enable(this.j);
          this.j.originalPosition=this.newPosition();
          this.game.add.tween(this.j).to({y:this.j.y-60}, 400).to(this.j.originalPosition, 1000).start();
          this.j.inputEnabled='true';
          this.j.input.enableDrag(); 
          this.j.events.onDragStart.add(this.onDragStart, this);
          this.j.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, this.j_dot);}, this);
          
          this.game.physics.arcade.enable(this.k);
          this.k.originalPosition=this.newPosition();
          this.game.add.tween(this.k).to({y:this.k.y-60}, 400).to(this.k.originalPosition, 1000).start();
          this.k.inputEnabled='true';
          this.k.input.enableDrag();
          this.k.events.onDragStart.add(this.onDragStart, this); 
          this.k.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, this.k_dot);}, this);
          
          this.game.physics.arcade.enable(this.l);
          this.l.originalPosition=this.newPosition();
          this.game.add.tween(this.l).to({y:this.l.y-60}, 400).to(this.l.originalPosition, 1000).start();
          this.l.inputEnabled='true';
          this.l.input.enableDrag(); 
          this.l.events.onDragStart.add(this.onDragStart, this);
          this.l.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, this.l_dot);}, this);
          
          this.game.physics.arcade.enable(this.m);
          this.m.originalPosition=this.newPosition();
          this.game.add.tween(this.m).to({y:this.m.y-60}, 400).to(this.m.originalPosition, 1000).start();
          this.m.inputEnabled='true';
          this.m.input.enableDrag(); 
          this.m.events.onDragStart.add(this.onDragStart, this);
          this.m.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, this.m_dot);}, this);
                    
          this.game.physics.arcade.enable(this.n);
          this.n.originalPosition=this.newPosition();
          this.game.add.tween(this.n).to({y:this.n.y-60}, 400).to(this.n.originalPosition, 1000).start();
          this.n.inputEnabled='true';
          this.n.input.enableDrag();
          this.n.events.onDragStart.add(this.onDragStart, this); 
          this.n.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, this.n_dot);}, this);
          
          this.game.physics.arcade.enable(this.o);
          this.o.originalPosition=this.newPosition();
          this.game.add.tween(this.o).to({y:this.o.y-60}, 400).to(this.o.originalPosition, 1000).start();
          this.o.inputEnabled='true';
          this.o.input.enableDrag(); 
          this.o.events.onDragStart.add(this.onDragStart, this);
          this.o.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, this.o_dot);}, this);
          
          this.game.physics.arcade.enable(this.p);
          this.p.originalPosition=this.newPosition();
          this.game.add.tween(this.p).to({y:this.p.y-60}, 400).to(this.p.originalPosition, 1000).start();
          this.p.inputEnabled='true';
          this.p.input.enableDrag();
          this.p.events.onDragStart.add(this.onDragStart, this); 
          this.p.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, this.p_dot);}, this);
         
          this.game.physics.arcade.enable(this.q);
          this.q.originalPosition=this.newPosition();
          this.game.add.tween(this.q).to({y:this.q.y-60}, 400).to(this.q.originalPosition, 1000).start();
          this.q.inputEnabled='true';
          this.q.input.enableDrag(); 
          this.q.events.onDragStart.add(this.onDragStart, this);
          this.q.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, this.q_dot);}, this);
          
          this.game.physics.arcade.enable(this.r);
          this.r.originalPosition=this.newPosition();
          this.game.add.tween(this.r).to({y:this.r.y-60}, 400).to(this.r.originalPosition, 1000).start();
          this.r.inputEnabled='true';
          this.r.input.enableDrag(); 
          this.r.events.onDragStart.add(this.onDragStart, this);
          this.r.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, this.r_dot);}, this);
          
          this.game.physics.arcade.enable(this.s);
          this.s.originalPosition=this.newPosition();
          this.game.add.tween(this.s).to({y:this.s.y-60}, 400).to(this.s.originalPosition, 1000).start();
          this.s.inputEnabled='true';
          this.s.input.enableDrag(); 
          this.s.events.onDragStart.add(this.onDragStart, this);
          this.s.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, this.s_dot);}, this);
          
          this.game.physics.arcade.enable(this.t);
          this.t.originalPosition=this.newPosition();
          this.game.add.tween(this.t).to({y:this.t.y-60}, 400).to(this.t.originalPosition, 1000).start();
          this.t.inputEnabled='true';
          this.t.input.enableDrag(); 
          this.t.events.onDragStart.add(this.onDragStart, this);
          this.t.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, this.t_dot);}, this);
          
          this.game.physics.arcade.enable(this.u);
          this.u.originalPosition=this.newPosition();
          this.game.add.tween(this.u).to({y:this.u.y-60}, 400).to(this.u.originalPosition, 1000).start();
          this.u.inputEnabled='true';
          this.u.input.enableDrag(); 
          this.u.events.onDragStart.add(this.onDragStart, this);
          this.u.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, this.u_dot);}, this);
          
          this.game.physics.arcade.enable(this.v);
          this.v.originalPosition=this.newPosition();
          this.game.add.tween(this.v).to({y:this.v.y-60}, 400).to(this.v.originalPosition, 1000).start();
          this.v.inputEnabled='true';
          this.v.input.enableDrag(); 
          this.v.events.onDragStart.add(this.onDragStart, this);
          this.v.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, this.v_dot);}, this);
          
          this.game.physics.arcade.enable(this.w);
          this.w.originalPosition=this.newPosition();
          this.game.add.tween(this.w).to({y:this.w.y-60}, 400).to(this.w.originalPosition, 1000).start();
          this.w.inputEnabled='true';
          this.w.input.enableDrag(); 
          this.w.events.onDragStart.add(this.onDragStart, this);
          this.w.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, this.w_dot);}, this);
          
          this.game.physics.arcade.enable(this.x);
          this.x.originalPosition=this.newPosition();
          this.game.add.tween(this.x).to({y:this.x.y-60}, 400).to(this.x.originalPosition, 1000).start();
          this.x.inputEnabled='true';
          this.x.input.enableDrag(); 
          this.x.events.onDragStart.add(this.onDragStart, this);
          this.x.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, this.x_dot);}, this);
          
          this.game.physics.arcade.enable(this.y);
          this.y.originalPosition=this.newPosition();
          this.game.add.tween(this.y).to({y:this.y.y-60}, 400).to(this.y.originalPosition, 1000).start();
          this.y.inputEnabled='true';
          this.y.input.enableDrag(); 
          this.y.events.onDragStart.add(this.onDragStart, this);
          this.y.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, this.y_dot);}, this);
          
          this.game.physics.arcade.enable(this.z);
          this.z.originalPosition=this.newPosition();
          this.game.add.tween(this.z).to({y:this.z.y-60}, 400).to(this.z.originalPosition, 1000).start();
          this.z.inputEnabled='true';
          this.z.input.enableDrag(); 
          this.z.events.onDragStart.add(this.onDragStart, this);
          this.z.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, this.z_dot);}, this);
          
          //for tween 
         this.timer = this.game.time.create(false);
         this.timer.loop(300, this.myTween, this);
         this.timer.start();
         this.delay = 0;
         this.cancel = true;
        }
        
        onDragStart()
        {
            //console.log('start'+ array[this.counter]);
            array[this.counter].alpha = 1;
            this.cancel = false;
        }
        
         update() {
                      console.log('x='+ Math.floor(this.game.input.activePointer.x)+'y='+ Math.floor(this.game.input.activePointer.y));
               if(this.counter == 2)
               {
                      let screen= this.game.add.image(640,400,'menuscreen');
                      screen.anchor.setTo(0.5,0.5);
                      this.game.add.image(380,190,'completed');
                      this.game.stage3 = true;
                      this.nextbutton = this.game.add.button(400,400,'next',this.nextstage,this);
                      this.state.add('LoadState2', LoadState2, false);
                 
                }                
          }
          myTween()
           { 
            if(this.counter <26 && this.delay > 5 && this.cancel)
            {
                if(!flag){
                tween=array[this.counter];
                tween.alpha=0;
                flag = true;
            }
             else
             {
                   tween.alpha=1;
                   flag=false;
             }
          }
          this.delay++;   
       }
        
          nextstage()
          {
             this.game.state.start('LoadState2');
          }
          
           home()
          {  
              this.menu_button = this.game.add.image(640,400,'menuscreen');
              this.menu_button.anchor.setTo(0.5,0.5);
              this.yes_button = this.game.add.button(350,350,'yes',this.yesstage,this);
              this.no_button = this.game.add.button(700,350,'no',this.nostage,this);
          }
          
          yesstage()
          {
               this.game.state.start('BootState');
          }
          
          nostage()
          {
               this.yes_button.kill();
               this.no_button.kill();
               this.menu_button.kill();
          }
           newPosition(){
                             var pos = this.game.rnd.integerInRange(0, this.spritePosition.length - 1);
                             var newPos = this.spritePosition[pos];
                             this.spritePosition.splice(pos, 1);
                             return newPos;                         
                          }
                       
            stopDrag(currentSprite, endSprite)
            {
                 let self = this;
                 if(!this.game.physics.arcade.overlap(currentSprite, endSprite,function()
                 {
                     
                     if(currentSprite.id == self.state_count)
                     {
                         self.counter ++;
                         self.cancel = true;
                         currentSprite.position.copyFrom(endSprite.position);
                         currentSprite.inputEnabled = false;
                         self.state_count++;
                     } 
                       else 
                           {
                              currentSprite.position.copyFrom(currentSprite.originalPosition);
                              currentSprite.input.enableDrag();
                              currentSprite.inputEnabled='true';
                              self.cancel = true;
                     }
                  }))
            {
                  currentSprite.position.copyFrom(currentSprite.originalPosition);
                  currentSprite.input.enableDrag();
                  currentSprite.inputEnabled='true';
                  self.cancel = true;
            }
       
       }
}
export default LoadState1;
  