// Mock Supabase client for local development
export const supabase = {
	from: () => ({
		select: () => Promise.resolve({ data: [], error: null }),
		insert: () => Promise.resolve({ data: [], error: null }),
		update: () => Promise.resolve({ data: [], error: null }),
		delete: () => Promise.resolve({ data: [], error: null }),
	}),
	auth: {
		signInWithPassword: () => Promise.resolve({ data: { user: { id: 'mock-user' } }, error: null }),
		signUp: () => Promise.resolve({ data: { user: { id: 'mock-user' } }, error: null }),
		signOut: () => Promise.resolve({ error: null }),
	},
};
