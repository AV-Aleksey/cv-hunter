import {useRootStore} from "../../providers/RootStoreProvider";
import {observer} from "mobx-react";

type Props = {
    users: any[];
    id: number;
}

const Users = ({ users, id }: Props) => {
    const { testStore } = useRootStore();

    return (
        <div>
            <div>{testStore.counter}</div>
            <button onClick={testStore.increment}>click</button>
        </div>

    )
}

export default observer(Users);

export async function getStaticProps() {
    return {
        props: { users: [], id: 1 }, // will be passed to the page component as props
    }
}

