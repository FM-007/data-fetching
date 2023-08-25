import { useQuery } from 'react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

export type Repository = {
	full_name: string;
	description: string;
}

const Repos = () => {
	const { data, isFetching } = useQuery<Repository[]>('repos', async () => {
		const response = await axios.get('https://api.github.com/users/FM-007/repos');

		return response.data;
	},
	{
		staleTime: 1000 * 60
	}
	)

	return (
		<>
			<ul>
				{isFetching && <p>Carregando...</p>}
				{data?.map(repo => (
					<li key={repo.full_name}>
						<Link to={`repos/${repo.full_name}`}>
							{ repo.full_name }
						</Link>
						<p>{repo.description}</p>
						<br />
					</li>
				))}
			</ul>
		</>
	)
}

export default Repos;
