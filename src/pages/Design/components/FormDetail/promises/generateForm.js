import { formsService } from '../services'

export default (id) => {
 	return new Promise(resolve => {
 		formsService.generateForm(id)
 			.then(response => resolve(response.data))
 	})
}
