const KeyboardUI = imports.ui.keyboard;

var disableGestures = true;
var disableOnscreenKeyboard = true;
var disableMenuBar = true;
var disableTopBar = true;

// **************************************************
// * https://github.com/lxylxy123456/cariboublocker
// **************************************************
let _originalLastDeviceIsTouchscreen;

function _modifiedLastDeviceIsTouchscreen() {
    return false;
}

function init() {
    // Extension initialization
}

function enable() {
    // Disable gestures
    if (disableGestures) {
        global.stage.get_actions().forEach(action => {
            action.enabled = false;
        });
    }

    // Disable onscreen keyboard
    if (disableOnscreenKeyboard) {
        _originalLastDeviceIsTouchscreen = KeyboardUI.KeyboardManager.prototype._lastDeviceIsTouchscreen;
        KeyboardUI.KeyboardManager.prototype._lastDeviceIsTouchscreen = _modifiedLastDeviceIsTouchscreen;
    }

}

function disable() {
    // Enable gestures
    if (disableGestures) {
        global.stage.get_actions().forEach(action => {
            action.enabled = true;
        });
    }

    // Enable onscreen keyboard
    if (disableOnscreenKeyboard) {
        KeyboardUI.KeyboardManager.prototype._lastDeviceIsTouchscreen = _originalLastDeviceIsTouchscreen;
        _originalLastDeviceIsTouchscreen = null;
    }
}