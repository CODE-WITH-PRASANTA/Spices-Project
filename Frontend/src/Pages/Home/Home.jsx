import React from 'react'
import HeroSection from '../../Components/HeroSection/HeroSection'
import Products from '../../Components/Products/Products'
import HealthyHerbs from '../../Components/HealthyHerbs/HealthyHerbs'
import Flavour from '../../Components/Flavour/Flavour'
import SelectedProduct from '../../Components/SelectedProduct/SelectedProduct'
import AllProducts from '../../Components/AllProducts/AllProducts'
import Team from '../../Components/Team/Team'
import ViewCollection from '../../Components/ViewCollection/ViewCollection'
import BlogPost from '../../Components/BlogPost/BlogPost'
import PremiumQuality from '../../Components/PremiumQuality/PremiumQuality'
import HomeCard from '../../Components/HomeCard/HomeCard'

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <Products/>
      <HealthyHerbs/>
      <Flavour/>
      <SelectedProduct/>
      <AllProducts/>
      <Team/>
      <ViewCollection/>
      <BlogPost/>
      <PremiumQuality/>
      <HomeCard/>
    </div>
  )
}

export default Home