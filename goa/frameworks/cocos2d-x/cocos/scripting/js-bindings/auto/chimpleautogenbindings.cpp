#include "scripting/js-bindings/auto/chimpleautogenbindings.hpp"
#include "scripting/js-bindings/manual/cocos2d_specifics.hpp"
#include "../../../../../runtime-src/Classes/menu/MenuContext.h"

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
JSClass  *jsb_MenuContext_class;
JSObject *jsb_MenuContext_prototype;

bool js_chimpleautogenbindings_MenuContext_showStartupHelp(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    MenuContext* cobj = (MenuContext *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_chimpleautogenbindings_MenuContext_showStartupHelp : Invalid Native Object");
    if (argc == 0) {
        cobj->showStartupHelp();
        args.rval().setUndefined();
        return true;
    }
    if (argc == 1) {
        std::function<void ()> arg0;
        do {
		    if(JS_TypeOfValue(cx, args.get(0)) == JSTYPE_FUNCTION)
		    {
		        JS::RootedObject jstarget(cx, args.thisv().toObjectOrNull());
		        std::shared_ptr<JSFunctionWrapper> func(new JSFunctionWrapper(cx, jstarget, args.get(0), args.thisv()));
		        auto lambda = [=]() -> void {
		            JSB_AUTOCOMPARTMENT_WITH_GLOBAL_OBJCET
		            JS::RootedValue rval(cx);
		            bool succeed = func->invoke(0, nullptr, &rval);
		            if (!succeed && JS_IsExceptionPending(cx)) {
		                JS_ReportPendingException(cx);
		            }
		        };
		        arg0 = lambda;
		    }
		    else
		    {
		        arg0 = nullptr;
		    }
		} while(0)
		;
        JSB_PRECONDITION2(ok, cx, false, "js_chimpleautogenbindings_MenuContext_showStartupHelp : Error processing arguments");
        cobj->showStartupHelp(arg0);
        args.rval().setUndefined();
        return true;
    }

    JS_ReportError(cx, "js_chimpleautogenbindings_MenuContext_showStartupHelp : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}
bool js_chimpleautogenbindings_MenuContext_launchGame(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    MenuContext* cobj = (MenuContext *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_chimpleautogenbindings_MenuContext_launchGame : Invalid Native Object");
    if (argc == 1) {
        std::string arg0;
        ok &= jsval_to_std_string(cx, args.get(0), &arg0);
        JSB_PRECONDITION2(ok, cx, false, "js_chimpleautogenbindings_MenuContext_launchGame : Error processing arguments");
        cobj->launchGame(arg0);
        args.rval().setUndefined();
        return true;
    }

    JS_ReportError(cx, "js_chimpleautogenbindings_MenuContext_launchGame : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}
bool js_chimpleautogenbindings_MenuContext_getPoints(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    MenuContext* cobj = (MenuContext *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_chimpleautogenbindings_MenuContext_getPoints : Invalid Native Object");
    if (argc == 0) {
        int ret = cobj->getPoints();
        jsval jsret = JSVAL_NULL;
        jsret = int32_to_jsval(cx, ret);
        args.rval().set(jsret);
        return true;
    }

    JS_ReportError(cx, "js_chimpleautogenbindings_MenuContext_getPoints : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}
bool js_chimpleautogenbindings_MenuContext_init(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    MenuContext* cobj = (MenuContext *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_chimpleautogenbindings_MenuContext_init : Invalid Native Object");
    if (argc == 1) {
        cocos2d::Node* arg0 = nullptr;
        do {
            if (args.get(0).isNull()) { arg0 = nullptr; break; }
            if (!args.get(0).isObject()) { ok = false; break; }
            js_proxy_t *jsProxy;
            JS::RootedObject tmpObj(cx, args.get(0).toObjectOrNull());
            jsProxy = jsb_get_js_proxy(tmpObj);
            arg0 = (cocos2d::Node*)(jsProxy ? jsProxy->ptr : NULL);
            JSB_PRECONDITION2( arg0, cx, false, "Invalid Native Object");
        } while (0);
        JSB_PRECONDITION2(ok, cx, false, "js_chimpleautogenbindings_MenuContext_init : Error processing arguments");
        bool ret = cobj->init(arg0);
        jsval jsret = JSVAL_NULL;
        jsret = BOOLEAN_TO_JSVAL(ret);
        args.rval().set(jsret);
        return true;
    }

    JS_ReportError(cx, "js_chimpleautogenbindings_MenuContext_init : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}
bool js_chimpleautogenbindings_MenuContext_pickAlphabet(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    MenuContext* cobj = (MenuContext *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_chimpleautogenbindings_MenuContext_pickAlphabet : Invalid Native Object");
    if (argc == 2) {
        int32_t arg0;
        int32_t arg1;
        ok &= jsval_to_int32(cx, args.get(0), &arg0);
        ok &= jsval_to_int32(cx, args.get(1), &arg1);
        JSB_PRECONDITION2(ok, cx, false, "js_chimpleautogenbindings_MenuContext_pickAlphabet : Error processing arguments");
        cobj->pickAlphabet(arg0, arg1);
        args.rval().setUndefined();
        return true;
    }
    if (argc == 3) {
        int32_t arg0;
        int32_t arg1;
        bool arg2;
        ok &= jsval_to_int32(cx, args.get(0), &arg0);
        ok &= jsval_to_int32(cx, args.get(1), &arg1);
        arg2 = JS::ToBoolean(args.get(2));
        JSB_PRECONDITION2(ok, cx, false, "js_chimpleautogenbindings_MenuContext_pickAlphabet : Error processing arguments");
        cobj->pickAlphabet(arg0, arg1, arg2);
        args.rval().setUndefined();
        return true;
    }
    if (argc == 4) {
        int32_t arg0;
        int32_t arg1;
        bool arg2;
        cocos2d::Vec2 arg3;
        ok &= jsval_to_int32(cx, args.get(0), &arg0);
        ok &= jsval_to_int32(cx, args.get(1), &arg1);
        arg2 = JS::ToBoolean(args.get(2));
        ok &= jsval_to_vector2(cx, args.get(3), &arg3);
        JSB_PRECONDITION2(ok, cx, false, "js_chimpleautogenbindings_MenuContext_pickAlphabet : Error processing arguments");
        cobj->pickAlphabet(arg0, arg1, arg2, arg3);
        args.rval().setUndefined();
        return true;
    }

    JS_ReportError(cx, "js_chimpleautogenbindings_MenuContext_pickAlphabet : wrong number of arguments: %d, was expecting %d", argc, 2);
    return false;
}
bool js_chimpleautogenbindings_MenuContext_finalizePoints(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    MenuContext* cobj = (MenuContext *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_chimpleautogenbindings_MenuContext_finalizePoints : Invalid Native Object");
    if (argc == 0) {
        cobj->finalizePoints();
        args.rval().setUndefined();
        return true;
    }

    JS_ReportError(cx, "js_chimpleautogenbindings_MenuContext_finalizePoints : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}
bool js_chimpleautogenbindings_MenuContext_showScore(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    MenuContext* cobj = (MenuContext *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_chimpleautogenbindings_MenuContext_showScore : Invalid Native Object");
    if (argc == 0) {
        cobj->showScore();
        args.rval().setUndefined();
        return true;
    }

    JS_ReportError(cx, "js_chimpleautogenbindings_MenuContext_showScore : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}
bool js_chimpleautogenbindings_MenuContext_isGamePaused(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    MenuContext* cobj = (MenuContext *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_chimpleautogenbindings_MenuContext_isGamePaused : Invalid Native Object");
    if (argc == 0) {
        bool ret = cobj->isGamePaused();
        jsval jsret = JSVAL_NULL;
        jsret = BOOLEAN_TO_JSVAL(ret);
        args.rval().set(jsret);
        return true;
    }

    JS_ReportError(cx, "js_chimpleautogenbindings_MenuContext_isGamePaused : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}
bool js_chimpleautogenbindings_MenuContext_onChimpTouchBegan(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    MenuContext* cobj = (MenuContext *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_chimpleautogenbindings_MenuContext_onChimpTouchBegan : Invalid Native Object");
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
        JSB_PRECONDITION2(ok, cx, false, "js_chimpleautogenbindings_MenuContext_onChimpTouchBegan : Error processing arguments");
        bool ret = cobj->onChimpTouchBegan(arg0, arg1);
        jsval jsret = JSVAL_NULL;
        jsret = BOOLEAN_TO_JSVAL(ret);
        args.rval().set(jsret);
        return true;
    }

    JS_ReportError(cx, "js_chimpleautogenbindings_MenuContext_onChimpTouchBegan : wrong number of arguments: %d, was expecting %d", argc, 2);
    return false;
}
bool js_chimpleautogenbindings_MenuContext_jumpOut(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    MenuContext* cobj = (MenuContext *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_chimpleautogenbindings_MenuContext_jumpOut : Invalid Native Object");
    if (argc == 3) {
        std::string arg0;
        double arg1 = 0;
        cocos2d::Vec2 arg2;
        ok &= jsval_to_std_string(cx, args.get(0), &arg0);
        ok &= JS::ToNumber( cx, args.get(1), &arg1) && !std::isnan(arg1);
        ok &= jsval_to_vector2(cx, args.get(2), &arg2);
        JSB_PRECONDITION2(ok, cx, false, "js_chimpleautogenbindings_MenuContext_jumpOut : Error processing arguments");
        cocos2d::Node* ret = cobj->jumpOut(arg0, arg1, arg2);
        jsval jsret = JSVAL_NULL;
        if (ret) {
            jsret = OBJECT_TO_JSVAL(js_get_or_create_jsobject<cocos2d::Node>(cx, (cocos2d::Node*)ret));
        } else {
            jsret = JSVAL_NULL;
        };
        args.rval().set(jsret);
        return true;
    }
    if (argc == 4) {
        std::string arg0;
        double arg1 = 0;
        cocos2d::Vec2 arg2;
        std::string arg3;
        ok &= jsval_to_std_string(cx, args.get(0), &arg0);
        ok &= JS::ToNumber( cx, args.get(1), &arg1) && !std::isnan(arg1);
        ok &= jsval_to_vector2(cx, args.get(2), &arg2);
        ok &= jsval_to_std_string(cx, args.get(3), &arg3);
        JSB_PRECONDITION2(ok, cx, false, "js_chimpleautogenbindings_MenuContext_jumpOut : Error processing arguments");
        cocos2d::Node* ret = cobj->jumpOut(arg0, arg1, arg2, arg3);
        jsval jsret = JSVAL_NULL;
        if (ret) {
            jsret = OBJECT_TO_JSVAL(js_get_or_create_jsobject<cocos2d::Node>(cx, (cocos2d::Node*)ret));
        } else {
            jsret = JSVAL_NULL;
        };
        args.rval().set(jsret);
        return true;
    }

    JS_ReportError(cx, "js_chimpleautogenbindings_MenuContext_jumpOut : wrong number of arguments: %d, was expecting %d", argc, 3);
    return false;
}
bool js_chimpleautogenbindings_MenuContext_transitToScrollableGameMap(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    MenuContext* cobj = (MenuContext *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_chimpleautogenbindings_MenuContext_transitToScrollableGameMap : Invalid Native Object");
    if (argc == 0) {
        cobj->transitToScrollableGameMap();
        args.rval().setUndefined();
        return true;
    }

    JS_ReportError(cx, "js_chimpleautogenbindings_MenuContext_transitToScrollableGameMap : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}
bool js_chimpleautogenbindings_MenuContext_onChimpTouchEnded(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    MenuContext* cobj = (MenuContext *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_chimpleautogenbindings_MenuContext_onChimpTouchEnded : Invalid Native Object");
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
        JSB_PRECONDITION2(ok, cx, false, "js_chimpleautogenbindings_MenuContext_onChimpTouchEnded : Error processing arguments");
        cobj->onChimpTouchEnded(arg0, arg1);
        args.rval().setUndefined();
        return true;
    }

    JS_ReportError(cx, "js_chimpleautogenbindings_MenuContext_onChimpTouchEnded : wrong number of arguments: %d, was expecting %d", argc, 2);
    return false;
}
bool js_chimpleautogenbindings_MenuContext_create(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    if (argc == 1) {
        cocos2d::Node* arg0 = nullptr;
        do {
            if (args.get(0).isNull()) { arg0 = nullptr; break; }
            if (!args.get(0).isObject()) { ok = false; break; }
            js_proxy_t *jsProxy;
            JS::RootedObject tmpObj(cx, args.get(0).toObjectOrNull());
            jsProxy = jsb_get_js_proxy(tmpObj);
            arg0 = (cocos2d::Node*)(jsProxy ? jsProxy->ptr : NULL);
            JSB_PRECONDITION2( arg0, cx, false, "Invalid Native Object");
        } while (0);
        JSB_PRECONDITION2(ok, cx, false, "js_chimpleautogenbindings_MenuContext_create : Error processing arguments");

        auto ret = MenuContext::create(arg0);
        js_type_class_t *typeClass = js_get_type_from_native<MenuContext>(ret);
        JS::RootedObject jsret(cx, jsb_ref_autoreleased_create_jsobject(cx, ret, typeClass, "MenuContext"));
        args.rval().set(OBJECT_TO_JSVAL(jsret));
        return true;
    }
    if (argc == 2) {
        cocos2d::Node* arg0 = nullptr;
        std::string arg1;
        do {
            if (args.get(0).isNull()) { arg0 = nullptr; break; }
            if (!args.get(0).isObject()) { ok = false; break; }
            js_proxy_t *jsProxy;
            JS::RootedObject tmpObj(cx, args.get(0).toObjectOrNull());
            jsProxy = jsb_get_js_proxy(tmpObj);
            arg0 = (cocos2d::Node*)(jsProxy ? jsProxy->ptr : NULL);
            JSB_PRECONDITION2( arg0, cx, false, "Invalid Native Object");
        } while (0);
        ok &= jsval_to_std_string(cx, args.get(1), &arg1);
        JSB_PRECONDITION2(ok, cx, false, "js_chimpleautogenbindings_MenuContext_create : Error processing arguments");

        auto ret = MenuContext::create(arg0, arg1);
        js_type_class_t *typeClass = js_get_type_from_native<MenuContext>(ret);
        JS::RootedObject jsret(cx, jsb_ref_autoreleased_create_jsobject(cx, ret, typeClass, "MenuContext"));
        args.rval().set(OBJECT_TO_JSVAL(jsret));
        return true;
    }
    if (argc == 3) {
        cocos2d::Node* arg0 = nullptr;
        std::string arg1;
        bool arg2;
        do {
            if (args.get(0).isNull()) { arg0 = nullptr; break; }
            if (!args.get(0).isObject()) { ok = false; break; }
            js_proxy_t *jsProxy;
            JS::RootedObject tmpObj(cx, args.get(0).toObjectOrNull());
            jsProxy = jsb_get_js_proxy(tmpObj);
            arg0 = (cocos2d::Node*)(jsProxy ? jsProxy->ptr : NULL);
            JSB_PRECONDITION2( arg0, cx, false, "Invalid Native Object");
        } while (0);
        ok &= jsval_to_std_string(cx, args.get(1), &arg1);
        arg2 = JS::ToBoolean(args.get(2));
        JSB_PRECONDITION2(ok, cx, false, "js_chimpleautogenbindings_MenuContext_create : Error processing arguments");

        auto ret = MenuContext::create(arg0, arg1, arg2);
        js_type_class_t *typeClass = js_get_type_from_native<MenuContext>(ret);
        JS::RootedObject jsret(cx, jsb_ref_autoreleased_create_jsobject(cx, ret, typeClass, "MenuContext"));
        args.rval().set(OBJECT_TO_JSVAL(jsret));
        return true;
    }
    if (argc == 4) {
        cocos2d::Node* arg0 = nullptr;
        std::string arg1;
        bool arg2;
        std::string arg3;
        do {
            if (args.get(0).isNull()) { arg0 = nullptr; break; }
            if (!args.get(0).isObject()) { ok = false; break; }
            js_proxy_t *jsProxy;
            JS::RootedObject tmpObj(cx, args.get(0).toObjectOrNull());
            jsProxy = jsb_get_js_proxy(tmpObj);
            arg0 = (cocos2d::Node*)(jsProxy ? jsProxy->ptr : NULL);
            JSB_PRECONDITION2( arg0, cx, false, "Invalid Native Object");
        } while (0);
        ok &= jsval_to_std_string(cx, args.get(1), &arg1);
        arg2 = JS::ToBoolean(args.get(2));
        ok &= jsval_to_std_string(cx, args.get(3), &arg3);
        JSB_PRECONDITION2(ok, cx, false, "js_chimpleautogenbindings_MenuContext_create : Error processing arguments");

        auto ret = MenuContext::create(arg0, arg1, arg2, arg3);
        js_type_class_t *typeClass = js_get_type_from_native<MenuContext>(ret);
        JS::RootedObject jsret(cx, jsb_ref_autoreleased_create_jsobject(cx, ret, typeClass, "MenuContext"));
        args.rval().set(OBJECT_TO_JSVAL(jsret));
        return true;
    }
    JS_ReportError(cx, "js_chimpleautogenbindings_MenuContext_create : wrong number of arguments");
    return false;
}

bool js_chimpleautogenbindings_MenuContext_launchGameFromJS(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    if (argc == 1) {
        std::string arg0;
        ok &= jsval_to_std_string(cx, args.get(0), &arg0);
        JSB_PRECONDITION2(ok, cx, false, "js_chimpleautogenbindings_MenuContext_launchGameFromJS : Error processing arguments");
        MenuContext::launchGameFromJS(arg0);
        args.rval().setUndefined();
        return true;
    }
    JS_ReportError(cx, "js_chimpleautogenbindings_MenuContext_launchGameFromJS : wrong number of arguments");
    return false;
}

bool js_chimpleautogenbindings_MenuContext_constructor(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    MenuContext* cobj = new (std::nothrow) MenuContext();

    js_type_class_t *typeClass = js_get_type_from_native<MenuContext>(cobj);

    // link the native object with the javascript object
    JS::RootedObject jsobj(cx, jsb_ref_create_jsobject(cx, cobj, typeClass, "MenuContext"));
    args.rval().set(OBJECT_TO_JSVAL(jsobj));
    if (JS_HasProperty(cx, jsobj, "_ctor", &ok) && ok)
        ScriptingCore::getInstance()->executeFunctionWithOwner(OBJECT_TO_JSVAL(jsobj), "_ctor", args);
    return true;
}


extern JSObject *jsb_cocos2d_Node_prototype;

void js_register_chimpleautogenbindings_MenuContext(JSContext *cx, JS::HandleObject global) {
    jsb_MenuContext_class = (JSClass *)calloc(1, sizeof(JSClass));
    jsb_MenuContext_class->name = "MenuContext";
    jsb_MenuContext_class->addProperty = JS_PropertyStub;
    jsb_MenuContext_class->delProperty = JS_DeletePropertyStub;
    jsb_MenuContext_class->getProperty = JS_PropertyStub;
    jsb_MenuContext_class->setProperty = JS_StrictPropertyStub;
    jsb_MenuContext_class->enumerate = JS_EnumerateStub;
    jsb_MenuContext_class->resolve = JS_ResolveStub;
    jsb_MenuContext_class->convert = JS_ConvertStub;
    jsb_MenuContext_class->flags = JSCLASS_HAS_RESERVED_SLOTS(2);

    static JSPropertySpec properties[] = {
        JS_PS_END
    };

    static JSFunctionSpec funcs[] = {
        JS_FN("showStartupHelp", js_chimpleautogenbindings_MenuContext_showStartupHelp, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("launchGame", js_chimpleautogenbindings_MenuContext_launchGame, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("getPoints", js_chimpleautogenbindings_MenuContext_getPoints, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("init", js_chimpleautogenbindings_MenuContext_init, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("pickAlphabet", js_chimpleautogenbindings_MenuContext_pickAlphabet, 2, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("finalizePoints", js_chimpleautogenbindings_MenuContext_finalizePoints, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("showScore", js_chimpleautogenbindings_MenuContext_showScore, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("isGamePaused", js_chimpleautogenbindings_MenuContext_isGamePaused, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("onChimpTouchBegan", js_chimpleautogenbindings_MenuContext_onChimpTouchBegan, 2, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("jumpOut", js_chimpleautogenbindings_MenuContext_jumpOut, 3, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("transitToScrollableGameMap", js_chimpleautogenbindings_MenuContext_transitToScrollableGameMap, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("onChimpTouchEnded", js_chimpleautogenbindings_MenuContext_onChimpTouchEnded, 2, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FS_END
    };

    static JSFunctionSpec st_funcs[] = {
        JS_FN("create", js_chimpleautogenbindings_MenuContext_create, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("launchGameFromJS", js_chimpleautogenbindings_MenuContext_launchGameFromJS, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FS_END
    };

    JS::RootedObject parent_proto(cx, jsb_cocos2d_Node_prototype);
    jsb_MenuContext_prototype = JS_InitClass(
        cx, global,
        parent_proto,
        jsb_MenuContext_class,
        js_chimpleautogenbindings_MenuContext_constructor, 0, // constructor
        properties,
        funcs,
        NULL, // no static properties
        st_funcs);

    JS::RootedObject proto(cx, jsb_MenuContext_prototype);
    JS::RootedValue className(cx, std_string_to_jsval(cx, "MenuContext"));
    JS_SetProperty(cx, proto, "_className", className);
    JS_SetProperty(cx, proto, "__nativeObj", JS::TrueHandleValue);
    JS_SetProperty(cx, proto, "__is_ref", JS::TrueHandleValue);
    // add the proto and JSClass to the type->js info hash table
    jsb_register_class<MenuContext>(cx, jsb_MenuContext_class, proto, parent_proto);
}

void register_all_chimpleautogenbindings(JSContext* cx, JS::HandleObject obj) {
    // Get the ns
    JS::RootedObject ns(cx);
    get_or_create_js_obj(cx, obj, "goa", &ns);

    js_register_chimpleautogenbindings_MenuContext(cx, ns);
}

