import { Polls } from '../src';
import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

const pollsJsonPath = join(__dirname, '..', 'src', 'data', 'polls', 'poll_archive.json');
const currentPolls = JSON.parse(readFileSync(pollsJsonPath).toString());

export default async function preparePolls(): Promise<void> {
	const newPolls = await Polls.fetchNew();
	console.log(`Found ${newPolls.length} new polls to add.`);
	if (newPolls.length > 0) {
		writeFileSync(
			pollsJsonPath,
			JSON.stringify(
				[...currentPolls, ...newPolls].sort((a, b) => a.datePosted - b.datePosted),
				null,
				4
			)
		);
	}
	console.log('Prepared polls.');
}
