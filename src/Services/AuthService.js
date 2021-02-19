import firebaseConfig from "../Config/config";
import { createUser } from "./UserService";

export const register = async (name, email, password) => {
  try {
    if(name.length<3) throw Error('The name must be 3 characters long or more.')
    const user = await firebaseConfig
      .auth()
      .createUserWithEmailAndPassword(email, password);
    createUser({ id: user.user.uid, email, name });
    return;
  } catch (err) {
    return err.message;
  }
};
export const login = async (email, password) => {
  try {
    await firebaseConfig.auth().signInWithEmailAndPassword(email, password);
    return;
  } catch (err) {
    return err.message;
  }
};
export const logout = () => {
  firebaseConfig
    .auth()
    .signOut()
    .then(() => {
      return;
    })
    .catch((err) => console.log(err));
};
export const resetPassword = async (email) => {
  try {
    await firebaseConfig.auth().sendPasswordResetEmail(email);
    return;
  } catch (err) {
    return err.message;
  }
};
