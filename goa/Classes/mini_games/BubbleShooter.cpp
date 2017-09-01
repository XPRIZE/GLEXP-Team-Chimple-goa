//
//  BubbleShooter.cpp 
//  goa
//
//  Created by Karim Mirazul  on 05/11/16
//
//

#include "BubbleShooter.h"
#include "../menu/HelpLayer.h"
#include "../util/CommonLabelTTF.h"

#define COCOS2D_DEBUG 1
using namespace std;
using namespace cocos2d;
USING_NS_CC;

Scene* BubbleShooter::createScene()
{
	auto scene = Scene::create();
	auto layer = BubbleShooter::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, BubbleShooter::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

BubbleShooter *BubbleShooter::create() {
	BubbleShooter *blast = new (std::nothrow) BubbleShooter();
	if (blast && blast->init()) {
		blast->autorelease();
		return blast;
	}
	CC_SAFE_DELETE(blast);
	return nullptr;

}

bool BubbleShooter::init()
{
	if (!Layer::init()) { return false; }

	return true;
}

void BubbleShooter::onEnterTransitionDidFinish() {

	_eventDispatcher->addCustomEventListener("multipleChoiceQuiz", CC_CALLBACK_1(BubbleShooter::gameBegin, this));
	_lesson.getMultiChoices(3, 0);
}

void BubbleShooter::gameBegin(cocos2d::EventCustom *eventCustom) {

	CCLOG("onLessonReady begin");
	std::string* buf = static_cast<std::string*>(eventCustom->getUserData());
	CCLOG("onLessonReady to unmarshallMultiChoices");
	vector<Lesson::MultiChoice> vmc = Lesson::unmarshallMultiChoices(buf);

	std::string mainScenePath = "";

	if ((RandomHelper::random_int(1, 19) % 2) == 0) {
		mainScenePath = "bubble_shooter/bubble_shooter.csb";
		_AlphabetsScene = false;
	}
	else {
		mainScenePath = "bubble_shooter/bubble_shooter_1.csb";
		_AlphabetsScene = true;
	}

	Node* bg = CSLoader::createNode(mainScenePath);
	addChild(bg);
	bg->setName("bg");

	_negativePoints = 0;
	_flagSwitchTwoColor = true;
	std::string imageSprite[8] = { "bubble_shooter/red_ball", "bubble_shooter/green_ball", "bubble_shooter/yellow_ball", "bubble_shooter/purple_ball", "bubble_shooter/blue_ball", "bubble_shooter/orange_ball", "bubble_shooter/yellow_ball", "bubble_shooter/blue_ball" };

	for (int i = 0; i < 8; i++)
		_imageSprite[i] = imageSprite[i];

	std::vector<std::string> LangLetter;
	int numberOfLetter = 3;
	if (_AlphabetsScene) {
		LangLetter = TextGenerator::getInstance()->getAllChars();

		if (numberOfLetter <= ceil(LangLetter.size() / 12)) {
			numberOfLetter = ceil(LangLetter.size() / 12);
		}
	}
	else {
		string NumbersArray[] = { "0","1","2","3","4","5","6","7","8","9" };
		for (int i = 0; i < 10; i++)
			LangLetter.push_back(NumbersArray[i]);
	}

	auto textHitsLabel = CommonLabelTTF::create(TextGenerator::getInstance()->translateString("Hits : 0"), "Helvetica", 75);
	textHitsLabel->setPosition(Vec2(Director::getInstance()->getVisibleSize().width*0.1, Director::getInstance()->getVisibleSize().height*0.975));
	textHitsLabel->setName("HitText");
	addChild(textHitsLabel);

	_bubbleName = create2dVectorSprite(level.columns, level.rows);
	_LetterName = create2dVectorLetter(level.columns, level.rows);
	level.tiles = create2dVectorTiles(level.columns, level.rows);

	for (int i = 0; i < level.columns; i++) {
		for (int j = 0; j < level.rows; j++) {
			level.tiles[i][j] = new TileData(i, j, 0, 0);
		}
	}
	auto tilesdata = level.tiles;

	auto bubbleSizeReference = Sprite::createWithSpriteFrameName("bubble_shooter/red_ball.png");
	level.tilewidth = bubbleSizeReference->getContentSize().width;  // Visual width of a tile
	level.tileheight = bubbleSizeReference->getContentSize().height; // Visual height of a tile
	level.rowheight = bubbleSizeReference->getContentSize().height * 0.85;  // Height of a row
	level.radius = bubbleSizeReference->getContentSize().width * 0.52;     // Bubble collision radius

																		   // Define a level width and height
	level.width = level.columns * level.tilewidth + level.tilewidth / 2;
	level.height = (level.rows) * level.rowheight + level.tileheight;

	// Set the gamestate to ready
	setGameState(gamestates.ready);

	letterSprite.resize(numberOfLetter);
	int bubblelevelValues = 1;


	for (int i = 0; i < vmc.size(); i++)
		letterSprite[i] = vmc[i].question;

	int color = 3, repeat = 4;
	// Create the level of bubbles
	createLevel(color, repeat);

	auto trnspImg = Sprite::createWithSpriteFrameName("bubble_shooter/pixel.png");
	trnspImg->setName("touch");
	trnspImg->setAnchorPoint(Vec2(0, 0));        trnspImg->setPosition(Vec2(0, 0));       trnspImg->setOpacity(0);
	getChildByName("bg")->getChildByName("Panel_2")->addChild(trnspImg);

	// Set the gun Pointer
	auto gun = Sprite::createWithSpriteFrameName("bubble_shooter/gun_tricker.png");
	gun->setAnchorPoint(Vec2(0.5, 0.5));
	gun->setPosition(Vec2(trnspImg->getContentSize().width / 2, Director::getInstance()->getVisibleSize().height*0.08));
	gun->setName("gunPointer");
	addChild(gun);

	//Set the gun Base
	auto gunBase = Sprite::createWithSpriteFrameName("bubble_shooter/gun.png");
	gunBase->setPosition(Vec2(trnspImg->getContentSize().width / 2, Director::getInstance()->getVisibleSize().height * 0.0560));
	addChild(gunBase);
	gunBase->setName("gunbase");

	player = new Player();
	// Init the this.player in gun 
	player->x = gunBase->getPositionX();
	//console.log("this.player.x = "+(this.level.x + this.level.width/2 - this.level.tilewidth/2) + "  this.level.x : "+this.level.x+" this.level.width/2 : "+this.level.width/2+" this.level.tilewidth/2 : "+this.level.tilewidth/2);
	player->y = Director::getInstance()->getVisibleSize().height - gunBase->getPositionY();

	player->angle = 90;
	player->tiletype = 0;

	// Init the next-this.player
	player->nextbubble.x = player->x - 3 * level.tilewidth;
	player->nextbubble.y = player->y;

	// Init the next bubble and set the current bubble
	nextBubble();
	nextBubble();
	angle = 0;

	if (player->bubble.tiletype == -1) {
		player->bubble.tiletype = floor(getRandomArbitrary(0, _bubblecolors));
	}

	auto bubblePlayer = Sprite::createWithSpriteFrameName(imageSprite[player->bubble.tiletype] + ".png");
	bubblePlayer->setName("bubblePlayer");
	bubblePlayer->setPosition(Vec2(gunBase->getPositionX(), getPositionY() + bubblePlayer->getContentSize().width / 2));
	addChild(bubblePlayer, 1);

	auto letterPlayer = CommonLabelTTF::create(letterSprite[player->bubble.tiletype], "Helvetica", 150);
	bubblePlayer->addChild(letterPlayer);
	letterPlayer->setName("letterPlayer");

	if (player->nextbubble.tiletype == -1) {
		player->nextbubble.tiletype = floor(getRandomArbitrary(0, _bubblecolors));
	}

	auto nextBubblePlayer = Sprite::createWithSpriteFrameName(_imageSprite[player->nextbubble.tiletype] + ".png");
	auto nextLetterPlayer = CommonLabelTTF::create(letterSprite[player->nextbubble.tiletype], "Helvetica", 150);
	nextBubblePlayer->setName("nextBubblePlayer"); nextLetterPlayer->setName("nextLetterPlayer");
	nextBubblePlayer->setPosition(Vec2(gunBase->getPositionX() - 300, getPositionY() + nextBubblePlayer->getContentSize().width / 2));
	addChild(nextBubblePlayer);
	nextBubblePlayer->addChild(nextLetterPlayer);
	renderTiles();
	bgListner();

	auto extendedPanel = bg->getChildByName("extend");
	extendedPanel->setScaleX(-(bubblePlayer->getContentSize().width / 2));

	auto gamePlayAreaWidth = 2560 - (bubblePlayer->getContentSize().width / 2);
	auto widthAreaExtendPart = Director::getInstance()->getVisibleSize().width - gamePlayAreaWidth;
	auto extendedGameX = (gamePlayAreaWidth + (gamePlayAreaWidth + widthAreaExtendPart)) / 2;

	auto extendLetter = CommonLabelTTF::create(letterSprite[player->bubble.tiletype], "Helvetica", widthAreaExtendPart * 2);
	extendLetter->setPosition(Vec2(extendedGameX - (widthAreaExtendPart * 0.25), Director::getInstance()->getVisibleSize().height * 0.5));
	addChild(extendLetter);
	extendLetter->setName("extendletter");

	if (Director::getInstance()->getVisibleSize().width > 2560) {
		extendLetter->setFontSize(widthAreaExtendPart*1.3);
	}
	else if (Director::getInstance()->getVisibleSize().width == 2560) {
		extendedGameX = extendedGameX - 45;
	}

	if (_menuContext->getCurrentLevel() == 1) {
		auto window = Director::getInstance()->getVisibleSize();
		auto help = HelpLayer::create(Rect((window.width - (window.width - 2560)) * 0.5, window.height *0.75, window.width - (window.width - 2560), window.height *0.5), Rect(this->getChildByName("gunbase")->getPositionX(), this->getChildByName("gunbase")->getPositionY(), this->getChildByName("bubblePlayer")->getContentSize().width, this->getChildByName("bubblePlayer")->getContentSize().height));
		addChild(help, 4);
		_helpActive = true;
		help->setName("help");
		// help.click((this.xPosi/2)+targetB.x,targetB.y);
	}


	this->scheduleUpdate();

}

void BubbleShooter::update(float delta) {

	// Render player bubble
	if (!(gamestate == gamestates.gameComplete)) {
		// console.log("the value of gameOver condition is : "+ this.gamestate + " the value of complete game is : "+this.gamestates.gameComplete);
		renderPlayer();
	}

	if (gamestate == gamestates.ready) {
		// Game is ready for player input
	}
	else if (gamestate == gamestates.shootbubble && !_menuContext->isGamePaused()) {
		// Bubble is moving
		this->stateShootBubble(delta);
	}
	else if (gamestate == gamestates.removecluster && (!killBubble)) {
		// Remove cluster and drop tiles
		stateRemoveCluster();
	}
	else if (this->gamestate == this->gamestates.gameover) {
		CCLOG("game over bro !!");
		_menuContext->setMaxPoints(this->counterhits);
		_menuContext->addPoints(0);
		CCLOG("showscore game over");
		_menuContext->showScore();
		this->unscheduleUpdate();
	}
}

void BubbleShooter::bgListner() {
	auto classReference = this;
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(false);

	listener->onTouchBegan = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		Size targetSize = target->getContentSize();
		auto location = target->convertToNodeSpace(touch->getLocation());
		Rect targetRect = Rect(0, 0, targetSize.width, targetSize.height);
		
		if (targetRect.containsPoint(location)) {
			return true;
		}
		return false;
	};

	listener->onTouchMoved = [=](cocos2d::Touch* touch, cocos2d::Event* event) {
		auto target = event->getCurrentTarget();
		auto location = target->convertToNodeSpace(touch->getLocation());
		auto xClickedPosition = floor(location.x);
		auto yClickedPosition = (Director::getInstance()->getVisibleSize().height - floor(location.y));
		this->onMouseMove(xClickedPosition, yClickedPosition);
	};

	listener->onTouchEnded = [=](cocos2d::Touch* touch, cocos2d::Event* event) {
		auto target = event->getCurrentTarget();
		auto location = target->convertToNodeSpace(touch->getLocation());
		auto xClickedPosition = floor(location.x);
		auto yClickedPosition = (Director::getInstance()->getVisibleSize().height - floor(location.y));

		classReference->gunMove(xClickedPosition, yClickedPosition);
	};

	auto touchBg = this->getChildByName("bg")->getChildByName("Panel_2")->getChildByName("touch");
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, touchBg);
}

