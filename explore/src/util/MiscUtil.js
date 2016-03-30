export default class MiscUtil {
    constructor() {
        
    }
 
    /**
     * @param  {any} displayObject
     * @param  {any} priorityID If given, set the priorityID to this. If not, take the current maximum priorityID and increment and set
     */
    static setPriorityID(displayObject, priorityID) {
        if(priorityID) {
            displayObject.input.priorityID = priorityID;
            if(!displayObject.game.currentMaxPriorityID || priorityID > displayObject.game.currentMaxPriorityID) {
                displayObject.game.currentMaxPriorityID = priorityID; 
            }
        } else {
            displayObject.input.priorityID = ++displayObject.game.currentMaxPriorityID;        
        }
    }
    
    static resetPriorityID(displayObject, priorityID) {
        displayObject.game.currentMaxPriorityID = priorityID;
    } 
    
    static getMaxPriorityID(game) {
        return game.currentMaxPriorityID || 0;
    }
    
    static incrementMaxPriorityID(game) {
        if(!game.currentMaxPriorityID) {
            game.currentMaxPriorityID = 0;
        }
        return ++game.currentMaxPriorityID;
    }
}
