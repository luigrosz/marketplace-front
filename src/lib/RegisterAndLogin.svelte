<script>
  let { showModal = $bindable() } = $props();

  let dialog = $state();
  let email = $state("");
  let password = $state("");
  let registerEmail = $state("");
  let registerPassword = $state("");
  let registerPhone = $state("");
  let currentForm = $state("login");

  $effect(() => {
    if (showModal) dialog.showModal();
  });

  function handleLogin() {
    console.log("Login attempt:", { email, password });
  }

  function handleRegister() {
    console.log("Register attempt:", { registerEmail, registerPassword });
  }
</script>

<dialog
  bind:this={dialog}
  onclose={() => (showModal = false)}
  onclick={(e) => {
    if (e.target === dialog) dialog.close();
  }}
>
  <div class="modal-content">
    <button onclick={() => dialog.close()}>close modal</button>

    <div class="auth-forms">
      {#if currentForm === "login"}
        <h2>Login</h2>
        <div class="inputs">
          <input type="email" placeholder="E-mail" bind:value={email} />
          <input type="password" placeholder="Senha" bind:value={password} />
          <button onclick={handleLogin}>Login</button>
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
          <input type="email" placeholder="E-mail" bind:value={registerEmail} />
          <input
            type="password"
            placeholder="Senha"
            bind:value={registerPassword}
          />
          <input
            type="phone"
            placeholder="Telefone"
            bind:value={registerPhone}
          />
          <button onclick={handleRegister}>Registrar</button>
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
    min-width: 300px;
    min-height: 300px;
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .inputs {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
