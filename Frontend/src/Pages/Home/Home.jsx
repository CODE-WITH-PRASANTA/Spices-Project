import React from 'react'
import HeroSection from '../../Components/HeroSection/HeroSection'
import Products from '../../Components/Products/Products'
import HealthyHerbs from '../../Components/HealthyHerbs/HealthyHerbs'
import Flavour from '../../Components/Flavour/Flavour'

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <Products/>
      <HealthyHerbs/>
      <Flavour/>
    </div>
  )
}

export default Home