const userId = '156592040%40N05'
const apiKey = '59f786b10e08594cc3b7afc024649f20'

export const Flickr = {
	getPhotosets() {
		return fetch(`https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=${apiKey}&user_id=${userId}&format=json&nojsoncallback=1`).then(response => {
			if (response.ok) {
				return response.json()
			}
			throw new Error('Request failed!')
		}, networkError => {
			console.log(networkError.message)
		}).then(jsonResponse => {
			return jsonResponse.photosets.photoset.map(photoset => ({
				id: photoset.id,
				number: photoset.photos,
				title: photoset.title._content
			}))
		})
	},

	getPhotos() {
		return fetch(`https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=${apiKey}&user_id=${userId}&extras=original_format&format=json&nojsoncallback=1`).then(response => {
			if (response.ok) {
				return response.json()
			}
			throw new Error('Request failed!')
		}, networkError => {
			console.log(networkError.message)
		}).then(jsonResponse => {
			return jsonResponse.photos.photo.map(photo => ({
				id: photo.id,
				secret: photo.secret,
				server: photo.server,
				farm: photo.farm,
				title: photo.title,
				osecret: photo.originalsecret
			}))
		})
	},

	filterPhotos(photoset) {
		return fetch(`https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${apiKey}&photoset_id=${photoset}&user_id=${userId}&extras=original_format&format=json&nojsoncallback=1`).then(response => {
			if (response.ok) {
				return response.json()
			}
			throw new Error('Request failed!')
		}, networkError => {
			console.log(networkError.message)
		}).then(jsonResponse => {
			return jsonResponse.photoset.photo.map(photo => ({
				id: photo.id,
				secret: photo.secret,
				server: photo.server,
				farm: photo.farm,
				title: photo.title,
				osecret: photo.originalsecret
			}))
		})
	}
}
