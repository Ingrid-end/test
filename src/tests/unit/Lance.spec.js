    //Primeira função de teste:
    //So para garantir que nosso script esteja localizando esse arquivo e rodando esse teste:

    //importando nosso componente
import Lance from '@/components/Lance'
    //Para gente montar esse componente vamos precisar de um pacote do Vue chamado test-utils
    //O que a gente quer é justamente importar um helper que monta um componente pra gente então : mount
import { mount } from '@vue/test-utils'



describe('Um Lance sem valor mínimo', () => {
    //Para gente testar nos temos uma função chamada de test, ela vai receber dois argumentos:
    //O primeiro é a descrição do que a gente quer testar: ele não pode aceitar valores negativos
    //O segundo argumento é justamente uma função que vai conter o nosso teste 
  test('não aceita lance com valor menor do que 0', () => {
      //Vamos capturar esse componente, montar ele, e testar se esse componente é vdd ou não\;
    //O componente não é o componente em si e sim alguem que empacoto esse componente e consegue interagir com ele: wrapper
    //wrapper: impactador
    const wrapper = mount(Lance)
    //metodo que usamos para encontrar um componente usando o wrapper
    //pedimos para o wrapper encontrar "o elemento que vc quer fazer o teste" que nesse caso é o input onde o usuario vai colocar o valor do lance
    //guardamos esse valor na contante input
    const input = wrapper.find('input')
    input.setValue(-100)
    //pedir ao wrapper para ele ativar o evento de submit
    wrapper.trigger('submit')
    //ERRO: CASO OS VALORES FOREM INVALIDOS PARA NOSSO LANCE

    //capiturar os eventos imitidos
    //capiturar todas emições (emitted), passando por parametro o nome do evento que queremos ouvir
    const lancesEmitidos = wrapper.emitted('novo-lance')
    //nos esperamos - que ele não exista (toBeUndefined)
    expect(lancesEmitidos).toBeUndefined()
  })
  
    //CASO SENARIO  DE SUCESSO
    //vamos tetar que nosso componente :
  test('emite um lance quando o valor é maior do que 0', () => {
    const wrapper = mount(Lance)
    const input = wrapper.find('input')
      //vamos fazer com que o imput seja valido
    input.setValue(100)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
     //vamos garantir que os lances emitidos tenham o tamanho de um
    //ou seja caso o valor seja valoido, nos queremos que os lances emitidos existam(que exista um valor la dentro)
    expect(lancesEmitidos).toHaveLength(1)
  })
   //vamos garantir que o valor emitido do lance é exatamente o valor que foi inputado no nosso componente
    //novo teste onde garantimos que o componente :
  test('emite o valor esperado de um lance válido', () => {
       //montando um componente
    const wrapper = mount(Lance)
    const input = wrapper.find('input')
    //definindo o valor
    input.setValue(100)
     //ativar o gatilho de submit
    wrapper.trigger('submit')
    //capturar os lances emitidos
    const lancesEmitidos = wrapper.emitted('novo-lance')
     //Nos ja sabermos que o resultado desse wrapper é um array de array
    //Nessa estrutura:
    //  [
    //      [100]
    //  ]
    const lance = parseInt(lancesEmitidos[0][0])//que vai trazer aquele valor de cima da array
    //agora o que a gente espera: lance seja 100
    expect(lance).toBe(100)
  })
})
    //Sernario valor minimo do lance
describe('Um Lance com valor mínimo', () => {
    //vamos testar agra que quando um valor minimo é definido :
  test('todos os lances devem possuir um valor maior do que o do mínimo informado', async () => {
      //motando o componente
    //Desta vez, alem de montar esse componente vamos definira propriedade lance minimo, para garantir que esse contratro seja atendido
    const wrapper = mount(Lance, {
     //{obj literal} e esse parametro ele recebe como configuração um campo chamado:
     //propsData: é justamente as propriedades que iremos passar para o nosso componente em tempo de montagem
      propsData: {
        lanceMinimo: 300
      }
    })
    //encontrando nosso input
    const input = wrapper.find('input')
    input.setValue(400)
    wrapper.trigger('submit')
    await wrapper.vm.$nextTick()
    const lancesEmitidos = wrapper.emitted('novo-lance')
    expect(lancesEmitidos).toHaveLength(1)
  })
  //O valor emitido ainda é o esperado = verificação
  test('emite o valor esperado de um lance válido', () => {
    const wrapper = mount(Lance)
      //encontrando nosso input
    const input = wrapper.find('input')
    input.setValue(400)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    // [[400]]
    //validar que o valor do lance
    const lance = parseInt(lancesEmitidos[0][0])
    //nos esperamos agora, que o valor do lance, seja
    expect(lance).toBe(400)
  })
  //pq usamos async:DOM em componentes Vue é assíncrono       async:Então que nós queremos é transformar essa função em assíncrona
  test('não são aceitos lances menores do que o valor mínimo', async () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    })
     //encontrando nosso input
    const input = wrapper.find('input')
    input.setValue(100)
    wrapper.trigger('submit')
    //queremos esperar, justamente que nosso wrapper, chamando vm do vue, e aguardando pelo evento
    //$nextTick: é esse metodo que precisamos aguardar para garantir que o DOM foi atualizado 
    await wrapper.vm.$nextTick()
    const lancesEmitidos = wrapper.emitted('novo-lance')
    expect(lancesEmitidos).toBeUndefined()
    //Queremos encontrar o p (classe alert) do lance da mensagem de erro
    //ai queremos então de fato o elemento HTML (element)
    //textContent: conteudo do texto desse elemento
    const msgErro = wrapper.find('p.alert').element.textContent
    //esperamos que essa mensagem de erro contenha a mensagem esperada
    expect(msgErro).toContain('O valor mínimo para o lance é de R$ 300')
  })
})

//Chamamos de programação assíncrona(async) quando nosso código deve aguardar certo 
//processamento que não está em nosso controle acontecer, como uma requisição externa, 
//para aí então continuar com a execução da tarefa seguinte.