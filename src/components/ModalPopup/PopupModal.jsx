import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GrFormClose } from 'react-icons/gr';


const PopupModal = ({setIsSubmitForm}) => {

  const navigate = useNavigate();

  const goHome = () => {
    navigate('/home');
    
  }

  const closePopup = () => {
    setIsSubmitForm(false)
  }

  return (

    <div>
      <div className="pop-bckground relative">
        <div className="container-form text-center pop-border absolute">
          <div className='closeIcon'>
              <GrFormClose onClick={closePopup}/>
          </div>
          <div>
            <h3>Thank You for your registration!</h3>
            <p>We've send you on your email link to activate your account.
            Please check your email or check spam folder if you cannot find activation link.
            </p>
          </div>
          <button className='btnPrimary' onClick={goHome}>Home</button>
        </div>
      </div>
      

    </div>
  )
}

export default PopupModal;