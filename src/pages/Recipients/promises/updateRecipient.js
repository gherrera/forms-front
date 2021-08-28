import { recipientsService } from '../services'

export default (form) => {
 	return new Promise(resolve => {
		recipientsService.updateRecipient(form)
 			.then(response => resolve(response.data))
 	})
}
