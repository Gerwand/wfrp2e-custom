/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class WFRP2eActor extends Actor {
    /**
     * Augment the basic actor data with additional dynamic data.
     */
    prepareData() {
        super.prepareData();

        const actorData = this.data;
        const data = actorData.data;
        const flags = actorData.flags;

        console.log("WFRP2e      | preparing actor data");

        if ("statsBasic" in data)
            this._calcStats(actorData);

        // Make separate methods for each Actor type (character, npc, etc.) to keep
        // things organized.
        if (actorData.type === 'character') this._prepareCharacterData(actorData);
    }


    /**
     * Calculate dynamic statistics for the character.
     */
    _calcStats(actorData) {
        const data = actorData.data;

        data.statsExtra.s.value = Math.floor(data.statsBasic.k.value / 10);
        data.statsExtra.wt.value = Math.floor(data.statsBasic.odp.value / 10);

        data.state.hp.max = data.statsExtra.zyw.value;
        data.state.hp.value = Math.min(data.state.hp.value, data.state.hp.max);
        data.state.ammo.value = Math.max(data.state.ammo.value, 0);
    }

    /**
     * Prepare Character type specific data
     */
    _prepareCharacterData(actorData) {}
}
