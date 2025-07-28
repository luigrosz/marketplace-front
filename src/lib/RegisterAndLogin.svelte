<script>
  import { login } from "../utils/authReq";
  import { createUser, getUserByUsername } from "../utils/userReq";

  let { showModal = $bindable() } = $props();

  let dialog = $state();
  let loginEmail = $state("");
  let loginPassword = $state("");
  let registerEmail = $state("");
  let registerPassword = $state("");
  let registerPassword2 = $state("");
  let registerPhone = $state("");
  let currentForm = $state("login");

  $effect(() => {
    if (showModal) dialog.showModal();
  });

  const passwordRegex = /^[A-Za-z\d\W]{8,}$/;
  const phoneRegex = /\d{2}9\d{8}/;

  async function handleLogin() {
    const loginEmailInput = dialog.querySelector(
      'input[type="email"][name="loginEmail"]',
    );
    if (!loginEmailInput.reportValidity()) {
      return alert("Por favor, insira um email válido.");
    }
    let response = await getUserByUsername(loginEmail);
    if (response.message === "usuario nao encontrado") {
      return alert("Usuario nao encontrado.");
    }
    response = await login(loginEmail, loginPassword);
    if (response.error) {=
      return alert(response.error);
    }
    if (response.message === "Invalid credentials") {
      return alert("Credenciais invalidas.");
    }
    location.reload();
  }

  async function handleRegister() {
    const registerEmailInput = dialog.querySelector(
      'input[type="email"][name="registerEmail"]',
    );
    if (!registerEmailInput.reportValidity()) {
      return alert("Insira um email válido.");
    }
    if (!passwordRegex.test(registerPassword)) {
      return alert("Insira uma senha de no minimo 8 digitos.");
    }
    if (registerPassword !== registerPassword2) {
      return alert("Senhas diferentes.");
    }
    if (!phoneRegex.test(registerPhone)) {
      return alert("Celular invalido.");
    }
    let response = await getUserByUsername(registerEmail);
    if (response.message === "usuario nao encontrado") {
      await createUser(registerEmail, registerPassword, registerPhone);
      loginEmail = registerEmail;
      loginPassword = registerPassword;
      await handleLogin();
    }
    return alert("Email já cadastrado.");
  }

  let isLoginDisabled = $state(true);
  let isRegisterDisabled = $state(true);

  $effect(() => {
    isLoginDisabled = !loginEmail || !loginPassword;
    isRegisterDisabled =
      !registerEmail ||
      !registerPassword ||
      !registerPassword2 ||
      !registerPhone;
  });
</script>

<dialog
  bind:this={dialog}
  onclose={() => (showModal = false)}
  onclick={(e) => {
    if (e.target === dialog) dialog.close();
  }}
>
  <div class="modal-content">
    <button onclick={() => dialog.close()}>fechar</button>

    <div class="auth-forms">
      {#if currentForm === "login"}
        <h2>Login</h2>
        <div class="inputs">
          <input
            type="email"
            placeholder="E-mail"
            bind:value={loginEmail}
            name="loginEmail"
          />
          <input
            type="password"
            placeholder="Senha"
            bind:value={loginPassword}
            name="loginPassword"
            minlength="8"
          />
          <button
            onclick={handleLogin}
            formnovalidate
            disabled={isLoginDisabled}>Login</button
          >
        </div>
        <p>
          Ainda não tem uma conta?
          <button
            class="toggle-button"
            onclick={() => (currentForm = "register")}
          >
            Registrar
          </button>
        </p>
      {:else}
        <h2>Registrar</h2>
        <div class="inputs">
          <input
            type="email"
            placeholder="E-mail"
            bind:value={registerEmail}
            name="registerEmail"
          />
          <input
            type="password"
            placeholder="Senha"
            bind:value={registerPassword}
            name="registerPassword"
          />
          <input
            type="password"
            placeholder="Senha"
            bind:value={registerPassword2}
            name="registerPassword2"
            minlength="8"
          />
          <input
            type="phone"
            placeholder="Celular (##9#######)"
            bind:value={registerPhone}
            name="registerPhone"
            pattern="\\d{2}9\\d{8}"
            required
          />
          <button
            onclick={handleRegister}
            formnovalidate
            disabled={isRegisterDisabled}>Registrar</button
          >
        </div>
        <p>
          Já tem uma conta?
          <button class="toggle-button" onclick={() => (currentForm = "login")}>
            Login
          </button>
        </p>
      {/if}
    </div>
  </div>
</dialog>

<style>
  dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    margin: 0px;
    min-width: 500px;
    min-height: 500px;
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .inputs {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  @media (max-width: 768px) {
    dialog {
      min-width: 300px;
      min-height: 300px;
    }
  }
</style>
