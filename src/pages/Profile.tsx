import { useParams } from "react-router-dom";

interface ProfileData {
  [username: string]: {
    name: string;
    message: string;
  };
}

const data: ProfileData = {
  chanwoong1: {
    name: "찬웅",
    message: "hello",
  },
  abcd: {
    name: "alphabet",
    message: "efgh",
  },
};

function Profile() {
  const { username } = useParams<{ username: string }>();
  let profile = null;
  if (typeof username !== "undefined") {
    profile = data[username];
  }

  return (
    <div>
      <h1>User Profile</h1>
      {profile ? (
        <div>
          <h2>{profile.name}</h2>
          <p>{profile.message}</p>
        </div>
      ) : (
        <p>존재하지 않는 프로필 입니다.</p>
      )}
    </div>
  );
}

export default Profile;
