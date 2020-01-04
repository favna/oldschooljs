import { News } from '../src';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const newsJsonPath = join(__dirname, '..', 'src', 'data', 'news', 'news_archive.json');
const currentNews = JSON.parse(readFileSync(newsJsonPath).toString());

export default async function prepareNews(): Promise<void> {
	const newArticles = await News.fetchNewArticles();
	console.log(`Found ${newArticles ? newArticles.length : 0} news articles to be added.`);
	if (newArticles) {
		writeFileSync(
			newsJsonPath,
			JSON.stringify(
				[...currentNews, ...newArticles.sort((a, b) => a.date - b.date)],
				null,
				4
			)
		);
	}
	console.log('Prepared news.');
}
