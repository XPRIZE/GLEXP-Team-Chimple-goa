#include "base/ccConfig.h"
#ifndef __wordscenegeneratorautobindings_h__
#define __wordscenegeneratorautobindings_h__

#include "jsapi.h"
#include "jsfriendapi.h"

extern JSClass  *jsb_WordScene_class;
extern JSObject *jsb_WordScene_prototype;

bool js_wordscenegeneratorautobindings_WordScene_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_wordscenegeneratorautobindings_WordScene_finalize(JSContext *cx, JSObject *obj);
void js_register_wordscenegeneratorautobindings_WordScene(JSContext *cx, JS::HandleObject global);
void register_all_wordscenegeneratorautobindings(JSContext* cx, JS::HandleObject obj);
bool js_wordscenegeneratorautobindings_WordScene_initWithWord(JSContext *cx, uint32_t argc, jsval *vp);
bool js_wordscenegeneratorautobindings_WordScene_onTouchEnded(JSContext *cx, uint32_t argc, jsval *vp);
bool js_wordscenegeneratorautobindings_WordScene_enableHandWriting(JSContext *cx, uint32_t argc, jsval *vp);
bool js_wordscenegeneratorautobindings_WordScene_showHandWritingDialog(JSContext *cx, uint32_t argc, jsval *vp);
bool js_wordscenegeneratorautobindings_WordScene_checkAnswer(JSContext *cx, uint32_t argc, jsval *vp);
bool js_wordscenegeneratorautobindings_WordScene_isHandWritingEnabled(JSContext *cx, uint32_t argc, jsval *vp);
bool js_wordscenegeneratorautobindings_WordScene_onHandWrittenAlphabetTouchEnded(JSContext *cx, uint32_t argc, jsval *vp);
bool js_wordscenegeneratorautobindings_WordScene_create(JSContext *cx, uint32_t argc, jsval *vp);
bool js_wordscenegeneratorautobindings_WordScene_textReceived(JSContext *cx, uint32_t argc, jsval *vp);
bool js_wordscenegeneratorautobindings_WordScene_createWithWord(JSContext *cx, uint32_t argc, jsval *vp);
bool js_wordscenegeneratorautobindings_WordScene_createScene(JSContext *cx, uint32_t argc, jsval *vp);
bool js_wordscenegeneratorautobindings_WordScene_WordScene(JSContext *cx, uint32_t argc, jsval *vp);

#endif // __wordscenegeneratorautobindings_h__
