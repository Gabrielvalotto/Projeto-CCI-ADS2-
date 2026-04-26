// ==================== SISTEMA DE NAVEGAÇÃO ====================

// Dados dos usuários
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

// Estado de login
let usuarioLogado = null;
let adminLogado = false;

// Função para navegar entre páginas
function navegarPara(pagina) {
    console.log('Navegando para:', pagina, 'Admin logado:', adminLogado); // Debug

    // Verifica se é admin e não está logado
    if (pagina === 'admin' && !adminLogado) {
        console.log('Mostrando modal de login'); // Debug
        alert('Tentando mostrar modal de login'); // Debug alert
        document.getElementById('adminLoginModal').style.display = 'flex';
        return;
    }

    // Oculta todas as páginas
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });

    // Mostra a página selecionada
    const pageElement = document.getElementById(`page-${pagina}`);
    if (pageElement) {
        pageElement.style.display = 'block';
    }

    // Atualiza título da barra superior
    const topbar = document.getElementById('topbar');
    const titulos = {
        'dashboard': '📊 Dashboard - Resumo do Sistema',
        'salas': '🚪 Gerenciamento de Salas',
        'materiais': '💻 Gerenciamento de Materiais',
        'reservas': '📅 Gerenciamento de Reservas',
        'admin': '🔐 Painel de Administração'
    };
    if (topbar && titulos[pagina]) {
        topbar.innerHTML = `<h1>${titulos[pagina]}</h1>`;
    }

    // Atualiza links ativos no sidebar
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    const linkAtivo = document.querySelector(`.nav-link[data-page="${pagina}"]`);
    if (linkAtivo) {
        linkAtivo.classList.add('active');
    }

    // Atualiza dashboard se necessário
    if (pagina === 'dashboard') {
        atualizarDashboard();
    }
    if (pagina === 'admin') {
        mostrarAbaAdmin('estatisticas');
        atualizarAdminBoard();
    }
    if (pagina === 'reservas') {
        verificarLoginReserva();
    }
}

// ==================== FUNÇÕES DE AUTENTICAÇÃO ====================

// Função para login do admin
function loginAdmin() {
    const login = document.getElementById('adminLogin').value.trim();
    const senha = document.getElementById('adminPassword').value;

    console.log('Tentativa de login:', login, senha); // Debug

    // Credenciais fixas para admin (em produção, seria mais seguro)
    if (login === 'admin' && senha === 'admin') {
        adminLogado = true;
        document.getElementById('adminLoginModal').style.display = 'none';
        navegarPara('admin');
        registrarLog(`✓ Admin logado: ${login}`);
        alert('Login realizado com sucesso!');
    } else {
        alert('Login ou senha incorretos!');
    }

    // Limpa campos
    document.getElementById('adminLogin').value = '';
    document.getElementById('adminPassword').value = '';
}

// Função para fechar modal admin
function fecharModalAdmin() {
    document.getElementById('adminLoginModal').style.display = 'none';
    document.getElementById('adminLogin').value = '';
    document.getElementById('adminPassword').value = '';
}

// Função para verificar login na página de reservas
function verificarLoginReserva() {
    if (usuarioLogado) {
        document.getElementById('loginReservas').style.display = 'none';
        document.getElementById('formReserva').style.display = 'block';
        document.getElementById('nome').value = usuarioLogado.nome;
        document.getElementById('nome').readOnly = true;
        atualizarItensDisponiveis();
    } else {
        document.getElementById('loginReservas').style.display = 'block';
        document.getElementById('formReserva').style.display = 'none';
    }
}

// Função para login na reserva
function loginReserva() {
    const login = document.getElementById('loginReserva').value.trim();
    const senha = document.getElementById('senhaReserva').value;

    const usuario = usuarios.find(u => u.login === login && u.senha === senha);
    if (usuario) {
        usuarioLogado = usuario;
        verificarLoginReserva();
        registrarLog(`✓ Usuário logado para reserva: ${usuario.nome} (${usuario.tipo})`);
        alert('Login realizado com sucesso!');
    } else {
        alert('Login ou senha incorretos!');
    }

    // Limpa campos
    document.getElementById('loginReserva').value = '';
    document.getElementById('senhaReserva').value = '';
}

