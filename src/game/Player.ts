
export class Player {
	name: string = "";
	profileImage: string = "";
	skin: string = "ghost_dark";

	constructor(params: Partial<Player> = {}) {
		Object.assign(this, params);
	}
}
