export default class StoryUtil {
    static generateUUID() {
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now();; //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };


    static map_to_object(map) {
        const out = Object.create(null);
        map.forEach((value, key) => {
            if (value instanceof Map) {
                out[key] = StoryUtil.map_to_object(value);
            }
            else {
                out[key] = value;
            }
        })
        return out;
    };
    
    static objectToMap(object) {
        const out = new Map();
        let keys = Object.keys(object);
        keys.forEach(function(key) {
            let spriteMap = out.get(key);
            if (!spriteMap) {
                spriteMap = new Map();
                out.set(key, spriteMap);
            }
            let oKeys = Object.keys(object[key]);
            oKeys.forEach(function(k1) {
                let val2 = object[key][k1];
                spriteMap.set(k1, val2);
            });
        });
        return out
    }

}