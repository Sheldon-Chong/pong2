import { exportCleanup } from './objects/GameObject';
import { Label } from './objects/Label';
export class PadelLabel extends Label {
    export(exportStatic = false) {
        return exportCleanup({
            id: this.id,
            name: this.name,
            className: this.className,
            STATIC_position: this.position.export(),
            STATIC_scale: this.scale,
            STATIC_rotation: this.rotation,
            STATIC_components: this.componentToJSON(exportStatic),
            STATIC_children: this.children?.map(child => child.id),
            STATIC_text: this.text,
            STATIC_font: this.font,
            STATIC_color: this.color
        }, exportStatic);
    }
}
//# sourceMappingURL=PadelLabel.js.map