import { Avatar, Card, Col, Row, Select, Typography } from "antd";
import moment from "moment";
import React, { useState } from "react";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosCoinsQuery } from "../services/cryptoApi";

const demoImage =
	"https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
	const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
	const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
		newsCategory,
		count: simplified ? 6 : 12,
	});
	const { data } = useGetCryptosCoinsQuery(100);

	if (!cryptoNews?.value) return "Loading...";

	console.log(cryptoNews);

	return (
		<Row gutter={[24, 24]}>

			{!simplified && (
				<Col span={24}>
					<Select
						showSearch
						className="select-news"
						placeholder="Select a news category"
						optionFilterProp="children"
						onChange={(e) => setNewsCategory(e)}
						filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
					>
						<Option value="Cryptocurrency">Cryptocurrency</Option>
						{
							data?.data?.coins.map((coin) => (
								<Option value={coin.name}>{coin.name}</Option>
							))
						}	
					</Select>
				</Col>
			)}

			{cryptoNews.value.map((news, i) => (
				<Col xs={24} sm={12} lg={8} key={i}>
					<Card hoverable className="news-card">
						<a href={news.url} target="_blank" rel="noreferrer">
							<div className="news-image-container">
								<Title className="news-title" level={4}>
									{news.name}
								</Title>
								<img
									alt="news"
									style={{
										maxWidth: "200px",
										maxHeight: "100px",
									}}
									src={
										news?.image?.thumbnail?.contentUrl ||
										demoImage
									}
								/>
							</div>
							<p>
								{news.description > 100
									? `${news.description.substring(0, 100)}...`
									: news.description}
							</p>
							<div className="provider-container">
								<div>
									<Avatar
										src={
											news.provider[0]?.image?.thumbnail
												?.contentUrl || demoImage
										}
										alt=""
									/>
									<Text className="provider-name">
										{news.provider[0]?.name}
									</Text>
								</div>
								<Text>
									{moment(news.datePublished)
										.startOf("ss")
										.fromNow()}
								</Text>
							</div>
						</a>
					</Card>
				</Col>
			))}
		</Row>
	);
};

export default News;
