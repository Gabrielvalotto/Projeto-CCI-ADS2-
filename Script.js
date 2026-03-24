// Variável que controla total de reservas
let totalReservas = 0;

// Função chamada ao clicar em "Salvar"
function agendar() {

    // Pegando valores dos campos
    let nome = document.getElementById("nome").value;
    let tipo = document.getElementById("tipo").value;
    let item = document.getElementById("item").value;
    let data = document.getElementById("data").value;

    // Validação básica
    if (!nome || !item || !data) {
        alert("Preencha todos os campos!");
        return;
    }

    // Seleciona a tabela
    let tabela = document.getElementById("tabela");

    // Cria uma nova linha
    let linha = document.createElement("tr");

    // Preenche a linha com os dados
    linha.innerHTML = `
        <td>${nome}</td>
        <td>${tipo}</td>
        <td>${item}</td>
        <td>${data}</td>
        <td>
            <button class="remover" onclick="remover(this)">X</button>
        </td>
    `;

    // Adiciona na tabela
    tabela.appendChild(linha);

    // Atualiza contador de reservas
    totalReservas++;
    document.getElementById("reservas").innerText = totalReservas;

    // Limpa os campos
    limpar();
}

// Função para remover reserva
function remover(botao) {
    // Remove a linha da tabela
    botao.parentElement.parentElement.remove();

    // Atualiza contador
    totalReservas--;
    document.getElementById("reservas").innerText = totalReservas;
}

// Limpa os campos após cadastro
function limpar() {
    document.getElementById("nome").value = "";
    document.getElementById("item").value = "";
    document.getElementById("data").value = "";
}
