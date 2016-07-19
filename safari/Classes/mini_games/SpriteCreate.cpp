#include "SpriteCreate.h"
using namespace cocos2d;

SpriteCreate::SpriteCreate()
{
}

SpriteCreate::~SpriteCreate()
{
}

SpriteCreate* SpriteCreate::createSprite(std::string spriteName, int positionX, int positionY, float anchorX, float anchorY, std::string currentRockName, std::string nextRockName, std::string layerTypeName, bool touchEvent)
{
	SpriteCreate *pSprite = new SpriteCreate();

	//CCSpriteFrameCache::sharedSpriteFrameCache()->addSpriteFramesWithFile("thirdgamePlist.plist");
	//CCSpriteFrameCache::sharedSpriteFrameCache()->addSpriteFramesWithFile("Game_screen.plist");

	if (pSprite->initWithSpriteFrameName(spriteName))
	{
		pSprite->setPosition(Vec2(positionX, positionY));
		pSprite->setAnchorPoint(Vec2(anchorX, anchorY));
		pSprite->currentRockName = currentRockName;
		pSprite->NextRockName = nextRockName;
		pSprite->LayerTypeName = layerTypeName;
		if("monster1.png" == spriteName){
			
			cocos2d::Vector<SpriteFrame*> animFrames;
			char str[20] = { 0 };
			for (int i = 1; i < 5; i++)
			{
				sprintf(str, "monster%d.png", i);
				SpriteFrame* frame = SpriteFrameCache::sharedSpriteFrameCache()->spriteFrameByName(str);
				animFrames.pushBack(frame);
			}
			for (int i = 4; i > 0; i--)
			{
				sprintf(str, "monster%d.png", i);
				SpriteFrame* frame = SpriteFrameCache::sharedSpriteFrameCache()->spriteFrameByName(str);
				animFrames.pushBack(frame);
			}
			Animation* animation = Animation::createWithSpriteFrames(animFrames, 0.03f);
			
			pSprite->runAction(RepeatForever::create(Animate::create(animation)));
			
			auto Up = CallFunc::create([=]() {
				pSprite->setPosition(Vec2(pSprite->getPositionX(), pSprite->getPositionY() + 3));
			});
			auto Down = CallFunc::create([=]() {
				pSprite->setPosition(Vec2(pSprite->getPositionX(), pSprite->getPositionY() - 3));
			});

			auto main_Sequence = Sequence::create(Up, DelayTime::create(0.3), Down, DelayTime::create(0.3), NULL);
			pSprite->runAction(RepeatForever::create(main_Sequence));


		}
		return pSprite;
	}

	CC_SAFE_DELETE(pSprite);
	return NULL;
}

