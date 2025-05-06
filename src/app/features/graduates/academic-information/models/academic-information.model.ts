export interface AcademicInformation {
	id: string;
	institution_name: string;
	institution_type: string; //institutionType
	course_name: string; //courseName
	course_level: string;
	country: string;
	start_date: string;
	end_date: string;
	state: string;
	city: string;
	matricula?: string;
	campus?: string;
	registration_number?: string;
	document: string;
}
