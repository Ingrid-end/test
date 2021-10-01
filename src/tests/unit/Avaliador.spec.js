//Imortar e montar nosso componente
import Avaliador from '@/views/Avaliador'
 //Para gente montar esse componente vamos precisar de um pacote do Vue chamado test-utils
//O que a gente quer é justamente importar um helper que monta um componente pra gente então : mount
import { mount, RouterLinkStub } from '@vue/test-utils'
//RouterLinkstub: Simulador do RouterLink padrão, nesse caso ele é o doublé do routerlink


//importe http: //controlar o retorno http. Simular e garantir que o retorno desse http seja 
//exatamente o que nos esperamos dado nosso cenario de teste
import { getLeiloes } from '@/http'

//para resolver a questão do alerta que esta sendo exibido mesmo não "podendo" = (o getleilao é assicrona)
//Usamos uma biblioteca chamada flush-promises
import flushPromises from 'flush_promises'
// flushPromises: esse metodo vai fazer com que nosso teste aguarde as promessas serem resolvidas antes de seguir

//pedindo ajuda ao jets para ele simular e retornar exatamente o que a gente quer (http) para esse cenario
//Jest simular a nossa dependencia do http
jest.mock('@/http')
//pedir para o jest que cada vez que o metodo getLeilao for chamado ele retornar um valor especifico

const leiloes = [ {
    produto: 'Um livro de Vue',
    lanceInicial: 49,
    descricao: 'Um maravilho livro sobre bruxaria'
},
{
produto: 'Um livro de Vue',
lanceInicial: 49,
descricao: 'O inferno esta apenas começando'
},
]

describe('Um avaliador que se conecta a API', ()=>{
    //garantir que ele:                              async= vamos ter que aguradar o retorno do API
    test('mostra todos os leilões retornados pela API', async ()=>{
        getLeiloes.mockResolvedValue(leiloes)
        //montar nosso componente
        const wrapper = mount(Avaliador,{
            //obj de config do RouterLinkStub: stubs= dubles
            stubs:{
                //routerlink vai ser o RouterLinkStub
                RouterLink: RouterLinkStub
//Então agora estamos já inserindo essa dependência, sem precisar acoplar com a nossa dependência 
//do routerlink, estamos dublando esse componente.
            }
        } )
        //vams aguardar pelas promessas
        await flushPromises()
        //testar o tamanho da nossa lista, onde exibi a lista retornado pelo API, e ve se os valores estão batento
        const totalLeiloesExibidos = wrapper.findAll('.leilao').length
        //findAll: Vai achar todos os elementos que portão a class de leilao
        //length pq queremos justamente o tamanaho 

        //Esperemos que o total dos leiloés exibidos seja a mesma coisa que nosso leiloes
        expect(totalLeiloesExibidos).toBe(leiloes.length)
    })

//garantir que caso nenhum leilao seja retornado da API nosso componente não vai funciona como a gente espera  test('mostra todos os leilões retornados pela API', async ()=>{
    test('Nao há leilões retornados pela API', async ()=>{
        getLeiloes.mockResolvedValue([])
        const wrapper = mount(Avaliador,{
            stubs:{
                RouterLink: RouterLinkStub
            }
        } )
        //vams aguardar pelas promessas
        await flushPromises()
        const totalLeiloesExibidos = wrapper.findAll('.leilao').length
        //Esperemos que o total dos leiloés exibidos seja 0
        expect(totalLeiloesExibidos).toBe(0)
    })
    
})

