//Imortar e montar nosso componente
import NovoLeilao from '@/views/NovoLeilao'
 //Para gente montar esse componente vamos precisar de um pacote do Vue chamado test-utils
//O que a gente quer é justamente importar um helper que monta um componente pra gente então : mount
import { mount } from '@vue/test-utils'
//importe http: //controlar o retorno http. Simular e garantir que o retorno desse http seja 
//exatamente o que nos esperamos dado nosso cenario de teste
import { createLeilao } from '@/http'

//pedindo ajuda ao jets para ele simular e retornar exatamente o que a gente quer (http) para esse cenario
//Jest simular a nossa dependencia do http
jest.mock('@/http')
//pedir para o jest que cada vez que o metodo createLeilao for chamado ele retornar um valor especifico

//simular o router (não queremos testar ele, apenas simular pq a responsabilidade de testar fica na lib do proprop router)
//criando nosso simulador 
const $router = {
    //nosso simulador vai ter uma função que se chama push
    push: jest.fn()
}
//Como o router faz parte do form da erro se não colocar ele "junto"


describe('Um novo leilao deve ser criado', ()=>{
    test('dado o formulario preenchido, um leilão deve ser criado', ()=>{
//quando chamar não vai dar erro, e ele não vai tentar fazer aquisição http
        createLeilao.mockResolvedValueOnce()

        //montando o nosso componente
        const wrapper = mount (NovoLeilao, {
        //passando o simulador de router
        mocks:{
            $router
        }
        })
        
        
        //preencher o formulario - NovoLeilao.vue
        wrapper.find('.produto').setValue('Um livro de magia Vue')

        wrapper.find('.descricao').setValue('Vai acabar com a tua vida')

        wrapper.find('.valor').setValue('10')
        //Agora vamos submeter o formulario ativando o gatilho(trigger) : submit
        wrapper.find('form').trigger('submit')

       //garantir  que o createLeilao foi chamado:
        //esperar que o nosso creatleilao, se foi chamado uma vez
        expect(createLeilao).toHaveBeenCalled()

    })
})


