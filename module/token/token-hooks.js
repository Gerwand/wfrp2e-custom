export function wfrp2eRegisterTokenHooks() {
    Hooks.on("renderTokenHUD",  _renderTokenHUD);
}

function _onClickPSHUD(event) {
    const token = canvas.tokens.get(event.data._id);
    const actor = token.actor;
    const actorState = token.actor.data.data.state;

    // Check if '+' was clicked
    if (event.target.id === "ps-add") {
        // First - make sure the actor DB is updated on the sheet.
        // Second - update local value, to make sure render will see
        // the latest.
        actor.modifyTokenAttribute("state.ps.value", +1, true, false);
        ++actorState.ps.value;
    } else {
        if (actorState.ps.value > 0) {
            actor.modifyTokenAttribute("state.ps.value", -1, true, false);
            --actorState.ps.value;
        }
    }

    // Update the token HUD
    token.layer.hud.render();
}

async function _renderTokenHUD(hud, html, token) {
    console.log("WFRP2e      | wfrp2eRenderTokenHUD hook executed");

    // Elevation is not used in WFRP2e
    const elevationDOM = html.find('.attribute.elevation');
    elevationDOM.remove();

    const actor = game.actors.get(token.actorId);
    const actorData = actor.data.data;
    const statsExtra = actorData.statsExtra;
    const state = actorData.state;

    if (statsExtra === null || state === null)
        return;

    const ps = state.ps.value;
    // In rare case, PS will be greater than PP. Also
    // we can render maximum 6 PS.
    let psMax = Math.max(state.ps.value, statsExtra.pp.value);

    let morePS = false;
    let diffPS = 0;
    if (psMax > 6) {
        morePS = true;
        diffPS = psMax - 6;
        psMax = 6;
    }

    let psValues = [];
    let i;
    for (i = 0; i < psMax; ++i) {
        psValues.push(i < ps);
    }

    const psData = {
        values: psValues,
        more: morePS,
        diff: diffPS,
    };
    const psBar = await renderTemplate("systems/wfrp2e/templates/token/token-ps-hud.html", { psData });
    html.append(psBar).click(token, _onClickPSHUD);
}