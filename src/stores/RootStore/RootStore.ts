import { TestHydration, TestStore } from "../TestStore/TestStore";


export type RootStoreHydration = {
    stopwatchStore?: TestHydration;
};

export class RootStore {
    testStore: TestStore;

    constructor() {
       this.testStore = new TestStore(this);
    }

    hydrate(data: RootStoreHydration) {
        if (data.stopwatchStore) {
            this.testStore.hydrate(data.stopwatchStore);
        }
    }
}