void BubbleShooter::createLevel(int color,int repeat) {

	// Number of different colors
	_bubblecolors = color;

	int randomtile = 0, newtile = 0;

	// Create a level with random tiles
	for (int j = 0; j < level.rows; j++) {

		randomtile = floor(getRandomArbitrary(0, _bubblecolors));

		int count = 0;
		for (int i = 0; i < level.columns; i++) {

			if (count >= repeat) {

				// Change the random tile
				newtile = floor(getRandomArbitrary(0, _bubblecolors));
					if (newtile == randomtile) {
						newtile = (newtile + 1) % _bubblecolors;
					}
					randomtile = newtile;
					count = 0;
			}
			count++;
			// 4 means only 4 rows render   
			if (j < (3)) {

				level.tiles[i][j]->type = randomtile;
			}
			else {
				level.tiles[i][j]->type = -1;
			}
		}
	}
	auto tilwData = level.tiles;
	auto x = 1;
}

void BubbleShooter::renderTiles() {

	// Top to bottom       
	for (int j = 0; j < level.rows; j++) {
		for (int i = 0; i < level.columns; i++) {
			// Get the tile
			auto tile = level.tiles[i][j];

			// Get the shift of the tile for animation
			auto shift = tile->shift;

			// Calculate the tile coordinates
			auto coord = getTileCoordinate(i, j);

			// Check if there is a tile present
			if (tile->type >= 0) {

				// Draw the tile using the color
				_bubbleName[i][j] = drawBubbleGroups(coord.first, coord.second + shift, tile->type, i, j);
				_LetterName[i][j] = drawLetterGroups(_bubbleName[i][j]->getContentSize().width / 2, _bubbleName[i][j]->getContentSize().height / 2, tile->type, i, j);
				_bubbleName[i][j]->addChild(_LetterName[i][j]);
				_bubbleName[i][j]->setName(letterSprite[tile->type]);
				_LetterName[i][j]->setName(letterSprite[tile->type]);
			}
		}
	}
	//  console.log("the number of column and row is : "+this.level.rows +"   "+this.level.columns)
	// console.log(bubbleName);
}

