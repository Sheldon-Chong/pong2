import { oscillateValue } from "../utils/calculations.js";
export const clientScripts = {
    moveCrowd: (object) => {
        const amplitude = 5;
        const frequency = 0.5;
        const baseY = -240;
        // apply oscillation
        object.position.y = oscillateValue(baseY, amplitude, frequency, Number(object.id % 2 === 0) * 15);
    },
};
//# sourceMappingURL=clientScripts.js.map