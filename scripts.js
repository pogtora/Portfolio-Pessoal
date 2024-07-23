document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");

  form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar email. Código de status: ' + response.status);
      }

      const responseData = await response.json();

      if (responseData.message === "Email enviado com sucesso!") {
        feedback.textContent = "Mensagem enviada com sucesso!";
        feedback.style.color = "green";
        form.reset();
      } else {
        feedback.textContent = "Houve um erro ao enviar a mensagem. Código de status: " + response.status;
        feedback.style.color = "red";
      }
      feedback.classList.remove("hidden");
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      feedback.textContent = "Houve um erro ao enviar a mensagem.";
      feedback.style.color = "red";
      feedback.classList.remove("hidden");
    }
  });
});
