import InfoRow from "./InfoRow";

function Password() {
  return (
    <form className="bg-white rounded-lg shadow-sm border border-primary w-full flex flex-col gap-2 p-4">
      <InfoRow label="Current Password:">
        <input
          className="bg-white rounded shadow-sm border border-primary py-2 px-4 leading-tight 
               focus:outline-none focus:border-primary"
          type="password"
          name="currentPassword"
        />
      </InfoRow>

      <InfoRow label="New Password:">
        <input
          className="bg-white rounded shadow-sm border border-primary py-2 px-4 leading-tight 
               focus:outline-none focus:border-primary"
          type="password"
          name="newPassword"
        />
      </InfoRow>

      <InfoRow label="Confirm Password:">
        <input
          className="bg-white rounded shadow-sm border border-primary py-2 px-4 leading-tight 
               focus:outline-none focus:border-primary"
          type="password"
          name="confirmPassword"
        />
      </InfoRow>
    </form>
  );
}

export default Password;
