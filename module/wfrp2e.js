import { WFRP2eActor } from "./actor/actor.js";
import { WFRP2eActorSheet } from "./actor/actor-sheet.js";
//import { WFRP2eItem } from "./item/item.js";
//import { WFRP2eItemSheet } from "./item/item-sheet.js";

Hooks.once("init", function() {
    console.log("WFRP2e      | Initializing system");

    game.wfrp2e = {
        WFRP2eActor,
//        WFRP2eItem
    };

   /**
    * Set an initiative formula for the system
    * @type {String}
    */
    CONFIG.Combat.initiative = {
        formula: "1d10 + @statsBasic.zr.value",
        decimals: 2
    }

    CONFIG.Actor.entityClass = WFRP2eActor;
//    CONFIG.Item.entityClass = WFRP2eItem;

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("wfrp2e", WFRP2eActorSheet, {makeDefault: true});

//    Items.unregisterSheet("core", ItemSheet);
//    Items.registerSheet("wfrp2e", WFRP2eItemSheet, {makeDefault: true});

    Handlebars.registerHelper('isStatConst', function (name) {
        return name === "wt" || name === "s";
    });
});