// Render the player bubble
void BubbleShooter::renderPlayer() {

	// Draw the bubble in gun
	if (player->nextbubble.tiletype == -1) {
		player->nextbubble.tiletype = floor(getRandomArbitrary(0, _bubblecolors));
	}

	if (player->nextbubble.tiletype != -1) {
		// Draw the next bubble which will come in gun
		drawNextBubble(player->nextbubble.x, player->nextbubble.y, player->nextbubble.tiletype);
		drawNextLetter(player->nextbubble.x, player->nextbubble.y,player->nextbubble.tiletype);
	}
	// Draw the bubble in gun
	if (player->bubble.tiletype == -1) {
		player->bubble.tiletype = floor(getRandomArbitrary(0, _bubblecolors));
		_mainPlayerBubbleDestroy = true;
	}

	if (player->bubble.visible && player->bubble.tiletype != -1) {
		drawBubble(player->bubble.x, player->bubble.y, player->bubble.tiletype);  
		//  console.log("done 385" + this.mainPlayerBubbleDestroy);               
	}
}

std::vector<std::vector<Sprite*>> BubbleShooter::create2dVectorSprite(int column, int row)
{
	std::vector<std::vector<Sprite*>> tempContainer;

	tempContainer.resize(column);
	for (int i = 0; i < column; ++i)
		tempContainer[i].resize(row);

	return tempContainer;
}

std::vector<std::vector<CommonLabelTTF*>> BubbleShooter::create2dVectorLetter(int column, int row)
{
	std::vector<std::vector<CommonLabelTTF*>> tempContainer;

	tempContainer.resize(column);
	for (int i = 0; i < column; ++i)
		tempContainer[i].resize(row);

	return tempContainer;
}

std::vector<std::vector<TileData*>> BubbleShooter::create2dVectorTiles(int column, int row)
{
	std::vector<std::vector<TileData*>> tempContainer;

	tempContainer.resize(column);
	for (int i = 0; i < column; ++i)
		tempContainer[i].resize(row);

	return tempContainer;
}

void BubbleShooter::setGameState(int newgamestate) {
	gamestate = newgamestate;
	animationstate = 0;
	animationtime = 0;
}

int BubbleShooter::getRandomInt(int min,int max) {
	return floor(rand_0_1() * (max - min + 1)) + min;
}

