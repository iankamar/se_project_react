import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  buttonText = "Add garment",
  title,
  onClose,
  name,
  onSubmit,
  closeModal,
}) => {
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
          <form className="modal__form" onSubmit={onSubmit}>
            {children}
            <button type="submit" className="modal__save">
              Add Garment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalWithForm;
