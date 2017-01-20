#ifndef _SPRITECREATE_HPP_
#define _SPRITECREATE_HPP_

#include "cocos2d.h"
#include "editor-support/cocostudio/CocoStudio.h"
class SpriteCreate : public cocos2d::Sprite
{
public:

	SpriteCreate();
	~SpriteCreate();

	std::string currentRockName, NextRockName, LayerTypeName;
	
	static SpriteCreate* createSprite(std::string spriteName, int postionX, int postionY, float anchorX, float anchorY, std::string currentRockName, std::string NextRockName, std::string LayerTypeName);

private:
};

#endif // __EVENTLISTENERCLASS_SCENE_H__
