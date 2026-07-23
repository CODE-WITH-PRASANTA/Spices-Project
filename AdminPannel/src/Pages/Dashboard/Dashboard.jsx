import React from 'react'
import TopDeals from '../../Components/TopDeals/TopDeals'
import SalesOverview from '../../Components/SalesOverview/SalesOverview'
import InventorySummury from '../../Components/InventorySummury/InventorySummury'

const Dashboard = () => {
  return (
    <div>

      <TopDeals/>
      <SalesOverview/>
      <InventorySummury/>
    </div>
  )
}

export default Dashboard