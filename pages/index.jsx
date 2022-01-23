import { useState } from "react";

export default function Home({ posts: postsProps }) {
    const [start, setStart] = useState(5);
    const [posts, setPosts] = useState(postsProps);

    async function loadMore() {
        const req = await fetch(
            `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=5`
        );
        const newPosts = await req.json();

        setStart(start + 5);
        setPosts([...posts, ...newPosts]);
    }
    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Load More Test</h1>

            <div
                style={{
                    width: "700px",
                    textAlign: "center",
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
            >
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Title</th>
                            <th>Body</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(({ id, title, body }) => {
                            return (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>{title}</td>
                                    <td>{body}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div style={{ textAlign: "center" }}>
                <button onClick={loadMore}>Load More</button>
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    const req = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_start=0&_limit=5"
    );
    const posts = await req.json();

    return {
        props: {
            posts,
        },
    };
}
