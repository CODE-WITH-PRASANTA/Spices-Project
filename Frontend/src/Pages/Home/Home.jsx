import React from 'react'
import Homehero from '../../Components/Homehero/Homehero'
import HomeOrder from '../../Components/HomeOrder/HomeOrder'
import TotalOrder from '../../Components/TotalOrder/TotalOrder'
import ChifeHome from '../../Components/ChifeHome/ChifeHome'
import Menu from '../../Components/Menu/Menu'

const Home = () => {
  return (
    <div>
      <Homehero/>
      <HomeOrder/>
      <TotalOrder/>
      <ChifeHome/>
      <Menu/>
    </div>
  )
}

export default Home