int BubbleShooter::getRandomArbitrary(int min,int max) {
	return rand_0_1() * (max - min) + min;
}

std::vector<std::pair<int, int>> BubbleShooter::neighborsoffsets(int oddEven) {
	
	std::vector<std::pair<int, int>> neighbourCoord;
	
	if (oddEven == 0) {
		neighbourCoord.push_back(std::make_pair(1, 0));
		neighbourCoord.push_back(std::make_pair(0, 1));
		neighbourCoord.push_back(std::make_pair(-1, 1));
		neighbourCoord.push_back(std::make_pair(-1, 0));
		neighbourCoord.push_back(std::make_pair(-1, -1));
		neighbourCoord.push_back(std::make_pair(0, -1));
	}
	else{
		neighbourCoord.push_back(std::make_pair(1, 0));
		neighbourCoord.push_back(std::make_pair(1, 1));
		neighbourCoord.push_back(std::make_pair(0, 1));
		neighbourCoord.push_back(std::make_pair(-1, 0));
		neighbourCoord.push_back(std::make_pair(0, -1));
		neighbourCoord.push_back(std::make_pair(1, -1));
	}
	return neighbourCoord;
}

// Get the tile coordinate
std::pair<float, float> BubbleShooter::getTileCoordinate(int column,int row) {
	auto tilex = level.x + column * level.tilewidth;

	// X offset for odd or even rows
	if ((row + rowoffset) % 2) {
		tilex += level.tilewidth / 2;
	}
	auto tiley = (Director::getInstance()->getVisibleSize().height - 80) - (level.y + (row * level.rowheight));
	return std::make_pair(tilex,tiley);
}

// Draw the bubble
Sprite* BubbleShooter::drawBubbleGroups(float x,float y,int index,int col,int row) {
	if (index < 0 || index >= _bubblecolors)
		return NULL;

	// Draw the bubble sprite
	auto data = Sprite::createWithSpriteFrameName(_imageSprite[index] + ".png");
	data->setPosition(Vec2(x, y));
	data->setAnchorPoint(Vec2(0, 0));
	addChild(data);
	return data;
}

// Draw the bubble
void BubbleShooter::drawNextBubble(float x,float y,int index) {
	if (index < 0 || index >= _bubblecolors)
		return;

	// Draw the bubble sprite
	if (this->getChildByName("nextBubblePlayer"))
		this->removeChild(this->getChildByName("nextBubblePlayer"));

	auto nextBubblePlayer = Sprite::createWithSpriteFrameName(_imageSprite[index] + ".png");
	nextBubblePlayer->setPosition(Vec2(this->getChildByName("gunbase")->getPositionX() - 380, this->getChildByName("gunbase")->getPositionY()));
	nextBubblePlayer->setName("nextBubblePlayer");
	addChild(nextBubblePlayer);
}

// Draw the bubble
void BubbleShooter::drawNextLetter(float x, float y, int index) {
	if (index < 0 || index >= _bubblecolors) {
	
	}
	else {
		auto nextLetterPlayer = CommonLabelTTF::create(letterSprite[player->nextbubble.tiletype], "Helvetica", 120);
		nextLetterPlayer->setPosition(Vec2(this->getChildByName("nextBubblePlayer")->getContentSize().width / 2, this->getChildByName("nextBubblePlayer")->getContentSize().height / 2));
		this->getChildByName("nextBubblePlayer")->addChild(nextLetterPlayer);
		//nextLetterPlayer->setAnchorPoint(0.5, 0.5);
	}
}

// Draw the bubble
void BubbleShooter::drawBubble(float x,float y,int index) {

	if (index < 0 || index >= _bubblecolors)
		return;

	// Use to kill the previous bubble sprite

	if (_mainPlayerBubbleDestroy) {
	
		if (this->getChildByName("bubblePlayer")) {
			removeChildByName("bubblePlayer");
		}

		auto bubblePlayer = Sprite::createWithSpriteFrameName(_imageSprite[player->bubble.tiletype] + ".png");
		bubblePlayer->setName("bubblePlayer");
		addChild(bubblePlayer, 1);

		auto letterPlayer = CommonLabelTTF::create(letterSprite[player->bubble.tiletype], "Helvetica", 120);
		bubblePlayer->addChild(letterPlayer);
		letterPlayer->setName("letterPlayer");

		_mainPlayerBubbleDestroy = false;
	}

	this->getChildByName("bubblePlayer")->setPosition(player->bubble.x, (Director::getInstance()->getVisibleSize().height) - player->bubble.y);
	this->getChildByName("bubblePlayer")->getChildByName("letterPlayer")->setPosition(this->getChildByName("bubblePlayer")->getContentSize().width / 2, this->getChildByName("bubblePlayer")->getContentSize().height / 2);
	this->getChildByName("bubblePlayer")->setAnchorPoint(Vec2(0.5, 0.5));

}

// Draw the bubble
CommonLabelTTF* BubbleShooter::drawLetterGroups(float x, float y, int index, int col, int row) {
	if (index < 0 || index >= _bubblecolors)
		return NULL;

	// Draw the bubble sprite
	auto data = CommonLabelTTF::create("" + letterSprite[index], "Helvetica", 120);
	data->setPosition(Vec2(x, y));
	return data;
}

void BubbleShooter::setSpriteProperties(Sprite* ImageObject, float positionX, float positionY, float scaleX, float scaleY, float anchorX, float anchorY, float rotation, int zorder) {
	ImageObject->setPosition(Vec2(positionX, positionY));
	ImageObject->setScaleX(scaleX);
	ImageObject->setScaleY(scaleY);
	ImageObject->setAnchorPoint(Vec2(anchorX, anchorY));
	ImageObject->setRotation(rotation);
	ImageObject->setZOrder(zorder);
}

