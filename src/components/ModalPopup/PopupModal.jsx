import React from "react";
import { GrFormClose } from "react-icons/gr";

const PopupModal = ({ setIsSubmitForm }) => {
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
            <p>
              We've send you on your email link to activate your account. Please
              check your email or check spam folder if you cannot find
              activation link.
            </p>
          </div>

          <a
            className="btnPrimary"
            href={`https://www.themoviedb.org/authenticate/${tokenRequest}?redirect_to=http://localhost:3000/home`}
            rel="noreferrer"
            target="_blank"
          >
            Activate Account
          </a>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
