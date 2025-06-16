// seleção de elementos 
// selecionando elementos da area ADD
const descAdd =  document.querySelector("#desc-desp");
const dataAdd = document.querySelector("#dataAdd")
const valueAdd = document.querySelector("#valor")
const btnAdd = document.querySelector("#btn-adicionar")
let tabela = document.querySelectorAll(".tabela-de-gastos tbody")
let tabelaDel = document.querySelectorAll(".tabela-de-gastos-del ")


// selecionando elementos da area Edit
const seletorEdit = document.querySelector("#seletor-edit")
const descEdit = document.querySelector("#desc-desp-edit")
const valueEdit = document.querySelector("#valor-edit")
// btn-edit
const btnEdit = document.querySelector("#btn-editar")
// tab-edit
let tabelaEdit = document.querySelectorAll(".tabela-de-gastos-edit ")

// seleção de elementos da area del
// btn dell
const btnDel = document.querySelector("#btn-deletar")


// Seleção de elementos da area principal
const selectRelatorio = document.querySelector("#relatorio-vizu")
const btnVizu = document.querySelector("#btn-vizu-all")
const tabelavizu = document.querySelector(".tabela-vizu")
const btnFecharResumo = document.querySelector("#btn-fechar-resumo")

// seleção area especifica
const mes = document.querySelector("#mes")
const btnFiltrar = document.querySelector("#btn-mes")



// funções

// função para zerar o local storage 
function zerar () {
    localStorage.clear()
    console.log("local storage zerado papaihh!")
}

