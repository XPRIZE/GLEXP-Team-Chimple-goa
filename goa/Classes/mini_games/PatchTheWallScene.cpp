#include "PatchTheWallScene.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../puzzle/CharGenerator.h"
#include "../puzzle/Alphabet.h"
#include "../lang/LangUtil.h"
#include "SimpleAudioEngine.h"
#include "../menu/StartMenuScene.h"
#include "string.h"

USING_NS_CC;

PatchTheWall::PatchTheWall(){
    
}
PatchTheWall::~PatchTheWall() {
	_eventDispatcher->removeCustomEventListeners("multipleChoiceQuiz");
}
Scene* PatchTheWall::createScene()
{
    auto scene = Scene::create();
    
    auto layer = PatchTheWall::create();
    scene->addChild(layer);
    
    layer->_menuContext = MenuContext::create(layer, PatchTheWall::gameName());
    scene->addChild(layer->_menuContext);
    
    return scene;
}

bool PatchTheWall::init()
{
    if (!Layer::init())
    {
        return false;
    }
    
    return true;
}

void PatchTheWall::onEnterTransitionDidFinish()
{
    visibleSize = Director::getInstance()->getVisibleSize();
    origin = Director::getInstance()->getVisibleOrigin();
    
    _patchBg = CSLoader::createNode("patchthewall/patchthewall.csb");
    this->addChild(_patchBg);
    
    _slideBar = (cocos2d::ui::Slider *)(_patchBg->getChildByName("Slider_3"));
    _slideBar->setPercent(0);
    _slideBar->setEnabled(false);
    
	_eventDispatcher->addCustomEventListener("multipleChoiceQuiz", CC_CALLBACK_1(PatchTheWall::gameBegin, this));

	_lesson.getMultiChoices(10, 0);
	
}

void PatchTheWall::gameBegin(cocos2d::EventCustom *eventCustom) {

	CCLOG("onLessonReady begin");
	std::string* buf = static_cast<std::string*>(eventCustom->getUserData());
	CCLOG("onLessonReady to unmarshallMultiChoices");
	vector<Lesson::MultiChoice> vmc = Lesson::unmarshallMultiChoices(buf);
	_vmc = vmc;

	vector<string> suffleVmcData;
	int counterVmc = 0;
	for (int i = 0; i < 10; i++) {
		suffleVmcData.push_back(vmc[counterVmc++].question);
	}

	std::random_shuffle(suffleVmcData.begin(), suffleVmcData.end());
	_matrix.resize(2);

	for (int i = 0; i < _matrix.size(); i++)
		_matrix[i].resize(5);

	counterVmc = 0;
	for (size_t i = 0; i < _matrix.size(); i++) {
		for (int j = 0; j < _matrix[0].size(); j++) {
			_matrix[i][j] = suffleVmcData[counterVmc++];
		}
	}

	int maxLengthWord = 0;

	for (int i = 0; i < _vmc.size(); i++) {
		
		if (maxLengthWord < _vmc[i].question.length()) {
			maxLengthWord = _vmc[i].question.length();
		}
		if (maxLengthWord < _vmc[i].answers[_vmc[i].correctAnswer].length()) {
			maxLengthWord = _vmc[i].answers[_vmc[i].correctAnswer].length();
		}
	}


	float _gridY = visibleSize.height * .19;
	for (int i = 0; i < 5; i++)
	{
		float _gridX = visibleSize.width * .80;

		for (int j = 0; j < 2; j++)
		{
			std::ostringstream _labelName;
			SpriteDetails._sprite = Sprite::createWithSpriteFrameName("patchthewall/alphagrid.png");
			SpriteDetails._sprite->setPosition(Vec2(_gridX, _gridY));
			this->addChild(SpriteDetails._sprite);
			SpriteDetails._sprite->setColor(Color3B(205, 133, 63));

			auto aplhabets = CommonLabelTTF::create(_matrix[j][i], LangUtil::getInstance()->getFontFile(), 120);
			float fontSize = std::max(float(30.0), float(130 - (maxLengthWord - 1) * 18));
			if (fontSize <= 30.0f) {
				fontSize = 45.0f;
			}
			aplhabets->setFontSize(fontSize);
			SpriteDetails._label = aplhabets;

			SpriteDetails._label->setPosition(Vec2(SpriteDetails._sprite->getPositionX(), SpriteDetails._sprite->getPositionY()));
			this->addChild(SpriteDetails._label);
			SpriteDetails._id = _matrix[j][i];
			SpriteDetails.xP = SpriteDetails._sprite->getPositionX();
			SpriteDetails.yP = SpriteDetails._sprite->getPositionY();
			SpriteDetails._sequence = _spriteDetails.size();
			_labelName << _spriteDetails.size();
			SpriteDetails._label->setName(_labelName.str());

			_spriteDetails.push_back(SpriteDetails);
			_gridX += SpriteDetails._sprite->getContentSize().width * 1.05;

			addEvents(SpriteDetails);
		}
		_gridY += _spriteDetails.at(0)._sprite->getContentSize().height * 1.02;
	}

	_gridY = visibleSize.height * .18;
	for (int i = 0; i < 5; i++)
	{
		float _gridX = visibleSize.width * .20;
		for (int j = 0; j < 5; j++)
		{
			Position.x = _gridX;
			Position.y = _gridY;
			Position._flag = 0;
			Position._sequence = _position.size();
			_position.push_back(Position);
			_gridX += SpriteDetails._sprite->getContentSize().width * 1.05;
		}
		_gridY += _spriteDetails.at(0)._sprite->getContentSize().height * 1.02;
	}

	_level = _menuContext->getCurrentLevel();
	_menuContext->setMaxPoints(20);
	_moveFlag = 1;
	_helpFlag = 0;
	blastCome(0);
	if (_level != 1)
	{
		_helpFlag = -1;
		_moveFlag = 0;
		this->schedule(schedule_selector(PatchTheWall::blastCome), 5.0f);
	}

}

