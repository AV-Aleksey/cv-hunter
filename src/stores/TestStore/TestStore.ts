import { action, makeObservable, observable } from "mobx";
import { RootStore } from '../RootStore/RootStore';

export type TestHydration = {
    start: number;
};

export class TestStore {
    root: RootStore;
    counter: number = 0;

    constructor(root: RootStore) {
        this.root = root;
        makeObservable(this, {
            hydrate: action,
            counter: observable,
            increment: action.bound,
            decrement: action,
        });
    }

    increment() {
        this.counter = this.counter + 1;
    }

    decrement() {
        this.counter = this.counter - 1;
    }

    hydrate(data?: TestHydration) {
        if (data) {
            this.counter = data.start;
        }
    }
}
