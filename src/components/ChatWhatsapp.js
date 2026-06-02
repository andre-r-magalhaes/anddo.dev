// src/components/ChatWhatsapp.js

import React, { useState, useEffect } from 'react';

const conversaTimeline = [
  { id: 1, remetente: 'cliente', texto: 'Olá', delay: 1000 },
  { id: 2, remetente: 'bot', texto: 'Olá Ricardo! Bem-vindo à Mestre dos Pisos. Como posso te ajudar a encontrar o acabamento perfeito hoje?', delay: 2000 },
  { id: 4, remetente: 'cliente', texto: 'tem antiderrapante?', delay: 2500 },
  { id: 5, remetente: 'bot', texto: `Sim, Ricardo! Temos algumas opções antiderrapantes para você.
    
    O *Piso Cerâmico Externo Rústico* possui alto grip e é ideal para piscinas e áreas externas, custando R$ 65,00/m². Outra ótima opção é o *Piso Cerâmico Pedra do Rio*, com grip máximo e explicitamente antiderrapante, perfeito para áreas externas e garagens, por R$ 55,90/m².
    
    Qual ambiente você pretende revestir?`, delay: 1200 },
  { id: 4, remetente: 'cliente', texto: 'a piscina. o que é gripo?', delay: 2500 },
  { id: 6, remetente: 'bot', texto: `Grip é a capacidade de aderência do piso, ou seja, o quanto ele é resistente a escorregões. Um alto grip significa que o piso oferece maior segurança, especialmente em áreas molhadas.
    
    Para a piscina, recomendo o *Piso Cerâmico Externo Rústico, que possui alto grip e é ideal para áreas externas, custando R$ 65,00/m². O **Piso Cerâmico Pedra do Rio* também é uma excelente escolha, com grip máximo e explicitamente antiderrapante, por R$ 59,90/m².`, delay: 1000 },
  { id: 4, remetente: 'cliente', texto: 'preciso de 80m2', delay: 1200 },
  { id: 6, remetente: 'bot', texto: `Com certeza, Ricardo!
    
    Para 80m² o *Piso Cerâmico Externo Rústico* custaria R$ 5.200,00...`, delay: 1000 },
];

function decidirResposta(msg) {
  msg = msg.toLowerCase()

  if (msg.includes("oi") || msg.includes("olá"))
    return "Olá! Eu sou o bot da anddo.dev. Como posso ajudar?"

  if (msg.includes("cardapio"))
    return "🍕 Calabresa R$39  Mussarela R$35  Portuguesa R$42"

  if (msg.includes("horario"))
    return "Funcionamos das 18h às 23h"

  return "Ainda estou aprendendo. Pergunte pelo cardápio ou horário."
}

export default function ChatWhatsapp() {
  const [mensagensVisiveis, setMensagensVisiveis] = useState([]);
  const [estaDigitando, setEstaDigitando] = useState(false);
  //const [input, setInput] = useState("")

  /*function enviar() {
    if (!input.trim()) return

    const userMsg = { autor: "user", texto: input }
    const botMsg = { autor: "bot", texto: decidirResposta(input) }

    setMensagens([...mensagens, userMsg, botMsg])
    setInput("")
  }*/

  useEffect(() => {
    let index = 0;

    function exibirProximaMensagem() {
      if (index >= conversaTimeline.length) return; // Fim da conversa

      const proximaMsg = conversaTimeline[index];

      // Se quem vai falar é o BOT, ativa o efeito visual de "digitando..." antes de exibir
      if (proximaMsg.remetente === 'bot') {
        setEstaDigitando(true);
        
        setTimeout(() => {
          setEstaDigitando(false);
          setMensagensVisiveis((prev) => [...prev, proximaMsg]);
          index++;
          // Espera o delay da PROXIMA mensagem para continuar o loop
          setTimeout(exibirProximaMensagem, conversaTimeline[index]?.delay || 1000);
        }, 1500); // Fica exibindo "digitando..." por 1.5 segundos
      } else {
        // Se for o cliente, aparece instantaneamente
        setMensagensVisiveis((prev) => [...prev, proximaMsg]);
        index++;
        setTimeout(exibirProximaMensagem, conversaTimeline[index]?.delay || 1000);
      }
    }

    // Inicia o gatilho da primeira mensagem após 1 segundo que a página abriu
    const timerInicial = setTimeout(exibirProximaMensagem, 1000);

    return () => clearTimeout(timerInicial);
  }, []);

  return (
    <div className="chatWrapper">
      <div className="chatBox">

        <div className="chatHeader">
          <span>anddo.dev</span>
          {estaDigitando ? (
            <small style={{ color: '#b2f9d7', fontStyle: 'italic' }}>digitando...</small>
          ) : (
            <small>Atendimento automatizado</small>
          )}
        </div>

        {/* <div className="chatBody">
          {mensagens.map((m, i) => (
            <div key={i} className={m.autor === "user" ? "msg user" : "msg bot"}>
              {m.texto}
            </div>
          ))}
        </div> */}

        <div className="whatsapp-container">
        {/* Render das mensagens que já entraram no estado */}
        <div className="chat-messages">
          {mensagensVisiveis.map((msg) => (
            <div key={msg.id} className={`message-balloon ${msg.remetente}`}>
              <p>{msg.texto}</p>
            </div>
          ))}
          
          
        </div>
      </div>

      </div>
    </div>
  )
}