import WFRP2ItemSheet from "./customItemSheet.js";
import WHRP2ItemSheet from "./customItemSheet.js"

Hooks.once("init", function() {
    console.log("test | Initializing system");

    WHRP2ItemSheet.unregisterSheet("core", ItemSheet);
    Items.registerSheet("WFRP2", WFRP2ItemSheet, {makeDefault: true});
});
