#include "BubbleShooter.h"
#include "../menu/HelpLayer.h"
#include "../util/CommonLabelTTF.h"

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

	Node* bg = CSLoader::createNode("bubble_shooter/bubble_shooter_1.csb");
	addChild(bg);
	bg->setName("bg");

	_negativePoints = 0;
	_flagSwitchTwoColor = true;
	std::string imageSprite[8] = {"bubble_shooter/red_ball", "bubble_shooter/green_ball", "bubble_shooter/yellow_ball", "bubble_shooter/purple_ball", "bubble_shooter/blue_ball", "bubble_shooter/orange_ball", "bubble_shooter/yellow_ball", "bubble_shooter/blue_ball" };

	for (int i = 0; i < 8; i++)
		_imageSprite[i] = imageSprite[i];

	auto LangLetter = TextGenerator::getInstance()->getAllChars();

	int numberOfLetter = 3;
	if (numberOfLetter <= ceil(LangLetter.size() / 12)) {
		numberOfLetter = ceil(LangLetter.size() / 12);
	}

	auto textHitsLabel = CommonLabelTTF::create(TextGenerator::getInstance()->translateString("Hits : 0"), "Helvetica", 75);
	textHitsLabel->setPosition(Vec2(Director::getInstance()->getVisibleSize().width*0.1, Director::getInstance()->getVisibleSize().height*0.975));
	textHitsLabel->setName("HitText");
	addChild(textHitsLabel);
	
	/*
	level.tilewidth = bubbleSizeReference.width;  // Visual width of a tile
	level.tileheight = bubbleSizeReference.height; // Visual height of a tile
	level.rowheight = bubbleSizeReference.height * 0.85;  // Height of a row
	level.radius = bubbleSizeReference.width * 0.5;     // Bubble collision radius
	*/



	this->scheduleUpdate();
}

void BubbleShooter::update(float delta) {


}

std::vector<std::vector<Sprite*>> BubbleShooter::create2dVector(int row, int column)
{
	std::vector<std::vector<Sprite*>> tempContainer;

	tempContainer.resize(row);
	for (int i = 0; i < row; ++i)
		tempContainer[i].resize(column);

	return tempContainer;
}

std::initializer_list <int> BubbleShooter::neighborsoffsets(int oddEven) {	
	if (oddEven == 0)
		return {(1,0),(0,1),(-1,1),(-1,0),(-1,-1),(0,-1)};
	else 
		return { (1,0),(1,1),(0,1),(-1,0),(0,-1),(1,-1)};
}

BubbleShooter::~BubbleShooter(void)
{
	
}

TileData::TileData(int x, int y, int type, int shift) {
	this->x = x;
	this->y = y;
	this->type = type;
	this->removed = false;
	this->shift = shift;
	this->velocity = 0;
	this->alpha = 1;
	this->processed = false;
}