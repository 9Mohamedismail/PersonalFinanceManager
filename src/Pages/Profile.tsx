import Accounts from "../ProfilePage/Accounts";
import GeneralInfo from "../ProfilePage/GeneralInfo";
import Password from "../ProfilePage/Password";

function Profile() {
  return (
    <div className="py-10 px-4 lg:px-8">
      <div className="grid grid-cols-2 grid-rows-2 gap-4 ">
        <GeneralInfo />
        <div className="row-span-2">
          <Accounts />
        </div>
        <Password />
      </div>
    </div>
  );
}

export default Profile;
