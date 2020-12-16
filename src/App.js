import React, { useState, useEffect } from 'react'
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi'
import { FaQuoteRight } from 'react-icons/fa'
import data from './data'

function App() {
	let [people, setPeople] = useState(data) // for data
	let [index, setIndex] = useState(0) // for index

	useEffect(() => {
		let lastIndex = people.length - 1
		if (index < 0) {
			// when showing first element
			setIndex(lastIndex)
		}
		if (index > lastIndex) {
			// when showing last element
			setIndex(0)
		}
	}, [index, people]) // only re-render useEffect when 'index' and 'people' are changed

	// for auto change slide
	useEffect(() => {
		let slider = setInterval(() => {
			setIndex(index + 1)
		}, 3000)
		return () => clearInterval(slider) // clean up function clean the problem of auto change slide
	}, [index]) // only re-render useEffect when 'index' is changed

	return (
		<section className='section'>
			<div className='title'>
				<h2>
					<span>/</span>reviews
				</h2>
			</div>
			<div className='section-center'>
				{people.map((person, personIndex) => {
					let { id, image, name, title, quote } = person // object destructing

					let position = 'nextSlide'
					if (personIndex === index) {
						position = 'activeSlide'
					}
					if (
						personIndex === index - 1 ||
						(index === 0 && personIndex === people.length - 1)
					) {
						position = 'lastSlide'
					}

					return (
						<article className={position} key={id}>
							<img
								src={image}
								alt={name}
								className='person-img'
							/>
							<h4>{name}</h4>
							<p className='title'>{title}</p>
							<p className='text'>{quote}</p>
							<FaQuoteRight className='icon' />
						</article>
					)
				})}
				<button className='prev' onClick={() => setIndex(index - 1)}>
					<FiChevronLeft />
				</button>
				<button className='next' onClick={() => setIndex(index + 1)}>
					<FiChevronRight />
				</button>
			</div>
		</section>
	)
}

export default App