void BubbleShooter::gunMove(float x, float y) {
	// console.log("done 276");
	auto xPosi = 0;
	if (Director::getInstance()->getVisibleSize().width > 2560) {
		xPosi = Director::getInstance()->getVisibleSize().width - 2560;
	}
	this->onMouseMove(x, y);
	//console.log("x and y : " + x + "  " + y + " xPosi value is : " + xPosi);
	if (gamestate == gamestates.ready) {
		this->shootBubble();
		if (_helpActive) {
			_helpActive = false;
			removeChildByName("help");
		}
	}
}

void BubbleShooter::onMouseMove(float posx,float posy) {
	//  console.log("on Move move : -> the posX : "+posx + " the posY : "+posy);
	auto mouseangle = 0.0f;

	// Get the mouse angle
	mouseangle = radToDeg(atan2((player->y + level.tileheight / 2) - posy, posx - (player->x + level.tilewidth / 2)));
	//  console.log("pointer position :  "+posx +" "+posy +" angle : "+mouseangle);     

	// Convert range to 0, 360 degrees
	if (mouseangle < 0) {
		mouseangle = 180 + (180 + mouseangle);
	}

	// Restrict angle to 8, 172 degrees
	auto lbound = 8;
	auto ubound = 172;
	if (mouseangle > 90 && mouseangle < 270) {
		// Left
		if (mouseangle > ubound) {
			mouseangle = ubound;
		}
	}
	else {
		// Right
		if (mouseangle < lbound || mouseangle >= 270) {
			mouseangle = lbound;
		}
	}

	this->getChildByName("gunPointer")->setRotation((90 - mouseangle));
	//console.log(" gun rotation value is : " + this.gun.getRotation() + " mouse angle is : " + mouseangle);
	// Set the player angle
	player->angle = mouseangle;
}


void BubbleShooter::stateShootBubble(float dt) {

	// Bubble is moving
	// Move the bubble in the direction of the mouse
	player->bubble.x += dt * player->bubble.speed * cos(this->degToRad(player->bubble.angle));
	player->bubble.y += dt * player->bubble.speed * -1 * sin(this->degToRad(player->bubble.angle));

	if (player->bubble.visible) {
		drawBubble(player->bubble.x, player->bubble.y, player->bubble.tiletype);
	}

	// Handle left and right collisions with the level
	if (player->bubble.x <= this->getChildByName("bubblePlayer")->getContentSize().width / 2) {
		//  console.log("");
		// Left edge
		player->bubble.angle = 180 - player->bubble.angle;
		player->bubble.x = this->getChildByName("bubblePlayer")->getContentSize().width / 2;
	}
	else if ((player->bubble.x + this->getChildByName("bubblePlayer")->getContentSize().width / 2) >= (level.x + level.width)) {
		// Right edge
		player->bubble.angle = 180 - player->bubble.angle;
		player->bubble.x = level.x + level.width - this->getChildByName("bubblePlayer")->getContentSize().width / 2;
	}

	// Collisions with the top of the level
	if (player->bubble.y <= level.y) {
		// Top collision
		player->bubble.y = level.y;
		// console.log("done 478");
		this->snapBubble();
		return;
	}

	// Collisions with other tiles
	for (int i = 0; i < level.columns; i++) {
		for (int j = 0; j < level.rows; j++) {
			auto tile = level.tiles[i][j];

			// Skip empty tiles
			if (tile->type < 0) {
				continue;
			}
			// Check for intersections
			auto coord = getTileCoordinate(i, j);

			if (this->circleIntersection(player->bubble.x + level.tilewidth / 2,
				player->bubble.y + level.tileheight / 2,
				level.radius,
				coord.first + level.tilewidth / 2,
				Director::getInstance()->getVisibleSize().height - (coord.second + level.tileheight / 2),
				level.radius)) {

				// Intersection with a level bubble
				this->snapBubble();
				return;
			}
		}
	}
}

// Check if two circles intersect
bool BubbleShooter::circleIntersection(float x1,float y1,float r1,float x2, float y2,float r2) {
	// Calculate the distance between the centers
	auto dx = x1 - x2;
	auto dy = y1 - y2;
	auto len = sqrt(dx * dx + dy * dy);

	if (len < r1 + r2) {
		// Circles intersect 
		CCLOG("INTERSECTION DONE !!!!");
		return true;
	}
	return false;
}

// Shoot the bubble
void BubbleShooter::shootBubble() {

	// Shoot the bubble in the direction of the mouse
	player->bubble.x = player->x;
	player->bubble.y = player->y;
	player->bubble.angle = player->angle;
	player->bubble.tiletype = player->tiletype;
	// Set the gamestate
	setGameState(gamestates.shootbubble);

	if (this->getChildByName("extendletter")) {    
		((CommonLabelTTF*)this->getChildByName("extendletter"))->setString(letterSprite[player->nextbubble.tiletype]);
	}
}

