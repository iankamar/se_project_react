import { useContext, useState } from "react";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import { updateUser } from "./api";

function EditProfileModal() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [avatar, setAvatar] = useState(currentUser.avatar);

  const handleSubmit = (event) => {
    event.preventDefault();

    updateUser(currentUser._id, name, avatar)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="text"
        value={avatar}
        onChange={(event) => setAvatar(event.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  );
}

export default EditProfileModal;
