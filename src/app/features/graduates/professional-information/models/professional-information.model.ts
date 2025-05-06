export interface ProfessionalInfo {
	id: number;
	company_name: string;
	category: string;
	job_type: string;
	location: string;
	job_title: string;
	job_level: string;
	start_date: Date;
	end_date?: Date;
	salary?: number;
	function?: string;
	relatedAcademicInfo: string;
}

export enum CategoryEnum {
	PRIVATE = 'private',
	PUBLIC = 'public',
	NGO = 'ngo',
}

export enum job_typeEnum {
	FULL_TIME = 'full_time',
	PART_TIME = 'part_time',
	CONTRACT = 'contract',
	FREELANCER = 'freelancer',
}

export enum job_levelEnum {
	JUNIOR = 'junior',
	MID_LEVEL = 'mid_level',
	SENIOR = 'senior',
	SPECIALIST = 'specialist',
}

export enum LocationEnum {
	IN_PERSON = 'in-person',
	REMOTE = 'remote',
	HYBRID = 'hybrid',
}
