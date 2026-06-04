// src/pages/Home.js

import React from "react"
import SiteLayout from "../layouts/SiteLayout"
import ChatWhatsapp from "../components/ChatWhatsapp"

export default function Home() {
  return (
    <SiteLayout>

      <section className="hero">
        <h1>anddo.dev // Engenharia de IA & Automação</h1>
        <p>
          Desenvolvimento de agentes inteligentes assíncronos e integrados nativamente à Cloud. Implementamos fluxos de atendimento via WhatsApp (WABA Oficial) utilizando abordagens stateless de alta performance, RAG para recuperação de contexto e Tool Calling para integração com sistemas legados, estoques e CRMs.
        </p>

        <div className="hero-links">
          <a className="cta" href="mailto:contato@anddo.dev">Fale conosco</a>
        </div>
      </section>

      <section className="info-grid">
        <article>
          <h2>Arquitetura Cloud-Native</h2>
          <p>Soluções Serverless, garantindo custo computacional sob demanda e escalabilidade linear. Persistência de contexto ultraveloz em e orquestração inteligente de tokens para viabilidade financeira do projeto.</p>
        </article>
        <article>
          <h2>Contato</h2>
          <p>Email: contato@anddo.dev</p>
          <p>Localização: São Paulo, SP</p>
        </article>
      </section>

      <section className="demo">
        <h2>Caso de Uso: Exemplo de Atendimento Inteligente de Varejo (Pisos e Revestimentos)</h2>
        
        {/* O simulador do celular */}
        <ChatWhatsapp />

        {/* O vídeo centralizado abaixo */}
        <div className="video-container">
          <video 
            src="/mdpx2_comp.mp4" 
            controls 
            width="100%" 
            preload="metadata"
          >
            Seu navegador não suporta o elemento de vídeo.
          </video>
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '0px 0 20px 0', color: '#475569', fontSize: '14px' }}>
        <p>&copy; {new Date().getFullYear()} anddo.dev. Todos os direitos reservados.</p>
      </footer>

    </SiteLayout>
  )
}