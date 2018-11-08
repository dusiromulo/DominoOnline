import { getMessages as getMsgs, sendMessage as sendMsg } from '../util/serverService';


export const requestMessages = () => ({
    type: 'REQ_MESSAGES',
});

export const responseMessages = (data) => ({
    type: 'RES_MESSAGES',
    data: data
});

export const requestSendMessage = (message) => ({
    type: 'REQ_SEND_MESSAGE',
    message: message
});

export const responseSendMessage = (success) => ({
    type: 'RES_SEND_MESSAGE',
    success: success
});

export const incomeMessage = (message) => ({
    type: 'RECEIVED_MESSAGE',
    message: message
});

export function getMessages() {
	return function(dispatch) {
		console.log("GET MESSAGES!!!");
		dispatch(requestMessages());

		return getMsgs()
		.then(
			data => dispatch(responseMessages(data)),
			// Do not use catch, because that will also catch
			// any errors in the dispatch and resulting render,
			// causing a loop of 'Unexpected batch number' errors.
			// https://github.com/facebook/react/issues/6895
			error => console.log('ERROR GET MESSAGE ASYNC REDUCER.', error)
		);
	}
}

export function sendMessage(message) {
	return function(dispatch) {

		dispatch(requestSendMessage(message));

		return sendMsg(message)
		.then(
			data => dispatch(responseSendMessage(true)),
			error => console.log('ERROR SEND MESSAGE ASYNC REDUCER.', error)
		);
	}
}

// export function receivedMessage(message) {
// 	return function(dispatch) {

// 		dispatch(incomeMessage(message));

// 		return getMsgs()
// 		.then(
// 			data => dispatch(responseSendMessage(true)),
// 			error => console.log('ERROR SEND MESSAGE ASYNC REDUCER.', error)
// 		);
// 	}
// }