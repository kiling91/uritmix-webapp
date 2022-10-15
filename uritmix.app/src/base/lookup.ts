import { dto } from 'uritmix.api'

export const validityLookup = () => {
	return [
		{
			id: dto.AbonnementValidityView.OneDay,
			name: 'One day'
		},
		{
			id: dto.AbonnementValidityView.OneMonth,
			name: 'One month'
		},
		{
			id: dto.AbonnementValidityView.ThreeMonths,
			name: 'Three months'
		},
		{
			id: dto.AbonnementValidityView.HalfYear,
			name: 'Half year'
		},
		{
			id: dto.AbonnementValidityView.Year,
			name: 'Year'
		}
	]
}

export const validityToString = (
	validity: dto.AbonnementValidityView
): string => {
	const array = validityLookup()
	for (const v of array) {
		if (v.id == validity) return v.name
	}
	return validity
}

export const discountLookup = () => {
	return [
		{
			id: dto.DiscountView.D0,
			name: 'Discount 0%'
		},
		{
			id: dto.DiscountView.D5,
			name: 'Discount 5%'
		},
		{
			id: dto.DiscountView.D10,
			name: 'Discount 10%'
		},
		{
			id: dto.DiscountView.D15,
			name: 'Discount 15%'
		},
		{
			id: dto.DiscountView.D20,
			name: 'Discount 20%'
		},
		{
			id: dto.DiscountView.D25,
			name: 'Discount 25%'
		},
		{
			id: dto.DiscountView.D30,
			name: 'Discount 30%'
		},
		{
			id: dto.DiscountView.D40,
			name: 'Discount 40%'
		},
		{
			id: dto.DiscountView.D50,
			name: 'Discount 50%'
		},
		{
			id: dto.DiscountView.D60,
			name: 'Discount 60%'
		},
		{
			id: dto.DiscountView.D70,
			name: 'Discount 70%'
		},
		{
			id: dto.DiscountView.D80,
			name: 'Discount 80%'
		},
		{
			id: dto.DiscountView.D90,
			name: 'Discount 90%'
		}
	]
}

export const discountToString = (discount: dto.DiscountView): string => {
	const array = discountLookup()
	for (const v of array) {
		if (v.id == discount) return v.name
	}
	return discount
}

export const discountToValue = (discount: dto.DiscountView): number => {
	let discountValue = 0.0
	switch (discount) {
		case dto.DiscountView.D0:
			discountValue = 0.0
			break
		case dto.DiscountView.D5:
			discountValue = 0.05
			break
		case dto.DiscountView.D10:
			discountValue = 0.1
			break
		case dto.DiscountView.D15:
			discountValue = 0.15
			break
		case dto.DiscountView.D20:
			discountValue = 0.2
			break
		case dto.DiscountView.D25:
			discountValue = 0.25
			break
		case dto.DiscountView.D30:
			discountValue = 0.3
			break
		case dto.DiscountView.D40:
			discountValue = 0.4
			break
		case dto.DiscountView.D50:
			discountValue = 0.5
			break
		case dto.DiscountView.D60:
			discountValue = 0.6
			break
		case dto.DiscountView.D70:
			discountValue = 0.7
			break
		case dto.DiscountView.D80:
			discountValue = 0.8
			break
		case dto.DiscountView.D90:
			discountValue = 0.9
			break
	}
	return discountValue
}

export const authRole = () => {
	return [
		{
			Id: dto.AuthRoleView.Admin,
			Name: 'Administrator'
		},
		{
			Id: dto.AuthRoleView.Manager,
			Name: 'Manager'
		}
	]
}

export const authStatus = () => {
	return [
		{
			id: dto.AuthStatusView.NotActivated,
			name: 'Not Activated'
		},
		{
			id: dto.AuthStatusView.Activated,
			name: 'Activated'
		},
		{
			id: dto.AuthStatusView.Blocked,
			name: 'Blocked'
		}
	]
}
