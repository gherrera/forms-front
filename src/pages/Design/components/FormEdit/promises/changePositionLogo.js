import { formsService } from '../services'

export default (id, position) => {
 	return new Promise(resolve => {
 		formsService.changePositionLogo(id, position)
 			.then(response => resolve(response.data))
 	})
}
