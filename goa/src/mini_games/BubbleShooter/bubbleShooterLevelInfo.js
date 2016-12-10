var xc = xc || {};

xc.bubbleShooterLevelInfo = cc.Layer.extend({
    onEnter: function() {
        
        var level = this.getParent().menuContext.getCurrentLevel();
        if(level == 1) {
            xc.GameScene.load(xc.sortitlevel1Layer);
        } else if(level == 2) {
            xc.GameScene.load(xc.sortitlevel2Layer);
        } else if(level == 3) {
            xc.GameScene.load(xc.sortitlevel3Layer);
        } else if(level == 4) {
            xc.GameScene.load(xc.sortitlevel4Layer);
        } else if(level == 5) {
            xc.GameScene.load(xc.sortitlevel5Layer);
        } else if(level == 6) {
            xc.GameScene.load(xc.sortitlevel6Layer);
        }
                
    }
})
