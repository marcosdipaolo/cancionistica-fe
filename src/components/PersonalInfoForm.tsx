import { FC, useEffect, useState } from "react";
import { useStore } from "../stores/helpers/useStore";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PersonalInfo } from "../stores/data-stores/UserStore";
import { observer } from "mobx-react-lite";

const PersonalInfoForm: FC = () => {
  const { dataStore: { userStore } } = useStore();
  const [ initialValues, setInitialValues ] = useState<PersonalInfo>({
    firstName: "",
    lastName: "",
    addressLineOne: "",
    addressLineTwo: "",
    city: "",
    postcode: "",
    country: "",
    phonenumber: "",
  });

  useEffect(() => {
    if(userStore.personalInfo){ 
      const personalInfo = userStore.personalInfo;
      for(let key in personalInfo) {
        if(personalInfo[key] === null) {
          personalInfo[key] = "";
        }
      }
      setInitialValues(personalInfo);
    }
    
  }, [userStore.personalInfo]);
  
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      firstName: Yup.string().min(3, "El nombre debe contener al menos 2 caracteres").required("Nombre Requerido"),
      lastName: Yup.string().min(3, "El apellido debe contener al menos 2 caracteres").required("Apellido Requerido"),
      phonenumber: Yup.string().min(8, "El teléfono debe contar con al menos 8 caracteres").required("Teléfono Requerido"),
    }),
    onSubmit: (values: PersonalInfo) => {
      userStore.setPersonalInfo(values);
    }
  });

  const renderError = (field: ("firstName" | "lastName" | "phonenumber")) => {
    return formik.touched[ field ] && formik.errors[ field ]
      ? (<div className="invalid-feedback">{formik.errors[ field ]}</div>)
      : null;
  }
  

  return (
    <form className="needs-validation" onSubmit={formik.handleSubmit}>
      <div className="container">
        <h3 className="text-center">Información Personal</h3>
        <div className="row mb-5">
          <div className="col-md-4">
            <label htmlFor="firstName" className="form-label">Nombre<span style={{ color: 'red' }}>*</span></label>
            <input
              id="firstName"
              type="text"
              className={`form-control${formik.touched.firstName && formik.errors.firstName ? ' is-invalid' : ''}`}
              {...formik.getFieldProps('firstName')}
            />
            {renderError("firstName")}
          </div>
          <div className="col-md-4">
            <label htmlFor="lastName" className="form-label">Apellido<span style={{ color: 'red' }}>*</span></label>
            <input
              id="lastName"
              type="text"
              className={`form-control${formik.touched.lastName && formik.errors.lastName ? ' is-invalid' : ''}`}
              {...formik.getFieldProps("lastName")}
            />
            {renderError("lastName")}
          </div>
          <div className="col-md-4">
            <label className="form-label">Email<span style={{ color: 'red' }}>*</span></label>
            <input
              value={userStore.getLoggedUser()?.email}
              name="email"
              type="email"
              className={`form-control`}
              disabled
            />
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-md-4">
            <label className="form-label">Dirección (línea uno)</label>
            <input
              id="addressLineOne"
              type="text"
              className={`form-control`}
              {...formik.getFieldProps("addressLineOne")}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Dirección (línea dos)</label>
            <input
              id="addressLineTwo"
              type="text"
              className={`form-control`}
              {...formik.getFieldProps("addressLineTwo")}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Código Postal</label>
            <input id="postcode" type="text" className={`form-control`} {...formik.getFieldProps("postcode")} />
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-md-4">
            <label className="form-label">Teléfono</label>
            <input
              id="phonenumber"
              type="text"
              className={`form-control${formik.touched.phonenumber && formik.errors.phonenumber ? ' is-invalid' : ''}`}
              {...formik.getFieldProps("phonenumber")}
            />
            {renderError("phonenumber")}
          </div>
          <div className="col-md-4">
            <label className="form-label">Ciudad</label>
            <input id="city" type="text" className={`form-control`} {...formik.getFieldProps("city")} />
          </div>
          <div className="col-md-4">
            <label className="form-label">País</label>
            <input id="country" type="text" className={`form-control`} {...formik.getFieldProps("country")} />
          </div>
        </div>
        <div className="text-center">
          <button className="btn btn-primary">Guardar</button>
        </div>
      </div>
    </form >
  );
};

export default observer(PersonalInfoForm);