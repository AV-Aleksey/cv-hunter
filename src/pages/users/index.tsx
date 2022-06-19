import {useRootStore} from "../../providers/RootStoreProvider";
import {observer} from "mobx-react";
import {useEffect, useState} from "react";

type Props = {
    users: any[];
    id: number;
}

const Users = ({ users, id }: Props) => {
    const { testStore } = useRootStore();
    console.log(users);
    const [loading, setLoading] = useState(!Boolean(users))

    if (loading) {
        return <div>loading...</div>
    }

    useEffect(() => {}, [users])

    return (
        <div>
            {
                users?.map(({name}, i) => {
                    return <div key={i}>{name}</div>
                })
            }
        </div>

    )
}

export default observer(Users);

export async function getStaticProps(ctx) {
    // if (!ctx.req) {
    //    return { props: { users: null } }
    // }

    const data = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await data.json();

    return {
        props: { users, id: 1 }, // will be passed to the page component as props
    }
}

