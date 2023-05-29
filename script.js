function criarTarefa() {
    const modalCriarTarefa = document.querySelector('.modal__criar__tarefa')
    const botaoCriarTarefa = document.querySelector('.botao__criar__tarefa')
    const botaoSalvarTarefa = document.querySelector('.botao__salvar__tarefa')
    const botaoCancelarTarefa = document.querySelector('.botao__cancelar__tarefa')
    const tarefa = document.querySelector('#tarefa')

    botaoCriarTarefa.addEventListener('click', () => {

        modalCriarTarefa.showModal()
        botaoSalvarTarefa.addEventListener('click', (evento) => {
            evento.preventDefault()

            if (tarefa.value != '') {
                if (localStorage.getItem('@LI:listaTarefa') == null) {

                    const item = {
                        id: 1,
                        nome: tarefa.value
                    }

                    localStorage.setItem('@LI:listaTarefa', JSON.stringify([item]))
                } else if (JSON.parse(localStorage.getItem('@LI:listaTarefa')).length >= 0) {

                    const lista = JSON.parse(localStorage.getItem('@LI:listaTarefa'))
                    console.log(lista.length)

                    const item = {
                        id: lista.length + 1,
                        nome: tarefa.value
                    }


                    const novaLista = [...lista, item]
                    localStorage.setItem('@LI:listaTarefa', JSON.stringify(novaLista))
                }

                location.reload()
            } else {
                console.log(1)
            }
            modalCriarTarefa.close()
        })

    })

    botaoCancelarTarefa.addEventListener('click', () => {


        modalCriarTarefa.close()

    })
}



function renderizaLista(arr) {
    if (arr != null) {
        arr.forEach(itemTarefa => {
            const lista = document.querySelector('.lista__tarefas')

            const tarefa = document.createElement('li')
            tarefa.id = itemTarefa.id
            tarefa.classList = "h-[15rem] w-[12rem] p-[1rem] bg-blue-400 rounded-lg relative"

            const iconeTarefa = document.createElement('i')
            iconeTarefa.classList = "fa-solid fa-list-check text-[2rem]"

            const div = document.createElement('div')
            
            const nomeTarefa = document.createElement('p')
            nomeTarefa.classList = ""
            nomeTarefa.innerText = itemTarefa.nome

            const botaoTarefaOk = document.createElement('button')
            botaoTarefaOk.id = itemTarefa.id
            botaoTarefaOk.classList = "bg-emerald-600 w-[10rem] h-[2rem] mt-[1rem] absolute bottom-[1rem]"
            botaoTarefaOk.addEventListener('click', (evento) => {

                const lista = JSON.parse(localStorage.getItem('@LI:listaTarefa'))
                const idItem = parseInt(evento.target.id)

                const novaLista = lista.filter(elemento => elemento.id != idItem)
                localStorage.setItem('@LI:listaTarefa', JSON.stringify(novaLista))
                location.reload()
            })

            const iconeTarefaOk = document.createElement('i')
            iconeTarefaOk.classList = "fa-solid fa-check"

            lista.append(tarefa, div)
            div.append(nomeTarefa)
            tarefa.append(iconeTarefa, div, botaoTarefaOk)
            botaoTarefaOk.append(iconeTarefaOk)
        })
    }
    if (arr.length <= 0) {
        const lista = document.querySelector('.lista__tarefas')

        const p = document.createElement('p')
        p.innerText = "Não há tarefas"
        p.classList = "text-1rem] text-center w-[100%]"

        lista.append(p)
    }
}


criarTarefa()
renderizaLista(JSON.parse(localStorage.getItem('@LI:listaTarefa')))