void PatchTheWall::addEvents(struct SpriteDetails sprite)
{
    auto listener = cocos2d::EventListenerTouchOneByOne::create();
    listener->setSwallowTouches(true);
    
    listener->onTouchBegan = [=](cocos2d::Touch *touch, cocos2d::Event *event)
    {
        auto target = static_cast<Sprite*>(event->getCurrentTarget());
        Point locationInNode = target->convertToNodeSpace(touch->getLocation());
        Size size = target->getContentSize();
        Rect rect = Rect(0, 0, size.width, size.height);
        
        if (rect.containsPoint(locationInNode) && _moveFlag==0)
        {
			target->setScale(1.5);
            if (_helpFlag == 1)
            {
                this->removeChild(_help);
                _helpFlag = -1;
                blastCome(0);
                this->schedule(schedule_selector(PatchTheWall::blastCome), 5.0f);
            }
            
            _moveFlag = 1;
            return true;
        }
        return false;
    };
    
    listener->onTouchMoved = [=](cocos2d::Touch *touch, cocos2d::Event *event)
    {
        auto target = event->getCurrentTarget();
        target->setPosition(touch->getLocation());
    };
    
    listener->onTouchEnded = [=](cocos2d::Touch *touch, cocos2d::Event *event)
    {
        int flag = 0;
        auto target = event->getCurrentTarget();
        Rect _targetRect = target->getBoundingBox();
        std::string _targetName = target->getName();
        int _index = atoi(_targetName.c_str());
        for (int i = 0; i < _patchDetails.size(); i++)
        {
            Rect _patchRect = _patchDetails.at(i)._label->getBoundingBox();
            
            if (_patchRect.intersectsRect(_targetRect) && checkAnswer(_spriteDetails.at(_index)._label->getString(), _patchDetails.at(i)._label->getString()))//(_spriteDetails.at(_index)._id == _patchDetails.at(i)._id))
            {
                _spriteDetails.at(_index)._label->runAction(Sequence::create(MoveTo::create(.2, Vec2(_patchDetails.at(i)._label->getPositionX(), _patchDetails.at(i)._label->getPositionY())),
                                                                             CallFunc::create([=] {
                    this->removeChild(_patchDetails.at(i)._label);
//                    _position.at(_patchDetails.at(i)._sequence)._flag = 0;
                   
                    _menuContext->addPoints(1);
					auto a =  (LangUtil::getInstance()->convertStringToUTF16Char(_patchDetails.at(i)._id));
					auto b =  (LangUtil::getInstance()->convertStringToUTF16Char(_spriteDetails.at(_index)._id));
					_menuContext->pickAlphabet(a,b , true);
					_patchDetails.erase(_patchDetails.begin() + i);
					_moveFlag = 0;
                    _totalCount++;
                    CocosDenshion::SimpleAudioEngine *success = CocosDenshion::SimpleAudioEngine::getInstance();
                    success->playEffect("sounds/sfx/success.ogg", false);
					target->setScale(1);
                    _spriteDetails.at(_index)._label->setPosition(Vec2(_spriteDetails.at(_index).xP, _spriteDetails.at(_index).yP));
                    _slideBar->setPercent(_slideBar->getPercent() + 5);
                    if (_totalCount == 20)
                    {
                        _menuContext->showScore();
                    }
                    
                }), NULL));
                
                flag = 1;
                break;
            }
        }
        
        if (flag == 0)
        {
			target->setScale(1);
            target->runAction(Sequence::create(MoveTo::create(.5, Vec2(_spriteDetails.at(_index).xP, _spriteDetails.at(_index).yP)), CallFunc::create([=]{
                _moveFlag = 0;
                CocosDenshion::SimpleAudioEngine *error = CocosDenshion::SimpleAudioEngine::getInstance();
                error->playEffect("sounds/sfx/error.ogg", false);
                _menuContext->addPoints(-1);


				auto letterPick = _spriteDetails.at(_index)._id;
				auto charString = LangUtil::getInstance()->getAllCharacters();
				auto templetterPick = letterPick;

				while (true) {
					templetterPick = charString[RandomHelper::random_int(1, LangUtil::getInstance()->getNumberOfCharacters() - 2)];
					if (letterPick != templetterPick)
						break;
				}

				_menuContext->pickAlphabet((LangUtil::getInstance()->convertStringToUTF16Char(letterPick)), (LangUtil::getInstance()->convertStringToUTF16Char(templetterPick)), true);

            }), NULL));
        }
    };
    
    cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener->clone(), sprite._label);
}