void BubbleShooter::snapBubble() {

	// Get the grid position
	auto centerx = player->bubble.x + level.tilewidth / 2;
	auto centery = player->bubble.y + level.tileheight / 2;
	auto gridpos = getGridPosition(centerx, centery);
	//console.log("gridpos x and y : " + gridpos.x + "  " + gridpos.y);
	// console.log("done 512");
	// // Make sure the grid position is valid
	if (gridpos.first < 0) {
		gridpos.first = 0;
	}

	if (gridpos.first >= level.columns) {
		gridpos.first = level.columns - 1;
	}

	if (gridpos.second < 0) {
		gridpos.second = 0;
	}

	if (gridpos.second >= level.rows) {
		gridpos.second = level.rows - 1;
	}

	// Check if the tile is empty
	auto addtile = false;

	auto tiles = level.tiles[gridpos.first][gridpos.second];
	auto ll = level;

	if (level.tiles[gridpos.first][gridpos.second]->type != -1) {
		// Tile is not empty, shift the new tile downwards
		for (int newrow = gridpos.second + 1; newrow < level.rows; newrow++) {

			if (level.tiles[gridpos.first][newrow]->type == -1) {
				gridpos.second = newrow;
				addtile = true;
				break;
			}
		}
	}
	else {
		addtile = true;
	}

	// Add the tile to the grid
	if (addtile) {
		++ this->counterhits;
		//  ++this.count;
		//  this.hits--;
		// console.log("done 553");
		//console.log(" ---------------  you hited " + (++ this.counterhits) + " balls --------------------");
		//   console.log("hits remaining : "+ this.hits + " count value is : " + this.count);
		//    this.DataCard();
		std::ostringstream HitNumber;
		auto hitTextLabel = TextGenerator::getInstance()->translateString("Hits : ");
		HitNumber << hitTextLabel << counterhits;

		((CommonLabelTTF*)this->getChildByName("HitText"))->setString(HitNumber.str());
		if (counterhits == 7) {
			//    this.DataCard();
		}

		// Hide the player bubble
		player->bubble.visible = false;

		//Flag to manage the main bubblePlayer
		_mainPlayerBubbleDestroy = true;

		// Set the tile
		level.tiles[gridpos.first][gridpos.second]->type = player->bubble.tiletype;

		_bubbleName[gridpos.first][gridpos.second] = (Sprite*)this->getChildByName("bubblePlayer");
		_LetterName[gridpos.first][gridpos.second] = (CommonLabelTTF*)this->getChildByName("bubblePlayer")->getChildByName("letterPlayer");
		checkBubbleStatus();
		// Check for game over
		if (this->checkGameOver()) {
			// console.log("game over now .........")
			return;
		}
		// console.log("done 578");
		// Find clusters
		_cluster.clear();
		_cluster = this->findCluster(gridpos.first, gridpos.second, true, true, false);
		// console.log("cluster size is : "+ this.cluster.length);

		//  if( this.hits < 0 ){
		//  console.log(" GAME OVER  ");
		//  this.setGameState(this.this.gamestates.gameover);
		//  return;
		// }
		// console.log("done 588");
		if (_cluster.size() >= 3) {
			//  Remove the cluster
			killBubble = false;
			this->setGameState(gamestates.removecluster);

			return;
		}
		else {
			//console.log("not matched --- > 518  " + ++this.negativePoints);
		}
	}

	// Next bubble
	nextBubble();

	setGameState(gamestates.ready);

}

std::pair<float, float> BubbleShooter::getGridPosition(float x,float y) {
	int gridy = floor((y - level.y) / level.rowheight);

	// Check for offset
	auto xoffset = 0.0f;
	if ((gridy + rowoffset) % 2) {
		xoffset = level.tilewidth / 2;
	}
	auto gridx = floor(((x - xoffset) - level.x) / level.tilewidth);

	return std::make_pair(gridx, gridy);
}

void BubbleShooter::checkBubbleStatus() {

for (int j = 0; j < level.rows; j++) {
	for (int i = 0; i < level.columns; i++) {

		auto tile = level.tiles[i][j];

		if (tile->type >= 0) {
			this->removeChild(this->_bubbleName[i][j]);
		}
	}
}

this->renderTiles();
}

bool BubbleShooter::checkGameOver() {
	// Check for game over
	for (int i = 0; i < level.columns; i++) {
		// Check if there are bubbles in the bottom row
		if (level.tiles[i][level.rows - 1]->type != -1) {
			// Game over
			nextBubble();
			setGameState(gamestates.gameover);
			return true;
		}
	}

	return false;
}

// Find cluster at the specified tile location
std::vector<TileData *> BubbleShooter::findCluster(float tx,float ty,bool matchtype,bool reset,bool skipremoved) {
	// Reset the processed flags
	if (reset) {
		this->resetProcessed();
	}

	// Get the target tile. Tile coord must be valid.
	auto targettile = this->level.tiles[tx][ty];

	// Initialize the toprocess array with the specified tile
	std::vector<TileData *> toprocess;
	toprocess.push_back(targettile);

	targettile->processed = true;
	std::vector<TileData *> foundcluster;

	while (toprocess.size() > 0) {
		// Pop the last element from the array
		auto currenttile = toprocess[toprocess.size()-1];
		toprocess.pop_back();

		// Skip processed and empty tiles
		if (currenttile->type == -1) {
			continue;
		}

		// Skip tiles with the removed flag
		if (skipremoved && currenttile->removed) {
			continue;
		}

		// Check if current tile has the right type, if matchtype is true
		if (!matchtype || (currenttile->type == targettile->type)) {
			// Add current tile to the cluster
			foundcluster.push_back(currenttile);

			// Get the neighbors of the current tile
			auto neighbors = this->getNeighbors(currenttile);

			// Check the type of each neighbor
			for (int i = 0; i < neighbors.size(); i++) {
				if (!neighbors[i]->processed) {
					// Add the neighbor to the toprocess array
					toprocess.push_back(neighbors[i]);
					neighbors[i]->processed = true;
				}
			}
		}
	}

	// Return theu found cluster
	return foundcluster;
}

