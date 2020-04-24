const RealDate = Date;
const InitialNow = 1587559258;

export let now = InitialNow;

export function beforeEach() {
	// Reset now to its initial value
	now = InitialNow;

	// Override Date
	Date = class extends RealDate {
		constructor() {
			super();
			return new RealDate(now * 1000);
		}
	} as DateConstructor;
}

export function afterEach() {
	Date = RealDate;
}

export function setCurrentTime(newNow: number) {
	now = newNow;
}
