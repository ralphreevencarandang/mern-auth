import React from 'react'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
const HomePage = () => {
  return (
    <div className="flex-center min-h-screen bg-[url('/bg_img.png')] bg-cover bg-center">
        <Navbar />
        <Header/>
    </div>
  )
}

export default HomePage
