// Code by Francois Guibert
// Contact: www.frozax.com - http://twitter.com/frozax - www.facebook.com/frozax
#include "FShake.h"
#include "cocos2d.h"

USING_NS_CC;

// not really useful, but I like clean default constructors
FShake::FShake() : _strength_x(0), _strength_y(0), _displacement_x(0), _displacement_y(0)
{
}

FShake* FShake::actionWithDuration( float d, float strength )
{
    // call other construction method with twice the same strength
    return actionWithDuration( d, strength, strength );
}

FShake* FShake::actionWithDuration(float duration, float strength_x, float strength_y)
{
    FShake *p_action = new FShake();
    p_action->initWithDuration(duration, strength_x, strength_y);
    p_action->autorelease();
    
    return p_action;
}

bool FShake::initWithDuration(float duration, float strength_x, float strength_y)
{
    if (cocos2d::ActionInterval::initWithDuration(duration))
    {
        _strength_x = strength_x;
        _strength_y = strength_y;
        return true;
    }
    
    return false;
}

// Helper function. I included it here so that you can compile the whole file
// it returns a random value between min and max included
float fgRangeRand( float min, float max )
{
    float rnd = ((float)rand()/(float)RAND_MAX);
    return rnd*(max-min)+min;
}

void FShake::update(float time)
{
    float rand_x = fgRangeRand( -_strength_x, _strength_x );
    float rand_y = fgRangeRand( -_strength_y, _strength_y );
    
    auto target = this->getTarget();
    auto currentPosition = target->getPosition();
    
    // move the target to a shaked position
    target->setPosition(currentPosition.x - _displacement_x + rand_x,
                        currentPosition.y - _displacement_y + rand_y);
    
    // Keep track of the last displacement
    _displacement_x = rand_x;
    _displacement_y = rand_y;
}

void FShake::stop(void)
{
    auto target = this->getTarget();
    auto currentPosition = target->getPosition();
    
    // Action is done, reset clip position
    target->setPosition(currentPosition.x - _displacement_x,
                        currentPosition.y - _displacement_y);
    
    ActionInterval::stop();
}

FShake* FShake::clone()
{
    // no copy constructor
    auto a = new (std::nothrow) FShake();
    a->initWithDuration(_duration, _strength_x, _strength_y);
    a->autorelease();
    return a;
}