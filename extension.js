const { Clutter, Meta } = imports.gi;
const KeyboardUI = imports.ui.keyboard;
const Main = imports.ui.main;

var disableGestures = true;
var disableOnscreenKeyboard = true;
var disableTopBar = true;
var enableEventCapture = false

// **************************************************
// * https://github.com/lxylxy123456/cariboublocker
// **************************************************
let _originalLastDeviceIsTouchscreen;

function _modifiedLastDeviceIsTouchscreen() {
    return false;
}

// **************************************************
// * Event capture
// **************************************************
let eventCaptureId = 0;

function onCapturedEvent(actor, event) {
    if (event.type() === Clutter.EventType.TOUCH_BEGIN || event.type() === Clutter.EventType.TOUCH_UPDATE || event.type() === Clutter.EventType.TOUCH_END) {
        const [x, y] = event.get_coords();
        log(`event type: ${event.type()} x: ${x} y: ${y}`)
    } else {
        log(`event type: ${event.type()}`)
    }
    return Clutter.EVENT_PROPAGATE;
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

    // Disable top bar
    if (disableTopBar) {
        Main.panel.add_style_class_name('hide-top-bar');
        Main.panel._hideIndicators()
    }

    // Enable event capture
    if (enableEventCapture) {
        eventCaptureId = global.stage.connect('event', onCapturedEvent);
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

    // Enable top bar
    if (disableTopBar) {
        Main.panel.remove_style_class_name('hide-top-bar');
    }

    // Disable event capture
    if (enableEventCapture) {
        global.stage.disconnect(eventCaptureId);
    }
}