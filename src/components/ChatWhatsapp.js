// src/components/ChatWhatsapp.js

import React, { useState, useEffect } from 'react';

// Linha de conversa em Português
const conversaPT = [
  { id: 1, remetente: 'cliente', texto: 'Olá', delay: 1000 },
  { id: 2, remetente: 'bot', texto: 'Olá Ricardo! Bem-vindo à Mestre dos Pisos. Como posso te ajudar a encontrar o acabamento perfeito hoje?', delay: 2000 },
  { id: 3, remetente: 'cliente', texto: 'tem antiderrapante?', delay: 2500 },
  { id: 4, remetente: 'bot', texto: `Sim, Ricardo! Temos algumas opções antiderrapantes para você.
    
    O *Piso Cerâmico Externo Rústico* possui alto grip e é ideal para piscinas e áreas externas, custando R$ 65,00/m². Outra ótima opção é o *Piso Cerâmico Pedra do Rio*, com grip máximo e explicitamente antiderrapante, perfeito para áreas externas e garagens, por R$ 55,90/m².
    
    Qual ambiente você pretende revestir?`, delay: 1200 },
  { id: 5, remetente: 'cliente', texto: 'a piscina. o que é gripo?', delay: 2500 },
  { id: 6, remetente: 'bot', texto: `Grip é a capacidade de aderência do piso, ou seja, o quanto ele é resistente a escorregões. Um alto grip significa que o piso oferece maior segurança, especialmente em áreas molhadas.
    
    Para a piscina, recomendo o *Piso Cerâmico Externo Rústico*, que possui alto grip e é ideal para áreas externas, custando R$ 65,00/m². O *Piso Cerâmico Pedra do Rio* também é uma excelente escolha, com grip máximo e explicitamente antiderrapante, por R$ 55,90/m².`, delay: 1000 },
  { id: 7, remetente: 'cliente', texto: 'preciso de 80m2', delay: 1200 },
  { id: 8, remetente: 'bot', texto: `Com certeza, Ricardo!
    
    Para 80m² o *Piso Cerâmico Externo Rústico* custaria R$ 5.200,00...`, delay: 1000 },
];

// Linha de conversa em Inglês (Tratado como Estudo de Caso de Varejo para os gringos)
const conversaEN = [
  { id: 1, remetente: 'cliente', texto: 'Hi there', delay: 1000 },
  { id: 2, remetente: 'bot', texto: 'Hello Richard! Welcome to Master Flooring. How can I help you find the perfect finish today?', delay: 2000 },
  { id: 3, remetente: 'cliente', texto: 'Do you have non-slip tiles?', delay: 2500 },
  { id: 4, remetente: 'bot', texto: `Yes, Richard! We have excellent non-slip options for you.
    
    Our *Rustic Outdoor Ceramic* features a high grip rating, ideal for pools and open spaces, at $12.00/sqft. Another great option is the *River Stone Ceramic*, offering maximum grip and engineered explicitly for high-traffic garages, at $10.50/sqft.
    
    Which area are you looking to cover?`, delay: 1200 },
  { id: 5, remetente: 'cliente', texto: 'The pool area. What does grip rating mean?', delay: 2500 },
  { id: 6, remetente: 'bot', texto: `Grip rating determines the tile's slip resistance. A high grip profile ensures maximum traction and safety, especially when wet.
    
    For a pool deck, I highly recommend the *Rustic Outdoor Ceramic* ($12.00/sqft) for its durability, or the *River Stone Ceramic* ($10.50/sqft) for max anti-slip protection.`, delay: 1000 },
  { id: 7, remetente: 'cliente', texto: 'I need 850 sqft', delay: 1200 },
  { id: 8, remetente: 'bot', texto: `Understood, Richard!
    
    For 850 sqft, the *Rustic Outdoor Ceramic* total would come to $10,200.00...`, delay: 1000 },
];

export default function ChatWhatsapp() {
  const [mensagensVisiveis, setMensagensVisiveis] = useState([]);
  const [estaDigitando, setEstaDigitando] = useState(false);
  const [timeline, setTimeline] = useState(conversaPT);
  
  // Textos fixos da interface do celular
  const [uiText, setUiText] = useState({
    typing: 'digitando...',
    status: 'Atendimento automatizado'
  });

  useEffect(() => {
    // Detecta o idioma nativo no cliente (CRA)
    const userLang = navigator.language || navigator.userLanguage;
    const isPt = userLang && userLang.startsWith('pt');
    
    // Define a timeline de mensagens e os textos de UI correspondentes
    if (!isPt) {
      setTimeline(conversaEN);
      setUiText({
        typing: 'typing...',
        status: 'Automated Assistant'
      });
    }
  }, []);

  useEffect(() => {
    let index = 0;
    setMensagensVisiveis([]); // Reseta o chat se a timeline mudar

    function exibirProximaMensagem() {
      if (index >= timeline.length) return; 

      const proximaMsg = timeline[index];

      if (proximaMsg.remetente === 'bot') {
        setEstaDigitando(true);
        
        setTimeout(() => {
          setEstaDigitando(false);
          setMensagensVisiveis((prev) => [...prev, proximaMsg]);
          index++;
          setTimeout(exibirProximaMensagem, timeline[index]?.delay || 1000);
        }, 1500); 
      } else {
        setMensagensVisiveis((prev) => [...prev, proximaMsg]);
        index++;
        setTimeout(exibirProximaMensagem, timeline[index]?.delay || 1000);
      }
    }

    const timerInicial = setTimeout(exibirProximaMensagem, 1000);

    return () => clearTimeout(timerInicial);
  }, [timeline]); // Reinicia o loop se a timeline for definida como EN ou PT

  return (
    <div className="chatWrapper">
      <div className="chatBox">

        <div className="chatHeader">
          <span>anddo.dev</span>
          {estaDigitando ? (
            <small style={{ color: '#b2f9d7', fontStyle: 'italic' }}>{uiText.typing}</small>
          ) : (
            <small>{uiText.status}</small>
          )}
        </div>

        <div className="whatsapp-container">
          <div className="chat-messages">
            {mensagensVisiveis.map((msg) => (
              <div key={msg.id} className={`message-balloon ${msg.remetente}`}>
                <p style={{ whiteSpace: 'pre-line' }}>{msg.texto}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
