    
    function scaleImage() {
    
        var xndy = {};
        
        var s1 = window.screen.width * 3 / 1280;
        var s2 = window.screen.height * 3 / 800;
        xndy.x = (window.devicePixelRatio/3 * s1) - 0.03; 
        xndy.y = (window.devicePixelRatio/3 * s2) - 0.03; 
        
        return xndy;
    }
    
    var scale = scaleImage();

    //Color codes
    var greyColor = 0xB0B0B0;
    var blueColor = 0x456AC1; 
    var cyanColor = 0x45C1C1; 
    var greenColor = 0x51C735;
    var orangeColor = 0xF38932;
    var pinkColor = 0xCC3ACC;
    var redColor = 0xE32424;
            
    //Cloud scale 

    var cloudScale = 0.1;
    
    var True = true;
    var False = false;

    //MouseCapture
    var mouseCaptureTrue = "true";
    var mouseCaptureFalse = "false";
   
   
    //ImageExtension
    var imageExtension = ".png";

    //AudioExtension
    var audioExtension = ".mp3";
    
    //Game canvas size
    var gameMinWidth = 0;
    var gameMinHeight = 0;
    var gameMaxWidth = window.screen.width*window.devicePixelRatio;
    var gameMaxHeight = window.screen.height*window.devicePixelRatio;
    
 
    //Canvas div
    var canvasDiv = 'game';
    
    
    //Color flags
    var greenFlag = 0;
    var blueFlag = 0;
    var orangeFlag = 0;
    var redFlag = 0;
    var pinkFlag = 0;
    var cyanFlag = 0;

    //Sprites anchor
    var spriteAnchorX = 0.5;
    var spriteAnchorY = 0.5;
    
    //Sprites scale
    var spriteScaleX = 0.32;
    var spriteScaleY = 0.32;

    //Animation scale
    var animationScaleX = 0.5;
    var animationScaleY = 0.5;



    //Paint object anchor
    var paintObjectAnchorX = 0.6;
    var paintObjectAnchorY = 0.6;
    
    
    //OtherImages
    var box = "box";

    var aLetter = "aLetter";
    var bLetter = "bLetter";
    var cLetter = "cLetter";
    var dLetter = "dLetter";
    var eLetter = "eLetter";
    var fLetter = "fLetter";
    var gLetter = "gLetter";
    var hLetter = "hLetter";
    var iLetter = "iLetter";
    var jLetter = "jLetter";
    var kLetter = "kLetter";
    var lLetter = "lLetter";
    var mLetter = "mLetter";
    var nLetter = "nLetter";
    var oLetter = "oLetter";
    var pLetter = "pLetter";
    var qLetter = "qLetter";
    var rLetter = "rLetter";
    var sLetter = "sLetter";
    var tLetter = "tLetter";
    var uLetter = "uLetter";
    var vLetter = "vLetter";
    var wLetter = "wLetter";
    var xLetter = "xLetter";
    var yLetter = "yLetter";
    var zLetter = "zLetter";
    
    var bg = "bg";
    
    
    var bButton = "bButton";
    var cButton = "cButton";
    var dButton = "dButton";
    var eButton = "eButton";
    var fButton = "fButton";
    var gButton = "gButton";
    var hButton = "hButton";
    var iButton = "iButton";
    var jButton = "jButton";
    var kButton = "kButton";
    var lButton = "lButton";
    var mButton = "mButton";
    var nButton = "nButton";
    var oButton = "oButton";
    var pButton = "pButton";
    var qButton = "qButton";
    var rButton = "rButton";
    var sButton = "sButton";
    var tButton = "tButton";
    var uButton = "uButton";
    var vButton = "vButton";
    var wButton = "wButton";
    var xButton = "xButton";
    var yButton = "yButton";
    var zButton = "zButton";
    
    var cloud = "cloud";
    
    //Spritesheet
    var blackAnimation =  "blackSplash"; 
    var blackAnimationWidth = 141;
    var blackAnimationHeight = 240;
    var noOfFrames = 7
    
    //Sounds
    var waterBurst = "waterBurst";
    var bubble = "bubble";
    var stick = "stick";
    

 

    var bar = "bar";
    var timeBar = "timeBar";
    var boxScale = 1;


    var progressBarPosition = [
                
                /*{x:1194,y:550},   // x : 0.93,y : 0.68 
                {x:1194,y:515},   // x : 0.93,y : 0.64
                {x:1194,y:480},   // x : 0.93,y : 0.60
                {x:1194,y:445},   // x : 0.93,y : 0.56
                {x:1194,y:410},   // x : 0.93,y : 0.52
                {x:1194,y:375},   // x : 0.93,y : 0.48
                {x:1194,y:340},   // x : 0.93,y : 0.44 
                {x:1194,y:305},   // x : 0.93,y : 0.40
                {x:1194,y:270},   // x : 0.93,y : 0.36
                {x:1194,y:235}    // x : 0.93,y : 0.32*/
        
        
        
                {x:gameMaxWidth * 0.93,y:gameMaxHeight * 0.68},   // x : 0.93,y : 0.68 
                {x:gameMaxWidth * 0.93,y:gameMaxHeight * 0.64},   // x : 0.93,y : 0.64
                {x:gameMaxWidth * 0.93,y:gameMaxHeight * 0.60},   // x : 0.93,y : 0.60
                {x:gameMaxWidth * 0.93,y:gameMaxHeight * 0.56},   // x : 0.93,y : 0.56
                {x:gameMaxWidth * 0.93,y:gameMaxHeight * 0.52},   // x : 0.93,y : 0.52
                {x:gameMaxWidth * 0.93,y:gameMaxHeight * 0.48},   // x : 0.93,y : 0.48
                {x:gameMaxWidth * 0.93,y:gameMaxHeight * 0.44},   // x : 0.93,y : 0.44 
                {x:gameMaxWidth * 0.93,y:gameMaxHeight * 0.40},   // x : 0.93,y : 0.40
                {x:gameMaxWidth * 0.93,y:gameMaxHeight * 0.36},   // x : 0.93,y : 0.36
                {x:gameMaxWidth * 0.93,y:gameMaxHeight * 0.32}    // x : 0.93,y : 0.32
    ];

    var timeBarPosition = {x:gameMaxWidth * 0.928 ,y:gameMaxHeight * 0.50}
    
    //All positions
    var objectsPosition = [
                
                /*{x:240,y:80},      // x : 0.18,y : 0.10 
                {x:80,y:240},      // x : 0.06,y : 0.30 
                {x:240,y:400},     // x : 0.18,y : 0.50 
                {x:80,y:560},      // x : 0.06,y : 0.70 
                {x:240,y:720},     // x : 0.18,y : 0.90 
                {x:80,y:80},       // x : 0.06,y : 0.10 
                {x:240,y:240},     // x : 0.18,y : 0.30 
                {x:80,y:400},      // x : 0.06,y : 0.50 
                {x:240,y:560},     // x : 0.18,y : 0.70 
                {x:80,y:720}       // x : 0.06,y : 0.90 */
        
        
                {x:gameMaxWidth * 0.18,y:gameMaxHeight * 0.10},      // x : 0.18,y : 0.10 
                {x:gameMaxWidth * 0.06,y:gameMaxHeight * 0.30},      // x : 0.06,y : 0.30 
                {x:gameMaxWidth * 0.18,y:gameMaxHeight * 0.50},     // x : 0.18,y : 0.50 
                {x:gameMaxWidth * 0.06,y:gameMaxHeight * 0.70},      // x : 0.06,y : 0.70 
                {x:gameMaxWidth * 0.18,y:gameMaxHeight * 0.90},     // x : 0.18,y : 0.90 
                {x:gameMaxWidth * 0.06,y:gameMaxHeight * 0.10},       // x : 0.06,y : 0.10 
                {x:gameMaxWidth * 0.18,y:gameMaxHeight * 0.30},     // x : 0.18,y : 0.30 
                {x:gameMaxWidth * 0.06,y:gameMaxHeight * 0.50},      // x : 0.06,y : 0.50 
                {x:gameMaxWidth * 0.18,y:gameMaxHeight * 0.70},     // x : 0.18,y : 0.70 
                {x:gameMaxWidth * 0.06,y:gameMaxHeight * 0.90}       // x : 0.06,y : 0.90 
    ];



    //Assets path for all alphabets
    var aPath = './assets/A/';
    var bPath = './assets/B/';
    var cPath = './assets/C/';
    var dPath = './assets/D/';
    var ePath = './assets/E/';
    var fPath = './assets/F/';  
    var gPath = './assets/G/';
    var hPath = './assets/H/';
    var iPath = './assets/I/';
    var jPath = './assets/J/';
    var kPath = './assets/K/';
    var lPath = './assets/L/';
    var mPath = './assets/M/';
    var nPath = './assets/N/';
    var oPath = './assets/O/';  
    var pPath = './assets/P/';
    var qPath = './assets/Q/';
    var rPath = './assets/R/';
    var sPath = './assets/S/';
    var tPath = './assets/T/';
    var uPath = './assets/U/';
    var vPath = './assets/V/';
    var wPath = './assets/W/';
    var xPath = './assets/X/';
    var yPath = './assets/Y/';
    var zPath = './assets/Z/';

    var commonAssets = './assets/Common/';

    var blackColor = 0x000000;
    var whiteColor = 0xCCFF33 ;
    var greyColor = 0xB0B0B0;
    var blueColor = 0x456AC1; 
    var cyanColor = 0x45C1C1; 
    var greenColor = 0x51C735;
    var orangeColor = 0xF38932;
    var pinkColor = 0xCC3ACC;
    var redColor = 0xE32424;
            
   
    var colorObjects = [
                        {name : "blue", code : 0x456AC1 ,flag : 0},
                        {name : "cyan", code : 0x45C1C1,flag : 0},
                        {name : "green", code : 0x51C735,flag : 0},
                        {name : "orange", code : 0xF38932,flag : 0},
                        {name : "pink", code : 0xCC3ACC,flag : 0},
                        {name : "red", code : 0xE32424,flag : 0}
                       ];
    //A objects
    var aCollection = [
                       {trans : "transApple", name: "apple",flag: 0 },
                       {trans : "transAeroplane",name: "aeroplane",flag: 0},
                       {trans : "transAlligator",name: "alligator",flag: 0},
                       {trans : "transAnchor",name: "anchor",flag: 0},
                       {trans : "transAngel",name: "angel",flag: 0},
                       {trans : "transAnt",name: "ant",flag: 0},
                       {trans : "transArrow",name: "arrow",flag: 0},
                       {trans : "transAstronaut",name: "astronaut",flag: 0},
                       {trans : "transAvacado",name: "avacado",flag: 0},
                       {trans : "transAxe",name: "axe",flag: 0},
                      ];

    
    //B objects
    var bCollection = [
                       {trans : "transBall",name: "ball",flag: 0},
                       {trans : "transBalloon",name: "balloon",flag: 0},
                       {trans : "transBat",name: "bat",flag: 0},
                       {trans : "transBell",name: "bell",flag: 0},
                       {trans : "transBelt",name: "belt",flag: 0},
                       {trans : "transBicycle",name: "bicycle",flag: 0},
                       {trans : "transBoat",name: "boat",flag: 0},
                       {trans : "transBottle",name: "bottle",flag: 0},
                       {trans : "transButterfly",name: "butterfly",flag: 0},
                       {trans : "transBee",name: "bee",flag: 0},
                      ];


    //C objects
    var cCollection = [
                       {trans : "transCamel",name: "camel",flag: 0},
                       {trans : "transCandle",name: "candle",flag: 0},
                       {trans : "transCar",name: "car",flag: 0},
                       {trans : "transCat",name: "cat",flag: 0},
                       {trans : "transCheese",name: "cheese",flag: 0},
                       {trans : "transCherry",name: "cherry",flag: 0},
                       {trans : "transClock",name: "clock",flag: 0},
                       {trans : "transCow",name: "cow",flag: 0},
                       {trans : "transCrab",name: "crab",flag: 0},
                       {trans : "transCrown",name: "crown",flag: 0},
                      ];


    //D objects
    var dCollection = [
                       {trans : "transDeer",name: "deer",flag: 0},
                       {trans : "transDonut",name: "donut",flag: 0},
                       {trans : "transDiamond",name: "diamond",flag: 0},
                       {trans : "transDice",name: "dice",flag: 0},
                       {trans : "transDinosaur",name: "dinosaur",flag: 0},
                       {trans : "transDog",name: "dog",flag: 0},
                       {trans : "transDoll",name: "doll",flag: 0},
                       {trans : "transDragonFruit",name: "dragonfruit",flag: 0},
                       {trans : "transDolphin",name: "dolphin",flag: 0},
                       {trans : "transDuck",name: "duck",flag: 0},
                      ];


    //E objects
    var eCollection = [
                       {trans : "transEagle",name: "eagle",flag: 0},
                       {trans : "transEar",name: "ear",flag: 0},
                       {trans : "transEarphone",name: "earphone",flag: 0},
                       {trans : "transEarth",name: "earth",flag: 0},
                       {trans : "transEgg",name: "egg",flag: 0},
                       {trans : "transElephant",name: "elephant",flag: 0},
                       {trans : "transElderberry",name: "elderberry",flag: 0},
                       {trans : "transEggplant",name: "eggplant",flag: 0},
                       {trans : "transEngine",name: "engine",flag: 0},
                       {trans : "transEye",name: "eye",flag: 0},
                      ];

    
    //F objects
    var fCollection = [
                       {trans : "transFan",name: "fan",flag: 0},
                       {trans : "transFeather",name: "feather",flag: 0},
                       {trans : "transFire",name: "fire",flag: 0},
                       {trans : "transFish",name: "fish",flag: 0},
                       {trans : "transFlower",name: "flower",flag: 0},
                       {trans : "transFlute",name: "flute",flag: 0},
                       {trans : "transFork",name: "fork",flag: 0},
                       {trans : "transFox",name: "fox",flag: 0},
                       {trans : "transFrock",name: "frock",flag: 0},
                       {trans : "transFrog",name: "frog",flag: 0},
                      ];

    
    //G objects
    var gCollection = [
                       {trans : "transGate",name: "gate",flag: 0},
                       {trans : "transGhost",name: "ghost",flag: 0},
                       {trans : "transGiraffe",name: "giraffe",flag: 0},
                       {trans : "transGlobe",name: "globe",flag: 0},
                       {trans : "transGloves",name: "gloves",flag: 0},
                       {trans : "transGoat",name: "goat",flag: 0},
                       {trans : "transGrapes",name: "grapes",flag: 0},
                       {trans : "transGrasshoper",name: "grasshoper",flag: 0},
                       {trans : "transGuava",name: "guava",flag: 0},
                       {trans : "transGuitar",name: "guitar",flag: 0},
                      ];


    //H objects
    var hCollection = [
                       {trans : "transHammer",name: "hammer",flag: 0},
                       {trans : "transHanger",name: "hanger",flag: 0},
                       {trans : "transHarp",name: "harp",flag: 0},
                       {trans : "transHat",name: "hat",flag: 0},
                       {trans : "transHeart",name: "heart",flag: 0},
                       {trans : "transHelicopter",name: "helicopter",flag: 0},
                       {trans : "transHelmet",name: "helmet",flag: 0},
                       {trans : "transHen",name: "hen",flag: 0},
                       {trans : "transHorse",name: "horse",flag: 0},
                       {trans : "transHouse",name: "house",flag: 0},
                      ];


    //I objects
    var iCollection = [
                       {trans : "transIce",name: "ice",flag: 0},
                       {trans : "transIceCream",name: "iceCream",flag: 0},
                       {trans : "transIceCreamStick",name: "iceCreamStick",flag: 0},
                       {trans : "transIceCubes",name: "iceCubes",flag: 0},
                       {trans : "transIgloo",name: "igloo",flag: 0},
                       {trans : "transIglooDoubleDoor",name: "iglooDoubleDoor",flag: 0},
                       {trans : "transIguana",name: "iguana",flag: 0},
                       {trans : "transIguanaRight",name: "iguanaRight",flag: 0},
                       {trans : "transInk",name: "ink",flag: 0},
                       {trans : "transInkRight",name: "inkRight",flag: 0},
                      ];


    //J objects
    var jCollection = [
                       {trans : "transJackFruit",name: "jackfruit",flag: 0},
                       {trans : "transJacks",name: "jacks",flag: 0},
                       {trans : "transJam",name: "jam",flag: 0},
                       {trans : "transJar",name: "jar",flag: 0},
                       {trans : "transJeep",name: "jeep",flag: 0},
                       {trans : "transJellyfish",name: "jellyfish",flag: 0},
                       {trans : "transJet",name: "jet",flag: 0},
                       {trans : "transJigsaw",name: "jigsaw",flag: 0},
                       {trans : "transJoker",name: "joker",flag: 0},
                       {trans : "transJug",name: "jug",flag: 0},
                      ];


    //K objects
    var kCollection = [
                       {trans : "transKayak",name: "kayak",flag: 0},
                       {trans : "transKettle",name: "kettle",flag: 0},
                       {trans : "transKey",name: "key",flag: 0},
                       {trans : "transKeyboard",name: "keyboard",flag: 0},
                       {trans : "transKing",name: "king",flag: 0},
                       {trans : "transKit",name: "kit",flag: 0},
                       {trans : "transKite",name: "kite",flag: 0},
                       {trans : "transKiwi",name: "kiwi",flag: 0},
                       {trans : "transKnife",name: "knife",flag: 0},
                       {trans : "transKoala",name: "koala",flag: 0},
                      ];



    //L objects
    var lCollection = [
                       {trans : "transLadder",name: "ladder",flag: 0},
                       {trans : "transLadybug",name: "ladybug",flag: 0},
                       {trans : "transLamp",name: "lamp",flag: 0},
                       {trans : "transLantern",name: "lantern",flag: 0},
                       {trans : "transLeaf",name: "leaf",flag: 0},
                       {trans : "transLemon",name: "lemon",flag: 0},
                       {trans : "transLeopard",name: "leopard",flag: 0},
                       {trans : "transLion",name: "lion",flag: 0},
                       {trans : "transLollipop",name: "lollipop",flag: 0},
                       {trans : "transLog",name: "log",flag: 0},
                      ];


    //M objects
    var mCollection = [
                       {trans : "transMagnet",name: "magnet",flag: 0},
                       {trans : "transMango",name: "mango",flag: 0},
                       {trans : "transMap",name: "map",flag: 0},
                       {trans : "transMask",name: "mask",flag: 0},
                       {trans : "transMobile",name: "mobile",flag: 0},
                       {trans : "transMonkey",name: "monkey",flag: 0},
                       {trans : "transMotorcycle",name: "motorcycle",flag: 0},
                       {trans : "transMountain",name: "mountain",flag: 0},
                       {trans : "transMug",name: "mug",flag: 0},
                       {trans : "transMushroom",name: "mushroom",flag: 0},
                      ];


    //N objects
    var nCollection = [
                       {trans : "transNail",name: "nail",flag: 0},
                       {trans : "transNeedle",name: "needle",flag: 0},
                       {trans : "transNest",name: "nest",flag: 0},
                       {trans : "transNet",name: "net",flag: 0},
                       {trans : "transNewspaper",name: "newspaper",flag: 0},
                       {trans : "transNib",name: "nib",flag: 0},
                       {trans : "transNose",name: "nose",flag: 0},
                       {trans : "transNurse",name: "nurse",flag: 0},
                       {trans : "transNut",name: "nut",flag: 0},
                       {trans : "transNuts",name: "nuts",flag: 0},
                      ];

    
    //O objects
    var oCollection = [
                       {trans : "transOctopus",name: "octopus",flag: 0},
                       {trans : "transOlive",name: "olive",flag: 0},
                       {trans : "transOmlet",name: "omlet",flag: 0},
                       {trans : "transOnion",name: "onion",flag: 0},
                       {trans : "transAwrange",name: "awrange",flag: 0},
                       {trans : "transOstrich",name: "ostrich",flag: 0},
                       {trans : "transOwl",name: "owl",flag: 0},
                       {trans : "transOstrichRightView",name: "ostrichRightView",flag: 0},
                       {trans : "transOven",name: "oven",flag: 0},
                       {trans : "transOx",name: "ox",flag: 0},
                      ];


    //P objects
    var pCollection = [
                       {trans : "transPanda",name: "panda",flag: 0},
                       {trans : "transParachute",name: "parachute",flag: 0},
                       {trans : "transParrot",name: "parrot",flag: 0},
                       {trans : "transPeacock",name: "peacock",flag: 0},
                       {trans : "transPen",name: "pen",flag: 0},
                       {trans : "transPencil",name: "pencil",flag: 0},
                       {trans : "transPenguin",name: "penguin",flag: 0},
                       {trans : "transPig",name: "pig",flag: 0},
                       {trans : "transPineapple",name: "pineapple",flag: 0},
                       {trans : "transPumkin",name: "pumkin",flag: 0},
                      ];


    //Q objects
    var qCollection = [
                       {trans : "transQueen",name: "queen",flag: 0},
                       {trans : "transQueencard",name: "queencard",flag: 0},
                       {trans : "transQueenFront",name: "queenFront",flag: 0},
                       {trans : "transQueenSide",name: "queenSide",flag: 0},
                       {trans : "transQuil",name: "quil",flag: 0},
                       {trans : "transQuilDouble",name: "quilDouble",flag: 0},
                       {trans : "transQuince",name: "quince",flag: 0},
                       {trans : "transQuinceDouble",name: "quinceDouble",flag: 0},
                       {trans : "transQuran",name: "quran",flag: 0},
                       {trans : "transQutubminar",name: "qutubminar",flag: 0},
                      ];


    //R objects
    var rCollection = [
                       {trans : "transRabbit",name: "rabbit",flag: 0},
                       {trans : "transRacket",name: "racket",flag: 0},
                       {trans : "transRadio",name: "radio",flag: 0},
                       {trans : "transRat",name: "rat",flag: 0},
                       {trans : "transRibbon",name: "ribbon",flag: 0},
                       {trans : "transRing",name: "ring",flag: 0},
                       {trans : "transRobot",name: "robot",flag: 0},
                       {trans : "transRock",name: "rock",flag: 0},
                       {trans : "transRocket",name: "rocket",flag: 0},
                       {trans : "transRuler",name: "ruler",flag: 0},
                      ];


    //S objects
    var sCollection = [
                       {trans : "transSandwich",name: "sandwich",flag: 0},
                       {trans : "transScissors",name: "scissors",flag: 0},
                       {trans : "transShark",name: "shark",flag: 0},
                       {trans : "transSheep",name: "sheep",flag: 0},
                       {trans : "transShirt",name: "shirt",flag: 0},
                       {trans : "transSnake",name: "snake",flag: 0},
                       {trans : "transSpade",name: "spade",flag: 0},
                       {trans : "transSparrow",name: "sparrow",flag: 0},
                       {trans : "transSquirrel",name: "squirrel",flag: 0},
                       {trans : "transStamp",name: "stamp",flag: 0},
                      ];


    //T objects
    var tCollection = [
                       {trans : "transTable",name: "table",flag: 0},
                       {trans : "transTap",name: "tap",flag: 0},
                       {trans : "transTelescope",name: "telescope",flag: 0},
                       {trans : "transTent",name: "tent",flag: 0},
                       {trans : "transTie",name: "tie",flag: 0},
                       {trans : "transTiger",name: "tiger",flag: 0},
                       {trans : "transTortoise",name: "tortoise",flag: 0},
                       {trans : "transTree",name: "tree",flag: 0},
                       {trans : "transTruck",name: "truck",flag: 0},
                       {trans : "transTv",name: "tv",flag: 0},
                      ];


    //U objects
    var uCollection = [
                       {trans : "transUgliFruit",name: "ugliFruit",flag: 0},
                       {trans : "transUgliFruitDouble",name: "ugliFruitDouble",flag: 0},
                       {trans : "transUmbrella",name: "umbrella",flag: 0},
                       {trans : "transUmbrellaDown",name: "umbrellaDown",flag: 0},
                       {trans : "transUnicorn",name: "unicorn",flag: 0},
                       {trans : "transUnicornRight",name: "unicornRight",flag: 0},
                       {trans : "transUnicycle",name: "unicycle",flag: 0},
                       {trans : "transUniform",name: "uniform",flag: 0},
                       {trans : "transUrn",name: "urn",flag: 0},
                       {trans : "transUrnRight",name: "urnRight",flag: 0},
                      ];


    //V objects
    var vCollection = [
                       {trans : "transVan",name: "van",flag: 0},
                       {trans : "transVanFront",name: "vanFront",flag: 0},
                       {trans : "transVanilla",name: "vanilla",flag: 0},
                       {trans : "transVase",name: "vase",flag: 0},
                       {trans : "transVictoriaPlum",name: "victoriaPlum",flag: 0},
                       {trans : "transVictoriaPlumDouble",name: "victoriaPlumDouble",flag: 0},
                       {trans : "transViolin",name: "violin",flag: 0},
                       {trans : "transViolinFront",name: "violinFront",flag: 0},
                       {trans : "transVulture",name: "vulture",flag: 0},
                       {trans : "transVultureRight",name: "vultureRight",flag: 0},
                      ];

    //W objects
    var wCollection = [
                       {trans : "transWafers",name: "wafers",flag: 0},
                       {trans : "transWallet",name: "wallet",flag: 0},
                       {trans : "transWatch",name: "watch",flag: 0},
                       {trans : "transWindmill",name: "windmill",flag: 0},
                       {trans : "transWatermelon",name: "watermelon",flag: 0},
                       {trans : "transWhale",name: "whale",flag: 0},
                       {trans : "transWheel",name: "wheel",flag: 0},
                       {trans : "transWings",name: "wings",flag: 0},
                       {trans : "transWolf",name: "wolf",flag: 0},
                       {trans : "transWorm",name: "worm",flag: 0},
                      ];

    //X objects
    var xCollection = [
                       {trans : "transXenopusleft",name: "xenopusleft",flag: 0},
                       {trans : "transXenopusright",name: "xenopusright",flag: 0},
                       {trans : "transXenosaurusright",name: "xenosaurusright",flag: 0},
                       {trans : "transXenosaurusleft",name: "xenosaurusleft",flag: 0},
                       {trans : "transXiphiasleft",name: "xiphiasleft",flag: 0},
                       {trans : "transXiphiasright",name: "xiphiasright",flag: 0},
                       {trans : "transXMasTree",name: "xMasTree",flag: 0},
                       {trans : "transXMasTree1",name: "xMasTree1",flag: 0},
                       {trans : "transXray",name: "xRay",flag: 0},
                       {trans : "transXylophone",name: "xylophone",flag: 0},
                      ];


    //Y objects
    var yCollection = [
                       {trans : "transYack",name: "yack",flag: 0},
                       {trans : "transYackRight",name: "yackRight",flag: 0},
                       {trans : "transYarn",name: "yarn",flag: 0},
                       {trans : "transYarnDouble",name: "yarnDouble",flag: 0},
                       {trans : "transYatch",name: "yatch",flag: 0},
                       {trans : "transYatchRight",name: "yatchRight",flag: 0},
                       {trans : "transYellowPearsDouble",name: "yellowPearsDouble",flag: 0},
                       {trans : "transYellowPearsSingle",name: "yellowPearsSingle",flag: 0},
                       {trans : "transYogurt",name: "yogurt",flag: 0},
                       {trans : "transYogurtFront",name: "yogurtFront",flag: 0},
                      ];


    //Z objects
    var zCollection = [
                       {trans : "transZebra",name: "zebra",flag: 0},
                       {trans : "transZebraface",name: "zebraface",flag: 0},
                       {trans : "transZebraface1",name: "zebraface1",flag: 0},
                       {trans : "transZebrafront",name: "zebrafront",flag: 0},
                       {trans : "transZebraleft",name: "zebraleft",flag: 0},
                       {trans : "transZebraright",name: "zebraright",flag: 0},
                       {trans : "transZip",name: "zip",flag: 0},
                       {trans : "transZiptilt",name: "ziptilt",flag: 0},
                       {trans : "transZuchhini",name: "zuchhini",flag: 0},
                       {trans : "transZuchhinidouble",name: "zuchhinidouble",flag: 0},
                      ];
