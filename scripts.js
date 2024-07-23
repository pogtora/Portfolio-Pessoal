document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === "Mensagem enviada com sucesso!") {
        feedback.textContent = "Mensagem enviada com sucesso!";
        feedback.style.color = "green";
        form.reset();
      } else {
        feedback.textContent = "Houve um erro ao enviar a mensagem. Código de status: " + response.status;
        feedback.style.color = "red";
      }
      feedback.classList.remove("hidden");
    })
    .catch(error => {
      console.error("Erro ao enviar o formulário:", error);
      feedback.textContent = "Houve um erro ao enviar a mensagem.";
      feedback.style.color = "red";
      feedback.classList.remove("hidden");
    });
  });
});
