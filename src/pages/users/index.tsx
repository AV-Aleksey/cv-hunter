import { observer } from 'mobx-react';
import { FC, useState } from 'react';
import { useRootStore } from '../../providers/RootStoreProvider';

type Props = {
    users: any[];
    id: number;
};

const Users = ({ users, id }: Props): ReturnType<FC> => {
    const { testStore } = useRootStore();
    const [loading, setLoading] = useState(!users);

    if (loading) {
        return <div>loading...</div>;
    }

    return (
        <div>
            {users?.map(({ name }, i) => (
                <div key={i}>{name}</div>
            ))}
        </div>
    );
};

export default observer(Users);

export async function getStaticProps(ctx: any): Promise<any> {
    if (!ctx.req) {
        return { props: { users: null } };
    }

    const data = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await data.json();

    return {
        props: { users, id: 1 }, // will be passed to the page component as props
    };
}