void PatchTheWall::blastCome(float _time)
{
    if (_totalLetter < 20)
    {
        int _randomPosition;
/*       while (1)
        {
            _randomPosition = (rand() % _position.size() - 1);
            if (_position.at(_randomPosition)._flag == 0)
            {
                _position.at(_randomPosition)._flag = 1;
                break;
            }
        }
*/        
		_randomPosition = (rand() % _position.size());

        Node *_blastNode = CSLoader::createNode("patchthewall/blast.csb");
        auto _blastTimeline = CSLoader::createTimeline("patchthewall/blast.csb");
        _blastNode->setPosition(Vec2(_position.at(_randomPosition).x, _position.at(_randomPosition).y));
        this->addChild(_blastNode);
        
		auto audioBg = CocosDenshion::SimpleAudioEngine::getInstance();
		-audioBg->playEffect("cannonball/gamesound/meteorblast.ogg", false);

        _blastNode->runAction(_blastTimeline);
        _blastTimeline->play("blast", false);
        _blastTimeline->setAnimationEndCallFunc("blast", CC_CALLBACK_0(PatchTheWall::letterCome, this, _blastNode, _randomPosition));
    }
}

void PatchTheWall::letterCome(Node *blastNode, int _randomPosition)
{
    this->removeChild(blastNode);
    SpriteDetails._sprite = Sprite::createWithSpriteFrameName("patchthewall/alphagrid.png");
    SpriteDetails._sprite->setPosition(Vec2(_position.at(_randomPosition).x, _position.at(_randomPosition).y));
    //	this->addChild(SpriteDetails._sprite);
    
	_position.erase(_position.begin() + _randomPosition);

	auto randomIndex = cocos2d::RandomHelper::random_int(0, 9);
	auto text = _vmc[randomIndex].answers[_vmc[randomIndex].correctAnswer];

	int maxLengthWord = 0;

	for (int i = 0; i < _vmc.size(); i++) {
		if (maxLengthWord < _vmc[i].answers[_vmc[i].correctAnswer].length()) {
			maxLengthWord = _vmc[i].answers[_vmc[i].correctAnswer].length();
		}
		if (maxLengthWord < _vmc[i].question.length()) {
			maxLengthWord = _vmc[i].question.length();
		}
	}

	auto aplhabets = CommonLabelTTF::create(text, LangUtil::getInstance()->getFontFile(), 120);
	float fontSize = std::max(float(30.0), float(130 - (maxLengthWord - 1) * 18));
	if (fontSize <= 30.0f || fontSize > 150.0f) {
		fontSize = 45.0f;
	}
	aplhabets->setFontSize(fontSize);
	SpriteDetails._label = aplhabets;

    SpriteDetails._label->setPosition(Vec2(SpriteDetails._sprite->getPositionX(), SpriteDetails._sprite->getPositionY()));
    this->addChild(SpriteDetails._label);
    SpriteDetails._id = text;
    SpriteDetails.xP = SpriteDetails._sprite->getPositionX();
    SpriteDetails.yP = SpriteDetails._sprite->getPositionY();
    SpriteDetails._sequence = _randomPosition;
    _patchDetails.push_back(SpriteDetails);
    _totalLetter++;
    
    if (_helpFlag == 0)
    {
        for (int i = 0; i < _spriteDetails.size(); i++)
        {
            if (checkAnswer(_spriteDetails.at(i)._id,SpriteDetails._id))
            {
                _help = HelpLayer::create(Rect(_spriteDetails.at(i)._sprite->getPositionX(), _spriteDetails.at(i)._sprite->getPositionY(), _spriteDetails.at(i)._sprite->getContentSize().width, _spriteDetails.at(i)._sprite->getContentSize().height), Rect(SpriteDetails._sprite->getPositionX(), SpriteDetails._sprite->getPositionY(), SpriteDetails._sprite->getContentSize().width, SpriteDetails._sprite->getContentSize().height));
                _help->clickAndDrag(Vec2(_spriteDetails.at(i)._sprite->getPositionX(), _spriteDetails.at(i)._sprite->getPositionY()), Vec2(SpriteDetails._sprite->getPositionX(), SpriteDetails._sprite->getPositionY()));
                this->addChild(_help);
                _moveFlag = 0;
                _helpFlag = 1;
                break;
            }
        }
    }
}


bool PatchTheWall::checkAnswer(string questionText, string answerText) {

	for (int i = 0; i < _vmc.size(); i++) {
		if (_vmc[i].question.compare(questionText) == 0) {
			if (_vmc[i].answers[_vmc[i].correctAnswer].compare(answerText) == 0) {
				return true;
			}
		}
	}
	return false;
}
