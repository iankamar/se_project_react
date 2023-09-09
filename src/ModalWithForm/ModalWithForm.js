import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  buttonText = "Add garment",
  title,
  onClose,
  name,
}) => {
  console.log("ModalWithForm");
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content">
        <div className="modal__fieldset">
          <button type="button" className="modal__close" onClick={onClose}>
            &#x2715;
          </button>
          <h3 className="modal__title">{title}</h3>
        </div>
        <div className="modal__fieldset">
          <form className="modal__form">{children}</form>
        </div>
        <button type="submit" className="modal__save">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ModalWithForm;
