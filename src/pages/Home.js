// src/pages/Home.js

import React, { useState, useEffect } from "react"
import SiteLayout from "../layouts/SiteLayout"
import ChatWhatsapp from "../components/ChatWhatsapp"
import { homeContent } from "../locales/homeContent"

export default function Home() {

  const [lang, setLang] = useState("pt")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userLang = navigator.language || navigator.userLanguage
      if (userLang && !userLang.startsWith("pt")) {
        setLang("en")
      }
    }
  }, [])

  const content = homeContent[lang]

  return (
    <SiteLayout>

      <section className="hero">
        <h1>{content.title}</h1>
        <p>
          {content.hero}
        </p>

        <div className="hero-links">
          <a className="cta" href="mailto:contato@anddo.dev">{content.cta}</a>
        </div>
      </section>

      <section className="info-grid">
        <article>
          <h2>{content.card1Title}</h2>
          <p>{content.card1Text}</p>
        </article>
        <article>
          <h2>Contato</h2>
          <p>Email: contato@anddo.dev</p>
          <p>{content.card2Loc}</p>
        </article>
      </section>

      <section className="demo">
        <h2>{content.demoTitle}</h2>
        
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
            {content.videoError}
          </video>
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '0px 0 20px 0', color: '#475569', fontSize: '14px' }}>
        <p>&copy; {new Date().getFullYear()} anddo.dev. {content.rights}</p>
      </footer>

    </SiteLayout>
  )
}