import { formsService } from '../services'

export default (id) => {
 	return new Promise(resolve => {
 		formsService.deleteLogo(id)
 			.then(response => resolve(response.data))
 	})
}
