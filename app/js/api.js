// api

const postsURL = "https://jsonplaceholder.typicode.com/posts"
const imagesURL = "https://jsonplaceholder.typicode.com/photos"

const getCardsInfo = async (cards) => {
  await fetch(postsURL)
  .then((res) => res.json())
  .then((data) => cards.push(...data))
  .catch((err) => console.log(err.message))
}

const getImages = async (images) => {
  await fetch(imagesURL)
  .then((res) => res.json())
  .then((data) => images.push(...data))
  .catch((err) => console.log(err.message))
}