// Função para logout da reserva
function logoutReserva() {
    usuarioLogado = null;
    verificarLoginReserva();
    limpar();
    registrarLog(`✓ Usuário deslogado da reserva`);
    alert('Logout realizado com sucesso!');
}

// Função para mostrar abas do admin
function mostrarAbaAdmin(aba) {
    // Oculta todas as abas
    document.querySelectorAll('.aba-admin').forEach(a => {
        a.style.display = 'none';
    });

    // Mostra aba selecionada
    document.getElementById(`aba-${aba}`).style.display = 'block';

    // Atualiza botões ativos
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`.tab-button[onclick*="mostrarAbaAdmin('${aba}')"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

// Event listeners para navegação
document.addEventListener('DOMContentLoaded', function() {
    // Adiciona listeners aos links de navegação
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pagina = this.getAttribute('data-page');
            navegarPara(pagina);
        });
    });

    // Carrega a página inicial (dashboard)
    navegarPara('dashboard');
});

// ==================== FUNÇÕES DE ADMINISTRAÇÃO ====================

// Dados das salas
let salas = JSON.parse(localStorage.getItem('salas')) || [];

// Dados dos materiais
let materiais = JSON.parse(localStorage.getItem('materiais')) || [];

// Função para adicionar sala
function adicionarSala() {
    const nome = document.getElementById('nomeSala')?.value.trim();
    const capacidade = document.getElementById('capacidadeSala')?.value;
    const localizacao = document.getElementById('localizacaoSala')?.value.trim();

    if (!nome || !capacidade || !localizacao) {
        alert('Preencha todos os campos da sala!');
        return;
    }

    const novaSala = {
        id: Date.now(),
        nome,
        capacidade: parseInt(capacidade),
        localizacao,
        status: 'Disponível'
    };

    salas.push(novaSala);
    localStorage.setItem('salas', JSON.stringify(salas));
    
    // Limpa formulário
    document.getElementById('nomeSala').value = '';
    document.getElementById('capacidadeSala').value = '';
    document.getElementById('localizacaoSala').value = '';

    // Atualiza tabela
    atualizarTabelaSalas();
    atualizarContadores();
    alert('Sala adicionada com sucesso!');
    registrarLog(`✓ Nova sala adicionada: ${nome} (Capacidade: ${capacidade})`);
}

// Função para atualizar tabela de salas
function atualizarTabelaSalas() {
    // Atualiza tabela pública (sem ação)
    const tbodyPublico = document.getElementById('tabelaSalas');
    if (tbodyPublico) {
        tbodyPublico.innerHTML = '';
        salas.forEach(sala => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${sala.nome}</td>
                <td>${sala.capacidade} pessoas</td>
                <td>${sala.localizacao}</td>
                <td><span style="color: green;">●</span> ${sala.status}</td>
            `;
            tbodyPublico.appendChild(tr);
        });
    }

    // Atualiza tabela admin (com ações)
    const tbodyAdmin = document.getElementById('tabelaSalasAdmin');
    if (tbodyAdmin) {
        tbodyAdmin.innerHTML = '';
        salas.forEach(sala => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${sala.nome}</td>
                <td>${sala.capacidade} pessoas</td>
                <td>${sala.localizacao}</td>
                <td><span style="color: green;">●</span> ${sala.status}</td>
                <td>
                    <button onclick="removerSala(${sala.id})" style="background: var(--danger-color); color: white; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer;">Remover</button>
                </td>
            `;
            tbodyAdmin.appendChild(tr);
        });
    }
}

// Função para remover sala
function removerSala(id) {
    if (confirm('Tem certeza que deseja remover esta sala?')) {
        const sala = salas.find(s => s.id === id);
        salas = salas.filter(s => s.id !== id);
        localStorage.setItem('salas', JSON.stringify(salas));
        atualizarTabelaSalas();
        atualizarContadores();
        atualizarItensDisponiveis();
        registrarLog(`✓ Sala removida: ${sala?.nome || 'ID ' + id}`);
    }
}

// Função para adicionar material
function adicionarMaterial() {
    const nome = document.getElementById('nomeMaterial')?.value.trim();
    const tipo = document.getElementById('tipoMaterial')?.value;
    const quantidade = document.getElementById('quantidadeMaterial')?.value;
    const condicao = document.getElementById('condicaoMaterial')?.value;

    if (!nome || !tipo || !quantidade) {
        alert('Preencha todos os campos do material!');
        return;
    }

    const novoMaterial = {
        id: Date.now(),
        nome,
        tipo,
        quantidade: parseInt(quantidade),
        condicao,
        dataCadastro: new Date().toLocaleDateString('pt-BR')
    };

    materiais.push(novoMaterial);
    localStorage.setItem('materiais', JSON.stringify(materiais));

    // Limpa formulário
    document.getElementById('nomeMaterial').value = '';
    document.getElementById('quantidadeMaterial').value = '';

    // Atualiza tabela
    atualizarTabelaMateriais();
    atualizarContadores();
    atualizarItensDisponiveis();
    alert('Material adicionado com sucesso!');
    registrarLog(`✓ Novo material adicionado: ${nome} (Qtd: ${quantidade} - ${tipo})`);
}

// Função para atualizar tabela de materiais
function atualizarTabelaMateriais() {
    // Atualiza tabela pública (sem ação)
    const tbodyPublico = document.getElementById('tabelaMateriais');
    if (tbodyPublico) {
        tbodyPublico.innerHTML = '';
        materiais.forEach(material => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${material.nome}</td>
                <td>${material.tipo}</td>
                <td>${material.quantidade}</td>
                <td>${material.condicao}</td>
            `;
            tbodyPublico.appendChild(tr);
        });
    }

    // Atualiza tabela admin (com ações)
    const tbodyAdmin = document.getElementById('tabelaMaterialsAdmin');
    if (tbodyAdmin) {
        tbodyAdmin.innerHTML = '';
        materiais.forEach(material => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${material.nome}</td>
                <td>${material.tipo}</td>
                <td>${material.quantidade}</td>
                <td>${material.condicao}</td>
                <td>
                    <button onclick="removerMaterial(${material.id})" style="background: var(--danger-color); color: white; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer;">Remover</button>
                </td>
            `;
            tbodyAdmin.appendChild(tr);
        });
    }
}

// Função para atualizar a lista de itens disponíveis no formulário de reserva
function atualizarItensDisponiveis() {
    const tipoReserva = document.getElementById('tipo').value;
    const selectItem = document.getElementById('item');
    selectItem.innerHTML = '';

    if (tipoReserva === 'Sala') {
        const salasDisponiveisLista = salas.filter(s => s.status === 'Disponível');
        if (salasDisponiveisLista.length === 0) {
            selectItem.innerHTML = '<option value="">Nenhuma sala disponível</option>';
            return;
        }
        salasDisponiveisLista.forEach(sala => {
            const option = document.createElement('option');
            option.value = sala.nome;
            option.textContent = `${sala.nome} (Capacidade ${sala.capacidade})`;
            selectItem.appendChild(option);
        });
    } else if (tipoReserva === 'Notebook') {
        const notebooksDisponiveis = materiais.filter(m => m.tipo === 'Notebook' && m.quantidade > 0);
        if (notebooksDisponiveis.length === 0) {
            selectItem.innerHTML = '<option value="">Nenhum notebook disponível</option>';
            return;
        }
        notebooksDisponiveis.forEach(mat => {
            const option = document.createElement('option');
            option.value = mat.nome;
            option.textContent = `${mat.nome} (Qtd ${mat.quantidade})`;
            selectItem.appendChild(option);
        });
    } else if (tipoReserva === 'Material') {
        const materiaisDisponiveisLista = materiais.filter(m => m.quantidade > 0);
        if (materiaisDisponiveisLista.length === 0) {
            selectItem.innerHTML = '<option value="">Nenhum material disponível</option>';
            return;
        }
        materiaisDisponiveisLista.forEach(mat => {
            const option = document.createElement('option');
            option.value = mat.nome;
            option.textContent = `${mat.nome} - ${mat.tipo} (Qtd ${mat.quantidade})`;
            selectItem.appendChild(option);
        });
    }
}

// Função para remover material
function removerMaterial(id) {
    if (confirm('Tem certeza que deseja remover este material?')) {
        const material = materiais.find(m => m.id === id);
        materiais = materiais.filter(m => m.id !== id);
        localStorage.setItem('materiais', JSON.stringify(materiais));
        atualizarTabelaMateriais();
        atualizarContadores();
        atualizarItensDisponiveis();
        registrarLog(`✓ Material removido: ${material?.nome || 'ID ' + id}`);
    }
}

// ==================== FUNÇÕES DE GERENCIAMENTO DE USUÁRIOS ====================

// Função para adicionar usuário
function adicionarUsuario() {
    const nome = document.getElementById('nomeUsuario')?.value.trim();
    const tipo = document.getElementById('tipoUsuario')?.value;
    const login = document.getElementById('loginUsuario')?.value.trim();
    const senha = document.getElementById('senhaUsuario')?.value;

    if (!nome || !tipo || !login || !senha) {
        alert('Preencha todos os campos do usuário!');
        return;
    }

    // Verifica se login já existe
    if (usuarios.find(u => u.login === login)) {
        alert('Este login já está em uso!');
        return;
    }

    const novoUsuario = {
        id: Date.now(),
        nome,
        tipo,
        login,
        senha
    };

    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Limpa formulário
    document.getElementById('nomeUsuario').value = '';
    document.getElementById('loginUsuario').value = '';
    document.getElementById('senhaUsuario').value = '';

    // Atualiza tabela
    atualizarTabelaUsuarios();
    alert('Usuário adicionado com sucesso!');
    registrarLog(`✓ Novo usuário adicionado: ${nome} (${tipo} - ${login})`);
}

// Função para atualizar tabela de usuários
function atualizarTabelaUsuarios() {
    const tbody = document.getElementById('tabelaUsuariosAdmin');
    if (tbody) {
        tbody.innerHTML = '';
        usuarios.forEach(usuario => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${usuario.nome}</td>
                <td>${usuario.tipo}</td>
                <td>${usuario.login}</td>
                <td>
                    <button onclick="removerUsuario(${usuario.id})" style="background: var(--danger-color); color: white; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer;">Remover</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }
}

// Função para remover usuário
function removerUsuario(id) {
    if (confirm('Tem certeza que deseja remover este usuário?')) {
        const usuario = usuarios.find(u => u.id === id);
        usuarios = usuarios.filter(u => u.id !== id);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        atualizarTabelaUsuarios();
        registrarLog(`✓ Usuário removido: ${usuario?.nome || 'ID ' + id}`);
    }
}

// Função para atualizar contadores globais (salas/materiais)
function atualizarContadores() {
    salasDisponiveis = salas.filter(s => s.status === 'Disponível').length;
    salasOcupadas = salas.filter(s => s.status === 'Ocupada').length;
    materiaisDisponiveis = materiais.filter(m => m.tipo === 'Notebook').reduce((acc, m) => acc + m.quantidade, 0);

    atualizarCards();
}

// Função para atualizar dashboard
function atualizarDashboard() {
    atualizarContadores();

    document.getElementById('totalSalas').textContent = salas.length;
    document.getElementById('totalNotebooks').textContent = materiais.filter(m => m.tipo === 'Notebook').reduce((acc, m) => acc + m.quantidade, 0);
    
    const taxaOcupacao = salas.length > 0 ? Math.round((salasOcupadas / salas.length) * 100) : 0;
    document.getElementById('taxaOcupacao').textContent = taxaOcupacao + '%';
    document.getElementById('ultimasReservas').textContent = totalReservas > 0 ? totalReservas + ' reservas ativas' : 'Nenhuma';

    // Carrega dados nas tabelas públicas
    atualizarTabelaSalas();
    atualizarTabelaMateriais();
}

// Função para atualizar painel administrativo
function atualizarAdminBoard() {
    atualizarContadores();

    document.getElementById('adminTotalReservas').textContent = totalReservas;
    document.getElementById('adminTotalSalas').textContent = salas.length;
    document.getElementById('adminTotalNotebooks').textContent = materiais.filter(m => m.tipo === 'Notebook').reduce((acc, m) => acc + m.quantidade, 0);
    document.getElementById('adminReservasAtivas').textContent = totalReservas;
    document.getElementById('adminSalasDisponiveis').textContent = salasDisponiveis;
    document.getElementById('adminNotebooksDisponiveis').textContent = materiaisDisponiveis;

    // Atualiza tabelas
    atualizarTabelaSalas();
    atualizarTabelaMateriais();
    atualizarTabelaUsuarios();
    atualizarLogSistema();
}

// Função para limpar todos os dados
function limparTodosDados() {
    if (confirm('⚠️ ATENÇÃO: Esta ação vai limpar TODOS os dados do sistema.\n\nDeseja continuar?')) {
        localStorage.clear();
        totalReservas = 0;
        salasDisponiveis = 0;
        salasOcupadas = 0;
        materiaisDisponiveis = 0;
        salas = [];
        materiais = [];
        usuarios = [];
        usuarioLogado = null;
        adminLogado = false;
        
        document.getElementById('tabela').innerHTML = '';
        atualizarCards();
        registrarLog(`⚠️ TODOS OS DADOS FORAM LIMPOS DO SISTEMA`);
        alert('✓ Todos os dados foram limpos!');
        navegarPara('dashboard');
    }
}

// Função para limpar apenas reservas
function limparReservas() {
    if (confirm('Tem certeza que deseja limpar todas as reservas?')) {
        localStorage.removeItem('reservaState');
        totalReservas = 0;
        salasDisponiveis = 0;
        salasOcupadas = 0;
        materiaisDisponiveis = 0;
        
        document.getElementById('tabela').innerHTML = '';
        atualizarCards();
        registrarLog(`⚠️ Todas as reservas foram removidas`);
        alert('✓ Todas as reservas foram removidas!');
    }
}

// Função para exportar dados
function exportarDados() {
    const dados = {
        reservas: JSON.parse(localStorage.getItem('reservaState')),
        salas: salas,
        materiais: materiais,
        usuarios: usuarios,
        dataExportacao: new Date().toLocaleString('pt-BR')
    };

    const json = JSON.stringify(dados, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    registrarLog(`✓ Dados exportados com sucesso`);
    alert('✓ Dados exportados com sucesso!');
}

// Função para registrar atividades no log
function registrarLog(atividade) {
    const logs = JSON.parse(localStorage.getItem('logs')) || [];
    logs.push({
        timestamp: new Date().toLocaleString('pt-BR'),
        atividade: atividade
    });
    
    // Mantém apenas os últimos 100 logs
    if (logs.length > 100) {
        logs.shift();
    }
    
    localStorage.setItem('logs', JSON.stringify(logs));
    atualizarLogSistema();
}

// Função para atualizar log do sistema
function atualizarLogSistema() {
    const logElement = document.getElementById('logSistema');
    if (!logElement) return;

    const logs = JSON.parse(localStorage.getItem('logs')) || [];
    logElement.value = logs.map(log => `[${log.timestamp}] ${log.atividade}`).reverse().join('\n');
}

// ==================== CONTADORES DO SISTEMA ====================

// Contadores do sistema (exibir cards) - todos começam zerados e crescem com as reservas
let totalReservas = 0;
let salasDisponiveis = 0;
let salasOcupadas = 0;
let materiaisDisponiveis = 0;

// Atualiza os valores exibidos nos cards (sala/materiais/reservas)
function atualizarCards() {
    document.getElementById("salas").innerText = salasDisponiveis;
    document.getElementById("ocupadas").innerText = salasOcupadas;
    document.getElementById("materiais").innerText = materiaisDisponiveis;
    document.getElementById("reservas").innerText = totalReservas;
}

// Função principal chamada quando o usuário clica no botão "Salvar" para agendar uma nova reserva
function agendar() {
    // Verifica se usuário está logado
    if (!usuarioLogado) {
        alert('Você precisa estar logado para fazer uma reserva!');
        return;
    }

    // Obtém os valores inseridos nos campos do formulário
    const nome = document.getElementById("nome").value.trim(); // Remove espaços em branco
    const tipo = document.getElementById("tipo").value;
    const item = document.getElementById("item").value.trim();
    const data = document.getElementById("data").value;
    const horaInicio = document.getElementById("horaInicio").value;
    const dataFim = document.getElementById("dataFim").value;
    const horaFim = document.getElementById("horaFim").value;

    // Validação básica: somente nome é obrigatório (conforme pedido)
    if (!nome) {
        alert("Informe o nome.");
        return;
    }

    let diffDays = null;
    if (data && dataFim) {
        // Validação adicional: verifica se a data de início é futura ou hoje
        const dataInicio = new Date(data);
        const dataFinal = new Date(dataFim);
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0); // Zera horas para comparar apenas datas

        if (dataInicio < hoje) {
            alert("A data de início deve ser hoje ou no futuro!");
            return;
        }
        if (dataFinal < dataInicio) {
            alert("A data de fim deve ser igual ou posterior à data de início!");
            return;
        }

        // Validação de duração: notebooks até 7 dias, outros até 1 dia
        const diffTime = Math.abs(dataFinal - dataInicio);
        diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (tipo === "Notebook" && diffDays > 7) {
            alert("Reservas de notebook podem durar no máximo 7 dias!");
            return;
        } else if (tipo !== "Notebook" && diffDays > 1) {
            alert("Reservas de salas e outros materiais podem durar no máximo 1 dia!");
            return;
        }

        // Validação de horas se mesma data
        if (diffDays === 0 && horaInicio && horaFim) {
            const [horaIniH, horaIniM] = horaInicio.split(':').map(Number);
            const [horaFimH, horaFimM] = horaFim.split(':').map(Number);
            const totalIni = horaIniH * 60 + horaIniM;
            const totalFim = horaFimH * 60 + horaFimM;
            if (totalFim <= totalIni) {
                alert("A hora de fim deve ser posterior à hora de início!");
                return;
            }
        }
    } else {
        // Se não há datas completas, mantém preenchido para visualizar (sem validação de duração)
        diffDays = 0;
    }

    // Validação de campos obrigatórios e disponibilidade
    if (!item) {
        alert("Selecione um item disponível para reserva.");
        return;
    }

    if (tipo === "Sala") {
        const salaSelecionada = salas.find(s => s.nome === item && s.status === 'Disponível');
        if (!salaSelecionada) {
            alert("Sala selecionada não está disponível.");
            return;
        }
        salaSelecionada.status = 'Ocupada';
        salas = salas.map(s => s.id === salaSelecionada.id ? salaSelecionada : s);
        localStorage.setItem('salas', JSON.stringify(salas));
    } else if (tipo === "Notebook") {
        const notebookSelecionado = materiais.find(m => m.nome === item && m.tipo === 'Notebook' && m.quantidade > 0);
        if (!notebookSelecionado) {
            alert("Notebook selecionado não está disponível.");
            return;
        }
        notebookSelecionado.quantidade -= 1;
        materiais = materiais.map(m => m.id === notebookSelecionado.id ? notebookSelecionado : m);
        localStorage.setItem('materiais', JSON.stringify(materiais));
    } else if (tipo === "Material") {
        const materialSelecionado = materiais.find(m => m.nome === item && m.quantidade > 0);
        if (!materialSelecionado) {
            alert("Material selecionado não está disponível.");
            return;
        }
        materialSelecionado.quantidade -= 1;
        materiais = materiais.map(m => m.id === materialSelecionado.id ? materialSelecionado : m);
        localStorage.setItem('materiais', JSON.stringify(materiais));
    }

    totalReservas++;
    atualizarContadores();
    atualizarTabelaSalas();
    atualizarTabelaMateriais();
    atualizarItensDisponiveis();


    // Seleciona o corpo da tabela onde as reservas serão exibidas
    const tabela = document.getElementById("tabela");

    // Cria um novo elemento de linha da tabela
    const linha = document.createElement("tr");

    // Define o conteúdo HTML da linha com os dados da reserva e botão de remoção
    linha.innerHTML = `
        <td>${nome}</td>
        <td>${tipo}</td>
        <td>${item}</td>
        <td>${data}</td>
        <td>${horaInicio}</td>
        <td>${dataFim}</td>
        <td>${horaFim}</td>
        <td>
            <button class="remover" onclick="remover(this)">X</button>
        </td>
    `;

    // Adiciona a nova linha à tabela
    tabela.appendChild(linha);

    // Chama a função para limpar os campos do formulário após o cadastro
    limpar();

    // Salva as reservas no localStorage após adicionar
    salvarReservas();

    // Registra no log
    registrarLog(`✓ Nova reserva criada: ${nome} (${tipo} - ${item})`);
}

// Função para remover uma reserva específica da tabela
function remover(botao) {
    const linha = botao.parentElement.parentElement;
    const nome = linha.querySelectorAll('td')[0].textContent;
    const tipo = linha.querySelectorAll('td')[1].textContent;
    const item = linha.querySelectorAll('td')[2].textContent;

    // Ajusta disponibilidade ao cancelar
    if (tipo === 'Sala') {
        const sala = salas.find(s => s.nome === item);
        if (sala) {
            sala.status = 'Disponível';
            localStorage.setItem('salas', JSON.stringify(salas));
        }
    } else if (tipo === 'Notebook') {
        const material = materiais.find(m => m.nome === item && m.tipo === 'Notebook');
        if (material) {
            material.quantidade += 1;
            localStorage.setItem('materiais', JSON.stringify(materiais));
        }
    } else if (tipo === 'Material') {
        const material = materiais.find(m => m.nome === item);
        if (material) {
            material.quantidade += 1;
            localStorage.setItem('materiais', JSON.stringify(materiais));
        }
    }

    // Remove a linha da tabela correspondente ao botão clicado
    linha.remove();

    // Decrementa o contador de reservas totais
    totalReservas--;
    atualizarContadores();
    atualizarTabelaSalas();
    atualizarTabelaMateriais();
    atualizarItensDisponiveis();
    registrarLog(`✓ Reserva removida: ${nome} (${tipo})`);
}

// Função para limpar todos os campos do formulário após uma reserva bem-sucedida
function limpar() {
    // Reseta o valor de cada campo para vazio
    document.getElementById("nome").value = "";
    document.getElementById("item").value = "";
    document.getElementById("data").value = "";
    document.getElementById("horaInicio").value = "";
    document.getElementById("dataFim").value = "";
    document.getElementById("horaFim").value = "";
    // O campo 'tipo' pode ser deixado como está ou resetado para o primeiro option
}

// Função para salvar as reservas no localStorage do navegador para persistência
function salvarReservas() {
    const reservas = [];
    // Coleta todas as linhas da tabela
    const linhas = document.querySelectorAll("#tabela tr");
    linhas.forEach(linha => {
        const colunas = linha.querySelectorAll("td");
        if (colunas.length >= 7) { // Garante que há colunas suficientes (agora 7 + botão)
            reservas.push({
                nome: colunas[0].textContent,
                tipo: colunas[1].textContent,
                item: colunas[2].textContent,
                data: colunas[3].textContent,
                horaInicio: colunas[4].textContent,
                dataFim: colunas[5].textContent,
                horaFim: colunas[6].textContent
            });
        }
    });
    // Salva no localStorage como JSON (reservas + métricas)
    const state = {
        reservas,
        salasDisponiveis,
        salasOcupadas,
        materiaisDisponiveis,
        totalReservas
    };
    localStorage.setItem("reservaState", JSON.stringify(state));
}

// Função para carregar reservas do localStorage ao iniciar a página
function carregarReservas() {
    const stateSalvo = localStorage.getItem("reservaState");
    if (stateSalvo) {
        const state = JSON.parse(stateSalvo);
        if (state) {
            salasDisponiveis = state.salasDisponiveis ?? salasDisponiveis;
            salasOcupadas = state.salasOcupadas ?? salasOcupadas;
            materiaisDisponiveis = state.materiaisDisponiveis ?? materiaisDisponiveis;
            totalReservas = state.totalReservas ?? totalReservas;
        }
        atualizarCards();

        const reservas = state?.reservas || [];
        const tabela = document.getElementById("tabela");
        reservas.forEach(reserva => {
            const linha = document.createElement("tr");
            linha.innerHTML = `
                <td>${reserva.nome}</td>
                <td>${reserva.tipo}</td>
                <td>${reserva.item}</td>
                <td>${reserva.data}</td>
                <td>${reserva.horaInicio}</td>
                <td>${reserva.dataFim}</td>
                <td>${reserva.horaFim}</td>
                <td>
                    <button class="remover" onclick="remover(this)">X</button>
                </td>
            `;
            tabela.appendChild(linha);
            totalReservas++;
        });
        document.getElementById("reservas").innerText = totalReservas;
    }

    // Carrega salas e materiais nas tabelas
    atualizarTabelaSalas();
    atualizarTabelaMateriais();
}

// Chama a função de carregamento quando a página é carregada
window.onload = function() {
    carregarReservas();
    usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    atualizarContadores();
    atualizarItensDisponiveis();
};