// Get the neighbors of the specified tile
std::vector<TileData *> BubbleShooter::getNeighbors(TileData* tile) {
	auto tilerow = ((int)tile->y + this->rowoffset) % 2; // Even or odd row
	std::vector<TileData *> neighbors;

	// Get the neighbor offsets for the specified tile
	auto n = this->neighborsoffsets(tilerow);
	
	// Get the neighbors
	for (int i = 0; i < n.size(); i++) {
		// Neighbor coordinate
		auto nx = tile->x + n[i].first;
		auto ny = tile->y + n[i].second;

		// Make sure the tile is valid
		if (nx >= 0 && nx < level.columns && ny >= 0 && ny < level.rows) {
			neighbors.push_back(level.tiles[nx][ny]);
		}
	}

	return neighbors;
}

// Reset the processed flags
void BubbleShooter::resetProcessed() {
	for (int i = 0; i < level.columns; i++) {
		for (int j = 0; j < level.rows; j++) {
			level.tiles[i][j]->processed = false;
		}
	}
}

// Reset the removed flags
void BubbleShooter::resetRemoved() {
	for (int i = 0; i < level.columns; i++) {
		for (int j = 0; j < level.rows; j++) {
			level.tiles[i][j]->removed = false;
		}
	}
}

void BubbleShooter::stateRemoveCluster() {
	
	auto self = this;
	// console.log("done 622");      
	if (animationstate == 0) {
		this->resetRemoved();

		// Mark the tiles as removed
		for (int i = 0; i < _cluster.size(); i++) {
			// Set the removed flag
			_cluster[i]->removed = true;
		}

		// Find floating clusters
		_floatingclusters.clear();
		_floatingclusters = findFloatingClusters();
		//  console.log("float cluster : "+ this.floatingclusters.length);
		animationstate = 1;

	}

	if (animationstate == 1) {
		// Pop bubbles
		auto tilesleft = false;

		for (int i = 0; i < _cluster.size(); i++) {

			auto tile = _cluster[i];
			auto tempColorType = tile->type;
			if (tile->type >= 0) {
				tilesleft = true;

				// Alpha animation
				tile->alpha -= 0.025 * 15;

				if (tile->alpha < 0) {
					tile->alpha = 0;
				}

				if (tile->alpha == 0) {

					if (i != 0) {
						this->playerDie(tile->x, tile->y, tile->type);
					}

					if (i == 0) {
						//    this.game.world.bringToTop(this.bubbleName[tile.x][tile.y]);
						//    this.game.world.bringToTop(this.LetterName[tile.x][tile.y]);
						this->reorderChild(_bubbleName[tile->x][tile->y], 6);
						this->reorderChild(_LetterName[tile->x][tile->y], 6);

						//   this.bubbleName[tile.x][tile.y].setGlobalZOrder(5);
						//   this.LetterName[tile.x][tile.y].setGlobalZOrder(5);

						auto letterValue = letterSprite[player->bubble.tiletype];
						auto letterInchar = LangUtil::getInstance()->convertStringToUTF16Char(letterValue);

						_menuContext->pickAlphabet(letterInchar, letterInchar,true);

						_bubbleName[tile->x][tile->y]->setAnchorPoint(Vec2(0.5,0.5));
						_LetterName[tile->x][tile->y]->setAnchorPoint(Vec2(0.5, 0.5));

						_bubbleName[tile->x][tile->y]->runAction(ScaleTo::create(1.5, 3));

						_bubbleName[tile->x][tile->y]->runAction(MoveTo::create(1, Vec2(Director::getInstance()->getVisibleSize().width / 2, Director::getInstance()->getVisibleSize().height / 2)));
						_LetterName[tile->x][tile->y]->setName(_LetterName[tile->x][tile->y]->getName());
						if (!_LetterName[tile->x][tile->y]->getName().empty()) {
							auto alphabetName = _LetterName[tile->x][tile->y]->getName();
							auto audioPathForAlpha = getConvertInLowerCase(alphabetName);

							auto audioEngine = CocosDenshion::SimpleAudioEngine::getInstance();
							auto fileName = std::string("res/lang/eng/sounds") + audioPathForAlpha + ".wav";
							audioEngine->playEffect(fileName.c_str(), false);
						}

						auto playerDieCallFunc = CallFunc::create([=]()
						{
							finalFlag = true;
							removeChild(_bubbleName[tile->x][tile->y]);
							// renderPlayer();
						});
						this->runAction(Sequence::create(DelayTime::create(1.6), playerDieCallFunc, NULL));

						// Next bubble
						this->nextBubble();

					}

					tile->type = -1;
					tile->alpha = 1;
				}
			}
		}
		//    console.log("done 718");
		// Drop Floating bubbles 

		for (int i = 0; i < _floatingclusters.size(); i++) {
			for (int j = 0; j < _floatingclusters[i].size(); j++) {
				auto tile = _floatingclusters[i][j];

				if (tile->type >= 0) {
					tilesleft = true;

					// Accelerate dropped tiles
					tile->velocity += 0.025 * 700;
					tile->shift += 0.025 * tile->velocity;

					// Alpha animation
					tile->alpha -= 0.025 * 8;
					if (tile->alpha < 0) {
						tile->alpha = 0;
					}

					auto data = tile->y * level.rowheight + tile->shift;
					auto data1 = (level.rows - 1) * level.rowheight + level.tileheight;

					// Check if the bubbles are past the bottom of the level
					if (tile->alpha == 0 || (data < data1)) {

						tile->type = -1;
						tile->shift = 0;
						tile->alpha = 1;

						auto playerDieFunc = CallFunc::create([=]() 
						{
							playerDie(tile->x, tile->y, 7);
						});
						this->runAction(Sequence::create(DelayTime::create(0.15), playerDieFunc,NULL));
					}
				}
			}
		}
		//  console.log("done 775");
		if (finalFlag) {
			//   console.log("tiles left or not : "+tilesleft);
			if (!tilesleft) {

				// Check for game over
				auto tilefound = false;
				for (int i = 0; i < level.columns; i++) {
					for (int j = 0; j < level.rows; j++) {
						if (level.tiles[i][j]->type != -1) {
							tilefound = true;
							break;
						}
					}
				}
				//    console.log("tilefound is value is ------------> "+tilefound);
				if (tilefound) {
					// console.log("done 792");
					setGameState(this->gamestates.ready);

				}
				else {

					// No tiles left, game over

					setGameState(this->gamestates.gameComplete);
					// console.log("this.gamestate : -------------------------- >>>>>>  "+ this.gamestate);
					player->bubble.visible = false;
					this->DataCard("complete");
					//After game complete this method call
					//    console.log("the game is complete ");

				}
			}
			this->finalFlag = false;
		}
		//   console.log("done 825");
	}
}

