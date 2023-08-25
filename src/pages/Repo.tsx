import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { Repository } from "./Repos";

export const Repo = () => {
	const params = useParams();
	const currentRepository = params['*'] as string;

	const queryClients = useQueryClient();

	const handleChangeRepositoryDescription = async () => {
		const previousRepos = queryClients.getQueryData<Repository[]>('repos');

		if (previousRepos) {
			const nextRepos = previousRepos?.map(repo => {
				if (repo.full_name === currentRepository) {
					return { ...repo, description: "Testando" }
				} else {
					return repo;
				}
			})

			queryClients.setQueryData('repos', nextRepos);
		}
	};

	return (
		<>
			<h1>{currentRepository}</h1>
			<button onClick={handleChangeRepositoryDescription}>Alterar Descrição</button>
		</>
	)
}