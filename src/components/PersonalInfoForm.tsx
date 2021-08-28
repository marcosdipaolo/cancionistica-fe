import { FC, useState } from "react";
import { useStore } from "../stores/helpers/useStore";

const PersonalInfoForm: FC = () => {
  const { dataStore: { userStore } } = useStore();
  const [ firstName, setFirstName ] = useState("");
  return (
    <form>
      <input onChange={ (e) => setFirstName(e.target.value) } value={ firstName } type="text" className="form-control" />
    </form>
  );
};

export default PersonalInfoForm;