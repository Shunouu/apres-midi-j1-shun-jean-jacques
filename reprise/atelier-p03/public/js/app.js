const formulaire = document.querySelector("#chat-form");
const statut = document.querySelector("#status");
const versionElt = document.querySelector("#version");
const champ = document.querySelector("#message");
const liste = document.querySelector("#messages");

formulaire?.addEventListener("submit", (event) => {
  event.preventDefault();

  const texte = champ.value.trim();

  if (!texte) {
    if (statut) {
      statut.textContent = "Merci de saisir un message avant d’envoyer.";
    }
    champ.focus();
    return;
  }

  const item = document.createElement("li");
  item.textContent = `Vous : ${texte}`;
  liste.append(item);

  champ.value = "";
  statut.textContent = "";
  champ.focus();
});

// Version du serveur local, échec discret si indisponible.
fetch("/version.json", { headers: { accept: "application/json" } })
  .then((reponse) => (reponse.ok ? reponse.json() : null))
  .then((donnees) => {
    if (donnees && typeof donnees.version === "string" && versionElt) {
      versionElt.textContent = `version ${donnees.version}`;
    }
  })
  .catch(() => {});
