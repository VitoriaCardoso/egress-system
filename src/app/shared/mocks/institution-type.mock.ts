import { SelectOptions } from '../models/select.model';
import { institution_typeEnum } from '../enums/institution-type.enum';

export const institution_type_OPTIONS_MOCK: SelectOptions = [
	{
		value: institution_typeEnum.PUBLIC_INSTITUTION,
		label: 'Instituição Pública',
	},
	{
		value: institution_typeEnum.PRIVATE_INSTITUTION,
		label: 'Instituição Privada',
	},
	{
		value: institution_typeEnum.FOREIGN_INSTITUTION,
		label: 'Instituição Estrangeira',
	},
	{
		value: institution_typeEnum.OTHER,
		label: 'Outro',
	},
];
