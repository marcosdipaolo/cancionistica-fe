import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { useInjection } from "../../container/inversify-hook";
import { TYPES } from "../../container/types";
import { IAuthService } from "../../services/AuthService";
import { useStore } from "../../stores/helpers/useStore";

const ResendEmailVerification: FC = () => {
  const authService = useInjection<IAuthService>(TYPES.authService);
  const { dataStore: { userStore } } = useStore();
  const [ sending, setSending ] = useState<boolean>(false);
  const [ emailVerifiedAt, setEmailVerifiedAt ] = useState<string | null>(null);

  useEffect(() => {
    setEmailVerifiedAt(userStore.getLoggedUser()?.emailVerifiedAt);
  }, []);

  const resendHandler = () => {
    setSending(true);
    authService.resendEmailVerificationNotification().then(() => {
      setSending(false);
    });
  };
  return (
    <>
      <h3 className="text-center">Verificación de email</h3>
      { emailVerifiedAt ? (
        <p className="text-center text-primary fw-normal">
          Tu direccion de email <em>{userStore.getLoggedUser()?.email}</em> ya está verificada <i className="icon-checkmark text-success" />
        </p>
      ) : (
        <div className="text-center">
          <button
            onClick={ resendHandler }
            className="btn btn-primary"
            disabled={ sending }
            style={ { width: '200px', height: '52px' } }
          >
            { sending ? (<span className="spinner-grow text-white m-0" role="status" aria-hidden="true" />) : "" }
            { sending ? "" : "Reenviar Notificación" }

          </button>
        </div>
      )}
    </>
  );
};

export default observer(ResendEmailVerification);