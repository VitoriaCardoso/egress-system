import { Pagination } from '@shared/models/pagination.model';
import {
	Announcement,
	Announcements,
	TypeRecipientsEnum,
} from '@app/features/coordinator/announcements/models/announcements.model';

export const ANNOUNCEMENTS_MOCK: Announcements = [
	{
		id: 1,
		title: 'Encontro Virtual: Troca de Experiências entre Alunos, Professores e Egressos',
		creationDate: '2024-04-25',
		content: `
			<h3>Participe do Encontro Virtual</h3>
			<p>Um encontro virtual para compartilhar experiências e promover o networking entre diferentes públicos.</p>
			<p><a href="https://example.com/event1">Clique aqui</a> para mais informações.</p>
		`,
		typeRecipients: TypeRecipientsEnum.ALL,
	},
	{
		id: 2,
		title: 'Webinar: Desafios e Oportunidades na Carreira Após a Graduação',
		creationDate: '2024-03-16',
		content: `
			<h3>Não Perca Nosso Webinar</h3>
			<p>Neste webinar, discutiremos os desafios e as oportunidades no mercado de trabalho para recém-formados.</p>
			<p><a href="https://example.com/webinar">Acesse o link do webinar aqui</a>.</p>
		`,
		typeRecipients: TypeRecipientsEnum.SPECIFIC,
		courses: ['Ciência da Computação', 'Sistemas de Informação'],
		course_levels: ['Graduação', 'Mestrado'],
	},
	{
		id: 3,
		title: 'Convite para Palestra com Egresso de Destaque: Lições Aprendidas no Mercado de Trabalho',
		creationDate: '2024-03-19',
		content: `
			<h3>Palestra com Egresso de Sucesso</h3>
			<p>Um egresso bem-sucedido compartilhará suas experiências e lições aprendidas no mercado de trabalho.</p>
			<p><a href="https://example.com/palestra">Saiba mais sobre o palestrante aqui</a>.</p>
		`,
		typeRecipients: TypeRecipientsEnum.SPECIFIC,
		courses: ['Administração', 'Ciências Contábeis', 'Direito'],
		course_levels: ['Graduação', 'Especialização'],
	},
	{
		id: 4,
		title: 'Atualizações Acadêmicas e Eventos para Toda a Comunidade Universitária',
		creationDate: '2024-02-17',
		content: `
			<h3>Fique por Dentro das Atualizações Acadêmicas</h3>
			<p>Notícias e eventos acadêmicos relevantes para toda a comunidade universitária.</p>
			<p><a href="https://example.com/atualizacoes">Veja a programação completa aqui</a>.</p>
		`,
		typeRecipients: TypeRecipientsEnum.ALL,
	},
	{
		id: 5,
		title: 'Lançamento do Programa de Networking: Conectando Alunos, Professores e Egressos',
		creationDate: '2024-02-24',
		content: `
			<h3>Novas Oportunidades de Networking</h3>
			<p>Um novo programa de networking para facilitar a conexão entre alunos, professores e egressos.</p>
			<p><a href="https://example.com/networking">Inscreva-se no programa de networking aqui</a>.</p>
		`,
		typeRecipients: TypeRecipientsEnum.SPECIFIC,
		courses: ['Educação Física', 'Fisioterapia', 'Medicina Veterinária'],
		course_levels: ['Graduação', 'Doutorado'],
	},
	{
		id: 6,
		title: 'Encontro Virtual: Troca de Experiências entre Alunos, Professores e Egressos',
		creationDate: '2024-04-25',
		content: `
			<h3>Participe do Encontro Virtual</h3>
			<p>Um encontro virtual para compartilhar experiências e promover o networking entre diferentes públicos.</p>
			<p><a href="https://example.com/event1">Clique aqui</a> para mais informações.</p>
		`,
		typeRecipients: TypeRecipientsEnum.ALL,
	},
	{
		id: 7,
		title: 'Conferência Anual de Egressos: Construindo Pontes para o Futuro',
		creationDate: '2023-12-12',
		content: `
			<h3>Conferência Anual de Egressos</h3>
			<p>Participe da nossa conferência anual e conecte-se com egressos que estão moldando o futuro de suas áreas.</p>
			<p><a href="https://example.com/conferencia">Saiba mais e inscreva-se aqui</a>.</p>
		`,
		typeRecipients: TypeRecipientsEnum.ALL,
	},
	{
		id: 8,
		title: 'Seminário sobre Saúde e Bem-Estar: Profissionais Compartilham suas Experiências',
		creationDate: '2023-11-20',
		content: `
			<h3>Seminário sobre Saúde e Bem-Estar</h3>
			<p>Especialistas da área de saúde discutirão as melhores práticas para um bem-estar sustentável.</p>
			<p><a href="https://example.com/seminario">Mais detalhes do seminário aqui</a>.</p>
		`,
		typeRecipients: TypeRecipientsEnum.SPECIFIC,
		courses: ['Biomedicina', 'Enfermagem', 'Fisioterapia'],
		course_levels: ['Graduação', 'Especialização', 'MBA'],
	},
	{
		id: 9,
		title: 'Hackathon Universitário: Soluções Inovadoras para Problemas Reais',
		creationDate: '2023-10-15',
		content: `
			<h3>Participe do Hackathon Universitário</h3>
			<p>Desafie-se no nosso hackathon e desenvolva soluções inovadoras para problemas reais.</p>
			<p><a href="https://example.com/hackathon">Veja as regras e inscrições aqui</a>.</p>
		`,
		typeRecipients: TypeRecipientsEnum.SPECIFIC,
		courses: ['Ciência da Computação', 'Sistemas de Informação'],
		course_levels: ['Graduação', 'Bacharelado'],
	},
	{
		id: 10,
		title: 'Mesa Redonda: O Impacto das Novas Tecnologias no Direito',
		creationDate: '2023-09-09',
		content: `
			<h3>Mesa Redonda sobre Tecnologia no Direito</h3>
			<p>Discussão com especialistas sobre como as novas tecnologias estão transformando o setor jurídico.</p>
			<p><a href="https://example.com/mesaredonda">Participe e saiba mais aqui</a>.</p>
		`,
		typeRecipients: TypeRecipientsEnum.SPECIFIC,
		courses: ['Direito'],
		course_levels: ['Graduação', 'Especialização'],
	},
];

export const PAGINATION_ANNOUNCEMENTS_MOCK: Pagination<Announcement> = {
	data: ANNOUNCEMENTS_MOCK,
	length: ANNOUNCEMENTS_MOCK.length,
	page: 1,
	pageSize: 5,
};
