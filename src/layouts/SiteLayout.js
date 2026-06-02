// src/layouts/SiteLayout.js

import React from "react"


export default function SiteLayout({ children }) {
  return (
    <div className="siteContainer">
      <header className="siteHeader">
        
      </header>

      <main>
        {children}
      </main>
    </div>
  )
}