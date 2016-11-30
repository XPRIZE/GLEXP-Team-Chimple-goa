#include "scripting/js-bindings/auto/wordscenegeneratorautobindings.hpp"
#include "scripting/js-bindings/manual/cocos2d_specifics.hpp"
#include "../../../../../runtime-src/Classes/puzzle/WordScene.h"

template<class T>
static bool dummy_constructor(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS_ReportError(cx, "Constructor for the requested class is not available, please refer to the API reference.");
    return false;
}

static bool empty_constructor(JSContext *cx, uint32_t argc, jsval *vp) {
    return false;
}

static bool js_is_native_obj(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    args.rval().setBoolean(true);
    return true;
}
JSClass  *jsb_WordScene_class;
JSObject *jsb_WordScene_prototype;

bool js_wordscenegeneratorautobindings_WordScene_initWithWord(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    WordScene* cobj = (WordScene *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_wordscenegeneratorautobindings_WordScene_initWithWord : Invalid Native Object");
    if (argc == 1) {
        std::string arg0;
        ok &= jsval_to_std_string(cx, args.get(0), &arg0);
        JSB_PRECONDITION2(ok, cx, false, "js_wordscenegeneratorautobindings_WordScene_initWithWord : Error processing arguments");
        bool ret = cobj->initWithWord(arg0);
        jsval jsret = JSVAL_NULL;
        jsret = BOOLEAN_TO_JSVAL(ret);
        args.rval().set(jsret);
        return true;
    }

    JS_ReportError(cx, "js_wordscenegeneratorautobindings_WordScene_initWithWord : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}
bool js_wordscenegeneratorautobindings_WordScene_onTouchEnded(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    WordScene* cobj = (WordScene *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_wordscenegeneratorautobindings_WordScene_onTouchEnded : Invalid Native Object");
    if (argc == 2) {
        cocos2d::Touch* arg0 = nullptr;
        cocos2d::Event* arg1 = nullptr;
        do {
            if (args.get(0).isNull()) { arg0 = nullptr; break; }
            if (!args.get(0).isObject()) { ok = false; break; }
            js_proxy_t *jsProxy;
            JS::RootedObject tmpObj(cx, args.get(0).toObjectOrNull());
            jsProxy = jsb_get_js_proxy(tmpObj);
            arg0 = (cocos2d::Touch*)(jsProxy ? jsProxy->ptr : NULL);
            JSB_PRECONDITION2( arg0, cx, false, "Invalid Native Object");
        } while (0);
        do {
            if (args.get(1).isNull()) { arg1 = nullptr; break; }
            if (!args.get(1).isObject()) { ok = false; break; }
            js_proxy_t *jsProxy;
            JS::RootedObject tmpObj(cx, args.get(1).toObjectOrNull());
            jsProxy = jsb_get_js_proxy(tmpObj);
            arg1 = (cocos2d::Event*)(jsProxy ? jsProxy->ptr : NULL);
            JSB_PRECONDITION2( arg1, cx, false, "Invalid Native Object");
        } while (0);
        JSB_PRECONDITION2(ok, cx, false, "js_wordscenegeneratorautobindings_WordScene_onTouchEnded : Error processing arguments");
        cobj->onTouchEnded(arg0, arg1);
        args.rval().setUndefined();
        return true;
    }

    JS_ReportError(cx, "js_wordscenegeneratorautobindings_WordScene_onTouchEnded : wrong number of arguments: %d, was expecting %d", argc, 2);
    return false;
}
bool js_wordscenegeneratorautobindings_WordScene_enableHandWriting(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    WordScene* cobj = (WordScene *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_wordscenegeneratorautobindings_WordScene_enableHandWriting : Invalid Native Object");
    if (argc == 0) {
        cobj->enableHandWriting();
        args.rval().setUndefined();
        return true;
    }

    JS_ReportError(cx, "js_wordscenegeneratorautobindings_WordScene_enableHandWriting : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}
bool js_wordscenegeneratorautobindings_WordScene_showHandWritingDialog(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    WordScene* cobj = (WordScene *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_wordscenegeneratorautobindings_WordScene_showHandWritingDialog : Invalid Native Object");
    if (argc == 2) {
        cocos2d::Ref* arg0 = nullptr;
        cocos2d::ui::Widget::TouchEventType arg1;
        do {
            if (args.get(0).isNull()) { arg0 = nullptr; break; }
            if (!args.get(0).isObject()) { ok = false; break; }
            js_proxy_t *jsProxy;
            JS::RootedObject tmpObj(cx, args.get(0).toObjectOrNull());
            jsProxy = jsb_get_js_proxy(tmpObj);
            arg0 = (cocos2d::Ref*)(jsProxy ? jsProxy->ptr : NULL);
            JSB_PRECONDITION2( arg0, cx, false, "Invalid Native Object");
        } while (0);
        ok &= jsval_to_int32(cx, args.get(1), (int32_t *)&arg1);
        JSB_PRECONDITION2(ok, cx, false, "js_wordscenegeneratorautobindings_WordScene_showHandWritingDialog : Error processing arguments");
        cobj->showHandWritingDialog(arg0, arg1);
        args.rval().setUndefined();
        return true;
    }

    JS_ReportError(cx, "js_wordscenegeneratorautobindings_WordScene_showHandWritingDialog : wrong number of arguments: %d, was expecting %d", argc, 2);
    return false;
}
bool js_wordscenegeneratorautobindings_WordScene_checkAnswer(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    WordScene* cobj = (WordScene *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_wordscenegeneratorautobindings_WordScene_checkAnswer : Invalid Native Object");
    if (argc == 0) {
        cobj->checkAnswer();
        args.rval().setUndefined();
        return true;
    }

    JS_ReportError(cx, "js_wordscenegeneratorautobindings_WordScene_checkAnswer : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}
bool js_wordscenegeneratorautobindings_WordScene_isHandWritingEnabled(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    WordScene* cobj = (WordScene *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_wordscenegeneratorautobindings_WordScene_isHandWritingEnabled : Invalid Native Object");
    if (argc == 0) {
        bool ret = cobj->isHandWritingEnabled();
        jsval jsret = JSVAL_NULL;
        jsret = BOOLEAN_TO_JSVAL(ret);
        args.rval().set(jsret);
        return true;
    }

    JS_ReportError(cx, "js_wordscenegeneratorautobindings_WordScene_isHandWritingEnabled : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}
bool js_wordscenegeneratorautobindings_WordScene_onHandWrittenAlphabetTouchEnded(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    WordScene* cobj = (WordScene *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_wordscenegeneratorautobindings_WordScene_onHandWrittenAlphabetTouchEnded : Invalid Native Object");
    if (argc == 2) {
        cocos2d::Touch* arg0 = nullptr;
        cocos2d::Event* arg1 = nullptr;
        do {
            if (args.get(0).isNull()) { arg0 = nullptr; break; }
            if (!args.get(0).isObject()) { ok = false; break; }
            js_proxy_t *jsProxy;
            JS::RootedObject tmpObj(cx, args.get(0).toObjectOrNull());
            jsProxy = jsb_get_js_proxy(tmpObj);
            arg0 = (cocos2d::Touch*)(jsProxy ? jsProxy->ptr : NULL);
            JSB_PRECONDITION2( arg0, cx, false, "Invalid Native Object");
        } while (0);
        do {
            if (args.get(1).isNull()) { arg1 = nullptr; break; }
            if (!args.get(1).isObject()) { ok = false; break; }
            js_proxy_t *jsProxy;
            JS::RootedObject tmpObj(cx, args.get(1).toObjectOrNull());
            jsProxy = jsb_get_js_proxy(tmpObj);
            arg1 = (cocos2d::Event*)(jsProxy ? jsProxy->ptr : NULL);
            JSB_PRECONDITION2( arg1, cx, false, "Invalid Native Object");
        } while (0);
        JSB_PRECONDITION2(ok, cx, false, "js_wordscenegeneratorautobindings_WordScene_onHandWrittenAlphabetTouchEnded : Error processing arguments");
        cobj->onHandWrittenAlphabetTouchEnded(arg0, arg1);
        args.rval().setUndefined();
        return true;
    }

    JS_ReportError(cx, "js_wordscenegeneratorautobindings_WordScene_onHandWrittenAlphabetTouchEnded : wrong number of arguments: %d, was expecting %d", argc, 2);
    return false;
}
bool js_wordscenegeneratorautobindings_WordScene_create(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    if (argc == 0) {

        auto ret = WordScene::create();
        js_type_class_t *typeClass = js_get_type_from_native(ret);
        JS::RootedObject jsret(cx, jsb_ref_autoreleased_create_jsobject(cx, ret, typeClass, "WordScene"));
        args.rval().set(OBJECT_TO_JSVAL(jsret));
        return true;
    }
    JS_ReportError(cx, "js_wordscenegeneratorautobindings_WordScene_create : wrong number of arguments");
    return false;
}

bool js_wordscenegeneratorautobindings_WordScene_textReceived(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    if (argc == 1) {
        std::string arg0;
        ok &= jsval_to_std_string(cx, args.get(0), &arg0);
        JSB_PRECONDITION2(ok, cx, false, "js_wordscenegeneratorautobindings_WordScene_textReceived : Error processing arguments");
        WordScene::textReceived(arg0);
        args.rval().setUndefined();
        return true;
    }
    JS_ReportError(cx, "js_wordscenegeneratorautobindings_WordScene_textReceived : wrong number of arguments");
    return false;
}

bool js_wordscenegeneratorautobindings_WordScene_createWithWord(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    if (argc == 1) {
        std::string arg0;
        ok &= jsval_to_std_string(cx, args.get(0), &arg0);
        JSB_PRECONDITION2(ok, cx, false, "js_wordscenegeneratorautobindings_WordScene_createWithWord : Error processing arguments");

        auto ret = WordScene::createWithWord(arg0);
        js_type_class_t *typeClass = js_get_type_from_native<WordScene>(ret);
        JS::RootedObject jsret(cx, jsb_ref_autoreleased_create_jsobject(cx, ret, typeClass, "WordScene"));
        args.rval().set(OBJECT_TO_JSVAL(jsret));
        return true;
    }
    JS_ReportError(cx, "js_wordscenegeneratorautobindings_WordScene_createWithWord : wrong number of arguments");
    return false;
}

bool js_wordscenegeneratorautobindings_WordScene_createScene(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    if (argc == 0) {

        auto ret = WordScene::createScene();
        js_type_class_t *typeClass = js_get_type_from_native(ret);
        JS::RootedObject jsret(cx, jsb_ref_autoreleased_create_jsobject(cx, ret, typeClass, "WordScene"));
        args.rval().set(OBJECT_TO_JSVAL(jsret));
        return true;
    }
    JS_ReportError(cx, "js_wordscenegeneratorautobindings_WordScene_createScene : wrong number of arguments");
    return false;
}

bool js_wordscenegeneratorautobindings_WordScene_constructor(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    WordScene* cobj = new (std::nothrow) WordScene();

    js_type_class_t *typeClass = js_get_type_from_native(cobj);

    // link the native object with the javascript object
    JS::RootedObject jsobj(cx, jsb_ref_create_jsobject(cx, cobj, typeClass, "WordScene"));
    args.rval().set(OBJECT_TO_JSVAL(jsobj));
    if (JS_HasProperty(cx, jsobj, "_ctor", &ok) && ok)
        ScriptingCore::getInstance()->executeFunctionWithOwner(OBJECT_TO_JSVAL(jsobj), "_ctor", args);
    return true;
}


extern JSObject *jsb_cocos2d_Node_prototype;

void js_register_wordscenegeneratorautobindings_WordScene(JSContext *cx, JS::HandleObject global) {
    jsb_WordScene_class = (JSClass *)calloc(1, sizeof(JSClass));
    jsb_WordScene_class->name = "WordScene";
    jsb_WordScene_class->addProperty = JS_PropertyStub;
    jsb_WordScene_class->delProperty = JS_DeletePropertyStub;
    jsb_WordScene_class->getProperty = JS_PropertyStub;
    jsb_WordScene_class->setProperty = JS_StrictPropertyStub;
    jsb_WordScene_class->enumerate = JS_EnumerateStub;
    jsb_WordScene_class->resolve = JS_ResolveStub;
    jsb_WordScene_class->convert = JS_ConvertStub;
    jsb_WordScene_class->flags = JSCLASS_HAS_RESERVED_SLOTS(2);

    static JSPropertySpec properties[] = {
        JS_PS_END
    };

    static JSFunctionSpec funcs[] = {
        JS_FN("initWithWord", js_wordscenegeneratorautobindings_WordScene_initWithWord, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("onTouchEnded", js_wordscenegeneratorautobindings_WordScene_onTouchEnded, 2, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("enableHandWriting", js_wordscenegeneratorautobindings_WordScene_enableHandWriting, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("showHandWritingDialog", js_wordscenegeneratorautobindings_WordScene_showHandWritingDialog, 2, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("checkAnswer", js_wordscenegeneratorautobindings_WordScene_checkAnswer, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("isHandWritingEnabled", js_wordscenegeneratorautobindings_WordScene_isHandWritingEnabled, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("onHandWrittenAlphabetTouchEnded", js_wordscenegeneratorautobindings_WordScene_onHandWrittenAlphabetTouchEnded, 2, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FS_END
    };

    static JSFunctionSpec st_funcs[] = {
        JS_FN("create", js_wordscenegeneratorautobindings_WordScene_create, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("textReceived", js_wordscenegeneratorautobindings_WordScene_textReceived, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("createWithWord", js_wordscenegeneratorautobindings_WordScene_createWithWord, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("createScene", js_wordscenegeneratorautobindings_WordScene_createScene, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FS_END
    };

    JS::RootedObject parent_proto(cx, jsb_cocos2d_Node_prototype);
    jsb_WordScene_prototype = JS_InitClass(
        cx, global,
        parent_proto,
        jsb_WordScene_class,
        js_wordscenegeneratorautobindings_WordScene_constructor, 0, // constructor
        properties,
        funcs,
        NULL, // no static properties
        st_funcs);

    JS::RootedObject proto(cx, jsb_WordScene_prototype);
    JS::RootedValue className(cx, std_string_to_jsval(cx, "WordScene"));
    JS_SetProperty(cx, proto, "_className", className);
    JS_SetProperty(cx, proto, "__nativeObj", JS::TrueHandleValue);
    JS_SetProperty(cx, proto, "__is_ref", JS::TrueHandleValue);
    // add the proto and JSClass to the type->js info hash table
    jsb_register_class<WordScene>(cx, jsb_WordScene_class, proto, parent_proto);
}

void register_all_wordscenegeneratorautobindings(JSContext* cx, JS::HandleObject obj) {
    // Get the ns
    JS::RootedObject ns(cx);
    get_or_create_js_obj(cx, obj, "goa", &ns);

    js_register_wordscenegeneratorautobindings_WordScene(cx, ns);
}

