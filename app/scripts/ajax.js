/**
 * Created by Sam on 17.02.2017.
 */

let ajax = (url) => {
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();

		xhr.open('GET', url, true);

		xhr.onload = () => {
			if (xhr.status == 200) {

				resolve(xhr.response);
			} else {
				let error = new Error(xhr.status.text);
				error.code = xhr.status;
				reject(error);
			}
		};

		xhr.onerror = () => {
			reject(new Error('Network Error'));
		};

		xhr.send();
	});
};

let getJSON = (data) => {
	return JSON.parse(data);
};