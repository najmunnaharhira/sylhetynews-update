import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState<null | {
    user: {
      name: string;
      email: string;
    };
    posts: {
      id: string;
      content: string;
      author: string;
    }[];
  }>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const userData = await response.json();
        setData({
          user: {
            name: userData[0].name,
            email: userData[0].email,
          },
          posts: [],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const user = useMemo(() => data?.user, [data]);
  const posts = useMemo(() => data?.posts, [data]);

  const handleLogout = () => {
    setData(null);
    navigate("/");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>No user data available</p>
        </div>
      )}
      {posts?.map((post) => (
        <div key={post.id}>
          <p>{post.content} by {post.author}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;

