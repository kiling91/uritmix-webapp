import React from 'react'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { Button } from 'devextreme-react'
import { dto } from 'uritmix.api'
import EventStore from './store/eventStore'
import ShowErrors from '../ui/ShowErrors'
import Visibility from '../ui/Visibility'
import Loading from '../ui/Loading'
import { POPUP_DIALOG_WIDTH, POPUP_POSITION } from '../config'
import { Popup } from 'devextreme-react/popup'

interface Param {
	event?: dto.Event | null
	onClose: (id: number, needReload: boolean) => void
}

const RemoveEvent = observer((param: Param) => {
	const store = useLocalObservable(() => new EventStore())

	const onSumbit = async () => {
		if (await store.remove(param.event.id)) {
			param.onClose(param.event.id, true)
		}
	}

	const onClose = () => {
		param.onClose(param.event.id, false)
	}

	const form = () => {
		return (
			<>
				<ShowErrors errors={store.errors} />
				{store.loading ? (
					<Loading />
				) : (
					<p>{`Remove event ${param.event.lesson.name}?`}</p>
				)}
				<Visibility visible={!store.loading}>
					<hr className='my-3' />
					<div className='d-flex justify-content-end gap-3'>
						<Button
							className='dx-btn'
							type='danger'
							stylingMode='contained'
							onClick={onSumbit}
						>
							{'Remove'}
						</Button>
						<Button
							className='dx-btn'
							type='default'
							stylingMode='outlined'
							onClick={onClose}
						>
							{'Cancel'}
						</Button>
					</div>
				</Visibility>
			</>
		)
	}

	return (
		<>
			{/*Костыль нужны для перерисовки в Popup*/}
			{store.errors.length > 0 && <>Errors</>}
			{store.loading && <>Loading</>}
			<Popup
				width={POPUP_DIALOG_WIDTH}
				height={'auto'}
				position={POPUP_POSITION}
				showTitle={true}
				visible={true}
				title={'Remove event'}
				dragEnabled={false}
				closeOnOutsideClick={false}
				onHiding={onClose}
				contentRender={form}
			/>
		</>
	)
})

export default RemoveEvent
