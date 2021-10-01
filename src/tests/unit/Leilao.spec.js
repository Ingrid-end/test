    //GARANTINDO QUE O TEXTO EXIBIDO CONDIZ COM A PROPRIEDADE QUE FOI PASSADA VIA PROPSDATA DO VUE
    
    //importando nosso componente
    import Leilao from '@/components/Leilao'
    //Para gente montar esse componente vamos precisar de um pacote do Vue chamado test-utils
    //O que a gente quer é justamente importar um helper que monta um componente pra gente então : mount
import { mount } from '@vue/test-utils'

//precisamos passar como props do leilão, o leilão em si, como produto, lanceInincial e descrição
const leilao = {
    produto: 'Um livro de Vue',
    lanceInicial: 49,
    descricao: 'Um maravilho livro sobre bruxaria'
}

//Vamos descrever
describe ('Um leilão exibe os dados do produto', ()=>{
    //teste:
    test('exibi os dados do leilão no card', ()=>{
//montando nosso compoenete
 const wrapper = mount (Leilao,{
     //obj de configuração : {}
     propsData:{
         leilao
     }
 })
 //validar os elementos HTML
 const header = wrapper.find('.card-header').element
 const title = wrapper.find('.card-title').element
 const text = wrapper.find('.card-text').element

 //esperar que o conteudo de texto do nosso  header contenha o texto e o produto 
 expect(header.textContent).toContain(`Estamos leiloando um(a): ${leilao.produto}`) //usamos `` inves de '' pq estamos usando lavores dentro do texto
 expect(title.textContent).toContain(`Lance inicial: R$ ${leilao.lanceInicial}`)
 expect(text.textContent).toContain(leilao.descricao) //Aqui não tem os `` e ${} pq não tem texto, é so o valor
    })
})