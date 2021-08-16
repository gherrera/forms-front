import { formsService } from '../services'

export default () => {
 	return new Promise(resolve => {
 		formsService.getFormByClienteId()
 			.then(response => resolve(response.data))
 	})
}
