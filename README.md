# ubuntu-kiosk-mode-extension

# Kiosk Mode Feature List
- Disable gestures
- Disable onscreen keyboard

# Debug Extension
To Debug the Extension (extension.js), use this in terminal:
```bash
journalctl -f -o cat /usr/bin/gnome-shell
```

To Debug the Extension Preferences (prefs), use this in terminal:
```bash
journalctl -f -o cat /usr/bin/gnome-shell-extension-prefs
```

# Schema
To compile the xml file, open terminal in your extension folder and do this:
```
glib-compile-schemas schemas/
```

# Useful Basics
- Folder and File path:
    ```javascript
    const Me = imports.misc.extensionUtils.getCurrentExtension();
    let extensionFolderPath = Me.path();
    let folderPath = Me.dir.get_child('folder').get_path();
    let folderExists = Me.dir.get_child('folder').query_exists(null);
    let fileExists = Me.dir.get_child('myfile.js').query_exists(null);
    ```
- Getting information from meta.json:
    ```javascript
    let extensionName = Me.metadata.name;
    let extensionUUID = Me.metadata.uuid;
    ```
- Import another js file:
    ```javascript
    const Me = imports.misc.extensionUtils.getCurrentExtension();
    const OtherFile = Me.imports.otherfile;
    let result = OtherFile.functionNameInsideOtherFile();
    ```
- Send Notification:
    ```javascript
    const Main = imports.ui.main;
    Main.notify('Message Title', 'Message Body');
    ```
- Mainloop:
    ```javascript
    const Mainloop = imports.mainloop;
    let timeout = Mainloop.timeout_add_seconds(2.5, () => {
    // this function will be called every 2.5 seconds
    });
    // remove mainloop
    Mainloop.source_remove(timeout);
    ```
- Date and time with GLib:
    ```javascript
    const GLib = imports.gi.GLib;
    let now = GLib.DateTime.new_now_local();
    let nowString = now.format("%Y-%m-%d %H:%M:%S");
    ```

# References
- [How-to-Create-A-GNOME-Extension](https://www.codeproject.com/Articles/5271677/How-to-Create-A-GNOME-Extension)
- [cariboublocker](https://github.com/lxylxy123456/cariboublocker)
- [gnome-shell-extension-clear-top-bar](https://github.com/superterran/gnome-shell-extension-clear-top-bar)