import { FC, useState } from "react";
import { useStore } from "../stores/helpers/useStore";

const PersonalInfoForm: FC = () => {
  const { dataStore: { userStore } } = useStore();
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ phonenumber, setPhonenumber ] = useState("");
  const [ addressLineOne, setAddressLineOne ] = useState("");
  const [ addressLineTwo, setAddressLineTwo ] = useState("");
  const [ postcode, setPostcode ] = useState("");
  const [ city, setCity ] = useState("");
  const [ country, setCountry ] = useState("");
  return (
    <form>
      <div className="container">
        <h3 className="text-center">Información Personal</h3>
        <div className="row mb-5">
          <div className="col-md-4">
            <label className="form-label">Nombre</label>
            <input onChange={ (e) => setFirstName(e.target.value) } value={ firstName } type="text" className="form-control" />
          </div>
          <div className="col-md-4">
            <label className="form-label">Apellido</label>
            <input onChange={ (e) => setLastName(e.target.value) } value={ lastName } type="text" className="form-control" />
          </div>
          <div className="col-md-4">
            <label className="form-label">Email</label>
            <input type="text" value={userStore.getLoggedUser()!.email} className="form-control" disabled />
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-md-4">
            <label className="form-label">Dirección (línea uno)</label>
            <input onChange={ (e) => setAddressLineOne(e.target.value) } value={ addressLineOne } type="text" className="form-control" />
          </div>
          <div className="col-md-4">
            <label className="form-label">Dirección (línea dos)</label>
            <input onChange={ (e) => setAddressLineTwo(e.target.value) } value={ addressLineTwo } type="text" className="form-control" />
          </div>
          <div className="col-md-4">
            <label className="form-label">Código Postal</label>
            <input onChange={ (e) => setPostcode(e.target.value) } value={ postcode } type="text" className="form-control" />
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-md-4">
            <label className="form-label">Teléfono</label>
            <input onChange={ (e) => setPhonenumber(e.target.value) } value={ phonenumber } type="text" className="form-control" />
          </div>
          <div className="col-md-4">
            <label className="form-label">Ciudad</label>
            <input onChange={ (e) => setCity(e.target.value) } value={ city } type="text" className="form-control" />
          </div>
          <div className="col-md-4">
            <label className="form-label">País</label>
            <input onChange={ (e) => setCountry(e.target.value) } value={ country } type="text" className="form-control" />
          </div>
        </div>
      </div>
    </form >
  );
};

export default PersonalInfoForm;