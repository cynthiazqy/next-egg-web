/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import { Button, Tooltip, Carousel, Card, Image, Upload } from 'antd'
import { UploadOutlined, StarFilled } from '@ant-design/icons'
import ReactMarkdown from 'react-markdown'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios'
import UploadAndDisplay from './component/UploadAndDisplay'
import CustomForm from './component/CustomForm'
import styles from './index.module.scss'
import {
	thousandFormat1,
	thousandFormat2,
	switchLetterCase1,
	switchLetterCase2,
} from 'utils/algorithm'
import { log } from 'console'
interface CardItem {
	id: number
	cardLabel: string
	cardVal: string
}

interface PageInfoProps {
	id?: number
	title: string
	score: string
	viewsNum: string
	para: string
	subPara1: string
	subPara2: string
}

let _recommendList: any[] = [
	{
		recommendLocation: 3,
		title: '场景演练1',
		id: 1400004,
		startDate: 1694033700000,
		endDate: 1694465700000,
	},
	{
		recommendLocation: 5,
		title: '场景演练2',
		id: 1700004,
		startDate: 1694033700000,
		endDate: 1694465700000,
	},
]

const FlexHome = () => {
	const [pageInfo, setPageInfo] = useState<PageInfoProps>({
		title: '',
		score: '',
		viewsNum: '',
		para: '',
		subPara1: '',
		subPara2: '',
	})
	const [visible, setVisible] = useState<boolean>(false)
	const [recommendList, setRecommendList] = useState<any[]>(_recommendList)

	useEffect(() => {
		getPageInfo()
	}, [])

	useEffect(() => {
		// test algorithm
		// console.time()
		// const hh1 = thousandFormat1(12789765)
		// console.info(hh1)
		// console.timeEnd()

		// console.time()
		// const hh2 = thousandFormat2(12789765)
		// console.info(hh2)
		// console.timeEnd()

		console.time()
		const xx1 = switchLetterCase1('123abCD79e')
		console.info(xx1)
		console.timeEnd()

		console.time()
		const xx2 = switchLetterCase2('123abCD79e')
		console.info(xx2)
		console.timeEnd()
	}, [])

	const getPageInfo = async () => {
		const { data, status } = await axios.get('/api/getPageInfo')
		if (status === 200) {
			setPageInfo(data)
		}
	}

	const carouselList: string[] = [
		'/flexHome/nico.jpg',
		'/flexHome/messie03.jpeg',
		'/flexHome/neymar01.jpeg',
	]
	const cardContensList: CardItem[] = [
		{
			id: 1,
			cardLabel: 'Coach',
			cardVal: 'Alberto Nunez',
		},
		{
			id: 2,
			cardLabel: 'Level',
			cardVal: 'Beginner, Novice, Intermediate',
		},
		{
			id: 3,
			cardLabel: 'Equipment',
			cardVal: 'Full Gym',
		},
		{
			id: 4,
			cardLabel: 'Time Per Workout',
			cardVal: '60 minutes',
		},
		{
			id: 5,
			cardLabel: 'Days Per Week',
			cardVal: '4 days',
		},
		{
			id: 6,
			cardLabel: 'Program Length',
			cardVal: '15 weeks',
		},
	]

	const onShowForm = () => {
		setVisible(true)
	}

	const { title, score, viewsNum, para, subPara1, subPara2 } = pageInfo ?? {}
	const customFormProps = {
		visible,
		setVisible,
		recommendList,
		setRecommendList,
	}

	return (
		<div className={styles.flexHome}>
			<div className={styles.banner}>
				<div className={styles.image}>
					<img src="/flexHome/messie01.jpeg" alt="" />
				</div>
			</div>
			<div className={styles.title}>
				<div className={styles.leftTitle}>
					<span>{title || '--'}</span>
					<Tooltip placement="right" title={<span>Link copied!</span>}>
						<UploadOutlined style={{ fontSize: '16px', color: 'purple' }} />
					</Tooltip>
				</div>
				<div className={styles.rightTitle}>
					<StarFilled style={{ color: 'orange' }} />
					<span>
						{score || 0}({viewsNum || 0}&nbsp;reviews)
					</span>
				</div>
			</div>
			<div className={styles.para}>{para || '--'}</div>
			<div className={styles.box}>
				<div className={styles.leftBox}>
					<div className={styles.subTitle}>Program Description</div>
					<div className={styles.subPara}>{subPara1 || '--'}</div>
					<div className={styles.subPara}>{subPara2 || '--'}</div>
					<Carousel dotPosition="right" autoplay={true}>
						{carouselList.map((item: string) => (
							<Image
								src={item}
								key={item}
								width={'100%'}
								height={400}
								preview={false}
								style={{
									objectFit: 'cover',
									objectPosition: 'center center',
									overflow: 'hidden',
									border: 'none',
									boxSizing: 'border-box',
								}}
							/>
						))}
					</Carousel>
				</div>
				<div className={styles.rightBox}>
					<Card bordered={false}>
						<p>Program Overview</p>
						{cardContensList.map((item: CardItem) => (
							<p key={item.id}>
								<span>{item.cardLabel}</span>
								<span>{item.cardVal}</span>
							</p>
						))}
					</Card>
					<Card bordered={false}>
						<div>Start the program</div>
						<div>On Bootstcamp for free</div>
						<div>
							<img src="/flexHome/neymar.jpeg" />
						</div>
						<div>
							<Button type="primary">App Store</Button>
							<Button type="primary" onClick={onShowForm}>
								show Form
							</Button>
						</div>
					</Card>
				</div>
			</div>
			{/* Markdown */}
			{/* <ReactMarkdown>hhhhh</ReactMarkdown> */}
			{/* React-quill 富文本编辑框 */}
			<UploadAndDisplay />
			<CustomForm {...customFormProps} />
		</div>
	)
}

export default FlexHome