// função formatar data
function formatarData(data) {
    const partes = data.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

// função de adicionar valores a tabela
function addDespesa (descricao, valor, data){


    if (tabela.length == 0) {
        console.error("Erro: nenhuma tabela encontrada !")
        return
    }
    
    tabela.forEach(tab => {

    let addLinha = tab.insertRow()

    let celulaDescricao = addLinha.insertCell(0)
    let celulaValor = addLinha.insertCell(1)
    let celulaData = addLinha.insertCell(2)

    celulaDescricao.textContent = descricao
    celulaValor.textContent = `R$ ${valor.toFixed(2)}`
    celulaData.textContent = formatarData(data)

    })


}



// Função para salvar tabela



function salvarTabela() {

    let tabela = [];
    document.querySelectorAll(".tabela-de-gastos tbody tr").forEach (tr => {
        let dados = {
            descricao: tr.cells[0].textContent,
            valor: tr.cells[1].textContent,
            data: tr.cells[2].textContent
        }
        tabela.push(dados)


    })

    

    if (tabela.length > 0) {
        localStorage.setItem("tabela", JSON.stringify(tabela))
    } else {
        console.warn("Tabela vazia! Nada para salvar.")
    }
}


// função para carregar a tabela



function carregarTabela() {
    let tabela = JSON.parse(localStorage.getItem("tabela")) || []

    let tbody = document.querySelector(".tabela-de-gastos tbody")
    let tbodyEdit = document.querySelector(".tabela-de-gastos-edit tbody")
    let tbodyDel = document.querySelector(".tabela-de-gastos-del tbody")
    let tbodyVizu = document.querySelector(".tabela-resumo tbody")


if (tbody) {
        tbody.innerHTML = "";
        tabela.forEach(dado => {
            let tr = document.createElement("tr");
            tr.innerHTML = `<td>${dado.descricao}</td><td>${dado.valor}</td><td>${dado.data}</td>`;
            tbody.appendChild(tr);
        });
    }

    // Lógica para a tabela de edição (pagina_editar.html)
if (tbodyEdit) {
        tbodyEdit.innerHTML = "";
        tabela.forEach(dado => {
            let tr = document.createElement("tr");
            tr.innerHTML = `<td>${dado.descricao}</td><td>${dado.valor}</td><td>${dado.data}</td>`;
            tbodyEdit.appendChild(tr);
        });
    }

    // Lógica para a tabela de exclusão (pagina_apagar.html)
if (tbodyDel) {
        tbodyDel.innerHTML = "";
        tabela.forEach(dado => {
            let tr = document.createElement("tr");
            tr.innerHTML = `<td>${dado.descricao}</td><td>${dado.valor}</td><td></td>`;
            tbodyDel.appendChild(tr);
        });
    }

    // Lógica para a tabela de visualização
if (tbodyVizu) {
        tbodyVizu.innerHTML = "";
        tabela.forEach(dado => {
            let tr = document.createElement("tr");
            tr.innerHTML = `<td>${dado.descricao}</td><td>${dado.valor}</td><td>${dado.data}</td>`;
            tbodyVizu.appendChild(tr);
        });
        // adição da linha total

    }
}


// funçõe para a tela edit 
// função para carregar as despesas para o select da sessão edit
function carregarSelect () {
    let dados = JSON.parse(localStorage.getItem("tabela")) || []
    let select = document.querySelector("#seletor-edit")

    if (select) {
        select.innerHTML = ""

        dados.forEach(dado => {
            let option = document.createElement("option")
            option.textContent = dado.descricao
            option.value = dado.descricao
            select.appendChild(option)
        })
    }

}
function editar() {
    let dados = JSON.parse(localStorage.getItem("tabela")) || []
    let select = document.querySelector("#seletor-edit")
    let desc = select.value
    let novadesc = descEdit.value.trim()
    let novovalue = parseFloat(valueEdit.value) || 0

    if(novadesc && !isNaN(novovalue)) {
        dados.forEach(dado => {
            if (desc === dado.descricao) {
                dado.descricao = novadesc
                dado.valor = `R$ ${novovalue.toFixed(2)}`


            }
        })
        // salva as alterações no arquivo JSON
        localStorage.setItem("tabela", JSON.stringify(dados));
        // atualiza a tabela instantaneamente na tela
        carregarTabela()


    } else if (novadesc && !novovalue) {
        dados.forEach(dado => {
            if (desc === dado.descricao) {
                dado.descricao = novadesc
            }
        })
        // salva as alterações no arquivo JSON
        localStorage.setItem("tabela", JSON.stringify(dados));
        // atualiza a tabela instantaneamente na tela
        carregarTabela()


    } else if (!novadesc && novovalue) {    
        dados.forEach(dado => {
            if (desc === dado.descricao)
                dado.valor = `R$ ${novovalue.toFixed(2)}`
        })
        // salva as alterações no arquivo JSON
        localStorage.setItem("tabela", JSON.stringify(dados));
        // atualiza a tabela instantaneamente na tela
        carregarTabela()
    }
    
    else {
        console.error("Erro: Um dos elementos do formulário não foi encontrado.");
    }




}

// funções para a area deletar !
// função deletar

function carregarSelectDel () {
    let dados = JSON.parse(localStorage.getItem("tabela")) || []
    let select = document.querySelector("#seletor-del")

    if (select) {
        select.innerHTML = ""

        dados.forEach(dado => {
            let option = document.createElement("option")
            option.textContent = dado.descricao
            option.value = dado.descricao
            select.appendChild(option)
        })
    }

}
// função para deletar
function deletar () {
    let dados = JSON.parse(localStorage.getItem("tabela")) || []
    let selected = document.querySelector("#seletor-del")
    let selectdel = selected.value


    if (selectdel) {
        
        dados = dados.filter(dado => dado.descricao !== selectdel)

        // salva as alterações no arquivo JSON
        localStorage.setItem("tabela", JSON.stringify(dados));
        // atualiza a tabela instantaneamente na tela
        carregarTabela()
        carregarSelectDel()

    } else {
        console.log("nenhum item foi encontrado com este nome !")
    }
}





// função de limpar campos
function resetar () {
    descAdd.value = ""
    valueAdd.value = ""
    dataAdd.value = ""
}



// Função para somar as despesas
function somar() {
    const dados = JSON.parse(localStorage.getItem("tabela")) || [];
    let total = 0;

    dados.forEach(dado => {
        if (dado.valor) {
            const valorLimpo = dado.valor
                .toString()
                .replace("R$", "")
                .replace(/\s/g, "")        // remove espaços extras
                .replace(/\./g, "")        // remove separadores de milhar
                .replace(",", ".")         // agora sim: vírgula vira ponto
                .trim();

            const valor = Number(valorLimpo);

            if (!isNaN(valor) && valor >= 0) {
                total += valor ;
            }
        }
    });

    return total ;
}



// Função para visualizar despesas
function despesas () {
    let dados = JSON.parse(localStorage.getItem("tabela")) || []
    const vizutab = tabelavizu
    const tabela = document.querySelector(".tabela-resumo")
    let valorSelect = document.querySelector("#relatorio-vizu")
    const total = somar() / 100 

    if (tabela){
        if (valorSelect) {

            if(valorSelect.value == 1) {
                
                carregarTabela()

                let trtotal = document.createElement("tr")
                trtotal.innerHTML = `<td> TOTAL</td><td>R$ ${total.toFixed(2)}</td><td></td>`

                tabela.appendChild(trtotal)

                vizutab.style.display = "block"
                

            }
        }
    }



}



// EVENTOS


// evento da tela de add
if (btnAdd) {
    btnAdd.addEventListener("click" ,(e) => {
        e.preventDefault()

        // definindo valores
        let descricao = descAdd.value.trim()
        let valor = parseFloat(valueAdd.value)
        let data = dataAdd.value

        if (descricao && !isNaN(valor) && data) {
            addDespesa(descricao,valor,data)
            console.log(`Despesa adicionada: ${descricao}, R$${valor}, ${data}`)

            salvarTabela()
        } else {
            alert("Por favor, preencha todos os campos")
        }

        resetar()
        console.log("Dados no localStorage:", JSON.parse(localStorage.getItem("tabela")));

    })
}




// evento da tela edit 
if(btnEdit) {
    btnEdit.addEventListener("click", (e) => {
        e.preventDefault()

        // definindo valores
        let novadescricao = descEdit.value.trim()
        let novovalor = parseFloat(valueEdit.value)

        // processar informações
        editar()
    })
}


// evento da tela del
if(btnDel) {
    btnDel.addEventListener("click", (e) => {
        e.preventDefault()


        deletar()
    })
}


// evento de visualizar 
if (btnVizu) {
    btnVizu.addEventListener("click", (e) => {


        // tabelavizu.style.display = "block"


        despesas()
        console.log(somar())

        
    })
}
if(btnFecharResumo) {
    btnFecharResumo.addEventListener("click", (e) => {
        e.preventDefault()
        
        tabelavizu.style.display = "none"
    })
}


window.addEventListener("load", carregarTabela)
window.addEventListener("load", somar)
console.log("Dados no localStorage:", JSON.parse(localStorage.getItem("tabela")));
document.addEventListener("DOMContentLoaded", carregarSelect)
document.addEventListener("DOMContentLoaded", carregarSelectDel)



