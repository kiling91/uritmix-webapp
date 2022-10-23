import moment from 'moment'

const arrayHaveNestArray = (array: []): boolean => {
	let haveArray = false
	for (const child of array) {
		if (Array.isArray(child)) {
			haveArray = true
			break
		}
	}
	return haveArray
}

const arrayToString = (array: []): string => {
	let res = ''
	for (let i = 0; i < array.length; i++) {
		res += array[i]
		if (i !== array.length - 1) res += '^^'
	}
	return `{${res}}`
}

const prepareFilter = (array: any): string => {
	if (typeof array === 'string')
		return `${array.trim().replace('and', '&&').replace('or', '||')}`

	if (!arrayHaveNestArray(array)) return arrayToString(array)
	else {
		let res = ''
		for (const child of array) res += prepareFilter(child)
		return `{${res.trim()}}`
	}
}

export namespace Paginator {
	export const paginatorPageSize = (_?: number, take?: number): number => {
		return take ?? 1
	}
	export const paginatorPageNumber = (skip?: number, take?: number): number => {
		if (skip && take) return skip / take + 1
		return 1
	}
	export const filterParams = (filter: any): string => {
		// Обрабатывает только одноуровневую сортировку
		// https://js.devexpress.com/Documentation/ApiReference/Data_Layer/CustomStore/LoadOptions/#filter
		// Такую
		//  [ "dataField", "=", 10 ] - isShort
		// Или такую
		/*
            [
                [ "anotherDataField", "<", 3 ],
                "or",
                [ "anotherDataField", ">", 11 ]
            ]
        */
		// Или так
		/*
            [
                [ "dataField", "=", 10 ],
                "and",
                [
                    [ "anotherDataField", "<", 3 ],
                    "or",
                    [ "anotherDataField", ">", 11 ]
                ]
            ]
        */

		if (!filter) return ''
		return prepareFilter(filter)
	}

	export const dateRange = (filter: any): [string, string] => {
		const start = filter[0][0][0][2]
		const end = filter[0][0][1][2]
		return [start, end]
	}
}
