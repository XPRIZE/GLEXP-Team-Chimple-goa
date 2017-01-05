#include "base/ccConfig.h"
#ifndef __chimpleautogenbindings_h__
#define __chimpleautogenbindings_h__

#include "jsapi.h"
#include "jsfriendapi.h"

extern JSClass  *jsb_MenuContext_class;
extern JSObject *jsb_MenuContext_prototype;

bool js_chimpleautogenbindings_MenuContext_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_chimpleautogenbindings_MenuContext_finalize(JSContext *cx, JSObject *obj);
void js_register_chimpleautogenbindings_MenuContext(JSContext *cx, JS::HandleObject global);
void register_all_chimpleautogenbindings(JSContext* cx, JS::HandleObject obj);
bool js_chimpleautogenbindings_MenuContext_getCurrentLevel(JSContext *cx, uint32_t argc, jsval *vp);
bool js_chimpleautogenbindings_MenuContext_exitMultiPlayerGame(JSContext *cx, uint32_t argc, jsval *vp);
bool js_chimpleautogenbindings_MenuContext_getPolygonPointsForSprite(JSContext *cx, uint32_t argc, jsval *vp);
bool js_chimpleautogenbindings_MenuContext_onChimpTouchEnded(JSContext *cx, uint32_t argc, jsval *vp);
bool js_chimpleautogenbindings_MenuContext_getMaxPoints(JSContext *cx, uint32_t argc, jsval *vp);
bool js_chimpleautogenbindings_MenuContext_launchGame(JSContext *cx, uint32_t argc, jsval *vp);
bool js_chimpleautogenbindings_MenuContext_pickAlphabet(JSContext *cx, uint32_t argc, jsval *vp);
bool js_chimpleautogenbindings_MenuContext_sendMessageToPeer(JSContext *cx, uint32_t argc, jsval *vp);
bool js_chimpleautogenbindings_MenuContext_init(JSContext *cx, uint32_t argc, jsval *vp);
bool js_chimpleautogenbindings_MenuContext_isGamePaused(JSContext *cx, uint32_t argc, jsval *vp);
bool js_chimpleautogenbindings_MenuContext_onChimpTouchBegan(JSContext *cx, uint32_t argc, jsval *vp);
bool js_chimpleautogenbindings_MenuContext_jumpOut(JSContext *cx, uint32_t argc, jsval *vp);
bool js_chimpleautogenbindings_MenuContext_split(JSContext *cx, uint32_t argc, jsval *vp);
bool js_chimpleautogenbindings_MenuContext_getTrianglePointsForSprite(JSContext *cx, uint32_t argc, jsval *vp);
bool js_chimpleautogenbindings_MenuContext_transitToScrollableGameMap(JSContext *cx, uint32_t argc, jsval *vp);
bool js_chimpleautogenbindings_MenuContext_setCurrentLevel(JSContext *cx, uint32_t argc, jsval *vp);
bool js_chimpleautogenbindings_MenuContext_addPoints(JSContext *cx, uint32_t argc, jsval *vp);
bool js_chimpleautogenbindings_MenuContext_showStartupHelp(JSContext *cx, uint32_t argc, jsval *vp);
bool js_chimpleautogenbindings_MenuContext_getPoints(JSContext *cx, uint32_t argc, jsval *vp);
bool js_chimpleautogenbindings_MenuContext_finalizePoints(JSContext *cx, uint32_t argc, jsval *vp);
bool js_chimpleautogenbindings_MenuContext_showScore(JSContext *cx, uint32_t argc, jsval *vp);
bool js_chimpleautogenbindings_MenuContext_setMaxPoints(JSContext *cx, uint32_t argc, jsval *vp);
bool js_chimpleautogenbindings_MenuContext_create(JSContext *cx, uint32_t argc, jsval *vp);
bool js_chimpleautogenbindings_MenuContext_launchGameFromJS(JSContext *cx, uint32_t argc, jsval *vp);
bool js_chimpleautogenbindings_MenuContext_launchGameFinally(JSContext *cx, uint32_t argc, jsval *vp);
bool js_chimpleautogenbindings_MenuContext_MenuContext(JSContext *cx, uint32_t argc, jsval *vp);
bool js_chimpleautogenbindings_MenuContext_getBoundingBox(JSContext *cx, uint32_t argc, jsval *vp);
bool js_chimpleautogenbindings_MenuContext_pronounceWord(JSContext *cx, uint32_t argc, jsval *vp);
bool js_chimpleautogenbindings_MenuContext_playStoryAudio(JSContext *cx, uint32_t argc, jsval *vp);
bool js_chimpleautogenbindings_MenuContext_stopStoryAudio(JSContext *cx, uint32_t argc, jsval *vp);

#endif // __chimpleautogenbindings_h__
