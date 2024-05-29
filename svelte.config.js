import adapter from '@sveltejs/adapter-auto';
export default {
	kit: {
		adapter: adapter({
			// see below for options that can be set here
			runtime: 'nodejs18.x'
		})
		
	}
};
