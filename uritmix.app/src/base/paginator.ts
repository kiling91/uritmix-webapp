export namespace Paginator {
	export const paginatorPageSize = (_?: number, take?: number): number => {
		return take ?? 1
	}
	export const paginatorPageNumber = (skip?: number, take?: number): number => {
		if (skip && take) return skip / take + 1
		return 1
	}
}
