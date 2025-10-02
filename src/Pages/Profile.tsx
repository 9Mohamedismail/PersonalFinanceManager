import { useContext } from "react";
import Accounts from "../components/ProfilePage/Accounts";
import GeneralInfo from "../components/ProfilePage/GeneralInfo";
import { UserInfoContext } from "../Context/UserInfoContext";

function Profile() {
  const { user } = useContext(UserInfoContext);

  return (
    <div className="py-10 px-4 lg:px-8 flex justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start max-w-7xl w-full">
        <GeneralInfo username={user?.username} email={user?.email} />
        <Accounts />
      </div>
    </div>
  );
}

export default Profile;
