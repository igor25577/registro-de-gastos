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

const defLimite = document.querySelector("#limite")
const btnDefinir = document.querySelector("#btn-definir")

// seleção area especifica
const mes = document.querySelector("#mes")
const areaTab = document.querySelector(".area-tab-filtrada")
const tabFiltrada = document.querySelector("#tabela-filtrada")
const btnFiltrar = document.querySelector("#btn-mes")
const btnfecharResumoMes = document.querySelector("#btn-fechar-resumo-mes")



// funções

// função para zerar o local storage 
function zerar () {
    localStorage.clear()
    console.log("local storage zerado papaihh!")
}

// função formatar data
function formatarData(data) {
    const partes = data.split("-");

    if (partes.length === 3) {
        return `${partes[2]}/${partes[1]}/${partes[0]}`; // dia/mês/ano
    } else if (partes.length === 2) {
        return `${partes[1]}/${partes[0]}`; // mês/ano
    } else {
        return data; // formato desconhecido
    }
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




// função para definir um limite
function salvarLimite(limite) {

    if( limite) {
        localStorage.setItem("limite", limite)
        const valorlimite = Number(localStorage.getItem("limite"))
        console.log(`Novo Limite definido é de ${valorlimite.toFixed(2)}`)

    }
    else {
        console.log("limite não definido")
    }
}




// função para verificar o limite



function verificadorLimite(tot) {
    
    const limit = Number(localStorage.getItem("limite"))

    if (!limit) {
        return `limite não definido`
    }
    if (!isNaN(tot) && !isNaN(limit)) {
        if (limit < tot) {
            return `<span style="color:red;">limite R$: ${limit.toFixed(2)} excedido </span>`
        }
        else {
            return `<span style="color:green;">limite de ${limit.toFixed(2)}R$ não excedido <span>`
        }
    } else {
        return "limite em formato invalido ou não definido"
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
                total = total + valor / 100;
                // a divisão por 100 ocorre pois os dados entram formatados, e quando retiramos a formatação ele entra como se fosse 2 casas decimais maiores,
                // ou seja o valor é multiplicado por 100, então algo que estava com o valor de 10R$ na tabela fica como se fosse 1000R$, então após retirarmos
                // a formatação, temos que dividi-los para que saia essa casa decimal a mais

            }
        }
    });

    return total ;
}



// Função para visualizar despesas


function despesas () {
    const vizutab = tabelavizu
    const tabela = document.querySelector(".tabela-resumo")
    const tbody = tabela.querySelector("tbody")
    let valorSelect = document.querySelector("#relatorio-vizu")
    const total = somar() 
    const limit = verificadorLimite(total)

    if (tabela){
        if (valorSelect) {
                if (valorSelect.value == 1) {
                    const antigaLinhaTotal = tabela.querySelector("tr.linha-total")
                    if (antigaLinhaTotal) antigaLinhaTotal.remove()

                    let trtotal = document.createElement("tr")
                    trtotal.classList.add("linha-total")
                    trtotal.innerHTML = `<td> TOTAL</td><td>R$ ${total.toFixed(2)}</td><td>${limit}</td>`

                    tabela.appendChild(trtotal)

                    vizutab.style.display = "block"
                    

                } else if ( valorSelect.value == 2) {

                    const antigaLinhaTotal = tabela.querySelector("tr.linha-total")
                    if (antigaLinhaTotal) antigaLinhaTotal.remove()

                    tbody.innerHTML = ""
                    let trtotal = document.createElement("tr")
                    trtotal.classList.add("linha-total")
                    trtotal.innerHTML = `<td> TOTAL</td><td>R$ ${total.toFixed(2)}</td><td>${limit}</td>`

                    tabela.appendChild(trtotal)
                    vizutab.style.display = "block"

                }
            
        }
    }
}

// função para filtrar por datas 
function filtrar() {
    let dados = JSON.parse(localStorage.getItem("tabela")) || []
    const datatab = formatarData(mes.value)
    const tab = document.querySelector(".tabela-filtrada")
    const tbody = tab.querySelector("tbody")
    let total = 0
    tbody.innerHTML = "";



    dados.forEach(dado => {
        const datatabela = dado.data
        const anoMes = datatabela.slice(3)

        if (datatab == anoMes) {
            let tr = document.createElement("tr")
            tr.innerHTML = `<td>${dado.descricao}</td><td>${dado.valor}</td><td>${dado.data}</td>`
            tbody.appendChild(tr)

            // limpando o valor]
            const valorLimpo = dado.valor
                .toString()
                .replace("R$", "")
                .replace(/\s/g, "")
                .replace(/\./g, "")
                .replace(",", ".")
                .trim();

            const valor = Number(valorLimpo)
            if (!isNaN(valor)){
                total += valor / 100
            }

        }

    })

    const antigaLinhaTotal = tab.querySelector("tr.linha-total")
    if (antigaLinhaTotal) antigaLinhaTotal.remove()

    const limit = verificadorLimite(total)
    let trtot = document.createElement("tr")
    trtot.classList.add("linha-total")
    trtot.innerHTML = `<td>TOTAL</td><td> R$ ${total.toFixed(2)}</td><td>${limit}</td>`
    tbody.appendChild(trtot)

    


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


// evento de definir limite 

if (btnDefinir) {
    btnDefinir.addEventListener("click", (e) => {
        salvarLimite(defLimite.value)
    })
}



// evento de visualizar 

if (btnVizu) {
    btnVizu.addEventListener("click", (e) => {


        // tabelavizu.style.display = "block"

        carregarTabela()
        despesas()

        
    })
}
if(btnFecharResumo) {
    btnFecharResumo.addEventListener("click", (e) => {
        e.preventDefault()
        
        tabelavizu.style.display = "none"
        carregarTabela()
    })
}

if(btnFiltrar) {
    btnFiltrar.addEventListener("click", (e) => {
        e.preventDefault()

        carregarTabela()

        filtrar()
        areaTab.style.display = "block"
    })
}
if(btnfecharResumoMes) {
    btnfecharResumoMes.addEventListener("click", (e) => {
        e.preventDefault()
        
        areaTab.style.display = "none"
        carregarTabela()
    })
}


window.addEventListener("load", carregarTabela)
console.log("Dados no localStorage:", JSON.parse(localStorage.getItem("tabela")));
document.addEventListener("DOMContentLoaded", carregarSelect)
document.addEventListener("DOMContentLoaded", carregarSelectDel)



