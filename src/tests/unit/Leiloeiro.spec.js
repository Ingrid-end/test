//Imortar e montar nosso componente
import Leiloeiro from '@/views/Leiloeiro'
 //Para gente montar esse componente vamos precisar de um pacote do Vue chamado test-utils
//O que a gente quer é justamente importar um helper que monta um componente pra gente então : mount
import { mount } from '@vue/test-utils'
//importe http: //controlar o retorno http. Simular e garantir que o retorno desse http seja 
//exatamente o que nos esperamos dado nosso cenario de teste
import { getLeilao, getLances } from '@/http'

//para resolver a questão do alerta que esta sendo exibido mesmo não "podendo" = (o getleilao é assicrona)
//Usamos uma biblioteca chamada flush-promises
import flushPromises from 'flush_promises'
// flushPromises: esse metodo vai fazer com que nosso teste aguarde as promessas serem resolvidas antes de seguir


//pedindo ajuda ao jets para ele simular e retornar exatamente o que a gente quer (http) para esse cenario
//Jest simular a nossa dependencia do http
jest.mock('@/http')
//pedir para o jest que cada vez que o metodo getLeilao for chamado ele retornar um valor especifico

//Simulando o retorno do getleilao
// const leilao = {
//     produto: 'livro bruxaria Vue',
//     lanceInicial: 50,
//     descricao: 'Sua vida acaba aqui'
// }


//array de lances para exemplo dos lances do leiloeiro
const lances =[{
    id: 1,
    valor: 1001,
    data: '2020-12-01',
    leilao_id: 1
    },

    {
    valor: 1005,
    data: '2020-12-01',
    leilao_id: 1,
    id:2
    },

    {
    id: 3,
    valor: 1099,
    data: '2020-12-01',
    leilao_id: 1    
    }
]

describe('Leiloeiro inicia um leilão que não possui lances', ()=>{
                                        //usando async p do getLeilao
    test( 'avisa quando não existem lances', async ()=>{
            //criar os dados simulados dessa chanada http
            //chama o geteilao
    //pedir para o jest que cada vez que o metodo getLeilao for chamado ele retornar um valor especifico:
    //mockReslvdValueOnce: ele vai simular pra  primeira vez que metodo for chamado ele retornar o que a gente pedir
            getLeilao.mockResolvedValueOnce(leilao)
            getLances.mockResolvedValueOnce([{
                //simulação dentro do array
                //com essas propriedades ele não devera exibir o alerta
                // id: 1,
                // valor: 100,
                // data: '2020-12-01',
                // leilao_id: 1
//Nos chamamos essas situação de mock, a simulação é um mock
          }])
          //antes de rodar e localizar o nosso alerta, vamos aguardar para que todas as nossas promessas sejam resolvidas
          await flushPromises ()


        //armazenar no wrapper, o rescultado da função mount = leiloeiro
        const wrapper = mount(Leiloeiro, {
            //nosso componente espera um id como props (Leiloeiro.vue)
            propsData:{
                id: 1
            }
        })
        //localizar o elemento(class) de alert
        const alerta =wrapper.find('.alert-dark')
        //agora vamos testar que esse elemento existe
        //Esmperamos que o resultado da função existe ou seja: ele esta garantindo que esse elemento existe, seja true
        expect(alerta.exists()).toBe(true)
    })

})

//Com esses testes conseguimos cobrir todo comportamento do leiloeiro:

describe('Um leiloeiro exibi os lances existentes', ()=>{
    test('Não mostra o aviso de "sem lances"', async ()=>{
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)
        const wrapper = mount(Leiloeiro, {
            propsData:{
                id: 1
            }
        })
      await flushPromises ()
      const alerta =wrapper.find('.alert-dark')
      expect(alerta.exists()).toBe(false)
    })

    test('Possui uma lista de lances', async ()=>{
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)
        const wrapper = mount(Leiloeiro, {
            propsData:{
                id: 1
            }
        })
      await flushPromises ()
      //localizando a lista de lances pela class(leiloeiro.js)
      const alerta =wrapper.find('.list-inline')
      expect(alerta.exists()).toBe(true)
    })
})


describe('Um Leiloeiro comunica os valores de maior e menor lance',()=>{
                                     
    test('Mostra o maior lance daquele leilão', async ()=>{
        //mostrar o maior lance daquele leilão
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)
        const wrapper = mount(Leiloeiro, {
            propsData:{
                id: 1
            }
        })
      await flushPromises ()
      const maiorLance =wrapper.find('.maior-lance')
      //vams garantir que o conteudo texto do elemento do maior lance, contenha 
      expect(maiorLance.element.textContent).toContain('Maior lance: R$ 1001')
    })

    test('Mostra o menor lance daquele leilão', async ()=>{
    //mostrar o maior lance daquele leilão
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)
    const wrapper = mount(Leiloeiro, {
        propsData:{
            id: 1
        }
    })
    await flushPromises ()
    const menorLance =wrapper.find('.menor-lance')
    //vams garantir que o conteudo texto do elemento do maior lance, contenha 
    expect(menorLance.element.textContent).toContain('Menor lance: R$ 1099')
    })
})