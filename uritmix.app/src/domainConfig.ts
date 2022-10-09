export namespace AuthDomain {
	export const PasswordMinLength = 6
	export const PasswordMaxLength = 64

	export const NameAndEmailMinLength = 2
	export const NameAndEmailMaxLength = 64
}

export namespace PersonDomain {
	export const NameMinLength = 2
	export const NameMaxLength = 64
	export const DescriptionMaxLength = 64
}

export namespace AbonnementDomain {
	export const NameMinLength = 2
	export const NameMaxLength = 64
	export const NumberOfVisitsMin = 1
	export const NumberOfVisitsMax = 100
	export const BasePriceMin = 1.0
	export const BasePriceMax = 100000.0
}

export namespace RoomDomain {
	export const NameMinLength = 2
	export const NameMaxLength = 64
	export const DescriptionMaxLength = 64
}

export namespace LessonDomain {
	export const NameMinLength = 2
	export const NameMaxLength = 64
	export const DurationMinuteMin = 15
	export const DurationMinuteMax = 180
	export const BasePriceMin = 1.0
	export const BasePriceMax = 100000.0
	export const DescriptionMaxLength = 64
}
