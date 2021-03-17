/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class WFRP2eActorSheet extends ActorSheet {
    /************************************************
     *             Static methods                   *
     ************************************************/

     /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["wfrp2e", "sheet", "actor"], /* CSS classes to apply for the character sheet */
            template: "systems/wfrp2e/templates/actor/actor-sheet.html",
            width: 600,
            height: 600,
            /* Tabs on the character sheet. navSelector and contentSelector are the default ones. */
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "stats" }]
        })
    }

    /************************************************
     *              Data methods                    *
     ************************************************/

    /** @override */
    getData() {
        const data = super.getData();
        /* TODO - modify data before returning them to the sheet. */
        return data;
    }

    /************************************************
     *              Listeners related               *
     ************************************************/

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        // Make sure the sheet is editable
        if (!this.options.editable) return;

        // Add inventory item
        html.find('.item-create').click(this._onItemCreate.bind(this));

        // Update Inventory Item
        html.find('.item-edit').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.getOwnedItem(li.data("itemId"));
            item.sheet.render(true);
        });

        // Delete Inventory Item
        html.find('.item-delete').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            this.actor.deleteOwnedItem(li.data("itemId"));
            li.slideUp(200, () => this.render(false));
        })
    }

    /**
     * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
     * @param {Event} event   The originating click event
     * @private
     */
    _onItemCreate(event) {
        event.preventDefault();
        const header = event.currentTarget;
        // Get the type of item to create.
        const type = header.dataset.type;
        // Grab any data associated with this control.
        const data = duplicate(header.dataset);
        // Initialize a default name.
        const name = `Nowy ${type.capitalize()}`;
        // Prepare the item object.
        const itemData = {
            name: name,
            type: type,
            data: data
        };
        // Remove the type from the dataset since it's in the itemData.type prop.
        delete itemData.data["type"];

        // Finally, create the item!
        return this.actor.createOwnedItem(itemData);
    }
}