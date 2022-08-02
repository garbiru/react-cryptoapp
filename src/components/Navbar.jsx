import { BulbOutlined, FundOutlined, HomeOutlined, MoneyCollectOutlined } from '@ant-design/icons'
import { Avatar, Menu, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

import icon from "../images/cryptocurrency.png"

const Navbar = () => {

    const menuItems = [
        {
            key: 'Home',
            icon: <HomeOutlined />,
            label: <Link to="/">Home</Link>
        },
        {
            key: 'Cryptocurrencies',
            icon: <FundOutlined />,
            label: <Link to="/cryptocurrencies">Cryptocurrencies</Link>
        },
        {
            key: 'Exchanges',
            icon: <MoneyCollectOutlined />,
            label: <Link to="/exchanges">Exchanges</Link>
        },
        {
            key: 'News',
            icon: <BulbOutlined />,
            label: <Link to="/news">News</Link>
        },
    ]

  return (
    <div className="nav-container">
        <div className="logo-container">
            <Avatar src={icon} size="large"/>
            <Typography.Title level={2} className="logo">
                <Link to="/">
                    CryptoAPP
                </Link>
            </Typography.Title>
            {/* <Button className='menu-control-container'>

                </Button> */}
        </div>
        <Menu items={menuItems} theme="dark" />
    </div>
  )
}

export default Navbar