const { Gtk, GLib, GObject } = imports.gi;

function init() { }

function buildPrefsWidget() {
    let widget = new MyPrefsWidget();
    widget.show_all();
    return widget;
}

const MyPrefsWidget = GObject.registerClass(
    class MyPrefsWidget extends Gtk.Box {

        _init(params) {

            super._init(params);

            this.margin = 20;
            this.set_spacing(15);
            this.set_orientation(Gtk.Orientation.VERTICAL);

            this.connect('destroy', Gtk.main_quit);

            // SpinButton
            let myLabel = new Gtk.Label({
                label: "Translated Text"
            });

            let spinButton = new Gtk.SpinButton();
            spinButton.set_sensitive(true);
            spinButton.set_range(-60, 60);
            spinButton.set_value(0);
            spinButton.set_increments(1, 2);

            spinButton.connect("value-changed", function (w) {
                log(w.get_value_as_int());
            });

            let hBox = new Gtk.Box();
            hBox.set_orientation(Gtk.Orientation.HORIZONTAL);

            hBox.pack_start(myLabel, false, false, 0);
            hBox.pack_end(spinButton, false, false, 0);

            // TextView
            let textView = new Gtk.TextView();
            textView.set_editable(false);
            textView.set_cursor_visible(false);

            let scrolledWindow = new Gtk.ScrolledWindow({
                hscrollbar_policy: Gtk.PolicyType.NEVER,
                vscrollbar_policy: Gtk.PolicyType.AUTOMATIC
            });
            scrolledWindow.set_size_request(300, 200);
            scrolledWindow.add(textView);

            // Button
            let button = new Gtk.Button({
                label: "ifconfig"
            });

            button.connect("clicked", function () {
                let [success, stdout, stderr] = GLib.spawn_command_line_sync("ifconfig");
                if (success) {
                    textView.get_buffer().set_text(stdout.toString(), stdout.length);
                } else {
                    textView.get_buffer().set_text(stderr.toString(), stderr.length);
                }
            });

            this.add(hBox);
            this.add(button);
            this.add(scrolledWindow);
        }

    });