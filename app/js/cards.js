// cards
const buttonToAddCards = document.querySelector(".btn-load-cards");
const cardsContainer = document.querySelector(".cards");

const cardImageWidth = "320";
const cardImageHeight = "185";
const limitCards = 30;

let cardsFromAPI = [];
let imagesFromApi = [];
let cards = [];
let countCards = 0;

async function getImagesAndPosts() {
  await getCardsInfo(cardsFromAPI);
  await getImages(imagesFromApi);
}

function createNode(element) {
  return document.createElement(element);
}

function append(parent, element) {
  return parent.appendChild(element);
}

function renderCard(currentCard) {
  const cardContainer = createNode("div");
  cardContainer.className = "cards-card";
  append(cardsContainer, cardContainer);

  const cardImage = createNode("img");
  cardImage.className = "cards-card__image";
  cardImage.src = currentCard.image.src;
  cardImage.alt = currentCard.image.alt;
  cardImage.width = currentCard.image.width;
  cardImage.height = currentCard.image.height;
  append(cardContainer, cardImage);

  const cardTextContent = createNode("div");
  cardTextContent.className = "cards-card__text-content";
  append(cardContainer, cardTextContent);

  const cardTitle = createNode("b");
  cardTitle.className = "cards-card__title";
  cardTitle.innerHTML = currentCard.textContent.title;
  append(cardTextContent, cardTitle);

  const cardSubTitle = createNode("p");
  cardSubTitle.className = "cards-card__subtitle";
  cardSubTitle.innerHTML = currentCard.textContent.subTitle;
  append(cardTextContent, cardSubTitle);

  const cardText = createNode("p");
  cardText.className = "cards-card__text";
  cardText.innerHTML = currentCard.textContent.text;
  append(cardTextContent, cardText);

  const cardsMeta = createNode("p");
  cardsMeta.className = "cards-card__meta";
  append(cardTextContent, cardsMeta);

  const metaPrefixAuthor = createNode("span");
  metaPrefixAuthor.className = "cards-card__meta-prefix";
  metaPrefixAuthor.innerHTML = currentCard.textContent.meta.prefixAuthor;
  append(cardsMeta, metaPrefixAuthor);

  const cardMetaAuthor = createNode("span");
  cardMetaAuthor.className = "cards-card__meta-author";
  cardMetaAuthor.innerHTML = ` ${currentCard.textContent.meta.author}`;
  append(cardsMeta, cardMetaAuthor);

  const metaPrefixDate = createNode("span");
  metaPrefixDate.className = "cards-card__meta-prefix";
  metaPrefixDate.innerHTML = `, ${currentCard.textContent.meta.prefixDate}`;
  append(cardsMeta, metaPrefixDate);

  const cardMetaDate = createNode("span");
  cardMetaDate.className = "cards-card__meta-date";
  cardMetaDate.innerHTML = ` ${currentCard.textContent.meta.date}`;
  append(cardsMeta, cardMetaDate);

  const cardLinkContinue = createNode("a");
  cardLinkContinue.className = "cards-card__link-continue";
  cardLinkContinue.href = currentCard.linkContinue.link;
  cardLinkContinue.innerHTML = currentCard.linkContinue.text;
  append(cardContainer, cardLinkContinue);
}

function renderStartCards() {
  for (let i = 0; i < 10; i++) {
    let currentCard = {
      image: {
        src: imagesFromApi[i].url,
        alt: imagesFromApi[i].title,
        width: cardImageWidth,
        height: cardImageHeight,
      },

      textContent: {
        title: "Bridge",
        subTitle: cardsFromAPI[i].title,
        text: cardsFromAPI[i].body,
        meta: {
          prefixAuthor: "Posted by",
          author: "Evgenia",
          prefixDate: "on",
          date: "July 24, 2019",
        },
      },

      linkContinue: {
        link: "#",
        text: "Continue reading",
      },
    };

    renderCard(currentCard);

    currentCard = {};
    countCards = 10;
  }
}

(async () => {
  await getImagesAndPosts();
  renderStartCards();

  buttonToAddCards.addEventListener("click", () => {
    if (countCards < limitCards) {
      for (let i = countCards; i < countCards + 5; i++) {
        let currentCard = {
          image: {
            src: imagesFromApi[i].url,
            alt: imagesFromApi[i].title,
            width: cardImageWidth,
            height: cardImageHeight,
          },

          textContent: {
            title: "Bridge",
            subTitle: cardsFromAPI[i].title,
            text: cardsFromAPI[i].body,
            meta: {
              prefixAuthor: "Posted by",
              author: "Evgenia",
              prefixDate: "on",
              date: "July 24, 2019",
            },
          },

          linkContinue: {
            link: "#",
            text: "Continue reading",
          },
        };

        renderCard(currentCard);
        currentCard = {};
      }

      countCards += 5;
    }
  });
})();
