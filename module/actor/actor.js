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

        if ("staty" in data)
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

        data.staty.s = data.staty.k / 10;
        data.staty.wt = data.staty.odp / 10;

        data.stan.hp.max = data.staty.zyw.value;
        //data.stan.hp.value = data.staty.zyw;
    }

    /**
     * Prepare Character type specific data
     */
    _prepareCharacterData(actorData) {}
}
