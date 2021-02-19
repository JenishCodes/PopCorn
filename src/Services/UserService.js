import firebaseConfig from "../Config/config";

export const createUser = (user) => {
  firebaseConfig
    .storage()
    .ref("Logo.png")
    .getDownloadURL()
    .then((url) =>
      firebaseConfig
        .firestore()
        .collection("user")
        .doc(user.id)
        .set({ ...user, rated: [], watchlist: [], photo: url })
        .then(() => {})
        .catch((err) => console.log(err))
    )
    .catch((err) => console.log(err));
};
export const getUser = async (id) => {
  if (!id) return;
  const user = await firebaseConfig
    .firestore()
    .collection("user")
    .doc(id)
    .get();
  return user.data();
};

export const updateUser = (id, name, photo) => {
  if (photo)
    firebaseConfig
      .storage()
      .ref(`profile/${id}`)
      .put(photo)
      .on("complete", (snap) => {
        snap.ref.getDownloadURL().then((url) => {
          firebaseConfig
            .firestore()
            .collection("user")
            .doc(id)
            .update({ name, photo: url })
            .catch((err) => console.log(err));
        });
      });
  else
    firebaseConfig
      .firestore()
      .collection("user")
      .doc(id)
      .update({ name })
      .catch((err) => console.log(err));
  return;
};
export const deleteUser = (id) => {
  firebaseConfig
    .auth()
    .currentUser.delete()
    .then(() => {
      firebaseConfig
        .firestore()
        .collection("user")
        .doc(id)
        .delete()
        .then(() => {
          firebaseConfig
            .storage()
            .ref(`profile/${id}`)
            .delete()
            .then(() => {
              return;
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      if (err) console.log(err);
    });
};
