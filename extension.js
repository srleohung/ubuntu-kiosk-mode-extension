const KeyboardUI = imports.ui.keyboard;

var disableGestures = true;
var disableOnscreenKeyboard = true;

// **************************************************
// * https://github.com/lxylxy123456/cariboublocker
// **************************************************
let _originalLastDeviceIsTouchscreen;

function _modifiedLastDeviceIsTouchscreen() {
    return false;
}

// **************************************************
// * Extension
// **************************************************
function init() {
    // Extension initialization
}

function enable() {
    // Disable gestures
    if (disableGestures) {
        global.stage.get_actions().forEach(action => {
            action.enabled = false;
        });
        print('disabled gestures');
    }

    // Disable onscreen keyboard
    if (disableOnscreenKeyboard) {
        _originalLastDeviceIsTouchscreen = KeyboardUI.KeyboardManager.prototype._lastDeviceIsTouchscreen;
        KeyboardUI.KeyboardManager.prototype._lastDeviceIsTouchscreen = _modifiedLastDeviceIsTouchscreen;
        print('disabled onscreen keyboard');
    }
}

function disable() {
    // Enable gestures
    if (disableGestures) {
        global.stage.get_actions().forEach(action => {
            action.enabled = true;
        });
        print('enabled gestures');
    }

    // Enable onscreen keyboard
    if (disableOnscreenKeyboard) {
        KeyboardUI.KeyboardManager.prototype._lastDeviceIsTouchscreen = _originalLastDeviceIsTouchscreen;
        _originalLastDeviceIsTouchscreen = null;
        print('enabled onscreen keyboard');
    }
}