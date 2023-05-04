import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GrFormClose } from "react-icons/gr";
import MovieContext from "../../context/MovieContext";

const PopupModal = ({ setIsSubmitForm, authModal }) => {
  const { setAuth } = useContext(MovieContext);
  const navigate = useNavigate();

  const goHome = () => {
    setAuth(true);
    navigate("/home");
  };

  const closePopup = () => {
    setIsSubmitForm(false);
  };

  const tokenRequest = JSON.parse(localStorage.getItem("tokenRequest"));

  return (
    <div>
      <div className="pop-bckground relative">
        <div className="container-form text-center pop-border absolute">
          <div className="closeIcon">
            <GrFormClose onClick={closePopup} />
          </div>
          <div>
            <h3>Thank You for your registration!</h3>
            {authModal == "true" ? (
              <p>Welcome!</p>
            ) : (
              <p>
                We've send you on your email link to activate your account.
                Please check your email or check spam folder if you cannot find
                activation link.
              </p>
            )}
          </div>
          {authModal == "true" ? (
            <button className="btnPrimary" onClick={goHome}>
              Home
            </button>
          ) : (
            <a
              className="btnPrimary"
              // href={`https://www.themoviedb.org/authenticate/${tokenRequest}`}
              href={`https://www.themoviedb.org/authenticate/${tokenRequest}?redirect_to=http://localhost:3000/home`}
              rel="noreferrer"
              target="_blank"
            >
              Activate Account
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
