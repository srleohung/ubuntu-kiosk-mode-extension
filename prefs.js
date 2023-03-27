const { Gio, Gtk, GLib, GObject } = imports.gi;

function init() { }

function buildPrefsWidget() {
    let widget = new UKMPrefsWidget();
    widget.show_all();
    return widget;
}

function readConfigFile() {
    let f = Gio.File.new_for_path(GLib.build_filenamev(['custom.json']));
    let contents = '';
    try {
        [, contents] = f.load_contents(null);
        return JSON.parse(contents);
    } catch (e) {
        logError(e);
    }
    return null;
}

const UKMPrefsWidget = GObject.registerClass(
    class UKMPrefsWidget extends Gtk.Box {

        _init(params) {

            super._init(params);
            this.margin = 20;
            this.set_spacing(15);
            this.set_orientation(Gtk.Orientation.VERTICAL);
            this.connect('destroy', Gtk.main_quit);

            // **************************************************
            // * Output viewer
            // **************************************************
            let outputView = new Gtk.TextView();
            outputView.set_editable(false);
            outputView.set_cursor_visible(false);

            let scrolledWindow = new Gtk.ScrolledWindow({
                hscrollbar_policy: Gtk.PolicyType.NEVER,
                vscrollbar_policy: Gtk.PolicyType.AUTOMATIC
            });
            scrolledWindow.set_size_request(640, 480);
            scrolledWindow.add(outputView);

            // **************************************************
            // * Custom configuration
            // **************************************************
            let customConfig = readConfigFile();
            if (customConfig) {
                for (let config of customConfig) {
                    let button = new Gtk.Button({ label: config.label });
                    button.connect('clicked', () => {
                        let [success, stdout, stderr] = GLib.spawn_command_line_sync(config.command);
                        if (success) {
                            outputView.get_buffer().set_text(stdout.toString(), stdout.length);
                        } else {
                            outputView.get_buffer().set_text(stderr.toString(), stderr.length);
                        }
                    });
                    this.add(button);
                }
            }
            this.add(scrolledWindow);
        }

    });