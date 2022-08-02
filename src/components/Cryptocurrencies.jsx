import { Card, Col, Input, Row } from "antd";
import millify from "millify";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useGetCryptosCoinsQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({ simplified }) => {
	const count = simplified ? 10 : 100;
	const { data: cryptosList, isFetching } = useGetCryptosCoinsQuery(count);
	const [cryptos, setCryptos] = useState();
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const filteredData = cryptosList?.data?.coins.filter((coin) =>
			coin.name.toLowerCase().includes(searchTerm.toLowerCase())
		);

		setCryptos(filteredData);
	}, [cryptosList, searchTerm]);

	if (isFetching) return "Loading...";

	return (
		<>
			{!simplified && (
				<div className="search-crypto">
					<Input
						placeholder="Search Cryptocurrency"
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			)}

			<Row gutter={[32, 32]} className="crypto-card-container">
				{cryptos?.map((currency) => (
					<Col
						xs={24}
						sm={12}
						lg={6}
						className="crypto-card"
						key={currency.uuid}
					>
						<Link to={`/crypto/${currency.id}`}>
							<Card
								title={`${currency.rank}. ${currency.name}`}
								extra={
									<img
										alt="coin"
										className="crypto-image"
										src={currency.iconUrl}
									/>
								}
								hoverable
							>
								<p>Price: {millify(currency.price)}</p>
								<p>Marketcap: {millify(currency.marketCap)}</p>
								<p>Daily Change: {currency.change}%</p>
							</Card>
						</Link>
					</Col>
				))}
			</Row>
		</>
	);
};

export default Cryptocurrencies;