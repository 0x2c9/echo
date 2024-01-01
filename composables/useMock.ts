import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import type { INote } from '~/types'

dayjs.extend(advancedFormat)

export function useMock() {
	const supabaseClient = useSupabase()
	const authStore = useAuth()

	const htmlShort = `
		<h1>This is a Heading 1</h1> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec nisl ac tortor euismod dignissim. Vivamus porta dolor nec nunc commodo, a commodo nulla varius. Proin consectetur auctor libero, id ultrices justo.</p>
	
	<h2>This is a Heading 2</h2>
	<p>Phasellus auctor arcu nec tellus ullamcorper, ut rhoncus nunc venenatis. <strong>Pellentesque auctor sagittis magna, ac lacinia ligula cursus in.</strong> Fusce ullamcorper vel orci non tempor.</p>
	
	<h3>This is a Heading 3</h3>
	
	<ul>
			<li>Item 1</li>
			<li>Item 2</li>
			<li>Item 3</li>
	</ul>
	
	<ol>
			<li>Ordered Item 1</li>
			<li>Ordered Item 2</li>
			<li>Ordered Item 3</li>
	</ol>
	
	<p>Nullam eget nisi purus. Cras malesuada sollicitudin tortor, vel tristique nisl bibendum sit amet. Vestibulum eleifend dolor ac quam mattis, eu iaculis dolor rhoncus.</p>
	`.replace(/\n|\t/g, '')

	const htmlLong = `
	<h1>Welcome to Our Blog</h1>
	<p>Explore the world of technology, science, and innovation through our engaging articles and stories. Our mission is to keep you informed and entertained with the latest insights and discoveries.</p>

	<h2>Featured Articles</h2>
	<ul>
			<li>
					<h3>The Future of Artificial Intelligence</h3>
					<p>Artificial Intelligence (AI) continues to reshape industries and our daily lives. In this article, we delve into the exciting advancements and potential ethical considerations of AI.</p>
			</li>
			<li>
					<h3>Exploring Space: The Mars Mission</h3>
					<p>Humanity's dream of exploring Mars is becoming a reality. Learn about the challenges, technologies, and scientific discoveries behind the Mars mission.</p>
			</li>
	</ul>

	<h2>Science and Innovation</h2>
	<p>Science and innovation are at the heart of progress. From groundbreaking medical discoveries to the latest developments in renewable energy, we cover it all. Stay updated with our articles on the forefront of innovation.</p>

	<h3>The Power of Renewable Energy</h3>
	<p>Renewable energy sources like solar and wind power are revolutionizing the way we generate electricity. Discover how these technologies are reducing carbon emissions and shaping a sustainable future.</p>

	<h2>Tech Trends</h2>
	<p>Stay ahead of the curve with insights into the latest tech trends and gadgets. Our tech experts explore everything from the newest smartphones to cutting-edge cybersecurity.</p>

	<h3>The Rise of 5G Technology</h3>
	<p>5G technology promises faster internet speeds and transformative possibilities. Find out how this next-generation wireless network is changing the way we connect and communicate.</p>

	<h2>Environmental Conservation</h2>
	<p>Preserving our planet is a shared responsibility. Learn about conservation efforts, environmental challenges, and how individuals and organizations are working to protect our natural world.</p>

	<h3>Protecting Endangered Species</h3>
	<p>Discover the vital work being done to protect endangered species from extinction. Explore conservation initiatives and success stories from around the globe.</p>
	`.replace(/\n|\t/g, '')

	console.log(htmlShort)
	console.log(htmlLong)

	const amountOfNotes = 8
	function fillSimpleNotes() {
		const notes: INote[] = []
		for (let i = 0; i < amountOfNotes; i++) {
			const title = faker.lorem.words({ min: 1, max: 3 })
			const link = title.replace(/\s/g, '-').toLowerCase()
			notes.push({
				id: faker.string.uuid(),
				title,
				link,
				content: htmlLong,
				user_id: authStore.userId as string,
			})
		}
		return notes
	}

	function fillDailyNotes() {
		const notes: INote[] = []
		for (let i = 0; i < amountOfNotes; i++) {
			const date = dayjs().subtract(i - 4, 'day')
			const link = date.format('YYYY-MM-DD')
			const title = date.format('ddd, Do MMMM, YYYY')
			notes.push({
				id: faker.string.uuid(),
				title,
				date: link,
				link,
				content: htmlShort,
				user_id: authStore.userId as string,
			})
		}

		return notes
	}

	const simpleNotes = fillSimpleNotes()
	const dailyNotes = fillDailyNotes()
	// console.log(simpleNotes)
	// console.log(dailyNotes)
	async function insertMock() {
		await supabaseClient.from('notes').insert([...simpleNotes, ...dailyNotes]).then(() => {
			console.log('Simple notes inserted')
		})
	}

	return {
		insertMock,
	}
}