void BubbleShooter::DataCard(std::string gamestatus) {
	//console.log("gamestatus : " + gamestatus + " -------------- ");
	//auto level = bubblelevelValues; //NTC
	auto level = _menuContext->getCurrentLevel();
	
		_menuContext->setMaxPoints(this->counterhits);
		_menuContext->addPoints(this->counterhits - this->_negativePoints);
		//  menuContext.addPoints(this.negativePoints);
		_menuContext->showScore();
}

void BubbleShooter::playerDie(float tilex,float tiley, int type) {

	//   this.animationBubbleBlast(bubbleName[tilex][tiley],type);       
	removeChild(_bubbleName[tilex][tiley]);
	auto audioEngine = CocosDenshion::SimpleAudioEngine::getInstance();
	audioEngine->playEffect("bubble_shooter/sounds/bubble_blast.wav", false);
}

// Find floating clusters
std::vector<std::vector<TileData *>> BubbleShooter::findFloatingClusters() {

	// Reset the processed flags
	this->resetProcessed();

	std::vector<std::vector<TileData *>> foundclusters;

	// Check all tiles
	for (int i = 0; i < level.columns; i++) {
		for (int j = 0; j < level.rows; j++) {
			auto tile = level.tiles[i][j];
			if (!tile->processed) {
				// Find all attached tiles
				auto foundcluster = findCluster(i, j, false, false, true);

				// There must be a tile in the cluster
				if (foundcluster.size() <= 0) {
					continue;
				}

				// Check if the cluster is floating
				auto floating = true;
				for (int k = 0; k < foundcluster.size(); k++) {
					if (foundcluster[k]->y == 0) {
						// Tile is attached to the roof
						floating = false;
						break;
					}
				}

				if (floating) {
					// Found a floating cluster
					foundclusters.push_back(foundcluster);
				}
			}
		}
	}
	return foundclusters;
}

std::string BubbleShooter::getConvertInLowerCase(string data)
{
	std::ostringstream blockName;
	int i = 0;
	while (data[i])
	{
		blockName << (char)tolower(data[i]);
		i++;
	}
	return blockName.str();
}

float BubbleShooter::radToDeg(float angle) {
	return angle * (180.0f / M_PI);
}

float BubbleShooter::degToRad(float angle) {
	return angle * (M_PI / 180.0f);
}

void BubbleShooter::nextBubble() {
	player->tiletype = player->nextbubble.tiletype;
	player->bubble.tiletype = player->nextbubble.tiletype;
	player->bubble.x = player->x;
	player->bubble.y = player->y;

	player->bubble.visible = true;

	// Get a random type from the existing colors
	auto nextcolor = getExistingColor();

	// Set the next bubble
	player->nextbubble.tiletype = nextcolor;
}

int BubbleShooter::getExistingColor() {

	auto  existingcolors = findColors();

	if (existingcolors.size() == 1) {
		return existingcolors[0];
	}

	if (existingcolors.size() == 2) {
		if (_flagSwitchTwoColor) {
			_flagSwitchTwoColor = false;
			return existingcolors[0];
		}
		else {
			_flagSwitchTwoColor = true;
			return existingcolors[1];
		}
	}

	int bubbletype = 0;
	if (existingcolors.size() > 0) {
		bubbletype = existingcolors[getRandomInt(0,existingcolors.size()-1)];
	}

	return bubbletype;
}

std::vector<int> BubbleShooter::findColors() {
	std::vector<int> foundcolors;
	std::vector<bool> colortable;

	for (int i = 0; i < _bubblecolors; i++) {
		colortable.push_back(false);
	}

	// Check all tiles
	for (int i = 0; i < level.columns; i++) {
		for (int j = 0; j < level.rows; j++) {
			auto tile = level.tiles[i][j];
			if (tile->type >= 0) {

				if (!colortable[tile->type]) {
					colortable[tile->type] = true;
					foundcolors.push_back(tile->type);
				}
			}
		}
	}
	return foundcolors;
}

std::vector<int> BubbleShooter::rndNumber(int color)
{
	std::vector<int> ArrayBubble;
	std::vector<int> newArrayBubble;

	for (int i = 0; i < 9; i++) {
		ArrayBubble.push_back(i);
	}
	for (int i = 0; i < color; i++) {

		auto temp = floor(this->getRandomArbitrary(0, ArrayBubble.size()));
		newArrayBubble.push_back(ArrayBubble[temp]);
		ArrayBubble.erase(std::remove(ArrayBubble.begin(), ArrayBubble.end(), ArrayBubble[temp]), ArrayBubble.end());
	}
	return  newArrayBubble;
}

BubbleShooter::BubbleShooter(){
}

BubbleShooter::~BubbleShooter(void)
{
	_eventDispatcher->removeCustomEventListeners("multipleChoiceQuiz");
}

TileData::TileData(float x, float y, int type, int shift) {
	this->x = x;
	this->y = y;
	this->type = type;
	this->removed = false;
	this->shift = shift;
	this->velocity = 0;
	this->alpha = 1;
	this->processed = false;
}
