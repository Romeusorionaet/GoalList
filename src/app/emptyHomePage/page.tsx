'use client'

import comoFazerAmigosEInfluenciarPessoas from '../../assets/books/comoFazerAmigosEInfluenciarPessoas.png'
import MindsetANovaPsicologiaDoSucesso from '../../assets/books/Mindset-A-Nova-Psicologia-do-Sucesso.png'
import porQueFazemosOQueFazemos from '../../assets/books/porQueFazemosOQueFazemos.png'
import naoLeveAVidaTaoASerio from '../../assets/books/naoLeveAVidaTaoASerio.png'
import atitudeMentalPositiva from '../../assets/books/atitudeMentalPositiva.png'
import maisEspertoQueODiabo from '../../assets/books/maisEspertoQueODiabo.png'
import OSeuDireitoDeSerRico from '../../assets/books/oSeuDireitoDeSerRico.png'
import quemPensaEnriquece from '../../assets/books/quemPensaEnriquece.png'
import oPoderDoHabito from '../../assets/books/o-poder-do-habito.png'
import { ClipboardText } from 'phosphor-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function EmptyHomePage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
      }}
    >
      <main className="mx-auto flex max-w-[1280px] flex-col justify-center rounded-xl bg-zinc-200 p-4 py-8 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] dark:bg-slate-800 dark:text-white">
        <h1 className="mb-8">
          Bem-vindo ao GoalList: Compartilhe Suas Jornada com outros viajante
        </h1>

        <section className="space-y-4 text-base max-md:text-sm">
          <p>
            O GoalList é mais do que uma simples lista de tarefas, é o seu
            espaço para gerenciar e compartilhar parte de sua jornada.
          </p>

          <p>
            Aqui, não se trata apenas de anotar seus objetivos e esquecê-los.
            Você terá a oportunidade de compartilhar suas últimas conquistas com
            outros aventureiros, mas não se preocupe, seu perfil permanecerá
            privado.
          </p>

          <p>
            Não é necessário divulgar detalhes pessoais sobre suas missões.
            Basta registrar suas metas e descrevê-las com palavras sábias e
            concisas. Ao fazer isso, você se compromete a cumprir suas metas,
            aumentando suas chances de sucesso.
          </p>

          <p>
            Está pronto para o desafio? Registre-se agora e comece sua jornada!
          </p>
        </section>

        <div className="my-8">
          <ClipboardText
            className="mx-auto h-32 w-32 dark:text-white"
            weight="duotone"
          />
        </div>

        <section className="mt-8">
          <h2>9 livros que indico para quem procura:</h2>

          <ul className="mt-4 list-inside list-disc dark:text-white">
            <li>Alcançar seu Potencial</li>
            <li>Ser mais Produtivo</li>
            <li>Ter Saúde e Harmonia entre outros benefício</li>
          </ul>

          <div className="mt-8 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h3>O Poder do Hábito</h3>

              <div className="flex gap-2 max-md:flex-col max-md:items-center">
                <Image
                  className="h-40 w-40"
                  width={500}
                  height={500}
                  src={oPoderDoHabito}
                  alt="book O Poder do Habito"
                />
                <p>
                  Por Charles Duhigg: Este livro explora como os hábitos afetam
                  nossas vidas e como podemos mudá-los para melhorar nossa
                  produtividade e bem-estar.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3>Mindset: A Nova Psicologia do Sucesso</h3>

              <div className="flex gap-2 max-md:flex-col max-md:items-center">
                <Image
                  className="h-40 w-40"
                  width={500}
                  height={500}
                  src={MindsetANovaPsicologiaDoSucesso}
                  alt="book Mindset A Nova Psicologia Do Sucesso"
                />
                <p>
                  Por Carol S. Dweck: O livro aborda a mentalidade e como nossa
                  atitude em relação ao aprendizado e ao crescimento pode afetar
                  nosso potencial.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3>O seu direito de ser rico</h3>

              <div className="flex gap-2 max-md:flex-col max-md:items-center">
                <Image
                  className="h-40 w-40"
                  width={500}
                  height={500}
                  src={OSeuDireitoDeSerRico}
                  alt="book O Seu Direito De Ser Rico"
                />
                <p>
                  Por Napoleon Hill: pode ajudar verdadeiramente na realização
                  de todos os seus objetivos e sonhos, além de inspirá-lo a
                  buscar novos, nos quais a riqueza não se restrinja a
                  parâmetros tão estreitos como fortuna e fama. Você merece ser
                  rico em todas as áreas – pessoal, espiritual e financeira.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3>Atitude Mental Positiva</h3>

              <div className="flex gap-2 max-md:flex-col max-md:items-center">
                <Image
                  className="h-40 w-40"
                  width={500}
                  height={500}
                  src={atitudeMentalPositiva}
                  alt="book atitude Mental Positiva"
                />
                <p>
                  Por Napoleon Hill: Este livro explora a importância de uma
                  atitude mental positiva na realização de metas, na resolução
                  de problemas e no sucesso em geral. Oferece princípios e
                  estratégias para desenvolver uma mentalidade positiva e
                  alcançar o que se deseja na vida.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3>Como Fazer Amigos e Influenciar Pessoas</h3>

              <div className="flex gap-2 max-md:flex-col max-md:items-center">
                <Image
                  className="h-40 w-40"
                  width={500}
                  height={500}
                  src={comoFazerAmigosEInfluenciarPessoas}
                  alt="book como Fazer Amigos E Influenciar Pessoas"
                />
                <p>
                  Por Dale Carnegie é um dos livros mais populares e influentes
                  quando se trata de habilidades sociais, comunicação eficaz e
                  influência positiva nas relações pessoais e profissionais. Ele
                  fornece conselhos práticos sobre como construir
                  relacionamentos, desenvolver empatia, resolver conflitos e
                  influenciar pessoas de maneira positiva.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3>Quem Pensa Enriquece</h3>

              <div className="flex gap-2 max-md:flex-col max-md:items-center">
                <Image
                  className="h-40 w-40"
                  width={500}
                  height={500}
                  src={quemPensaEnriquece}
                  alt="book quem Pensa Enriquece"
                />
                <p>
                  Por Napoleon Hill é um livro clássico e amplamente reconhecido
                  que se alinha muito bem com a ideia de alcançar o sucesso
                  financeiro e pessoal. O livro oferece uma série de princípios
                  e conceitos para ajudar as pessoas a atingirem seus objetivos
                  financeiros e a prosperar em suas vidas.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3>Mais Esperto que o Diabo</h3>

              <div className="flex gap-2 max-md:flex-col max-md:items-center">
                <Image
                  className="h-40 w-40"
                  width={500}
                  height={500}
                  src={maisEspertoQueODiabo}
                  alt="book mais Esperto Que O Diabo"
                />
                <p>
                  Por Napoleon Hill, ele faz uma análise mais profunda das
                  lições e princípios. Ele personifica o {'"Diabo"'} como uma
                  metáfora para os obstáculos internos e externos que podem
                  impedir o sucesso pessoal. O livro explora como superar o
                  medo, a procrastinação e outros obstáculos para alcançar a
                  liberdade e o sucesso.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3>Por Que Fazemos o Que Fazemos?</h3>

              <div className="flex gap-2 max-md:flex-col max-md:items-center">
                <Image
                  className="h-40 w-40"
                  width={500}
                  height={500}
                  src={porQueFazemosOQueFazemos}
                  alt="book por Que Fazemos O Que Fazemos"
                />
                <p>
                  Por Mario Sergio Cortella, ele explora questões relacionadas
                  ao trabalho, realização pessoal e busca por significado na
                  vida profissional. Ele aborda temas como motivação, valores,
                  propósito e satisfação no trabalho.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3>Não Leve a Vida Tão a Sério</h3>

              <div className="flex gap-2 max-md:flex-col max-md:items-center">
                <Image
                  className="h-40 w-40"
                  width={500}
                  height={500}
                  src={naoLeveAVidaTaoASerio}
                  alt="book não Leve A Vida Tão A Sério"
                />
                <p>
                  Por Hugh Prather e oferece perspectivas valiosas sobre como
                  levar a vida com mais leveza, humor e desapego. É uma ótima
                  escolha para quem busca equilíbrio, redução de estresse e uma
                  abordagem mais relaxada para a vida. A filosofia de não levar
                  a vida tão a sério pode ser uma maneira eficaz de alcançar
                  maior bem-estar e harmonia.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </motion.div>
  )
}
