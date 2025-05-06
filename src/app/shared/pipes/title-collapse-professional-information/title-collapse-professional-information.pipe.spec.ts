import { ProfessionalInfo } from '@features/graduates/professional-information/models/professional-information.model';
import { TitleCollapseProfessionalInformationPipe } from '@shared/pipes/title-collapse-professional-information/title-collapse-professional-information.pipe';

describe('TitleCollapseProfessionalInformationPipe', () => {
	let pipe: TitleCollapseProfessionalInformationPipe;

	beforeEach(() => {
		pipe = new TitleCollapseProfessionalInformationPipe();
	});

	it('returns concatenated company name and job title', () => {
		const professionalInfo: Partial<ProfessionalInfo> = { company_name: 'Tech Corp', job_title: 'Developer' };
		expect(pipe.transform(professionalInfo)).toBe('Tech Corp - Developer');
	});

	it('returns only company name if job title is empty', () => {
		const professionalInfo: Partial<ProfessionalInfo> = { company_name: 'Tech Corp', job_title: '' };
		expect(pipe.transform(professionalInfo)).toBe('Tech Corp - ');
	});

	it('returns only job title if company name is empty', () => {
		const professionalInfo: Partial<ProfessionalInfo> = { company_name: '', job_title: 'Developer' };
		expect(pipe.transform(professionalInfo)).toBe(' - Developer');
	});

	it('returns empty string if both company name and job title are empty', () => {
		const professionalInfo: Partial<ProfessionalInfo> = { company_name: '', job_title: '' };
		expect(pipe.transform(professionalInfo)).toBe(' - ');
	});

	it('handles null values gracefully', () => {
		const professionalInfo: Partial<ProfessionalInfo> = { company_name: null, job_title: null };
		expect(pipe.transform(professionalInfo)).toBe('null - null');
	});
});
