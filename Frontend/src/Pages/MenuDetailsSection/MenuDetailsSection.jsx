import React from 'react'
import MenuDetailsBreadcrumb from '../../Components/MenuDetailsBreadcrumb/MenuDetailsBreadcrumb'
import MenuDetailsOne from '../../Components/MenuDetailsOne/MenuDetailsOne'
import MenuDetailsTwo from '../../Components/MenuDetailsTwo/MenuDetailsTwo'
import MenuDetailsThree from '../../Components/MenuDetailsThree/MenuDetailsThree'

const MenuDetailsSection = () => {
  return (
    <div>
        <MenuDetailsBreadcrumb/>
        <MenuDetailsOne/>
        <MenuDetailsTwo/>
        <MenuDetailsThree/>
    </div>
  )
}

export default MenuDetailsSection