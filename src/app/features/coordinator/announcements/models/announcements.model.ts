export enum TypeRecipientsEnum {
	SPECIFIC = 1,
	ALL = 2,
}

export interface AnnouncementBase {
	id: number;
	title: string;
	creationDate: string;
	content: string;
	typeRecipients: TypeRecipientsEnum;
}

export interface AnnouncementAll extends AnnouncementBase {
	typeRecipients: TypeRecipientsEnum.ALL;
}

export interface AnnouncementSpecific extends AnnouncementBase {
	typeRecipients: TypeRecipientsEnum.SPECIFIC;
	courses: Array<string>;
	course_levels: Array<string>;
}

export type Announcement = AnnouncementSpecific | AnnouncementAll;

export type Announcements = Array<Announcement>;
