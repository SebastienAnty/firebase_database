const admin = require("firebase-admin");
const creds = require("./credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(creds),
});

const db = admin.firestore();
const clothesRef = db.collection("clothes");
const handleErr = (err) => console.error

function createClothes() {
  const newClothes = {
    sku: "SBGU09",
    type: "shirt",
    style: "blouse",
    brand: "GUESS",
    color: "White",
    graphic: false,
    price: 79.99,
    sizes: ["XS", "S", "M", "XL"],
  };
  clothesRef
    .add("clothes")
    .add(newClothes)
    .then((docRef) => {
      console.log(docRef.id);
    })
    .catch(handleErr);
}

// delete "STRM04"

clothesRef.doc("STRM04").delete()
.then(() => {
    clothesRef.get()
        .then(collection => {
            let clothes = []
            collection.docs.forEach(doc => clothes.push(doc.data()))
            console.log(clothes)
        })
})


clothesRef.get()
  .then(collection => {
    let clothes = []
    collection.docs.forEach(doc => clothes.push(doc.data()))
    console.log(clothes)
  })
  .catch(handleErr);
