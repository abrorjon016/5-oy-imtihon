document.querySelectorAll("#delete-card").forEach((button) => {
  button.onclick = () => {
    button.parentElement.parentElement.remove();
  };
});
