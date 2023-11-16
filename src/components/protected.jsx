import { PasswordStatus, PrimaryButton, TextBox } from "@react-pdf-viewer/core";
import { useState } from "react";

const ProtectedView = ({ passwordStatus, verifyPassword }) => {
  const [password, setPassword] = useState("");
  const submit = () => verifyPassword(password);

  return (
    <>
      <TextBox
        placeholder="Enter the password ..."
        type="password"
        value={password}
        onChange={setPassword}
      />
      {passwordStatus === PasswordStatus.WrongPassword && (
        <div>The password is invalid. Please try again!</div>
      )}

      <PrimaryButton onClick={submit}>Submit</PrimaryButton>
    </>
  );
};

export default ProtectedView;
