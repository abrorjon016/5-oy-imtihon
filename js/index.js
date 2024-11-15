document.addEventListener("DOMContentLoaded", function () {
  loadCardsFromLocalStorage();

  const saveButton = document.getElementById("saqlash");

  saveButton.addEventListener("click", function () {
    const logoUrl = document.getElementById("logo-url").value;
    const companyName = document.getElementById("company-name").value;
    const isNew = document.getElementById("newElem").checked;
    const isFeatured = document.getElementById("featuredElem").checked;
    const position = document.getElementById("position").value;
    const time = document.getElementById("time").value;
    const typeWork = document.getElementById("type-work").value;
    const location = document.getElementById("location").value;

    const skills = [];
    document
      .querySelectorAll(".skills-group input[type=checkbox]")
      .forEach((checkbox) => {
        if (checkbox.checked) {
          skills.push(checkbox.id);
        }
      });

    const cardData = {
      logoUrl,
      companyName,
      isNew,
      isFeatured,
      position,
      time,
      typeWork,
      location,
      skills,
    };

    saveCardToLocalStorage(cardData);

    displayCard(cardData);

    document.querySelector(".form-container").reset();
  });

  function saveCardToLocalStorage(cardData) {
    let cards = JSON.parse(localStorage.getItem("cards")) || [];
    cards.push(cardData);
    localStorage.setItem("cards", JSON.stringify(cards));
  }

  function loadCardsFromLocalStorage() {
    const cards = JSON.parse(localStorage.getItem("cards")) || [];
    cards.forEach((card) => displayCard(card));
  }

  function displayCard(cardData) {
    const card = document.createElement("div");
    card.classList.add("photosnap");

    card.innerHTML = `
      <img src="${cardData.logoUrl}" alt="Company Logo" class="logo" />
      <div class="Photosnap-infos">
        <div class="quality">
          <h5>${cardData.companyName}</h5>
          ${cardData.isNew ? "<h5>NEW!</h5>" : ""}
          ${cardData.isFeatured ? "<h5>FEATURED</h5>" : ""}
        </div>
        <div class="nickname-dew">
          <h4>${cardData.position}</h4>
        </div>
        <div class="time-Photosnap">
          <h5>${cardData.time} • ${cardData.typeWork} • ${
      cardData.location
    }</h5>
        </div>
      </div>
      <div class="types-dew">
        ${cardData.skills.map((skill) => `<button>${skill}</button>`).join("")}
        <button class="delete-card">Delete</button>
      </div>
    `;

    card.querySelector(".delete-card").addEventListener("click", function () {
      deleteCard(cardData);
      card.remove();
    });

    document.getElementById("cards").appendChild(card);
  }

  function deleteCard(cardData) {
    let cards = JSON.parse(localStorage.getItem("cards")) || [];
    cards = cards.filter(
      (card) =>
        card.companyName !== cardData.companyName ||
        card.position !== cardData.position
    );
    localStorage.setItem("cards", JSON.stringify(cards));
  }
});
