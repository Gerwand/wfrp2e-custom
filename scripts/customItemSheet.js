export default class WFRP2ItemSheet extends ItemSheet {
        get template() {
            return `systems/wfrp2/templates/sheets/${this.item.data.type}-sheet.html`;
        }
}
