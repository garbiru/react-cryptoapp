import { BulbOutlined, FundOutlined, HomeOutlined, MenuOutlined, MoneyCollectOutlined } from "@ant-design/icons";
import { Avatar, Menu, Typography, Button } from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import icon from "../images/cryptocurrency.png";

const Navbar = () => {
	const [activeMenu, setActiveMenu] = useState(true);
	const [screenSize, setScreenSize] = useState(null);

	useEffect(() => {
		const handleResize = () => setScreenSize(window.innerWidth);

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (screenSize < 768) {
			setActiveMenu(false);
			console.log("yererrr");
		} else setActiveMenu(true);
	}, [screenSize]);

	const menuItems = [
		{
			key: "Home",
			icon: <HomeOutlined />,
			label: <Link to="/">Home</Link>,
		},
		{
			key: "Cryptocurrencies",
			icon: <FundOutlined />,
			label: <Link to="/cryptocurrencies">Cryptocurrencies</Link>,
		},
		{
			key: "Exchanges",
			icon: <MoneyCollectOutlined />,
			label: <Link to="/exchanges">Exchanges</Link>,
		},
		{
			key: "News",
			icon: <BulbOutlined />,
			label: <Link to="/news">News</Link>,
		},
	];

	return (
		<div className="nav-container">
			<div className="logo-container">
				<Avatar src={icon} size="large" />
				<Typography.Title level={2} className="logo">
					<Link to="/">CryptoAPP</Link>
				</Typography.Title>
				<Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}>
					<MenuOutlined />
				</Button>
			</div>

			{activeMenu && <Menu items={menuItems} theme="dark" />}
		</div>
	);
};

export default Navbar;
